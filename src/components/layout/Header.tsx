'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Search, Heart, ShoppingBag, User, Menu, X } from 'lucide-react'
import { Input } from '@/components/ui/Input'

export default function Header() {
  const [cartCount] = useState(0)
  const [wishlistCount] = useState(0)
  const [mobileOpen, setMobileOpen] = useState(false)

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
            <Link
              href="/login"
              className="relative p-2 text-text-secondary hover:text-primary transition-colors hidden sm:flex items-center"
              aria-label="My Account"
            >
              <User size={22} />
            </Link>

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
          {['/', '/shop', '/about', '/contact', '/login'].map((href, i) => {
            const labels = ['Home', 'Shop', 'About', 'Contact', 'Login']
            return (
              <Link
                key={href}
                href={href}
                className="block py-2 text-sm font-medium text-text-primary hover:text-primary transition-colors border-b border-border last:border-0"
                onClick={() => setMobileOpen(false)}
              >
                {labels[i]}
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
