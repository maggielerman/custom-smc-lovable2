import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabaseClient } from "@/lib/supabase";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";

interface Post {
  id: string;
  title: string;
  content: string;
  created_at: string;
}

const BlogPost = () => {
  const { postId } = useParams();
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      const { data } = await supabaseClient
        .from("blog_posts")
        .select("id, title, content, created_at")
        .eq("id", postId)
        .eq("published", true)
        .maybeSingle();
      setPost(data);
    };
    if (postId) fetchPost();
  }, [postId]);

  if (!post) return null;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="container py-10 flex-grow">
        <Card>
          <CardHeader>
            <CardTitle className="mb-2">{post.title}</CardTitle>
            <p className="text-sm text-muted-foreground mb-4">
              {format(new Date(post.created_at), "PPP")}
            </p>
          </CardHeader>
          <CardContent>
            <div className="prose" dangerouslySetInnerHTML={{ __html: post.content }} />
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPost;
