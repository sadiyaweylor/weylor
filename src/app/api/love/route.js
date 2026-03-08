export const dynamic = "force-dynamic";
export const runtime = "nodejs";

import { supabase } from "@/lib/supabase";

/* ---------------- GET LOVE COUNT ---------------- */

export async function GET() {
  try {
    const { count, error } = await supabase
      .from("loves")
      .select("*", { count: "exact", head: true });

    if (error) {
      console.error("GET loves error:", error);
      return Response.json({ error: error.message }, { status: 500 });
    }

    return Response.json({ count: count ?? 0 });

  } catch (err) {
    console.error("GET loves crash:", err);
    return Response.json({ error: "Failed to fetch love count" }, { status: 500 });
  }
}

/* ---------------- ADD LOVE ---------------- */

export async function POST(req) {
  try {

    const body = await req.json().catch(() => null);

    if (!body?.device_id) {
      return Response.json({ error: "device_id required" }, { status: 400 });
    }

    const { error } = await supabase
      .from("loves")
      .upsert(
        { device_id: body.device_id },
        { onConflict: "device_id" }
      );

    if (error) {
      console.error("POST love error:", error);
      return Response.json({ error: error.message }, { status: 500 });
    }

    return Response.json({ success: true });

  } catch (err) {
    console.error("POST love crash:", err);
    return Response.json({ error: "Failed to add love" }, { status: 500 });
  }
}

/* ---------------- REMOVE LOVE ---------------- */

export async function DELETE(req) {
  try {

    const body = await req.json().catch(() => null);

    if (!body?.device_id) {
      return Response.json({ error: "device_id required" }, { status: 400 });
    }

    const { error } = await supabase
      .from("loves")
      .delete()
      .eq("device_id", body.device_id);

    if (error) {
      console.error("DELETE love error:", error);
      return Response.json({ error: error.message }, { status: 500 });
    }

    return Response.json({ success: true });

  } catch (err) {
    console.error("DELETE love crash:", err);
    return Response.json({ error: "Failed to remove love" }, { status: 500 });
  }
}