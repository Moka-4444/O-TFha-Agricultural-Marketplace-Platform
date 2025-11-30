import Image from 'next/image';
import Link from 'next/link';
import { MapPin, CheckCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';


interface SupplierCardProps {
    id: string;
    name: string;
    location: string;
    rating: number;
    image: string;
    isVerified?: boolean;
    productCount: number;
}

export function SupplierCard({
    id,
    name,
    location,
    rating,
    image,
    isVerified,
    productCount,
}: SupplierCardProps) {
    return (
        <Card className="overflow-hidden hover:border-primary/50 transition-colors">
            <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="relative h-20 w-20 rounded-full overflow-hidden mb-4 border-2 border-muted">
                    <Image src={image} alt={name} fill className="object-cover" />
                </div>
                <div className="flex items-center gap-1 mb-1">
                    <h3 className="font-semibold text-lg">{name}</h3>
                    {isVerified && <CheckCircle className="h-4 w-4 text-blue-500 fill-blue-100" />}
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground mb-3">
                    <MapPin className="h-3 w-3" />
                    <span>{location}</span>
                </div>
                <div className="flex items-center gap-4 text-sm mb-4">
                    <div className="flex items-center gap-1">
                        <span className="font-bold text-primary">★ {rating}</span>
                        <span className="text-muted-foreground">Rating</span>
                    </div>
                    <div className="w-px h-3 bg-border" />
                    <div>
                        <span className="font-bold">{productCount}</span>{' '}
                        <span className="text-muted-foreground">Products</span>
                    </div>
                </div>
                <Link href={`/suppliers/${id}`} className="text-sm font-medium text-primary hover:underline">
                    View Profile
                </Link>
            </CardContent>
        </Card>
    );
}
