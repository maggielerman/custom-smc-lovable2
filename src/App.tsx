import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { CartProvider } from "@/contexts/CartContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Account from "./pages/Account";
import CustomizeBook from "./pages/CustomizeBook";
import HowItWorksPage from "./pages/HowItWorksPage";
import AuthGuard from "./components/AuthGuard";
import Cart from "./pages/Cart";
import PaymentSuccess from "./pages/PaymentSuccess";
import { useEffect } from "react";
import { supabaseClient } from "./lib/supabase";
import { toast } from "sonner";
import FAQ from "./pages/FAQ";
import About from "./pages/About";
import BlogHome from "./pages/BlogHome";
import BlogPost from "./pages/BlogPost";
import BlogEditor from "./pages/BlogEditor";
import BecomeContributor from "./pages/BecomeContributor";

const queryClient = new QueryClient();

const AppContent = () => {
  useEffect(() => {
    if (!supabaseClient) {
      toast.warning(
        "Supabase is not connected",
        {
          description: "Please connect your project to Supabase to enable authentication and database features.",
          duration: 6000,
        }
      );
    }
  }, []);

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Index />} />
      <Route path="/how-it-works" element={<HowItWorksPage />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/payment-success" element={<PaymentSuccess />} />
      <Route path="/blog" element={<BlogHome />} />
      <Route path="/blog/:postId" element={<BlogPost />} />

      {/* Auth routes - only accessible when logged out */}
      <Route element={<AuthGuard requireAuth={false} redirectTo="/" />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Route>
      
      {/* Protected routes - directly rendered with internal auth checks */}
      <Route path="/account" element={<Account />} />
      <Route path="/books/new" element={<Navigate to="/customize/" replace />} />
      <Route path="/customize/" element={<CustomizeBook />} />
      <Route path="/customize/:templateId" element={<CustomizeBook />} />
      <Route path="/blog/new" element={<BlogEditor />} />
      <Route path="/blog/:postId/edit" element={<BlogEditor />} />
      <Route path="/become-contributor" element={<BecomeContributor />} />
      
      {/* Catch-all route */}
      <Route path="*" element={<NotFound />} />
      <Route path="/faq" element={<FAQ />} />
      <Route path="/about" element={<About />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <CartProvider>
            <AppContent />
          </CartProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
