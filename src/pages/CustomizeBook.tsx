import { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabaseClient } from "@/lib/supabase";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";
import { BookTemplate, DUMMY_STORIES } from "@/lib/bookTemplates";
import { useBookData } from "@/hooks/useBookData";
import { useBookActions } from "@/hooks/useBookActions";
import SelectStoryPage, { Filter } from "./customize/SelectStoryPage";
import { Users, Image, BookOpen } from "lucide-react";
import CustomizeView from "./customize/CustomizeView";

const CustomizeBook = () => {
  const { templateId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addItem } = useCart();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [filter, setFilter] = useState<Filter>({ donor_process: "", art_process: "", family_structure: "" });
  const [selectedStory, setSelectedStory] = useState<BookTemplate | null>(null);
  const { bookData, setBookData } = useBookData();
  const [families, setFamilies] = useState<any[]>([]);

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

  useEffect(() => {
    if (!user) return;
    const fetchFamilies = async () => {
      const { data } = await supabaseClient
        .from("families")
        .select("*")
        .eq("user_id", user.id);
      setFamilies(data || []);
    };
    fetchFamilies();
  }, [user]);

  useEffect(() => {
    if (bookId && user) {
      const fetchBook = async () => {
        setLoading(true);
        const { data } = await supabaseClient
          .from("books")
          .select("*")
          .eq("id", bookId)
          .eq("user_id", user.id)
          .maybeSingle();
        if (data && typeof data.content === "object") {
          setBookData(data.content as any);
          const template = DUMMY_STORIES.find((t) => t.id === data.template_id) || null;
          setSelectedStory(template);
        }
        setLoading(false);
      };
      fetchBook();
    }
  }, [bookId, user, setBookData]);

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

  const handleLoadFamily = (family: any) => {
    if (!family) return;
    setBookData((prev: any) => ({
      ...prev,
      familyStructure: family.structure,
      familyMembers: family.members,
    }));
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
      const found = DUMMY_STORIES.find((story) => story.id === templateId);
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
    return <SelectStoryPage filter={filter} setFilter={setFilter} onSelect={handleSelectStory} />;
  }

  if (templateId && !selectedStory && !loading) {
    return <div>Story not found.</div>;
  }

  if (!selectedStory) return null;

  return (
    <CustomizeView
      template={selectedStory}
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
      savedFamilies={families}
      onLoadFamily={handleLoadFamily}
    />
  );
};

export default CustomizeBook;
