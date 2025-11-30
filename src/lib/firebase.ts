import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getStorage, FirebaseStorage } from 'firebase/storage';
import { FIREBASE_CONFIG } from './firebase-config';

// Initialize Firebase
let app: FirebaseApp;
if (!getApps().length) {
    app = initializeApp(FIREBASE_CONFIG);
} else {
    app = getApps()[0];
}

// Initialize Firebase services
export const auth: Auth = getAuth(app);
export const db: Firestore = getFirestore(app);
export const storage: FirebaseStorage = getStorage(app);
export { app };
