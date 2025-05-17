
import { Button, ButtonProps } from "@/components/ui/button";
import { useCart, CartItem } from "@/contexts/CartContext";
import { useState } from "react";

interface AddToCartButtonProps extends Omit<ButtonProps, 'onClick'> {
  book: {
    id: string;
    title: string;
    coverImageUrl?: string | null;
  };
  price: number;
}

const AddToCartButton = ({ book, price, ...props }: AddToCartButtonProps) => {
  const { addItem } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  
  const handleAddToCart = () => {
    setIsAdding(true);
    
    // Create a CartItem from the book data
    const cartItem: CartItem = {
      id: book.id,
      title: book.title,
      price: price,
      coverImageUrl: book.coverImageUrl || null,
      quantity: 1
    };
    
    addItem(cartItem);
    
    // Reset button state after a short delay
    setTimeout(() => {
      setIsAdding(false);
    }, 500);
  };
  
  return (
    <Button 
      onClick={handleAddToCart}
      disabled={isAdding}
      {...props}
    >
      {isAdding ? "Adding..." : "Add to Cart"}
    </Button>
  );
};

export default AddToCartButton;
