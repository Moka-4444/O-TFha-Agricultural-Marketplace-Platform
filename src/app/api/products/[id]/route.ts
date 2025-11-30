import { NextRequest, NextResponse } from 'next/server';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Product } from '@/types/firebase';

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        // Fetch product from Firestore
        const productDoc = await getDoc(doc(db, 'products', id));

        if (!productDoc.exists()) {
            return NextResponse.json({
                success: false,
                error: 'Product not found',
            }, { status: 404 });
        }

        const product: Product = {
            id: productDoc.id,
            ...productDoc.data()
        } as Product;

        return NextResponse.json({
            success: true,
            data: product,
        });

    } catch (error: any) {
        console.error('Error fetching product:', error);

        return NextResponse.json({
            success: false,
            error: 'Failed to fetch product',
        }, { status: 500 });
    }
}
