import { Timestamp } from 'firebase/firestore';

// User roles
export type UserRole = 'farmer' | 'supplier' | 'admin';

// User interface
export interface User {
    uid: string;
    name: string;
    email: string;
    phone?: string;
    role: UserRole;
    photoURL?: string;
    createdAt: Timestamp;
    updatedAt: Timestamp;
    // Farmer-specific fields
    farmName?: string;
    farmSize?: number;
    farmLocation?: string;
    // Supplier-specific fields
    businessName?: string;
    businessLicense?: string;
    verified?: boolean;
    isEmailVerified?: boolean;
}

// Product interface
export interface Product {
    id: string;
    name: string;
    category: string;
    price: number;
    bulkPricing?: BulkPricing[];
    description: string;
    images: string[];
    supplierId: string;
    supplierName?: string;
    rating: number;
    reviewCount: number;
    stock: number;
    unit: string;
    isOrganic?: boolean;
    tags?: string[];
    createdAt: Timestamp;
    updatedAt: Timestamp;
}

export interface BulkPricing {
    minQuantity: number;
    price: number;
}

// Cart interface
export interface Cart {
    userId: string;
    items: CartItem[];
    updatedAt: Timestamp;
}

export interface CartItem {
    productId: string;
    productName: string;
    productImage: string;
    price: number;
    quantity: number;
    supplierId: string;
}

// Order interface
export interface Order {
    id: string;
    userId: string;
    userName: string;
    userEmail: string;
    items: OrderItem[];
    status: OrderStatus;
    total: number;
    subtotal: number;
    tax: number;
    shippingFee: number;
    createdAt: Timestamp;
    updatedAt: Timestamp;
    deliveryInfo: DeliveryInfo;
    paymentInfo: PaymentInfo;
    trackingNumber?: string;
    estimatedDelivery?: Timestamp;
}

export interface OrderItem {
    productId: string;
    productName: string;
    productImage: string;
    price: number;
    quantity: number;
    supplierId: string;
    supplierName: string;
}

export type OrderStatus =
    | 'pending'
    | 'confirmed'
    | 'processing'
    | 'shipped'
    | 'delivered'
    | 'cancelled';

export interface DeliveryInfo {
    fullName: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    notes?: string;
}

export interface PaymentInfo {
    method: 'card' | 'cash' | 'bank_transfer';
    status: 'pending' | 'completed' | 'failed';
    transactionId?: string;
}

// Review interface
export interface Review {
    id: string;
    productId: string;
    userId: string;
    userName: string;
    userPhoto?: string;
    rating: number;
    comment: string;
    images?: string[];
    createdAt: Timestamp;
    helpful: number;
}

// API Response types
export interface ApiResponse<T = any> {
    success: boolean;
    data?: T;
    error?: string;
    message?: string;
}
