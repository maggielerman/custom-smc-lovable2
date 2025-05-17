import { BookTemplate } from "./bookTemplates";

export const sampleReviews = [
  {
    author: "Emily R.",
    rating: 5,
    text: "Absolutely loved how we could personalize every detail. My daughter was thrilled to see herself in the story!",
  },
  {
    author: "Carlos T.",
    rating: 5,
    text: "A beautiful, inclusive book for our two-dad family. The customization options made it truly ours.",
  },
  {
    author: "Priya S.",
    rating: 4,
    text: "Great for explaining our IVF journey. The illustrations and story are so warm and personal.",
  },
];

export function getAggregateRating() {
  return {
    "@type": "AggregateRating",
    ratingValue: (
      sampleReviews.reduce((sum, r) => sum + r.rating, 0) / sampleReviews.length
    ).toFixed(1),
    reviewCount: sampleReviews.length,
  };
}

export function getProductSchema(book: any, selectedStory: BookTemplate | null) {
  return {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: book.title,
    image: `${window.location.origin}${book.coverImageUrl}`,
    description: book.description,
    sku: book.sku,
    offers: {
      "@type": "Offer",
      url: `${window.location.origin}/customize/${selectedStory?.id}`,
      priceCurrency: "USD",
      price: book.price.toFixed(2),
      availability: "https://schema.org/InStock",
    },
    brand: {
      "@type": "Brand",
      name: "DonorBookies",
    },
    isFamilyFriendly: true,
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "Customizable",
        value: "Yes",
        description:
          "Personalize names, appearances, family structure, and journey details.",
      },
      {
        "@type": "PropertyValue",
        name: "Family Structure",
        value: book.familyStructure,
      },
    ],
    aggregateRating: getAggregateRating(),
    review: sampleReviews.map((r) => ({
      "@type": "Review",
      reviewRating: {
        "@type": "Rating",
        ratingValue: r.rating,
        bestRating: 5,
      },
      author: {
        "@type": "Person",
        name: r.author,
      },
      reviewBody: r.text,
    })),
  };
}

export function getBookSchema(book: any) {
  return {
    "@context": "https://schema.org/",
    "@type": "Book",
    name: book.title,
    author: {
      "@type": "Person",
      name: book.author,
    },
    illustrator: {
      "@type": "Person",
      name: book.illustrator,
    },
    bookFormat: "https://schema.org/Hardcover",
    numberOfPages: book.pages,
    inLanguage: "en-US",
    description: book.description,
    image: `${window.location.origin}${book.coverImageUrl}`,
    isbn: undefined, // Optional, can be filled if available
  };
} 