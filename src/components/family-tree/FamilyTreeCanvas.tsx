
import { useRef, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trash2, Edit } from "lucide-react";

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

interface FamilyTreeCanvasProps {
  people: Person[];
  relationships: Relationship[];
  onPersonSelect: (person: Person) => void;
  onPersonDelete: (personId: string) => void;
  onRelationshipDelete: (relationshipId: string) => void;
}

const FamilyTreeCanvas = ({
  people,
  relationships,
  onPersonSelect,
  onPersonDelete,
  onRelationshipDelete,
}: FamilyTreeCanvasProps) => {
  const [selectedPersonId, setSelectedPersonId] = useState<string | null>(null);

  const getPersonColor = (role: string) => {
    const colors = {
      "Child": "bg-blue-100 border-blue-300",
      "Parent": "bg-green-100 border-green-300",
      "Intended Parent": "bg-green-100 border-green-300",
      "Sperm Donor": "bg-orange-100 border-orange-300",
      "Egg Donor": "bg-pink-100 border-pink-300",
      "Gestational Surrogate": "bg-purple-100 border-purple-300",
      "Donor Sibling": "bg-cyan-100 border-cyan-300",
      "Grandparent": "bg-yellow-100 border-yellow-300",
      "Extended Family": "bg-gray-100 border-gray-300",
    };
    return colors[role as keyof typeof colors] || "bg-gray-100 border-gray-300";
  };

  const getRelationshipColor = (type: string) => {
    const colors = {
      "Biological": "border-red-500",
      "Genetic": "border-orange-500",
      "Gestational": "border-purple-500",
      "Social/Legal": "border-blue-500",
      "Donor Connection": "border-green-500",
      "Sibling": "border-cyan-500",
    };
    return colors[type as keyof typeof colors] || "border-gray-500";
  };

  if (people.length === 0) {
    return (
      <div className="h-full flex items-center justify-center text-center">
        <div>
          <h3 className="text-lg font-medium mb-2">Start Building Your Family Tree</h3>
          <p className="text-muted-foreground mb-4">
            Add family members to begin creating your inclusive family tree
          </p>
          <p className="text-sm text-muted-foreground">
            Click "Add Person" in the sidebar to get started
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full p-4 overflow-auto bg-gray-50">
      <div className="min-h-full relative">
        {/* Legend */}
        <div className="absolute top-4 right-4 bg-white p-3 rounded-lg shadow-sm border">
          <h4 className="font-medium mb-2">Relationship Types</h4>
          <div className="space-y-1 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-4 h-0.5 border-red-500 border-t-2"></div>
              <span>Biological</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-0.5 border-orange-500 border-t-2"></div>
              <span>Genetic</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-0.5 border-purple-500 border-t-2"></div>
              <span>Gestational</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-0.5 border-blue-500 border-t-2"></div>
              <span>Social/Legal</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-0.5 border-green-500 border-t-2"></div>
              <span>Donor Connection</span>
            </div>
          </div>
        </div>

        {/* Simple grid layout for now - can be enhanced with actual tree visualization */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-16">
          {people.map((person) => (
            <Card
              key={person.id}
              className={`p-4 cursor-pointer transition-all hover:shadow-md ${getPersonColor(person.role)} ${
                selectedPersonId === person.id ? "ring-2 ring-primary" : ""
              }`}
              onClick={() => {
                setSelectedPersonId(person.id);
                onPersonSelect(person);
              }}
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex-1">
                  <h3 className="font-medium">{person.name}</h3>
                  <p className="text-sm text-muted-foreground">{person.role}</p>
                </div>
                <div className="flex gap-1">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={(e) => {
                      e.stopPropagation();
                      onPersonSelect(person);
                    }}
                  >
                    <Edit className="h-3 w-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={(e) => {
                      e.stopPropagation();
                      onPersonDelete(person.id);
                    }}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                {person.birthYear && (
                  <div className="text-xs text-muted-foreground">
                    Born: {person.birthYear}
                  </div>
                )}
                
                <div className="flex flex-wrap gap-1">
                  {person.isAnonymous && (
                    <Badge variant="outline" className="text-xs">
                      Anonymous
                    </Badge>
                  )}
                  {person.donorId && (
                    <Badge variant="secondary" className="text-xs">
                      ID: {person.donorId}
                    </Badge>
                  )}
                  {person.gender && (
                    <Badge variant="outline" className="text-xs">
                      {person.gender}
                    </Badge>
                  )}
                </div>

                {person.notes && (
                  <p className="text-xs text-muted-foreground mt-2">
                    {person.notes}
                  </p>
                )}
              </div>

              {/* Show relationships for this person */}
              <div className="mt-3 pt-2 border-t">
                {relationships
                  .filter(r => r.fromPersonId === person.id || r.toPersonId === person.id)
                  .map(rel => {
                    const otherPersonId = rel.fromPersonId === person.id ? rel.toPersonId : rel.fromPersonId;
                    const otherPerson = people.find(p => p.id === otherPersonId);
                    return (
                      <div key={rel.id} className="text-xs text-muted-foreground mb-1">
                        <span className={`inline-block w-2 h-0.5 mr-2 ${getRelationshipColor(rel.type)} border-t-2`}></span>
                        {rel.type} with {otherPerson?.name}
                        {rel.description && (
                          <span className="ml-1">({rel.description})</span>
                        )}
                      </div>
                    );
                  })}
              </div>
            </Card>
          ))}
        </div>

        {/* Relationships Summary */}
        {relationships.length > 0 && (
          <Card className="mt-8 p-4">
            <h3 className="font-medium mb-3">Relationships ({relationships.length})</h3>
            <div className="space-y-2">
              {relationships.map((rel) => {
                const fromPerson = people.find(p => p.id === rel.fromPersonId);
                const toPerson = people.find(p => p.id === rel.toPersonId);
                return (
                  <div key={rel.id} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <span className={`w-4 h-0.5 ${getRelationshipColor(rel.type)} border-t-2`}></span>
                      <span>
                        <strong>{fromPerson?.name}</strong> → <strong>{toPerson?.name}</strong>
                      </span>
                      <Badge variant="outline" className="text-xs">
                        {rel.type}
                      </Badge>
                      {rel.description && (
                        <span className="text-muted-foreground">({rel.description})</span>
                      )}
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onRelationshipDelete(rel.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                );
              })}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default FamilyTreeCanvas;
