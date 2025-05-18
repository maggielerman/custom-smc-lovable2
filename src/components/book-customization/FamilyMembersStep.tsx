
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Trash2, User } from "lucide-react";

type FamilyMember = {
  id: string;
  role: string;
  name: string;
  customRole?: string;
  pronouns?: string;
};

type FamilyMembersStepProps = {
  familyStructure: string;
  familyMembers: FamilyMember[];
  onChange: (members: FamilyMember[]) => void;
};

const FamilyMembersStep = ({
  familyStructure,
  familyMembers,
  onChange
}: FamilyMembersStepProps) => {
  const [members, setMembers] = useState<FamilyMember[]>(familyMembers || []);

  // Define available roles based on family structure
  const getRoleOptions = () => {
    const commonRoles = ["Parent", "Sibling", "Grandparent", "Uncle", "Aunt", "Other"];
    
    switch (familyStructure) {
      case "two-parents":
        return ["Mom", "Dad", ...commonRoles];
      case "single-mom":
        return ["Mom", ...commonRoles];
      case "single-dad":
        return ["Dad", ...commonRoles];
      case "two-moms":
        return ["Mom", "Mama", ...commonRoles];
      case "two-dads":
        return ["Dad", "Papa", ...commonRoles];
      case "grandparents":
        return ["Grandmother", "Grandfather", ...commonRoles];
      case "adoptive":
        return ["Adoptive Mom", "Adoptive Dad", ...commonRoles];
      default:
        return commonRoles;
    }
  };

  // Add default members based on family structure when component mounts
  useEffect(() => {
    if (familyMembers.length === 0) {
      const defaultMembers: FamilyMember[] = [];
      
      switch (familyStructure) {
        case "two-parents":
          defaultMembers.push(
            { id: crypto.randomUUID(), role: "Mom", name: "", pronouns: "she/her" },
            { id: crypto.randomUUID(), role: "Dad", name: "", pronouns: "he/him" }
          );
          break;
        case "single-mom":
          defaultMembers.push({ id: crypto.randomUUID(), role: "Mom", name: "", pronouns: "she/her" });
          break;
        case "single-dad":
          defaultMembers.push({ id: crypto.randomUUID(), role: "Dad", name: "", pronouns: "he/him" });
          break;
        case "two-moms":
          defaultMembers.push(
            { id: crypto.randomUUID(), role: "Mom", name: "", pronouns: "she/her" },
            { id: crypto.randomUUID(), role: "Mama", name: "", pronouns: "she/her" }
          );
          break;
        case "two-dads":
          defaultMembers.push(
            { id: crypto.randomUUID(), role: "Dad", name: "", pronouns: "he/him" },
            { id: crypto.randomUUID(), role: "Papa", name: "", pronouns: "he/him" }
          );
          break;
        case "grandparents":
          defaultMembers.push(
            { id: crypto.randomUUID(), role: "Grandmother", name: "", pronouns: "she/her" },
            { id: crypto.randomUUID(), role: "Grandfather", name: "", pronouns: "he/him" }
          );
          break;
        case "adoptive":
          defaultMembers.push(
            { id: crypto.randomUUID(), role: "Adoptive Mom", name: "", pronouns: "she/her" },
            { id: crypto.randomUUID(), role: "Adoptive Dad", name: "", pronouns: "he/him" }
          );
          break;
      }
      
      setMembers(defaultMembers);
      onChange(defaultMembers);
    }
  }, [familyStructure]);

  const addFamilyMember = () => {
    const newMember = {
      id: crypto.randomUUID(),
      role: "",
      name: "",
      pronouns: ""
    };
    
    const updatedMembers = [...members, newMember];
    setMembers(updatedMembers);
    onChange(updatedMembers);
  };

  const updateMember = (id: string, field: string, value: string) => {
    const updatedMembers = members.map(member =>
      member.id === id ? { ...member, [field]: value } : member
    );
    
    setMembers(updatedMembers);
    onChange(updatedMembers);
  };

  const removeMember = (id: string) => {
    const updatedMembers = members.filter(member => member.id !== id);
    setMembers(updatedMembers);
    onChange(updatedMembers);
  };

  const roleOptions = getRoleOptions();

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">Add Family Members</h2>
        <p className="text-muted-foreground">
          Tell us about the people in your family who will appear in the book
        </p>
      </div>

      <div className="space-y-4">
        {members.map((member, index) => (
          <Card key={member.id} className="relative">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <User className="h-5 w-5" />
                Family Member {index + 1}
              </CardTitle>
              {members.length > 1 && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeMember(member.id)}
                  className="absolute top-3 right-3 text-muted-foreground hover:text-destructive"
                >
                  <Trash2 className="h-5 w-5" />
                </Button>
              )}
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor={`role-${member.id}`}>Role in Family</Label>
                <Select
                  value={member.role}
                  onValueChange={(value) => updateMember(member.id, "role", value)}
                >
                  <SelectTrigger id={`role-${member.id}`}>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    {roleOptions.map((role) => (
                      <SelectItem key={role} value={role}>
                        {role}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {member.role === "Other" && (
                <div className="grid gap-2">
                  <Label htmlFor={`custom-role-${member.id}`}>Custom Role</Label>
                  <Input
                    id={`custom-role-${member.id}`}
                    value={member.customRole || ""}
                    onChange={(e) => updateMember(member.id, "customRole", e.target.value)}
                    placeholder="E.g., Godparent, Family Friend"
                  />
                </div>
              )}

              <div className="grid gap-2">
                <Label htmlFor={`name-${member.id}`}>Name</Label>
                <Input
                  id={`name-${member.id}`}
                  value={member.name}
                  onChange={(e) => updateMember(member.id, "name", e.target.value)}
                  placeholder="Enter name"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor={`pronouns-${member.id}`}>Pronouns</Label>
                <Select
                  value={member.pronouns || ''}
                  onValueChange={(value) => updateMember(member.id, 'pronouns', value)}
                >
                  <SelectTrigger id={`pronouns-${member.id}`}>
                    <SelectValue placeholder="Select pronouns" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="she/her">she/her</SelectItem>
                    <SelectItem value="he/him">he/him</SelectItem>
                    <SelectItem value="they/them">they/them</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        ))}

        <Button 
          variant="outline" 
          onClick={addFamilyMember} 
          className="w-full"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Another Family Member
        </Button>
      </div>
    </div>
  );
};

export default FamilyMembersStep;
