
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabaseClient } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { BookOpen, Save, ArrowLeft } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type BookTemplate = {
  id: string;
  name: string;
  description: string;
  thumbnail_url: string;
  pages: number;
  age_range: string;
};

const BookEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState<any>({});
  const [isNew, setIsNew] = useState(!id || id === "new");
  const [templates, setTemplates] = useState<BookTemplate[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<string>("");
  const [currentStep, setCurrentStep] = useState(isNew ? 1 : 2);

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const { data, error } = await supabaseClient
          .from("book_templates")
          .select("*");
        
        if (error) throw error;
        
        setTemplates(data || []);
        if (data && data.length > 0) {
          setSelectedTemplate(data[0].id);
        }
      } catch (error) {
        console.error("Error fetching book templates:", error);
        toast.error("Failed to load book templates");
      }
    };

    const fetchBook = async () => {
      if (isNew) return;
      
      try {
        setLoading(true);
        const { data, error } = await supabaseClient
          .from("books")
          .select("*")
          .eq("id", id)
          .eq("user_id", user?.id)
          .maybeSingle();
        
        if (error) throw error;
        
        if (!data) {
          toast.error("Book not found or you don't have permission to edit it");
          navigate("/my-books");
          return;
        }
        
        setTitle(data.title);
        setContent(data.content || {});
        setSelectedTemplate(data.template_id);
      } catch (error) {
        console.error("Error fetching book:", error);
        toast.error("Failed to load book");
        navigate("/my-books");
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchTemplates();
      if (!isNew) {
        fetchBook();
      }
    }
  }, [user, id, isNew, navigate]);

  const handleSave = async (publish = false) => {
    if (!user) return;
    
    try {
      setSaving(true);
      
      const bookData = {
        title: title.trim() || "Untitled Book",
        content,
        published: publish,
        user_id: user.id,
        template_id: selectedTemplate,
      };
      
      let response;
      
      if (isNew) {
        response = await supabaseClient
          .from("books")
          .insert(bookData)
          .select()
          .single();
      } else {
        response = await supabaseClient
          .from("books")
          .update({
            ...bookData,
            updated_at: new Date().toISOString(),
          })
          .eq("id", id)
          .select()
          .single();
      }
      
      const { data, error } = response;
      
      if (error) throw error;
      
      toast.success(
        publish ? "Book published successfully!" : "Draft saved successfully!"
      );
      
      if (isNew) {
        // Redirect to the edit page if this was a new book
        navigate(`/books/${data.id}/edit`, { replace: true });
        setIsNew(false);
      }
      
      return data;
    } catch (error: any) {
      console.error("Error saving book:", error);
      toast.error("Failed to save book");
      return null;
    } finally {
      setSaving(false);
    }
  };

  const handleContentChange = (field: string, value: any) => {
    setContent((prev: any) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      navigate("/my-books");
    }
  };

  if (loading) {
    return (
      <div className="container py-10 flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="container py-10">
      <div className="flex items-center mb-8">
        <Button variant="ghost" onClick={handleBack} className="mr-4">
          <ArrowLeft className="h-5 w-5 mr-2" />
          {currentStep > 1 ? "Back" : "My Books"}
        </Button>
        <h1 className="text-3xl font-bold">{isNew ? "Create New Book" : "Edit Book"}</h1>
      </div>

      {currentStep === 1 && (
        <div className="space-y-6 max-w-3xl mx-auto">
          <h2 className="text-xl font-semibold">Step 1: Choose a Template</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {templates.map((template) => (
              <Card 
                key={template.id}
                className={`cursor-pointer transition-all ${
                  selectedTemplate === template.id 
                    ? "ring-2 ring-primary" 
                    : "hover:bg-accent"
                }`}
                onClick={() => setSelectedTemplate(template.id)}
              >
                <CardContent className="p-6">
                  <div className="aspect-square rounded-md overflow-hidden mb-4">
                    {template.thumbnail_url ? (
                      <img 
                        src={template.thumbnail_url} 
                        alt={template.name}
                        className="w-full h-full object-cover" 
                      />
                    ) : (
                      <div className="w-full h-full bg-muted flex items-center justify-center">
                        <BookOpen className="h-12 w-12 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                  <h3 className="text-lg font-semibold">{template.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{template.description}</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs bg-muted px-2 py-1 rounded-full">
                      {template.pages} pages
                    </span>
                    <span className="text-xs bg-muted px-2 py-1 rounded-full">
                      Ages: {template.age_range}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="flex justify-end mt-8">
            <Button onClick={handleNext} disabled={!selectedTemplate}>
              Continue
            </Button>
          </div>
        </div>
      )}

      {currentStep === 2 && (
        <div className="space-y-6 max-w-3xl mx-auto">
          <h2 className="text-xl font-semibold">Step 2: Book Details</h2>
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Book Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter book title"
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="dedication">Dedication</Label>
              <Textarea
                id="dedication"
                value={content.dedication || ""}
                onChange={(e) => handleContentChange("dedication", e.target.value)}
                placeholder="Add a special dedication (optional)"
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="mainCharacter">Main Character Name</Label>
              <Input
                id="mainCharacter"
                value={content.mainCharacterName || ""}
                onChange={(e) => handleContentChange("mainCharacterName", e.target.value)}
                placeholder="Enter main character name"
                className="mt-1"
              />
            </div>
          </div>
          
          <div className="flex justify-between mt-8">
            <Button variant="outline" onClick={handleBack}>
              Back
            </Button>
            <div className="space-x-2">
              <Button variant="outline" onClick={() => handleSave(false)} disabled={saving}>
                <Save className="h-4 w-4 mr-2" />
                {saving ? "Saving..." : "Save Draft"}
              </Button>
              <Button onClick={handleNext}>
                Continue
              </Button>
            </div>
          </div>
        </div>
      )}

      {currentStep === 3 && (
        <div className="space-y-6 max-w-5xl mx-auto">
          <h2 className="text-xl font-semibold">Step 3: Customize Story</h2>
          
          <Tabs defaultValue="edit">
            <TabsList className="mb-6">
              <TabsTrigger value="edit">Edit</TabsTrigger>
              <TabsTrigger value="preview">Preview</TabsTrigger>
            </TabsList>
            
            <TabsContent value="edit">
              <div className="space-y-6">
                <div>
                  <Label>Story Settings</Label>
                  <Textarea
                    value={content.storySettings || ""}
                    onChange={(e) => handleContentChange("storySettings", e.target.value)}
                    placeholder="Describe the setting of your story"
                    className="mt-2"
                    rows={4}
                  />
                </div>
                
                <div>
                  <Label>Plot Elements</Label>
                  <Textarea
                    value={content.plotElements || ""}
                    onChange={(e) => handleContentChange("plotElements", e.target.value)}
                    placeholder="Describe key plot elements for your story"
                    className="mt-2"
                    rows={4}
                  />
                </div>
                
                <div>
                  <Label>Special Message</Label>
                  <Textarea
                    value={content.specialMessage || ""}
                    onChange={(e) => handleContentChange("specialMessage", e.target.value)}
                    placeholder="Add a special message to appear at the end of the book"
                    className="mt-2"
                  />
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="preview">
              <Card className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="aspect-[3/4] max-w-md mx-auto bg-muted rounded-md flex flex-col items-center justify-center p-8 text-center">
                    <h2 className="text-2xl font-bold mb-4">{title || "Untitled Book"}</h2>
                    {content.mainCharacterName && (
                      <p className="mb-2">Featuring: {content.mainCharacterName}</p>
                    )}
                    <div className="mt-auto">
                      <p className="text-sm text-muted-foreground">
                        This is a preview of your book cover.
                        More detailed preview coming soon.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          
          <div className="flex justify-between mt-8">
            <Button variant="outline" onClick={handleBack}>
              Back
            </Button>
            <div className="space-x-2">
              <Button variant="outline" onClick={() => handleSave(false)} disabled={saving}>
                <Save className="h-4 w-4 mr-2" />
                {saving ? "Saving..." : "Save Draft"}
              </Button>
              <Button onClick={() => handleSave(true)} disabled={saving}>
                {saving ? "Publishing..." : "Publish Book"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookEditor;
