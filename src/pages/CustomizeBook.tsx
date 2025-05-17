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

type BookTemplate = {
  id: string;
  name: string;
  description: string;
  thumbnail_url: string | null;
  pages: number;
  age_range: string;
};

const DUMMY_STORIES = [
  {
    id: 'b7e1c2a0-1234-4cde-8f2a-abcdef123456',
    name: 'Two Moms, Sperm Donor',
    description: 'A story for families with two moms, conceived via sperm donation.',
    donor_process: 'sperm',
    art_process: 'IVF',
    family_structure: 'two moms',
    thumbnail_url: null,
    pages: 24,
    age_range: '3-7',
  },
  {
    id: 'c8f2d3b1-2345-4def-9a3b-bcdef2345678',
    name: 'Single Dad, Egg Donor, Surrogacy',
    description: 'A story for single dads who used an egg donor and a surrogate.',
    donor_process: 'egg',
    art_process: 'surrogacy',
    family_structure: 'single dad',
    thumbnail_url: null,
    pages: 24,
    age_range: '3-7',
  },
  {
    id: 'd9e3f4c2-3456-4efa-ab4c-cdef34567890',
    name: 'Mom and Dad, IVF',
    description: 'A story for mom and dad families who used IVF.',
    donor_process: 'none',
    art_process: 'IVF',
    family_structure: 'mom and dad',
    thumbnail_url: null,
    pages: 24,
    age_range: '3-7',
  },
];

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

  // Book customization data
  const [bookData, setBookData] = useState({
    title: "",
    familyStructure: "",
    familyMembers: [],
    childName: "",
    childAge: "",
    childGender: "",
    selectedIllustrations: {},
    dedication: "",
  });
  
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
            'selectedIllustrations' in obj &&
            'dedication' in obj;
          if (typeof data.content === 'object' && !Array.isArray(data.content) && isValidBookData(data.content)) {
            setBookData(data.content as typeof bookData);
          } else {
            setBookData({
              title: "",
              familyStructure: "",
              familyMembers: [],
              childName: "",
              childAge: "",
              childGender: "",
              selectedIllustrations: {},
              dedication: "",
            });
          }
          // Set selectedStory based on template_id
          const found = DUMMY_STORIES.find(story => story.id === data.template_id);
          setSelectedStory(found || null);
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

  const handleUpdateField = (field: string, value: any) => {
    setBookData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async (publish = false) => {
    if (!user) {
      toast("Please login to save your book");
      navigate("/login", { state: { redirectTo: window.location.pathname } });
      return;
    }

    try {
      setSaving(true);
      const book = {
        title: bookData.title || selectedStory?.name || "Untitled Book",
        content: bookData,
        template_id: selectedStory?.id,
        user_id: user.id,
        published: publish,
      };
      let data, error;
      if (bookId) {
        // Update existing book
        ({ data, error } = await supabaseClient
          .from("books")
          .update({ ...book, updated_at: new Date().toISOString() })
          .eq("id", bookId)
          .select()
          .single());
      } else {
        // Insert new book
        ({ data, error } = await supabaseClient
          .from("books")
          .insert(book)
          .select()
          .single());
      }
      if (error) throw error;
      toast.success(
        publish ? "Book published successfully!" : "Draft saved successfully!"
      );
      if (!publish) {
        navigate("/");
      }
    } catch (error: any) {
      console.error("Error saving book:", error);
      toast.error("Failed to save book", { description: error?.message || String(error) });
    } finally {
      setSaving(false);
    }
  };

  const handleAddToCart = () => {
    if (!selectedStory) return;
    
    // Create book item for cart
    const bookItem = {
      id: crypto.randomUUID(), // Generate temporary ID for non-saved books
      title: bookData.title || selectedStory.name,
      price: 29.99, // Default price
      coverImageUrl: selectedStory.thumbnail_url,
      quantity: 1
    };
    
    addItem(bookItem);
    toast.success(`${bookItem.title} added to cart`);
  };

  const handleBuyNow = () => {
    // First add to cart
    handleAddToCart();
    // Then navigate to cart
    navigate("/cart");
  };

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

  if (!selectedStory && !loading) {
    const filteredStories = DUMMY_STORIES.filter(story =>
      (!filter.donor_process || story.donor_process === filter.donor_process) &&
      (!filter.art_process || story.art_process === filter.art_process) &&
      (!filter.family_structure || story.family_structure === filter.family_structure)
    );
    return (
      <div className="flex flex-col min-h-screen">
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
                <Button onClick={() => setSelectedStory(story)} className="mt-auto">Select</Button>
              </div>
            ))}
            {filteredStories.length === 0 && (
              <div className="col-span-full text-center text-muted-foreground py-12">No stories match your filters.</div>
            )}
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (templateId && !selectedStory && !loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow container py-10 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Story Not Found</h1>
            <p className="text-muted-foreground mb-8">The story template you are looking for does not exist.</p>
            <Button asChild>
              <a href="/customize/">Back to Story Selection</a>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const template = selectedStory;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow container py-10">
        <div className="flex items-center mb-8">
          <Button variant="ghost" onClick={handleBack} className="mr-4">
            <ChevronLeft className="h-5 w-5 mr-2" />
            {currentStep === 0 ? "Back" : "Previous Step"}
          </Button>
          <h1 className="text-3xl font-bold">Customize Your Book</h1>
        </div>

        <div className="mb-10">
          <CustomizationStepper steps={steps} currentStep={currentStep} />
        </div>

        <div className="max-w-4xl mx-auto">
          {template && (
            <>
              {currentStep === 0 && (
                <FamilyStructureStep 
                  value={bookData.familyStructure}
                  onChange={(value) => handleUpdateField("familyStructure", value)}
                />
              )}
              
              {currentStep === 1 && (
                <FamilyMembersStep 
                  familyStructure={bookData.familyStructure}
                  familyMembers={bookData.familyMembers}
                  onChange={(value) => handleUpdateField("familyMembers", value)}
                />
              )}
              
              {currentStep === 2 && (
                <ChildDetailsStep 
                  childName={bookData.childName}
                  childAge={bookData.childAge}
                  childGender={bookData.childGender}
                  onNameChange={(value) => handleUpdateField("childName", value)}
                  onAgeChange={(value) => handleUpdateField("childAge", value)}
                  onGenderChange={(value) => handleUpdateField("childGender", value)}
                />
              )}
              
              {currentStep === 3 && (
                <IllustrationStep 
                  selectedIllustrations={bookData.selectedIllustrations}
                  onChange={(value) => handleUpdateField("selectedIllustrations", value)}
                  bookType={template.name}
                />
              )}
              
              {currentStep === 4 && (
                <ReviewStep 
                  bookData={bookData}
                  template={template}
                  onDedicationChange={(value) => handleUpdateField("dedication", value)}
                  onTitleChange={(value) => handleUpdateField("title", value)}
                />
              )}
            </>
          )}
          
          <div className="flex justify-between mt-12">
            <Button 
              variant="outline" 
              onClick={handleBack}
              disabled={saving}
            >
              {currentStep === 0 ? "Cancel" : "Back"}
            </Button>
            
            <div className="space-x-3">
              {currentStep === steps.length - 1 ? (
                <>
                  <Button 
                    variant="outline" 
                    onClick={() => handleSave(false)} 
                    disabled={saving}
                  >
                    <Save className="h-4 w-4 mr-2" />
                    {saving ? "Saving..." : "Save Draft"}
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={handleAddToCart} 
                    disabled={saving}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                  <Button 
                    onClick={handleBuyNow} 
                    disabled={saving}
                  >
                    Buy Now
                  </Button>
                </>
              ) : (
                <Button onClick={handleNext} disabled={
                  (currentStep === 0 && !bookData.familyStructure) ||
                  (currentStep === 1 && (!bookData.familyMembers || bookData.familyMembers.length === 0)) ||
                  (currentStep === 2 && !bookData.childName)
                }>
                  Next
                  <ChevronRight className="h-5 w-5 ml-2" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CustomizeBook;
