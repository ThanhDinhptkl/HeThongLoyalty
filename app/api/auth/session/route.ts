import { NextResponse } from 'next/server';


export async function POST(req: Request) {
const { accessToken } = await req.json();
if (!accessToken) return NextResponse.json({ error: 'no token' }, { status: 400 });


const res = NextResponse.json({ ok: true });
res.cookies.set({
name: 'sb-access-token',
value: accessToken,
httpOnly: true,
path: '/',
maxAge: 60 * 60 * 24 * 7,
});
return res;
}