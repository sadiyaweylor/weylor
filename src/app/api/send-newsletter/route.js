import { supabase } from "@/lib/supabase";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {

  const { subject, content, image } = await req.json();

  if (!subject || !content) {
    return Response.json({ error: "Missing content" }, { status: 400 });
  }

  /* get all subscribers */

  const { data: subscribers } = await supabase
    .from("subscribers")
    .select("email");

  const emails = subscribers.map(s => s.email);

  /* send email */

  await resend.emails.send({
    from: "Weylor <founder@weylor.world>",
    to: emails,
    subject: subject,
    html: `
      <div style="font-family:Arial;max-width:600px;margin:auto">

        ${image ? `<img src="${image}" style="width:100%;border-radius:12px;margin-bottom:20px"/>` : ""}

        <h2>${subject}</h2>

        <div style="font-size:16px;color:#444;line-height:1.6">
          ${content}
        </div>

        <a
          href="https://yourdomain.com"
          style="
            display:inline-block;
            margin-top:25px;
            padding:12px 20px;
            background:black;
            color:white;
            text-decoration:none;
            border-radius:8px;
          "
        >
          Visit Weylor
        </a>

      </div>
    `
  });

  return Response.json({ success: true });
}