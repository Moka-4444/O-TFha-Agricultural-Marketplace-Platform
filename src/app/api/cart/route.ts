import { NextRequest, NextResponse } from 'next/server';
import { doc, getDoc, setDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { addToCartSchema, updateCartItemSchema } from '@/lib/validations/cart';
import { Cart } from '@/types/firebase';

// Note: These routes currently don't have auth protection
// In production, you would add Firebase Admin SDK verification

// GET /api/cart - Get user's cart
export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const userId = searchParams.get('userId');

        if (!userId) {
            return NextResponse.json({
                success: false,
                error: 'User ID required',
            }, { status: 400 });
        }

        const cartDoc = await getDoc(doc(db, 'carts', userId));

        if (!cartDoc.exists()) {
            return NextResponse.json({
                success: true,
                data: {
                    userId,
                    items: [],
                    updatedAt: new Date(),
                },
            });
        }

        return NextResponse.json({
            success: true,
            data: cartDoc.data(),
        });

    } catch (error: any) {
        console.error('Error fetching cart:', error);
        return NextResponse.json({
            success: false,
            error: 'Failed to fetch cart',
        }, { status: 500 });
    }
}

// POST /api/cart - Add item to cart
export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { userId, ...itemData } = body;

        if (!userId) {
            return NextResponse.json({
                success: false,
                error: 'User ID required',
            }, { status: 400 });
        }

        const validatedData = addToCartSchema.parse(itemData);

        // Fetch product details
        const productDoc = await getDoc(doc(db, 'products', validatedData.productId));
        if (!productDoc.exists()) {
            return NextResponse.json({
                success: false,
                error: 'Product not found',
            }, { status: 404 });
        }

        const product = productDoc.data();

        // Get current cart
        const cartRef = doc(db, 'carts', userId);
        const cartDoc = await getDoc(cartRef);

        let cart: Cart;

        if (cartDoc.exists()) {
            cart = cartDoc.data() as Cart;

            const existingItemIndex = cart.items.findIndex(
                item => item.productId === validatedData.productId
            );

            if (existingItemIndex >= 0) {
                cart.items[existingItemIndex].quantity += validatedData.quantity;
            } else {
                cart.items.push({
                    productId: validatedData.productId,
                    productName: product.name,
                    productImage: product.images[0],
                    price: product.price,
                    quantity: validatedData.quantity,
                    supplierId: product.supplierId,
                });
            }
        } else {
            cart = {
                userId,
                items: [{
                    productId: validatedData.productId,
                    productName: product.name,
                    productImage: product.images[0],
                    price: product.price,
                    quantity: validatedData.quantity,
                    supplierId: product.supplierId,
                }],
                updatedAt: serverTimestamp() as any,
            };
        }

        cart.updatedAt = serverTimestamp() as any;
        await setDoc(cartRef, cart);

        return NextResponse.json({
            success: true,
            data: cart,
            message: 'Item added to cart',
        });

    } catch (error: any) {
        console.error('Error adding to cart:', error);

        if (error.name === 'ZodError') {
            return NextResponse.json({
                success: false,
                error: 'Validation failed',
                details: error.errors,
            }, { status: 400 });
        }

        return NextResponse.json({
            success: false,
            error: 'Failed to add item to cart',
        }, { status: 500 });
    }
}

// PUT /api/cart - Update cart item quantity
export async function PUT(req: NextRequest) {
    try {
        const body = await req.json();
        const { userId, ...itemData } = body;

        if (!userId) {
            return NextResponse.json({
                success: false,
                error: 'User ID required',
            }, { status: 400 });
        }

        const validatedData = updateCartItemSchema.parse(itemData);

        const cartRef = doc(db, 'carts', userId);
        const cartDoc = await getDoc(cartRef);

        if (!cartDoc.exists()) {
            return NextResponse.json({
                success: false,
                error: 'Cart not found',
            }, { status: 404 });
        }

        const cart = cartDoc.data() as Cart;

        const itemIndex = cart.items.findIndex(
            item => item.productId === validatedData.productId
        );

        if (itemIndex < 0) {
            return NextResponse.json({
                success: false,
                error: 'Item not found in cart',
            }, { status: 404 });
        }

        if (validatedData.quantity === 0) {
            cart.items.splice(itemIndex, 1);
        } else {
            cart.items[itemIndex].quantity = validatedData.quantity;
        }

        cart.updatedAt = serverTimestamp() as any;
        await setDoc(cartRef, cart);

        return NextResponse.json({
            success: true,
            data: cart,
            message: 'Cart updated',
        });

    } catch (error: any) {
        console.error('Error updating cart:', error);

        if (error.name === 'ZodError') {
            return NextResponse.json({
                success: false,
                error: 'Validation failed',
                details: error.errors,
            }, { status: 400 });
        }

        return NextResponse.json({
            success: false,
            error: 'Failed to update cart',
        }, { status: 500 });
    }
}

// DELETE /api/cart - Clear cart or remove item
export async function DELETE(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const userId = searchParams.get('userId');
        const productId = searchParams.get('productId');

        if (!userId) {
            return NextResponse.json({
                success: false,
                error: 'User ID required',
            }, { status: 400 });
        }

        const cartRef = doc(db, 'carts', userId);

        if (!productId) {
            await setDoc(cartRef, {
                userId,
                items: [],
                updatedAt: serverTimestamp(),
            });

            return NextResponse.json({
                success: true,
                message: 'Cart cleared',
            });
        }

        const cartDoc = await getDoc(cartRef);
        if (!cartDoc.exists()) {
            return NextResponse.json({
                success: false,
                error: 'Cart not found',
            }, { status: 404 });
        }

        const cart = cartDoc.data() as Cart;
        cart.items = cart.items.filter(item => item.productId !== productId);
        cart.updatedAt = serverTimestamp() as any;

        await setDoc(cartRef, cart);

        return NextResponse.json({
            success: true,
            data: cart,
            message: 'Item removed from cart',
        });

    } catch (error: any) {
        console.error('Error deleting from cart:', error);
        return NextResponse.json({
            success: false,
            error: 'Failed to delete from cart',
        }, { status: 500 });
    }
}
