
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabaseClient } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { EditIcon, BookOpen, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { formatDistanceToNow } from "date-fns";

type Book = {
  id: string;
  title: string;
  created_at: string;
  updated_at: string;
  published: boolean;
  cover_image_url: string | null;
  template_id: string;
};

interface DraftsListProps {
  published?: boolean;
}

const DraftsList = ({ published }: DraftsListProps) => {
  const { user } = useAuth();
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    
    const fetchBooks = async () => {
      try {
        setLoading(true);
        
        let query = supabaseClient
          .from("books")
          .select("*")
          .eq("user_id", user.id)
          .order("updated_at", { ascending: false });
        
        // If filtering by published status
        if (published !== undefined) {
          query = query.eq("published", published);
        }
        
        const { data, error } = await query;

        if (error) throw error;
        
        setBooks(data || []);
      } catch (error: any) {
        console.error("Error fetching books:", error);
        toast.error("Failed to load your books");
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [user, published]);

  const deleteBook = async (id: string) => {
    if (!confirm("Are you sure you want to delete this book? This action cannot be undone.")) {
      return;
    }
    
    try {
      const { error } = await supabaseClient
        .from("books")
        .delete()
        .eq("id", id);

      if (error) throw error;
      
      setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
      toast.success("Book deleted successfully");
    } catch (error: any) {
      console.error("Error deleting book:", error);
      toast.error("Failed to delete book");
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <Card key={index} className="overflow-hidden">
            <div className="flex flex-col sm:flex-row">
              <Skeleton className="h-48 sm:h-auto sm:w-48" />
              <div className="p-6 flex-1">
                <div className="space-y-3">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-4 w-1/4" />
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    );
  }

  if (books.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-muted-foreground mb-4">
          {published ? "You haven't published any books yet." : "You don't have any drafts yet."}
        </p>
        <Button asChild>
          <Link to="/books/new">Create Your First Book</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {books.map((book) => (
        <Card key={book.id} className="overflow-hidden">
          <div className="flex flex-col sm:flex-row">
            {book.cover_image_url ? (
              <div className="h-48 sm:h-auto sm:w-48">
                <img 
                  src={book.cover_image_url} 
                  alt={book.title} 
                  className="h-full w-full object-cover"
                />
              </div>
            ) : (
              <div className="h-48 sm:h-auto sm:w-48 bg-muted flex items-center justify-center">
                <BookOpen className="h-12 w-12 text-muted-foreground" />
              </div>
            )}
            <CardContent className="flex-1 p-6">
              <h3 className="text-xl font-semibold mb-2">{book.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Last updated {formatDistanceToNow(new Date(book.updated_at), { addSuffix: true })}
              </p>
              <div className="flex items-center">
                <span className={`px-2 py-1 rounded text-xs ${book.published ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                  {book.published ? 'Published' : 'Draft'}
                </span>
              </div>
            </CardContent>
            <CardFooter className="flex sm:flex-col justify-end gap-2 p-6">
              <Button variant="outline" size="sm" asChild>
                <Link to={`/books/${book.id}/edit`} className="flex items-center gap-1">
                  <EditIcon className="h-4 w-4" />
                  <span>Edit</span>
                </Link>
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="text-destructive hover:text-destructive"
                onClick={() => deleteBook(book.id)}
              >
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Delete</span>
              </Button>
            </CardFooter>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default DraftsList;
