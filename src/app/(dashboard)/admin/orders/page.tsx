import SupplierOrdersPage from '@/app/(dashboard)/supplier/orders/page';

export default function AdminOrdersPage() {
    return (
        <div>
            <div className="mb-6">
                <h1 className="text-3xl font-bold tracking-tight">All Platform Orders</h1>
                <p className="text-muted-foreground">View and manage orders across the entire marketplace.</p>
            </div>
            {/* Reusing the table structure from Supplier Orders but conceptually it would fetch all */}
            <SupplierOrdersPage />
        </div>
    );
}
