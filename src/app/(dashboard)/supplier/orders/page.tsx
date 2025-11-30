import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Package, Truck } from 'lucide-react';

export default function SupplierOrdersPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tight">Incoming Orders</h1>

            <div className="flex items-center py-4">
                <div className="relative w-full max-w-sm">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search orders..."
                        className="pl-8"
                    />
                </div>
            </div>

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Order ID</TableHead>
                            <TableHead>Customer</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Total</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {[
                            { id: 'ORD-892', customer: 'John Doe', date: 'Today, 10:30 AM', total: '$139.98', status: 'Pending' },
                            { id: 'ORD-891', customer: 'Jane Smith', date: 'Yesterday', total: '$450.00', status: 'Processing' },
                            { id: 'ORD-890', customer: 'Bob Wilson', date: 'Nov 20, 2023', total: '$89.50', status: 'Shipped' },
                            { id: 'ORD-889', customer: 'Alice Brown', date: 'Nov 19, 2023', total: '$1,200.00', status: 'Delivered' },
                        ].map((order) => (
                            <TableRow key={order.id}>
                                <TableCell className="font-medium">{order.id}</TableCell>
                                <TableCell>{order.customer}</TableCell>
                                <TableCell>{order.date}</TableCell>
                                <TableCell>{order.total}</TableCell>
                                <TableCell>
                                    <Badge
                                        variant={
                                            order.status === 'Pending' ? 'destructive' :
                                                order.status === 'Processing' ? 'secondary' :
                                                    order.status === 'Shipped' ? 'outline' : 'default'
                                        }
                                        className={
                                            order.status === 'Delivered' ? 'bg-green-600 hover:bg-green-700' : ''
                                        }
                                    >
                                        {order.status}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                    {order.status === 'Pending' && (
                                        <Button size="sm" className="gap-2">
                                            <Package className="h-4 w-4" /> Process
                                        </Button>
                                    )}
                                    {order.status === 'Processing' && (
                                        <Button size="sm" variant="outline" className="gap-2">
                                            <Truck className="h-4 w-4" /> Ship
                                        </Button>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
