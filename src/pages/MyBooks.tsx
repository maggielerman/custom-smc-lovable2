
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, FileText, LogIn } from "lucide-react";
import DraftsList from "@/components/DraftsList";
import { useAuth } from "@/hooks/useAuth";

const MyBooks = () => {
  const [activeTab, setActiveTab] = useState("all");
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  // Simple content to show when user is not logged in
  const LoginPrompt = () => (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <h2 className="text-2xl font-bold mb-4">Sign In to View Your Books</h2>
      <p className="text-center text-muted-foreground mb-6">
        You need to be signed in to create and manage your books.
      </p>
      <Button asChild>
        <Link to="/login" className="flex items-center gap-2">
          <LogIn size={18} />
          <span>Sign In</span>
        </Link>
      </Button>
    </div>
  );

  // Show loading state while authentication is being checked
  if (isLoading) {
    return (
      <div className="container py-10">
        <div className="flex justify-center items-center min-h-[300px]">
          <div className="animate-pulse text-xl">Loading...</div>
        </div>
      </div>
    );
  }

  // Show login prompt if user is not authenticated
  if (!user) {
    return (
      <div className="container py-10">
        <h1 className="text-3xl font-bold mb-8">My Books</h1>
        <LoginPrompt />
      </div>
    );
  }

  // Main content for authenticated users
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
