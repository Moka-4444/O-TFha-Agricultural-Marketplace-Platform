import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, X, FileText, ExternalLink } from 'lucide-react';

export default function AdminVerificationPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tight">Supplier Verification</h1>

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Supplier Name</TableHead>
                            <TableHead>Business Type</TableHead>
                            <TableHead>Documents</TableHead>
                            <TableHead>Submitted</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {[
                            { name: 'Green Valley Farms', type: 'Farm Co-op', date: '2 days ago', status: 'Pending' },
                            { name: 'AgriTech Solutions', type: 'Equipment Manufacturer', date: '1 week ago', status: 'Pending' },
                            { name: 'Organic Seeds Ltd', type: 'Seed Supplier', date: '2 weeks ago', status: 'Rejected' },
                            { name: 'Best Fertilizers', type: 'Chemical Supplier', date: '1 month ago', status: 'Approved' },
                        ].map((supplier) => (
                            <TableRow key={supplier.name}>
                                <TableCell className="font-medium">{supplier.name}</TableCell>
                                <TableCell>{supplier.type}</TableCell>
                                <TableCell>
                                    <Button variant="link" className="h-auto p-0 gap-1">
                                        <FileText className="h-4 w-4" /> View Docs
                                    </Button>
                                </TableCell>
                                <TableCell>{supplier.date}</TableCell>
                                <TableCell>
                                    <Badge
                                        variant={
                                            supplier.status === 'Approved' ? 'default' :
                                                supplier.status === 'Rejected' ? 'destructive' : 'secondary'
                                        }
                                        className={
                                            supplier.status === 'Approved' ? 'bg-green-600 hover:bg-green-700' : ''
                                        }
                                    >
                                        {supplier.status}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                    {supplier.status === 'Pending' && (
                                        <div className="flex justify-end gap-2">
                                            <Button size="sm" variant="outline" className="text-green-600 hover:text-green-700 hover:bg-green-50">
                                                <Check className="h-4 w-4" />
                                            </Button>
                                            <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                                                <X className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    )}
                                    {supplier.status !== 'Pending' && (
                                        <Button size="sm" variant="ghost">
                                            <ExternalLink className="h-4 w-4 mr-2" /> Details
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
