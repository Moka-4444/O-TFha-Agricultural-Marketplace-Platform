import { NextRequest, NextResponse } from 'next/server';
import { loginSchema } from '@/lib/validations/auth';
import { signInWithEmail } from '@/lib/auth/auth-helpers';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        // Validate request body
        const validatedData = loginSchema.parse(body);

        // Sign in user
        await signInWithEmail(validatedData);

        return NextResponse.json({
            success: true,
            message: 'Signed in successfully',
        });

    } catch (error: any) {
        console.error('Login error:', error);

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
            error: error.message || 'Failed to sign in',
        }, { status: 401 });
    }
}
