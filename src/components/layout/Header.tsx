'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Search, Heart, ShoppingBag, User, Menu, X } from 'lucide-react'
import { Input } from '@/components/ui/Input'

const INITIAL_CART = [
  { id: '1', title: 'Mens Winter Leathers Jackets', category: 'Jacket', price: 48.0, originalPrice: 75.0, image: '/assets/images/products/jacket-1.jpg', size: 'L', color: '#1A1A2E', quantity: 1, rating: 4 },
  { id: '2', title: 'Pure Garment Dyed Cotton Shirt', category: 'Shirt', price: 45.0, originalPrice: 56.0, image: '/assets/images/products/shirt-1.jpg', size: 'M', color: '#FFFFFF', quantity: 2, rating: 3 },
]

export default function Header() {
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [cartCount, setCartCount] = useState(0)
  const [wishlistCount] = useState(0)
  const [mobileOpen, setMobileOpen] = useState(false)

  const syncState = () => {
    // Sync current user
    try {
      const userStr = localStorage.getItem('anon_currentUser')
      if (userStr) {
        setCurrentUser(JSON.parse(userStr))
      } else {
        setCurrentUser(null)
      }
    } catch (e) {
      console.error(e)
    }

    // Sync cart count
    try {
      let cartStr = localStorage.getItem('anon_cart')
      if (!cartStr) {
        // Initialize with default cart items if not present
        localStorage.setItem('anon_cart', JSON.stringify(INITIAL_CART))
        cartStr = JSON.stringify(INITIAL_CART)
      }
      const items = JSON.parse(cartStr)
      const totalItems = items.reduce((sum: number, item: any) => sum + (item.quantity || 0), 0)
      setCartCount(totalItems)
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    syncState()

    window.addEventListener('cart-updated', syncState)
    window.addEventListener('auth-updated', syncState)
    return () => {
      window.removeEventListener('cart-updated', syncState)
      window.removeEventListener('auth-updated', syncState)
    }
  }, [])

  return (
    <div className="site-header">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center gap-6">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <span className="text-2xl font-bold text-text-primary tracking-tight">
              Anon
            </span>
          </Link>

          {/* Search Bar - center */}
          <div className="flex-1 max-w-2xl hidden md:block">
            <form className="relative">
              <Input
                type="search"
                placeholder="Enter your product name..."
                className="pr-12 h-11 rounded-sm"
              />
              <button
                type="submit"
                className="absolute right-0 top-0 h-full px-4 bg-primary text-white rounded-r-sm hover:bg-primary-dark transition-colors"
                aria-label="Search"
              >
                <Search size={18} />
              </button>
            </form>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-1 ml-auto md:ml-0">
            {/* User */}
            {currentUser ? (
              <div className="hidden sm:flex items-center gap-2 px-1">
                <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xs shadow-sm" title={`Logged in as ${currentUser.firstName} ${currentUser.lastName}`}>
                  {(currentUser.firstName[0] || '').toUpperCase()}{(currentUser.lastName[0] || '').toUpperCase()}
                </div>
                <button
                  onClick={() => {
                    localStorage.removeItem('anon_currentUser')
                    window.dispatchEvent(new Event('auth-updated'))
                    window.location.href = '/'
                  }}
                  className="text-xs font-semibold text-text-secondary hover:text-primary transition-colors border border-border hover:border-primary px-2.5 py-1.5 rounded-sm bg-white"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="relative p-2 text-text-secondary hover:text-primary transition-colors hidden sm:flex items-center"
                aria-label="My Account"
              >
                <User size={22} />
              </Link>
            )}

            {/* Wishlist */}
            <Link
              href="#"
              className="relative p-2 text-text-secondary hover:text-primary transition-colors hidden sm:flex items-center"
              aria-label="Wishlist"
            >
              <Heart size={22} />
              {wishlistCount > 0 && (
                <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-primary text-white text-[10px] flex items-center justify-center font-bold">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link
              href="/cart"
              className="relative p-2 text-text-secondary hover:text-primary transition-colors flex items-center"
              aria-label="Cart"
            >
              <ShoppingBag size={22} />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-primary text-white text-[10px] flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              className="p-2 text-text-secondary hover:text-primary transition-colors md:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="mt-3 md:hidden">
          <form className="relative">
            <Input
              type="search"
              placeholder="Search products..."
              className="pr-12 h-10"
            />
            <button
              type="submit"
              className="absolute right-0 top-0 h-full px-3 bg-primary text-white rounded-r-sm hover:bg-primary-dark transition-colors"
            >
              <Search size={16} />
            </button>
          </form>
        </div>
      </div>

      {/* Mobile Nav Overlay */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-white px-4 py-4 space-y-3">
          <Link href="/" className="block py-2 text-sm font-medium text-text-primary hover:text-primary transition-colors border-b border-border" onClick={() => setMobileOpen(false)}>
            Home
          </Link>
          <Link href="/shop" className="block py-2 text-sm font-medium text-text-primary hover:text-primary transition-colors border-b border-border" onClick={() => setMobileOpen(false)}>
            Shop
          </Link>
          <Link href="/about" className="block py-2 text-sm font-medium text-text-primary hover:text-primary transition-colors border-b border-border" onClick={() => setMobileOpen(false)}>
            About
          </Link>
          <Link href="/contact" className="block py-2 text-sm font-medium text-text-primary hover:text-primary transition-colors border-b border-border" onClick={() => setMobileOpen(false)}>
            Contact
          </Link>
          {currentUser ? (
            <div className="pt-2">
              <p className="text-xs text-text-secondary mb-2 font-medium">Logged in as {currentUser.firstName} {currentUser.lastName}</p>
              <button
                onClick={() => {
                  localStorage.removeItem('anon_currentUser')
                  window.dispatchEvent(new Event('auth-updated'))
                  setMobileOpen(false)
                  window.location.href = '/'
                }}
                className="w-full text-left py-2 text-sm font-semibold text-red-500 hover:text-red-700 transition-colors"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <Link href="/login" className="block py-2 text-sm font-medium text-text-primary hover:text-primary transition-colors" onClick={() => setMobileOpen(false)}>
              Login
            </Link>
          )}
        </div>
      )}
    </div>
  )
}
