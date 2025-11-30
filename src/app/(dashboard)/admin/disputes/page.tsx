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
import { MessageSquare } from 'lucide-react';

export default function AdminDisputesPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tight">Dispute Resolution</h1>

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Case ID</TableHead>
                            <TableHead>Order ID</TableHead>
                            <TableHead>Parties</TableHead>
                            <TableHead>Issue</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {[
                            { id: 'CASE-101', order: 'ORD-892', parties: 'John Doe vs Green Valley', issue: 'Item damaged', status: 'Open' },
                            { id: 'CASE-102', order: 'ORD-850', parties: 'Jane Smith vs AgriTech', issue: 'Non-delivery', status: 'Escalated' },
                            { id: 'CASE-099', order: 'ORD-700', parties: 'Bob Wilson vs Seeds Ltd', issue: 'Wrong item', status: 'Resolved' },
                        ].map((dispute) => (
                            <TableRow key={dispute.id}>
                                <TableCell className="font-medium">{dispute.id}</TableCell>
                                <TableCell>{dispute.order}</TableCell>
                                <TableCell>{dispute.parties}</TableCell>
                                <TableCell>{dispute.issue}</TableCell>
                                <TableCell>
                                    <Badge
                                        variant={
                                            dispute.status === 'Open' ? 'default' :
                                                dispute.status === 'Escalated' ? 'destructive' : 'secondary'
                                        }
                                    >
                                        {dispute.status}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                    <Button size="sm" variant="outline" className="gap-2">
                                        <MessageSquare className="h-4 w-4" /> Review
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
