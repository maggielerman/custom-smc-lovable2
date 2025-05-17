
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabaseClient } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { LogIn } from "lucide-react";

type Profile = {
  id: string;
  username: string | null;
  display_name: string | null;
  avatar_url: string | null;
};

const Profile = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");

  useEffect(() => {
    if (!user) return;
    
    const fetchProfile = async () => {
      try {
        setLoading(true);
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
      } catch (error: any) {
        console.error("Error fetching profile:", error);
        toast.error("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  const updateProfile = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      
      const { error } = await supabaseClient
        .from("profiles")
        .update({
          username,
          display_name: displayName,
          updated_at: new Date().toISOString(),
        })
        .eq("id", user.id);

      if (error) throw error;
      
      toast.success("Profile updated successfully");
      
      // Refresh profile data
      setProfile({
        ...profile!,
        username,
        display_name: displayName,
      });
    } catch (error: any) {
      console.error("Error updating profile:", error);
      toast.error(error.message || "Error updating profile");
    } finally {
      setLoading(false);
    }
  };

  const getInitials = () => {
    if (displayName) {
      return displayName.substring(0, 2).toUpperCase();
    }
    return user?.email?.substring(0, 2).toUpperCase() || "U";
  };

  // Login prompt component
  const LoginPrompt = () => (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <h2 className="text-2xl font-bold mb-4">Sign In to View Your Profile</h2>
      <p className="text-center text-muted-foreground mb-6">
        You need to be signed in to view and edit your profile.
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
      <div className="container max-w-3xl py-10">
        <div className="flex justify-center items-center min-h-[300px]">
          <div className="animate-pulse text-xl">Loading...</div>
        </div>
      </div>
    );
  }

  // Show login prompt if user is not authenticated
  if (!user) {
    return (
      <div className="container max-w-3xl py-10">
        <h1 className="text-3xl font-bold mb-8">Your Profile</h1>
        <LoginPrompt />
      </div>
    );
  }

  return (
    <div className="container max-w-3xl py-10">
      <h1 className="text-3xl font-bold mb-8">Your Profile</h1>
      
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <Avatar className="w-16 h-16">
              <AvatarFallback className="text-xl">{getInitials()}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle>{displayName || user.email}</CardTitle>
              <CardDescription>{user.email}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              value={user.email || ""}
              disabled
              className="bg-muted"
            />
            <p className="text-xs text-muted-foreground">Your email cannot be changed</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter a username"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="displayName">Display Name</Label>
            <Input
              id="displayName"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Enter your display name"
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            onClick={updateProfile} 
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Profile;
