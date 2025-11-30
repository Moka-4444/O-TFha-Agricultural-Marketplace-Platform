import Link from 'next/link';
import { Leaf, Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function Footer() {
    return (
        <footer className="bg-muted/30 border-t pt-16 pb-8">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                    {/* Brand */}
                    <div className="space-y-4">
                        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-primary">
                            <Leaf className="h-6 w-6 fill-primary" />
                            <span>AgriMarket</span>
                        </Link>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                            Your trusted partner in modern agriculture. Connecting farmers with verified suppliers for quality products and sustainable growth.
                        </p>
                        <div className="flex gap-4">
                            <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-primary">
                                <Facebook className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-primary">
                                <Twitter className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-primary">
                                <Instagram className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-primary">
                                <Linkedin className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>
                                <Link href="/products" className="hover:text-primary transition-colors">
                                    Browse Products
                                </Link>
                            </li>
                            <li>
                                <Link href="/suppliers" className="hover:text-primary transition-colors">
                                    Find Suppliers
                                </Link>
                            </li>
                            <li>
                                <Link href="/about" className="hover:text-primary transition-colors">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link href="/blog" className="hover:text-primary transition-colors">
                                    Farming Blog
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="font-semibold mb-4">Contact Us</h3>
                        <ul className="space-y-3 text-sm text-muted-foreground">
                            <li className="flex items-start gap-2">
                                <MapPin className="h-4 w-4 mt-0.5 text-primary" />
                                <span>123 Farm Road, Agro City, CA 90210</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Phone className="h-4 w-4 text-primary" />
                                <span>+1 (555) 123-4567</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Mail className="h-4 w-4 text-primary" />
                                <span>support@agrimarket.com</span>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="font-semibold mb-4">Newsletter</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                            Subscribe to get the latest farming tips and market updates.
                        </p>
                        <div className="flex gap-2">
                            <Input placeholder="Enter your email" className="bg-background" />
                            <Button>Subscribe</Button>
                        </div>
                    </div>
                </div>

                <div className="border-t pt-8 text-center text-sm text-muted-foreground">
                    <p>&copy; {new Date().getFullYear()} AgriMarket. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
