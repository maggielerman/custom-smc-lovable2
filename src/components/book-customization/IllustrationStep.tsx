import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Palette, Check } from "lucide-react";

type IllustrationStepProps = {
  selectedIllustrations: Record<string, any>;
  onChange: (value: Record<string, any>) => void;
  bookType: string;
};

const skinTones = [
  { value: "light", label: "Light", color: "#FFE0BD" },
  { value: "medium-light", label: "Medium Light", color: "#F1C27D" },
  { value: "medium", label: "Medium", color: "#E0AC69" },
  { value: "medium-dark", label: "Medium Dark", color: "#C68642" },
  { value: "dark", label: "Dark", color: "#8D5524" },
];

const hairColors = [
  { value: "black", label: "Black", color: "#252525" },
  { value: "brown", label: "Brown", color: "#6A4E42" },
  { value: "blonde", label: "Blonde", color: "#FFF5E1" },
  { value: "red", label: "Red", color: "#D36B56" },
  { value: "gray", label: "Gray", color: "#AAAAAA" },
];

const hairStyles = [
  { value: "short", label: "Short" },
  { value: "medium", label: "Medium" },
  { value: "long", label: "Long" },
  { value: "curly", label: "Curly" },
  { value: "wavy", label: "Wavy" },
];

const backgrounds = [
  { value: "home", label: "Home", image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&q=80&w=2670&ixlib=rb-4.0.3" },
  { value: "garden", label: "Garden", image: "https://images.unsplash.com/photo-1560429502-d55f5eb98848?auto=format&fit=crop&q=60&w=800&ixlib=rb-4.0.3" },
  { value: "beach", label: "Beach", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=2673&ixlib=rb-4.0.3" },
  { value: "park", label: "Park", image: "https://images.unsplash.com/photo-1519331379826-f10be5486c6f?auto=format&fit=crop&q=80&w=2672&ixlib=rb-4.0.3" },
];

const IllustrationStep = ({
  selectedIllustrations,
  onChange,
  bookType
}: IllustrationStepProps) => {
  const [activeTab, setActiveTab] = useState("child");
  
  const handleChange = (category: string, value: any) => {
    onChange({
      ...selectedIllustrations,
      [category]: value
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
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Child Appearance</h3>
            
            <div className="space-y-4">
              <div>
                <Label className="mb-2 block">Skin Tone</Label>
                <RadioGroup
                  value={selectedIllustrations.childSkinTone || skinTones[0].value}
                  onValueChange={(value) => handleChange("childSkinTone", value)}
                  className="flex flex-wrap gap-2"
                >
                  {skinTones.map((tone) => (
                    <div key={tone.value} className="relative">
                      <RadioGroupItem
                        value={tone.value}
                        id={`child-skin-${tone.value}`}
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor={`child-skin-${tone.value}`}
                        className="flex flex-col items-center justify-center rounded-md border-2 border-muted hover:border-[var(--navy)] cursor-pointer p-1 peer-data-[state=checked]:border-[var(--navy)] [&:has([data-state=checked])]:border-[var(--navy)]"
                      >
                        <div 
                          className="w-12 h-12 rounded-full"
                          style={{ backgroundColor: tone.color }}
                        >
                          <div className="w-full h-full rounded-full flex items-center justify-center">
                            {selectedIllustrations.childSkinTone === tone.value && (
                              <Check className="text-white drop-shadow" />
                            )}
                          </div>
                        </div>
                        <span className="text-xs mt-1">{tone.label}</span>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div>
                <Label className="mb-2 block">Hair Color</Label>
                <RadioGroup
                  value={selectedIllustrations.childHairColor || hairColors[0].value}
                  onValueChange={(value) => handleChange("childHairColor", value)}
                  className="flex flex-wrap gap-2"
                >
                  {hairColors.map((color) => (
                    <div key={color.value} className="relative">
                      <RadioGroupItem
                        value={color.value}
                        id={`child-hair-${color.value}`}
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor={`child-hair-${color.value}`}
                        className="flex flex-col items-center justify-center rounded-md border-2 border-muted hover:border-[var(--navy)] cursor-pointer p-1 peer-data-[state=checked]:border-[var(--navy)] [&:has([data-state=checked])]:border-[var(--navy)]"
                      >
                        <div 
                          className="w-12 h-12 rounded-full"
                          style={{ backgroundColor: color.color }}
                        >
                          <div className="w-full h-full rounded-full flex items-center justify-center">
                            {selectedIllustrations.childHairColor === color.value && (
                              <Check className={`${['blonde', 'gray'].includes(color.value) ? 'text-black' : 'text-white'} drop-shadow`} />
                            )}
                          </div>
                        </div>
                        <span className="text-xs mt-1">{color.label}</span>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div>
                <Label className="mb-2 block">Hair Style</Label>
                <RadioGroup
                  value={selectedIllustrations.childHairStyle || hairStyles[0].value}
                  onValueChange={(value) => handleChange("childHairStyle", value)}
                  className="grid grid-cols-3 sm:grid-cols-5 gap-2"
                >
                  {hairStyles.map((style) => (
                    <div key={style.value}>
                      <RadioGroupItem
                        value={style.value}
                        id={`child-style-${style.value}`}
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor={`child-style-${style.value}`}
                        className="flex items-center justify-center rounded-md border-2 border-muted p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-[var(--navy)] [&:has([data-state=checked])]:border-[var(--navy)] cursor-pointer text-center"
                      >
                        {style.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="family" className="space-y-6">
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Family Appearance</h3>
            
            <div>
              <Label className="mb-2 block">Family Overall Skin Tone</Label>
              <p className="text-sm text-muted-foreground mb-3">
                You can set a general skin tone for the family, individual members will have variations
              </p>
              <RadioGroup
                value={selectedIllustrations.familySkinTone || skinTones[0].value}
                onValueChange={(value) => handleChange("familySkinTone", value)}
                className="flex flex-wrap gap-2"
              >
                {skinTones.map((tone) => (
                  <div key={tone.value} className="relative">
                    <RadioGroupItem
                      value={tone.value}
                      id={`family-skin-${tone.value}`}
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor={`family-skin-${tone.value}`}
                      className="flex flex-col items-center justify-center rounded-md border-2 border-muted hover:border-[var(--navy)] cursor-pointer p-1 peer-data-[state=checked]:border-[var(--navy)] [&:has([data-state=checked])]:border-[var(--navy)]"
                    >
                      <div 
                        className="w-12 h-12 rounded-full"
                        style={{ backgroundColor: tone.color }}
                      >
                        <div className="w-full h-full rounded-full flex items-center justify-center">
                          {selectedIllustrations.familySkinTone === tone.value && (
                            <Check className="text-white drop-shadow" />
                          )}
                        </div>
                      </div>
                      <span className="text-xs mt-1">{tone.label}</span>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div className="py-2">
              <Label className="mb-2 block">Art Style</Label>
              <RadioGroup
                value={selectedIllustrations.artStyle || "friendly"}
                onValueChange={(value) => handleChange("artStyle", value)}
                className="grid grid-cols-1 sm:grid-cols-3 gap-4"
              >
                <div>
                  <RadioGroupItem value="friendly" id="friendly-art" className="peer sr-only" />
                  <Label
                    htmlFor="friendly-art"
                    className="flex flex-col h-full gap-2 rounded-md border-2 border-muted p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-[var(--navy)] [&:has([data-state=checked])]:border-[var(--navy)] cursor-pointer"
                  >
                    <div className="font-medium">Friendly</div>
                    <div className="text-sm text-muted-foreground">
                      Cheerful, cartoonish illustration style with bright colors
                    </div>
                  </Label>
                </div>
                
                <div>
                  <RadioGroupItem value="modern" id="modern-art" className="peer sr-only" />
                  <Label
                    htmlFor="modern-art"
                    className="flex flex-col h-full gap-2 rounded-md border-2 border-muted p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-[var(--navy)] [&:has([data-state=checked])]:border-[var(--navy)] cursor-pointer"
                  >
                    <div className="font-medium">Modern</div>
                    <div className="text-sm text-muted-foreground">
                      Clean, simple, contemporary illustration style
                    </div>
                  </Label>
                </div>
                
                <div>
                  <RadioGroupItem value="storybook" id="storybook-art" className="peer sr-only" />
                  <Label
                    htmlFor="storybook-art"
                    className="flex flex-col h-full gap-2 rounded-md border-2 border-muted p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-[var(--navy)] [&:has([data-state=checked])]:border-[var(--navy)] cursor-pointer"
                  >
                    <div className="font-medium">Storybook</div>
                    <div className="text-sm text-muted-foreground">
                      Classic, hand-drawn storybook illustration style
                    </div>
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="scenes" className="space-y-6">
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Scene Settings</h3>
            
            <div>
              <Label className="mb-2 block">Color Theme</Label>
              <div className="grid grid-cols-3 gap-3 mb-4">
                <Button
                  type="button"
                  variant={selectedIllustrations.colorTheme === "bright" ? "default" : "outline"}
                  className="flex flex-col gap-1 h-auto py-3"
                  onClick={() => handleChange("colorTheme", "bright")}
                >
                  <Palette className="h-5 w-5" />
                  <span>Bright</span>
                </Button>
                <Button
                  type="button"
                  variant={selectedIllustrations.colorTheme === "pastel" ? "default" : "outline"}
                  className="flex flex-col gap-1 h-auto py-3"
                  onClick={() => handleChange("colorTheme", "pastel")}
                >
                  <Palette className="h-5 w-5" />
                  <span>Pastel</span>
                </Button>
                <Button
                  type="button"
                  variant={selectedIllustrations.colorTheme === "muted" ? "default" : "outline"}
                  className="flex flex-col gap-1 h-auto py-3"
                  onClick={() => handleChange("colorTheme", "muted")}
                >
                  <Palette className="h-5 w-5" />
                  <span>Muted</span>
                </Button>
              </div>
            </div>

            <div className="py-2">
              <Label className="mb-2 block">Background Scenes</Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {backgrounds.map((bg) => (
                  <div key={bg.value} className="relative">
                    <input
                      type="radio"
                      name="background"
                      id={`bg-${bg.value}`}
                      value={bg.value}
                      checked={selectedIllustrations.background === bg.value}
                      onChange={() => handleChange("background", bg.value)}
                      className="peer absolute opacity-0"
                    />
                    <label
                      htmlFor={`bg-${bg.value}`}
                      className="block cursor-pointer rounded-lg overflow-hidden border-2 peer-checked:border-[var(--navy)] transition-all"
                    >
                      <div className="aspect-square relative overflow-hidden">
                        <img
                          src={bg.image}
                          alt={bg.label}
                          className="w-full h-full object-cover"
                        />
                        <div className={`absolute inset-0 flex items-center justify-center bg-black/20 ${selectedIllustrations.background === bg.value ? 'opacity-100' : 'opacity-0 peer-hover:opacity-50'}`}>
                          {selectedIllustrations.background === bg.value && (
                            <Check className="text-white h-6 w-6" />
                          )}
                        </div>
                      </div>
                      <div className="p-2 text-center">{bg.label}</div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default IllustrationStep;
