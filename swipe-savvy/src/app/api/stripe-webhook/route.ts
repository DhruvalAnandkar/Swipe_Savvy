import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

// Initialize Stripe client with your secret key from environment variables
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

// Initialize Supabase client with your project URL and anon key
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

/**
 * POST handler for Stripe webhook endpoint
 * Verifies Stripe webhook signature,
 * listens for checkout.session.completed event,
 * and updates user subscription status in Supabase accordingly.
 */
export async function POST(req: Request) {
  try {
    // Read raw request body as ArrayBuffer for Stripe signature verification
    const buf = await req.arrayBuffer();
    const rawBody = Buffer.from(buf);

    // Retrieve Stripe signature from headers
    const sig = req.headers.get("stripe-signature");
    if (!sig) {
      console.error("❌ Missing Stripe signature header");
      return NextResponse.json({ error: "Missing Stripe signature" }, { status: 400 });
    }

    let event: Stripe.Event;

    try {
      // Verify webhook signature using your Stripe webhook secret
      event = stripe.webhooks.constructEvent(rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET!);
    } catch (err: any) {
      console.error("❌ Webhook signature verification failed:", err.message);
      return NextResponse.json({ error: "Invalid webhook signature" }, { status: 400 });
    }

    // Handle checkout.session.completed event to mark user as paid
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;

      const email = session.customer_email;
      if (!email) {
        console.error("❌ No customer email found in session");
        return NextResponse.json({ error: "No customer email in session" }, { status: 400 });
      }

      // Update Supabase accounts table to mark user as paid/upgraded
      const { error } = await supabase
        .from("accounts")
        .update({ is_paid: true })
        .eq("email", email);

      if (error) {
        console.error("❌ Failed to update Supabase for user:", email, error.message);
      } else {
        console.log(`✅ Successfully upgraded account for: ${email}`);
      }
    }

    // Return successful response to Stripe
    return NextResponse.json({ received: true });
  } catch (err: any) {
    console.error("❌ Error handling webhook:", err.message);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
