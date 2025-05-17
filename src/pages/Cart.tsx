
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import CartItem from "@/components/CartItem";
import { Trash } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import { supabaseClient } from "@/lib/supabase";
import { toast } from "sonner";

const Cart = () => {
  const { items, removeItem, updateQuantity, clearCart, totalPrice } = useCart();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckout = async () => {
    if (items.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    setIsLoading(true);
    try {
      // Call the Supabase Edge Function to create a Stripe checkout session
      const { data, error } = await supabaseClient.functions.invoke('create-payment', {
        body: {
          items: items.map(item => ({
            id: item.id,
            title: item.title,
            price: item.price,
            quantity: item.quantity
          }))
        }
      });

      if (error) {
        throw new Error(error.message);
      }

      if (data?.url) {
        // Open Stripe checkout in a new tab
        window.open(data.url, '_blank');
      } else {
        throw new Error("No checkout URL returned");
      }
    } catch (error) {
      toast.error("Checkout failed", { 
        description: error.message || "Please try again later" 
      });
      console.error("Checkout error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="container py-10 flex-grow">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Your Cart</h1>
          {items.length > 0 && (
            <Button 
              variant="outline" 
              onClick={clearCart} 
              className="flex items-center gap-2"
            >
              <Trash className="h-4 w-4" /> Clear Cart
            </Button>
          )}
        </div>

        {items.length === 0 ? (
          <div className="text-center py-20">
            <h2 className="text-xl font-semibold mb-4">Your cart is empty</h2>
            <p className="text-muted-foreground mb-8">
              Add some books to your cart to continue.
            </p>
            <Button onClick={() => navigate("/my-books")}>
              Browse Books
            </Button>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-4">
              {items.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  updateQuantity={updateQuantity}
                  removeItem={removeItem}
                />
              ))}
            </div>
            <div className="md:col-span-1">
              <div className="border rounded-lg p-6">
                <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Items ({items.reduce((sum, item) => sum + item.quantity, 0)})</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-medium text-lg pt-4 border-t mt-4">
                    <span>Total</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                </div>
                <Button 
                  className="w-full mt-6" 
                  onClick={handleCheckout}
                  disabled={isLoading}
                >
                  {isLoading ? "Processing..." : "Proceed to Checkout"}
                </Button>
                {!user && (
                  <p className="text-sm text-muted-foreground mt-4">
                    You're checking out as a guest. <Button variant="link" className="p-0 h-auto" onClick={() => navigate("/login")}>Log in</Button> to save your order history.
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Cart;
