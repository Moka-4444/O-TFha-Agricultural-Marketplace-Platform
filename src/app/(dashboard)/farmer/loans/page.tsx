import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { DollarSign, Clock, FileText, CheckCircle } from 'lucide-react';

export default function FarmerLoansPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Financial Services</h1>
                <Button>Request New Loan</Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                {/* Active Loan */}
                <Card className="md:col-span-2 lg:col-span-1">
                    <CardHeader>
                        <CardTitle>Active Loan</CardTitle>
                        <CardDescription>Equipment Financing - Tractor Purchase</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="flex justify-between items-end">
                            <div>
                                <div className="text-sm text-muted-foreground">Remaining Balance</div>
                                <div className="text-3xl font-bold">$12,450.00</div>
                            </div>
                            <Badge className="bg-green-600">Active</Badge>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span>Progress (45% paid)</span>
                                <span>$10,000 / $22,450</span>
                            </div>
                            <Progress value={45} className="h-2" />
                        </div>

                        <div className="grid grid-cols-2 gap-4 pt-4">
                            <div className="space-y-1">
                                <div className="text-sm text-muted-foreground">Next Payment</div>
                                <div className="font-medium">Dec 15, 2023</div>
                            </div>
                            <div className="space-y-1">
                                <div className="text-sm text-muted-foreground">Amount</div>
                                <div className="font-medium">$850.00</div>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full" variant="outline">Make Payment</Button>
                    </CardFooter>
                </Card>

                {/* Loan History / Status */}
                <Card className="md:col-span-2 lg:col-span-1">
                    <CardHeader>
                        <CardTitle>Application Status</CardTitle>
                        <CardDescription>Recent loan applications and their status</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-6">
                            {[
                                { type: 'Seed Funding', amount: '$5,000', date: 'Nov 10, 2023', status: 'Under Review', icon: Clock, color: 'text-yellow-600' },
                                { type: 'Equipment Loan', amount: '$22,450', date: 'Jan 15, 2023', status: 'Approved', icon: CheckCircle, color: 'text-green-600' },
                                { type: 'Emergency Fund', amount: '$2,000', date: 'Dec 05, 2022', status: 'Repaid', icon: DollarSign, color: 'text-blue-600' },
                            ].map((loan, i) => (
                                <div key={i} className="flex items-start gap-4">
                                    <div className={`mt-1 p-2 rounded-full bg-muted ${loan.color}`}>
                                        <loan.icon className="h-4 w-4" />
                                    </div>
                                    <div className="flex-1 space-y-1">
                                        <div className="flex items-center justify-between">
                                            <p className="font-medium">{loan.type}</p>
                                            <span className={`text-xs font-medium px-2 py-0.5 rounded-full bg-muted ${loan.color}`}>
                                                {loan.status}
                                            </span>
                                        </div>
                                        <p className="text-sm text-muted-foreground">
                                            Requested: {loan.amount} • {loan.date}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button variant="ghost" className="w-full">View All History</Button>
                    </CardFooter>
                </Card>
            </div>

            {/* Available Offers */}
            <div className="pt-6">
                <h2 className="text-xl font-semibold mb-4">Available Offers</h2>
                <div className="grid gap-6 md:grid-cols-3">
                    {[1, 2, 3].map((i) => (
                        <Card key={i} className="bg-primary/5 border-primary/20">
                            <CardHeader>
                                <CardTitle className="text-lg">Seasonal Crop Loan</CardTitle>
                                <CardDescription>Low interest rates for harvest season</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-2 text-sm">
                                    <li className="flex items-center gap-2">
                                        <CheckCircle className="h-4 w-4 text-primary" /> Up to $50,000
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <CheckCircle className="h-4 w-4 text-primary" /> 3.5% Interest Rate
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <CheckCircle className="h-4 w-4 text-primary" /> Flexible Repayment
                                    </li>
                                </ul>
                            </CardContent>
                            <CardFooter>
                                <Button className="w-full">Apply Now</Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}
