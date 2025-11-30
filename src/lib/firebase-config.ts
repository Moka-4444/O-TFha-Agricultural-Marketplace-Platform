// Environment variables for Firebase (optional - using public config for now)
// In production, you would use these for sensitive data

// Firebase Client Config (public - safe to expose)
export const FIREBASE_CONFIG = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyCWpc-5VnVdhUOEZirUtjlZPcRWVHcg_yA",
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "o-tfha-36ac3.firebaseapp.com",
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "o-tfha-36ac3",
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "o-tfha-36ac3.firebasestorage.app",
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "776513633062",
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:776513633062:web:0ceabfba82981b3effdfe7",
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "G-XGMT312MEP"
};

// Firebase Admin Config (server-side only)
export const FIREBASE_ADMIN_CONFIG = {
    projectId: process.env.FIREBASE_ADMIN_PROJECT_ID || "o-tfha-36ac3",
    // In production, you would add:
    // clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
    // privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, '\n'),
};
