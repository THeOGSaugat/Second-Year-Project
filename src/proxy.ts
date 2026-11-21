import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { getDashboardPath } from "@/lib/roles";

// Which role may open which part of the site
const PROTECTED_AREAS = [
  { path: "/admin", role: "ADMIN" },
  { path: "/trainer", role: "TRAINER" },
  { path: "/member", role: "MEMBER" },
] as const;

// Route protection – FIRST layer.
// Runs before a matching page is rendered and reads the session cookie.
// (Every protected page also checks the role again on the server – SECOND layer.)
export default auth((request) => {
  const { pathname } = request.nextUrl;
  const user = request.auth?.user;

  // Logged-in users do not need the login page – send them to their dashboard
  if (pathname === "/login") {
    if (user) {
      return NextResponse.redirect(new URL(getDashboardPath(user.role), request.url));
    }
    return NextResponse.next();
  }

  // Not logged in -> go to the login page
  if (!user) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Logged in, but trying to open another role's area -> go to own dashboard
  const area = PROTECTED_AREAS.find((item) => pathname.startsWith(item.path));
  if (area && area.role !== user.role) {
    return NextResponse.redirect(new URL(getDashboardPath(user.role), request.url));
  }

  return NextResponse.next();
});

// The proxy only runs on these paths (the homepage stays public)
export const config = {
  matcher: ["/login", "/dashboard", "/admin/:path*", "/trainer/:path*", "/member/:path*"],
};
