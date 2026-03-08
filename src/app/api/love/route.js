import { supabase } from "@/lib/supabase";

export async function GET() {
  try {

    const { count, error } = await supabase
      .from("loves")
      .select("*", { count: "exact", head: true });

    if (error) throw error;

    return Response.json({ count: count || 0 });

  } catch (err) {
    console.error("GET love error:", err);
    return Response.json({ error: "Failed to fetch count" }, { status: 500 });
  }
}

export async function POST(req) {
  try {

    const body = await req.json();
    const device_id = body.device_id;

    if (!device_id) {
      return Response.json({ error: "Missing device_id" }, { status: 400 });
    }

    const { error } = await supabase
      .from("loves")
      .upsert({ device_id }, { onConflict: "device_id" });

    if (error) throw error;

    return Response.json({ success: true });

  } catch (err) {
    console.error("POST love error:", err);
    return Response.json({ error: "Failed to add love" }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {

    const body = await req.json();
    const device_id = body.device_id;

    if (!device_id) {
      return Response.json({ error: "Missing device_id" }, { status: 400 });
    }

    const { error } = await supabase
      .from("loves")
      .delete()
      .eq("device_id", device_id);

    if (error) throw error;

    return Response.json({ success: true });

  } catch (err) {
    console.error("DELETE love error:", err);
    return Response.json({ error: "Failed to remove love" }, { status: 500 });
  }
}