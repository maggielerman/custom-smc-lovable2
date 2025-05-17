
# create-payment Edge Function

This Edge Function creates a Stripe Checkout session for processing payments. It handles cart items, user authentication, and order tracking.

## Setup

Before using this function, you need to:

1. Set up the STRIPE_SECRET_KEY in your Supabase project secrets
2. Create a database function named `create_orders_table_if_not_exists` with the SQL below:

```sql
CREATE OR REPLACE FUNCTION create_orders_table_if_not_exists()
RETURNS VOID AS $$
BEGIN
    -- Check if the orders table already exists
    IF NOT EXISTS (
        SELECT FROM pg_tables 
        WHERE schemaname = 'public' 
        AND tablename = 'orders'
    ) THEN
        -- Create the orders table
        CREATE TABLE public.orders (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            user_id UUID REFERENCES auth.users(id),
            stripe_session_id TEXT UNIQUE,
            amount DECIMAL(10, 2) NOT NULL,
            items JSONB NOT NULL,
            status TEXT NOT NULL,
            created_at TIMESTAMPTZ DEFAULT now(),
            updated_at TIMESTAMPTZ DEFAULT now()
        );

        -- Enable Row Level Security
        ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

        -- Create RLS policies
        CREATE POLICY "Users can view their own orders"
            ON public.orders
            FOR SELECT
            USING (auth.uid() = user_id);
            
        CREATE POLICY "Service role can manage all orders"
            ON public.orders
            USING (TRUE);
    END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

## Usage

The function expects a POST request with a JSON body containing:

```json
{
  "items": [
    {
      "id": "book-id",
      "title": "Book Title",
      "price": 29.99,
      "quantity": 1
    }
  ]
}
```
