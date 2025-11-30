import { z } from 'zod';

// Signup validation schema
export const signupSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters').max(100),
    email: z.string().email('Invalid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters')
        .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
        .regex(/[0-9]/, 'Password must contain at least one number'),
    phone: z.string().optional(),
    role: z.enum(['farmer', 'supplier', 'admin']),
    // Farmer-specific fields
    farmName: z.string().optional(),
    farmSize: z.number().optional(),
    farmLocation: z.string().optional(),
    // Supplier-specific fields
    businessName: z.string().optional(),
    businessLicense: z.string().optional(),
});

export type SignupInput = z.infer<typeof signupSchema>;

// Login validation schema
export const loginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(1, 'Password is required'),
});

export type LoginInput = z.infer<typeof loginSchema>;

// Password reset validation schema
export const resetPasswordSchema = z.object({
    email: z.string().email('Invalid email address'),
});

export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;

// Change password validation schema
export const changePasswordSchema = z.object({
    currentPassword: z.string().min(1, 'Current password is required'),
    newPassword: z.string().min(8, 'Password must be at least 8 characters')
        .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
        .regex(/[0-9]/, 'Password must contain at least one number'),
    confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;
