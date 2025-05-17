
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, FileText } from "lucide-react";
import DraftsList from "@/components/DraftsList";

const MyBooks = () => {
  const [activeTab, setActiveTab] = useState("all");

  return (
    <div className="container py-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <h1 className="text-3xl font-bold">My Books</h1>
        <Button className="mt-4 sm:mt-0" asChild>
          <Link to="/books/new">Create New Book</Link>
        </Button>
      </div>

      <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="drafts" className="flex items-center gap-1">
            <FileText className="h-4 w-4" />
            <span>Drafts</span>
          </TabsTrigger>
          <TabsTrigger value="published" className="flex items-center gap-1">
            <BookOpen className="h-4 w-4" />
            <span>Published</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <div className="space-y-8">
            <DraftsList />
          </div>
        </TabsContent>

        <TabsContent value="drafts">
          <div className="space-y-8">
            <DraftsList published={false} />
          </div>
        </TabsContent>

        <TabsContent value="published">
          <div className="space-y-8">
            <DraftsList published={true} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MyBooks;
