import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DollarSign, TrendingUp, CreditCard, Download } from 'lucide-react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

export default function SupplierFinancePage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Finance</h1>
                <Button variant="outline" className="gap-2">
                    <Download className="h-4 w-4" /> Export Report
                </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">$45,231.89</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            +20.1% from last month
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Available for Payout</CardTitle>
                        <CreditCard className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">$12,450.00</div>
                        <Button size="sm" className="mt-4 w-full">Request Payout</Button>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Pending Clearance</CardTitle>
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">$3,200.00</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            Will be available in 3-5 days
                        </p>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Recent Transactions</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Transaction ID</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead className="text-right">Amount</TableHead>
                                <TableHead className="text-right">Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {[
                                { id: 'TRX-991', date: 'Today', desc: 'Order #ORD-892 Payment', amount: '+$139.98', status: 'Pending' },
                                { id: 'TRX-990', date: 'Yesterday', desc: 'Payout to Bank Account', amount: '-$5,000.00', status: 'Completed' },
                                { id: 'TRX-989', date: 'Nov 20, 2023', desc: 'Order #ORD-890 Payment', amount: '+$89.50', status: 'Completed' },
                                { id: 'TRX-988', date: 'Nov 19, 2023', desc: 'Order #ORD-889 Payment', amount: '+$1,200.00', status: 'Completed' },
                            ].map((trx) => (
                                <TableRow key={trx.id}>
                                    <TableCell className="font-medium">{trx.id}</TableCell>
                                    <TableCell>{trx.date}</TableCell>
                                    <TableCell>{trx.desc}</TableCell>
                                    <TableCell className={`text-right font-medium ${trx.amount.startsWith('+') ? 'text-green-600' : ''}`}>
                                        {trx.amount}
                                    </TableCell>
                                    <TableCell className="text-right">{trx.status}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
