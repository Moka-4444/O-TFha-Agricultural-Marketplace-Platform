import { DashboardSidebar } from '@/components/layouts/DashboardSidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Bell, User } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen w-full">
            {/* Sidebar */}
            <div className="hidden md:block w-64 shrink-0">
                <div className="fixed inset-y-0 left-0 w-64">
                    <DashboardSidebar />
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Header */}
                <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-6">
                    <div className="w-full flex-1">
                        <form>
                            <div className="relative">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    type="search"
                                    placeholder="Search..."
                                    className="w-full bg-background pl-8 md:w-2/3 lg:w-1/3"
                                />
                            </div>
                        </form>
                    </div>
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="icon" className="relative">
                            <Bell className="h-5 w-5" />
                            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-600" />
                            <span className="sr-only">Notifications</span>
                        </Button>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="rounded-full">
                                    <User className="h-5 w-5" />
                                    <span className="sr-only">User menu</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>Profile</DropdownMenuItem>
                                <DropdownMenuItem>Settings</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>Log out</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 p-6 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}
