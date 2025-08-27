import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';


export async function middleware(req: NextRequest) {
const publicPaths = ['/login', '/signup', '/register'];
if (publicPaths.some(p => req.nextUrl.pathname.startsWith(p))) {
return NextResponse.next();
}


const token = req.cookies.get('sb-access-token');
if (!token) {
const url = req.nextUrl.clone();
url.pathname = '/login';
return NextResponse.redirect(url);
}


return NextResponse.next();
}


export const config = {
matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};