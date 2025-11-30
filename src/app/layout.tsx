import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Using Inter as a standard modern font
import "./globals.css";
import { Navbar } from "@/components/layouts/Navbar";
import { Footer } from "@/components/layouts/Footer";
import { AuthProvider } from "@/lib/auth/auth-context";
import { Toaster } from 'sonner';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AgriMarket - Agriculture Marketplace",
  description: "Connect farmers with suppliers for quality agricultural products",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <Toaster position="top-right" richColors />
        </AuthProvider>
      </body>
    </html>
  );
}
