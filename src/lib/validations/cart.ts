import { z } from 'zod';

// Add to cart validation schema
export const addToCartSchema = z.object({
    productId: z.string().min(1, 'Product ID is required'),
    quantity: z.number().min(1, 'Quantity must be at least 1').max(1000, 'Quantity cannot exceed 1000'),
});

export type AddToCartInput = z.infer<typeof addToCartSchema>;

// Update cart item validation schema
export const updateCartItemSchema = z.object({
    productId: z.string().min(1, 'Product ID is required'),
    quantity: z.number().min(0, 'Quantity cannot be negative').max(1000, 'Quantity cannot exceed 1000'),
});

export type UpdateCartItemInput = z.infer<typeof updateCartItemSchema>;

// Remove from cart validation schema
export const removeFromCartSchema = z.object({
    productId: z.string().min(1, 'Product ID is required'),
});

export type RemoveFromCartInput = z.infer<typeof removeFromCartSchema>;
