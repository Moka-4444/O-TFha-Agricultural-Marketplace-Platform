'use client';

import { Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Loader2, Package, Truck, CheckCircle, XCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { useOrder, useAuth } from '@/lib/hooks';
import Image from 'next/image';

function OrderTrackingContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const { user } = useAuth();
    const orderId = searchParams.get('orderId');

    const { order, loading, error } = useOrder(orderId || '');

    if (!user) {
        router.push('/login?redirect=/order-tracking');
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

    if (error || !order) {
        return (
            <div className="container px-4 md:px-6 py-8">
                <div className="text-center py-12">
                    <p className="text-muted-foreground mb-4">{error || 'Order not found'}</p>
                    <Button onClick={() => router.push('/products')}>Continue Shopping</Button>
                </div>
            </div>
        );
    }

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'delivered':
                return <CheckCircle className="h-6 w-6 text-green-600" />;
            case 'cancelled':
                return <XCircle className="h-6 w-6 text-red-600" />;
            case 'shipped':
                return <Truck className="h-6 w-6 text-blue-600" />;
            default:
                return <Package className="h-6 w-6 text-orange-600" />;
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'delivered':
                return 'bg-green-100 text-green-800';
            case 'cancelled':
                return 'bg-red-100 text-red-800';
            case 'shipped':
                return 'bg-blue-100 text-blue-800';
            case 'processing':
                return 'bg-yellow-100 text-yellow-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="container px-4 md:px-6 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Order Tracking</h1>
                <p className="text-muted-foreground">Order ID: {orderId}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle>Order Status</CardTitle>
                                <Badge className={getStatusColor(order.status)}>
                                    {order.status.toUpperCase()}
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center gap-4 mb-6">
                                {getStatusIcon(order.status)}
                                <div>
                                    <h3 className="font-semibold">
                                        {order.status === 'delivered'
                                            ? 'Order Delivered'
                                            : order.status === 'shipped'
                                                ? 'Order Shipped'
                                                : order.status === 'processing'
                                                    ? 'Order Processing'
                                                    : order.status === 'cancelled'
                                                        ? 'Order Cancelled'
                                                        : 'Order Pending'}
                                    </h3>
                                    <p className="text-sm text-muted-foreground">
                                        {order.createdAt
                                            ? new Date(order.createdAt.seconds * 1000).toLocaleDateString()
                                            : 'N/A'}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Order Items</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {order.items.map((item, index) => (
                                <div key={index} className="flex items-center gap-4">
                                    <div className="relative h-16 w-16 bg-muted rounded-md overflow-hidden">
                                        <Image
                                            src={item.productImage || '/placeholder.png'}
                                            alt={item.productName}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-medium">{item.productName}</h4>
                                        <p className="text-sm text-muted-foreground">
                                            Quantity: {item.quantity} × ${item.price.toFixed(2)}
                                        </p>
                                    </div>
                                    <div className="font-semibold">${(item.price * item.quantity).toFixed(2)}</div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>

                <div className="lg:col-span-1 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Order Summary</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Subtotal</span>
                                <span>${order.subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Shipping</span>
                                <span>{order.shippingFee === 0 ? 'FREE' : `$${order.shippingFee.toFixed(2)}`}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Tax</span>
                                <span>${order.tax.toFixed(2)}</span>
                            </div>
                            <Separator />
                            <div className="flex justify-between font-bold text-lg">
                                <span>Total</span>
                                <span className="text-primary">${order.total.toFixed(2)}</span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Delivery Address</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2 text-sm">
                            <p className="font-medium">{order.deliveryInfo.fullName}</p>
                            <p className="text-muted-foreground">{order.deliveryInfo.address}</p>
                            <p className="text-muted-foreground">
                                {order.deliveryInfo.city}, {order.deliveryInfo.state} {order.deliveryInfo.zipCode}
                            </p>
                            <p className="text-muted-foreground">{order.deliveryInfo.country}</p>
                            <p className="text-muted-foreground">Phone: {order.deliveryInfo.phone}</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default function OrderTrackingPage() {
    return (
        <Suspense
            fallback={
                <div className="container px-4 md:px-6 py-8">
                    <div className="flex items-center justify-center py-12">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                </div>
            }
        >
            <OrderTrackingContent />
        </Suspense>
    );
}
