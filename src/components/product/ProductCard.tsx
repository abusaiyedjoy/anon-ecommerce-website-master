'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Heart, Eye, ShoppingCart, GitCompare } from 'lucide-react'
import { StarRating } from '@/components/ui/StarRating'
import { cn } from '@/lib/utils'

export interface ProductCardProps {
  id: string
  image: string
  title: string
  price: number
  originalPrice?: number
  category: string
  rating?: number
  reviews?: number
  badge?: string
  discountPercent?: number
  className?: string
}

export default function ProductCard({
  id,
  image,
  title,
  price,
  originalPrice,
  category,
  rating = 4,
  reviews = 0,
  badge,
  className,
}: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false)

  const discount =
    originalPrice && originalPrice > price
      ? Math.round(((originalPrice - price) / originalPrice) * 100)
      : null

  // Determine ribbon type
  const ribbonLabel = badge === 'Sale' || badge === 'sale'
    ? 'SALE'
    : badge === 'New' || badge === 'new'
    ? 'NEW'
    : discount
    ? `${discount}%`
    : null

  const ribbonVariant = badge === 'Sale' || badge === 'sale'
    ? 'sale'
    : badge === 'New' || badge === 'new'
    ? 'new'
    : 'percent'

  return (
    <div className={cn('product-card group relative', className)}>
      {/* Image Container */}
      <div className="relative h-56 overflow-hidden bg-surface">
        <Link href={`/product/${id}`} className="block w-full h-full">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
          />
        </Link>

        {/* Ribbon Badge - top left */}
        {ribbonLabel && (
          <div
            className={cn(
              'ribbon-badge',
              ribbonVariant
            )}
          >
            {ribbonLabel}
          </div>
        )}

        {/* Hover Action Icons - right side */}
        <div className="product-actions">
          <button
            onClick={() => setIsWishlisted(!isWishlisted)}
            className={cn(
              'product-action-btn',
              isWishlisted && 'bg-primary border-primary text-white'
            )}
            aria-label="Add to wishlist"
            title="Add to Wishlist"
          >
            <Heart size={15} className={isWishlisted ? 'fill-current' : ''} />
          </button>
          <Link
            href={`/product/${id}`}
            className="product-action-btn"
            aria-label="Quick view"
            title="Quick View"
          >
            <Eye size={15} />
          </Link>
          <button
            className="product-action-btn"
            aria-label="Compare"
            title="Compare"
          >
            <GitCompare size={15} />
          </button>
          <button
            className="product-action-btn"
            aria-label="Add to cart"
            title="Add to Cart"
          >
            <ShoppingCart size={15} />
          </button>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4">
        {/* Category */}
        <p className="text-[11px] font-semibold text-primary uppercase tracking-widest mb-1">
          {category}
        </p>

        {/* Title */}
        <Link href={`/product/${id}`}>
          <h3 className="text-sm font-medium text-text-primary hover:text-primary transition-colors line-clamp-2 mb-2 leading-snug">
            {title}
          </h3>
        </Link>

        {/* Rating */}
        <StarRating rating={rating} size="sm" showCount={reviews > 0} count={reviews} className="mb-2" />

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="text-base font-bold text-text-primary">
            ${price.toFixed(2)}
          </span>
          {originalPrice && originalPrice > price && (
            <span className="text-sm text-text-secondary line-through">
              ${originalPrice.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
