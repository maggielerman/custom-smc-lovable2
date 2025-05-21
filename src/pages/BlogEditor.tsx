import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/hooks/useAuth";
import { supabaseClient } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

const BlogEditor = () => {
  const { user } = useAuth();
  const { postId } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (postId && user) {
      const fetchPost = async () => {
        const { data } = await supabaseClient
          .from("blog_posts")
          .select("title, content")
          .eq("id", postId)
          .eq("user_id", user.id)
          .maybeSingle();
        if (data) {
          setTitle(data.title);
          setContent(data.content);
        }
      };
      fetchPost();
    }
  }, [postId, user]);

  const handleSave = async () => {
    if (!user) return;
    try {
      setLoading(true);
      if (postId) {
        const { error } = await supabaseClient
          .from("blog_posts")
          .update({ title, content, updated_at: new Date().toISOString() })
          .eq("id", postId)
          .eq("user_id", user.id);
        if (error) throw error;
      } else {
        const { error } = await supabaseClient.from("blog_posts").insert({
          title,
          content,
          user_id: user.id,
        });
        if (error) throw error;
      }
      toast.success("Post saved");
      navigate("/account?tab=blog");
    } catch (err: any) {
      console.error("Save error:", err);
      toast.error("Failed to save post");
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="container py-10 flex-grow">Please sign in</main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="container py-10 flex-grow">
        <Card>
          <CardHeader>
            <CardTitle>{postId ? "Edit Post" : "New Post"}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Textarea
              className="min-h-[200px]"
              placeholder="Write your post..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </CardContent>
          <CardFooter>
            <Button onClick={handleSave} disabled={loading}>
              {loading ? "Saving..." : "Save"}
            </Button>
          </CardFooter>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default BlogEditor;
