'use client';

import { useState, Suspense } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { Star, ShoppingCart, Truck, ShieldCheck, RotateCcw, Minus, Plus, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ProductCard } from '@/components/shared/ProductCard';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useProduct, useProducts, useCart } from '@/lib/hooks';
import { toast } from 'sonner';

function ProductDetailsContent() {
    const params = useParams();
    const router = useRouter();
    const productId = params.id as string;

    const { product, loading, error } = useProduct(productId);
    const { addItem } = useCart();
    const { products: recommendedProducts } = useProducts({ limit: 4 });

    const [quantity, setQuantity] = useState(1);
    const [addingToCart, setAddingToCart] = useState(false);

    const handleAddToCart = async () => {
        if (!product) return;

        setAddingToCart(true);
        try {
            await addItem(product.id, quantity);
            toast.success(`Added ${quantity} ${product.name} to cart`);
        } catch (error: any) {
            toast.error(error.message || 'Failed to add to cart');
        } finally {
            setAddingToCart(false);
        }
    };

    const handleBuyNow = async () => {
        await handleAddToCart();
        router.push('/cart');
    };

    if (loading) {
        return (
            <div className="container px-4 md:px-6 py-8">
                <div className="flex items-center justify-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="container px-4 md:px-6 py-8">
                <div className="text-center py-12">
                    <p className="text-muted-foreground mb-4">{error || 'Product not found'}</p>
                    <Button onClick={() => router.push('/products')}>Back to Products</Button>
                </div>
            </div>
        );
    }

    return (
        <div className="container px-4 md:px-6 py-8">
            <div className="text-sm text-muted-foreground mb-6">
                Home / Products / {product.category} / {product.name}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
                <div className="space-y-4">
                    <div className="relative aspect-square bg-muted rounded-lg overflow-hidden border">
                        <Image
                            src={product.images[0] || '/placeholder.png'}
                            alt={product.name}
                            fill
                            className="object-cover"
                        />
                        {product.isOrganic && (
                            <Badge className="absolute top-4 left-4 bg-green-600">Organic</Badge>
                        )}
                    </div>
                </div>

                <div className="space-y-6">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <Badge variant="outline" className="text-primary border-primary">
                                Verified Seller
                            </Badge>
                            <span className="text-sm text-green-600 font-medium">
                                {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                            </span>
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`h-4 w-4 ${i < Math.floor(product.rating)
                                                ? 'fill-yellow-400 text-yellow-400'
                                                : 'text-gray-300'
                                            }`}
                                    />
                                ))}
                                <span className="font-medium ml-1">{product.rating.toFixed(1)}</span>
                            </div>
                            <span className="text-muted-foreground">({product.reviewCount} reviews)</span>
                        </div>
                    </div>

                    <div className="flex items-baseline gap-3">
                        <span className="text-4xl font-bold text-primary">${product.price.toFixed(2)}</span>
                        <span className="text-sm text-muted-foreground">per {product.unit}</span>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-2">Description</h3>
                        <p className="text-muted-foreground text-sm">{product.description}</p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex items-center border rounded-md w-fit">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-10 w-10 rounded-none"
                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                disabled={quantity <= 1}
                            >
                                <Minus className="h-4 w-4" />
                            </Button>
                            <div className="w-12 text-center font-medium">{quantity}</div>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-10 w-10 rounded-none"
                                onClick={() => setQuantity(quantity + 1)}
                                disabled={quantity >= product.stock}
                            >
                                <Plus className="h-4 w-4" />
                            </Button>
                        </div>
                        <Button
                            className="flex-1 h-10 gap-2"
                            onClick={handleAddToCart}
                            disabled={addingToCart || product.stock === 0}
                        >
                            <ShoppingCart className="h-4 w-4" />
                            {addingToCart ? 'Adding...' : 'Add to Cart'}
                        </Button>
                        <Button
                            variant="secondary"
                            className="flex-1 h-10"
                            onClick={handleBuyNow}
                            disabled={addingToCart || product.stock === 0}
                        >
                            Buy Now
                        </Button>
                    </div>

                    <div className="grid grid-cols-3 gap-4 py-4 border-t border-b">
                        <div className="flex flex-col items-center text-center gap-2">
                            <div className="p-2 bg-green-50 rounded-full">
                                <Truck className="h-5 w-5 text-green-600" />
                            </div>
                            <span className="text-xs font-medium">Free Shipping<br />Orders $50+</span>
                        </div>
                        <div className="flex flex-col items-center text-center gap-2">
                            <div className="p-2 bg-green-50 rounded-full">
                                <ShieldCheck className="h-5 w-5 text-green-600" />
                            </div>
                            <span className="text-xs font-medium">Guaranteed<br />100% Authentic</span>
                        </div>
                        <div className="flex flex-col items-center text-center gap-2">
                            <div className="p-2 bg-green-50 rounded-full">
                                <RotateCcw className="h-5 w-5 text-green-600" />
                            </div>
                            <span className="text-xs font-medium">Easy Returns<br />30 Days</span>
                        </div>
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg bg-muted/10">
                        <div className="flex items-center gap-3">
                            <Avatar className="h-12 w-12 border">
                                <AvatarFallback>{product.supplierName?.substring(0, 2).toUpperCase() || 'SU'}</AvatarFallback>
                            </Avatar>
                            <div>
                                <h4 className="font-semibold">{product.supplierName || 'Unknown Supplier'}</h4>
                            </div>
                        </div>
                        <Button size="sm">Visit Store</Button>
                    </div>
                </div>
            </div>

            {recommendedProducts.length > 0 && (
                <section>
                    <h2 className="text-2xl font-bold mb-6">Recommended Products</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {recommendedProducts.map((recProduct) => (
                            <ProductCard
                                key={recProduct.id}
                                id={recProduct.id}
                                title={recProduct.name}
                                price={recProduct.price}
                                rating={recProduct.rating}
                                image={recProduct.images[0]}
                                category={recProduct.category}
                                isOrganic={recProduct.isOrganic}
                            />
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
}

export default function ProductDetailsPage() {
    return (
        <Suspense
            fallback={
                <div className="container px-4 md:px-6 py-8">
                    <div className="flex items-center justify-center py-12">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                </div>
            }
        >
            <ProductDetailsContent />
        </Suspense>
    );
}
