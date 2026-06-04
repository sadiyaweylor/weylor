import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function POST(req) {
  console.log("🚀 API route hit");

  try {
    // Check env vars
    console.log("Resend configured:", !!process.env.RESEND_API_KEY);
    console.log(
      "Supabase configured:",
      !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
        !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );

    // Parse request
    const body = await req.json();
    console.log("Request body:", body);

    const email = body?.email?.toLowerCase().trim();

    if (!email) {
      return Response.json(
        { success: false, error: "Email is required" },
        { status: 400 }
      );
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return Response.json(
        { success: false, error: "Invalid email address" },
        { status: 400 }
      );
    }

    console.log("📧 Email:", email);

    // Insert subscriber
    const { data, error } = await supabase
      .from("subscribers")
      .insert([{ email }])
      .select()
      .single();

    console.log("Supabase data:", data);
    console.log("Supabase error:", error);

    if (error) {
      // Duplicate email
      if (error.code === "23505") {
        return Response.json({
          success: true,
          message: "You're already part of the Weylor Circle! ✨",
        });
      }

      return Response.json(
        {
          success: false,
          error: error.message,
        },
        { status: 500 }
      );
    }

    // Send welcome email
    try {
      const mailResult = await resend.emails.send({
        from: "Weylor <founder@weylor.world>",
        to: email,
        subject: "A personal welcome from Weylor! ✨",
        html: `
<div style="
  font-family: Georgia, serif;
  max-width: 620px;
  margin: 0 auto;
  background: #F7F3EC;
  color: #1a1a1a;
  overflow:hidden;
  border-radius:24px;
">

  <!-- FULL WIDTH HERO -->

  <img
    src="https://weylor.world/hero.jpg"
    alt="Weylor"
    style="
      display:block;
      width:100%;
      height:auto;
      margin:0;
      padding:0;
      border:0;
    "
  >

  <!-- CONTENT -->

  <div style="
    padding:60px 40px;
    text-align:center;
  ">

    <div style="
      letter-spacing:5px;
      font-size:12px;
      color:#8A8178;
      margin-bottom:18px;
    ">
      WEYLOR
    </div>

    <h1 style="
      font-size:42px;
      line-height:1.2;
      font-weight:400;
      margin:0;
      color:#111;
    ">
      Before anything else,<br>
      thank you.
    </h1>

    <p style="
      max-width:420px;
      margin:24px auto 0;
      font-size:18px;
      color:#5C5752;
      line-height:1.7;
    ">
      For choosing slower fashion.
      For supporting a small dream.
      For believing that what we wear can be kinder to the world around us.
    </p>

  </div>

</div>
  <!-- LETTER -->

  <p>
    Hey there,
  </p>

  <p>
    Thank you for joining the Weylor Circle.
  </p>

  <p>
    Every brand begins with a dream, however Weylor began with a question:
    <em>Can fashion feel good, look beautiful, and leave a lighter footprint on the world?</em>
  </p>

  <p>
    That question became countless fabric samples, sketches, mistakes,
    lessons, late nights, and eventually, the pieces you see today.
  </p>

  <p>
    This isn't a list built for constant promotions.
  </p>

  <p>
    From time to time, I'll write to you personally with new collections,
    stories from behind the scenes, reflections from building Weylor,
    and occasionally something beautiful that deserves to be shared.
  </p>

  <p>
    If you've chosen to be here at this stage of our journey,
    thank you.
  </p>

  <p>
    Your support means far more than a number on a screen.
    It helps a small independent dream continue to grow.
  </p>

  <div style="
    background:#F7F3EC;
    padding:24px;
    border-radius:16px;
    margin:40px 0;
    font-style:italic;
  ">
    “The sky that shelters, the soil that feeds,
    the mountains that shield, the rivers that quench,
    the air that calms and the koel that sings.”
    <br><br>
    Much of Weylor's philosophy comes from learning to appreciate
    the quiet gifts that already surround us.
  </div>

  <div style="
    text-align:center;
    margin:50px 0;
  ">
    <a
      href="https://weylor.world"
      style="
        display:inline-block;
        background:#111;
        color:#fff;
        padding:15px 32px;
        border-radius:999px;
        text-decoration:none;
        font-size:15px;
      "
    >
      Explore Weylor
    </a>
  </div>

  <p>
    Warmly,
  </p>

  <p>
    <strong>Sadiya Koreen</strong><br>
    Founder, Weylor.
  </p>

  <hr style="
    border:none;
    border-top:1px solid #eaeaea;
    margin:40px 0;
  ">

  <p style="
    font-size:12px;
    color:#888;
    text-align:center;
  ">
    You're receiving this because you joined the Weylor Circle at weylor.world.
  </p>

</div>
`,
      });

      console.log("Resend success:", mailResult);
    } catch (mailError) {
      console.error("Resend error:", mailError);
    }

    return Response.json({
      success: true,
      message: "You're in. Welcome to Weylor! ✨",
    });
  } catch (err) {
    console.error("Subscription error:", err);

    return Response.json(
      {
        success: false,
        error: err.message || "Something went wrong!",
      },
      { status: 500 }
    );
  }
}