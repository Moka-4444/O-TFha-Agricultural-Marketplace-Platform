import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, TrendingUp, Users, ShoppingBag } from 'lucide-react';

export default function AdminFinancePage() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tight">Platform Finance</h1>

            <div className="grid gap-4 md:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total GMV</CardTitle>
                        <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">$1,245,231.89</div>
                        <p className="text-xs text-muted-foreground mt-1">Gross Merchandise Value</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Platform Revenue</CardTitle>
                        <DollarSign className="h-4 w-4 text-green-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">$124,523.00</div>
                        <p className="text-xs text-muted-foreground mt-1">10% Commission</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Subscriptions</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">$12,450.00</div>
                        <p className="text-xs text-muted-foreground mt-1">Monthly Recurring</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Net Profit</CardTitle>
                        <TrendingUp className="h-4 w-4 text-green-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">$85,200.00</div>
                        <p className="text-xs text-muted-foreground mt-1">After expenses</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
