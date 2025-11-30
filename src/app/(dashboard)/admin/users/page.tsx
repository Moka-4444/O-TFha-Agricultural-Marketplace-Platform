'use client';

import { useRouter } from 'next/navigation';
import { Users, Package, ShoppingBag, TrendingUp, Loader2, UserCheck, UserX } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/lib/hooks';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useEffect, useState } from 'react';

export default function AdminUsersPage() {
    const router = useRouter();
    const { user, loading: authLoading } = useAuth();

    const [users, setUsers] = useState<any[]>([]);
    const [products, setProducts] = useState<any[]>([]);
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            if (!user) return;

            try {
                // Fetch users
                const usersSnapshot = await getDocs(collection(db, 'users'));
                const usersData = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setUsers(usersData);

                // Fetch products
                const productsSnapshot = await getDocs(query(collection(db, 'products'), limit(10)));
                const productsData = productsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setProducts(productsData);

                // Fetch orders
                const ordersSnapshot = await getDocs(query(collection(db, 'orders'), orderBy('createdAt', 'desc'), limit(10)));
                const ordersData = ordersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setOrders(ordersData);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        if (user) {
            fetchData();
        }
    }, [user]);

    if (authLoading || loading) {
        return (
            <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    if (!user || user.role !== 'admin') {
        router.push('/login');
        return null;
    }

    const totalUsers = users.length;
    const farmers = users.filter(u => u.role === 'farmer').length;
    const suppliers = users.filter(u => u.role === 'supplier').length;
    const totalRevenue = orders.reduce((sum, order) => sum + (order.total || 0), 0);

    const getRoleBadgeColor = (role: string) => {
        switch (role) {
            case 'admin':
                return 'bg-purple-100 text-purple-800';
            case 'supplier':
                return 'bg-blue-100 text-blue-800';
            case 'farmer':
                return 'bg-green-100 text-green-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                <p className="text-muted-foreground">System overview and user management</p>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalUsers}</div>
                        <p className="text-xs text-muted-foreground">
                            {farmers} farmers, {suppliers} suppliers
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Products</CardTitle>
                        <Package className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{products.length}</div>
                        <p className="text-xs text-muted-foreground">Listed on platform</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                        <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{orders.length}</div>
                        <p className="text-xs text-muted-foreground">All time</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">${totalRevenue.toFixed(2)}</div>
                        <p className="text-xs text-muted-foreground">Platform revenue</p>
                    </CardContent>
                </Card>
            </div>

            {/* Users Management */}
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle>Recent Users</CardTitle>
                        <Button variant="outline" size="sm">
                            View All Users
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    {users.length === 0 ? (
                        <div className="text-center py-8 text-muted-foreground">
                            <p>No users yet</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {users.slice(0, 10).map((userData) => (
                                <div
                                    key={userData.id}
                                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                                            {userData.role === 'farmer' ? (
                                                <UserCheck className="h-5 w-5 text-primary" />
                                            ) : (
                                                <UserX className="h-5 w-5 text-primary" />
                                            )}
                                        </div>
                                        <div>
                                            <p className="font-medium">{userData.name || 'Unknown'}</p>
                                            <p className="text-sm text-muted-foreground">{userData.email}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <Badge className={getRoleBadgeColor(userData.role)}>
                                            {userData.role || 'user'}
                                        </Badge>
                                        <p className="text-sm text-muted-foreground">
                                            {userData.createdAt
                                                ? new Date(userData.createdAt.seconds * 1000).toLocaleDateString()
                                                : 'N/A'}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Recent Products */}
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle>Recent Products</CardTitle>
                        <Button variant="outline" size="sm" onClick={() => router.push('/products')}>
                            View All
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    {products.length === 0 ? (
                        <div className="text-center py-8 text-muted-foreground">
                            <p>No products yet</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {products.map((product) => (
                                <div
                                    key={product.id}
                                    className="flex items-center justify-between p-4 border rounded-lg"
                                >
                                    <div className="flex-1">
                                        <p className="font-medium">{product.name}</p>
                                        <p className="text-sm text-muted-foreground">
                                            By {product.supplierName || 'Unknown'} • ${product.price?.toFixed(2)}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <Badge variant={product.stock > 0 ? 'default' : 'secondary'}>
                                            {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                                        </Badge>
                                        {product.isOrganic && (
                                            <Badge className="bg-green-100 text-green-800">Organic</Badge>
                                        )}
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
                            {orders.map((order) => (
                                <div
                                    key={order.id}
                                    className="flex items-center justify-between p-4 border rounded-lg"
                                >
                                    <div className="flex-1">
                                        <p className="font-medium">Order #{order.id.substring(0, 8)}</p>
                                        <p className="text-sm text-muted-foreground">
                                            {order.userName} • {order.items?.length || 0} items
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <p className="font-semibold">${order.total?.toFixed(2)}</p>
                                        <Badge>{order.status}</Badge>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
