import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQ, FAQGroup, MASTER_FAQS, MASTER_FAQ_GROUPS } from "@/lib/faqs";

interface FAQSectionProps {
  faqs?: FAQ[] | FAQGroup[];
  grouped?: boolean;
}

const FAQSection = ({ faqs, grouped }: FAQSectionProps) => {
  // Determine if grouped or flat
  const isGrouped = grouped ?? (Array.isArray(faqs) && faqs.length > 0 && "category" in faqs[0]);

  if (isGrouped) {
    const groups: FAQGroup[] = (faqs as FAQGroup[]) || MASTER_FAQ_GROUPS;
    const mid = Math.ceil(groups.length / 2);
    const leftGroups = groups.slice(0, mid);
    const rightGroups = groups.slice(mid);
    return (
      <section className="py-16 bg-[var(--cream)]" id="faq">
        <div className="container max-w-screen ">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-[var(--navy)]">
              Frequently Asked Questions
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-[var(--charcoal)] md:text-lg">
              Find answers to common questions about our personalized donor conception books.
            </p>
          </div>
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-10">
              {leftGroups.map((group, groupIndex) => (
                <div key={groupIndex}>
                  <h3 className="text-2xl font-semibold mb-6">{group.category}</h3>
                  <Accordion type="single" collapsible className="w-full">
                    {group.faqs.map((faq, index) => (
                      <AccordionItem key={index} value={`item-left-${groupIndex}-${index}`}>
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
              ))}
            </div>
            <div className="space-y-10">
              {rightGroups.map((group, groupIndex) => (
                <div key={groupIndex}>
                  <h3 className="text-2xl font-semibold mb-6">{group.category}</h3>
                  <Accordion type="single" collapsible className="w-full">
                    {group.faqs.map((faq, index) => (
                      <AccordionItem key={index} value={`item-right-${groupIndex}-${index}`}>
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
              ))}
            </div>
          </div>
          <div className="mt-12 text-center">
            <p className="text-[var(--charcoal)]">
              Have more questions? We're here to help!{" "}
              <a href="/contact" className="text-[var(--mint)] font-medium underline hover:text-[var(--navy)]">
                Contact our team
              </a>
            </p>
          </div>
        </div>
      </section>
    );
  } else {
    const flatFaqs: FAQ[] = (faqs as FAQ[]) || MASTER_FAQS;
    return (
      <section className="py-16 bg-[var(--cream)]" id="faq">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-[var(--navy)]">
              Frequently Asked Questions
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-[var(--charcoal)] md:text-lg">
              Find answers to common questions about our personalized donor conception books.
            </p>
          </div>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {flatFaqs.map((faq, index) => (
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
            <p className="text-[var(--charcoal)]">
              Have more questions? We're here to help!{" "}
              <a href="/contact" className="text-[var(--mint)] font-medium underline hover:text-[var(--navy)]">
                Contact our team
              </a>
            </p>
          </div>
        </div>
      </section>
    );
  }
};

export default FAQSection;
