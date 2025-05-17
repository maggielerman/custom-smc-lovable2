
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
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

const CustomizeBook = () => {
  const { templateId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addItem } = useCart();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [template, setTemplate] = useState<BookTemplate | null>(null);

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

  useEffect(() => {
    if (!templateId) {
      navigate("/book-types");
      return;
    }

    const fetchTemplate = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabaseClient
          .from("book_templates")
          .select("*")
          .eq("id", templateId)
          .single();

        if (error) throw error;
        
        if (data) {
          setTemplate(data);
          setBookData(prev => ({ 
            ...prev, 
            title: `${data.name} Story` 
          }));
        } else {
          toast.error("Template not found");
          navigate("/book-types");
        }
      } catch (error) {
        console.error("Error fetching template:", error);
        toast.error("Failed to load book template");
      } finally {
        setLoading(false);
      }
    };

    fetchTemplate();
  }, [templateId, navigate]);

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
      
      // Prepare book data for saving
      const book = {
        title: bookData.title || template?.name || "Untitled Book",
        content: bookData,
        template_id: templateId as string,
        user_id: user.id,
        published: publish,
      };
      
      const { data, error } = await supabaseClient
        .from("books")
        .insert(book)
        .select()
        .single();
        
      if (error) throw error;
      
      toast.success(
        publish ? "Book published successfully!" : "Draft saved successfully!"
      );
      
      // If we save as draft, redirect to my-books, otherwise stay on the page
      if (!publish) {
        navigate("/my-books");
      }
    } catch (error: any) {
      console.error("Error saving book:", error);
      toast.error("Failed to save book");
    } finally {
      setSaving(false);
    }
  };

  const handleAddToCart = () => {
    if (!template) return;
    
    // Create book item for cart
    const bookItem = {
      id: crypto.randomUUID(), // Generate temporary ID for non-saved books
      title: bookData.title || template.name,
      price: 29.99, // Default price
      coverImageUrl: template.thumbnail_url,
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

  if (loading) {
    return (
      <div className="container py-10 flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

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
