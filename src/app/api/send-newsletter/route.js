import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";

const resend = new Resend(process.env.RESEND_API_KEY);

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function POST(req) {
  try {
    const { email } = await req.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return Response.json({ error: "Valid email required" }, { status: 400 });
    }

    const normalizedEmail = email.toLowerCase();

    const { error } = await supabase
      .from("subscribers")
      .insert({ email: normalizedEmail });

    if (error) {
      if (error.code === "23505") {
        return Response.json({ message: "Already subscribed" });
      }
      console.error(error);
      return Response.json({ error: "Database error" }, { status: 500 });
    }

    await resend.emails.send({
      from: "Weylor <founder@weylor.world>",
      to: normalizedEmail,
      subject: "Welcome to the Weylor Circle ✨",
      html: `<h2>Welcome to the Weylor Circle</h2><p>You’re now part of something thoughtful.</p>`,
    });

    return Response.json({ success: true });
  } catch (err) {
    console.error("Subscription error:", err);
    return Response.json({ error: "Subscription failed" }, { status: 500 });
  }
}