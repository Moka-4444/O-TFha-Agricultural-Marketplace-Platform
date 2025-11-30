import { NextRequest, NextResponse } from 'next/server';
import { collection, addDoc, serverTimestamp, doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { createReviewSchema } from '@/lib/validations/review';
import { Review } from '@/types/firebase';

// POST /api/reviews - Add a review
export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { userId, userName, userPhoto, ...reviewData } = body;

        if (!userId) {
            return NextResponse.json({
                success: false,
                error: 'User ID required',
            }, { status: 400 });
        }

        const validatedData = createReviewSchema.parse(reviewData);

        const newReview: Omit<Review, 'id'> = {
            productId: validatedData.productId,
            userId,
            userName: userName || 'Anonymous',
            userPhoto,
            rating: validatedData.rating,
            comment: validatedData.comment,
            images: validatedData.images,
            createdAt: serverTimestamp() as any,
            helpful: 0,
        };

        const reviewRef = await addDoc(collection(db, 'reviews'), newReview);

        return NextResponse.json({
            success: true,
            data: {
                id: reviewRef.id,
                ...newReview,
            },
            message: 'Review added successfully',
        }, { status: 201 });

    } catch (error: any) {
        console.error('Error adding review:', error);

        if (error.name === 'ZodError') {
            return NextResponse.json({
                success: false,
                error: 'Validation failed',
                details: error.errors,
            }, { status: 400 });
        }

        return NextResponse.json({
            success: false,
            error: 'Failed to add review',
        }, { status: 500 });
    }
}
