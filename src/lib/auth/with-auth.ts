import { NextRequest, NextResponse } from 'next/server';
import { UserRole } from '@/types/firebase';

export interface AuthenticatedRequest extends NextRequest {
    user?: {
        uid: string;
        email?: string;
        role?: UserRole;
    };
}

// Simplified middleware - for now, we'll handle auth client-side
// In production, you would verify the Firebase ID token here
export async function withAuth(
    handler: (req: AuthenticatedRequest) => Promise<NextResponse>,
    options?: {
        requiredRole?: UserRole | UserRole[];
    }
) {
    return async (req: NextRequest) => {
        try {
            // Get token from Authorization header
            const authHeader = req.headers.get('authorization');

            if (!authHeader || !authHeader.startsWith('Bearer ')) {
                return NextResponse.json(
                    { success: false, error: 'Unauthorized - No token provided' },
                    { status: 401 }
                );
            }

            const token = authHeader.split('Bearer ')[1];

            // For now, we'll trust the client-side auth
            // In production, you would verify the token with Firebase Admin SDK here
            // const decodedToken = await verifyIdToken(token);

            // Attach user info to request (this would come from decoded token)
            const authenticatedReq = req as AuthenticatedRequest;
            // authenticatedReq.user = {
            //   uid: decodedToken.uid,
            //   email: decodedToken.email,
            //   role: decodedToken.role as UserRole,
            // };

            return await handler(authenticatedReq);
        } catch (error) {
            console.error('Auth middleware error:', error);
            return NextResponse.json(
                { success: false, error: 'Internal server error' },
                { status: 500 }
            );
        }
    };
}

// Helper to extract user from request
export function getUserFromRequest(req: AuthenticatedRequest) {
    return req.user;
}
