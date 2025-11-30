'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Leaf, Chrome } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { signInWithEmail, signInWithGoogle } from '@/lib/auth/auth-helpers';
import { useAuth } from '@/lib/hooks';

export default function LoginPage() {
    const router = useRouter();
    const { user, firebaseUser } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Redirect if already logged in
    // Redirect if already logged in
    // Redirect if already logged in
    useEffect(() => {
        if (user && firebaseUser) {
            if (!user.isEmailVerified) {
                router.push('/otp');
            } else if (user.role === 'farmer') {
                router.push('/farmer/overview');
            } else if (user.role === 'supplier') {
                router.push('/supplier/overview');
            } else if (user.role === 'admin') {
                router.push('/admin/users');
            } else {
                router.push('/');
            }
        }
    }, [user, firebaseUser, router]);

    if (user && firebaseUser) {
        return null; // Show nothing while redirecting
    }

    const handleEmailLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await signInWithEmail({ email, password });
            // Auth context will handle redirect based on role
        } catch (err: any) {
            setError(err.message || 'Failed to sign in');
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        setLoading(true);
        setError('');

        try {
            await signInWithGoogle();
            // Auth context will handle redirect based on role
        } catch (err: any) {
            if (err.message !== 'Sign-in cancelled') {
                setError(err.message || 'Failed to sign in with Google');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
            {/* Left Side - Form */}
            <div className="flex flex-col justify-center px-8 md:px-16 lg:px-24 py-12 bg-background">
                <div className="mb-8">
                    <Link href="/" className="flex items-center gap-2 font-bold text-xl text-primary mb-8">
                        <Leaf className="h-6 w-6 fill-primary" />
                        <span>AgriMarket</span>
                    </Link>
                    <h1 className="text-3xl font-bold text-foreground mb-2">Welcome Back</h1>
                    <p className="text-muted-foreground">Sign in to your account to continue</p>
                </div>

                {error && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleEmailLogin} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="your.email@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            disabled={loading}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            disabled={loading}
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <Checkbox id="remember" />
                            <Label htmlFor="remember" className="text-sm font-normal">
                                Remember me
                            </Label>
                        </div>
                        <Link href="/reset-password" className="text-sm text-primary hover:underline">
                            Forgot password?
                        </Link>
                    </div>

                    <Button type="submit" className="w-full h-11 text-base" disabled={loading}>
                        {loading ? 'Signing in...' : 'Sign In'}
                    </Button>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <Separator />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                        <Button
                            type="button"
                            variant="outline"
                            className="h-11"
                            onClick={handleGoogleLogin}
                            disabled={loading}
                        >
                            <Chrome className="mr-2 h-4 w-4" /> Google
                        </Button>
                    </div>
                </form>

                <div className="mt-8 text-center text-sm">
                    <span className="text-muted-foreground">Don't have an account? </span>
                    <Link href="/signup" className="text-primary font-medium hover:underline">
                        Sign up
                    </Link>
                </div>
            </div>

            {/* Right Side - Image */}
            <div className="hidden lg:flex flex-col justify-center px-16 py-12 bg-primary text-primary-foreground relative overflow-hidden">
                <div
                    className="absolute inset-0 z-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2832&auto=format&fit=crop')] bg-cover bg-center"
                />
                <div className="relative z-10 max-w-lg">
                    <h2 className="text-4xl font-bold mb-6">Grow Your Farm Business</h2>
                    <p className="text-lg opacity-90 mb-8 leading-relaxed">
                        Connect with thousands of suppliers and access quality agricultural products at competitive prices.
                    </p>
                    <div className="grid grid-cols-3 gap-8 text-center">
                        <div>
                            <div className="text-3xl font-bold mb-1">5,000+</div>
                            <div className="text-sm opacity-80">Products</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold mb-1">1,200+</div>
                            <div className="text-sm opacity-80">Suppliers</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold mb-1">50K+</div>
                            <div className="text-sm opacity-80">Farmers</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
