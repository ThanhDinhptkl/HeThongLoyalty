import { NextResponse } from 'next/server';
import { supabaseAdmin, writeAudit } from '@/lib/supabaseAdmin';


export async function POST(req: Request) {
const { email, password, full_name, phone } = await req.json();
if (!email || !password) return NextResponse.json({ error: 'Missing credentials' }, { status: 400 });


const { data, error } = await supabaseAdmin.auth.admin.createUser({
email,
password,
email_confirm: true
});


if (error) return NextResponse.json({ error: error.message }, { status: 400 });


const userId = data.user?.id;
if (userId) {
await supabaseAdmin.from('profiles').insert([{ id: userId, full_name, phone }]);
await writeAudit({ user_id: userId, action: 'signup', resource: 'auth', metadata: { email } });
}


return NextResponse.json({ user: data.user });
}