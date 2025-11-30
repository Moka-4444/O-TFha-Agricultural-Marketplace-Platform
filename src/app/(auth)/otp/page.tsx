'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Leaf, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/lib/hooks';
import { sendOTP, verifyOTP } from '@/lib/auth/otp-helpers';
import { toast } from 'sonner';

export default function OTPPage() {
    const router = useRouter();
    const { user, firebaseUser, refreshUser, loading: authLoading } = useAuth();
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [verifying, setVerifying] = useState(false);
    const [sending, setSending] = useState(false);
    const [countdown, setCountdown] = useState(0);
    const [demoCode, setDemoCode] = useState<string | null>(null);

    // Retry fetching profile if missing
    const [retryCount, setRetryCount] = useState(0);
    const maxRetries = 5;

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (firebaseUser && !user && retryCount < maxRetries) {
            interval = setInterval(async () => {
                await refreshUser();
                setRetryCount(prev => prev + 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [firebaseUser, user, retryCount, refreshUser]);

    // Redirect if not logged in or already verified
    useEffect(() => {
        if (authLoading) return;

        if (!firebaseUser) {
            router.push('/login');
        } else if (user?.isEmailVerified) {
            if (user.role === 'farmer') router.push('/farmer/overview');
            else if (user.role === 'supplier') router.push('/supplier/overview');
            else if (user.role === 'admin') router.push('/admin/users');
            else router.push('/');
        }
    }, [firebaseUser, user, authLoading, router]);

    // Countdown timer
    useEffect(() => {
        if (countdown > 0) {
            const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [countdown]);

    // Send OTP on initial load if not verified
    useEffect(() => {
        const initOTP = async () => {
            if (firebaseUser && user && !user.isEmailVerified && countdown === 0) {
                // We won't auto-send to avoid confusion, let them click resend to see the code
            }
        };
    }, [firebaseUser, user]);

    const handleChange = (index: number, value: string) => {
        if (value.length > 1) value = value[0];
        if (!/^\d*$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Auto-focus next input
        if (value && index < 5) {
            const nextInput = document.getElementById(`otp-${index + 1}`);
            if (nextInput) nextInput.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            const prevInput = document.getElementById(`otp-${index - 1}`);
            if (prevInput) prevInput.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text').slice(0, 6);
        if (!/^\d+$/.test(pastedData)) return;

        const newOtp = [...otp];
        pastedData.split('').forEach((char, index) => {
            if (index < 6) newOtp[index] = char;
        });
        setOtp(newOtp);
    };

    const handleVerify = async (e: React.FormEvent) => {
        e.preventDefault();
        const code = otp.join('');
        if (code.length !== 6) {
            toast.error('Please enter the full 6-digit code');
            return;
        }

        setVerifying(true);
        try {
            if (!firebaseUser) throw new Error('User not found');

            const result = await verifyOTP(firebaseUser.uid, code);

            if (result.success) {
                toast.success(result.message);
                await refreshUser(); // Refresh user data to get updated isEmailVerified status
                // Redirect handled by useEffect
            } else {
                toast.error(result.message);
            }
        } catch (error: any) {
            toast.error(error.message || 'Verification failed');
        } finally {
            setVerifying(false);
        }
    };

    const handleResendCode = async () => {
        if (!firebaseUser || countdown > 0) return;

        setSending(true);
        try {
            const code = await sendOTP(firebaseUser.uid, firebaseUser.email!);
            setDemoCode(code); // Show code on screen for demo
            toast.success(`Code sent!`);
            setCountdown(60);
        } catch (error: any) {
            toast.error(error.message || 'Failed to send code');
        } finally {
            setSending(false);
        }
    };

    // Show loading state while checking auth or retrying profile
    if (authLoading || (firebaseUser && !user && retryCount < maxRetries)) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-muted/30">
                <div className="flex flex-col items-center gap-4">
                    <RefreshCw className="h-8 w-8 animate-spin text-primary" />
                    <p className="text-muted-foreground">
                        {authLoading ? 'Loading verification...' : 'Setting up your profile...'}
                    </p>
                </div>
            </div>
        );
    }

    // If authenticated but no user profile found (broken state) after retries
    if (!user && firebaseUser) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-muted/30">
                <div className="flex flex-col items-center gap-4 p-6 bg-white rounded-lg shadow-md max-w-md text-center">
                    <div className="text-red-500 font-bold text-xl">Profile Not Found</div>
                    <p className="text-muted-foreground">
                        Your account was created but the user profile is missing. This might have happened due to a connection error during signup.
                    </p>
                    <Button
                        variant="outline"
                        onClick={async () => {
                            await import('@/lib/firebase').then(m => m.auth.signOut());
                            window.location.href = '/login';
                        }}
                    >
                        Sign Out & Try Again
                    </Button>
                </div>
            </div>
        );
    }

    // If not authenticated (will redirect via useEffect, but show nothing/spinner meanwhile)
    if (!user) {
        return null; // or spinner
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center space-y-2">
                    <div className="flex justify-center mb-4">
                        <div className="flex items-center gap-2 font-bold text-xl text-primary">
                            <Leaf className="h-6 w-6 fill-primary" />
                            <span>AgriMarket</span>
                        </div>
                    </div>
                    <CardTitle className="text-2xl">Verify your email</CardTitle>
                    <CardDescription>
                        We've sent a 6-digit code to <span className="font-medium text-foreground">{user.email}</span>.
                        Please enter it below to verify your account.
                    </CardDescription>

                    {demoCode && (
                        <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-md text-center">
                            <p className="text-sm text-yellow-800 mb-1 font-medium">Demo Mode: Your Code is</p>
                            <p className="text-2xl font-bold text-yellow-900 tracking-widest">{demoCode}</p>
                        </div>
                    )}
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleVerify} className="space-y-6">
                        <div className="flex justify-center gap-2">
                            {otp.map((digit, i) => (
                                <Input
                                    key={i}
                                    id={`otp-${i}`}
                                    type="text"
                                    inputMode="numeric"
                                    className="w-12 h-12 text-center text-lg font-bold"
                                    maxLength={1}
                                    value={digit}
                                    onChange={(e) => handleChange(i, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(i, e)}
                                    onPaste={handlePaste}
                                    disabled={verifying}
                                />
                            ))}
                        </div>
                        <Button type="submit" className="w-full h-11" disabled={verifying}>
                            {verifying ? 'Verifying...' : 'Verify Email'}
                        </Button>
                    </form>
                </CardContent>
                <CardFooter className="flex flex-col gap-4 text-center text-sm">
                    <div className="text-muted-foreground">
                        Didn't receive the code?{' '}
                        <Button
                            variant="link"
                            className="p-0 h-auto font-normal text-primary"
                            onClick={handleResendCode}
                            disabled={sending || countdown > 0}
                        >
                            {sending ? (
                                <span className="flex items-center gap-1"><RefreshCw className="h-3 w-3 animate-spin" /> Sending...</span>
                            ) : countdown > 0 ? (
                                `Resend in ${countdown}s`
                            ) : (
                                'Resend Code'
                            )}
                        </Button>
                    </div>
                    <Button
                        variant="ghost"
                        className="text-muted-foreground hover:text-foreground"
                        onClick={async () => {
                            await import('@/lib/firebase').then(m => m.auth.signOut());
                            window.location.href = '/login';
                        }}
                    >
                        Sign Out & Use Another Account
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}
