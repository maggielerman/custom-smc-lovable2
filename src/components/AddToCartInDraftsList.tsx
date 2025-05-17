
import { Button } from "@/components/ui/button";
import { useCart, CartItem } from "@/contexts/CartContext";
import { ShoppingCart } from "lucide-react";
import { toast } from "sonner";

interface Book {
  id: string;
  title: string;
  cover_image_url: string | null;
}

interface AddToCartInDraftsListProps {
  book: Book;
}

const AddToCartInDraftsList = ({ book }: AddToCartInDraftsListProps) => {
  const { addItem } = useCart();
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Create a CartItem from the book data
    const cartItem: CartItem = {
      id: book.id,
      title: book.title,
      price: 29.99, // Default price
      coverImageUrl: book.cover_image_url,
      quantity: 1
    };
    
    addItem(cartItem);
    toast.success(`${book.title} added to cart`);
  };
  
  return (
    <Button 
      onClick={handleAddToCart}
      variant="outline"
      size="sm"
      className="gap-1"
    >
      <ShoppingCart className="h-4 w-4" />
      <span>Add to Cart</span>
    </Button>
  );
};

export default AddToCartInDraftsList;
