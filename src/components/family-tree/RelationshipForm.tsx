
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

type Person = {
  id: string;
  name: string;
  role: string;
};

type Relationship = {
  fromPersonId: string;
  toPersonId: string;
  type: string;
  description?: string;
};

interface RelationshipFormProps {
  people: Person[];
  onSubmit: (relationship: Relationship) => void;
  onCancel: () => void;
}

const RELATIONSHIP_CATEGORIES = {
  "Biological Connections": [
    "Biological",
    "Genetic", 
    "Gestational"
  ],
  "Legal & Social Connections": [
    "Social/Legal",
    "Marriage/Partnership",
    "Guardianship"
  ],
  "Donor & Reproductive Connections": [
    "Donor Connection",
    "Sibling"
  ]
};

const RELATIONSHIP_DESCRIPTIONS = {
  "Biological": "Full biological connection - shares genetic material and carried by birth parent",
  "Genetic": "Genetic connection only - shares genetic material (egg/sperm donor)",
  "Gestational": "Gestational connection - carried during pregnancy (surrogate)",
  "Social/Legal": "Legal parent, adoptive parent, or guardian relationship",
  "Marriage/Partnership": "Married couple or domestic partnership",
  "Guardianship": "Legal guardian or caretaker relationship",
  "Donor Connection": "Connected through the same donor (donor siblings)",
  "Sibling": "Sibling relationship (full, half, step, or adoptive siblings)"
};

const RelationshipForm = ({ people, onSubmit, onCancel }: RelationshipFormProps) => {
  const [formData, setFormData] = useState({
    fromPersonId: "",
    toPersonId: "",
    type: "",
    description: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.fromPersonId === formData.toPersonId) {
      alert("Please select two different people");
      return;
    }

    onSubmit({
      fromPersonId: formData.fromPersonId,
      toPersonId: formData.toPersonId,
      type: formData.type,
      description: formData.description || undefined,
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const availablePeople = people.filter(p => p.id !== formData.fromPersonId);
  const canSubmit = formData.fromPersonId && formData.toPersonId && formData.type;

  return (
    <Dialog open onOpenChange={onCancel}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Relationship Connection</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="fromPerson">From Person *</Label>
            <Select
              value={formData.fromPersonId}
              onValueChange={(value) => handleInputChange("fromPersonId", value)}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select first person" />
              </SelectTrigger>
              <SelectContent>
                {people.map((person) => (
                  <SelectItem key={person.id} value={person.id}>
                    {person.name} ({person.role})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="toPerson">To Person *</Label>
            <Select
              value={formData.toPersonId}
              onValueChange={(value) => handleInputChange("toPersonId", value)}
              required
              disabled={!formData.fromPersonId}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select second person" />
              </SelectTrigger>
              <SelectContent>
                {availablePeople.map((person) => (
                  <SelectItem key={person.id} value={person.id}>
                    {person.name} ({person.role})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            <Label>Connection Type *</Label>
            <RadioGroup
              value={formData.type}
              onValueChange={(value) => handleInputChange("type", value)}
              className="space-y-4"
            >
              {Object.entries(RELATIONSHIP_CATEGORIES).map(([category, types]) => (
                <div key={category} className="space-y-2">
                  <h4 className="text-sm font-medium text-muted-foreground border-b pb-1">
                    {category}
                  </h4>
                  <div className="grid grid-cols-1 gap-2 ml-2">
                    {types.map((type) => (
                      <div key={type} className="flex items-start space-x-2">
                        <RadioGroupItem value={type} id={type} className="mt-1" />
                        <div className="flex-1">
                          <Label htmlFor={type} className="text-sm font-medium cursor-pointer">
                            {type}
                          </Label>
                          <p className="text-xs text-muted-foreground mt-1">
                            {RELATIONSHIP_DESCRIPTIONS[type as keyof typeof RELATIONSHIP_DESCRIPTIONS]}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div>
            <Label htmlFor="description">Additional Details (optional)</Label>
            <Input
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="e.g., 'same sperm donor #12345', 'adoptive parent since 2018'"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Add specific details about this connection
            </p>
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit" disabled={!canSubmit}>
              Add Connection
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default RelationshipForm;
