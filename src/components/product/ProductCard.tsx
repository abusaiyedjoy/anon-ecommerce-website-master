'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Heart, Eye, ShoppingCart, GitCompare, CheckCircle } from 'lucide-react'
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
  sizes?: string[]
  colors?: string[]
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
  sizes,
  colors,
}: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [addedToCart, setAddedToCart] = useState(false)

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

  const handleQuickAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    try {
      const cartStr = localStorage.getItem('anon_cart') || '[]'
      const cartItems: any[] = JSON.parse(cartStr)

      // Use first available size and color, or defaults
      const defaultSize = sizes?.[0] || 'M'
      const defaultColor = colors?.[0] || '#000000'

      const existingIndex = cartItems.findIndex(
        (item) => item.id === id && item.size === defaultSize && item.color === defaultColor
      )

      if (existingIndex >= 0) {
        cartItems[existingIndex].quantity += 1
      } else {
        cartItems.push({
          id,
          title,
          category,
          price,
          originalPrice: originalPrice || price,
          image,
          size: defaultSize,
          color: defaultColor,
          quantity: 1,
          rating,
        })
      }

      localStorage.setItem('anon_cart', JSON.stringify(cartItems))
      window.dispatchEvent(new Event('cart-updated'))
      setAddedToCart(true)
      setTimeout(() => setAddedToCart(false), 2000)
    } catch (err) {
      console.error('Failed to add to cart:', err)
    }
  }

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

        {/* Cart added indicator */}
        {addedToCart && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <div className="bg-white rounded-full p-2">
              <CheckCircle size={24} className="text-green-500" />
            </div>
          </div>
        )}

        {/* Hover Action Icons - right side */}
        <div className="product-actions">
          <button
            onClick={(e) => { e.preventDefault(); setIsWishlisted(!isWishlisted) }}
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
            onClick={handleQuickAddToCart}
            className={cn(
              'product-action-btn',
              addedToCart && 'bg-green-500 border-green-500 text-white'
            )}
            aria-label="Add to cart"
            title="Add to Cart"
          >
            {addedToCart ? <CheckCircle size={15} /> : <ShoppingCart size={15} />}
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

        {/* Price + Add to Cart */}
        <div className="flex items-center justify-between gap-2">
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
          <button
            onClick={handleQuickAddToCart}
            className="flex items-center gap-1 text-[10px] font-semibold text-primary border border-primary hover:bg-primary hover:text-white px-2 py-1.5 rounded-sm transition-colors uppercase tracking-wide"
            title="Add to Cart"
          >
            <ShoppingCart size={11} />
            Add
          </button>
        </div>
      </div>
    </div>
  )
}
