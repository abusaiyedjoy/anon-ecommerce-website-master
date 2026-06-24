'use client'

import { useState } from 'react'
import ProductCard from '@/components/ProductCard'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Slider } from '@/components/ui/Slider'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Filter, Search, Grid3X3, List } from 'lucide-react'

// Mock product data
const PRODUCTS = [
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

const CATEGORIES = ['All', 'Shoes', 'Shirts', 'Accessories', 'Sports', 'Electronics', 'Jewelry']

export default function ShopPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500])
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [sortBy, setSortBy] = useState('featured')

  // Filter products
  const filteredProducts = PRODUCTS.filter((product) => {
    const matchSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchCategory = selectedCategory === 'All' || product.category === selectedCategory
    const matchPrice = product.price >= priceRange[0] && product.price <= priceRange[1]
    return matchSearch && matchCategory && matchPrice
  })

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price
      case 'price-high':
        return b.price - a.price
      case 'newest':
        return 0 // In real app, would sort by date
      default:
        return 0
    }
  })

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Shop</h1>
          <p className="text-slate-600">Browse our collection of premium products</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-4">
          {/* Sidebar - Filters */}
          <div className="space-y-6">
            {/* Search */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Search</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Categories */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Categories</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {CATEGORIES.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`block w-full text-left px-3 py-2 rounded-md transition-colors ${
                      selectedCategory === category
                        ? 'bg-blue-600 text-white'
                        : 'hover:bg-slate-100 text-slate-700'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </CardContent>
            </Card>

            {/* Price Range */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Price Range</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Slider
                    min={0}
                    max={500}
                    step={10}
                    value={priceRange}
                    onValueChange={setPriceRange}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-slate-600">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Top Bar */}
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-slate-600">
                Showing {sortedProducts.length} products
              </p>

              <div className="flex gap-4">
                {/* Sort */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="newest">Newest</option>
                </select>

                {/* View Mode */}
                <div className="flex gap-2 border border-slate-300 rounded-md p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded ${
                      viewMode === 'grid'
                        ? 'bg-slate-200 text-slate-900'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded ${
                      viewMode === 'list'
                        ? 'bg-slate-200 text-slate-900'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <List className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            {sortedProducts.length > 0 ? (
              <div
                className={
                  viewMode === 'grid'
                    ? 'grid gap-6 sm:grid-cols-2 lg:grid-cols-3'
                    : 'space-y-4'
                }
              >
                {sortedProducts.map((product) => (
                  <ProductCard key={product.id} {...product} />
                ))}
              </div>
            ) : (
              <div className="rounded-lg border border-slate-200 bg-white p-12 text-center">
                <Filter className="mx-auto mb-4 h-12 w-12 text-slate-400" />
                <h3 className="mb-2 text-lg font-semibold text-slate-900">No products found</h3>
                <p className="text-slate-600">Try adjusting your filters to find what you're looking for.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
