import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Protected routes that require authentication
    const protectedRoutes = ['/farmer', '/supplier', '/admin', '/cart', '/checkout'];

    // Check if the current path is protected
    const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));

    if (isProtectedRoute) {
        // In a real implementation, you would check for a valid session cookie here
        // For now, we'll let the client-side auth context handle redirects
        // This is just a placeholder for future server-side auth checks
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};
