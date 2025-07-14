import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { sendWelcomeEmail } from "@/utils/email";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { fullName, email, mobile, password, website, isAuthorized } = body;

    // Validate required fields early (optional but recommended)
    if (!fullName || !email || !password || !isAuthorized) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const { data: existingUser, error: fetchError } = await supabase
      .from("accounts")
      .select("email")
      .eq("email", email)
      .single();

    if (fetchError && fetchError.code !== "PGRST116") {
      console.error("❌ Error checking user:", fetchError);
      return NextResponse.json(
        { success: false, error: "Failed to check existing user" },
        { status: 500 }
      );
    }

    if (existingUser) {
      return NextResponse.json(
        { success: false, error: "User already exists" },
        { status: 409 }
      );
    }

    // Insert new user
    const { data, error } = await supabase.from("accounts").insert([
      {
        full_name: fullName,
        email,
        mobile,
        password,
        website,
        is_authorized: isAuthorized,
      },
    ]);

    if (error) {
      console.error("❌ Insert error:", error);
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    // Send welcome email (do not block main response)
    try {
      const emailResult = await sendWelcomeEmail(email, fullName);
      if (!emailResult.success) {
        console.warn("⚠️ Failed to send welcome email:", emailResult.error);
      }
    } catch (emailErr) {
      console.warn("⚠️ Unexpected error sending welcome email:", emailErr);
    }

    return NextResponse.json({ success: true, data });
  } catch (err: any) {
    console.error("❌ Server error:", err.message);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
