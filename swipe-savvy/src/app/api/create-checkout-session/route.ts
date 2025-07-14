import { NextResponse } from "next/server";
import Stripe from "stripe";

// Initialize Stripe client with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  try {
    // Parse JSON body to get email
    const { email } = await req.json();

    // Validate email presence and type
    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Valid email is required" }, { status: 400 });
    }

    // Create Stripe Checkout session for subscription
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "subscription",
      customer_email: email,
      line_items: [
        {
          price: "price_1RkEluCymGi4vYPGerp442xj", // <-- Replace with your actual Stripe Price ID
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/terms`,
    });

    console.log("✅ Stripe session created:", session);
    console.log("✅ Stripe session URL:", session.url);

    if (!session.url) {
      console.error("❌ Stripe session URL missing");
      return NextResponse.json({ error: "Stripe did not return a session URL" }, { status: 500 });
    }

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error("❌ Stripe API error:", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
