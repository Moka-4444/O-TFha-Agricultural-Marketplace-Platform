'use client';

// Re-export useAuth from auth-context for convenience
export { useAuth, useRole, useIsAuthenticated } from '@/lib/auth/auth-context';

// Re-export other hooks
export { useProducts, useProduct } from './useProducts';
export { useCart } from './useCart';
export { useOrders, useOrder } from './useOrders';
