'use client';

import { useState, useEffect, useCallback } from 'react';
import { doc, getDoc, setDoc, onSnapshot, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/lib/auth/auth-context';
import { Cart, CartItem } from '@/types/firebase';

export function useCart() {
    const { user } = useAuth();
    const [cart, setCart] = useState<Cart | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Real-time cart subscription
    useEffect(() => {
        if (!user) {
            setCart(null);
            setLoading(false);
            return;
        }

        setLoading(true);
        const cartRef = doc(db, 'carts', user.uid);

        // Subscribe to real-time updates
        const unsubscribe = onSnapshot(
            cartRef,
            (docSnapshot) => {
                if (docSnapshot.exists()) {
                    setCart(docSnapshot.data() as Cart);
                } else {
                    setCart({
                        userId: user.uid,
                        items: [],
                        updatedAt: serverTimestamp() as any,
                    });
                }
                setLoading(false);
            },
            (err) => {
                console.error('Error fetching cart:', err);
                setError(err.message);
                setLoading(false);
            }
        );

        return () => unsubscribe();
    }, [user]);

    // Add item to cart
    const addItem = useCallback(
        async (productId: string, quantity: number = 1) => {
            if (!user) {
                throw new Error('Must be logged in to add items to cart');
            }

            try {
                setError(null);

                // Fetch product details
                const productDoc = await getDoc(doc(db, 'products', productId));
                if (!productDoc.exists()) {
                    throw new Error('Product not found');
                }

                const product = productDoc.data();
                const cartRef = doc(db, 'carts', user.uid);
                const cartDoc = await getDoc(cartRef);

                let updatedCart: Cart;

                if (cartDoc.exists()) {
                    const currentCart = cartDoc.data() as Cart;
                    const existingItemIndex = currentCart.items.findIndex(
                        (item) => item.productId === productId
                    );

                    if (existingItemIndex >= 0) {
                        // Update quantity
                        currentCart.items[existingItemIndex].quantity += quantity;
                    } else {
                        // Add new item
                        currentCart.items.push({
                            productId,
                            productName: product.name,
                            productImage: product.images[0],
                            price: product.price,
                            quantity,
                            supplierId: product.supplierId,
                        });
                    }

                    updatedCart = {
                        ...currentCart,
                        updatedAt: serverTimestamp() as any,
                    };
                } else {
                    // Create new cart
                    updatedCart = {
                        userId: user.uid,
                        items: [
                            {
                                productId,
                                productName: product.name,
                                productImage: product.images[0],
                                price: product.price,
                                quantity,
                                supplierId: product.supplierId,
                            },
                        ],
                        updatedAt: serverTimestamp() as any,
                    };
                }

                await setDoc(cartRef, updatedCart);
            } catch (err: any) {
                console.error('Error adding to cart:', err);
                setError(err.message);
                throw err;
            }
        },
        [user]
    );

    // Update item quantity
    const updateQuantity = useCallback(
        async (productId: string, quantity: number) => {
            if (!user || !cart) return;

            try {
                setError(null);

                const itemIndex = cart.items.findIndex((item) => item.productId === productId);
                if (itemIndex < 0) {
                    throw new Error('Item not found in cart');
                }

                const updatedItems = [...cart.items];

                if (quantity === 0) {
                    // Remove item
                    updatedItems.splice(itemIndex, 1);
                } else {
                    // Update quantity
                    updatedItems[itemIndex].quantity = quantity;
                }

                const updatedCart: Cart = {
                    ...cart,
                    items: updatedItems,
                    updatedAt: serverTimestamp() as any,
                };

                await setDoc(doc(db, 'carts', user.uid), updatedCart);
            } catch (err: any) {
                console.error('Error updating cart:', err);
                setError(err.message);
                throw err;
            }
        },
        [user, cart]
    );

    // Remove item from cart
    const removeItem = useCallback(
        async (productId: string) => {
            if (!user || !cart) return;

            try {
                setError(null);

                const updatedItems = cart.items.filter((item) => item.productId !== productId);

                const updatedCart: Cart = {
                    ...cart,
                    items: updatedItems,
                    updatedAt: serverTimestamp() as any,
                };

                await setDoc(doc(db, 'carts', user.uid), updatedCart);
            } catch (err: any) {
                console.error('Error removing from cart:', err);
                setError(err.message);
                throw err;
            }
        },
        [user, cart]
    );

    // Clear cart
    const clearCart = useCallback(async () => {
        if (!user) return;

        try {
            setError(null);

            const emptyCart: Cart = {
                userId: user.uid,
                items: [],
                updatedAt: serverTimestamp() as any,
            };

            await setDoc(doc(db, 'carts', user.uid), emptyCart);
        } catch (err: any) {
            console.error('Error clearing cart:', err);
            setError(err.message);
            throw err;
        }
    }, [user]);

    // Calculate totals
    const subtotal = cart?.items.reduce((sum, item) => sum + item.price * item.quantity, 0) || 0;
    const tax = subtotal * 0.1; // 10% tax
    const shippingFee = cart && cart.items.length > 0 ? 10 : 0;
    const total = subtotal + tax + shippingFee;
    const itemCount = cart?.items.reduce((sum, item) => sum + item.quantity, 0) || 0;

    return {
        cart,
        loading,
        error,
        addItem,
        updateQuantity,
        removeItem,
        clearCart,
        subtotal,
        tax,
        shippingFee,
        total,
        itemCount,
    };
}
