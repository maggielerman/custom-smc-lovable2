
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // Create Supabase client - use anon key for client-side auth
  const supabaseClient = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_ANON_KEY") ?? ""
  );

  try {
    // Parse the request body
    const { items } = await req.json();

    if (!items || !Array.isArray(items) || items.length === 0) {
      throw new Error("Invalid cart items");
    }

    // Get user info if available
    let user = null;
    const authHeader = req.headers.get("Authorization");
    if (authHeader) {
      const token = authHeader.replace("Bearer ", "");
      const { data } = await supabaseClient.auth.getUser(token);
      user = data?.user;
    }

    // Initialize Stripe
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2023-10-16",
    });

    // Format line items for Stripe
    const lineItems = items.map(item => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.title || "Custom Children's Book",
          description: "Personalized children's book",
        },
        unit_amount: Math.round(item.price * 100), // Convert to cents
      },
      quantity: item.quantity,
    }));

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${req.headers.get("origin") || ""}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get("origin") || ""}/cart`,
      customer_email: user?.email, // Pre-fill email if user is authenticated
    });

    // Optional: Track the order in Supabase (would usually be done with a webhook)
    if (user) {
      const supabaseAdmin = createClient(
        Deno.env.get("SUPABASE_URL") ?? "",
        Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
      );

      try {
        // Create orders table if it doesn't exist yet
        await supabaseAdmin.rpc("create_orders_table_if_not_exists");
        
        // Add order to database
        await supabaseAdmin.from("orders").insert({
          user_id: user.id,
          stripe_session_id: session.id,
          amount: Math.round(items.reduce((sum, item) => sum + (item.price * item.quantity), 0) * 100) / 100,
          items: items,
          status: "pending"
        });
      } catch (dbError) {
        // Log the error but don't fail the checkout if DB insert fails
        console.error("Failed to record order:", dbError);
      }
    }

    return new Response(
      JSON.stringify({ url: session.url }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );

  } catch (error) {
    console.error("Checkout error:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      }
    );
  }
});
