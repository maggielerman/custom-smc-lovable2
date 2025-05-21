import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/hooks/useAuth";
import { supabaseClient } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

const BecomeContributor = () => {
  const { user } = useAuth();
  const [isContributor, setIsContributor] = useState(false);

  useEffect(() => {
    if (!user) return;
    const fetchProfile = async () => {
      const { data } = await supabaseClient
        .from("profiles")
        .select("is_contributor")
        .eq("id", user.id)
        .maybeSingle();
      setIsContributor(Boolean(data?.is_contributor));
    };
    fetchProfile();
  }, [user]);

  const becomeContributor = async () => {
    if (!user) return;
    const { error } = await supabaseClient
      .from("profiles")
      .update({ is_contributor: true, updated_at: new Date().toISOString() })
      .eq("id", user.id);
    if (error) {
      toast.error("Failed to update profile");
    } else {
      toast.success("You are now a contributor!");
      setIsContributor(true);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="container py-10 flex-grow">
        <Card className="max-w-xl mx-auto">
          <CardHeader>
            <CardTitle>Become a Contributor</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {user ? (
              isContributor ? (
                <p>You are already a contributor.</p>
              ) : (
                <Button onClick={becomeContributor}>Become Contributor</Button>
              )
            ) : (
              <p>Please sign in to continue.</p>
            )}
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default BecomeContributor;
