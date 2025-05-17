
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const CartIndicator = () => {
  const { itemCount } = useCart();
  
  return (
    <Button 
      asChild 
      variant="ghost" 
      size="icon" 
      className="relative"
    >
      <Link to="/cart">
        <ShoppingCart className="h-5 w-5" />
        {itemCount > 0 && (
          <Badge 
            className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
          >
            {itemCount > 9 ? '9+' : itemCount}
          </Badge>
        )}
      </Link>
    </Button>
  );
};

export default CartIndicator;
