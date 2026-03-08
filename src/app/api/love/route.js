import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

/* GET LOVE COUNT */

export async function GET() {
  try {
    const { count, error } = await supabase
      .from("loves")
      .select("*", { count: "exact", head: true });

    if (error) {
      return Response.json({ error: error.message }, { status: 500 });
    }

    return Response.json({ count: count || 0 });

  } catch {
    return Response.json({ error: "Failed to fetch love count" }, { status: 500 });
  }
}

/* ADD LOVE */

export async function POST(req) {
  try {

    const { device_id } = await req.json();

    if (!device_id) {
      return Response.json({ error: "device_id required" }, { status: 400 });
    }

    const { error } = await supabase
      .from("loves")
      .upsert({ device_id }, { onConflict: "device_id" });

    if (error) {
      return Response.json({ error: error.message }, { status: 500 });
    }

    return Response.json({ success: true });

  } catch {
    return Response.json({ error: "Failed to add love" }, { status: 500 });
  }
}

/* REMOVE LOVE */

export async function DELETE(req) {
  try {

    const { device_id } = await req.json();

    if (!device_id) {
      return Response.json({ error: "device_id required" }, { status: 400 });
    }

    const { data } = await supabase
      .from("loves")
      .select("device_id")
      .eq("device_id", device_id)
      .maybeSingle();

    if (!data) {
      return Response.json({ success: true });
    }

    const { error } = await supabase
      .from("loves")
      .delete()
      .eq("device_id", device_id);

    if (error) {
      return Response.json({ error: error.message }, { status: 500 });
    }

    return Response.json({ success: true });

  } catch {
    return Response.json({ error: "Failed to remove love" }, { status: 500 });
  }
}