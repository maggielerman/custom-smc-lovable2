
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Account from "./pages/Account";
import MyBooks from "./pages/MyBooks";
import BookEditor from "./pages/BookEditor";
import AuthGuard from "./components/AuthGuard";
import { useEffect } from "react";
import { supabaseClient } from "./lib/supabase";
import { toast } from "sonner";

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
      
      {/* Auth routes - only accessible when logged out */}
      <Route element={<AuthGuard requireAuth={false} redirectTo="/" />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Route>
      
      {/* Protected routes - only accessible when logged in */}
      <Route element={<AuthGuard requireAuth={true} />}>
        <Route path="/profile" element={<Profile />} />
        <Route path="/account" element={<Account />} />
        <Route path="/my-books" element={<MyBooks />} />
        <Route path="/books/new" element={<BookEditor />} />
        <Route path="/books/:id/edit" element={<BookEditor />} />
      </Route>
      
      {/* Catch-all route */}
      <Route path="*" element={<NotFound />} />
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
          <AppContent />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
