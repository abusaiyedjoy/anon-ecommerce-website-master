'use client'

import { useState } from 'react'
import ProductCard from '@/components/product/ProductCard'
import ShopSidebar from '@/components/shop/ShopSidebar'
import ShopToolbar from '@/components/shop/ShopToolbar'
import { Search } from 'lucide-react'
import { getAllProducts } from '@/lib/products'

const ALL_PRODUCTS = getAllProducts()

export default function ShopPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500])
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [sortBy, setSortBy] = useState('featured')

  const filtered = ALL_PRODUCTS.filter((p) => {
    const matchSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchCat = selectedCategory === 'All' || p.category.toLowerCase() === selectedCategory.toLowerCase()
    const matchPrice = p.price >= priceRange[0] && p.price <= priceRange[1]
    return matchSearch && matchCat && matchPrice
  })

  const sorted = [...filtered].sort((a, b) => {
    switch (sortBy) {
      case 'price-low': return a.price - b.price
      case 'price-high': return b.price - a.price
      case 'rating': return (b.rating || 0) - (a.rating || 0)
      case 'newest': return parseInt(b.id) - parseInt(a.id)
      default: return 0
    }
  })

  return (
    <div className="bg-surface min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="mb-6">
          <nav className="text-xs text-text-secondary mb-2">
            <span>Home</span>
            <span className="mx-1">/</span>
            <span className="text-text-primary font-medium">Shop</span>
          </nav>
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-text-primary">Shop</h1>
            <p className="text-sm text-text-secondary">{sorted.length} products found</p>
          </div>
        </div>

        <div className="flex gap-7">
          {/* Sidebar */}
          <div className="w-64 flex-shrink-0 hidden lg:block">
            <ShopSidebar
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              priceRange={priceRange}
              onPriceChange={setPriceRange}
            />
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Search */}
            <div className="mb-5">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-border rounded-sm text-sm focus:outline-none focus:border-primary bg-white"
                />
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
              </div>
            </div>

            {/* Toolbar */}
            <ShopToolbar
              totalCount={sorted.length}
              sortBy={sortBy}
              onSortChange={setSortBy}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
            />

            {/* Products */}
            {sorted.length > 0 ? (
              <div
                className={
                  viewMode === 'grid'
                    ? 'grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5'
                    : 'space-y-4'
                }
              >
                {sorted.map((product) => (
                  <ProductCard
                    key={product.id}
                    {...product}
                    className={viewMode === 'list' ? 'flex flex-row' : ''}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-lg border border-border">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary-light flex items-center justify-center">
                  <Search size={24} className="text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-text-primary mb-2">No products found</h3>
                <p className="text-sm text-text-secondary">Try adjusting your filters or search query.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
