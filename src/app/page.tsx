'use client'

import Link from 'next/link'
import ProductCard from '@/components/ProductCard'
import { Button } from '@/components/ui/Button'
import { ArrowRight, Star, Truck, Shield, Clock } from 'lucide-react'

const FEATURED_PRODUCTS = [
  {
    id: '1',
    image: '/assets/images/products/1.jpg',
    title: 'Baby Fabric Shoes',
    price: 4.0,
    originalPrice: 5.0,
    category: 'Shoes',
    rating: 4,
    reviews: 12,
  },
  {
    id: '2',
    image: '/assets/images/products/2.jpg',
    title: "Men's Hoodies T-Shirt",
    price: 7.0,
    originalPrice: 17.0,
    category: 'Shirts',
    rating: 5,
    reviews: 8,
  },
  {
    id: '3',
    image: '/assets/images/products/3.jpg',
    title: 'Girls T-Shirt',
    price: 3.0,
    originalPrice: 5.0,
    category: 'Shirts',
    rating: 4,
    reviews: 5,
  },
  {
    id: '4',
    image: '/assets/images/products/4.jpg',
    title: 'Woolen Hat for Men',
    price: 15.0,
    originalPrice: 25.0,
    category: 'Accessories',
    rating: 3,
    reviews: 3,
    badge: 'New',
  },
  {
    id: '5',
    image: '/assets/images/products/sports-1.jpg',
    title: 'Running & Trekking Shoes - White',
    price: 49.0,
    originalPrice: 15.0,
    category: 'Sports',
    rating: 5,
    reviews: 20,
  },
  {
    id: '6',
    image: '/assets/images/products/sports-2.jpg',
    title: 'Trekking & Running Shoes - black',
    price: 78.0,
    originalPrice: 36.0,
    category: 'Sports',
    rating: 4,
    reviews: 15,
  },
  {
    id: '7',
    image: '/assets/images/products/watch-1.jpg',
    title: 'Smart Watch Vital Plus',
    price: 180.0,
    originalPrice: 250.0,
    category: 'Electronics',
    rating: 4,
    reviews: 18,
  },
  {
    id: '8',
    image: '/assets/images/products/jewellery-1.jpg',
    title: 'Rose Gold Earrings',
    price: 25.0,
    originalPrice: 45.0,
    category: 'Jewelry',
    rating: 5,
    reviews: 10,
    badge: 'Sale',
  },
]

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero/Banner Section */}
      <section className="bg-gradient-to-r from-orange-50 via-pink-50 to-orange-50 py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 lg:grid-cols-2 items-center">
            {/* Left Content */}
            <div className="max-w-xl">
              <p className="text-pink-500 font-semibold text-sm uppercase tracking-wider mb-3">
                Trending Item
              </p>
              <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-4 leading-tight">
                Women's Latest Fashion Sale
              </h1>
              <p className="text-xl text-slate-600 mb-8">
                starting at <span className="font-bold text-2xl text-slate-900">$</span> <span className="font-bold text-2xl text-slate-900">20</span>.00
              </p>
              <Button size="lg" className="bg-pink-500 hover:bg-pink-600 text-white font-bold">
                SHOP NOW
              </Button>
            </div>

            {/* Right Image Area */}
            <div className="relative h-96 md:h-full min-h-80">
              <div className="relative w-full h-full rounded-3xl overflow-hidden bg-gradient-to-br from-orange-200 via-pink-200 to-orange-200 flex items-center justify-center">
                {/* Placeholder for banner image */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center opacity-30">
                    <p className="text-white text-2xl font-bold">Women's Fashion</p>
                    <p className="text-white text-lg">Image</p>
                  </div>
                </div>
                {/* Decorative elements */}
                <div className="absolute top-10 right-10 w-20 h-20 border-4 border-orange-300 rounded-full opacity-20"></div>
                <div className="absolute bottom-10 left-10 w-32 h-32 bg-pink-300 rounded-full opacity-10"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="flex items-start gap-4">
              <Truck className="h-8 w-8 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-slate-900 mb-1">Free Shipping</h3>
                <p className="text-sm text-slate-600">On orders over $50</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Shield className="h-8 w-8 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-slate-900 mb-1">Secure Payment</h3>
                <p className="text-sm text-slate-600">100% protected</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Clock className="h-8 w-8 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-slate-900 mb-1">Fast Delivery</h3>
                <p className="text-sm text-slate-600">Usually 3-5 days</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Star className="h-8 w-8 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-slate-900 mb-1">Great Deals</h3>
                <p className="text-sm text-slate-600">Daily discounts</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-4xl font-bold text-slate-900 mb-2">Featured Products</h2>
              <p className="text-slate-600">Check out our best-selling items</p>
            </div>
            <Button variant="outline" asChild className="hidden sm:flex">
              <Link href="/shop">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURED_PRODUCTS.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>

          <div className="mt-8 text-center sm:hidden">
            <Button asChild>
              <Link href="/shop">
                View All Products
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Special Offers Available!</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Get up to 50% off on selected items. Limited time only!
          </p>
          <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50" asChild>
            <Link href="/shop">
              Shop Sale
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-slate-900 mb-12 text-center">Shop by Category</h2>
          
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { name: 'Fashion', color: 'from-pink-500 to-pink-600' },
              { name: 'Electronics', color: 'from-blue-500 to-blue-600' },
              { name: 'Accessories', color: 'from-purple-500 to-purple-600' },
            ].map((category) => (
              <Link
                key={category.name}
                href={`/shop?category=${category.name}`}
                className={`relative h-48 rounded-lg overflow-hidden group cursor-pointer`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-90 group-hover:opacity-100 transition-opacity`}></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <h3 className="text-2xl font-bold">{category.name}</h3>
                    <p className="text-sm mt-2 opacity-80">Browse collection</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-12 text-center">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Subscribe to Our Newsletter</h2>
            <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
              Get the latest updates on new products and upcoming sales delivered right to your inbox.
            </p>
            <form className="max-w-md mx-auto flex gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 rounded-lg border border-slate-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
              />
              <Button>Subscribe</Button>
            </form>
          </div>
        </div>
      </section>
    </main>
  )
}
