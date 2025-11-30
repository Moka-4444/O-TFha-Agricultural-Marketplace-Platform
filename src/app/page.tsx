import Link from 'next/link';
import { Sprout, Tractor, Wrench, Truck, ShoppingBasket, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CategoryCard } from '@/components/shared/CategoryCard';
import { SupplierCard } from '@/components/shared/SupplierCard';
import { ProductCard } from '@/components/shared/ProductCard';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center bg-green-900 text-white overflow-hidden">
        {/* Background Image Overlay */}
        <div
          className="absolute inset-0 z-0 opacity-60 bg-[url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2832&auto=format&fit=crop')] bg-cover bg-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/60 z-0" />

        <div className="container relative z-10 px-4 md:px-6 text-center space-y-6 max-w-4xl">
          <div className="flex items-center justify-center gap-2 text-green-300 font-medium tracking-wider uppercase text-sm animate-fade-in-up">
            <Sprout className="h-4 w-4" />
            <span>Sustainable Agriculture</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight animate-fade-in-up delay-100">
            Your Complete Agriculture <br /> Marketplace
          </h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto animate-fade-in-up delay-200">
            Connect with verified suppliers, discover quality products, and grow your farming business with modern solutions.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 animate-fade-in-up delay-300">
            <Button size="lg" className="h-12 px-8 text-lg bg-primary hover:bg-primary/90 text-white border-none">
              Start Shopping
            </Button>
            <Button size="lg" variant="outline" className="h-12 px-8 text-lg bg-transparent text-white border-white hover:bg-white hover:text-green-900">
              Become a Supplier
            </Button>
          </div>

          {/* Hero Search */}
          <div className="max-w-xl mx-auto mt-8 relative animate-fade-in-up delay-400">
            <Input
              type="search"
              placeholder="Search for seeds, fertilizers, equipment..."
              className="h-14 pl-6 pr-32 rounded-full bg-white/95 text-black border-none shadow-lg focus-visible:ring-2 focus-visible:ring-primary"
            />
            <Button className="absolute right-2 top-2 h-10 rounded-full px-6">
              Search
            </Button>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-4 text-primary">Browse by Category</h2>
            <p className="text-muted-foreground">Find everything you need for modern farming</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            <CategoryCard name="Seeds" icon={Sprout} href="/products?category=seeds" />
            <CategoryCard name="Fertilizers" icon={ShoppingBasket} href="/products?category=fertilizers" />
            <CategoryCard name="Equipment" icon={Wrench} href="/products?category=equipment" />
            <CategoryCard name="Services" icon={Truck} href="/products?category=services" />
            <CategoryCard name="Produce" icon={Tractor} href="/products?category=produce" />
          </div>
        </div>
      </section>

      {/* Featured Suppliers */}
      <section className="py-16">
        <div className="container px-4 md:px-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-primary">Featured Suppliers</h2>
              <p className="text-muted-foreground mt-1">Trusted partners for quality products</p>
            </div>
            <Link href="/suppliers" className="text-primary font-medium hover:underline flex items-center gap-1">
              View All <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <SupplierCard
              id="1"
              name="Green Valley Farms"
              location="California, USA"
              rating={4.9}
              image="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop"
              isVerified={true}
              productCount={156}
            />
            <SupplierCard
              id="2"
              name="Organic Seeds Co"
              location="Texas, USA"
              rating={4.8}
              image="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop"
              isVerified={true}
              productCount={203}
            />
            <SupplierCard
              id="3"
              name="Farm Equipment Pro"
              location="Iowa, USA"
              rating={4.7}
              image="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop"
              isVerified={true}
              productCount={89}
            />
            <SupplierCard
              id="4"
              name="Natural Fertilizers"
              location="Florida, USA"
              rating={4.9}
              image="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop"
              isVerified={true}
              productCount={134}
            />
          </div>
        </div>
      </section>

      {/* Seasonal Deals */}
      <section className="py-16 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-primary">Seasonal Deals</h2>
              <p className="text-muted-foreground mt-1">Special offers on popular products</p>
            </div>
            <Link href="/products" className="text-primary font-medium hover:underline flex items-center gap-1">
              View All Deals <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <ProductCard
              id="1"
              title="Premium Organic Seeds Collection"
              price={49.99}
              originalPrice={60.00}
              rating={4.8}
              image="https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=800&q=80"
              category="Seeds"
              isOrganic={true}
              discount={15}
            />
            <ProductCard
              id="2"
              title="Bio-Organic Fertilizer 50kg"
              price={89.99}
              originalPrice={120.00}
              rating={4.7}
              image="https://images.unsplash.com/photo-1628352081506-83c43123ed6d?w=800&q=80"
              category="Fertilizers"
              discount={25}
            />
            <ProductCard
              id="3"
              title="Smart Irrigation System"
              price={499.99}
              rating={4.9}
              image="https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?w=800&q=80"
              category="Equipment"
            />
            <ProductCard
              id="4"
              title="Fresh Organic Vegetables Box"
              price={29.99}
              rating={4.6}
              image="https://images.unsplash.com/photo-1595855709915-bd989963c635?w=800&q=80"
              category="Produce"
              isOrganic={true}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
            Ready to grow your business?
          </h2>
          <p className="text-lg md:text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Join thousands of farmers and suppliers on AgriMarket. Start selling your products or find the best deals today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" variant="secondary" className="h-12 px-8 text-lg font-semibold">
              Learn More
            </Button>
            <Button size="lg" className="h-12 px-8 text-lg bg-white/10 hover:bg-white/20 border border-white/20">
              Create Account
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
