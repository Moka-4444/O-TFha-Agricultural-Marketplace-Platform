import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingBag, DollarSign, Sprout, Activity, Sun, CloudRain, CloudSun, AlertCircle, CheckCircle, ShoppingCart } from 'lucide-react';
import Image from 'next/image';

export default function FarmerDashboardPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>

            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                        <ShoppingBag className="h-4 w-4 text-green-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">24</div>
                        <p className="text-xs text-green-600 font-medium flex items-center">
                            <Activity className="h-3 w-3 mr-1" /> +12.5%
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
                        <DollarSign className="h-4 w-4 text-green-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">$2,450</div>
                        <p className="text-xs text-green-600 font-medium flex items-center">
                            <Activity className="h-3 w-3 mr-1" /> +8.2%
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Crops</CardTitle>
                        <Sprout className="h-4 w-4 text-green-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">5</div>
                        <p className="text-xs text-muted-foreground mt-1">Fields in production</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Farm Score</CardTitle>
                        <Activity className="h-4 w-4 text-green-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">87%</div>
                        <p className="text-xs text-green-600 font-medium flex items-center">
                            <Activity className="h-3 w-3 mr-1" /> +1.5%
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
                                { id: '#ORD-2145', item: 'Organic Seeds', date: '2024-11-18', status: 'Delivered', price: '$49.99' },
                                { id: '#ORD-2144', item: 'Fertilizer 50kg', date: '2024-11-15', status: 'In Transit', price: '$89.99' },
                                { id: '#ORD-2143', item: 'Irrigation Kit', date: '2024-11-12', status: 'Processing', price: '$299.99' },
                            ].map((order) => (
                                <div key={order.id} className="flex items-center justify-between border-b pb-2 last:border-0 last:pb-0">
                                    <div>
                                        <div className="font-medium text-sm">{order.id}</div>
                                        <div className="text-xs text-muted-foreground">{order.item}</div>
                                        <div className="text-[10px] text-muted-foreground">{order.date}</div>
                                    </div>
                                    <div className="text-right">
                                        <div className={`text-xs font-medium ${order.status === 'Delivered' ? 'text-green-600' :
                                                order.status === 'In Transit' ? 'text-blue-600' : 'text-orange-600'
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

                {/* Weather Forecast */}
                <Card className="col-span-1">
                    <CardHeader>
                        <CardTitle>Weather Forecast</CardTitle>
                        <p className="text-xs text-muted-foreground">San Francisco, CA</p>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center mb-6">
                            <div className="text-5xl font-bold text-green-800 mr-4">72°F</div>
                            <div>
                                <div className="font-medium">Partly Cloudy</div>
                                <div className="text-xs text-muted-foreground">H: 75° L: 65°</div>
                            </div>
                            <CloudSun className="h-12 w-12 text-yellow-500 ml-auto" />
                        </div>
                        <div className="grid grid-cols-5 gap-2 text-center">
                            {[
                                { day: 'Mon', temp: '75°', icon: <Sun className="h-6 w-6 text-yellow-500 mx-auto" /> },
                                { day: 'Tue', temp: '75°', icon: <Sun className="h-6 w-6 text-yellow-500 mx-auto" /> },
                                { day: 'Wed', temp: '75°', icon: <Sun className="h-6 w-6 text-yellow-500 mx-auto" /> },
                                { day: 'Thu', temp: '75°', icon: <Sun className="h-6 w-6 text-yellow-500 mx-auto" /> },
                                { day: 'Fri', temp: '75°', icon: <CloudSun className="h-6 w-6 text-yellow-500 mx-auto" /> },
                            ].map((day, i) => (
                                <div key={i} className="space-y-1">
                                    <div className="text-xs text-muted-foreground">{day.day}</div>
                                    {day.icon}
                                    <div className="text-sm font-medium">{day.temp}</div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Recommended for You */}
            <Card>
                <CardHeader>
                    <CardTitle>Recommended for You</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {[
                            { name: 'Winter Wheat Seeds', desc: 'Suitable for your soil type', price: '$59.99' },
                            { name: 'Nitrogen Fertilizer', desc: 'Recommended for wheat', price: '$79.99' },
                            { name: 'Pest Control Kit', desc: 'Season essential', price: '$39.99' },
                        ].map((product, i) => (
                            <div key={i} className="flex items-center justify-between p-3 border rounded-lg bg-muted/10">
                                <div>
                                    <div className="font-medium text-sm">{product.name}</div>
                                    <div className="text-xs text-muted-foreground">{product.desc}</div>
                                    <div className="text-sm font-bold text-green-700 mt-1">{product.price}</div>
                                </div>
                                <Button size="sm" className="h-8 gap-1 bg-green-700 hover:bg-green-800">
                                    <ShoppingCart className="h-3 w-3" /> Add
                                </Button>
                            </div>
                        ))}
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
                            <div className="font-medium text-sm">Loan Application Update</div>
                            <div className="text-xs opacity-90">Your micro-loan application is under review</div>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-green-50 text-green-800 rounded-md border border-green-100">
                        <CheckCircle className="h-5 w-5 shrink-0" />
                        <div>
                            <div className="font-medium text-sm">Order Delivered</div>
                            <div className="text-xs opacity-90">Your order #ORD-2145 has been delivered</div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
