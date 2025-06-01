import { useCallback } from "react";
import { supabaseClient, getSupabaseClient } from "@/lib/supabase";

export function useBookActions({
  user,
  selectedStory,
  bookData,
  bookId,
  navigate,
  addItem,
  toast,
  setSaving,
}) {
  const handleSave = useCallback(async (publish = false) => {
    if (!user) {
      toast("Please login to save your book");
      navigate("/login", { state: { redirectTo: window.location.pathname } });
      return;
    }
    try {
      setSaving(true);
      
      // Find the actual template from the database using the template name/id
      let templateId = selectedStory?.id;
      
      // If the selectedStory.id is not a UUID, try to find it in the database
      if (selectedStory?.id && !selectedStory.id.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i)) {
        const { data: templates } = await getSupabaseClient()
          .from("book_templates")
          .select("id")
          .eq("name", selectedStory.name)
          .maybeSingle();
        
        if (templates) {
          templateId = templates.id;
        } else {
          // If no template found, use a default template ID or handle gracefully
          console.warn("Template not found in database:", selectedStory.name);
          // You could either use a default template ID or create a fallback
          // For now, let's use the first available template as fallback
          const { data: fallbackTemplate } = await getSupabaseClient()
            .from("book_templates")
            .select("id")
            .limit(1)
            .maybeSingle();
          
          if (fallbackTemplate) {
            templateId = fallbackTemplate.id;
            console.log("Using fallback template:", templateId);
          } else {
            throw new Error("No templates available in the database");
          }
        }
      }
      
      const book = {
        title: bookData.title || selectedStory?.name || "Untitled Book",
        content: bookData,
        template_id: templateId,
        user_id: user.id,
        published: publish,
      };
      
      let data, error;
      const client = getSupabaseClient();
      if (bookId) {
        ({ data, error } = await client
          .from("books")
          .update({ ...book, updated_at: new Date().toISOString() })
          .eq("id", bookId)
          .select()
          .single());
      } else {
        ({ data, error } = await client
          .from("books")
          .insert(book)
          .select()
          .single());
      }
      if (error) throw error;
      toast.success(
        publish ? "Book published successfully!" : "Draft saved successfully!"
      );
      if (!publish) {
        navigate("/");
      }
    } catch (error: any) {
      console.error("Error saving book:", error);
      if (error.message?.includes('Supabase client is not initialized')) {
        const book = {
          title: bookData.title || selectedStory?.name || "Untitled Book",
          content: bookData,
          template_id: selectedStory?.id,
          user_id: user.id,
          published: publish,
        };
        const localDrafts = JSON.parse(localStorage.getItem('local-drafts') || '[]');
        const id = bookId || crypto.randomUUID();
        const draft = { ...book, id };
        localStorage.setItem('local-drafts', JSON.stringify([...localDrafts.filter((d: any) => d.id !== id), draft]));
        toast.success('Draft saved locally');
        navigate('/');
      } else {
        toast.error('Failed to save book', { description: error?.message || String(error) });
      }
    } finally {
      setSaving(false);
    }
  }, [user, selectedStory, bookData, bookId, navigate, toast, setSaving]);

  const handleAddToCart = useCallback(() => {
    if (!selectedStory) return;
    const bookItem = {
      id: crypto.randomUUID(),
      title: bookData.title || selectedStory.name,
      price: 29.99,
      coverImageUrl: selectedStory.thumbnail_url,
      quantity: 1,
    };
    addItem(bookItem);
    toast.success(`${bookItem.title} added to cart`);
  }, [selectedStory, bookData, addItem, toast]);

  const handleBuyNow = useCallback(() => {
    handleAddToCart();
    navigate("/cart");
  }, [handleAddToCart, navigate]);

  return { handleSave, handleAddToCart, handleBuyNow };
}
