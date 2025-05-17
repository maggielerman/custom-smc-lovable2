import { useState, useEffect } from "react";
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
import { BookOpen, Settings, FileText, LogIn } from "lucide-react";
import DraftsList from "@/components/DraftsList";
import { useNavigate } from "react-router-dom";
import { supabaseClient } from "@/lib/supabase";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const Account = () => {
  const { user, signOut, isLoading } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [profileLoading, setProfileLoading] = useState(false);

  useEffect(() => {
    if (!user) return;
    const fetchProfile = async () => {
      try {
        setProfileLoading(true);
        const { data, error } = await supabaseClient
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .maybeSingle();
        if (error) throw error;
        if (data) {
          setProfile(data);
          setUsername(data.username || "");
          setDisplayName(data.display_name || "");
        }
      } catch (error) {
        // handle error
      } finally {
        setProfileLoading(false);
      }
    };
    fetchProfile();
  }, [user]);

  const updateProfile = async () => {
    if (!user) return;
    try {
      setProfileLoading(true);
      const { error } = await supabaseClient
        .from("profiles")
        .update({
          username,
          display_name: displayName,
          updated_at: new Date().toISOString(),
        })
        .eq("id", user.id);
      if (error) throw error;
      setProfile({ ...profile, username, display_name: displayName });
    } catch (error) {
      // handle error
    } finally {
      setProfileLoading(false);
    }
  };

  // Login prompt component
  const LoginPrompt = () => (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <h2 className="text-2xl font-bold mb-4">Sign In to Access Your Account</h2>
      <p className="text-center text-muted-foreground mb-6">
        You need to be signed in to view and manage your account settings.
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
        <h1 className="text-3xl font-bold mb-8">Your Account</h1>
        <LoginPrompt />
      </div>
    );
  }

  return (
    <div className="container py-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <h1 className="text-3xl font-bold">Your Account</h1>
        <Button variant="outline" onClick={signOut} className="mt-4 sm:mt-0">
          Sign Out
        </Button>
      </div>

      <Tabs defaultValue="drafts" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-8">
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
          <TabsTrigger value="profile" className="flex gap-2 items-center">
            <Avatar className="h-4 w-4">
              <AvatarFallback>
                {user.user_metadata.name?.split(" ").map((word) => word[0]).join("")}
              </AvatarFallback>
            </Avatar>
            <span>Profile</span>
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
                <Link to="/customize/">Create New Book</Link>
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

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profile</CardTitle>
              <CardDescription>Manage your profile information.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-4">
                <Avatar className="w-16 h-16">
                  <AvatarFallback className="text-xl">{displayName ? displayName.substring(0, 2).toUpperCase() : user.email.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-semibold">{displayName || user.email}</div>
                  <div className="text-muted-foreground text-sm">{user.email}</div>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" value={user.email || ""} disabled className="bg-muted" />
                <p className="text-xs text-muted-foreground">Your email cannot be changed</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input id="username" value={username} onChange={e => setUsername(e.target.value)} placeholder="Enter a username" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="displayName">Display Name</Label>
                <Input id="displayName" value={displayName} onChange={e => setDisplayName(e.target.value)} placeholder="Enter your display name" />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={updateProfile} disabled={profileLoading}>{profileLoading ? "Saving..." : "Save Changes"}</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Account;
