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
import { Search, Eye } from 'lucide-react';

export default function FarmerOrdersPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tight">My Orders</h1>

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
                            <TableHead>Date</TableHead>
                            <TableHead>Items</TableHead>
                            <TableHead>Total</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {[
                            { id: 'ORD-001', date: '2023-11-20', items: 'Organic Seeds, Fertilizer', total: '$139.98', status: 'Processing' },
                            { id: 'ORD-002', date: '2023-11-15', items: 'Tractor Parts', total: '$450.00', status: 'Shipped' },
                            { id: 'ORD-003', date: '2023-11-10', items: 'Pesticides', total: '$89.50', status: 'Delivered' },
                            { id: 'ORD-004', date: '2023-11-05', items: 'Irrigation Pipe', total: '$1,200.00', status: 'Delivered' },
                            { id: 'ORD-005', date: '2023-10-28', items: 'Seeds', total: '$45.00', status: 'Cancelled' },
                        ].map((order) => (
                            <TableRow key={order.id}>
                                <TableCell className="font-medium">{order.id}</TableCell>
                                <TableCell>{order.date}</TableCell>
                                <TableCell>{order.items}</TableCell>
                                <TableCell>{order.total}</TableCell>
                                <TableCell>
                                    <Badge
                                        variant={
                                            order.status === 'Delivered' ? 'default' :
                                                order.status === 'Processing' ? 'secondary' :
                                                    order.status === 'Shipped' ? 'outline' : 'destructive'
                                        }
                                        className={
                                            order.status === 'Delivered' ? 'bg-green-600 hover:bg-green-700' : ''
                                        }
                                    >
                                        {order.status}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                    <Button variant="ghost" size="sm">
                                        <Eye className="h-4 w-4 mr-2" />
                                        View
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
