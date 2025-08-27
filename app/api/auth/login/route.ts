import { NextResponse } from 'next/server';


export async function POST() {
return NextResponse.json({
error: 'Login handled on client via supabase.auth.signInWithPassword',
}, { status: 400 });
}