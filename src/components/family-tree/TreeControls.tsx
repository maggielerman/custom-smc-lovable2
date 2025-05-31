
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Users, Heart, Info } from "lucide-react";

interface TreeControlsProps {
  onAddPerson: () => void;
  onAddRelationship: () => void;
  peopleCount: number;
  relationshipsCount: number;
}

const TreeControls = ({
  onAddPerson,
  onAddRelationship,
  peopleCount,
  relationshipsCount,
}: TreeControlsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          Tree Builder
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-2 text-center text-sm">
          <div className="bg-muted rounded p-2">
            <div className="font-medium">{peopleCount}</div>
            <div className="text-xs text-muted-foreground">People</div>
          </div>
          <div className="bg-muted rounded p-2">
            <div className="font-medium">{relationshipsCount}</div>
            <div className="text-xs text-muted-foreground">Connections</div>
          </div>
        </div>

        <div className="space-y-2">
          <Button 
            onClick={onAddPerson} 
            className="w-full"
            variant="default"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Person
          </Button>
          
          <Button 
            onClick={onAddRelationship} 
            className="w-full"
            variant="outline"
            disabled={peopleCount < 2}
          >
            <Heart className="h-4 w-4 mr-2" />
            Add Relationship
          </Button>
        </div>

        <div className="bg-blue-50 p-3 rounded-md">
          <div className="flex items-start gap-2">
            <Info className="h-4 w-4 text-blue-600 mt-0.5" />
            <div className="text-xs text-blue-800">
              <p className="font-medium mb-1">Inclusive Family Trees</p>
              <p>This tool supports all types of modern families including donor conception, surrogacy, and non-traditional relationships.</p>
            </div>
          </div>
        </div>

        <div className="text-xs text-muted-foreground">
          <p className="font-medium mb-1">Supported Roles:</p>
          <ul className="space-y-0.5">
            <li>• Intended Parents</li>
            <li>• Sperm/Egg Donors</li>
            <li>• Gestational Surrogates</li>
            <li>• Donor Siblings</li>
            <li>• Extended Family</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default TreeControls;
