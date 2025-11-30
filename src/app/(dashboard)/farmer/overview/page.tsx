'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Package, DollarSign, ShoppingCart, TrendingUp, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth, useOrders } from '@/lib/hooks';

export default function FarmerOverviewPage() {
    const router = useRouter();
    const { user, loading: authLoading } = useAuth();
    const { orders, loading: ordersLoading } = useOrders();

    useEffect(() => {
        if (!authLoading && (!user || user.role !== 'farmer')) {
            router.push('/login');
        }
    }, [user, authLoading, router]);

    if (authLoading || ordersLoading) {
        return (
            <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    if (!user || user.role !== 'farmer') {
        return null;
    }

    const totalOrders = orders.length;
    const totalSpent = orders.reduce((sum, order) => sum + order.total, 0);
    const pendingOrders = orders.filter((o) => o.status === 'pending').length;
    const completedOrders = orders.filter((o) => o.status === 'delivered').length;

    const recentOrders = orders.slice(0, 5);

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
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold">Welcome back, {user.name}!</h1>
                <p className="text-muted-foreground">Here's what's happening with your farm today.</p>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                        <Package className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalOrders}</div>
                        <p className="text-xs text-muted-foreground">All time</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">${totalSpent.toFixed(2)}</div>
                        <p className="text-xs text-muted-foreground">All purchases</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
                        <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{pendingOrders}</div>
                        <p className="text-xs text-muted-foreground">Awaiting processing</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Completed</CardTitle>
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{completedOrders}</div>
                        <p className="text-xs text-muted-foreground">Delivered orders</p>
                    </CardContent>
                </Card>
            </div>

            {/* Recent Orders */}
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle>Recent Orders</CardTitle>
                        <Button variant="outline" size="sm" onClick={() => router.push('/orders')}>
                            View All
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    {recentOrders.length === 0 ? (
                        <div className="text-center py-8 text-muted-foreground">
                            <p>No orders yet</p>
                            <Button className="mt-4" onClick={() => router.push('/products')}>
                                Start Shopping
                            </Button>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {recentOrders.map((order) => (
                                <div
                                    key={order.id}
                                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 cursor-pointer"
                                    onClick={() => router.push(`/order-tracking?orderId=${order.id}`)}
                                >
                                    <div className="flex-1">
                                        <p className="font-medium">Order #{order.id.substring(0, 8)}</p>
                                        <p className="text-sm text-muted-foreground">
                                            {order.items.length} item{order.items.length !== 1 ? 's' : ''} • $
                                            {order.total.toFixed(2)}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                                        <p className="text-sm text-muted-foreground">
                                            {order.createdAt
                                                ? new Date(order.createdAt.seconds * 1000).toLocaleDateString()
                                                : 'N/A'}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
                <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4 md:grid-cols-3">
                    <Button onClick={() => router.push('/products')} className="h-20">
                        Browse Products
                    </Button>
                    <Button onClick={() => router.push('/cart')} variant="outline" className="h-20">
                        View Cart
                    </Button>
                    <Button onClick={() => router.push('/orders')} variant="outline" className="h-20">
                        Order History
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
