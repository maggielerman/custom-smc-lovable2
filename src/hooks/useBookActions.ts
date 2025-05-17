import { useCallback } from "react";
import { supabaseClient } from "@/lib/supabase";

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
      if (bookId) {
        ({ data, error } = await supabaseClient
          .from("books")
          .update({ ...book, updated_at: new Date().toISOString() })
          .eq("id", bookId)
          .select()
          .single());
      } else {
        ({ data, error } = await supabaseClient
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
    } catch (error) {
      console.error("Error saving book:", error);
      toast.error("Failed to save book", { description: error?.message || String(error) });
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