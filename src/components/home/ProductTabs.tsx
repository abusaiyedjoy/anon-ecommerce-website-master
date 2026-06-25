'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs'
import { StarRating } from '@/components/ui/StarRating'

interface TabProduct {
  id: string
  image: string
  title: string
  category: string
  price: number
  originalPrice: number
  rating: number
}

const NEW_ARRIVALS: TabProduct[] = [
  { id: '1', image: '/assets/images/products/1.jpg', title: 'Baby Fabric Shoes', category: 'Shoes', price: 4.0, originalPrice: 5.0, rating: 4 },
  { id: '2', image: '/assets/images/products/2.jpg', title: "Men's Hoodies T-Shirt", category: 'Clothes', price: 7.0, originalPrice: 17.0, rating: 5 },
  { id: '3', image: '/assets/images/products/3.jpg', title: 'Girls T-Shirt', category: 'Clothes', price: 3.0, originalPrice: 5.0, rating: 4 },
  { id: '4', image: '/assets/images/products/4.jpg', title: 'Woolen Hat For Men', category: 'Accessories', price: 15.0, originalPrice: 25.0, rating: 3 },
]

const TRENDING: TabProduct[] = [
  { id: '5', image: '/assets/images/products/sports-1.jpg', title: 'Running & Trekking Shoes', category: 'Sports', price: 49.0, originalPrice: 15.0, rating: 5 },
  { id: '6', image: '/assets/images/products/sports-2.jpg', title: 'Trekking & Running Shoes - Black', category: 'Sports', price: 78.0, originalPrice: 36.0, rating: 4 },
  { id: '7', image: '/assets/images/products/jacket-1.jpg', title: 'Winter Leather Jacket', category: 'Jackets', price: 89.0, originalPrice: 120.0, rating: 4 },
  { id: '8', image: '/assets/images/products/shirt-1.jpg', title: 'Cotton Casual Shirt', category: 'Shirts', price: 22.0, originalPrice: 35.0, rating: 3 },
]

const TOP_RATED: TabProduct[] = [
  { id: '9', image: '/assets/images/products/watch-2.jpg', title: 'Pocket Watch Leather Pouch', category: 'Watches', price: 50.0, originalPrice: 34.0, rating: 5 },
  { id: '10', image: '/assets/images/products/jewellery-1.jpg', title: 'Rose Gold Earrings', category: 'Jewelry', price: 25.0, originalPrice: 45.0, rating: 5 },
  { id: '11', image: '/assets/images/products/shoe-1.jpg', title: "Men's Leather Oxford", category: 'Shoes', price: 65.0, originalPrice: 90.0, rating: 4 },
  { id: '12', image: '/assets/images/products/watch-1.jpg', title: 'Smart Watch Vital Plus', category: 'Watches', price: 180.0, originalPrice: 250.0, rating: 4 },
]

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
          <span className="text-xs text-text-secondary line-through">
            ${product.originalPrice.toFixed(2)}
          </span>
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
