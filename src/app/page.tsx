import HeroBanner from '@/components/home/HeroBanner'
import CategoryBar from '@/components/home/CategoryBar'
import SidebarCategory from '@/components/home/SidebarCategory'
import ProductTabs from '@/components/home/ProductTabs'
import ProductCard from '@/components/product/ProductCard'
import Link from 'next/link'
import Image from 'next/image'
import { Truck, Shield, Clock, Star } from 'lucide-react'

const FEATURED_PRODUCTS = [
  { id: '1', image: '/assets/images/products/jacket-1.jpg', title: 'Mens Winter Leathers Jackets', price: 48.0, originalPrice: 75.0, category: 'Jacket', rating: 3, reviews: 8 },
  { id: '2', image: '/assets/images/products/shirt-1.jpg', title: 'Pure Garment Dyed Cotton Shirt', price: 45.0, originalPrice: 56.0, category: 'Shirt', rating: 3, reviews: 5, badge: 'Sale' },
  { id: '3', image: '/assets/images/products/jacket-2.jpg', title: 'MEN Yarn Fleece Full-Zip Jacket', price: 58.0, originalPrice: 65.0, category: 'Jacket', rating: 3, reviews: 12 },
  { id: '4', image: '/assets/images/products/clothes-4.jpg', title: 'Black Floral Wrap Midi Skirt', price: 25.0, originalPrice: 35.0, category: 'Skirt', rating: 5, reviews: 20, badge: 'New' },
  { id: '5', image: '/assets/images/products/shoe-1.jpg', title: "Casual Men's Brown Shoes", price: 99.0, originalPrice: 105.0, category: 'Casual', rating: 5, reviews: 18 },
  { id: '6', image: '/assets/images/products/watch-2.jpg', title: 'Pocket Watch Leather Pouch', price: 150.0, originalPrice: 170.0, category: 'Watches', rating: 3, reviews: 6, badge: 'Sale' },
  { id: '7', image: '/assets/images/products/watch-1.jpg', title: 'Smart Watche Vital Plus', price: 100.0, originalPrice: 120.0, category: 'Watches', rating: 4, reviews: 14 },
  { id: '8', image: '/assets/images/products/party-wear-1.jpg', title: 'Womens Party Wear Shoes', price: 25.0, originalPrice: 30.0, category: 'Party Wear', rating: 3, reviews: 9, badge: 'Sale' },
]

const FEATURES = [
  { icon: Truck, title: 'Free Shipping', desc: 'On orders over $55', color: 'text-blue-500' },
  { icon: Shield, title: 'Secure Payment', desc: '100% protected', color: 'text-green-500' },
  { icon: Clock, title: 'Fast Delivery', desc: 'Usually 3–5 days', color: 'text-orange-500' },
  { icon: Star, title: 'Great Deals', desc: 'Daily discounts', color: 'text-purple-500' },
]

export default function HomePage() {
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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* New Arrivals column */}
                <div>
                  <h3 className="text-base font-bold text-text-primary border-b-2 border-primary pb-2 mb-4 uppercase tracking-wide">
                    New Arrivals
                  </h3>
                  <ProductTabs />
                </div>

                {/* Trending column */}
                <div>
                  <h3 className="text-base font-bold text-text-primary border-b-2 border-primary pb-2 mb-4 uppercase tracking-wide">
                    Trending
                  </h3>
                  <ProductTabs />
                </div>

                {/* Top Rated column */}
                <div>
                  <h3 className="text-base font-bold text-text-primary border-b-2 border-primary pb-2 mb-4 uppercase tracking-wide">
                    Top Rated
                  </h3>
                  <ProductTabs />
                </div>
              </div>
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
            {FEATURED_PRODUCTS.map((product) => (
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

      {/* Newsletter */}
      <section className="py-14 bg-white">
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
