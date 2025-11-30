import { NextRequest, NextResponse } from 'next/server';
import { signupSchema } from '@/lib/validations/auth';
import { signUpWithEmail } from '@/lib/auth/auth-helpers';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        // Validate request body
        const validatedData = signupSchema.parse(body);

        // Create user
        const user = await signUpWithEmail(validatedData);

        return NextResponse.json({
            success: true,
            data: {
                uid: user.uid,
                name: user.name,
                email: user.email,
                role: user.role,
            },
            message: 'Account created successfully',
        }, { status: 201 });

    } catch (error: any) {
        console.error('Signup error:', error);

        // Handle validation errors
        if (error.name === 'ZodError') {
            return NextResponse.json({
                success: false,
                error: 'Validation failed',
                details: error.errors,
            }, { status: 400 });
        }

        // Handle Firebase errors
        if (error.code === 'auth/email-already-in-use') {
            return NextResponse.json({
                success: false,
                error: 'Email already in use',
            }, { status: 409 });
        }

        return NextResponse.json({
            success: false,
            error: error.message || 'Failed to create account',
        }, { status: 500 });
    }
}
