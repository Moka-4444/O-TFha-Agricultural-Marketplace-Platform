// Sample data script to populate Firestore with test data
// Run this once to add sample products, users, etc.

import { collection, addDoc, setDoc, doc, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';

export const sampleProducts = [
    {
        name: 'Premium Organic Seeds Collection',
        category: 'seeds',
        price: 49.99,
        description: 'High-quality organic seeds for various vegetables including tomatoes, peppers, and lettuce. Perfect for home gardens and small farms.',
        images: [
            'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=800&q=80',
            'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&q=80',
        ],
        supplierId: 'sample-supplier-1',
        supplierName: 'Organic Seeds Co',
        rating: 4.8,
        reviewCount: 24,
        stock: 150,
        unit: 'pack',
        isOrganic: true,
        tags: ['organic', 'vegetables', 'seeds'],
    },
    {
        name: 'Bio-Organic Fertilizer 50kg',
        category: 'fertilizers',
        price: 89.99,
        bulkPricing: [
            { minQuantity: 5, price: 84.99 },
            { minQuantity: 10, price: 79.99 },
        ],
        description: 'Premium organic fertilizer made from natural ingredients. Enriches soil and promotes healthy plant growth.',
        images: [
            'https://images.unsplash.com/photo-1628352081506-83c43123ed6d?w=800&q=80',
        ],
        supplierId: 'sample-supplier-2',
        supplierName: 'Natural Fertilizers',
        rating: 4.7,
        reviewCount: 18,
        stock: 200,
        unit: 'bag',
        isOrganic: true,
        tags: ['organic', 'fertilizer', 'soil'],
    },
    {
        name: 'Smart Irrigation System',
        category: 'equipment',
        price: 499.99,
        description: 'Automated irrigation system with smart sensors and mobile app control. Save water and optimize crop growth.',
        images: [
            'https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?w=800&q=80',
        ],
        supplierId: 'sample-supplier-3',
        supplierName: 'Farm Equipment Pro',
        rating: 4.9,
        reviewCount: 12,
        stock: 45,
        unit: 'unit',
        isOrganic: false,
        tags: ['equipment', 'irrigation', 'smart'],
    },
    {
        name: 'Fresh Organic Vegetables Box',
        category: 'produce',
        price: 29.99,
        description: 'Weekly box of fresh organic vegetables directly from local farms. Includes seasonal varieties.',
        images: [
            'https://images.unsplash.com/photo-1595855709915-bd989963c635?w=800&q=80',
        ],
        supplierId: 'sample-supplier-1',
        supplierName: 'Green Valley Farms',
        rating: 4.6,
        reviewCount: 45,
        stock: 100,
        unit: 'box',
        isOrganic: true,
        tags: ['organic', 'vegetables', 'fresh'],
    },
    {
        name: 'NPK Fertilizer 25kg',
        category: 'fertilizers',
        price: 45.99,
        bulkPricing: [
            { minQuantity: 10, price: 42.99 },
            { minQuantity: 20, price: 39.99 },
        ],
        description: 'Balanced NPK fertilizer for all crops. Provides essential nutrients for optimal growth.',
        images: [
            'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&q=80',
        ],
        supplierId: 'sample-supplier-2',
        supplierName: 'Natural Fertilizers',
        rating: 4.5,
        reviewCount: 32,
        stock: 300,
        unit: 'bag',
        isOrganic: false,
        tags: ['fertilizer', 'npk', 'nutrients'],
    },
    {
        name: 'Corn Seeds - Hybrid Variety',
        category: 'seeds',
        price: 35.99,
        description: 'High-yield hybrid corn seeds suitable for various climates. Disease resistant and fast growing.',
        images: [
            'https://images.unsplash.com/photo-1551030173-122aabc4489c?w=800&q=80',
        ],
        supplierId: 'sample-supplier-1',
        supplierName: 'Organic Seeds Co',
        rating: 4.7,
        reviewCount: 28,
        stock: 180,
        unit: 'kg',
        isOrganic: false,
        tags: ['seeds', 'corn', 'hybrid'],
    },
    {
        name: 'Garden Tractor - 25HP',
        category: 'equipment',
        price: 8999.99,
        description: 'Powerful garden tractor perfect for small to medium farms. Includes multiple attachments.',
        images: [
            'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&q=80',
        ],
        supplierId: 'sample-supplier-3',
        supplierName: 'Farm Equipment Pro',
        rating: 4.8,
        reviewCount: 8,
        stock: 12,
        unit: 'unit',
        isOrganic: false,
        tags: ['equipment', 'tractor', 'machinery'],
    },
    {
        name: 'Organic Pesticide Spray',
        category: 'fertilizers',
        price: 24.99,
        description: 'Natural organic pesticide safe for crops and environment. Effective against common pests.',
        images: [
            'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&q=80',
        ],
        supplierId: 'sample-supplier-2',
        supplierName: 'Natural Fertilizers',
        rating: 4.4,
        reviewCount: 15,
        stock: 250,
        unit: 'liter',
        isOrganic: true,
        tags: ['organic', 'pesticide', 'spray'],
    },
];

export async function addSampleProducts() {
    try {
        console.log('Adding sample products to Firestore...');

        for (const product of sampleProducts) {
            const productData = {
                ...product,
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp(),
            };

            await addDoc(collection(db, 'products'), productData);
            console.log(`Added: ${product.name}`);
        }

        console.log('✅ Sample products added successfully!');
    } catch (error) {
        console.error('Error adding sample products:', error);
    }
}

// Uncomment and run this in your browser console or create a script to execute it:
// addSampleProducts();
