
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
      const book = {
        title: bookData.title || selectedStory?.name || "Untitled Book",
        content: bookData,
        template_id: selectedStory?.id,
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
