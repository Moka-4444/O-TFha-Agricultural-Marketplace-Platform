import { z } from 'zod';

// Review creation validation schema
export const createReviewSchema = z.object({
    productId: z.string().min(1, 'Product ID is required'),
    rating: z.number().min(1, 'Rating must be at least 1').max(5, 'Rating cannot exceed 5'),
    comment: z.string().min(10, 'Review must be at least 10 characters').max(1000, 'Review cannot exceed 1000 characters'),
    images: z.array(z.string().url('Invalid image URL')).max(5, 'Maximum 5 images allowed').optional(),
});

export type CreateReviewInput = z.infer<typeof createReviewSchema>;

// Review update validation schema
export const updateReviewSchema = z.object({
    reviewId: z.string().min(1, 'Review ID is required'),
    rating: z.number().min(1).max(5).optional(),
    comment: z.string().min(10).max(1000).optional(),
    images: z.array(z.string().url()).max(5).optional(),
});

export type UpdateReviewInput = z.infer<typeof updateReviewSchema>;
