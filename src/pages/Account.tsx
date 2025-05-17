
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Settings, FileText } from "lucide-react";
import DraftsList from "@/components/DraftsList";

const Account = () => {
  const { user, signOut } = useAuth();

  if (!user) return null;

  return (
    <div className="container py-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <h1 className="text-3xl font-bold">Your Account</h1>
        <Button variant="outline" onClick={signOut} className="mt-4 sm:mt-0">
          Sign Out
        </Button>
      </div>

      <Tabs defaultValue="drafts" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="drafts" className="flex gap-2 items-center">
            <FileText className="h-4 w-4" />
            <span className="hidden sm:inline">Saved Drafts</span>
            <span className="sm:hidden">Drafts</span>
          </TabsTrigger>
          <TabsTrigger value="books" className="flex gap-2 items-center">
            <BookOpen className="h-4 w-4" />
            <span className="hidden sm:inline">Published Books</span>
            <span className="sm:hidden">Books</span>
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex gap-2 items-center">
            <Settings className="h-4 w-4" />
            <span>Settings</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="drafts">
          <Card>
            <CardHeader>
              <CardTitle>Saved Drafts</CardTitle>
              <CardDescription>
                Continue working on your book drafts or start a new one.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DraftsList published={false} />
            </CardContent>
            <CardFooter>
              <Button asChild>
                <Link to="/books/new">Create New Book</Link>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="books">
          <Card>
            <CardHeader>
              <CardTitle>Published Books</CardTitle>
              <CardDescription>
                Books you have published and shared with others.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DraftsList published={true} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>
                Manage your account preferences and profile information.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-lg font-medium">Profile</h3>
                <p className="text-sm text-muted-foreground">
                  Update your personal information
                </p>
                <Button variant="outline" className="mt-2" asChild>
                  <Link to="/profile">Edit Profile</Link>
                </Button>
              </div>

              <div className="pt-4 border-t">
                <h3 className="text-lg font-medium">Password</h3>
                <p className="text-sm text-muted-foreground">
                  Change your password
                </p>
                <Button variant="outline" className="mt-2">
                  Reset Password
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Account;
