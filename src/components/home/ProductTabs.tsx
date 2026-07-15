'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs'
import { StarRating } from '@/components/ui/StarRating'
import { getAllProducts } from '@/lib/products'

const allProducts = getAllProducts()

// New Arrivals: products 17–20 (ids 17-20)
const NEW_ARRIVALS = allProducts.filter(p => parseInt(p.id) >= 17).slice(0, 6)

// Trending: products with reviews >= 14
const TRENDING = allProducts.filter(p => p.reviews >= 14).slice(0, 4)

// Top Rated: products with rating = 5
const TOP_RATED = allProducts.filter(p => p.rating === 5).slice(0, 4)

interface TabProduct {
  id: string
  image: string
  title: string
  category: string
  price: number
  originalPrice: number
  rating: number
}

function ProductTabItem({ product }: { product: TabProduct }) {
  return (
    <Link href={`/product/${product.id}`} className="flex items-center gap-3 group py-3 border-b border-border last:border-0">
      <div className="w-16 h-16 rounded-lg overflow-hidden bg-surface flex-shrink-0 relative">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[11px] font-semibold text-text-secondary uppercase tracking-wide mb-0.5">
          {product.category}
        </p>
        <p className="text-sm font-medium text-text-primary group-hover:text-primary transition-colors line-clamp-1">
          {product.title}
        </p>
        <StarRating rating={product.rating} size="sm" className="my-1" />
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-primary">
            ${product.price.toFixed(2)}
          </span>
          {product.originalPrice > product.price && (
            <span className="text-xs text-text-secondary line-through">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}

function ProductTabPanel({ products }: { products: TabProduct[] }) {
  return (
    <div>
      {products.map((p) => (
        <ProductTabItem key={p.id} product={p} />
      ))}
    </div>
  )
}

export default function ProductTabs() {
  return (
    <div className="flex-1">
      <Tabs defaultValue="new-arrivals">
        <TabsList className="mb-4">
          <TabsTrigger value="new-arrivals">New Arrivals</TabsTrigger>
          <TabsTrigger value="trending">Trending</TabsTrigger>
          <TabsTrigger value="top-rated">Top Rated</TabsTrigger>
        </TabsList>
        <TabsContent value="new-arrivals">
          <ProductTabPanel products={NEW_ARRIVALS} />
        </TabsContent>
        <TabsContent value="trending">
          <ProductTabPanel products={TRENDING} />
        </TabsContent>
        <TabsContent value="top-rated">
          <ProductTabPanel products={TOP_RATED} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
