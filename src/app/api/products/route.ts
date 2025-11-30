import { NextRequest, NextResponse } from 'next/server';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { productFilterSchema } from '@/lib/validations/product';
import { Product } from '@/types/firebase';

// GET /api/products - Fetch products with filters
export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);

        const filters = {
            category: searchParams.get('category') || undefined,
            minPrice: searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : undefined,
            maxPrice: searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : undefined,
            isOrganic: searchParams.get('isOrganic') === 'true' ? true : undefined,
            search: searchParams.get('search') || undefined,
            supplierId: searchParams.get('supplierId') || undefined,
            sortBy: searchParams.get('sortBy') as any || undefined,
            limit: searchParams.get('limit') ? Number(searchParams.get('limit')) : 20,
            offset: searchParams.get('offset') ? Number(searchParams.get('offset')) : 0,
        };

        // Validate filters
        const validatedFilters = productFilterSchema.parse(filters);

        // Build Firestore query
        let productsQuery = query(collection(db, 'products'));

        // Apply filters
        if (validatedFilters.category) {
            productsQuery = query(productsQuery, where('category', '==', validatedFilters.category));
        }

        if (validatedFilters.isOrganic !== undefined) {
            productsQuery = query(productsQuery, where('isOrganic', '==', validatedFilters.isOrganic));
        }

        if (validatedFilters.supplierId) {
            productsQuery = query(productsQuery, where('supplierId', '==', validatedFilters.supplierId));
        }

        // Apply sorting
        if (validatedFilters.sortBy === 'price_asc') {
            productsQuery = query(productsQuery, orderBy('price', 'asc'));
        } else if (validatedFilters.sortBy === 'price_desc') {
            productsQuery = query(productsQuery, orderBy('price', 'desc'));
        } else if (validatedFilters.sortBy === 'rating') {
            productsQuery = query(productsQuery, orderBy('rating', 'desc'));
        } else if (validatedFilters.sortBy === 'newest') {
            productsQuery = query(productsQuery, orderBy('createdAt', 'desc'));
        }

        // Execute query
        const querySnapshot = await getDocs(productsQuery);

        const products: Product[] = [];
        querySnapshot.forEach((doc) => {
            products.push({ id: doc.id, ...doc.data() } as Product);
        });

        // Filter by price range (client-side for now)
        let filteredProducts = products;
        if (validatedFilters.minPrice !== undefined) {
            filteredProducts = filteredProducts.filter(p => p.price >= validatedFilters.minPrice!);
        }
        if (validatedFilters.maxPrice !== undefined) {
            filteredProducts = filteredProducts.filter(p => p.price <= validatedFilters.maxPrice!);
        }

        // Filter by search (client-side for now)
        if (validatedFilters.search) {
            const searchLower = validatedFilters.search.toLowerCase();
            filteredProducts = filteredProducts.filter(p =>
                p.name.toLowerCase().includes(searchLower) ||
                p.description.toLowerCase().includes(searchLower)
            );
        }

        return NextResponse.json({
            success: true,
            data: filteredProducts,
            total: filteredProducts.length,
        });

    } catch (error: any) {
        console.error('Error fetching products:', error);

        if (error.name === 'ZodError') {
            return NextResponse.json({
                success: false,
                error: 'Invalid filters',
                details: error.errors,
            }, { status: 400 });
        }

        return NextResponse.json({
            success: false,
            error: 'Failed to fetch products',
        }, { status: 500 });
    }
}
