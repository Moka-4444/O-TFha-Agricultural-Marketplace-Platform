import { NextRequest, NextResponse } from 'next/server';
import { collection, addDoc, doc, getDoc, getDocs, query, where, orderBy, serverTimestamp, deleteDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { createOrderSchema } from '@/lib/validations/order';
import { Order, Cart } from '@/types/firebase';

// GET /api/orders - Get user's orders
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

        const ordersQuery = query(
            collection(db, 'orders'),
            where('userId', '==', userId),
            orderBy('createdAt', 'desc')
        );

        const ordersSnapshot = await getDocs(ordersQuery);
        const orders: Order[] = [];

        ordersSnapshot.forEach((doc) => {
            orders.push({ id: doc.id, ...doc.data() } as Order);
        });

        return NextResponse.json({
            success: true,
            data: orders,
        });

    } catch (error: any) {
        console.error('Error fetching orders:', error);
        return NextResponse.json({
            success: false,
            error: 'Failed to fetch orders',
        }, { status: 500 });
    }
}

// POST /api/orders - Create new order
export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { userId, userName, userEmail, ...orderData } = body;

        if (!userId) {
            return NextResponse.json({
                success: false,
                error: 'User ID required',
            }, { status: 400 });
        }

        const validatedData = createOrderSchema.parse(orderData);

        // Get user's cart
        const cartDoc = await getDoc(doc(db, 'carts', userId));
        if (!cartDoc.exists()) {
            return NextResponse.json({
                success: false,
                error: 'Cart is empty',
            }, { status: 400 });
        }

        const cart = cartDoc.data() as Cart;

        if (cart.items.length === 0) {
            return NextResponse.json({
                success: false,
                error: 'Cart is empty',
            }, { status: 400 });
        }

        // Calculate totals
        const subtotal = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const tax = subtotal * 0.1;
        const shippingFee = 10;
        const total = subtotal + tax + shippingFee;

        // Create order
        const newOrder: Omit<Order, 'id'> = {
            userId,
            userName: userName || 'Unknown',
            userEmail: userEmail || '',
            items: cart.items.map(item => ({
                productId: item.productId,
                productName: item.productName,
                productImage: item.productImage,
                price: item.price,
                quantity: item.quantity,
                supplierId: item.supplierId,
                supplierName: '',
            })),
            status: 'pending',
            total,
            subtotal,
            tax,
            shippingFee,
            deliveryInfo: validatedData.deliveryInfo,
            paymentInfo: {
                ...validatedData.paymentInfo,
                status: 'pending',
            },
            createdAt: serverTimestamp() as any,
            updatedAt: serverTimestamp() as any,
        };

        const orderRef = await addDoc(collection(db, 'orders'), newOrder);

        // Clear cart
        await deleteDoc(doc(db, 'carts', userId));

        return NextResponse.json({
            success: true,
            data: {
                id: orderRef.id,
                ...newOrder,
            },
            message: 'Order created successfully',
        }, { status: 201 });

    } catch (error: any) {
        console.error('Error creating order:', error);

        if (error.name === 'ZodError') {
            return NextResponse.json({
                success: false,
                error: 'Validation failed',
                details: error.errors,
            }, { status: 400 });
        }

        return NextResponse.json({
            success: false,
            error: 'Failed to create order',
        }, { status: 500 });
    }
}
