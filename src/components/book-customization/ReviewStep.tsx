
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, User, Users, Palette, PenLine } from "lucide-react";

type ReviewStepProps = {
  bookData: any;
  template: any;
  onDedicationChange: (value: string) => void;
  onTitleChange: (value: string) => void;
};

const ReviewStep = ({
  bookData,
  template,
  onDedicationChange,
  onTitleChange
}: ReviewStepProps) => {
  const [activeTab, setActiveTab] = useState("preview");

  const getFamilyStructureLabel = () => {
    switch (bookData.familyStructure) {
      case "two-parents": return "Two Parents";
      case "single-mom": return "Single Mom by Choice";
      case "single-dad": return "Single Dad by Choice";
      case "two-moms": return "Two Moms";
      case "two-dads": return "Two Dads";
      case "grandparents": return "Grandparent(s) as Guardian";
      case "adoptive": return "Adoptive Family";
      default: return bookData.familyStructure;
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">Review Your Book</h2>
        <p className="text-muted-foreground">
          Review and finalize your personalized book before publishing
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="book-title">Book Title</Label>
          <Input
            id="book-title"
            value={bookData.title}
            onChange={(e) => onTitleChange(e.target.value)}
            placeholder="Enter book title"
            className="text-lg"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="dedication">Dedication (Optional)</Label>
          <Textarea
            id="dedication"
            value={bookData.dedication || ""}
            onChange={(e) => onDedicationChange(e.target.value)}
            placeholder="Add a special dedication to appear at the beginning of the book"
            rows={3}
          />
          <p className="text-sm text-muted-foreground">
            Example: "For Sarah, with all our love"
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-8">
          <TabsList className="grid grid-cols-2 w-full max-w-md mx-auto mb-6">
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="details">Details</TabsTrigger>
          </TabsList>
          
          <TabsContent value="preview">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-start gap-8">
                  <div className="relative">
                    <div className="w-full md:w-64 aspect-[3/4] bg-muted rounded-md overflow-hidden">
                      {template.thumbnail_url ? (
                        <img
                          src={template.thumbnail_url}
                          alt={template.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-primary/10">
                          <BookOpen className="h-12 w-12 text-primary" />
                        </div>
                      )}
                      
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 p-6 text-white text-center">
                        <h3 className="text-2xl font-bold mb-2">
                          {bookData.title || template.name}
                        </h3>
                        {bookData.childName && (
                          <p className="text-lg mb-2">Featuring: {bookData.childName}</p>
                        )}
                        <p className="text-sm opacity-80 mt-auto">
                          A personalized story for your family
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-4">Book Preview</h3>
                    
                    <div className="prose max-w-none">
                      <p>
                        Based on your customizations, your book will feature:
                      </p>
                      <ul className="list-disc pl-5 space-y-2 mt-3">
                        <li>
                          <strong>Main character:</strong>{" "}
                          {bookData.childName || "Your child"} 
                          {bookData.childAge && ` (${bookData.childAge} ${parseInt(bookData.childAge) === 1 ? 'year' : 'years'} old)`}
                          {bookData.childGender && `, ${bookData.childGender}`}
                        </li>
                        <li>
                          <strong>Family structure:</strong> {getFamilyStructureLabel()}
                        </li>
                        <li>
                          <strong>Family members:</strong>{" "}
                          {bookData.familyMembers && bookData.familyMembers.length > 0 
                            ? bookData.familyMembers
                                .filter(member => member.name)
                                .map(member => 
                                  `${member.name} (${member.customRole || member.role})`
                                )
                                .join(", ")
                            : "No family members added"
                          }
                        </li>
                        {bookData.dedication && (
                          <li>
                            <strong>Dedication:</strong> "{bookData.dedication}"
                          </li>
                        )}
                      </ul>
                      
                      <p className="mt-4">
                        <strong>Book type:</strong> {template.name}
                      </p>
                      <p>
                        <strong>Number of pages:</strong> {template.pages}
                      </p>
                      <p>
                        <strong>Age range:</strong> {template.age_range}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="details">
            <div className="grid gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <User className="h-5 w-5 text-primary" />
                    <h3 className="text-lg font-semibold">Child Details</h3>
                  </div>
                  <dl className="grid grid-cols-2 gap-x-4 gap-y-2">
                    <dt className="text-muted-foreground">Name:</dt>
                    <dd>{bookData.childName || "Not provided"}</dd>
                    <dt className="text-muted-foreground">Age:</dt>
                    <dd>
                      {bookData.childAge 
                        ? `${bookData.childAge} ${parseInt(bookData.childAge) === 1 ? 'year' : 'years'} old`
                        : "Not provided"}
                    </dd>
                    <dt className="text-muted-foreground">Gender:</dt>
                    <dd>{bookData.childGender || "Not provided"}</dd>
                  </dl>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Users className="h-5 w-5 text-primary" />
                    <h3 className="text-lg font-semibold">Family Structure</h3>
                  </div>
                  <dl className="grid grid-cols-2 gap-x-4 gap-y-2">
                    <dt className="text-muted-foreground">Type:</dt>
                    <dd>{getFamilyStructureLabel()}</dd>
                    <dt className="text-muted-foreground">Members:</dt>
                    <dd>
                      {bookData.familyMembers && bookData.familyMembers.length > 0
                        ? bookData.familyMembers.length
                        : "None"}
                    </dd>
                  </dl>

                  {bookData.familyMembers && bookData.familyMembers.length > 0 && (
                    <div className="mt-4 border-t pt-4">
                      <h4 className="font-medium mb-2">Family Member Details</h4>
                      <ul className="space-y-2">
                        {bookData.familyMembers.map((member, index) => (
                          <li key={member.id} className="flex items-center gap-2">
                            <span className="text-sm px-2 py-1 rounded-full bg-muted">
                              {member.customRole || member.role}
                            </span>
                            <span>{member.name || "Unnamed"}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Palette className="h-5 w-5 text-primary" />
                    <h3 className="text-lg font-semibold">Illustration Settings</h3>
                  </div>
                  <dl className="grid grid-cols-2 gap-x-4 gap-y-2">
                    {bookData.selectedIllustrations?.childSkinTone && (
                      <>
                        <dt className="text-muted-foreground">Child Skin Tone:</dt>
                        <dd className="capitalize">{bookData.selectedIllustrations.childSkinTone}</dd>
                      </>
                    )}
                    
                    {bookData.selectedIllustrations?.childHairColor && (
                      <>
                        <dt className="text-muted-foreground">Child Hair Color:</dt>
                        <dd className="capitalize">{bookData.selectedIllustrations.childHairColor}</dd>
                      </>
                    )}
                    
                    {bookData.selectedIllustrations?.childHairStyle && (
                      <>
                        <dt className="text-muted-foreground">Child Hair Style:</dt>
                        <dd className="capitalize">{bookData.selectedIllustrations.childHairStyle}</dd>
                      </>
                    )}
                    
                    {bookData.selectedIllustrations?.colorTheme && (
                      <>
                        <dt className="text-muted-foreground">Color Theme:</dt>
                        <dd className="capitalize">{bookData.selectedIllustrations.colorTheme}</dd>
                      </>
                    )}
                    
                    {bookData.selectedIllustrations?.background && (
                      <>
                        <dt className="text-muted-foreground">Background Scene:</dt>
                        <dd className="capitalize">{bookData.selectedIllustrations.background}</dd>
                      </>
                    )}
                  </dl>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <PenLine className="h-5 w-5 text-primary" />
                    <h3 className="text-lg font-semibold">Text & Dedication</h3>
                  </div>
                  <dl className="grid grid-cols-2 gap-x-4 gap-y-2">
                    <dt className="text-muted-foreground">Book Title:</dt>
                    <dd>{bookData.title || template.name}</dd>
                    <dt className="text-muted-foreground">Dedication:</dt>
                    <dd>{bookData.dedication || "None provided"}</dd>
                  </dl>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ReviewStep;
