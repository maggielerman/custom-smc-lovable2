
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabaseClient } from "@/lib/supabase";
import { DUMMY_BLOG_POSTS } from "@/lib/dummyBlogPosts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";

interface Post {
  id: string;
  title: string;
  content: string;
  created_at: string;
  featured_image_url?: string | null;
}

const BlogPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      if (!supabaseClient || !slug) return;
      
      const { data } = await supabaseClient
        .from("blog_posts")
        .select("id, title, content, created_at, featured_image_url")
        .eq("id", slug)
        .eq("published", true)
        .maybeSingle();
      if (data) {
        setPost(data);
      } else {
        const fallback = DUMMY_BLOG_POSTS.find((p) => p.id === slug);
        if (fallback) setPost(fallback);
      }
    };
    if (slug) fetchPost();
  }, [slug]);

  if (!post) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="container py-10 flex-grow">Post not found</main>
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
            <CardTitle className="mb-2">{post.title}</CardTitle>
            <p className="text-sm text-muted-foreground mb-4">
              {format(new Date(post.created_at), "PPP")}
            </p>
            {post.featured_image_url && (
              <img
                src={post.featured_image_url}
                alt="Featured"
                className="max-h-80 w-full object-cover rounded"
              />
            )}
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
