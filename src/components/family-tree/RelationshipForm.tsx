
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

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

const RELATIONSHIP_TYPES = [
  "Biological",
  "Genetic", 
  "Gestational",
  "Social/Legal",
  "Donor Connection",
  "Sibling",
  "Marriage/Partnership",
  "Guardianship",
];

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
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add Relationship</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
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

          <div>
            <Label htmlFor="type">Relationship Type *</Label>
            <Select
              value={formData.type}
              onValueChange={(value) => handleInputChange("type", value)}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select relationship type" />
              </SelectTrigger>
              <SelectContent>
                {RELATIONSHIP_TYPES.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="description">Description (optional)</Label>
            <Input
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="e.g., 'same sperm donor', 'egg recipient'"
            />
          </div>

          {/* Relationship type explanations */}
          {formData.type && (
            <div className="bg-muted p-3 rounded-md">
              <h4 className="font-medium mb-1">About {formData.type} relationships:</h4>
              <p className="text-sm text-muted-foreground">
                {formData.type === "Biological" && "Shares genetic material and carried by birth parent"}
                {formData.type === "Genetic" && "Shares genetic material (egg/sperm donor connection)"}
                {formData.type === "Gestational" && "Carried during pregnancy (surrogate connection)"}
                {formData.type === "Social/Legal" && "Legal parent or guardian relationship"}
                {formData.type === "Donor Connection" && "Connected through same donor"}
                {formData.type === "Sibling" && "Sibling relationship (including donor siblings)"}
                {formData.type === "Marriage/Partnership" && "Married or in partnership"}
                {formData.type === "Guardianship" && "Legal guardian relationship"}
              </p>
            </div>
          )}

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit" disabled={!canSubmit}>
              Add Relationship
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default RelationshipForm;
