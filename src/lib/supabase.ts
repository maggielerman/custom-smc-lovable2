
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

// Important: The Supabase URL and anon key need to be configured via the Supabase integration
// This code will work once the user has connected their project to Supabase
export const supabaseClient = createClient<Database>(
  import.meta.env.VITE_SUPABASE_URL || '',
  import.meta.env.VITE_SUPABASE_ANON_KEY || ''
)

export default supabaseClient
