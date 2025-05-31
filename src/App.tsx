
import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import About from "./pages/About";
import HowItWorksPage from "./pages/HowItWorksPage";
import FAQ from "./pages/FAQ";
import CustomizeBook from "./pages/CustomizeBook";
import Account from "./pages/Account";
import Cart from "./pages/Cart";
import PaymentSuccess from "./pages/PaymentSuccess";
import NotFound from "./pages/NotFound";
import { useAuth } from "@/hooks/useAuth";
import BlogHome from "./pages/BlogHome";
import BlogPost from "./pages/BlogPost";
import BlogEditor from "./pages/BlogEditor";
import BecomeContributor from "./pages/BecomeContributor";
import FamilyTreeBuilder from "./pages/FamilyTreeBuilder";

function App() {
  const { session, isLoading } = useAuth();
  const location = useLocation();

  useEffect(() => {
    // Track page view with Supabase Analytics
    if (!isLoading) {
      // @ts-ignore
      window.supabase?.analytics?.track("page_view", {
        page_title: document.title,
        page_path: location.pathname,
      });
    }
  }, [session, location, isLoading]);

  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/about" element={<About />} />
      <Route path="/how-it-works" element={<HowItWorksPage />} />
      <Route path="/faq" element={<FAQ />} />
      <Route path="/customize" element={<CustomizeBook />} />
      <Route path="/customize/:templateId" element={<CustomizeBook />} />
      <Route path="/account" element={<Account />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/payment-success" element={<PaymentSuccess />} />
      <Route path="/blog" element={<BlogHome />} />
      <Route path="/blog/:slug" element={<BlogPost />} />
      <Route path="/blog-editor" element={<BlogEditor />} />
      <Route path="/become-contributor" element={<BecomeContributor />} />
      <Route path="/family-tree" element={<FamilyTreeBuilder />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
