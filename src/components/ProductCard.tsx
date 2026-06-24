'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Heart, ShoppingCart } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { useState } from 'react'

interface ProductCardProps {
  id: string
  image: string
  title: string
  price: number
  originalPrice?: number
  category: string
  rating?: number
  reviews?: number
  badge?: string
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
}: ProductCardProps) {
  const [isFavorite, setIsFavorite] = useState(false)

  return (
    <div className="group overflow-hidden rounded-lg border border-slate-200 bg-white transition-shadow hover:shadow-lg">
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden bg-slate-100">
        <Link href={`/product/${id}`}>
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform group-hover:scale-110"
          />
        </Link>

        {/* Badge */}
        {badge && (
          <div className="absolute top-3 right-3">
            <Badge variant="default">{badge}</Badge>
          </div>
        )}

        {/* Discount Badge */}
        {originalPrice && (
          <div className="absolute top-3 left-3">
            <Badge variant="secondary">
              {Math.round(((originalPrice - price) / originalPrice) * 100)}% OFF
            </Badge>
          </div>
        )}

        {/* Quick Actions */}
        <div className="absolute bottom-0 left-0 right-0 flex gap-2 bg-gradient-to-t from-black/60 to-transparent p-3 opacity-0 transition-opacity group-hover:opacity-100">
          <Button size="sm" className="flex-1" asChild>
            <Link href={`/product/${id}`}>View Details</Link>
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="text-white hover:bg-white/20"
            onClick={() => setIsFavorite(!isFavorite)}
          >
            <Heart className={`h-4 w-4 ${isFavorite ? 'fill-current text-red-500' : ''}`} />
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Category */}
        <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">{category}</p>

        {/* Title */}
        <Link href={`/product/${id}`}>
          <h3 className="line-clamp-2 font-semibold text-slate-900 hover:text-primary transition-colors">
            {title}
          </h3>
        </Link>

        {/* Rating */}
        {rating > 0 && (
          <div className="my-2 flex items-center gap-1">
            <div className="flex text-yellow-400">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i}>{i < rating ? '★' : '☆'}</span>
              ))}
            </div>
            {reviews > 0 && <span className="text-xs text-slate-500">({reviews})</span>}
          </div>
        )}

        {/* Price */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-lg font-bold text-slate-900">${price.toFixed(2)}</span>
          {originalPrice && (
            <span className="text-sm line-through text-slate-500">
              ${originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        <Button size="sm" className="w-full" variant="default">
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
      </div>
    </div>
  )
}
