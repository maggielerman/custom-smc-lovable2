import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabaseClient } from "@/lib/supabase";
import { DUMMY_BLOG_POSTS } from "@/lib/dummyBlogPosts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";

interface Post {
  id: string;
  title: string;
  created_at: string;
  content: string;
  featured_image_url?: string | null;
}

const BlogHome = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await supabaseClient
        .from("blog_posts")
        .select("id, title, created_at, content, featured_image_url")
        .eq("published", true)
        .order("created_at", { ascending: false });
      if (data && data.length > 0) {
        setPosts(data);
      } else {
        setPosts(
          DUMMY_BLOG_POSTS.map(({ id, title, created_at, content, featured_image_url }) => ({
            id,
            title,
            created_at,
            content,
            featured_image_url,
          }))
        );
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="container py-10 flex-grow space-y-6">
        <h1 className="text-3xl font-bold mb-6">Blog</h1>
        {posts.map((post) => {
          const excerpt = post.content
            .replace(/<[^>]+>/g, "")
            .slice(0, 100);
          return (
            <Card key={post.id}>
              <CardHeader>
                <CardTitle>
                  <Link to={`/blog/${post.id}`} className="hover:underline">
                    {post.title}
                  </Link>
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  {format(new Date(post.created_at), "PPP")}
                </p>
              </CardHeader>
              <CardContent className="space-y-2">
                {post.featured_image_url && (
                  <img
                    src={post.featured_image_url}
                    alt="Featured"
                    className="max-h-60 w-full object-cover rounded"
                  />
                )}
                <p>{excerpt}...</p>
              </CardContent>
            </Card>
          );
        })}
      </main>
      <Footer />
    </div>
  );
};

export default BlogHome;
