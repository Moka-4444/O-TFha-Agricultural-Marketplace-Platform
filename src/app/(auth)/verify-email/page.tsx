'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Mail, CheckCircle, RefreshCw, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/hooks';
import { sendVerificationEmail } from '@/lib/auth/auth-helpers';
import { toast } from 'sonner';

export default function VerifyEmailPage() {
    const router = useRouter();
    const { user, firebaseUser, refreshUser } = useAuth();
    const [sending, setSending] = useState(false);
    const [countdown, setCountdown] = useState(0);

    useEffect(() => {
        if (!firebaseUser) {
            router.push('/login');
        } else if (firebaseUser.emailVerified) {
            // Redirect based on role if already verified
            if (user?.role === 'farmer') router.push('/farmer/overview');
            else if (user?.role === 'supplier') router.push('/supplier/overview');
            else if (user?.role === 'admin') router.push('/admin/users');
            else router.push('/');
        }
    }, [firebaseUser, user, router]);

    useEffect(() => {
        if (countdown > 0) {
            const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [countdown]);

    const handleResendEmail = async () => {
        if (countdown > 0) return;

        setSending(true);
        try {
            await sendVerificationEmail();
            toast.success('Verification email sent! Please check your inbox.');
            setCountdown(60); // 60 seconds cooldown
        } catch (error: any) {
            toast.error(error.message || 'Failed to send verification email');
        } finally {
            setSending(false);
        }
    };

    const handleCheckVerification = async () => {
        if (firebaseUser) {
            await firebaseUser.reload();
            if (firebaseUser.emailVerified) {
                toast.success('Email verified successfully!');
                window.location.reload(); // Reload to trigger auth state change and redirect
            } else {
                toast.error('Email not verified yet. Please check your inbox and click the link.');
            }
        }
    };

    if (!firebaseUser) return null;

    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 bg-muted/30">
            <div className="w-full max-w-md bg-background rounded-xl shadow-lg border p-8 text-center">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                    <Mail className="h-8 w-8 text-primary" />
                </div>

                <h1 className="text-2xl font-bold mb-2">Verify your email</h1>
                <p className="text-muted-foreground mb-6">
                    We've sent a verification link to <span className="font-medium text-foreground">{firebaseUser.email}</span>.
                    Please check your inbox and click the link to verify your account.
                </p>

                <div className="space-y-4">
                    <Button
                        onClick={handleCheckVerification}
                        className="w-full"
                    >
                        <CheckCircle className="mr-2 h-4 w-4" />
                        I've Verified My Email
                    </Button>

                    <Button
                        variant="outline"
                        onClick={handleResendEmail}
                        disabled={sending || countdown > 0}
                        className="w-full"
                    >
                        {sending ? (
                            <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                            <RefreshCw className="mr-2 h-4 w-4" />
                        )}
                        {countdown > 0 ? `Resend in ${countdown}s` : 'Resend Verification Email'}
                    </Button>

                    <div className="pt-4 border-t mt-6">
                        <Link href="/login" className="text-sm text-muted-foreground hover:text-primary flex items-center justify-center gap-1">
                            Back to Sign In <ArrowRight className="h-3 w-3" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
