import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Check, Palette } from "lucide-react";
import { backgrounds } from "./options";

interface SceneSettingsProps {
  selectedIllustrations: Record<string, any>;
  onChange: (category: string, value: any) => void;
}

const SceneSettings = ({ selectedIllustrations, onChange }: SceneSettingsProps) => (
  <div className="space-y-4">
    <h3 className="font-semibold text-lg">Scene Settings</h3>

    <div>
      <Label className="mb-2 block">Color Theme</Label>
      <div className="grid grid-cols-3 gap-3 mb-4">
        <Button
          type="button"
          variant={selectedIllustrations.colorTheme === "bright" ? "default" : "outline"}
          className="flex flex-col gap-1 h-auto py-3"
          onClick={() => onChange("colorTheme", "bright")}
        >
          <Palette className="h-5 w-5" />
          <span>Bright</span>
        </Button>
        <Button
          type="button"
          variant={selectedIllustrations.colorTheme === "pastel" ? "default" : "outline"}
          className="flex flex-col gap-1 h-auto py-3"
          onClick={() => onChange("colorTheme", "pastel")}
        >
          <Palette className="h-5 w-5" />
          <span>Pastel</span>
        </Button>
        <Button
          type="button"
          variant={selectedIllustrations.colorTheme === "muted" ? "default" : "outline"}
          className="flex flex-col gap-1 h-auto py-3"
          onClick={() => onChange("colorTheme", "muted")}
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
              onChange={() => onChange("background", bg.value)}
              className="peer absolute opacity-0"
            />
            <label
              htmlFor={`bg-${bg.value}`}
              className="block cursor-pointer rounded-lg overflow-hidden border-2 peer-checked:border-primary transition-all"
            >
              <div className="aspect-square relative overflow-hidden">
                <img src={bg.image} alt={bg.label} className="w-full h-full object-cover" />
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
);

export default SceneSettings;
