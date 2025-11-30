// This file should only be imported in server-side code (API routes, server components)
// DO NOT import this in client components

let adminApp: any;
let adminAuth: any;
let adminDb: any;

// Lazy initialization to avoid errors during build
function initializeAdmin() {
    if (typeof window !== 'undefined') {
        throw new Error('Firebase Admin SDK can only be used on the server side');
    }

    if (!adminApp) {
        const { initializeApp, getApps } = require('firebase-admin/app');
        const { getAuth } = require('firebase-admin/auth');
        const { getFirestore } = require('firebase-admin/firestore');

        if (!getApps().length) {
            adminApp = initializeApp({
                projectId: "o-tfha-36ac3",
            });
        } else {
            adminApp = getApps()[0];
        }

        adminAuth = getAuth(adminApp);
        adminDb = getFirestore(adminApp);
    }

    return { adminApp, adminAuth, adminDb };
}

// Helper function to verify Firebase ID token
export async function verifyIdToken(token: string) {
    try {
        const { adminAuth } = initializeAdmin();
        const decodedToken = await adminAuth.verifyIdToken(token);
        return decodedToken;
    } catch (error) {
        console.error('Error verifying token:', error);
        return null;
    }
}

// Helper function to set custom claims (for roles)
export async function setUserRole(uid: string, role: 'farmer' | 'supplier' | 'admin') {
    try {
        const { adminAuth } = initializeAdmin();
        await adminAuth.setCustomUserClaims(uid, { role });
        return true;
    } catch (error) {
        console.error('Error setting user role:', error);
        return false;
    }
}

// Export getters for admin instances
export function getAdminAuth() {
    const { adminAuth } = initializeAdmin();
    return adminAuth;
}

export function getAdminDb() {
    const { adminDb } = initializeAdmin();
    return adminDb;
}

export function getAdminApp() {
    const { adminApp } = initializeAdmin();
    return adminApp;
}
