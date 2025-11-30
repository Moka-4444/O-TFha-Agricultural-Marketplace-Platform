import { NextResponse } from 'next/server';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '@/lib/firebase';

export async function POST(request: Request) {
    try {
        const { email } = await request.json();

        if (!email) {
            return NextResponse.json(
                { success: false, message: 'Email is required' },
                { status: 400 }
            );
        }

        // Determine the base URL for the redirect
        // In production, this should be your actual domain
        const origin = request.headers.get('origin') || 'http://localhost:3000';
        const continueUrl = `${origin}/new-password`;

        const actionCodeSettings = {
            url: continueUrl,
            handleCodeInApp: true,
        };

        await sendPasswordResetEmail(auth, email, actionCodeSettings);

        return NextResponse.json({
            success: true,
            message: 'Password reset email sent'
        });

    } catch (error: any) {
        console.error('Reset password error:', error);

        // Security: Always return success to prevent email enumeration
        // unless it's a malformed request
        if (error.code === 'auth/invalid-email') {
            return NextResponse.json(
                { success: false, message: 'Invalid email address' },
                { status: 400 }
            );
        }

        // For other errors (like user not found), return success
        return NextResponse.json({
            success: true,
            message: 'Password reset email sent'
        });
    }
}
