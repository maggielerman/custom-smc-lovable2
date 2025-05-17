import HeroSection from "@/components/HeroSection";
// import BookTypes from "@/components/BookTypes";
import TestimonialSection from "@/components/TestimonialSection";
import HowItWorks from "@/components/HowItWorks";
import FAQSection from "@/components/FAQSection";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        {/* <BookTypes /> */}
        <HowItWorks />
        <TestimonialSection />
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
