'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Trash2, Plus, Minus, ShoppingBag, ChevronRight, Tag, ArrowRight } from 'lucide-react'
import { StarRating } from '@/components/ui/StarRating'

interface CartItem {
  id: string
  title: string
  category: string
  price: number
  originalPrice: number
  image: string
  size: string
  color: string
  quantity: number
  rating: number
}

const INITIAL_CART: CartItem[] = [
  { id: '1', title: 'Mens Winter Leathers Jackets', category: 'Jacket', price: 48.0, originalPrice: 75.0, image: '/assets/images/products/jacket-1.jpg', size: 'L', color: '#1A1A2E', quantity: 1, rating: 4 },
  { id: '2', title: 'Pure Garment Dyed Cotton Shirt', category: 'Shirt', price: 45.0, originalPrice: 56.0, image: '/assets/images/products/shirt-1.jpg', size: 'M', color: '#FFFFFF', quantity: 2, rating: 3 },
]

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [coupon, setCoupon] = useState('')
  const [isMounted, setIsMounted] = useState(false)

  // Load from localStorage on mount
  useEffect(() => {
    try {
      let cartStr = localStorage.getItem('anon_cart')
      if (!cartStr) {
        localStorage.setItem('anon_cart', JSON.stringify(INITIAL_CART))
        cartStr = JSON.stringify(INITIAL_CART)
      }
      setCartItems(JSON.parse(cartStr))
    } catch (e) {
      console.error(e)
    }
    setIsMounted(true)
  }, [])

  const saveCart = (items: CartItem[]) => {
    try {
      localStorage.setItem('anon_cart', JSON.stringify(items))
      window.dispatchEvent(new Event('cart-updated'))
    } catch (e) {
      console.error(e)
    }
  }

  const updateQty = (id: string, size: string, color: string, delta: number) => {
    const updated = cartItems.map((item) =>
      (item.id === id && item.size === size && item.color === color)
        ? { ...item, quantity: Math.max(1, item.quantity + delta) }
        : item
    )
    setCartItems(updated)
    saveCart(updated)
  }

  const removeItem = (id: string, size: string, color: string) => {
    const updated = cartItems.filter(
      (item) => !(item.id === id && item.size === size && item.color === color)
    )
    setCartItems(updated)
    saveCart(updated)
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = subtotal >= 55 ? 0 : 5.99
  const total = subtotal + shipping

  if (!isMounted) {
    return (
      <div className="bg-surface min-h-screen py-8 flex items-center justify-center">
        <div className="text-center py-24">
          <ShoppingBag size={56} className="mx-auto mb-4 text-gray-300 animate-pulse" />
          <h3 className="text-lg font-semibold text-text-primary">Loading cart...</h3>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-surface min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1 text-xs text-text-secondary mb-6">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight size={12} />
          <span className="text-text-primary font-medium">Shopping Cart</span>
        </nav>

        <h1 className="text-2xl font-bold text-text-primary mb-8">Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-xl border border-border">
            <ShoppingBag size={56} className="mx-auto mb-4 text-gray-300" />
            <h3 className="text-xl font-semibold text-text-primary mb-2">Your cart is empty</h3>
            <p className="text-sm text-text-secondary mb-6">Looks like you haven&apos;t added anything yet.</p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white font-semibold text-sm px-8 py-3 rounded-sm transition-colors uppercase tracking-wide"
            >
              Continue Shopping <ArrowRight size={16} />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {/* Table Header */}
              <div className="hidden md:grid grid-cols-12 gap-4 text-xs font-semibold uppercase tracking-widest text-text-secondary pb-3 border-b border-border">
                <div className="col-span-6">Product</div>
                <div className="col-span-2 text-center">Price</div>
                <div className="col-span-2 text-center">Qty</div>
                <div className="col-span-2 text-right">Total</div>
              </div>

              {cartItems.map((item) => (
                <div key={`${item.id}-${item.size}-${item.color}`} className="bg-white rounded-lg border border-border p-4">
                  <div className="md:grid md:grid-cols-12 md:gap-4 md:items-center flex flex-col gap-4">
                    {/* Product */}
                    <div className="col-span-6 flex items-center gap-4">
                      <Link href={`/product/${item.id}`} className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-surface">
                        <Image src={item.image} alt={item.title} fill className="object-cover" />
                      </Link>
                      <div className="flex-1 min-w-0">
                        <p className="text-[10px] font-semibold text-primary uppercase tracking-widest mb-0.5">
                          {item.category}
                        </p>
                        <Link href={`/product/${item.id}`} className="text-sm font-medium text-text-primary hover:text-primary transition-colors line-clamp-2">
                          {item.title}
                        </Link>
                        <StarRating rating={item.rating} size="sm" className="my-1" />
                        <div className="flex items-center gap-3 text-xs text-text-secondary">
                          <span>Size: <strong>{item.size}</strong></span>
                          <span className="flex items-center gap-1">
                            Color: <span className="inline-block w-3 h-3 rounded-full border border-border ml-1" style={{ backgroundColor: item.color }} />
                          </span>
                        </div>
                        <button
                          onClick={() => removeItem(item.id, item.size, item.color)}
                          className="flex items-center gap-1 text-xs text-red-400 hover:text-red-600 transition-colors mt-1"
                        >
                          <Trash2 size={12} /> Remove
                        </button>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="col-span-2 text-center">
                      <p className="text-sm font-semibold text-text-primary">${item.price.toFixed(2)}</p>
                      {item.originalPrice > item.price && (
                        <p className="text-xs text-text-secondary line-through">${item.originalPrice.toFixed(2)}</p>
                      )}
                    </div>

                    {/* Quantity */}
                    <div className="col-span-2 flex justify-center">
                      <div className="flex items-center border border-border rounded-sm">
                        <button
                          onClick={() => updateQty(item.id, item.size, item.color, -1)}
                          className="w-8 h-8 flex items-center justify-center text-text-secondary hover:text-primary transition-colors"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-8 text-center text-sm font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => updateQty(item.id, item.size, item.color, 1)}
                          className="w-8 h-8 flex items-center justify-center text-text-secondary hover:text-primary transition-colors"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>

                    {/* Total */}
                    <div className="col-span-2 text-right">
                      <p className="text-sm font-bold text-primary">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Link
                  href="/shop"
                  className="flex-1 text-center border border-border bg-white hover:border-primary hover:text-primary text-text-primary font-semibold text-sm py-2.5 px-6 rounded-sm transition-colors uppercase tracking-wide"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>

            {/* Order Summary */}
            <div className="space-y-5">
              {/* Coupon */}
              <div className="bg-white rounded-lg border border-border p-5">
                <h3 className="text-sm font-bold text-text-primary uppercase tracking-widest mb-4 pb-2 border-b border-border">
                  Coupon Code
                </h3>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
                    <input
                      type="text"
                      placeholder="Enter coupon..."
                      value={coupon}
                      onChange={(e) => setCoupon(e.target.value)}
                      className="w-full pl-8 pr-3 py-2 border border-border rounded-sm text-sm focus:outline-none focus:border-primary"
                    />
                  </div>
                  <button className="bg-primary hover:bg-primary-dark text-white font-semibold text-sm px-4 py-2 rounded-sm transition-colors">
                    Apply
                  </button>
                </div>
              </div>

              {/* Summary */}
              <div className="bg-white rounded-lg border border-border p-5">
                <h3 className="text-sm font-bold text-text-primary uppercase tracking-widest mb-4 pb-2 border-b border-border">
                  Order Summary
                </h3>
                <div className="space-y-3 text-sm mb-4">
                  <div className="flex justify-between text-text-secondary">
                    <span>Subtotal ({cartItems.reduce((s, i) => s + i.quantity, 0)} items)</span>
                    <span className="font-semibold text-text-primary">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-text-secondary">
                    <span>Shipping</span>
                    <span className="font-semibold text-text-primary">
                      {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  {shipping === 0 && (
                    <p className="text-xs text-green-600 font-medium">🎉 You qualify for free shipping!</p>
                  )}
                  {shipping > 0 && (
                    <p className="text-xs text-text-secondary">
                      Add <strong>${(55 - subtotal).toFixed(2)}</strong> more for free shipping
                    </p>
                  )}
                </div>
                <div className="border-t border-border pt-3 flex justify-between font-bold text-base mb-5">
                  <span>Total</span>
                  <span className="text-primary">${total.toFixed(2)}</span>
                </div>
                <Link href="/checkout" className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white font-bold text-sm py-3 rounded-sm transition-colors uppercase tracking-wide">
                  Proceed to Checkout <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
