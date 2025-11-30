import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
    let email = '';
    let code = '';

    try {
        const body = await request.json();
        email = body.email;
        code = body.code;

        if (!email || !code) {
            return NextResponse.json(
                { success: false, message: 'Email and code are required' },
                { status: 400 }
            );
        }

        const user = process.env.EMAIL_USER;
        const pass = process.env.EMAIL_PASS;

        // Diagnostic logging (Safe: does not log actual secrets)
        console.log(`[OTP-API] Request for: ${email}`);

        // Requested Test Logs
        console.log("[ENV-DEBUG-USER]", process.env.EMAIL_USER);
        console.log("[ENV-DEBUG-PASS]", process.env.EMAIL_PASS ? "LOADED" : "MISSING");

        if (!user || !pass) {
            console.error('[OTP-API] CRITICAL ERROR: Missing email configuration in .env.local');
            return NextResponse.json(
                { success: false, message: 'Server configuration error: Missing email credentials' },
                { status: 500 }
            );
        }

        // Clean password (remove spaces if copied directly from Google)
        const cleanPass = pass.replace(/\s/g, '');

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user,
                pass: cleanPass,
            },
        });

        // Verify connection configuration
        try {
            await transporter.verify();
            console.log('[OTP-API] SMTP Connection verified successfully');
        } catch (connError: any) {
            console.error('[OTP-API] SMTP Connection Failed:', connError.message);
            throw new Error(`SMTP Connection Failed: ${connError.message}`);
        }

        const mailOptions = {
            from: `"AgriMarket" <${user}>`,
            to: email,
            subject: 'Your Verification Code - AgriMarket',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
                    <div style="text-align: center; margin-bottom: 20px;">
                        <h1 style="color: #16a34a; margin: 0;">AgriMarket</h1>
                    </div>
                    <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; text-align: center;">
                        <p style="color: #4b5563; font-size: 16px; margin-bottom: 10px;">Your verification code is:</p>
                        <h2 style="color: #111827; font-size: 32px; letter-spacing: 5px; margin: 10px 0;">${code}</h2>
                        <p style="color: #6b7280; font-size: 14px; margin-top: 10px;">This code will expire in 10 minutes.</p>
                    </div>
                    <div style="text-align: center; margin-top: 20px; color: #9ca3af; font-size: 12px;">
                        <p>If you didn't request this code, please ignore this email.</p>
                    </div>
                </div>
            `,
        };

        await transporter.sendMail(mailOptions);
        console.log('[OTP-API] Email sent successfully!');

        return NextResponse.json({ success: true, message: 'Email sent successfully' });
    } catch (error: any) {
        console.error('[OTP-API] Error sending email:', error);

        // NO FALLBACK - Fail explicitly as requested
        return NextResponse.json(
            { success: false, message: error.message || 'Failed to send email' },
            { status: 500 }
        );
    }
}
