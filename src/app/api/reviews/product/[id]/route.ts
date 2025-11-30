import { NextRequest, NextResponse } from 'next/server';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Review } from '@/types/firebase';

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        // Fetch reviews for product
        const reviewsQuery = query(
            collection(db, 'reviews'),
            where('productId', '==', id),
            orderBy('createdAt', 'desc')
        );

        const reviewsSnapshot = await getDocs(reviewsQuery);
        const reviews: Review[] = [];

        reviewsSnapshot.forEach((doc) => {
            reviews.push({ id: doc.id, ...doc.data() } as Review);
        });

        // Calculate average rating
        const averageRating = reviews.length > 0
            ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
            : 0;

        return NextResponse.json({
            success: true,
            data: {
                reviews,
                averageRating,
                totalReviews: reviews.length,
            },
        });

    } catch (error: any) {
        console.error('Error fetching reviews:', error);

        return NextResponse.json({
            success: false,
            error: 'Failed to fetch reviews',
        }, { status: 500 });
    }
}
