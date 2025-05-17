export interface FAQ {
  question: string;
  answer: string;
}

export interface FAQGroup {
  category: string;
  faqs: FAQ[];
}

export const MASTER_FAQ_GROUPS: FAQGroup[] = [
  {
    category: "Product Overview",
    faqs: [
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
    ],
  },
  {
    category: "Customization",
    faqs: [
      {
        question: "Can I customize the characters to look like my family?",
        answer:
          "Yes! You can personalize physical characteristics including skin tone, hair color and style, eye color, and other features to resemble your family members. Our goal is to create a book that authentically represents your unique family.",
      },
      {
        question: "Can I customize the characters and story?",
        answer:
          "Yes! You can personalize names, family structure, dedication, and even illustrations to reflect your family's look and story.",
      },
      {
        question: "Can I create books for multiple children with different stories?",
        answer:
          "Absolutely! Each book is created individually, so you can create different versions for siblings with their own unique stories, names, and details.",
      },
    ],
  },
  {
    category: "Age Appropriateness and Educational Content",
    faqs: [
      {
        question: "At what age should I introduce this book to my child?",
        answer:
          "Child development experts recommend introducing donor conception stories from a very young age (even as young as 2-3 years). Our books are designed with age-appropriate language and illustrations that grow with your child. Starting early helps normalize their story and build a foundation of trust and openness.",
      },
      {
        question: "What age are these books appropriate for?",
        answer:
          "Our stories are designed for children ages 3-7, but can be enjoyed by families with children of all ages.",
      },
      {
        question: "How accurate are the medical aspects of the books?",
        answer:
          "Our content is reviewed by fertility specialists and child psychologists to ensure medical accuracy while remaining child-friendly. The level of medical detail can be adjusted based on your child's age and your preferences.",
      },
    ],
  },
  {
    category: "Ordering and Shipping",
    faqs: [
      {
        question: "How long does it take to receive my printed book?",
        answer:
          "After finalizing your book design, printed books typically ship within 5-7 business days. Standard delivery takes an additional 3-5 business days within the continental US. Express shipping options are available at checkout.",
      },
      {
        question: "Can I order more than one copy?",
        answer:
          "Absolutely! You can order as many copies as you like for family and friends.",
      },
    ],
  },
  {
    category: "Digital Versions",
    faqs: [
      {
        question: "Is there a digital version of the book available?",
        answer:
          "Yes, every order includes a digital PDF version of your book that you can access immediately after finalizing your design. This is perfect for sharing with distant family members or having a backup copy on your devices.",
      },
    ],
  },
  {
    category: "Privacy",
    faqs: [
      {
        question: "Is my information private?",
        answer:
          "Yes. We take your privacy seriously and never share your information without your consent.",
      },
    ],
  },
];

export const MASTER_FAQS: FAQ[] = MASTER_FAQ_GROUPS.flatMap(group => group.faqs);