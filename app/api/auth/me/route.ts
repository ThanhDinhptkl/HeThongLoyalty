import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';


export async function GET(req: Request) {
const token = req.headers.get('authorization')?.replace('Bearer ', '') || '';
if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });


const { data, error } = await supabaseAdmin.auth.getUser(token);
if (error) return NextResponse.json({ error: error.message }, { status: 401 });


const user = data.user;
const { data: profile } = await supabaseAdmin.from('profiles').select('*').eq('id', user.id).single();


return NextResponse.json({ user, profile });
}