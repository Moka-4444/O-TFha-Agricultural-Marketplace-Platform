'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
    LayoutDashboard,
    Tractor,
    ShoppingBag,
    CreditCard,
    MessageSquare,
    CloudSun,
    Package,
    BarChart3,
    Users,
    ShieldAlert,
    FileText,
    Settings,
    LogOut,
    Leaf
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/hooks';

const farmerLinks = [
    { name: 'Overview', href: '/farmer/overview', icon: LayoutDashboard },
    { name: 'My Farm', href: '/farmer/my-farm', icon: Tractor },
    { name: 'Orders', href: '/farmer/orders', icon: ShoppingBag },
    { name: 'Loan Requests', href: '/farmer/loans', icon: CreditCard },
    { name: 'Messages', href: '/farmer/messages', icon: MessageSquare },
];

const supplierLinks = [
    { name: 'Overview', href: '/supplier/overview', icon: LayoutDashboard },
    { name: 'Products', href: '/supplier/products', icon: Package },
    { name: 'Inventory', href: '/supplier/inventory', icon: FileText },
    { name: 'Orders', href: '/supplier/orders', icon: ShoppingBag },
    { name: 'Finance', href: '/supplier/finance', icon: BarChart3 },
    { name: 'Chats', href: '/supplier/chats', icon: MessageSquare },
];

const adminLinks = [
    { name: 'Users', href: '/admin/users', icon: Users },
    { name: 'Verification', href: '/admin/verification', icon: ShieldAlert },
    { name: 'Moderation', href: '/admin/moderation', icon: FileText },
    { name: 'Orders', href: '/admin/orders', icon: ShoppingBag },
    { name: 'Disputes', href: '/admin/disputes', icon: MessageSquare },
    { name: 'Finance', href: '/admin/finance', icon: BarChart3 },
];

export function DashboardSidebar() {
    const pathname = usePathname();
    const router = useRouter();
    const { signOut } = useAuth();

    let links = farmerLinks;
    let roleLabel = 'Farmer Dashboard';

    if (pathname.includes('/supplier')) {
        links = supplierLinks;
        roleLabel = 'Supplier Dashboard';
    } else if (pathname.includes('/admin')) {
        links = adminLinks;
        roleLabel = 'Admin Dashboard';
    }

    const handleLogout = async () => {
        try {
            await signOut();
            router.push('/login');
        } catch (error) {
            console.error('Logout failed', error);
        }
    };

    return (
        <div className="flex h-full flex-col border-r bg-muted/10">
            <div className="flex h-16 items-center border-b px-6">
                <Link href="/" className="flex items-center gap-2 font-bold text-xl text-primary">
                    <Leaf className="h-6 w-6 fill-primary" />
                    <span>AgriMarket</span>
                </Link>
            </div>

            <div className="px-4 py-4">
                <h2 className="mb-2 px-2 text-xs font-semibold uppercase text-muted-foreground tracking-wider">
                    {roleLabel}
                </h2>
                <nav className="space-y-1">
                    {links.map((link) => {
                        const Icon = link.icon;
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={cn(
                                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-primary/10 hover:text-primary",
                                    isActive ? "bg-primary/10 text-primary" : "text-muted-foreground"
                                )}
                            >
                                <Icon className="h-4 w-4" />
                                {link.name}
                            </Link>
                        );
                    })}
                </nav>
            </div>

            <div className="mt-auto p-4 border-t">
                <nav className="space-y-1">
                    <Link
                        href="/settings"
                        className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary"
                    >
                        <Settings className="h-4 w-4" />
                        Settings
                    </Link>
                    <Button
                        variant="ghost"
                        className="w-full justify-start gap-3 px-3 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                        onClick={handleLogout}
                    >
                        <LogOut className="h-4 w-4" />
                        Log Out
                    </Button>
                </nav>
            </div>
        </div>
    );
}
