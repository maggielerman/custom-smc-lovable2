
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabaseClient } from "@/lib/supabase";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Plus, Save, Users, Heart, Baby, UserPlus } from "lucide-react";
import { toast } from "sonner";
import FamilyTreeCanvas from "@/components/family-tree/FamilyTreeCanvas";
import PersonForm from "@/components/family-tree/PersonForm";
import RelationshipForm from "@/components/family-tree/RelationshipForm";
import TreeControls from "@/components/family-tree/TreeControls";

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

type Relationship = {
  id: string;
  fromPersonId: string;
  toPersonId: string;
  type: string;
  description?: string;
};

type FamilyTree = {
  id?: string;
  name: string;
  people: Person[];
  relationships: Relationship[];
  isPublic: boolean;
};

const FamilyTreeBuilder = () => {
  const { user } = useAuth();
  const [familyTree, setFamilyTree] = useState<FamilyTree>({
    name: "My Family Tree",
    people: [],
    relationships: [],
    isPublic: false,
  });
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
  const [showPersonForm, setShowPersonForm] = useState(false);
  const [showRelationshipForm, setShowRelationshipForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [savedTrees, setSavedTrees] = useState<FamilyTree[]>([]);

  useEffect(() => {
    if (user) {
      loadSavedTrees();
    }
  }, [user]);

  const loadSavedTrees = async () => {
    if (!user) return;
    try {
      const { data, error } = await supabaseClient
        .from("family_trees")
        .select("*")
        .eq("user_id", user.id)
        .order("updated_at", { ascending: false });
      
      if (error) throw error;
      setSavedTrees(data || []);
    } catch (err: any) {
      console.error("Error loading family trees:", err);
      toast.error("Failed to load saved family trees");
    }
  };

  const saveFamilyTree = async () => {
    if (!user) {
      toast.error("Please sign in to save your family tree");
      return;
    }

    try {
      setSaving(true);
      const treeData = {
        name: familyTree.name,
        tree_data: {
          people: familyTree.people,
          relationships: familyTree.relationships,
        },
        is_public: familyTree.isPublic,
        user_id: user.id,
      };

      let result;
      if (familyTree.id) {
        result = await supabaseClient
          .from("family_trees")
          .update(treeData)
          .eq("id", familyTree.id)
          .select()
          .single();
      } else {
        result = await supabaseClient
          .from("family_trees")
          .insert(treeData)
          .select()
          .single();
      }

      if (result.error) throw result.error;
      
      setFamilyTree(prev => ({ ...prev, id: result.data.id }));
      loadSavedTrees();
      toast.success("Family tree saved successfully!");
    } catch (err: any) {
      console.error("Error saving family tree:", err);
      toast.error("Failed to save family tree");
    } finally {
      setSaving(false);
    }
  };

  const loadFamilyTree = (tree: any) => {
    setFamilyTree({
      id: tree.id,
      name: tree.name,
      people: tree.tree_data?.people || [],
      relationships: tree.tree_data?.relationships || [],
      isPublic: tree.is_public,
    });
  };

  const addPerson = (person: Omit<Person, "id">) => {
    const newPerson: Person = {
      ...person,
      id: crypto.randomUUID(),
    };
    setFamilyTree(prev => ({
      ...prev,
      people: [...prev.people, newPerson],
    }));
    setShowPersonForm(false);
  };

  const updatePerson = (updatedPerson: Person) => {
    setFamilyTree(prev => ({
      ...prev,
      people: prev.people.map(p => p.id === updatedPerson.id ? updatedPerson : p),
    }));
    setSelectedPerson(null);
  };

  const deletePerson = (personId: string) => {
    setFamilyTree(prev => ({
      ...prev,
      people: prev.people.filter(p => p.id !== personId),
      relationships: prev.relationships.filter(r => 
        r.fromPersonId !== personId && r.toPersonId !== personId
      ),
    }));
  };

  const addRelationship = (relationship: Omit<Relationship, "id">) => {
    const newRelationship: Relationship = {
      ...relationship,
      id: crypto.randomUUID(),
    };
    setFamilyTree(prev => ({
      ...prev,
      relationships: [...prev.relationships, newRelationship],
    }));
    setShowRelationshipForm(false);
  };

  const deleteRelationship = (relationshipId: string) => {
    setFamilyTree(prev => ({
      ...prev,
      relationships: prev.relationships.filter(r => r.id !== relationshipId),
    }));
  };

  const newTree = () => {
    setFamilyTree({
      name: "My Family Tree",
      people: [],
      relationships: [],
      isPublic: false,
    });
  };

  if (!user) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Family Tree Builder</h1>
          <p className="text-muted-foreground mb-8">
            Please sign in to create and save your inclusive family trees
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Inclusive Family Tree Builder</h1>
        <p className="text-muted-foreground">
          Create family trees that honor all types of relationships - donor siblings, 
          surrogates, known/anonymous donors, and modern family structures
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Sidebar - Tree Management */}
        <div className="lg:col-span-1 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Tree Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="tree-name">Tree Name</Label>
                <Input
                  id="tree-name"
                  value={familyTree.name}
                  onChange={(e) => setFamilyTree(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="My Family Tree"
                />
              </div>
              
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="public-tree"
                  checked={familyTree.isPublic}
                  onChange={(e) => setFamilyTree(prev => ({ ...prev, isPublic: e.target.checked }))}
                />
                <Label htmlFor="public-tree">Make tree public</Label>
              </div>

              <div className="flex gap-2">
                <Button onClick={saveFamilyTree} disabled={saving} className="flex-1">
                  <Save className="h-4 w-4 mr-2" />
                  {saving ? "Saving..." : "Save"}
                </Button>
                <Button variant="outline" onClick={newTree}>
                  New
                </Button>
              </div>
            </CardContent>
          </Card>

          <TreeControls
            onAddPerson={() => setShowPersonForm(true)}
            onAddRelationship={() => setShowRelationshipForm(true)}
            peopleCount={familyTree.people.length}
            relationshipsCount={familyTree.relationships.length}
          />

          {savedTrees.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Saved Trees</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {savedTrees.map((tree) => (
                    <Button
                      key={tree.id}
                      variant="outline"
                      className="w-full justify-start text-left"
                      onClick={() => loadFamilyTree(tree)}
                    >
                      {tree.name}
                      {tree.is_public && (
                        <Badge variant="secondary" className="ml-auto">
                          Public
                        </Badge>
                      )}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Main Canvas Area */}
        <div className="lg:col-span-3">
          <Card className="h-[600px]">
            <CardContent className="p-0 h-full">
              <FamilyTreeCanvas
                people={familyTree.people}
                relationships={familyTree.relationships}
                onPersonSelect={setSelectedPerson}
                onPersonDelete={deletePerson}
                onRelationshipDelete={deleteRelationship}
              />
            </CardContent>
          </Card>

          {/* People List */}
          {familyTree.people.length > 0 && (
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Family Members ({familyTree.people.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {familyTree.people.map((person) => (
                    <div
                      key={person.id}
                      className="border rounded-lg p-3 hover:bg-muted/50 cursor-pointer"
                      onClick={() => setSelectedPerson(person)}
                    >
                      <div className="font-medium">{person.name}</div>
                      <div className="text-sm text-muted-foreground">{person.role}</div>
                      {person.isAnonymous && (
                        <Badge variant="outline" className="mt-1">Anonymous</Badge>
                      )}
                      {person.donorId && (
                        <Badge variant="secondary" className="mt-1">
                          Donor ID: {person.donorId}
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Modals */}
      {showPersonForm && (
        <PersonForm
          onSubmit={addPerson}
          onCancel={() => setShowPersonForm(false)}
        />
      )}

      {selectedPerson && (
        <PersonForm
          person={selectedPerson}
          onSubmit={updatePerson}
          onCancel={() => setSelectedPerson(null)}
          isEditing
        />
      )}

      {showRelationshipForm && (
        <RelationshipForm
          people={familyTree.people}
          onSubmit={addRelationship}
          onCancel={() => setShowRelationshipForm(false)}
        />
      )}
    </div>
  );
};

export default FamilyTreeBuilder;
