import { doc, setDoc, getDoc, updateDoc, deleteDoc, serverTimestamp, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

// Generate a random 6-digit OTP
export function generateOTP(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

// Send OTP (Simulated for now, saves to Firestore)
export async function sendOTP(userId: string, email: string): Promise<string> {
    const otp = generateOTP();
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 10); // Expires in 10 minutes

    const otpData = {
        code: otp,
        email,
        expiresAt: Timestamp.fromDate(expiresAt),
        createdAt: serverTimestamp(),
    };

    // Save OTP to Firestore
    await setDoc(doc(db, 'otp_codes', userId), otpData);

    // Send email via API route
    try {
        const response = await fetch('/api/send-otp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, code: otp }),
        });

        const result = await response.json();
        if (!result.success) {
            console.error('Failed to send email:', result.message);
        }
    } catch (error) {
        console.error('Error calling send-otp API:', error);
    }

    console.log(`OTP for ${email}: ${otp}`); // Keep log for debug

    return otp;
}

// Verify OTP
export async function verifyOTP(userId: string, code: string): Promise<{ success: boolean; message: string }> {
    try {
        const otpRef = doc(db, 'otp_codes', userId);
        const otpDoc = await getDoc(otpRef);

        if (!otpDoc.exists()) {
            return { success: false, message: 'Invalid or expired code' };
        }

        const data = otpDoc.data();
        const now = new Date();
        const expiresAt = data.expiresAt.toDate();

        if (now > expiresAt) {
            return { success: false, message: 'Code has expired. Please request a new one.' };
        }

        if (data.code !== code) {
            return { success: false, message: 'Invalid code. Please try again.' };
        }

        // Code is valid, update user verification status
        const userRef = doc(db, 'users', userId);
        await updateDoc(userRef, {
            isEmailVerified: true,
            updatedAt: serverTimestamp(),
        });

        // Delete the used OTP
        await deleteDoc(otpRef);

        return { success: true, message: 'Email verified successfully!' };
    } catch (error: any) {
        console.error('Error verifying OTP:', error);
        return { success: false, message: error.message || 'Failed to verify code' };
    }
}
