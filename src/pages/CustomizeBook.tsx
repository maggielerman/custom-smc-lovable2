import { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabaseClient } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Image, Users, BookOpen, Palette, Save, ShoppingCart } from "lucide-react";
import { toast } from "sonner";
import CustomizationStepper from "@/components/CustomizationStepper";
import FamilyStructureStep from "@/components/book-customization/FamilyStructureStep";
import FamilyMembersStep from "@/components/book-customization/FamilyMembersStep";
import ChildDetailsStep from "@/components/book-customization/ChildDetailsStep";
import IllustrationStep from "@/components/book-customization/IllustrationStep";
import ReviewStep from "@/components/book-customization/ReviewStep";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/contexts/CartContext";
import { StructuredData } from "@/components/SEO/StructuredData";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { BookTemplate, DUMMY_STORIES } from "@/lib/bookTemplates";
import { sampleReviews, getAggregateRating, getProductSchema, getBookSchema } from "@/lib/bookSeo";
import StorySelection from "@/components/book-customization/StorySelection";
import CustomerReviews from "@/components/book-customization/CustomerReviews";
import StoryNotFound from "@/components/book-customization/StoryNotFound";
import BookCustomizationFlow from "@/components/book-customization/BookCustomizationFlow";
import { useBookData } from "@/hooks/useBookData";
import { useBookActions } from "@/hooks/useBookActions";

const CustomizeBook = () => {
  const { templateId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addItem } = useCart();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [filter, setFilter] = useState({ donor_process: '', art_process: '', family_structure: '' });
  const [selectedStory, setSelectedStory] = useState<BookTemplate | null>(null);
  const { bookData, setBookData, updateField } = useBookData();

  // Define the steps for the customization process
  const steps = [
    { label: "Family Structure", icon: <Users className="h-5 w-5" /> },
    { label: "Family Members", icon: <Users className="h-5 w-5" /> },
    { label: "Child Details", icon: <Users className="h-5 w-5" /> },
    { label: "Illustrations", icon: <Image className="h-5 w-5" /> },
    { label: "Review", icon: <BookOpen className="h-5 w-5" /> },
  ];

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const bookId = queryParams.get("book");

  // Fetch book for editing if bookId exists
  useEffect(() => {
    if (bookId && user) {
      const fetchBook = async () => {
        setLoading(true);
        const { data, error } = await supabaseClient
          .from("books")
          .select("*")
          .eq("id", bookId)
          .eq("user_id", user.id)
          .maybeSingle();
        if (data) {
          const isValidBookData = (obj: any) =>
            obj && typeof obj === 'object' && !Array.isArray(obj) &&
            'title' in obj &&
            'familyStructure' in obj &&
            'familyMembers' in obj &&
            'childName' in obj &&
            'childAge' in obj &&
            'childGender' in obj &&
            'childPronouns' in obj &&
            'conceptionMethod' in obj &&
            'donorType' in obj &&
            'surrogateName' in obj &&
            'selectedIllustrations' in obj &&
            'dedication' in obj;
          if (typeof data.content === 'object' && !Array.isArray(data.content) && isValidBookData(data.content)) {
            setBookData(data.content);
            const template = DUMMY_STORIES.find(t => t.id === data.template_id) || null;
            setSelectedStory(template);
          } else {
            setSelectedStory(null);
          }
        }
        setLoading(false);
      };
      fetchBook();
    }
  }, [bookId, user]);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    } else {
      navigate(-1);
    }
  };

  const { handleSave, handleAddToCart, handleBuyNow } = useBookActions({
    user,
    selectedStory,
    bookData,
    bookId,
    navigate,
    addItem,
    toast,
    setSaving,
  });

  useEffect(() => {
    if (templateId) {
      const found = DUMMY_STORIES.find(story => story.id === templateId);
      setSelectedStory(found || null);
      setLoading(false);
    }
  }, [templateId]);

  useEffect(() => {
    if (!templateId) {
      setLoading(false);
    }
  }, [templateId]);

  const handleSelectStory = (story: BookTemplate) => {
    setSelectedStory(story);
    setBookData({
      title: "",
      familyStructure: "",
      familyMembers: [],
      childName: "",
      childAge: "",
      childGender: "",
      childPronouns: "",
      conceptionMethod: "",
      donorType: "",
      surrogateName: "",
      selectedIllustrations: {},
      dedication: "",
    });
  };

  if (!selectedStory && !loading) {
    const filteredStories = DUMMY_STORIES.filter(story =>
      (!filter.donor_process || story.donor_process === filter.donor_process) &&
      (!filter.art_process || story.art_process === filter.art_process) &&
      (!filter.family_structure || story.family_structure === filter.family_structure)
    );
    return (
      <HelmetProvider>
        <div className="flex flex-col min-h-screen">
          <Helmet>
            <title>Choose Your Story Type | Personalized Children's Book | DonorBookies</title>
            <meta name="description" content="Choose the story type for your personalized children's book. Perfect for donor-conceived and diverse families." />
            <link rel="canonical" href={`${window.location.origin}/customize/`} />
            <meta property="og:title" content="Choose Your Story Type | Personalized Children's Book | DonorBookies" />
            <meta property="og:description" content="Choose the story type for your personalized children's book. Perfect for donor-conceived and diverse families." />
            <meta property="og:image" content={`${window.location.origin}/placeholder.svg`} />
            <meta property="og:url" content={`${window.location.origin}/customize/`} />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content="Choose Your Story Type | Personalized Children's Book | DonorBookies" />
            <meta name="twitter:description" content="Choose the story type for your personalized children's book. Perfect for donor-conceived and diverse families." />
            <meta name="twitter:image" content={`${window.location.origin}/placeholder.svg`} />
          </Helmet>
          <Navbar />
          <main className="flex-grow container py-10">
            <h1 className="text-3xl font-bold mb-8">Choose Your Story Type</h1>
            <div className="mb-6 flex flex-wrap gap-4">
              <select value={filter.donor_process} onChange={e => setFilter(f => ({ ...f, donor_process: e.target.value }))} className="border rounded px-3 py-2">
                <option value="">All Donor Processes</option>
                <option value="sperm">Sperm Donor</option>
                <option value="egg">Egg Donor</option>
                <option value="none">No Donor</option>
              </select>
              <select value={filter.art_process} onChange={e => setFilter(f => ({ ...f, art_process: e.target.value }))} className="border rounded px-3 py-2">
                <option value="">All ART Processes</option>
                <option value="IVF">IVF</option>
                <option value="surrogacy">Surrogacy</option>
              </select>
              <select value={filter.family_structure} onChange={e => setFilter(f => ({ ...f, family_structure: e.target.value }))} className="border rounded px-3 py-2">
                <option value="">All Family Types</option>
                <option value="two moms">Two Moms</option>
                <option value="single dad">Single Dad</option>
                <option value="mom and dad">Mom and Dad</option>
              </select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filteredStories.map(story => (
                <div key={story.id} className="border rounded-lg p-6 flex flex-col items-center bg-white shadow">
                  <div className="mb-4 w-24 h-24 bg-gray-100 flex items-center justify-center rounded-full">
                    <BookOpen className="h-10 w-10 text-muted-foreground" />
                  </div>
                  <h2 className="text-lg font-semibold mb-2">{story.name}</h2>
                  <p className="text-sm text-muted-foreground mb-4 text-center">{story.description}</p>
                  <Button onClick={() => handleSelectStory(story)} className="mt-auto">Select</Button>
                </div>
              ))}
              {filteredStories.length === 0 && (
                <div className="col-span-full text-center text-muted-foreground py-12">No stories match your filters.</div>
              )}
            </div>
          </main>
          <Footer />
        </div>
      </HelmetProvider>
    );
  }

  if (templateId && !selectedStory && !loading) {
    return <StoryNotFound />;
  }

  const template = selectedStory;

  const book = {
    title: `${selectedStory?.name || "Your Child"}’s Story — ${(selectedStory as any)?.family_structure || "Family"} Book` +
      " | Personalized Children's Book | DonorBookies",
    coverImageUrl:
      selectedStory?.thumbnail_url || "/placeholder.svg",
    description:
      `A fully personalized ${(selectedStory as any)?.family_structure?.toLowerCase() || "family"} storybook for ${
        selectedStory?.name || "your child"
      }. Customize names, appearances, and your unique journey. Perfect for donor-conceived, IVF, and diverse families. A unique, heartfelt gift!`,
    sku: `BOOK-${selectedStory?.id || "SKU"}`,
    price: 29.99, // or your dynamic price
    slug: `custom-book-${selectedStory?.id || "slug"}`,
    inStock: true,
    author: "DonorBookies Editorial Team",
    illustrator: "DonorBookies Illustrator",
    pages: selectedStory?.pages || 24,
    ageRange: selectedStory?.age_range || "3-7",
    familyStructure: (selectedStory as any)?.family_structure || "Family",
  };

  // Calculate aggregate rating
  const aggregateRating = getAggregateRating();

  const productSchema = getProductSchema(book, selectedStory);

  const bookSchema = getBookSchema(book);

  return (
    <HelmetProvider>
      <div className="flex flex-col min-h-screen">
        <Helmet>
          <title>{book.title}</title>
          <meta name="description" content={book.description} />
          <link rel="canonical" href={`${window.location.origin}/customize/${selectedStory?.id}`} />
          <meta property="og:title" content={book.title} />
          <meta property="og:description" content={book.description} />
          <meta property="og:image" content={`${window.location.origin}${book.coverImageUrl}`} />
          <meta property="og:url" content={`${window.location.origin}/customize/${selectedStory?.id}`} />
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
            <h1 className="text-3xl font-bold">
              Customize Your Book
            </h1>
          </div>
          <div className="mb-6 text-lg text-muted-foreground">
            <p>
              {template?.description ? (
                <>
                  <strong>{template.name}:</strong> {template.description} <br />
                  This <strong>personalized children's book</strong> lets you customize names, appearances, family structure, and your unique journey. Perfect for {template.family_structure} and donor-conceived families. A unique, heartfelt gift!
                </>
              ) : (
                <>Create a <strong>fully personalized children's book</strong> for {selectedStory?.name || "your child"}. Customize names, appearances, family structure, and your unique journey. Perfect for donor-conceived, IVF, and diverse families. A unique, heartfelt gift!</>
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
              template={selectedStory}
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

export default CustomizeBook;
