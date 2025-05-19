import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ChildAppearance from "./illustrations/ChildAppearance";
import FamilyAppearance from "./illustrations/FamilyAppearance";
import SceneSettings from "./illustrations/SceneSettings";

interface IllustrationStepProps {
  selectedIllustrations: Record<string, any>;
  onChange: (value: Record<string, any>) => void;
  bookType: string;
}

const IllustrationStep = ({ selectedIllustrations, onChange }: IllustrationStepProps) => {
  const [activeTab, setActiveTab] = useState("child");

  const handleChange = (category: string, value: any) => {
    onChange({
      ...selectedIllustrations,
      [category]: value,
    });
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">Customize Illustrations</h2>
        <p className="text-muted-foreground">
          Personalize how characters and scenes will appear in your book
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 w-full max-w-md mx-auto mb-6">
          <TabsTrigger value="child">Child</TabsTrigger>
          <TabsTrigger value="family">Family</TabsTrigger>
          <TabsTrigger value="scenes">Scenes</TabsTrigger>
        </TabsList>

        <TabsContent value="child" className="space-y-6">
          <ChildAppearance selectedIllustrations={selectedIllustrations} onChange={handleChange} />
        </TabsContent>

        <TabsContent value="family" className="space-y-6">
          <FamilyAppearance selectedIllustrations={selectedIllustrations} onChange={handleChange} />
        </TabsContent>

        <TabsContent value="scenes" className="space-y-6">
          <SceneSettings selectedIllustrations={selectedIllustrations} onChange={handleChange} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default IllustrationStep;
