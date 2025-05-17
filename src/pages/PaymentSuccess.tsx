
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { useCart } from "@/contexts/CartContext";
import { Check } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const PaymentSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { clearCart } = useCart();
  
  // Extract session ID from URL params
  const sessionId = new URLSearchParams(location.search).get("session_id");
  
  useEffect(() => {
    // Clear the cart after successful payment
    clearCart();
  }, [clearCart]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="container py-16 flex-grow flex flex-col items-center justify-center">
        <div className="max-w-md w-full text-center">
          <div className="flex justify-center mb-6">
            <div className="rounded-full bg-green-100 p-3">
              <Check className="h-8 w-8 text-green-600" />
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-4">Payment Successful!</h1>
          <p className="text-muted-foreground mb-8">
            Thank you for your purchase. Your order has been successfully processed.
          </p>
          
          {sessionId && (
            <p className="text-sm text-muted-foreground mb-8">
              Order reference: {sessionId.substring(0, 8)}...
            </p>
          )}

          <div className="space-x-4">
            <Button onClick={() => navigate("/my-books")}>
              Go to My Books
            </Button>
            <Button variant="outline" onClick={() => navigate("/")}>
              Return Home
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PaymentSuccess;
