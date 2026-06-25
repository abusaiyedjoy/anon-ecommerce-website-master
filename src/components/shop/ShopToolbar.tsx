'use client'

import { Grid3X3, List } from 'lucide-react'

interface ShopToolbarProps {
  totalCount: number
  sortBy: string
  onSortChange: (sort: string) => void
  viewMode: 'grid' | 'list'
  onViewModeChange: (mode: 'grid' | 'list') => void
}

const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'newest', label: 'Newest' },
  { value: 'rating', label: 'Best Rated' },
]

export default function ShopToolbar({
  totalCount,
  sortBy,
  onSortChange,
  viewMode,
  onViewModeChange,
}: ShopToolbarProps) {
  return (
    <div className="flex items-center justify-between mb-5 pb-4 border-b border-border">
      <p className="text-sm text-text-secondary">
        Showing{' '}
        <span className="font-semibold text-text-primary">{totalCount}</span>{' '}
        products
      </p>

      <div className="flex items-center gap-3">
        {/* Sort */}
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="text-sm border border-border rounded-sm px-3 py-2 text-text-primary bg-white focus:outline-none focus:border-primary"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        {/* View mode */}
        <div className="flex items-center border border-border rounded-sm overflow-hidden">
          <button
            onClick={() => onViewModeChange('grid')}
            className={`p-2 transition-colors ${
              viewMode === 'grid'
                ? 'bg-primary text-white'
                : 'bg-white text-text-secondary hover:bg-surface'
            }`}
            aria-label="Grid view"
          >
            <Grid3X3 size={16} />
          </button>
          <button
            onClick={() => onViewModeChange('list')}
            className={`p-2 transition-colors border-l border-border ${
              viewMode === 'list'
                ? 'bg-primary text-white'
                : 'bg-white text-text-secondary hover:bg-surface'
            }`}
            aria-label="List view"
          >
            <List size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}
