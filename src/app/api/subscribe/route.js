import { Resend } from "resend";
import { supabase } from "@/lib/supabase";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {

  try {

    const { email } = await req.json();

    if (!email) {
      return Response.json({ error: "Email required" }, { status: 400 });
    }

    /* check if already subscribed */

    const { data: existing } = await supabase
      .from("subscribers")
      .select("email")
      .eq("email", email)
      .maybeSingle();

    if (existing) {
      return Response.json({ message: "Already subscribed" });
    }

    /* insert subscriber */

    const { error } = await supabase
      .from("subscribers")
      .insert({ email });

    if (error) {
      return Response.json({ error: error.message }, { status: 500 });
    }

    /* send welcome email */

    await resend.emails.send({
      from: "Weylor <founder@weylor.world>",
      to: email,
      subject: "Welcome to the Weylor Circle ✨",
      html: `
      <div style="font-family:Arial;max-width:600px;margin:auto">

        <img 
          src="https://yourdomain.com/newsletter-banner.jpg"
          style="width:100%;border-radius:12px"
        />

        <h2>Welcome to the Weylor Circle</h2>

        <p>
          You’re now part of something thoughtful.
        </p>

        <p>
          Expect early access to collections, stories,
          and pieces crafted with intention.
        </p>

        <a 
          href="https://yourdomain.com"
          style="
            display:inline-block;
            margin-top:20px;
            padding:12px 20px;
            background:black;
            color:white;
            text-decoration:none;
            border-radius:8px;
          "
        >
          Explore Weylor
        </a>

      </div>
      `
    });

    return Response.json({ success: true });

  } catch (err) {

    return Response.json({ error: "Subscription failed" }, { status: 500 });

  }
}