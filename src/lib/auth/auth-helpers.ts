import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    sendPasswordResetEmail,
    updateProfile,
    sendEmailVerification,
} from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { User, UserRole } from '@/types/firebase';
import { SignupInput, LoginInput } from '@/lib/validations/auth';

// Sign up with email and password
export async function signUpWithEmail(data: SignupInput): Promise<User> {
    try {
        // Create Firebase Auth user
        const userCredential = await createUserWithEmailAndPassword(
            auth,
            data.email,
            data.password
        );

        const firebaseUser = userCredential.user;

        // Update display name
        await updateProfile(firebaseUser, {
            displayName: data.name,
        });

        // Send verification email
        await sendEmailVerification(firebaseUser);

        // Create user document in Firestore
        // Create user document in Firestore
        const userData: any = {
            uid: firebaseUser.uid,
            name: data.name,
            email: data.email,
            role: data.role,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
            isEmailVerified: false,
        };

        // Add optional fields only if they exist
        if (data.phone) userData.phone = data.phone;
        if (firebaseUser.photoURL) userData.photoURL = firebaseUser.photoURL;

        // Farmer-specific fields
        if (data.farmName) userData.farmName = data.farmName;
        if (data.farmSize) userData.farmSize = data.farmSize;
        if (data.farmLocation) userData.farmLocation = data.farmLocation;

        // Supplier-specific fields
        if (data.businessName) userData.businessName = data.businessName;
        if (data.businessLicense) userData.businessLicense = data.businessLicense;
        if (data.role === 'supplier') userData.verified = false;

        await setDoc(doc(db, 'users', firebaseUser.uid), userData);

        // Set custom claims for role (this would typically be done server-side)
        // For now, we'll store the role in Firestore and handle it client-side

        return userData;
    } catch (error: any) {
        console.error('Error signing up:', error);
        // Rethrow the error with the code property preserved
        if (error.code) {
            throw error;
        }
        throw new Error(error.message || 'Failed to sign up');
    }
}

// Sign in with email and password
export async function signInWithEmail(data: LoginInput): Promise<void> {
    try {
        await signInWithEmailAndPassword(auth, data.email, data.password);
    } catch (error: any) {
        console.error('Error signing in:', error);

        // Provide user-friendly error messages
        if (error.code === 'auth/invalid-credential') {
            throw new Error('Invalid email or password');
        } else if (error.code === 'auth/user-not-found') {
            throw new Error('No account found with this email');
        } else if (error.code === 'auth/wrong-password') {
            throw new Error('Incorrect password');
        } else if (error.code === 'auth/too-many-requests') {
            throw new Error('Too many failed attempts. Please try again later');
        }

        throw new Error(error.message || 'Failed to sign in');
    }
}

// Sign in with Google
export async function signInWithGoogle(): Promise<User | null> {
    try {
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);
        const firebaseUser = result.user;

        // Check if user document exists
        const userDocRef = doc(db, 'users', firebaseUser.uid);
        const userDoc = await import('firebase/firestore').then(({ getDoc }) =>
            getDoc(userDocRef)
        );

        if (!userDoc.exists()) {
            // Create new user document for first-time Google sign-in
            const userData: User = {
                uid: firebaseUser.uid,
                name: firebaseUser.displayName || 'User',
                email: firebaseUser.email!,
                role: 'farmer', // Default role, can be changed later
                photoURL: firebaseUser.photoURL || undefined,
                createdAt: serverTimestamp() as any,
                updatedAt: serverTimestamp() as any,
                isEmailVerified: true, // Google sign-in is verified by default
            };

            await setDoc(userDocRef, userData);
            return userData;
        }

        return userDoc.data() as User;
    } catch (error: any) {
        console.error('Error signing in with Google:', error);

        if (error.code === 'auth/popup-closed-by-user') {
            throw new Error('Sign-in cancelled');
        } else if (error.code === 'auth/popup-blocked') {
            throw new Error('Pop-up blocked. Please allow pop-ups for this site');
        }

        throw new Error(error.message || 'Failed to sign in with Google');
    }
}

// Send verification email
export async function sendVerificationEmail(): Promise<void> {
    const user = auth.currentUser;
    if (!user) throw new Error('No user logged in');

    try {
        await sendEmailVerification(user);
    } catch (error: any) {
        console.error('Error sending verification email:', error);
        if (error.code === 'auth/too-many-requests') {
            throw new Error('Too many requests. Please try again later');
        }
        throw new Error(error.message || 'Failed to send verification email');
    }
}

// Send password reset email
export async function resetPassword(email: string): Promise<void> {
    try {
        await sendPasswordResetEmail(auth, email);
    } catch (error: any) {
        console.error('Error sending password reset email:', error);

        if (error.code === 'auth/user-not-found') {
            throw new Error('No account found with this email');
        } else if (error.code === 'auth/invalid-email') {
            throw new Error('Invalid email address');
        }

        throw new Error(error.message || 'Failed to send password reset email');
    }
}

// Sign out
export async function signOut(): Promise<void> {
    try {
        await auth.signOut();
    } catch (error: any) {
        console.error('Error signing out:', error);
        throw new Error(error.message || 'Failed to sign out');
    }
}

// Get current user's ID token
export async function getCurrentUserToken(): Promise<string | null> {
    const user = auth.currentUser;
    if (!user) return null;

    try {
        return await user.getIdToken();
    } catch (error) {
        console.error('Error getting user token:', error);
        return null;
    }
}
