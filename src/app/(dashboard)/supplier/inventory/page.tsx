import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { AlertTriangle, Package, ArrowUpRight, ArrowDownRight } from 'lucide-react';

export default function SupplierInventoryPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tight">Inventory Management</h1>

            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Items</CardTitle>
                        <Package className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">1,234</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            <span className="text-green-600 font-medium flex items-center">
                                <ArrowUpRight className="h-3 w-3 mr-1" /> +12%
                            </span>
                            from last month
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Low Stock Items</CardTitle>
                        <AlertTriangle className="h-4 w-4 text-orange-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">12</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            Needs attention
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Out of Stock</CardTitle>
                        <AlertTriangle className="h-4 w-4 text-red-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">3</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            Lost sales opportunity
                        </p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <Card className="col-span-2">
                    <CardHeader>
                        <CardTitle>Stock Levels</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-8">
                            {[
                                { name: 'Organic Wheat Seeds', stock: 120, max: 200, status: 'Good' },
                                { name: 'Nitrogen Fertilizer', stock: 50, max: 100, status: 'Medium' },
                                { name: 'Corn Seeds', stock: 5, max: 150, status: 'Critical' },
                                { name: 'Pesticide Sprayer', stock: 12, max: 20, status: 'Good' },
                                { name: 'Irrigation Pump', stock: 2, max: 10, status: 'Low' },
                            ].map((item, i) => (
                                <div key={i} className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <div className="font-medium">{item.name}</div>
                                        <div className="text-sm text-muted-foreground">
                                            {item.stock} / {item.max} units
                                        </div>
                                    </div>
                                    <Progress
                                        value={(item.stock / item.max) * 100}
                                        className={`h-2 ${item.status === 'Critical' ? 'bg-red-100 [&>div]:bg-red-600' :
                                                item.status === 'Low' ? 'bg-orange-100 [&>div]:bg-orange-500' : ''
                                            }`}
                                    />
                                    <div className="flex justify-end">
                                        {item.status === 'Critical' || item.status === 'Low' ? (
                                            <Button variant="link" className="h-auto p-0 text-xs text-red-600">
                                                Restock Now
                                            </Button>
                                        ) : (
                                            <span className="text-xs text-green-600">Stock Healthy</span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
