'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Heart, ShoppingCart, GitCompare, Share2, Truck, Shield, RefreshCw, ChevronRight } from 'lucide-react'
import { StarRating } from '@/components/ui/StarRating'
import ProductCard from '@/components/product/ProductCard'

// Static product data (in a real app, fetch from API using `id`)
const PRODUCT = {
  id: '1',
  title: 'Mens Winter Leathers Jackets',
  category: 'Jacket',
  price: 48.0,
  originalPrice: 75.0,
  rating: 4,
  reviews: 124,
  badge: 'Sale',
  description:
    'Premium quality winter leather jacket crafted with genuine leather. Features a warm lining, multiple pockets, and a classic fit that suits all occasions. Perfect for cold weather style.',
  images: [
    '/assets/images/products/jacket-1.jpg',
    '/assets/images/products/jacket-2.jpg',
    '/assets/images/products/jacket-3.jpg',
    '/assets/images/products/jacket-4.jpg',
  ],
  sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  colors: ['#1A1A2E', '#4A3728', '#2C5F2E'],
}

const RELATED_PRODUCTS = [
  { id: '2', image: '/assets/images/products/shirt-1.jpg', title: 'Pure Garment Dyed Cotton Shirt', price: 45.0, originalPrice: 56.0, category: 'Shirt', rating: 3, reviews: 5, badge: 'Sale' },
  { id: '3', image: '/assets/images/products/jacket-2.jpg', title: 'MEN Yarn Fleece Full-Zip Jacket', price: 58.0, originalPrice: 65.0, category: 'Jacket', rating: 3, reviews: 12 },
  { id: '4', image: '/assets/images/products/clothes-4.jpg', title: 'Black Floral Wrap Midi Skirt', price: 25.0, originalPrice: 35.0, category: 'Skirt', rating: 5, reviews: 20, badge: 'New' },
  { id: '5', image: '/assets/images/products/shoe-1.jpg', title: "Casual Men's Brown Shoes", price: 99.0, originalPrice: 105.0, category: 'Casual', rating: 5, reviews: 18 },
]

export default function ProductDetailPage() {
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [selectedColor, setSelectedColor] = useState<string | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)

  const discount = Math.round(((PRODUCT.originalPrice - PRODUCT.price) / PRODUCT.originalPrice) * 100)

  return (
    <div className="bg-surface min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1 text-xs text-text-secondary mb-6">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight size={12} />
          <Link href="/shop" className="hover:text-primary transition-colors">Shop</Link>
          <ChevronRight size={12} />
          <span className="text-text-primary font-medium">{PRODUCT.title}</span>
        </nav>

        {/* Product Detail */}
        <div className="bg-white rounded-xl border border-border p-6 md:p-8 mb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Images */}
            <div>
              {/* Main Image */}
              <div className="relative h-96 rounded-lg overflow-hidden bg-surface mb-4">
                <Image
                  src={PRODUCT.images[selectedImage]}
                  alt={PRODUCT.title}
                  fill
                  className="object-cover object-center"
                  priority
                />
                {/* Sale Badge */}
                <div className="absolute top-4 left-4 bg-text-primary text-white text-xs font-bold uppercase px-3 py-1">
                  Sale
                </div>
              </div>
              {/* Thumbnails */}
              <div className="flex gap-3">
                {PRODUCT.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`relative w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors flex-shrink-0 ${
                      selectedImage === i ? 'border-primary' : 'border-border hover:border-primary'
                    }`}
                  >
                    <Image src={img} alt={`View ${i + 1}`} fill className="object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Info */}
            <div>
              <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-2">
                {PRODUCT.category}
              </p>
              <h1 className="text-2xl font-bold text-text-primary mb-3">{PRODUCT.title}</h1>

              <div className="flex items-center gap-3 mb-4">
                <StarRating rating={PRODUCT.rating} showCount count={PRODUCT.reviews} />
                <span className="text-xs text-text-secondary">|</span>
                <span className="text-xs text-green-600 font-semibold">In Stock</span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-3xl font-bold text-text-primary">${PRODUCT.price.toFixed(2)}</span>
                <span className="text-lg text-text-secondary line-through">${PRODUCT.originalPrice.toFixed(2)}</span>
                <span className="text-sm font-semibold text-primary bg-primary-light px-2 py-0.5 rounded">
                  -{discount}%
                </span>
              </div>

              <p className="text-sm text-text-secondary leading-relaxed mb-6">
                {PRODUCT.description}
              </p>

              {/* Size */}
              <div className="mb-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-text-primary mb-2">
                  Size: <span className="text-primary">{selectedSize || 'Select'}</span>
                </p>
                <div className="flex flex-wrap gap-2">
                  {PRODUCT.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-10 h-10 text-xs font-semibold rounded-sm border transition-colors ${
                        selectedSize === size
                          ? 'border-primary bg-primary text-white'
                          : 'border-border text-text-primary hover:border-primary hover:text-primary'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Colors */}
              <div className="mb-6">
                <p className="text-xs font-semibold uppercase tracking-wide text-text-primary mb-2">Color</p>
                <div className="flex gap-2">
                  {PRODUCT.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-7 h-7 rounded-full border-2 transition-all ${
                        selectedColor === color ? 'border-primary scale-110' : 'border-transparent'
                      }`}
                      style={{ backgroundColor: color }}
                      aria-label={`Color ${color}`}
                    />
                  ))}
                </div>
              </div>

              {/* Quantity + Add to Cart */}
              <div className="flex items-center gap-3 mb-5">
                <div className="flex items-center border border-border rounded-sm">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-10 h-10 flex items-center justify-center text-text-secondary hover:text-primary transition-colors"
                  >
                    –
                  </button>
                  <span className="w-12 text-center text-sm font-semibold">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-10 h-10 flex items-center justify-center text-text-secondary hover:text-primary transition-colors"
                  >
                    +
                  </button>
                </div>
                <button className="flex-1 flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white font-semibold text-sm py-2.5 px-6 rounded-sm transition-colors uppercase tracking-wide">
                  <ShoppingCart size={18} />
                  Add to Cart
                </button>
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`w-11 h-11 rounded-sm border flex items-center justify-center transition-colors ${
                    isWishlisted
                      ? 'border-primary bg-primary text-white'
                      : 'border-border text-text-secondary hover:border-primary hover:text-primary'
                  }`}
                  aria-label="Add to wishlist"
                >
                  <Heart size={18} className={isWishlisted ? 'fill-current' : ''} />
                </button>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-4 mb-6 text-xs text-text-secondary">
                <button className="flex items-center gap-1 hover:text-primary transition-colors">
                  <GitCompare size={14} /> Compare
                </button>
                <button className="flex items-center gap-1 hover:text-primary transition-colors">
                  <Share2 size={14} /> Share
                </button>
              </div>

              {/* Guarantees */}
              <div className="border-t border-border pt-5 grid grid-cols-3 gap-3">
                {[
                  { icon: Truck, label: 'Free Shipping', sub: 'On orders $55+' },
                  { icon: Shield, label: 'Secure Payment', sub: '100% Protected' },
                  { icon: RefreshCw, label: 'Free Returns', sub: 'Within 30 days' },
                ].map(({ icon: Icon, label, sub }) => (
                  <div key={label} className="text-center">
                    <Icon size={22} className="mx-auto mb-1 text-primary" />
                    <p className="text-xs font-semibold text-text-primary">{label}</p>
                    <p className="text-[10px] text-text-secondary">{sub}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div>
          <h2 className="text-xl font-bold text-text-primary mb-6">Related Products</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {RELATED_PRODUCTS.map((p) => (
              <ProductCard key={p.id} {...p} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
