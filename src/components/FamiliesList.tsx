
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabaseClient } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import FamilyStructureStep from "@/components/book-customization/FamilyStructureStep";
import FamilyMembersStep from "@/components/book-customization/FamilyMembersStep";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

type Family = {
  id: string;
  user_id: string;
  name: string;
  structure: string;
  members: any[];
};

const FamiliesList = () => {
  const { user } = useAuth();
  const [families, setFamilies] = useState<Family[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [newFamily, setNewFamily] = useState<{ name: string; structure: string; members: any[] }>({
    name: "",
    structure: "",
    members: [],
  });

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }
    const fetchFamilies = async () => {
      try {
        setLoading(true);
        if (!supabaseClient) {
          throw new Error("Supabase client not available");
        }
        const { data, error } = await supabaseClient
          .from("families")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false });
        if (error) throw error;
        // Type cast the data to match our Family type
        const typedData = (data || []).map(item => ({
          ...item,
          members: Array.isArray(item.members) ? item.members : []
        }));
        setFamilies(typedData);
      } catch (err: any) {
        console.error("Error loading families:", err);
        toast.error("Failed to load families");
      } finally {
        setLoading(false);
      }
    };
    fetchFamilies();
  }, [user]);

  const saveFamily = async () => {
    if (!user || !supabaseClient) return;
    try {
      setSaving(true);
      const { data, error } = await supabaseClient
        .from("families")
        .insert({
          name: newFamily.name || "My Family",
          structure: newFamily.structure,
          members: newFamily.members,
          user_id: user.id,
        })
        .select()
        .single();
      if (error) throw error;
      // Type cast the returned data
      const typedData = {
        ...data,
        members: Array.isArray(data.members) ? data.members : []
      };
      setFamilies([typedData, ...families]);
      setNewFamily({ name: "", structure: "", members: [] });
      toast.success("Family saved");
    } catch (err: any) {
      console.error("Error saving family:", err);
      toast.error("Failed to save family");
    } finally {
      setSaving(false);
    }
  };

  const deleteFamily = async (id: string) => {
    if (!user || !supabaseClient) return;
    if (!confirm("Delete this family?")) return;
    try {
      const { error } = await supabaseClient.from("families").delete().eq("id", id);
      if (error) throw error;
      setFamilies(families.filter((f) => f.id !== id));
      toast.success("Family deleted");
    } catch (err: any) {
      console.error("Error deleting family:", err);
      toast.error("Failed to delete family");
    }
  };

  if (!user) {
    return (
      <div className="text-center py-6">
        <p className="text-muted-foreground">Please sign in to manage your families.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 2 }).map((_, i) => (
          <Card key={i} className="overflow-hidden">
            <CardContent className="p-6">
              <Skeleton className="h-6 w-3/4" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {families.map((family) => (
        <Card key={family.id} className="overflow-hidden">
          <CardHeader>
            <CardTitle>{family.name}</CardTitle>
            <CardDescription>{family.structure}</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-1">
              {family.members.map((m: any, idx: number) => (
                <li key={idx}>
                  {(m.role === "Other" ? m.customRole : m.role) || "Member"}: {m.name}
                  {m.pronouns ? ` (${m.pronouns})` : ""}
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button
              variant="outline"
              size="sm"
              className="text-destructive hover:text-destructive"
              onClick={() => deleteFamily(family.id)}
            >
              <Trash2 className="h-4 w-4 mr-1" /> Delete
            </Button>
          </CardFooter>
        </Card>
      ))}
      <Card>
        <CardHeader>
          <CardTitle>Add New Family</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="family-name">Family Name</Label>
            <Input
              id="family-name"
              value={newFamily.name}
              onChange={(e) => setNewFamily({ ...newFamily, name: e.target.value })}
            />
          </div>
          <FamilyStructureStep
            value={newFamily.structure}
            onChange={(value) => setNewFamily({ ...newFamily, structure: value, members: [] })}
          />
          {newFamily.structure && (
            <FamilyMembersStep
              familyStructure={newFamily.structure}
              familyMembers={newFamily.members}
              onChange={(members) => setNewFamily({ ...newFamily, members })}
            />
          )}
        </CardContent>
        <CardFooter>
          <Button onClick={saveFamily} disabled={saving || !newFamily.structure}>
            {saving ? "Saving..." : "Save Family"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default FamiliesList;
