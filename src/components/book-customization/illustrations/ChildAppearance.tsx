import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Check } from "lucide-react";
import { skinTones, hairColors, hairStyles } from "./options";

interface ChildAppearanceProps {
  selectedIllustrations: Record<string, any>;
  onChange: (category: string, value: any) => void;
}

const ChildAppearance = ({ selectedIllustrations, onChange }: ChildAppearanceProps) => (
  <div className="space-y-4">
    <h3 className="font-semibold text-lg">Child Appearance</h3>

    <div>
      <Label className="mb-2 block">Skin Tone</Label>
      <RadioGroup
        value={selectedIllustrations.childSkinTone || skinTones[0].value}
        onValueChange={(value) => onChange("childSkinTone", value)}
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
              className="flex flex-col items-center justify-center rounded-md border-2 border-muted hover:border-primary cursor-pointer p-1 peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
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
        onValueChange={(value) => onChange("childHairColor", value)}
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
              className="flex flex-col items-center justify-center rounded-md border-2 border-muted hover:border-primary cursor-pointer p-1 peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
            >
              <div
                className="w-12 h-12 rounded-full"
                style={{ backgroundColor: color.color }}
              >
                <div className="w-full h-full rounded-full flex items-center justify-center">
                  {selectedIllustrations.childHairColor === color.value && (
                    <Check className={`${["blonde", "gray"].includes(color.value) ? "text-black" : "text-white"} drop-shadow`} />
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
        onValueChange={(value) => onChange("childHairStyle", value)}
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
              className="flex items-center justify-center rounded-md border-2 border-muted p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer text-center"
            >
              {style.label}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  </div>
);

export default ChildAppearance;
