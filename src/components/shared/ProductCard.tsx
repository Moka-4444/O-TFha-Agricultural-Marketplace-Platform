import Image from 'next/image';
import Link from 'next/link';
import { Star, ShoppingCart, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter } from '@/components/ui/card';

interface ProductCardProps {
    id: string;
    title: string;
    price: number;
    originalPrice?: number;
    rating: number;
    image: string;
    category: string;
    isOrganic?: boolean;
    discount?: number;
}

export function ProductCard({
    id,
    title,
    price,
    originalPrice,
    rating,
    image,
    category,
    isOrganic,
    discount,
}: ProductCardProps) {
    return (
        <Card className="group overflow-hidden border-none shadow-sm hover:shadow-md transition-shadow">
            <div className="relative aspect-square bg-muted">
                <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                />
                {isOrganic && (
                    <Badge className="absolute top-2 left-2 bg-green-600 hover:bg-green-700">
                        Organic
                    </Badge>
                )}
                {discount && (
                    <Badge variant="destructive" className="absolute top-2 right-2">
                        {discount}% OFF
                    </Badge>
                )}
                <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white/80 hover:bg-white text-gray-600"
                >
                    <Heart className="h-4 w-4" />
                </Button>
            </div>
            <CardContent className="p-4">
                <div className="text-xs text-muted-foreground mb-1">{category}</div>
                <Link href={`/products/${id}`} className="font-semibold hover:text-primary line-clamp-2 mb-2">
                    {title}
                </Link>
                <div className="flex items-center gap-1 mb-2">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{rating}</span>
                    <span className="text-xs text-muted-foreground">(120)</span>
                </div>
                <div className="flex items-baseline gap-2">
                    <span className="text-lg font-bold text-primary">${price.toFixed(2)}</span>
                    {originalPrice && (
                        <span className="text-sm text-muted-foreground line-through">
                            ${originalPrice.toFixed(2)}
                        </span>
                    )}
                </div>
            </CardContent>
            <CardFooter className="p-4 pt-0">
                <Button className="w-full gap-2">
                    <ShoppingCart className="h-4 w-4" />
                    Add to Cart
                </Button>
            </CardFooter>
        </Card>
    );
}
