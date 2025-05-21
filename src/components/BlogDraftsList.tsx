import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabaseClient } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { EditIcon, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { formatDistanceToNow } from "date-fns";

type Post = {
  id: string;
  title: string;
  created_at: string;
  updated_at: string;
  published: boolean;
};

interface BlogDraftsListProps {
  published?: boolean;
}

const BlogDraftsList = ({ published }: BlogDraftsListProps) => {
  const { user } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const fetchPosts = async () => {
      try {
        setLoading(true);
        let query = supabaseClient
          .from("blog_posts")
          .select("*")
          .eq("user_id", user.id)
          .order("updated_at", { ascending: false });
        if (published !== undefined) {
          query = query.eq("published", published);
        }
        const { data, error } = await query;
        if (error) throw error;
        setPosts(data || []);
      } catch (err: any) {
        console.error("Error fetching posts:", err);
        toast.error("Failed to load posts");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [user, published]);

  const deletePost = async (id: string) => {
    if (!confirm("Are you sure you want to delete this post?")) return;
    try {
      const { error } = await supabaseClient.from("blog_posts").delete().eq("id", id);
      if (error) throw error;
      setPosts((prev) => prev.filter((p) => p.id !== id));
      toast.success("Post deleted");
    } catch (err: any) {
      console.error("Delete error:", err);
      toast.error("Failed to delete post");
    }
  };

  if (!user) {
    return (
      <div className="text-center py-6">
        <p className="text-muted-foreground">Please sign in to view your posts.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={i} className="overflow-hidden">
            <CardContent className="p-6">
              <Skeleton className="h-6 w-3/4" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-muted-foreground mb-4">
          {published ? "You haven't published any posts yet." : "You don't have any drafts yet."}
        </p>
        <Button asChild>
          <Link to="/blog/new">Create Your First Post</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <Card key={post.id} className="overflow-hidden">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Last updated {formatDistanceToNow(new Date(post.updated_at), { addSuffix: true })}
            </p>
          </CardContent>
          <CardFooter className="flex gap-2 justify-end p-6 pt-0">
            <Button variant="outline" size="sm" asChild>
              <Link to={`/blog/${post.id}/edit`} className="flex items-center gap-1">
                <EditIcon className="h-4 w-4" />
                <span>Edit</span>
              </Link>
            </Button>
            <Button variant="outline" size="sm" className="text-destructive hover:text-destructive" onClick={() => deletePost(post.id)}>
              <Trash2 className="h-4 w-4" />
              <span className="sr-only">Delete</span>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default BlogDraftsList;
