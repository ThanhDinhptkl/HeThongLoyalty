import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// ✅ Public paths: không cần đăng nhập
const publicPaths = [
  "/",
  "/login",
  "/signup",
  "/register",
  "/customer/register",
  "/customer/login",
];

// ✅ Middleware
export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Cho phép public routes
  if (publicPaths.some((p) => pathname.startsWith(p))) {
    return NextResponse.next();
  }

  // Lấy token từ cookie Supabase
  const token = req.cookies.get("sb-access-token");
  if (!token) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // 📌 Parse JWT từ Supabase (giải mã role)
  const userRole = await getUserRole(token.value);
  if (!userRole) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // ✅ Role-based access control
  if (pathname.startsWith("/customer") && userRole !== "customer") {
    return forbidden(req);
  }
  if (pathname.startsWith("/admin") && !["admin", "super-admin"].includes(userRole)) {
    return forbidden(req);
  }
  if (pathname.startsWith("/super-admin") && userRole !== "super-admin") {
    return forbidden(req);
  }

  return NextResponse.next();
}

// ❌ Helper: Trả về 403 nếu không có quyền
function forbidden(req: NextRequest) {
  return NextResponse.json({ error: "Forbidden" }, { status: 403 });
}

// ✅ Helper: Giải mã token để lấy role
async function getUserRole(token: string): Promise<string | null> {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    const payload = JSON.parse(jsonPayload);

    // Giả sử role được lưu trong `user_metadata.role` (Supabase)
    return payload.user_metadata?.role || null;
  } catch (err) {
    console.error("Decode token error:", err);
    return null;
  }
}

// ✅ Config matcher
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
