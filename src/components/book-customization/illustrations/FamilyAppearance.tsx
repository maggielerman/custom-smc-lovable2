import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Check } from "lucide-react";
import { skinTones } from "./options";

interface FamilyAppearanceProps {
  selectedIllustrations: Record<string, any>;
  onChange: (category: string, value: any) => void;
}

const FamilyAppearance = ({ selectedIllustrations, onChange }: FamilyAppearanceProps) => (
  <div className="space-y-4">
    <h3 className="font-semibold text-lg">Family Appearance</h3>

    <div>
      <Label className="mb-2 block">Family Overall Skin Tone</Label>
      <p className="text-sm text-muted-foreground mb-3">
        You can set a general skin tone for the family, individual members will have variations
      </p>
      <RadioGroup
        value={selectedIllustrations.familySkinTone || skinTones[0].value}
        onValueChange={(value) => onChange("familySkinTone", value)}
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
              className="flex flex-col items-center justify-center rounded-md border-2 border-muted hover:border-primary cursor-pointer p-1 peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
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
        onValueChange={(value) => onChange("artStyle", value)}
        className="grid grid-cols-1 sm:grid-cols-3 gap-4"
      >
        <div>
          <RadioGroupItem value="friendly" id="friendly-art" className="peer sr-only" />
          <Label
            htmlFor="friendly-art"
            className="flex flex-col h-full gap-2 rounded-md border-2 border-muted p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
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
            className="flex flex-col h-full gap-2 rounded-md border-2 border-muted p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
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
            className="flex flex-col h-full gap-2 rounded-md border-2 border-muted p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
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
);

export default FamilyAppearance;
