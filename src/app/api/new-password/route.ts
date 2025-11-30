import { NextResponse } from 'next/server';
import { confirmPasswordReset } from 'firebase/auth';
import { auth } from '@/lib/firebase';

export async function POST(request: Request) {
    try {
        const { oobCode, newPassword } = await request.json();

        if (!oobCode || !newPassword) {
            return NextResponse.json(
                { success: false, message: 'Code and new password are required' },
                { status: 400 }
            );
        }

        if (newPassword.length < 8) {
            return NextResponse.json(
                { success: false, message: 'Password must be at least 8 characters' },
                { status: 400 }
            );
        }

        await confirmPasswordReset(auth, oobCode, newPassword);

        return NextResponse.json({
            success: true,
            message: 'Password has been successfully updated'
        });

    } catch (error: any) {
        console.error('Confirm password reset error:', error);

        let errorMessage = 'Failed to reset password';

        if (error.code === 'auth/expired-action-code') {
            errorMessage = 'The password reset link has expired. Please request a new one.';
        } else if (error.code === 'auth/invalid-action-code') {
            errorMessage = 'The password reset link is invalid. It may have already been used.';
        } else if (error.code === 'auth/weak-password') {
            errorMessage = 'Password is too weak. Please choose a stronger password.';
        }

        return NextResponse.json(
            { success: false, message: errorMessage },
            { status: 400 }
        );
    }
}
