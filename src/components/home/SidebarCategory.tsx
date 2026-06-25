'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { Plus, Minus } from 'lucide-react'
import { StarRating } from '@/components/ui/StarRating'

const CATEGORIES = [
  { label: 'Clothes', icon: '/assets/images/icons/clothes.png', count: 53, href: '/shop?category=clothes' },
  { label: 'Footwear', icon: '/assets/images/icons/footwear.png', count: 35, href: '/shop?category=footwear' },
  { label: 'Jewelry', icon: '/assets/images/icons/jewelry.png', count: 28, href: '/shop?category=jewelry' },
  { label: 'Perfume', icon: '/assets/images/icons/perfume.png', count: 14, href: '/shop?category=perfume' },
  { label: 'Cosmetics', icon: '/assets/images/icons/cosmetics.png', count: 20, href: '/shop?category=cosmetics' },
  { label: 'Glasses', icon: '/assets/images/icons/glasses.png', count: 68, href: '/shop?category=glasses' },
  { label: 'Bags', icon: '/assets/images/icons/bags.png', count: 45, href: '/shop?category=bags' },
]

const BEST_SELLERS = [
  { id: '1', title: 'Baby Fabric Shoes', image: '/assets/images/products/1.jpg', price: 4.0, originalPrice: 5.0, rating: 5 },
  { id: '2', title: "Men's Hoodies T-Shirt", image: '/assets/images/products/2.jpg', price: 7.0, originalPrice: 17.0, rating: 4 },
  { id: '3', title: 'Girls T-Shirt', image: '/assets/images/products/3.jpg', price: 3.0, originalPrice: 5.0, rating: 5 },
  { id: '4', title: 'Woolen Hat For Men', image: '/assets/images/products/4.jpg', price: 15.0, originalPrice: 25.0, rating: 3 },
]

export default function SidebarCategory() {
  const [expanded, setExpanded] = useState<string | null>(null)

  return (
    <aside className="hidden lg:block w-64 flex-shrink-0">
      {/* Category Section */}
      <div className="mb-6">
        <h3 className="text-sm font-bold text-text-primary uppercase tracking-widest mb-3 pb-2 border-b border-border">
          Category
        </h3>
        <ul>
          {CATEGORIES.map((cat) => (
            <li key={cat.label}>
              <button
                className="sidebar-category-item w-full text-left"
                onClick={() => setExpanded(expanded === cat.label ? null : cat.label)}
              >
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 flex-shrink-0 relative">
                    <Image
                      src={cat.icon}
                      alt={cat.label}
                      fill
                      className="object-contain"
                      onError={(e) => {
                        // Fallback to a colored circle if icon not found
                        (e.target as HTMLImageElement).style.display = 'none'
                      }}
                    />
                  </div>
                  <span className="text-sm text-text-primary">{cat.label}</span>
                </div>
                {expanded === cat.label ? (
                  <Minus size={14} className="text-primary" />
                ) : (
                  <Plus size={14} className="text-text-secondary" />
                )}
              </button>
              {expanded === cat.label && (
                <div className="pl-10 py-2">
                  <Link
                    href={cat.href}
                    className="block text-xs text-text-secondary hover:text-primary py-1 transition-colors"
                  >
                    View All ({cat.count})
                  </Link>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Best Sellers */}
      <div>
        <h3 className="text-sm font-bold text-text-primary uppercase tracking-widest mb-3 pb-2 border-b border-border">
          Best Sellers
        </h3>
        <ul>
          {BEST_SELLERS.map((product) => (
            <li key={product.id} className="best-seller-item">
              <Link href={`/product/${product.id}`} className="w-14 h-14 flex-shrink-0 rounded-lg overflow-hidden bg-surface relative">
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
                <StarRating rating={product.rating} size="sm" className="my-1" />
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
