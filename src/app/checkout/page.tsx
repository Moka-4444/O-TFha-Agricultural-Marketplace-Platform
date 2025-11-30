'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, CreditCard, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { useCart, useAuth } from '@/lib/hooks';
import { deliveryInfoSchema, type DeliveryInfo } from '@/lib/validations/order';
import { collection, addDoc, serverTimestamp, doc, deleteDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { toast } from 'sonner';

export default function CheckoutPage() {
    const router = useRouter();
    const { user } = useAuth();
    const { cart, subtotal, tax, shippingFee, total } = useCart();
    const [placingOrder, setPlacingOrder] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('card');

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<DeliveryInfo>({
        resolver: zodResolver(deliveryInfoSchema),
        defaultValues: {
            country: 'USA',
        },
    });

    if (!user) {
        router.push('/login?redirect=/checkout');
        return null;
    }

    if (!cart || cart.items.length === 0) {
        router.push('/cart');
        return null;
    }

    const onSubmit = async (deliveryInfo: DeliveryInfo) => {
        setPlacingOrder(true);

        try {
            const orderData = {
                userId: user.uid,
                userName: user.name,
                userEmail: user.email,
                items: cart.items.map((item) => ({
                    productId: item.productId,
                    productName: item.productName,
                    productImage: item.productImage,
                    price: item.price,
                    quantity: item.quantity,
                    supplierId: item.supplierId,
                    supplierName: '',
                })),
                status: 'pending' as const,
                total,
                subtotal,
                tax,
                shippingFee,
                deliveryInfo,
                paymentInfo: {
                    method: paymentMethod,
                    status: 'pending' as const,
                },
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp(),
            };

            const orderRef = await addDoc(collection(db, 'orders'), orderData);
            await deleteDoc(doc(db, 'carts', user.uid));

            toast.success('Order placed successfully!');
            router.push(`/order-tracking?orderId=${orderRef.id}`);
        } catch (error: any) {
            console.error('Error placing order:', error);
            toast.error(error.message || 'Failed to place order');
        } finally {
            setPlacingOrder(false);
        }
    };

    return (
        <div className="container px-4 md:px-6 py-8">
            <h1 className="text-3xl font-bold mb-8">Checkout</h1>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Truck className="h-5 w-5" />
                                    Delivery Information
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="fullName">Full Name *</Label>
                                        <Input id="fullName" {...register('fullName')} />
                                        {errors.fullName && (
                                            <p className="text-sm text-red-600 mt-1">{errors.fullName.message}</p>
                                        )}
                                    </div>
                                    <div>
                                        <Label htmlFor="phone">Phone *</Label>
                                        <Input id="phone" {...register('phone')} />
                                        {errors.phone && <p className="text-sm text-red-600 mt-1">{errors.phone.message}</p>}
                                    </div>
                                </div>

                                <div>
                                    <Label htmlFor="address">Address *</Label>
                                    <Input id="address" {...register('address')} />
                                    {errors.address && <p className="text-sm text-red-600 mt-1">{errors.address.message}</p>}
                                </div>

                                <div className="grid grid-cols-3 gap-4">
                                    <div>
                                        <Label htmlFor="city">City *</Label>
                                        <Input id="city" {...register('city')} />
                                        {errors.city && <p className="text-sm text-red-600 mt-1">{errors.city.message}</p>}
                                    </div>
                                    <div>
                                        <Label htmlFor="state">State *</Label>
                                        <Input id="state" {...register('state')} />
                                        {errors.state && <p className="text-sm text-red-600 mt-1">{errors.state.message}</p>}
                                    </div>
                                    <div>
                                        <Label htmlFor="zipCode">ZIP Code *</Label>
                                        <Input id="zipCode" {...register('zipCode')} />
                                        {errors.zipCode && <p className="text-sm text-red-600 mt-1">{errors.zipCode.message}</p>}
                                    </div>
                                </div>

                                <div>
                                    <Label htmlFor="country">Country *</Label>
                                    <Input id="country" {...register('country')} />
                                    {errors.country && <p className="text-sm text-red-600 mt-1">{errors.country.message}</p>}
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <CreditCard className="h-5 w-5" />
                                    Payment Method
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                                    <div className="flex items-center space-x-2 border p-4 rounded-md">
                                        <RadioGroupItem value="card" id="card" />
                                        <Label htmlFor="card" className="flex-1 cursor-pointer">
                                            Credit/Debit Card
                                        </Label>
                                    </div>
                                    <div className="flex items-center space-x-2 border p-4 rounded-md">
                                        <RadioGroupItem value="cod" id="cod" />
                                        <Label htmlFor="cod" className="flex-1 cursor-pointer">
                                            Cash on Delivery
                                        </Label>
                                    </div>
                                </RadioGroup>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="lg:col-span-1">
                        <Card>
                            <CardHeader>
                                <CardTitle>Order Summary</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    {cart.items.map((item) => (
                                        <div key={item.productId} className="flex justify-between text-sm">
                                            <span className="text-muted-foreground">
                                                {item.productName} x{item.quantity}
                                            </span>
                                            <span>${(item.price * item.quantity).toFixed(2)}</span>
                                        </div>
                                    ))}
                                </div>

                                <Separator />

                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Subtotal</span>
                                    <span>${subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Shipping</span>
                                    <span>{shippingFee === 0 ? 'FREE' : `$${shippingFee.toFixed(2)}`}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Tax</span>
                                    <span>${tax.toFixed(2)}</span>
                                </div>

                                <Separator />

                                <div className="flex justify-between font-bold text-lg">
                                    <span>Total</span>
                                    <span className="text-primary">${total.toFixed(2)}</span>
                                </div>

                                <Button type="submit" className="w-full h-11" disabled={placingOrder}>
                                    {placingOrder ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Placing Order...
                                        </>
                                    ) : (
                                        'Place Order'
                                    )}
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </form>
        </div>
    );
}
