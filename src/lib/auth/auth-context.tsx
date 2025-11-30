'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import {
    User as FirebaseUser,
    onAuthStateChanged,
    signOut as firebaseSignOut
} from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { User, UserRole } from '@/types/firebase';

interface AuthContextType {
    user: User | null;
    firebaseUser: FirebaseUser | null;
    loading: boolean;
    signOut: () => Promise<void>;
    refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    firebaseUser: null,
    loading: true,
    signOut: async () => { },
    refreshUser: async () => { },
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchUserData = async (firebaseUser: FirebaseUser) => {
        try {
            const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
            if (userDoc.exists()) {
                setUser(userDoc.data() as User);
            } else {
                setUser(null);
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
            setUser(null);
        }
    };

    const refreshUser = async () => {
        if (firebaseUser) {
            await fetchUserData(firebaseUser);
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            setFirebaseUser(firebaseUser);

            if (firebaseUser) {
                await fetchUserData(firebaseUser);
            } else {
                setUser(null);
            }

            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const signOut = async () => {
        try {
            await firebaseSignOut(auth);
            setUser(null);
            setFirebaseUser(null);
        } catch (error) {
            console.error('Error signing out:', error);
            throw error;
        }
    };

    return (
        <AuthContext.Provider value={{ user, firebaseUser, loading, signOut, refreshUser }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

// Helper function to check if user has a specific role
export function useRole(role: UserRole): boolean {
    const { user } = useAuth();
    return user?.role === role;
}

// Helper function to check if user is authenticated
export function useIsAuthenticated(): boolean {
    const { user } = useAuth();
    return user !== null;
}
