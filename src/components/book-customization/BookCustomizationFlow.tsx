import React from "react";
import { Button } from "@/components/ui/button";
import CustomizationStepper from "@/components/CustomizationStepper";
import FamilyStructureStep from "@/components/book-customization/FamilyStructureStep";
import FamilyMembersStep from "@/components/book-customization/FamilyMembersStep";
import ChildDetailsStep from "@/components/book-customization/ChildDetailsStep";
import IllustrationStep from "@/components/book-customization/IllustrationStep";
import ReviewStep from "@/components/book-customization/ReviewStep";
import { ChevronRight, Save, ShoppingCart } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface BookCustomizationFlowProps {
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
  template: any;
  savedFamilies?: any[];
  onLoadFamily?: (family: any) => void;
  handleSaveFamily?: () => void;
}

const BookCustomizationFlow: React.FC<BookCustomizationFlowProps> = ({
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
  template,
  savedFamilies,
  onLoadFamily,
  handleSaveFamily,
}) => {
  const handleUpdateField = (field: string, value: any) => {
    setBookData((prev: any) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <>
      <div className="mb-10">
        <CustomizationStepper steps={steps} currentStep={currentStep} />
      </div>
      <div className="max-w-4xl mx-auto">
        {template && (
          <>
            {currentStep === 0 && (
              <>
                {savedFamilies && savedFamilies.length > 0 && (
                  <div className="mb-6 max-w-sm">
                    <Label htmlFor="saved-family">Use Saved Family</Label>
                    <Select
                      onValueChange={(val) => {
                        const fam = savedFamilies.find((f) => f.id === val);
                        if (fam && onLoadFamily) onLoadFamily(fam);
                      }}
                    >
                      <SelectTrigger id="saved-family">
                        <SelectValue placeholder="Choose a saved family" />
                      </SelectTrigger>
                      <SelectContent>
                        {savedFamilies.map((f) => (
                          <SelectItem key={f.id} value={f.id}>
                            {f.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
                <FamilyStructureStep
                  value={bookData.familyStructure}
                  onChange={(value) => handleUpdateField("familyStructure", value)}
                />
              </>
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
                childPronouns={bookData.childPronouns}
                conceptionMethod={bookData.conceptionMethod}
                donorType={bookData.donorType}
                surrogateName={bookData.surrogateName}
                onNameChange={(value) => handleUpdateField("childName", value)}
                onAgeChange={(value) => handleUpdateField("childAge", value)}
                onGenderChange={(value) => handleUpdateField("childGender", value)}
                onPronounsChange={(value) => handleUpdateField("childPronouns", value)}
                onConceptionMethodChange={(value) => handleUpdateField("conceptionMethod", value)}
                onDonorTypeChange={(value) => handleUpdateField("donorType", value)}
                onSurrogateNameChange={(value) => handleUpdateField("surrogateName", value)}
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
              <>
                <div className="flex items-center mb-4">
                  <span className="inline-block bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full mr-2">Real-time Preview</span>
                  <span className="text-sm text-muted-foreground">See your customizations instantly below.</span>
                </div>
                <ReviewStep
                  bookData={bookData}
                  template={template}
                  onDedicationChange={(value) => handleUpdateField("dedication", value)}
                  onTitleChange={(value) => handleUpdateField("title", value)}
                />
              </>
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
            {currentStep === 1 && handleSaveFamily && (
              <Button variant="outline" onClick={handleSaveFamily} disabled={saving}>
                <Save className="h-4 w-4 mr-2" />
                Save Family
              </Button>
            )}
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
              <Button
                onClick={handleNext}
                disabled={
                  (currentStep === 0 && !bookData.familyStructure) ||
                  (currentStep === 1 && (!bookData.familyMembers || bookData.familyMembers.length === 0)) ||
                  (currentStep === 2 && !bookData.childName)
                }
              >
                Next
                <ChevronRight className="h-5 w-5 ml-2" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default BookCustomizationFlow; 