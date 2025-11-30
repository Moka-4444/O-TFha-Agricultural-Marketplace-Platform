import { z } from 'zod';

// Bulk pricing schema
export const bulkPricingSchema = z.object({
    minQuantity: z.number().min(1, 'Minimum quantity must be at least 1'),
    price: z.number().min(0, 'Price must be positive'),
});

// Product creation/update validation schema
export const productSchema = z.object({
    name: z.string().min(3, 'Product name must be at least 3 characters').max(200),
    category: z.string().min(1, 'Category is required'),
    price: z.number().min(0, 'Price must be positive'),
    bulkPricing: z.array(bulkPricingSchema).optional(),
    description: z.string().min(10, 'Description must be at least 10 characters').max(2000),
    images: z.array(z.string().url('Invalid image URL')).min(1, 'At least one image is required').max(10),
    stock: z.number().min(0, 'Stock cannot be negative'),
    unit: z.string().min(1, 'Unit is required'),
    isOrganic: z.boolean().optional(),
    tags: z.array(z.string()).optional(),
});

export type ProductInput = z.infer<typeof productSchema>;

// Product update schema (all fields optional except id)
export const productUpdateSchema = productSchema.partial().extend({
    id: z.string().min(1, 'Product ID is required'),
});

export type ProductUpdateInput = z.infer<typeof productUpdateSchema>;

// Product filter schema
export const productFilterSchema = z.object({
    category: z.string().optional(),
    minPrice: z.number().optional(),
    maxPrice: z.number().optional(),
    isOrganic: z.boolean().optional(),
    search: z.string().optional(),
    supplierId: z.string().optional(),
    sortBy: z.enum(['price_asc', 'price_desc', 'rating', 'newest']).optional(),
    limit: z.number().min(1).max(100).optional(),
    offset: z.number().min(0).optional(),
});

export type ProductFilterInput = z.infer<typeof productFilterSchema>;
