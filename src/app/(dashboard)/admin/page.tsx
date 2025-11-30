import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, ShoppingBag, AlertTriangle, DollarSign, ArrowUpRight, Activity } from 'lucide-react';

export default function AdminDashboardPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
                <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Platform Overview</span>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                        <Users className="h-4 w-4 text-green-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">10,234</div>
                        <p className="text-xs text-green-600 font-medium flex items-center">
                            <ArrowUpRight className="h-3 w-3 mr-1" /> +12.5%
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                        <DollarSign className="h-4 w-4 text-green-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">$1.2M</div>
                        <p className="text-xs text-green-600 font-medium flex items-center">
                            <ArrowUpRight className="h-3 w-3 mr-1" /> +8.2%
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Orders</CardTitle>
                        <ShoppingBag className="h-4 w-4 text-green-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">573</div>
                        <p className="text-xs text-muted-foreground mt-1">Processing now</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Pending Disputes</CardTitle>
                        <AlertTriangle className="h-4 w-4 text-orange-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">12</div>
                        <p className="text-xs text-orange-600 font-medium flex items-center">
                            Needs attention
                        </p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                {/* Recent Activity */}
                <Card className="col-span-1">
                    <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {[
                                { action: 'New Supplier Registered', user: 'Green Valley Farms', time: '2 mins ago', icon: Users },
                                { action: 'Order #ORD-2145 Disputed', user: 'John Doe', time: '15 mins ago', icon: AlertTriangle },
                                { action: 'Large Order Placed', user: '$2,400 from EcoStore', time: '1 hour ago', icon: ShoppingBag },
                                { action: 'New Product Listed', user: 'Organic Fertilizer', time: '2 hours ago', icon: Activity },
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-4 border-b pb-3 last:border-0 last:pb-0">
                                    <div className="h-9 w-9 rounded-full bg-muted flex items-center justify-center">
                                        <item.icon className="h-4 w-4 text-muted-foreground" />
                                    </div>
                                    <div>
                                        <div className="font-medium text-sm">{item.action}</div>
                                        <div className="text-xs text-muted-foreground">{item.user} • {item.time}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* System Health (Placeholder) */}
                <Card className="col-span-1">
                    <CardHeader>
                        <CardTitle>System Health</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="font-medium">Server Load</span>
                                    <span className="text-green-600">Healthy (24%)</span>
                                </div>
                                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                                    <div className="h-full bg-green-500 w-[24%]" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="font-medium">Database Usage</span>
                                    <span className="text-green-600">Optimal (45%)</span>
                                </div>
                                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                                    <div className="h-full bg-green-500 w-[45%]" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="font-medium">Storage</span>
                                    <span className="text-yellow-600">Warning (82%)</span>
                                </div>
                                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                                    <div className="h-full bg-yellow-500 w-[82%]" />
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
