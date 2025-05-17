
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "At what age should I introduce this book to my child?",
    answer:
      "Child development experts recommend introducing donor conception stories from a very young age (even as young as 2-3 years). Our books are designed with age-appropriate language and illustrations that grow with your child. Starting early helps normalize their story and build a foundation of trust and openness.",
  },
  {
    question: "Can I customize the characters to look like my family?",
    answer:
      "Yes! You can personalize physical characteristics including skin tone, hair color and style, eye color, and other features to resemble your family members. Our goal is to create a book that authentically represents your unique family.",
  },
  {
    question: "How accurate are the medical aspects of the books?",
    answer:
      "Our content is reviewed by fertility specialists and child psychologists to ensure medical accuracy while remaining child-friendly. The level of medical detail can be adjusted based on your child's age and your preferences.",
  },
  {
    question: "Can I create books for multiple children with different stories?",
    answer:
      "Absolutely! Each book is created individually, so you can create different versions for siblings with their own unique stories, names, and details.",
  },
  {
    question: "How long does it take to receive my printed book?",
    answer:
      "After finalizing your book design, printed books typically ship within 5-7 business days. Standard delivery takes an additional 3-5 business days within the continental US. Express shipping options are available at checkout.",
  },
  {
    question: "Is there a digital version of the book available?",
    answer:
      "Yes, every order includes a digital PDF version of your book that you can access immediately after finalizing your design. This is perfect for sharing with distant family members or having a backup copy on your devices.",
  },
];

const FAQSection = () => {
  return (
    <section className="py-16 bg-gray-50" id="faq">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-gray-600 md:text-lg">
            Find answers to common questions about our personalized donor conception books.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600">
            Have more questions? We're here to help!{" "}
            <a href="/contact" className="text-primary font-medium underline hover:text-primary/80">
              Contact our team
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
