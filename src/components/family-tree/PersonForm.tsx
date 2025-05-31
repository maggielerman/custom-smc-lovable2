
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

type Person = {
  id: string;
  name: string;
  role: string;
  gender?: string;
  birthYear?: number;
  isAnonymous?: boolean;
  donorId?: string;
  notes?: string;
};

interface PersonFormProps {
  person?: Person;
  onSubmit: (person: Omit<Person, "id"> | Person) => void;
  onCancel: () => void;
  isEditing?: boolean;
}

const FAMILY_ROLES = [
  "Child",
  "Parent",
  "Intended Parent",
  "Sperm Donor",
  "Egg Donor",
  "Gestational Surrogate",
  "Donor Sibling",
  "Grandparent",
  "Aunt/Uncle",
  "Extended Family",
];

const GENDERS = [
  "Male",
  "Female",
  "Non-binary",
  "Prefer not to say",
];

const PersonForm = ({ person, onSubmit, onCancel, isEditing = false }: PersonFormProps) => {
  const [formData, setFormData] = useState({
    name: person?.name || "",
    role: person?.role || "",
    gender: person?.gender || "",
    birthYear: person?.birthYear || "",
    isAnonymous: person?.isAnonymous || false,
    donorId: person?.donorId || "",
    notes: person?.notes || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const personData = {
      ...(isEditing && person ? { id: person.id } : {}),
      name: formData.name,
      role: formData.role,
      gender: formData.gender || undefined,
      birthYear: formData.birthYear ? parseInt(formData.birthYear.toString()) : undefined,
      isAnonymous: formData.isAnonymous,
      donorId: formData.donorId || undefined,
      notes: formData.notes || undefined,
    };

    onSubmit(personData);
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open onOpenChange={onCancel}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Edit Family Member" : "Add Family Member"}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              placeholder="Enter name"
              required
            />
          </div>

          <div>
            <Label htmlFor="role">Role in Family *</Label>
            <Select
              value={formData.role}
              onValueChange={(value) => handleInputChange("role", value)}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                {FAMILY_ROLES.map((role) => (
                  <SelectItem key={role} value={role}>
                    {role}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="gender">Gender</Label>
            <Select
              value={formData.gender}
              onValueChange={(value) => handleInputChange("gender", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select gender (optional)" />
              </SelectTrigger>
              <SelectContent>
                {GENDERS.map((gender) => (
                  <SelectItem key={gender} value={gender}>
                    {gender}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="birthYear">Birth Year</Label>
            <Input
              id="birthYear"
              type="number"
              value={formData.birthYear}
              onChange={(e) => handleInputChange("birthYear", e.target.value)}
              placeholder="1990"
              min="1900"
              max={new Date().getFullYear()}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="anonymous"
              checked={formData.isAnonymous}
              onCheckedChange={(checked) => handleInputChange("isAnonymous", checked)}
            />
            <Label htmlFor="anonymous">Anonymous donor/person</Label>
          </div>

          {(formData.role.includes("Donor") || formData.isAnonymous) && (
            <div>
              <Label htmlFor="donorId">Donor ID</Label>
              <Input
                id="donorId"
                value={formData.donorId}
                onChange={(e) => handleInputChange("donorId", e.target.value)}
                placeholder="e.g., 12345, ABC123"
              />
            </div>
          )}

          <div>
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => handleInputChange("notes", e.target.value)}
              placeholder="Any additional information..."
              rows={3}
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit">
              {isEditing ? "Update" : "Add"} Person
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PersonForm;
