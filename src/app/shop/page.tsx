'use client'

import { useState } from 'react'
import ProductCard from '@/components/product/ProductCard'
import ShopSidebar from '@/components/shop/ShopSidebar'
import ShopToolbar from '@/components/shop/ShopToolbar'
import { Search } from 'lucide-react'

const ALL_PRODUCTS = [
  { id: '1', image: '/assets/images/products/jacket-1.jpg', title: 'Mens Winter Leathers Jackets', price: 48.0, originalPrice: 75.0, category: 'Clothes', rating: 3, reviews: 8, badge: '15%' },
  { id: '2', image: '/assets/images/products/shirt-1.jpg', title: 'Pure Garment Dyed Cotton Shirt', price: 45.0, originalPrice: 56.0, category: 'Clothes', rating: 3, reviews: 5, badge: 'Sale' },
  { id: '3', image: '/assets/images/products/jacket-2.jpg', title: 'MEN Yarn Fleece Full-Zip Jacket', price: 58.0, originalPrice: 65.0, category: 'Clothes', rating: 3, reviews: 12 },
  { id: '4', image: '/assets/images/products/clothes-4.jpg', title: 'Black Floral Wrap Midi Skirt', price: 25.0, originalPrice: 35.0, category: 'Clothes', rating: 5, reviews: 20, badge: 'New' },
  { id: '5', image: '/assets/images/products/shoe-1.jpg', title: "Casual Men's Brown Shoes", price: 99.0, originalPrice: 105.0, category: 'Footwear', rating: 5, reviews: 18 },
  { id: '6', image: '/assets/images/products/watch-2.jpg', title: 'Pocket Watch Leather Pouch', price: 150.0, originalPrice: 170.0, category: 'Jewelry', rating: 3, reviews: 6, badge: 'Sale' },
  { id: '7', image: '/assets/images/products/watch-1.jpg', title: 'Smart Watch Vital Plus', price: 100.0, originalPrice: 120.0, category: 'Jewelry', rating: 4, reviews: 14 },
  { id: '8', image: '/assets/images/products/party-wear-1.jpg', title: 'Womens Party Wear Shoes', price: 25.0, originalPrice: 30.0, category: 'Footwear', rating: 3, reviews: 9, badge: 'Sale' },
  { id: '9', image: '/assets/images/products/jacket-3.jpg', title: 'Brown Casual Bomber Jacket', price: 78.0, originalPrice: 110.0, category: 'Clothes', rating: 4, reviews: 11 },
  { id: '10', image: '/assets/images/products/sports-1.jpg', title: 'Running & Trekking Shoes - White', price: 49.0, originalPrice: 65.0, category: 'Footwear', rating: 5, reviews: 24 },
  { id: '11', image: '/assets/images/products/sports-2.jpg', title: 'Trekking Running Shoes Black', price: 78.0, originalPrice: 95.0, category: 'Footwear', rating: 4, reviews: 16 },
  { id: '12', image: '/assets/images/products/jewellery-1.jpg', title: 'Rose Gold Earrings Set', price: 25.0, originalPrice: 45.0, category: 'Jewelry', rating: 5, reviews: 10, badge: 'Sale' },
  { id: '13', image: '/assets/images/products/jacket-4.jpg', title: 'Men Slim Fit Formal Jacket', price: 120.0, originalPrice: 160.0, category: 'Clothes', rating: 4, reviews: 7 },
  { id: '14', image: '/assets/images/products/shoe-2.jpg', title: 'High Heel Party Wear Sandals', price: 55.0, originalPrice: 80.0, category: 'Footwear', rating: 3, reviews: 5, badge: 'Sale' },
  { id: '15', image: '/assets/images/products/perfume.jpg', title: 'Luxury Eau de Parfum 100ml', price: 75.0, originalPrice: 110.0, category: 'Perfume', rating: 5, reviews: 32 },
  { id: '16', image: '/assets/images/products/jewellery-2.jpg', title: 'Sterling Silver Bracelet', price: 38.0, originalPrice: 55.0, category: 'Jewelry', rating: 4, reviews: 8 },
]

export default function ShopPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500])
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [sortBy, setSortBy] = useState('featured')

  const filtered = ALL_PRODUCTS.filter((p) => {
    const matchSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchCat = selectedCategory === 'All' || p.category === selectedCategory
    const matchPrice = p.price >= priceRange[0] && p.price <= priceRange[1]
    return matchSearch && matchCat && matchPrice
  })

  const sorted = [...filtered].sort((a, b) => {
    switch (sortBy) {
      case 'price-low': return a.price - b.price
      case 'price-high': return b.price - a.price
      case 'rating': return (b.rating || 0) - (a.rating || 0)
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
          <h1 className="text-2xl font-bold text-text-primary">Shop</h1>
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

            {/* Heading */}
            <h2 className="text-lg font-bold text-text-primary mb-4">
              New Products
            </h2>

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
