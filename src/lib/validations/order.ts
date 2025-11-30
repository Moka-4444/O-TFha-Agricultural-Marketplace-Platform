import { z } from 'zod';

// Delivery info validation schema
export const deliveryInfoSchema = z.object({
    fullName: z.string().min(2, 'Full name must be at least 2 characters').max(100),
    phone: z.string().min(10, 'Phone number must be at least 10 digits'),
    address: z.string().min(5, 'Address must be at least 5 characters').max(200),
    city: z.string().min(2, 'City is required'),
    state: z.string().min(2, 'State is required'),
    zipCode: z.string().min(5, 'Zip code must be at least 5 characters'),
    country: z.string().min(2, 'Country is required'),
    notes: z.string().max(500).optional(),
});

export type DeliveryInfo = z.infer<typeof deliveryInfoSchema>;
export type DeliveryInfoInput = z.infer<typeof deliveryInfoSchema>;

// Payment info validation schema
export const paymentInfoSchema = z.object({
    method: z.enum(['card', 'cash', 'bank_transfer']),
    transactionId: z.string().optional(),
});

export type PaymentInfoInput = z.infer<typeof paymentInfoSchema>;

// Order creation validation schema
export const createOrderSchema = z.object({
    deliveryInfo: deliveryInfoSchema,
    paymentInfo: paymentInfoSchema,
});

export type CreateOrderInput = z.infer<typeof createOrderSchema>;

// Order status update validation schema
export const updateOrderStatusSchema = z.object({
    orderId: z.string().min(1, 'Order ID is required'),
    status: z.enum(['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled']),
    trackingNumber: z.string().optional(),
});

export type UpdateOrderStatusInput = z.infer<typeof updateOrderStatusSchema>;
