import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const isAdmin = token?.role === "admin";
    const pathname = req.nextUrl.pathname;

    // Protect finance page - only admins can access
    if (pathname.startsWith("/private/dashboard/finances") && !isAdmin) {
      return NextResponse.redirect(new URL("/private/dashboard", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token, // Requires authentication for all matched routes
    },
  }
);

// Protect all dashboard routes
export const config = {
  matcher: ["/private/dashboard/:path*"],
};
