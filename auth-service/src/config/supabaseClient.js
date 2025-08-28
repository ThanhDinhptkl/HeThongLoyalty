import { createClient } from "@supabase/supabase-js";

const url = process.env.SUPABASE_URL;
const anon = process.env.SUPABASE_ANON_KEY;
const service = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !anon || !service) {
  throw new Error("Missing Supabase env vars");
}

export const sbPublic = createClient(url, anon, {
  auth: { persistSession: false },
});

// Dùng cho thao tác đặc quyền
export const sbAdmin = createClient(url, service, {
  auth: { persistSession: false },
});

export async function writeAudit({
  user_id,
  actor_id,
  action,
  resource,
  metadata,
}) {
  return sbAdmin
    .from("audit_logs")
    .insert([{ user_id, actor_id, action, resource, metadata }]);
}
