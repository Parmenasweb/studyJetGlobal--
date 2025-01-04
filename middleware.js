import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const { nextUrl } = req;

  const isApiAuthRoute = nextUrl.pathname.startsWith('/api/auth');
  const isAuthRoute = nextUrl.pathname.startsWith('/auth');
  const isDashboardRoute = nextUrl.pathname.startsWith('/private/dashboard');
  const isAdminRoute = nextUrl.pathname.startsWith('/private/dashboard/finance');
  const isPublicRoute = nextUrl.pathname === '/' || 
                       nextUrl.pathname.startsWith('/about') || 
                       nextUrl.pathname.startsWith('/contact');

  // Allow public routes and API routes
  if (isPublicRoute || isApiAuthRoute) {
    return null;
  }

  // Redirect authenticated users away from auth pages
  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL('/dashboard', nextUrl));
    }
    return null;
  }

  // Protect dashboard routes
  if (isDashboardRoute || isAdminRoute) {
    if (!isLoggedIn) {
      let callbackUrl = nextUrl.pathname;
      if (nextUrl.search) {
        callbackUrl += nextUrl.search;
      }
      
      const encodedCallbackUrl = encodeURIComponent(callbackUrl);
      return Response.redirect(new URL(`/auth/login?callbackUrl=${encodedCallbackUrl}`, nextUrl));
    }

    // Check for admin role in admin routes
    if (isAdminRoute) {
      const userRole = req.auth?.user?.role;
      if (userRole !== "ADMIN") {
        return Response.redirect(new URL('/dashboard', nextUrl));
      }
    }
    
    return null;
  }

  // Default: allow access
  return null;
});

// Configure protected routes
export const config = {
  matcher: [
    // Protect these routes
    '/private/dashboard/:path*',
    '/admin/:path*',
    
    // Exclude these routes
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
