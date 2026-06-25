'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Plus, Minus } from 'lucide-react'
import { StarRating } from '@/components/ui/StarRating'

interface ShopSidebarProps {
  selectedCategory: string
  onCategoryChange: (cat: string) => void
  priceRange: [number, number]
  onPriceChange: (range: [number, number]) => void
}

const CATEGORIES = [
  { label: 'All', icon: null },
  { label: 'Clothes', icon: null },
  { label: 'Footwear', icon: null },
  { label: 'Jewelry', icon: null },
  { label: 'Perfume', icon: null },
  { label: 'Cosmetics', icon: null },
  { label: 'Glasses', icon: null },
  { label: 'Bags', icon: null },
]

const BEST_SELLERS = [
  { id: '1', title: 'Baby Fabric Shoes', image: '/assets/images/products/1.jpg', price: 4.0, originalPrice: 5.0, rating: 5 },
  { id: '2', title: "Men's Hoodies T-Shirt", image: '/assets/images/products/2.jpg', price: 7.0, originalPrice: 17.0, rating: 4 },
  { id: '3', title: 'Girls T-Shirt', image: '/assets/images/products/3.jpg', price: 3.0, originalPrice: 5.0, rating: 5 },
  { id: '4', title: 'Woolen Hat For Men', image: '/assets/images/products/4.jpg', price: 15.0, originalPrice: 25.0, rating: 3 },
]

export default function ShopSidebar({
  selectedCategory,
  onCategoryChange,
  priceRange,
  onPriceChange,
}: ShopSidebarProps) {
  const [expandedCats, setExpandedCats] = useState<string[]>([])

  const toggleCat = (label: string) => {
    setExpandedCats((prev) =>
      prev.includes(label) ? prev.filter((c) => c !== label) : [...prev, label]
    )
  }

  return (
    <aside className="space-y-6">
      {/* Category */}
      <div className="bg-white rounded-lg border border-border p-5">
        <h3 className="text-sm font-bold text-text-primary uppercase tracking-widest mb-4 pb-2 border-b border-border">
          Category
        </h3>
        <ul className="space-y-0">
          {CATEGORIES.map((cat) => (
            <li key={cat.label}>
              <button
                className="flex w-full items-center justify-between py-2.5 border-b border-border last:border-0 text-sm hover:text-primary transition-colors"
                onClick={() => {
                  onCategoryChange(cat.label)
                  if (cat.label !== 'All') toggleCat(cat.label)
                }}
              >
                <span
                  className={
                    selectedCategory === cat.label
                      ? 'text-primary font-semibold'
                      : 'text-text-primary'
                  }
                >
                  {cat.label}
                </span>
                {cat.label !== 'All' && (
                  expandedCats.includes(cat.label) ? (
                    <Minus size={14} className="text-primary" />
                  ) : (
                    <Plus size={14} className="text-text-secondary" />
                  )
                )}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Price Range */}
      <div className="bg-white rounded-lg border border-border p-5">
        <h3 className="text-sm font-bold text-text-primary uppercase tracking-widest mb-4 pb-2 border-b border-border">
          Price Range
        </h3>
        <div className="space-y-4">
          <input
            type="range"
            min={0}
            max={500}
            step={10}
            value={priceRange[1]}
            onChange={(e) => onPriceChange([priceRange[0], Number(e.target.value)])}
            className="w-full accent-primary"
          />
          <div className="flex items-center justify-between text-sm text-text-secondary">
            <span className="font-medium">${priceRange[0]}</span>
            <span className="font-medium">${priceRange[1]}</span>
          </div>
        </div>
      </div>

      {/* Best Sellers */}
      <div className="bg-white rounded-lg border border-border p-5">
        <h3 className="text-sm font-bold text-text-primary uppercase tracking-widest mb-4 pb-2 border-b border-border">
          Best Sellers
        </h3>
        <ul className="space-y-0">
          {BEST_SELLERS.map((product) => (
            <li key={product.id} className="best-seller-item">
              <Link
                href={`/product/${product.id}`}
                className="w-14 h-14 flex-shrink-0 rounded-lg overflow-hidden bg-surface relative block"
              >
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-cover object-center hover:scale-105 transition-transform duration-300"
                />
              </Link>
              <div className="flex-1 min-w-0">
                <Link
                  href={`/product/${product.id}`}
                  className="text-xs font-medium text-text-primary hover:text-primary transition-colors line-clamp-2 leading-snug"
                >
                  {product.title}
                </Link>
                <StarRating rating={product.rating} size="sm" className="my-0.5" />
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-primary">${product.price.toFixed(2)}</span>
                  <span className="text-xs text-text-secondary line-through">${product.originalPrice.toFixed(2)}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  )
}
