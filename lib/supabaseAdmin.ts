import { createClient } from '@supabase/supabase-js';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;


if (!url || !serviceRoleKey) {
throw new Error('Missing SUPABASE env vars on server');
}


export const supabaseAdmin = createClient(url, serviceRoleKey, {
auth: { persistSession: false }
});


export async function writeAudit({ user_id, actor_id, action, resource, metadata }: {
user_id?: string | null;
actor_id?: string | null;
action: string;
resource?: string | null;
metadata?: any;
}) {
return supabaseAdmin.from('audit_logs').insert([{ user_id, actor_id, action, resource, metadata }]);
}