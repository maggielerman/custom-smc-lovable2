import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Users } from "lucide-react";

type FamilyStructureProps = {
  value: string;
  onChange: (value: string) => void;
};

const familyStructures = [
  { id: "two-parents", label: "Two Parents", description: "Traditional family with two parents" },
  { id: "single-mom", label: "Single Mom by Choice", description: "Family with a single mother" },
  { id: "single-dad", label: "Single Dad by Choice", description: "Family with a single father" },
  { id: "two-moms", label: "Two Moms", description: "Family with two mothers" },
  { id: "two-dads", label: "Two Dads", description: "Family with two fathers" },
  { id: "grandparents", label: "Grandparent(s) as Guardian", description: "Child raised by grandparent(s)" },
  { id: "adoptive", label: "Adoptive Family", description: "Family formed through adoption" },
];

const FamilyStructureStep = ({ value, onChange }: FamilyStructureProps) => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">Choose Your Family Structure</h2>
        <p className="text-muted-foreground">
          Select the family structure that best represents your family
        </p>
      </div>

      <div className="max-w-3xl mx-auto">
        <RadioGroup
          value={value}
          onValueChange={onChange}
          className="grid gap-4 sm:grid-cols-2"
        >
          {familyStructures.map((structure) => (
            <div key={structure.id}>
              <RadioGroupItem
                value={structure.id}
                id={structure.id}
                className="peer sr-only"
              />
              <Label
                htmlFor={structure.id}
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-background p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-[var(--navy)] [&:has([data-state=checked])]:border-[var(--navy)] cursor-pointer"
              >
                <div className="mb-3 rounded-full bg-[var(--mint)] p-3">
                  <Users className="h-6 w-6 text-[var(--navy)]" />
                </div>
                <div className="text-center">
                  <h3 className="font-medium">{structure.label}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {structure.description}
                  </p>
                </div>
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
};

export default FamilyStructureStep;
