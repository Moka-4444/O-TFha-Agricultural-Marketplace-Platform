import { NextRequest, NextResponse } from 'next/server';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Order } from '@/types/firebase';

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        const orderDoc = await getDoc(doc(db, 'orders', id));

        if (!orderDoc.exists()) {
            return NextResponse.json({
                success: false,
                error: 'Order not found',
            }, { status: 404 });
        }

        const order: Order = {
            id: orderDoc.id,
            ...orderDoc.data()
        } as Order;

        return NextResponse.json({
            success: true,
            data: order,
        });

    } catch (error: any) {
        console.error('Error fetching order:', error);

        return NextResponse.json({
            success: false,
            error: 'Failed to fetch order',
        }, { status: 500 });
    }
}
