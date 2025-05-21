import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabaseClient } from "@/lib/supabase";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";

interface Post {
  id: string;
  title: string;
  created_at: string;
}

const BlogHome = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await supabaseClient
        .from("blog_posts")
        .select("id, title, created_at")
        .eq("published", true)
        .order("created_at", { ascending: false });
      setPosts(data || []);
    };
    fetchPosts();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="container py-10 flex-grow space-y-6">
        <h1 className="text-3xl font-bold mb-6">Blog</h1>
        {posts.map((post) => (
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
            <CardContent></CardContent>
          </Card>
        ))}
      </main>
      <Footer />
    </div>
  );
};

export default BlogHome;
