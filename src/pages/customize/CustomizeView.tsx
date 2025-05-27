import { BookTemplate } from "@/lib/bookTemplates";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import BookCustomizationFlow from "@/components/book-customization/BookCustomizationFlow";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomerReviews from "@/components/book-customization/CustomerReviews";
import { StructuredData } from "@/components/SEO/StructuredData";
import { sampleReviews, getAggregateRating, getProductSchema, getBookSchema } from "@/lib/bookSeo";

interface CustomizeViewProps {
  template: BookTemplate;
  bookData: any;
  setBookData: (data: any) => void;
  steps: { label: string; icon: React.ReactNode }[];
  currentStep: number;
  setCurrentStep: (step: number) => void;
  saving: boolean;
  handleSave: (publish?: boolean) => void;
  handleAddToCart: () => void;
  handleBuyNow: () => void;
  handleBack: () => void;
  handleNext: () => void;
  savedFamilies?: any[];
  onLoadFamily?: (family: any) => void;
  handleSaveFamily?: () => void;
}

const CustomizeView: React.FC<CustomizeViewProps> = ({
  template,
  bookData,
  setBookData,
  steps,
  currentStep,
  setCurrentStep,
  saving,
  handleSave,
  handleAddToCart,
  handleBuyNow,
  handleBack,
  handleNext,
  savedFamilies,
  onLoadFamily,
  handleSaveFamily,
}) => {
  const book = {
    title: `${template?.name || "Your Child"}’s Story — ${(template as any)?.family_structure || "Family"} Book` +
      " | Personalized Children's Book | DonorBookies",
    coverImageUrl: template?.thumbnail_url || "/placeholder.svg",
    description: `A fully personalized ${(template as any)?.family_structure?.toLowerCase() || "family"} storybook for ${
      template?.name || "your child"
    }. Customize names, appearances, and your unique journey. Perfect for donor-conceived, IVF, and diverse families. A unique, heartfelt gift!`,
    sku: `BOOK-${template?.id || "SKU"}`,
    price: 29.99,
    slug: `custom-book-${template?.id || "slug"}`,
    inStock: true,
    author: "DonorBookies Editorial Team",
    illustrator: "DonorBookies Illustrator",
    pages: template?.pages || 24,
    ageRange: template?.age_range || "3-7",
    familyStructure: (template as any)?.family_structure || "Family",
  };

  const aggregateRating = getAggregateRating();
  const productSchema = getProductSchema(book, template);
  const bookSchema = getBookSchema(book);

  return (
    <HelmetProvider>
      <div className="flex flex-col min-h-screen">
        <Helmet>
          <title>{book.title}</title>
          <meta name="description" content={book.description} />
          <link rel="canonical" href={`${window.location.origin}/customize/${template?.id}`} />
          <meta property="og:title" content={book.title} />
          <meta property="og:description" content={book.description} />
          <meta property="og:image" content={`${window.location.origin}${book.coverImageUrl}`} />
          <meta property="og:url" content={`${window.location.origin}/customize/${template?.id}`} />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={book.title} />
          <meta name="twitter:description" content={book.description} />
          <meta name="twitter:image" content={`${window.location.origin}${book.coverImageUrl}`} />
        </Helmet>
        <Navbar />
        <main className="flex-grow container py-10">
          <StructuredData data={productSchema} />
          <StructuredData data={bookSchema} />
          <div className="flex items-center mb-8">
            <Button variant="ghost" onClick={handleBack} className="mr-4">
              <ChevronLeft className="h-5 w-5 mr-2" />
              {currentStep === 0 ? "Back" : "Previous Step"}
            </Button>
            <h1 className="text-3xl font-bold">Customize Your Book</h1>
          </div>
          <div className="mb-6 text-lg text-muted-foreground">
            <p>
              {template?.description ? (
                <>
                  <strong>{template.name}:</strong> {template.description} <br />
                  This <strong>personalized children's book</strong> lets you customize names, appearances, family structure, and your unique journey. Perfect for {template.family_structure} and donor-conceived families. A unique, heartfelt gift!
                </>
              ) : (
                <>Create a <strong>fully personalized children's book</strong> for {template?.name || "your child"}. Customize names, appearances, family structure, and your unique journey. Perfect for donor-conceived, IVF, and diverse families. A unique, heartfelt gift!</>
              )}
            </p>
          </div>
          <div className="flex justify-center mb-8">
            <img
              src={book.coverImageUrl}
              alt={`Personalized ${template?.family_structure || "family"} children's book showing customizable child and family illustrations`}
              className="w-48 h-64 object-cover rounded shadow"
            />
          </div>
          <div className="max-w-4xl mx-auto">
            <BookCustomizationFlow
              bookData={bookData}
              setBookData={setBookData}
              steps={steps}
              currentStep={currentStep}
              setCurrentStep={setCurrentStep}
              saving={saving}
              handleSave={handleSave}
              handleAddToCart={handleAddToCart}
              handleBuyNow={handleBuyNow}
              handleBack={handleBack}
              handleNext={handleNext}
              savedFamilies={savedFamilies}
              onLoadFamily={onLoadFamily}
              handleSaveFamily={handleSaveFamily}
              template={template}
            />
          </div>
          <div className="mt-16">
            <CustomerReviews reviews={sampleReviews} aggregateRating={aggregateRating} />
          </div>
        </main>
        <Footer />
      </div>
    </HelmetProvider>
  );
};

export default CustomizeView;
