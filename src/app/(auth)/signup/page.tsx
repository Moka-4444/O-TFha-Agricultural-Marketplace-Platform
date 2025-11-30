'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Leaf, Chrome, Tractor, Store } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { signUpWithEmail, signInWithGoogle } from '@/lib/auth/auth-helpers';
import { sendOTP } from '@/lib/auth/otp-helpers';
import { useAuth } from '@/lib/hooks';
import { UserRole } from '@/types/firebase';
import { doc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function SignUpPage() {
    const router = useRouter();
    const { user, refreshUser } = useAuth();
    const [role, setRole] = useState<UserRole>('farmer');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Redirect if already logged in
    useEffect(() => {
        if (user) {
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
    }, [user, router]);

    if (user) {
        return null;
    }

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const name = `${firstName} ${lastName}`.trim();
            const userData = await signUpWithEmail({
                name,
                email,
                password,
                role,
            });

            // IMPORTANT: Refresh user data to ensure the profile is loaded in context
            // This fixes the "Profile Not Found" race condition
            await refreshUser();

            // Send OTP
            await sendOTP(userData.uid, email);

            // Redirect to OTP page
            router.push('/otp');
        } catch (err: any) {
            console.error('Signup error:', err);
            if (err.code === 'auth/email-already-in-use') {
                setError('لقد تم التسجيل بهذا الايميل من قبل');
            } else {
                setError(err.message || 'Failed to create account');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignUp = async () => {
        if (!role) {
            setError('Please select your role (Farmer or Supplier)');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const userData = await signInWithGoogle();

            // Update user role in Firestore if it's a new user or role is different
            if (userData && userData.role !== role) {
                const userRef = doc(db, 'users', userData.uid);
                await import('firebase/firestore').then(({ updateDoc }) =>
                    updateDoc(userRef, { role, updatedAt: serverTimestamp() })
                );
            }

            // IMPORTANT: Refresh user data to ensure we have the latest role and profile
            // This fixes the race condition where useAuth might have loaded before the doc was created
            await refreshUser();

            // Redirect logic is handled by the useEffect, but we can also push here for immediate response
            // Google users are verified by default, so we skip OTP
        } catch (err: any) {
            if (err.message !== 'Sign-in cancelled') {
                setError(err.message || 'Failed to sign up with Google');
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
                    <h1 className="text-3xl font-bold text-foreground mb-2">Create Account</h1>
                    <p className="text-muted-foreground">Join our community of farmers and suppliers</p>
                </div>

                {error && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSignUp} className="space-y-6">
                    <div className="space-y-3">
                        <Label>I am a...</Label>
                        <RadioGroup value={role} onValueChange={(value) => setRole(value as UserRole)} className="grid grid-cols-2 gap-4">
                            <div>
                                <RadioGroupItem value="farmer" id="farmer" className="peer sr-only" />
                                <Label
                                    htmlFor="farmer"
                                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                                >
                                    <Tractor className="mb-2 h-6 w-6" />
                                    Farmer
                                </Label>
                            </div>
                            <div>
                                <RadioGroupItem value="supplier" id="supplier" className="peer sr-only" />
                                <Label
                                    htmlFor="supplier"
                                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                                >
                                    <Store className="mb-2 h-6 w-6" />
                                    Supplier
                                </Label>
                            </div>
                        </RadioGroup>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="firstName">First Name</Label>
                            <Input
                                id="firstName"
                                placeholder="John"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                required
                                disabled={loading}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="lastName">Last Name</Label>
                            <Input
                                id="lastName"
                                placeholder="Doe"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                required
                                disabled={loading}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="john@example.com"
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
                            minLength={8}
                        />
                        <p className="text-xs text-muted-foreground">
                            Must be at least 8 characters with uppercase, lowercase, and number
                        </p>
                    </div>

                    <Button type="submit" className="w-full h-11 text-base" disabled={loading}>
                        {loading ? 'Creating account...' : 'Create Account'}
                    </Button>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <Separator />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-background px-2 text-muted-foreground">Or sign up with</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                        <Button
                            variant="outline"
                            type="button"
                            className="h-11"
                            onClick={handleGoogleSignUp}
                            disabled={loading}
                        >
                            <Chrome className="mr-2 h-4 w-4" /> Google
                        </Button>
                    </div>
                </form>

                <div className="mt-8 text-center text-sm">
                    <span className="text-muted-foreground">Already have an account? </span>
                    <Link href="/login" className="text-primary font-medium hover:underline">
                        Sign in
                    </Link>
                </div>
            </div>

            {/* Right Side - Image */}
            <div className="hidden lg:flex flex-col justify-center px-16 py-12 bg-primary text-primary-foreground relative overflow-hidden">
                <div
                    className="absolute inset-0 z-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=2940&auto=format&fit=crop')] bg-cover bg-center"
                />
                <div className="relative z-10 max-w-lg">
                    <h2 className="text-4xl font-bold mb-6">Join the Revolution</h2>
                    <p className="text-lg opacity-90 mb-8 leading-relaxed">
                        Be part of the fastest growing agricultural marketplace. Whether you're buying or selling, we have the tools you need to succeed.
                    </p>
                    <ul className="space-y-4 text-lg">
                        <li className="flex items-center gap-3">
                            <div className="h-2 w-2 rounded-full bg-white" />
                            <span>Access to verified buyers and sellers</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <div className="h-2 w-2 rounded-full bg-white" />
                            <span>Secure payment processing</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <div className="h-2 w-2 rounded-full bg-white" />
                            <span>Real-time market insights</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
