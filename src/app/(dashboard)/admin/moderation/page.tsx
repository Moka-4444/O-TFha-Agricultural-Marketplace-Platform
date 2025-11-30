import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Check, Trash2 } from 'lucide-react';
import Image from 'next/image';

export default function AdminModerationPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tight">Product Moderation</h1>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3].map((i) => (
                    <Card key={i}>
                        <CardHeader>
                            <div className="flex justify-between items-start">
                                <Badge variant="destructive" className="mb-2">Reported</Badge>
                                <span className="text-xs text-muted-foreground">2 reports</span>
                            </div>
                            <CardTitle className="text-lg">Suspicious Fertilizer</CardTitle>
                            <CardDescription>Seller: Unknown Supplier</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="relative h-40 w-full bg-muted rounded-md overflow-hidden">
                                <Image
                                    src={`https://images.unsplash.com/photo-1628352081506-83c43123ed6d?w=400&q=80`}
                                    alt="Product"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="bg-red-50 p-3 rounded-md text-sm text-red-800">
                                <div className="font-semibold flex items-center gap-2">
                                    <AlertTriangle className="h-4 w-4" /> Reason:
                                </div>
                                Potential counterfeit product. Label does not match official packaging.
                            </div>
                        </CardContent>
                        <CardFooter className="flex gap-2">
                            <Button className="flex-1 bg-green-600 hover:bg-green-700">
                                <Check className="h-4 w-4 mr-2" /> Approve
                            </Button>
                            <Button variant="destructive" className="flex-1">
                                <Trash2 className="h-4 w-4 mr-2" /> Remove
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}
