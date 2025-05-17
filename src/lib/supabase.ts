
import { createClient } from '@supabase/supabase-js'
import { supabase as supabaseFromIntegration } from '@/integrations/supabase/client'

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
          thumbnail_url: string | null
          pages: number
          age_range: string
          created_at: string
        }
      }
      profiles: {
        Row: {
          id: string
          username: string | null
          display_name: string | null
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          username?: string | null
          display_name?: string | null
          avatar_url?: string | null
        }
        Update: {
          username?: string | null
          display_name?: string | null
          avatar_url?: string | null
        }
      }
    }
  }
}

// Create Supabase client using the integration
export const supabaseClient = supabaseFromIntegration

// Helper function to safely use the Supabase client
export const getSupabaseClient = () => {
  if (!supabaseClient) {
    console.error('Supabase client is not initialized. Please connect your project to Supabase.');
    throw new Error('Supabase client is not initialized. Please connect your project to Supabase.');
  }
  return supabaseClient;
};

export default supabaseClient;
