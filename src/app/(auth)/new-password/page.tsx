'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Leaf } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { auth } from '@/lib/firebase';

function NewPasswordForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const oobCode = searchParams.get('oobCode');

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const verifyCode = async () => {
            if (!oobCode) {
                setError('Invalid or missing reset code. Please request a new password reset link.');
                return;
            }

            try {
                // Verify the password reset code
                await import('firebase/auth').then(({ verifyPasswordResetCode }) =>
                    verifyPasswordResetCode(auth, oobCode)
                );
            } catch (err: any) {
                console.error('Invalid code:', err);
                setError('The password reset link is invalid or has expired. Please request a new one.');
            }
        };

        verifyCode();
    }, [oobCode]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            setLoading(false);
            return;
        }

        if (password.length < 8) {
            setError('Password must be at least 8 characters');
            setLoading(false);
            return;
        }

        try {
            const response = await fetch('/api/new-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ oobCode, newPassword: password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to reset password');
            }

            router.push('/reset-success');
        } catch (err: any) {
            setError(err.message || 'Failed to reset password');
        } finally {
            setLoading(false);
        }
    };

    if (!oobCode) {
        return (
            <div className="text-center">
                <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm">
                    Invalid or missing reset code.
                </div>
                <Link href="/reset-password" className="text-primary hover:underline">
                    Request a new link
                </Link>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6 bg-background p-8 rounded-lg shadow-sm">
            {error && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm">
                    {error}
                </div>
            )}

            <div className="space-y-2">
                <Label htmlFor="password">New Password</Label>
                <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={loading}
                    minLength={8}
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    disabled={loading}
                    minLength={8}
                />
            </div>

            <Button type="submit" className="w-full h-11 text-base" disabled={loading}>
                {loading ? 'Updating Password...' : 'Reset Password'}
            </Button>
        </form>
    );
}

export default function NewPasswordPage() {
    return (
        <div className="min-h-screen flex items-center justify-center px-4 bg-muted/30">
            <div className="w-full max-w-md">
                <div className="mb-8 text-center">
                    <Link href="/" className="inline-flex items-center gap-2 font-bold text-xl text-primary mb-8">
                        <Leaf className="h-6 w-6 fill-primary" />
                        <span>AgriMarket</span>
                    </Link>
                    <h1 className="text-3xl font-bold text-foreground mb-2 mt-8">Set New Password</h1>
                    <p className="text-muted-foreground">
                        Please enter your new password below
                    </p>
                </div>

                <Suspense fallback={<div>Loading...</div>}>
                    <NewPasswordForm />
                </Suspense>
            </div>
        </div>
    );
}
