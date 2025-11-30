import { NextRequest, NextResponse } from 'next/server';
import { resetPasswordSchema } from '@/lib/validations/auth';
import { resetPassword } from '@/lib/auth/auth-helpers';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        // Validate request body
        const validatedData = resetPasswordSchema.parse(body);

        // Send password reset email
        await resetPassword(validatedData.email);

        return NextResponse.json({
            success: true,
            message: 'Password reset email sent',
        });

    } catch (error: any) {
        console.error('Password reset error:', error);

        // Handle validation errors
        if (error.name === 'ZodError') {
            return NextResponse.json({
                success: false,
                error: 'Validation failed',
                details: error.errors,
            }, { status: 400 });
        }

        return NextResponse.json({
            success: false,
            error: error.message || 'Failed to send password reset email',
        }, { status: 500 });
    }
}
