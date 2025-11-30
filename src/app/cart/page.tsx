'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Trash2, Minus, Plus, ArrowRight, Loader2, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useCart, useAuth } from '@/lib/hooks';
import { useRouter } from 'next/navigation';

export default function CartPage() {
    const router = useRouter();
    const { user } = useAuth();
    const { cart, loading, updateQuantity, removeItem, clearCart, subtotal, tax, shippingFee, total, itemCount } = useCart();

    // Redirect to login if not authenticated
    if (!user && !loading) {
        router.push('/login?redirect=/cart');
        return null;
    }

    if (loading) {
        return (
            <div className="container px-4 md:px-6 py-8">
                <div className="flex items-center justify-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
            </div>
        );
    }

    const isEmpty = !cart || cart.items.length === 0;

    if (isEmpty) {
        return (
            <div className="container px-4 md:px-6 py-8">
                <div className="text-center py-12">
                    <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                    <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
                    <p className="text-muted-foreground mb-6">Add some products to get started</p>
                    <Button asChild>
                        <Link href="/products">Browse Products</Link>
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="container px-4 md:px-6 py-8">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold">Shopping Cart ({itemCount} {itemCount === 1 ? 'item' : 'items'})</h1>
                <Button variant="outline" onClick={clearCart} size="sm">
                    Clear Cart
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Cart Items */}
                <div className="lg:col-span-2 space-y-4">
                    {cart.items.map((item) => (
                        <Card key={item.productId} className="flex flex-col sm:flex-row p-4 gap-4">
                            <Link href={`/products/${item.productId}`} className="relative h-24 w-24 flex-shrink-0 bg-muted rounded-md overflow-hidden">
                                <Image
                                    src={item.productImage || '/placeholder.png'}
                                    alt={item.productName}
                                    fill
                                    className="object-cover"
                                />
                            </Link>
                            <div className="flex-1 flex flex-col justify-between">
                                <div>
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <Link href={`/products/${item.productId}`}>
                                                <h3 className="font-semibold text-lg hover:text-primary">{item.productName}</h3>
                                            </Link>
                                            <p className="text-sm text-muted-foreground">${item.price.toFixed(2)} each</p>
                                        </div>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="text-muted-foreground hover:text-destructive"
                                            onClick={() => removeItem(item.productId)}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between mt-4">
                                    <div className="flex items-center border rounded-md">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8 rounded-none"
                                            onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                                            disabled={item.quantity <= 1}
                                        >
                                            <Minus className="h-3 w-3" />
                                        </Button>
                                        <div className="w-8 text-center text-sm font-medium">{item.quantity}</div>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8 rounded-none"
                                            onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                                        >
                                            <Plus className="h-3 w-3" />
                                        </Button>
                                    </div>
                                    <div className="font-bold text-lg">${(item.price * item.quantity).toFixed(2)}</div>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-1">
                    <Card>
                        <CardHeader>
                            <CardTitle>Order Summary</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Subtotal</span>
                                <span>${subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Shipping</span>
                                <span>{shippingFee === 0 ? 'FREE' : `$${shippingFee.toFixed(2)}`}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Tax (10%)</span>
                                <span>${tax.toFixed(2)}</span>
                            </div>
                            <Separator />
                            <div className="flex justify-between font-bold text-lg">
                                <span>Total</span>
                                <span className="text-primary">${total.toFixed(2)}</span>
                            </div>

                            {subtotal < 50 && (
                                <div className="text-xs text-muted-foreground bg-muted/50 p-2 rounded">
                                    Add ${(50 - subtotal).toFixed(2)} more for free shipping!
                                </div>
                            )}
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full h-11 text-base gap-2" asChild>
                                <Link href="/checkout">
                                    Proceed to Checkout <ArrowRight className="h-4 w-4" />
                                </Link>
                            </Button>
                        </CardFooter>
                    </Card>

                    <div className="mt-4">
                        <Button variant="outline" className="w-full" asChild>
                            <Link href="/products">Continue Shopping</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
