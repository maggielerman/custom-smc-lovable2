
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
      blog_posts: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          title: string
          content: string
          featured_image_url: string | null
          user_id: string
          published: boolean
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          title: string
          content: string
          featured_image_url?: string | null
          user_id: string
          published?: boolean
        }
      }
      families: {
        Row: {
          id: string
          user_id: string
          name: string
          structure: string
          members: any
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          structure: string
          members?: any
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          structure?: string
          members?: any
          created_at?: string
          updated_at?: string
        }
      }
      profiles: {
        Row: {
          id: string
          username: string | null
          display_name: string | null
          avatar_url: string | null
          is_contributor: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          username?: string | null
          display_name?: string | null
          avatar_url?: string | null
          is_contributor?: boolean
        }
        Update: {
          username?: string | null
          display_name?: string | null
          avatar_url?: string | null
          is_contributor?: boolean
        }
      }
    }
  }
}

// Use the Supabase client from integration directly
export const supabaseClient = supabaseFromIntegration

// Helper function to safely use the Supabase client
export const getSupabaseClient = () => {
  if (!supabaseClient) {
    const message = 'Supabase client is not initialized. Please check your connection.'
    console.error(message)
    throw new Error(message)
  }
  return supabaseClient
}

export default supabaseClient;
