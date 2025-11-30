'use client';

import { Suspense, useState } from 'react';
import { FilterSidebar } from '@/components/shared/FilterSidebar';
import { ProductCard } from '@/components/shared/ProductCard';
import { Button } from '@/components/ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { SlidersHorizontal, Loader2 } from 'lucide-react';
import { useProducts } from '@/lib/hooks';

function ProductsContent() {
    const [sortBy, setSortBy] = useState<'price_asc' | 'price_desc' | 'rating' | 'newest'>('newest');
    const [category, setCategory] = useState<string | undefined>(undefined);

    // Fetch products with filters
    const { products, loading, error } = useProducts({
        category,
        sortBy,
        limit: 50,
    });

    return (
        <div className="container px-4 md:px-6 py-8">
            {/* Breadcrumbs */}
            <div className="text-sm text-muted-foreground mb-6">
                Home / Products {category && `/ ${category}`}
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Sidebar - Desktop */}
                <aside className="hidden lg:block w-64 flex-shrink-0">
                    <FilterSidebar />
                </aside>

                {/* Main Content */}
                <div className="flex-1">
                    {/* Toolbar */}
                    <div className="flex items-center justify-between mb-6">
                        <div className="text-sm text-muted-foreground">
                            {loading ? (
                                'Loading products...'
                            ) : (
                                `Showing ${products.length} product${products.length !== 1 ? 's' : ''}`
                            )}
                        </div>

                        <div className="flex items-center gap-4">
                            {/* Mobile Filter Trigger */}
                            <Sheet>
                                <SheetTrigger asChild>
                                    <Button variant="outline" size="sm" className="lg:hidden gap-2">
                                        <SlidersHorizontal className="h-4 w-4" />
                                        Filters
                                    </Button>
                                </SheetTrigger>
                                <SheetContent side="left">
                                    <FilterSidebar />
                                </SheetContent>
                            </Sheet>

                            <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Sort by" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="newest">Newest Arrivals</SelectItem>
                                    <SelectItem value="price_asc">Price: Low to High</SelectItem>
                                    <SelectItem value="price_desc">Price: High to Low</SelectItem>
                                    <SelectItem value="rating">Top Rated</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Error State */}
                    {error && (
                        <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-md mb-6">
                            {error}
                        </div>
                    )}

                    {/* Loading State */}
                    {loading && (
                        <div className="flex items-center justify-center py-12">
                            <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        </div>
                    )}

                    {/* Empty State */}
                    {!loading && products.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-muted-foreground mb-4">No products found</p>
                            <p className="text-sm text-muted-foreground mb-4">
                                Add sample products using the sample data script
                            </p>
                            <Button variant="outline" onClick={() => setCategory(undefined)}>
                                Clear Filters
                            </Button>
                        </div>
                    )}

                    {/* Product Grid */}
                    {!loading && products.length > 0 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {products.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    id={product.id}
                                    title={product.name}
                                    price={product.price}
                                    rating={product.rating}
                                    image={product.images[0]}
                                    category={product.category}
                                    isOrganic={product.isOrganic}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default function ProductListPage() {
    return (
        <Suspense fallback={
            <div className="container px-4 md:px-6 py-8">
                <div className="flex items-center justify-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
            </div>
        }>
            <ProductsContent />
        </Suspense>
    );
}
