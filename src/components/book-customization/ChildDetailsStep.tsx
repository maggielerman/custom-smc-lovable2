
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type ChildDetailsStepProps = {
  childName: string;
  childAge: string;
  childGender: string;
  onNameChange: (value: string) => void;
  onAgeChange: (value: string) => void;
  onGenderChange: (value: string) => void;
};

const ChildDetailsStep = ({
  childName,
  childAge,
  childGender,
  onNameChange,
  onAgeChange,
  onGenderChange
}: ChildDetailsStepProps) => {
  // Generate age options for children 0-12
  const ageOptions = Array.from({ length: 13 }, (_, i) => {
    if (i === 0) return { value: "0", label: "Less than 1 year" };
    if (i === 1) return { value: "1", label: "1 year old" };
    return { value: i.toString(), label: `${i} years old` };
  });

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">About Your Child</h2>
        <p className="text-muted-foreground">
          Tell us about the child who will be featured in the book
        </p>
      </div>

      <div className="max-w-md mx-auto space-y-6">
        <div className="space-y-2">
          <Label htmlFor="child-name">Child's Name</Label>
          <Input
            id="child-name"
            value={childName}
            onChange={(e) => onNameChange(e.target.value)}
            placeholder="Enter your child's name"
          />
          <p className="text-sm text-muted-foreground">
            This name will appear throughout the book
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="child-age">Child's Age</Label>
          <Select value={childAge} onValueChange={onAgeChange}>
            <SelectTrigger id="child-age">
              <SelectValue placeholder="Select age" />
            </SelectTrigger>
            <SelectContent>
              {ageOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3">
          <Label>Child's Gender</Label>
          <RadioGroup
            value={childGender}
            onValueChange={onGenderChange}
            className="grid grid-cols-2 gap-4"
          >
            <div>
              <RadioGroupItem value="girl" id="girl" className="peer sr-only" />
              <Label
                htmlFor="girl"
                className="flex items-center justify-center rounded-md border-2 border-muted p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
              >
                Girl
              </Label>
            </div>
            <div>
              <RadioGroupItem value="boy" id="boy" className="peer sr-only" />
              <Label
                htmlFor="boy"
                className="flex items-center justify-center rounded-md border-2 border-muted p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
              >
                Boy
              </Label>
            </div>
          </RadioGroup>
        </div>
      </div>
    </div>
  );
};

export default ChildDetailsStep;
