import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DollarSign, ShoppingBag, Package, TrendingUp, ArrowUpRight, AlertCircle, CheckCircle, MoreHorizontal } from 'lucide-react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

export default function SupplierDashboardPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Supplier Dashboard</h1>
                <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Last 7 days</span>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                        <DollarSign className="h-4 w-4 text-green-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">$45,231</div>
                        <p className="text-xs text-green-600 font-medium flex items-center">
                            <ArrowUpRight className="h-3 w-3 mr-1" /> 12.5%
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                        <ShoppingBag className="h-4 w-4 text-green-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">324</div>
                        <p className="text-xs text-green-600 font-medium flex items-center">
                            <ArrowUpRight className="h-3 w-3 mr-1" /> 8.2%
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Products</CardTitle>
                        <Package className="h-4 w-4 text-green-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">156</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
                        <TrendingUp className="h-4 w-4 text-green-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">12.4%</div>
                        <p className="text-xs text-green-600 font-medium flex items-center">
                            <ArrowUpRight className="h-3 w-3 mr-1" /> 2.1%
                        </p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                {/* Recent Orders */}
                <Card className="col-span-1">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>Recent Orders</CardTitle>
                        <Button variant="link" className="text-xs text-green-600">View All</Button>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {[
                                { id: '#ORD-2145', customer: 'John Farmer', item: 'Organic Seeds', status: 'Delivered', price: '$49.99' },
                                { id: '#ORD-2144', customer: 'Mary Smith', item: 'Fertilizer 50kg', status: 'Shipped', price: '$89.99' },
                                { id: '#ORD-2143', customer: 'David Brown', item: 'Equipment Kit', status: 'Processing', price: '$299.99' },
                            ].map((order) => (
                                <div key={order.id} className="flex items-center justify-between border-b pb-2 last:border-0 last:pb-0">
                                    <div>
                                        <div className="font-medium text-sm">{order.id}</div>
                                        <div className="text-xs text-muted-foreground">{order.customer}</div>
                                        <div className="text-[10px] text-muted-foreground">{order.item}</div>
                                    </div>
                                    <div className="text-right">
                                        <div className={`text-xs font-medium ${order.status === 'Delivered' ? 'text-green-600' :
                                                order.status === 'Shipped' ? 'text-blue-600' : 'text-orange-600'
                                            }`}>
                                            {order.status}
                                        </div>
                                        <div className="text-sm font-bold">{order.price}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Top Selling Products */}
                <Card className="col-span-1">
                    <CardHeader>
                        <CardTitle>Top Selling Products</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {[
                                { rank: 1, name: 'Premium Organic Seeds', sales: '145 sales', revenue: '$7,248' },
                                { rank: 2, name: 'Bio-Organic Fertilizer', sales: '98 sales', revenue: '$8,820' },
                                { rank: 3, name: 'Irrigation System', sales: '42 sales', revenue: '$20,575' },
                            ].map((product) => (
                                <div key={product.rank} className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-700 font-bold text-sm">
                                            {product.rank}
                                        </div>
                                        <div>
                                            <div className="font-medium text-sm">{product.name}</div>
                                            <div className="text-xs text-muted-foreground">{product.sales}</div>
                                        </div>
                                    </div>
                                    <div className="text-sm font-bold text-green-700">{product.revenue}</div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Revenue Overview (Placeholder for Chart) */}
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Revenue Overview</CardTitle>
                    <Button variant="outline" size="sm" className="text-xs h-8">Last 7 days</Button>
                </CardHeader>
                <CardContent>
                    <div className="h-[200px] w-full bg-muted/10 rounded-md flex items-end justify-between p-4 gap-2">
                        {[40, 65, 45, 80, 55, 90, 75].map((h, i) => (
                            <div key={i} className="w-full bg-green-100 hover:bg-green-200 rounded-t-sm relative group transition-all">
                                <div
                                    className="absolute bottom-0 w-full bg-green-500 rounded-t-sm transition-all group-hover:bg-green-600"
                                    style={{ height: `${h}%` }}
                                />
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between mt-2 text-xs text-muted-foreground px-2">
                        <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                    </div>
                </CardContent>
            </Card>

            {/* Alerts & Notifications */}
            <Card>
                <CardHeader>
                    <CardTitle>Alerts & Notifications</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                    <div className="flex items-center gap-3 p-3 bg-orange-50 text-orange-800 rounded-md border border-orange-100">
                        <AlertCircle className="h-5 w-5 shrink-0" />
                        <div>
                            <div className="font-medium text-sm">Low Stock Alert</div>
                            <div className="text-xs opacity-90">5 products are running low on inventory</div>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-green-50 text-green-800 rounded-md border border-green-100">
                        <CheckCircle className="h-5 w-5 shrink-0" />
                        <div>
                            <div className="font-medium text-sm">New Order Received</div>
                            <div className="text-xs opacity-90">You have 3 new orders to process</div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
