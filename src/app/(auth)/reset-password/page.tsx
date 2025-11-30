'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Leaf } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function ResetPasswordPage() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess(false);

        try {
            const response = await fetch('/api/reset-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to send reset email');
            }

            setSuccess(true);
        } catch (err: any) {
            setError(err.message || 'Failed to send reset email');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 bg-muted/30">
            <div className="w-full max-w-md">
                <div className="mb-8 text-center">
                    <Link href="/" className="inline-flex items-center gap-2 font-bold text-xl text-primary mb-8">
                        <Leaf className="h-6 w-6 fill-primary" />
                        <span>AgriMarket</span>
                    </Link>
                    <h1 className="text-3xl font-bold text-foreground mb-2 mt-8">Reset Password</h1>
                    <p className="text-muted-foreground">
                        Enter your email address and we'll send you a link to reset your password
                    </p>
                </div>

                {error && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded-md text-sm">
                        Password reset email sent! Check your inbox for instructions.
                    </div>
                )}

                <form onSubmit={handleResetPassword} className="space-y-6 bg-background p-8 rounded-lg shadow-sm">
                    <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="your.email@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            disabled={loading || success}
                        />
                    </div>

                    <Button type="submit" className="w-full h-11 text-base" disabled={loading || success}>
                        {loading ? 'Sending...' : success ? 'Email Sent' : 'Send Reset Link'}
                    </Button>

                    <div className="text-center text-sm">
                        <Link href="/login" className="text-primary font-medium hover:underline">
                            Back to login
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
