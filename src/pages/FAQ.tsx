import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FAQSection from "@/components/FAQSection";

const FAQ = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow container py-12 mx-auto">
        {/* <h1 className="text-4xl font-bold mb-8 text-center">Frequently Asked Questions</h1> */}
        <FAQSection grouped />
      </main>
      <Footer />
    </div>
  );
};

export default FAQ; 