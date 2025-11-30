'use client';

import { useState, useEffect } from 'react';
import { collection, query, where, getDocs, orderBy, limit as firestoreLimit } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Product } from '@/types/firebase';

interface UseProductsOptions {
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    isOrganic?: boolean;
    search?: string;
    supplierId?: string;
    sortBy?: 'price_asc' | 'price_desc' | 'rating' | 'newest';
    limit?: number;
}

export function useProducts(options: UseProductsOptions = {}) {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                setError(null);

                // Build query
                let productsQuery = query(collection(db, 'products'));

                // Apply filters
                if (options.category) {
                    productsQuery = query(productsQuery, where('category', '==', options.category));
                }

                if (options.isOrganic !== undefined) {
                    productsQuery = query(productsQuery, where('isOrganic', '==', options.isOrganic));
                }

                if (options.supplierId) {
                    productsQuery = query(productsQuery, where('supplierId', '==', options.supplierId));
                }

                // Apply sorting
                if (options.sortBy === 'price_asc') {
                    productsQuery = query(productsQuery, orderBy('price', 'asc'));
                } else if (options.sortBy === 'price_desc') {
                    productsQuery = query(productsQuery, orderBy('price', 'desc'));
                } else if (options.sortBy === 'rating') {
                    productsQuery = query(productsQuery, orderBy('rating', 'desc'));
                } else if (options.sortBy === 'newest') {
                    productsQuery = query(productsQuery, orderBy('createdAt', 'desc'));
                }

                // Apply limit
                if (options.limit) {
                    productsQuery = query(productsQuery, firestoreLimit(options.limit));
                }

                // Execute query
                const querySnapshot = await getDocs(productsQuery);
                let fetchedProducts: Product[] = [];

                querySnapshot.forEach((doc) => {
                    fetchedProducts.push({ id: doc.id, ...doc.data() } as Product);
                });

                // Client-side filtering for price range
                if (options.minPrice !== undefined) {
                    fetchedProducts = fetchedProducts.filter(p => p.price >= options.minPrice!);
                }
                if (options.maxPrice !== undefined) {
                    fetchedProducts = fetchedProducts.filter(p => p.price <= options.maxPrice!);
                }

                // Client-side search
                if (options.search) {
                    const searchLower = options.search.toLowerCase();
                    fetchedProducts = fetchedProducts.filter(p =>
                        p.name.toLowerCase().includes(searchLower) ||
                        p.description.toLowerCase().includes(searchLower)
                    );
                }

                setProducts(fetchedProducts);
            } catch (err: any) {
                console.error('Error fetching products:', err);
                setError(err.message || 'Failed to fetch products');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [
        options.category,
        options.minPrice,
        options.maxPrice,
        options.isOrganic,
        options.search,
        options.supplierId,
        options.sortBy,
        options.limit,
    ]);

    return { products, loading, error };
}

// Hook to fetch a single product
export function useProduct(productId: string | null) {
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!productId) {
            setProduct(null);
            setLoading(false);
            return;
        }

        const fetchProduct = async () => {
            try {
                setLoading(true);
                setError(null);

                const response = await fetch(`/api/products/${productId}`);
                const data = await response.json();

                if (data.success) {
                    setProduct(data.data);
                } else {
                    setError(data.error || 'Failed to fetch product');
                }
            } catch (err: any) {
                console.error('Error fetching product:', err);
                setError(err.message || 'Failed to fetch product');
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [productId]);

    return { product, loading, error };
}
