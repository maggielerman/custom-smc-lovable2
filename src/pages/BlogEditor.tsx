import { useEffect, useState, useRef, ChangeEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/hooks/useAuth";
import { supabaseClient } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const BlogEditor = () => {
  const { user } = useAuth();
  const { postId } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [featuredImageUrl, setFeaturedImageUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (postId && user) {
      const fetchPost = async () => {
        const { data } = await supabaseClient
          .from("blog_posts")
          .select("title, content, featured_image_url")
          .eq("id", postId)
          .eq("user_id", user.id)
          .maybeSingle();
        if (data) {
          setTitle(data.title);
          setContent(data.content);
          setFeaturedImageUrl(data.featured_image_url || null);
        }
      };
      fetchPost();
    }
  }, [postId, user]);

  const uploadImage = async (file: File) => {
    if (!supabaseClient) return null;
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random()}.${fileExt}`;
    const { error } = await supabaseClient.storage
      .from('blog-images')
      .upload(fileName, file);
    if (error) {
      toast.error('Image upload failed');
      return null;
    }
    const { data } = supabaseClient.storage
      .from('blog-images')
      .getPublicUrl(fileName);
    return data.publicUrl as string;
  };

  const handleFeaturedImageChange = async (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = await uploadImage(file);
    if (url) setFeaturedImageUrl(url);
    e.target.value = '';
  };

  const handleInsertImage = async (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = await uploadImage(file);
    if (url) setContent((prev) => `${prev}\n<img src="${url}" alt="" />\n`);
    e.target.value = '';
  };

  const handleSave = async () => {
    if (!user) return;
    try {
      setLoading(true);
      if (postId) {
        const { error } = await supabaseClient
          .from("blog_posts")
          .update({
            title,
            content,
            featured_image_url: featuredImageUrl,
            updated_at: new Date().toISOString(),
          })
          .eq("id", postId)
          .eq("user_id", user.id);
      if (error) throw error;
      } else {
        const { error } = await supabaseClient.from("blog_posts").insert({
          title,
          content,
          featured_image_url: featuredImageUrl,
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
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="featured">Featured Image</Label>
              <Input
                id="featured"
                type="file"
                accept="image/*"
                onChange={handleFeaturedImageChange}
              />
              {featuredImageUrl && (
                <img
                  src={featuredImageUrl}
                  alt="Featured"
                  className="max-h-48 rounded mt-2"
                />
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                className="min-h-[200px]"
                placeholder="Write your post..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="insertImage">Insert Image</Label>
              <Input
                id="insertImage"
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleInsertImage}
              />
            </div>
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
