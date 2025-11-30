import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, Edit, Trash2, MoreHorizontal } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function SupplierProductsPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">My Products</h1>
                <Button className="gap-2">
                    <Plus className="h-4 w-4" /> Add Product
                </Button>
            </div>

            <div className="flex items-center py-4">
                <div className="relative w-full max-w-sm">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search products..."
                        className="pl-8"
                    />
                </div>
            </div>

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Stock</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {[
                            { name: 'Organic Wheat Seeds', category: 'Seeds', price: '$45.00', stock: 120, status: 'Active' },
                            { name: 'Nitrogen Fertilizer', category: 'Fertilizers', price: '$25.00', stock: 50, status: 'Active' },
                            { name: 'Pesticide Sprayer', category: 'Equipment', price: '$150.00', stock: 12, status: 'Draft' },
                            { name: 'Corn Seeds', category: 'Seeds', price: '$40.00', stock: 0, status: 'Out of Stock' },
                            { name: 'Irrigation Pump', category: 'Equipment', price: '$500.00', stock: 5, status: 'Active' },
                        ].map((product) => (
                            <TableRow key={product.name}>
                                <TableCell className="font-medium">{product.name}</TableCell>
                                <TableCell>{product.category}</TableCell>
                                <TableCell>{product.price}</TableCell>
                                <TableCell>{product.stock}</TableCell>
                                <TableCell>
                                    <Badge
                                        variant={
                                            product.status === 'Active' ? 'default' :
                                                product.status === 'Draft' ? 'secondary' : 'destructive'
                                        }
                                        className={
                                            product.status === 'Active' ? 'bg-green-600 hover:bg-green-700' : ''
                                        }
                                    >
                                        {product.status}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" className="h-8 w-8 p-0">
                                                <span className="sr-only">Open menu</span>
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                            <DropdownMenuItem>
                                                <Edit className="mr-2 h-4 w-4" /> Edit
                                            </DropdownMenuItem>
                                            <DropdownMenuItem className="text-red-600">
                                                <Trash2 className="mr-2 h-4 w-4" /> Delete
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
