'use client';

import Link from 'next/link';
import { Leaf, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ResetSuccessPage() {
    return (
        <div className="min-h-screen flex items-center justify-center px-4 bg-muted/30">
            <div className="w-full max-w-md text-center">
                <div className="mb-8">
                    <Link href="/" className="inline-flex items-center gap-2 font-bold text-xl text-primary mb-8">
                        <Leaf className="h-6 w-6 fill-primary" />
                        <span>AgriMarket</span>
                    </Link>
                </div>

                <div className="bg-background p-8 rounded-lg shadow-sm space-y-6">
                    <div className="flex justify-center">
                        <CheckCircle className="h-16 w-16 text-green-500" />
                    </div>

                    <h1 className="text-2xl font-bold text-foreground">Password Updated!</h1>

                    <p className="text-muted-foreground">
                        Your password has been successfully reset. You can now log in with your new password.
                    </p>

                    <Button asChild className="w-full h-11 text-base">
                        <Link href="/login">
                            Sign In
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}
