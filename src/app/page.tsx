import HeroBanner from '@/components/home/HeroBanner'
import CategoryBar from '@/components/home/CategoryBar'
import SidebarCategory from '@/components/home/SidebarCategory'
import ProductTabs from '@/components/home/ProductTabs'
import ProductCard from '@/components/product/ProductCard'
import Link from 'next/link'
import Image from 'next/image'
import { Truck, Shield, Clock, Star } from 'lucide-react'
import { getAllProducts } from '@/lib/products'

const ALL_PRODUCTS = getAllProducts()

const FEATURES = [
  { icon: Truck, title: 'Free Shipping', desc: 'On orders over $55', color: 'text-blue-500' },
  { icon: Shield, title: 'Secure Payment', desc: '100% protected', color: 'text-green-500' },
  { icon: Clock, title: 'Fast Delivery', desc: 'Usually 3–5 days', color: 'text-orange-500' },
  { icon: Star, title: 'Great Deals', desc: 'Daily discounts', color: 'text-purple-500' },
]

export default function HomePage() {
  // Use first 8 products for "New Products" section
  const featuredProducts = ALL_PRODUCTS.slice(0, 8)

  return (
    <>
      {/* Hero Banner */}
      <HeroBanner />

      {/* Features Bar */}
      <section className="py-5 bg-white border-b border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {FEATURES.map(({ icon: Icon, title, desc, color }) => (
              <div key={title} className="flex items-center gap-3">
                <div className={`${color} flex-shrink-0`}>
                  <Icon size={28} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-text-primary">{title}</p>
                  <p className="text-xs text-text-secondary">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Category Bar */}
      <CategoryBar />

      {/* Main Content: Sidebar + Product Tabs */}
      <section className="py-10 bg-surface">
        <div className="container mx-auto px-4">
          <div className="flex gap-8">
            {/* Left Sidebar */}
            <SidebarCategory />

            {/* Right: Tabbed Products */}
            <div className="flex-1 min-w-0">
              <ProductTabs />
            </div>
          </div>
        </div>
      </section>

      {/* New Products Grid */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-text-primary">
              New Products
            </h2>
            <Link
              href="/shop"
              className="text-sm text-primary hover:text-primary-dark font-medium transition-colors"
            >
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
      </section>

      {/* Banners Row */}
      <section className="py-8 bg-surface">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="relative h-44 rounded-lg overflow-hidden group">
              <Image src="/assets/images/mens-banner.jpg" alt="Men's Collection" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-black/30 flex items-end p-4">
                <div>
                  <p className="text-white text-xs font-semibold uppercase tracking-widest">Men&apos;s</p>
                  <p className="text-white font-bold text-lg">Collection</p>
                  <Link href="/shop?gender=mens" className="text-primary text-xs font-semibold mt-1 block hover:underline">Shop Now →</Link>
                </div>
              </div>
            </div>
            <div className="relative h-44 rounded-lg overflow-hidden group">
              <Image src="/assets/images/womens-banner.jpg" alt="Women's Collection" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-black/30 flex items-end p-4">
                <div>
                  <p className="text-white text-xs font-semibold uppercase tracking-widest">Women&apos;s</p>
                  <p className="text-white font-bold text-lg">Collection</p>
                  <Link href="/shop?gender=womens" className="text-primary text-xs font-semibold mt-1 block hover:underline">Shop Now →</Link>
                </div>
              </div>
            </div>
            <div className="relative h-44 rounded-lg overflow-hidden group">
              <Image src="/assets/images/electronics-banner-1.jpg" alt="Electronics" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-black/30 flex items-end p-4">
                <div>
                  <p className="text-white text-xs font-semibold uppercase tracking-widest">Electronics</p>
                  <p className="text-white font-bold text-lg">Collection</p>
                  <Link href="/shop?category=electronics" className="text-primary text-xs font-semibold mt-1 block hover:underline">Shop Now →</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Best Sellers Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-text-primary">Best Sellers</h2>
            <Link href="/shop" className="text-sm text-primary hover:text-primary-dark font-medium transition-colors">
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {ALL_PRODUCTS.filter(p => p.rating >= 4).slice(0, 4).map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-14 bg-surface">
        <div className="container mx-auto px-4">
          <div className="relative rounded-2xl overflow-hidden bg-primary-light flex flex-col md:flex-row items-center gap-8 px-8 py-12">
            {/* Newsletter Image */}
            <div className="relative w-full md:w-56 h-44 flex-shrink-0 hidden md:block rounded-xl overflow-hidden">
              <Image
                src="/assets/images/newsletter.png"
                alt="Newsletter"
                fill
                className="object-cover object-center"
              />
            </div>
            {/* Content */}
            <div className="flex-1 text-center md:text-left">
              <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-1">Newsletter</p>
              <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-2">
                Subscribe to Our Newsletter
              </h2>
              <p className="text-sm text-text-secondary mb-6">
                Get the latest updates on new products and upcoming sales.
              </p>
              <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto md:mx-0">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 px-4 py-2.5 rounded-sm border border-border text-sm focus:outline-none focus:border-primary"
                  required
                />
                <button
                  type="submit"
                  className="bg-primary hover:bg-primary-dark text-white font-semibold text-sm px-6 py-2.5 rounded-sm transition-colors uppercase tracking-wide"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
