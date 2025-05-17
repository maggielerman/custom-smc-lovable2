import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const FAQS = [
  {
    question: "What is DonorBookies?",
    answer:
      "DonorBookies is a platform for creating personalized children's books that explain donor conception and ART journeys in a loving, age-appropriate way.",
  },
  {
    question: "Who are these books for?",
    answer:
      "Our books are for any family who wants to share their unique conception story with their child, including families formed through egg, sperm, or embryo donation, IVF, surrogacy, and more.",
  },
  {
    question: "Can I customize the characters and story?",
    answer:
      "Yes! You can personalize names, family structure, dedication, and even illustrations to reflect your family's look and story.",
  },
  {
    question: "What age are these books appropriate for?",
    answer:
      "Our stories are designed for children ages 3-7, but can be enjoyed by families with children of all ages.",
  },
  {
    question: "Do you offer digital copies?",
    answer:
      "Yes, every order includes a digital copy you can read on any device.",
  },
  {
    question: "How long does it take to receive my book?",
    answer:
      "Printed books typically ship within 7-10 business days after your order is placed.",
  },
  {
    question: "Can I order more than one copy?",
    answer:
      "Absolutely! You can order as many copies as you like for family and friends.",
  },
  {
    question: "Is my information private?",
    answer:
      "Yes. We take your privacy seriously and never share your information without your consent.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow container py-12 max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Frequently Asked Questions</h1>
        <div className="space-y-4">
          {FAQS.map((faq, idx) => (
            <div key={faq.question} className="border rounded-lg bg-white shadow-sm">
              <button
                className="w-full flex justify-between items-center px-6 py-4 text-lg font-medium focus:outline-none"
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                aria-expanded={openIndex === idx}
              >
                {faq.question}
                <ChevronDown
                  className={`h-5 w-5 ml-2 transition-transform ${openIndex === idx ? "rotate-180" : "rotate-0"}`}
                />
              </button>
              {openIndex === idx && (
                <div className="px-6 pb-4 text-gray-700 animate-fade-in">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FAQ; 