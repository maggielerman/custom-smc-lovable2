
import { CartItem as CartItemType } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash, Plus, Minus } from "lucide-react";
import { useState } from "react";

interface CartItemProps {
  item: CartItemType;
  updateQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
}

const CartItem = ({ item, updateQuantity, removeItem }: CartItemProps) => {
  const [quantity, setQuantity] = useState(item.quantity);

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(e.target.value, 10);
    if (isNaN(newQuantity) || newQuantity < 1) return;
    setQuantity(newQuantity);
    updateQuantity(item.id, newQuantity);
  };

  const incrementQuantity = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    updateQuantity(item.id, newQuantity);
  };

  const decrementQuantity = () => {
    if (quantity <= 1) return;
    const newQuantity = quantity - 1;
    setQuantity(newQuantity);
    updateQuantity(item.id, newQuantity);
  };

  return (
    <div className="flex items-center justify-between border-b py-4">
      <div className="flex items-center space-x-4">
        <div className="h-16 w-12 bg-gray-100 rounded flex items-center justify-center overflow-hidden">
          {item.coverImageUrl ? (
            <img 
              src={item.coverImageUrl} 
              alt={item.title} 
              className="object-cover h-full w-full"
            />
          ) : (
            <div className="text-gray-400 text-xs text-center">No Cover</div>
          )}
        </div>
        <div>
          <h3 className="font-medium">{item.title}</h3>
          <p className="text-sm text-muted-foreground">${item.price.toFixed(2)}</p>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <div className="flex items-center border rounded-md">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={decrementQuantity} 
            className="h-8 w-8 rounded-r-none"
          >
            <Minus className="h-3 w-3" />
          </Button>
          <Input 
            type="number" 
            value={quantity}
            onChange={handleQuantityChange}
            className="h-8 w-12 border-0 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={incrementQuantity} 
            className="h-8 w-8 rounded-l-none"
          >
            <Plus className="h-3 w-3" />
          </Button>
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => removeItem(item.id)} 
          className="text-red-500 hover:text-red-700 h-8 w-8"
        >
          <Trash className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default CartItem;
