

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const publicPaths = ["/", "/login", "/signup", "/customer/login", "/customer/register"];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  console.log("🔵 [MIDDLEWARE] pathname:", pathname);

  // ✅ Public route → cho qua
  if (publicPaths.some((p) => pathname.startsWith(p))) {
    console.log("✅ [MIDDLEWARE] public → cho qua");
    return NextResponse.next();
  }

  // 🚀 Lấy cookie
  let token = req.cookies.get("sb-access-token")?.value;
  let role = req.cookies.get("sb-user-role")?.value;

  console.log("🔑 [MIDDLEWARE] token:", token ? "✅" : "❌", "| role:", role || "❌");

  // Nếu thiếu token/role → thử fetch lại từ API (self-heal)
  if (!token || !role) {
    console.warn("⚠️ [MIDDLEWARE] thiếu token/role → gọi /auth/me để đồng bộ");

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_AUTH_API || "http://localhost:5000"}/auth/me`, {
        headers: {
          cookie: req.headers.get("cookie") || "",
        },
      });

      if (res.ok) {
        const json = await res.json();
        token = json?.session?.access_token;
        role = json?.profile?.role;

        if (token && role) {
          console.log("✅ [MIDDLEWARE] Đã đồng bộ lại token/role =", role);

          // Gắn lại cookie để các lần sau không cần fetch nữa
          const resNext = NextResponse.next();
          resNext.cookies.set("sb-access-token", token, { path: "/", httpOnly: true, sameSite: "lax" });
          resNext.cookies.set("sb-user-role", role, { path: "/", httpOnly: true, sameSite: "lax" });
          return resNext;
        }
      }

      console.error("❌ [MIDDLEWARE] Không lấy được thông tin user từ /auth/me → redirect /login");
      return redirectToLogin(req);
    } catch (err) {
      console.error("❌ [MIDDLEWARE] Lỗi fetch /auth/me:", err);
      return redirectToLogin(req);
    }
  }

  // 🚀 Kiểm tra role-based access
  if (pathname.startsWith("/customer") && role !== "customer") {
    console.warn("🚫 [MIDDLEWARE] forbidden: yêu cầu role customer");
    return forbidden();
  }
  if (pathname.startsWith("/admin") && !["admin", "super-admin"].includes(role)) {
    console.warn("🚫 [MIDDLEWARE] forbidden: yêu cầu role admin/super-admin");
    return forbidden();
  }
  if (pathname.startsWith("/super-admin") && role !== "super-admin") {
    console.warn("🚫 [MIDDLEWARE] forbidden: yêu cầu role super-admin");
    return forbidden();
  }

  console.log("✅ [MIDDLEWARE] Đã xác thực, cho qua");
  return NextResponse.next();
}

function redirectToLogin(req: NextRequest) {
  const url = req.nextUrl.clone();
  url.pathname = "/login";
  console.log("➡️ [MIDDLEWARE] Redirect đến:", url.toString());
  return NextResponse.redirect(url);
}

function forbidden() {
  console.log("❌ [MIDDLEWARE] Trả về 403 Forbidden");
  return NextResponse.json({ error: "Forbidden" }, { status: 403 });
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};

