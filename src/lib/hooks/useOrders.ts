'use client';

import { useState, useEffect } from 'react';
import { collection, query, where, getDocs, orderBy, onSnapshot, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/lib/auth/auth-context';
import { Order } from '@/types/firebase';

export function useOrders() {
    const { user } = useAuth();
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!user) {
            setOrders([]);
            setLoading(false);
            return;
        }

        setLoading(true);

        // Real-time subscription to user's orders
        const ordersQuery = query(
            collection(db, 'orders'),
            where('userId', '==', user.uid),
            orderBy('createdAt', 'desc')
        );

        const unsubscribe = onSnapshot(
            ordersQuery,
            (querySnapshot) => {
                const fetchedOrders: Order[] = [];
                querySnapshot.forEach((doc) => {
                    fetchedOrders.push({ id: doc.id, ...doc.data() } as Order);
                });
                setOrders(fetchedOrders);
                setLoading(false);
            },
            (err) => {
                console.error('Error fetching orders:', err);
                setError(err.message);
                setLoading(false);
            }
        );

        return () => unsubscribe();
    }, [user]);

    return { orders, loading, error };
}

// Hook to fetch a single order with real-time updates
export function useOrder(orderId: string | null) {
    const [order, setOrder] = useState<Order | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!orderId) {
            setOrder(null);
            setLoading(false);
            return;
        }

        setLoading(true);

        // Real-time subscription to single order
        const orderRef = doc(db, 'orders', orderId);

        const unsubscribe = onSnapshot(
            orderRef,
            (docSnapshot) => {
                if (docSnapshot.exists()) {
                    setOrder({ id: docSnapshot.id, ...docSnapshot.data() } as Order);
                } else {
                    setOrder(null);
                    setError('Order not found');
                }
                setLoading(false);
            },
            (err) => {
                console.error('Error fetching order:', err);
                setError(err.message);
                setLoading(false);
            }
        );

        return () => unsubscribe();
    }, [orderId]);

    return { order, loading, error };
}
