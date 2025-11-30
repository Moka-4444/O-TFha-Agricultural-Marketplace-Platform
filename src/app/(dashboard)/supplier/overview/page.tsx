'use client';

import { useRouter } from 'next/navigation';
import { Package, DollarSign, TrendingUp, ShoppingBag, Loader2, Plus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth, useProducts } from '@/lib/hooks';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useEffect, useState } from 'react';

export default function SupplierOverviewPage() {
    const router = useRouter();
    const { user, loading: authLoading } = useAuth();
    const { products, loading: productsLoading } = useProducts({ supplierId: user?.uid });

    const [orders, setOrders] = useState<any[]>([]);
    const [ordersLoading, setOrdersLoading] = useState(true);

    useEffect(() => {
        const fetchSupplierOrders = async () => {
            if (!user) return;

            try {
                // Fetch all orders
                const ordersRef = collection(db, 'orders');
                const ordersSnapshot = await getDocs(ordersRef);

                // Filter orders that contain this supplier's products
                const supplierOrders = ordersSnapshot.docs
                    .map(doc => ({ id: doc.id, ...doc.data() }))
                    .filter((order: any) =>
                        order.items?.some((item: any) => item.supplierId === user.uid)
                    );

                setOrders(supplierOrders);
            } catch (error) {
                console.error('Error fetching orders:', error);
            } finally {
                setOrdersLoading(false);
            }
        };

        if (user) {
            fetchSupplierOrders();
        }
    }, [user]);

    if (authLoading || productsLoading || ordersLoading) {
        return (
            <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    if (!user || user.role !== 'supplier') {
        router.push('/login');
        return null;
    }

    const totalProducts = products.length;
    const activeProducts = products.filter(p => p.stock > 0).length;
    const totalRevenue = orders.reduce((sum, order) => {
        const supplierItems = order.items.filter((item: any) => item.supplierId === user.uid);
        return sum + supplierItems.reduce((itemSum: number, item: any) => itemSum + (item.price * item.quantity), 0);
    }, 0);
    const totalOrders = orders.length;

    const topProducts = products
        .sort((a, b) => (b.reviewCount || 0) - (a.reviewCount || 0))
        .slice(0, 5);

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Supplier Dashboard</h1>
                    <p className="text-muted-foreground">Welcome back, {user.name}!</p>
                </div>
                <Button onClick={() => router.push('/supplier/products/new')}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Product
                </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Products</CardTitle>
                        <Package className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalProducts}</div>
                        <p className="text-xs text-muted-foreground">{activeProducts} in stock</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">${totalRevenue.toFixed(2)}</div>
                        <p className="text-xs text-muted-foreground">All time</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Orders</CardTitle>
                        <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalOrders}</div>
                        <p className="text-xs text-muted-foreground">Containing your products</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Avg Rating</CardTitle>
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {products.length > 0
                                ? (products.reduce((sum, p) => sum + p.rating, 0) / products.length).toFixed(1)
                                : '0.0'}
                        </div>
                        <p className="text-xs text-muted-foreground">Across all products</p>
                    </CardContent>
                </Card>
            </div>

            {/* Top Products */}
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle>Top Products</CardTitle>
                        <Button variant="outline" size="sm" onClick={() => router.push('/supplier/products')}>
                            View All
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    {topProducts.length === 0 ? (
                        <div className="text-center py-8 text-muted-foreground">
                            <p>No products yet</p>
                            <Button className="mt-4" onClick={() => router.push('/supplier/products/new')}>
                                Add Your First Product
                            </Button>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {topProducts.map((product) => (
                                <div
                                    key={product.id}
                                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50"
                                >
                                    <div className="flex-1">
                                        <p className="font-medium">{product.name}</p>
                                        <p className="text-sm text-muted-foreground">
                                            ${product.price.toFixed(2)} • {product.stock} in stock
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="text-right">
                                            <p className="text-sm font-medium">⭐ {product.rating.toFixed(1)}</p>
                                            <p className="text-xs text-muted-foreground">{product.reviewCount} reviews</p>
                                        </div>
                                        <Badge variant={product.stock > 0 ? 'default' : 'secondary'}>
                                            {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                                        </Badge>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Recent Orders */}
            <Card>
                <CardHeader>
                    <CardTitle>Recent Orders</CardTitle>
                </CardHeader>
                <CardContent>
                    {orders.length === 0 ? (
                        <div className="text-center py-8 text-muted-foreground">
                            <p>No orders yet</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {orders.slice(0, 5).map((order) => {
                                const supplierItems = order.items.filter((item: any) => item.supplierId === user.uid);
                                const orderTotal = supplierItems.reduce(
                                    (sum: number, item: any) => sum + item.price * item.quantity,
                                    0
                                );

                                return (
                                    <div
                                        key={order.id}
                                        className="flex items-center justify-between p-4 border rounded-lg"
                                    >
                                        <div className="flex-1">
                                            <p className="font-medium">Order #{order.id.substring(0, 8)}</p>
                                            <p className="text-sm text-muted-foreground">
                                                {supplierItems.length} item{supplierItems.length !== 1 ? 's' : ''} • $
                                                {orderTotal.toFixed(2)}
                                            </p>
                                        </div>
                                        <Badge>{order.status}</Badge>
                                    </div>
                                );
                            })}
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
                    <Button onClick={() => router.push('/supplier/products/new')} className="h-20">
                        Add New Product
                    </Button>
                    <Button onClick={() => router.push('/supplier/products')} variant="outline" className="h-20">
                        Manage Products
                    </Button>
                    <Button onClick={() => router.push('/supplier/orders')} variant="outline" className="h-20">
                        View Orders
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
