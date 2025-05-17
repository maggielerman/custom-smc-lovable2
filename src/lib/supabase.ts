
import { createClient } from '@supabase/supabase-js'

export type Database = {
  public: {
    tables: {
      books: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          title: string
          template_id: string
          content: any
          user_id: string
          published: boolean
          cover_image_url: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          title: string
          template_id: string
          content: any
          user_id: string
          published?: boolean
          cover_image_url?: string | null
        }
      }
      book_templates: {
        Row: {
          id: string
          name: string
          description: string
          thumbnail_url: string
          pages: number
          age_range: string
        }
      }
    }
  }
}

// Check if Supabase environment variables are available
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Create a placeholder client if environment variables aren't available
export const supabaseClient = supabaseUrl && supabaseAnonKey 
  ? createClient<Database>(supabaseUrl, supabaseAnonKey)
  : null;

// Helper function to safely use the Supabase client
export const getSupabaseClient = () => {
  if (!supabaseClient) {
    console.error('Supabase client is not initialized. Please connect your project to Supabase.');
    throw new Error('Supabase client is not initialized. Please connect your project to Supabase.');
  }
  return supabaseClient;
};

export default supabaseClient;
