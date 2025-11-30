import Link from 'next/link';
import { LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface CategoryCardProps {
    name: string;
    icon: LucideIcon;
    href: string;
    color?: string;
}

export function CategoryCard({ name, icon: Icon, href, color = "bg-primary/10" }: CategoryCardProps) {
    return (
        <Link href={href}>
            <Card className="hover:shadow-md transition-shadow border-none bg-muted/30">
                <CardContent className="p-6 flex flex-col items-center justify-center gap-4 text-center h-full">
                    <div className={`p-4 rounded-full ${color}`}>
                        <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <span className="font-medium text-lg">{name}</span>
                </CardContent>
            </Card>
        </Link>
    );
}
