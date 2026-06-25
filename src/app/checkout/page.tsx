'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Label } from '@/components/ui/Label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/Card'
import { ChevronRight, CreditCard, ShoppingBag, Truck, Lock, CheckCircle, ArrowRight } from 'lucide-react'

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
}

export default function CheckoutPage() {
  const router = useRouter()
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isMounted, setIsMounted] = useState(false)
  const [orderSuccess, setOrderSuccess] = useState(false)
  const [orderNumber, setOrderNumber] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('card')

  // Form Fields
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    address: '',
    city: '',
    country: 'United States',
    zip: '',
    phone: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
  })

  useEffect(() => {
    try {
      // Load current user
      const userStr = localStorage.getItem('anon_currentUser')
      if (userStr) {
        const user = JSON.parse(userStr)
        setCurrentUser(user)
        setFormData((prev) => ({
          ...prev,
          fullName: `${user.firstName} ${user.lastName}`,
          email: user.email,
          phone: user.phone || '',
        }))
      }

      // Load cart
      const cartStr = localStorage.getItem('anon_cart')
      if (cartStr) {
        setCartItems(JSON.parse(cartStr))
      }
    } catch (e) {
      console.error(e)
    }
    setIsMounted(true)
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault()

    // 1. Generate Order Number
    const mockOrderNum = 'ANON-' + Math.floor(100000 + Math.random() * 900000)
    setOrderNumber(mockOrderNum)

    // 2. Save Order in localStorage
    try {
      const ordersStr = localStorage.getItem('anon_orders') || '[]'
      const orders = JSON.parse(ordersStr)
      const newOrder = {
        orderNumber: mockOrderNum,
        date: new Date().toLocaleDateString(),
        items: cartItems,
        total: total,
        billing: {
          fullName: formData.fullName,
          address: formData.address,
          city: formData.city,
          country: formData.country,
          zip: formData.zip,
        },
        paymentMethod: paymentMethod,
      }
      orders.push(newOrder)
      localStorage.setItem('anon_orders', JSON.stringify(orders))

      // 3. Clear Cart
      localStorage.removeItem('anon_cart')
      // Dispatch cart updated event
      window.dispatchEvent(new Event('cart-updated'))

      // 4. Set Success State
      setOrderSuccess(true)
    } catch (err) {
      console.error('Error placing order:', err)
    }
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = subtotal >= 55 ? 0 : 5.99
  const total = subtotal + shipping

  if (!isMounted) {
    return (
      <div className="bg-surface min-h-screen py-8 flex items-center justify-center">
        <div className="text-center py-24">
          <ShoppingBag size={56} className="mx-auto mb-4 text-gray-300 animate-pulse" />
          <h3 className="text-lg font-semibold text-text-primary">Verifying Checkout...</h3>
        </div>
      </div>
    )
  }

  // 1. Auth Guard State
  if (!currentUser) {
    return (
      <div className="bg-surface min-h-screen py-16 px-4">
        <div className="container mx-auto max-w-md">
          <Card className="text-center p-6 bg-white border border-border">
            <CardHeader>
              <div className="w-16 h-16 bg-primary-light rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="text-primary h-8 w-8" />
              </div>
              <CardTitle className="text-xl">Authentication Required</CardTitle>
              <CardDescription className="mt-2">
                Please sign in to your account to complete checkout and manage your orders.
              </CardDescription>
            </CardHeader>
            <CardFooter className="flex flex-col gap-3 pt-6">
              <Link href="/login?redirect=/checkout" className="w-full">
                <Button className="w-full py-2.5">Sign In to Checkout</Button>
              </Link>
              <Link href="/register" className="text-sm text-primary font-semibold hover:underline">
                Create an account
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    )
  }

  // 2. Empty Cart State
  if (cartItems.length === 0 && !orderSuccess) {
    return (
      <div className="bg-surface min-h-screen py-16 px-4">
        <div className="container mx-auto max-w-md">
          <Card className="text-center p-6 bg-white border border-border">
            <CardHeader>
              <div className="w-16 h-16 bg-surface rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="text-text-secondary h-8 w-8" />
              </div>
              <CardTitle className="text-xl">Your Cart is Empty</CardTitle>
              <CardDescription className="mt-2">
                Add some items to your shopping cart to proceed to checkout.
              </CardDescription>
            </CardHeader>
            <CardFooter className="pt-6 justify-center">
              <Link href="/shop">
                <Button className="py-2.5">Continue Shopping</Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    )
  }

  // 3. Order Success State
  if (orderSuccess) {
    return (
      <div className="bg-surface min-h-screen py-16 px-4">
        <div className="container mx-auto max-w-lg">
          <Card className="p-8 bg-white border border-border text-center shadow-card">
            <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="text-green-500 h-10 w-10 animate-bounce" />
            </div>
            <h1 className="text-3xl font-extrabold text-text-primary mb-3">Order Confirmed!</h1>
            <p className="text-text-secondary mb-6">
              Thank you for your purchase. We have received your order and will start processing it right away.
            </p>

            <div className="bg-surface rounded-lg p-5 border border-border text-left mb-8 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary font-medium">Order Number:</span>
                <span className="font-bold text-text-primary">{orderNumber}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary font-medium">Shipping Address:</span>
                <span className="font-bold text-text-primary text-right">{formData.address}, {formData.city}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary font-medium">Delivery Estimate:</span>
                <span className="font-bold text-green-600">3–5 Business Days</span>
              </div>
              <div className="flex justify-between text-sm border-t border-border pt-3">
                <span className="text-text-secondary font-semibold">Total Paid:</span>
                <span className="font-bold text-primary text-base">${total.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/shop" className="flex-1">
                <Button variant="outline" className="w-full py-2.5">
                  Continue Shopping
                </Button>
              </Link>
              <Link href="/" className="flex-1">
                <Button className="w-full py-2.5">
                  Back to Home
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    )
  }

  // 4. Main Checkout Form
  return (
    <div className="bg-surface min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1 text-xs text-text-secondary mb-6">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight size={12} />
          <Link href="/cart" className="hover:text-primary transition-colors">Cart</Link>
          <ChevronRight size={12} />
          <span className="text-text-primary font-medium">Checkout</span>
        </nav>

        <h1 className="text-2xl font-bold text-text-primary mb-8">Checkout</h1>

        <form onSubmit={handlePlaceOrder}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Side: Billing & Shipping Forms */}
            <div className="lg:col-span-2 space-y-6">
              {/* Billing Address Card */}
              <Card className="bg-white border border-border">
                <CardHeader>
                  <CardTitle className="text-base font-bold tracking-wider">Billing & Shipping Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Full Name */}
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="John Doe"
                      required
                    />
                  </div>

                  {/* Email & Phone */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+1 (555) 000-0000"
                        required
                      />
                    </div>
                  </div>

                  {/* Address */}
                  <div className="space-y-2">
                    <Label htmlFor="address">Street Address</Label>
                    <Input
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="123 Fashion Street"
                      required
                    />
                  </div>

                  {/* City, ZIP, Country */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="New York"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="zip">ZIP / Postal Code</Label>
                      <Input
                        id="zip"
                        name="zip"
                        value={formData.zip}
                        onChange={handleChange}
                        placeholder="10001"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="country">Country</Label>
                      <select
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        className="w-full rounded-sm border border-border bg-white px-3 py-2 text-sm text-text-primary focus:outline-none focus:border-primary h-[42px]"
                        required
                      >
                        <option value="United States">United States</option>
                        <option value="Canada">Canada</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="Australia">Australia</option>
                      </select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Method Card */}
              <Card className="bg-white border border-border">
                <CardHeader>
                  <CardTitle className="text-base font-bold tracking-wider">Payment Method</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Payment Types Radios */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <label className={`flex items-center gap-3 p-4 border rounded-sm cursor-pointer transition-colors ${paymentMethod === 'card' ? 'border-primary bg-primary-light/30' : 'border-border hover:border-gray-300'}`}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="card"
                        checked={paymentMethod === 'card'}
                        onChange={() => setPaymentMethod('card')}
                        className="accent-primary"
                      />
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold text-text-primary flex items-center gap-1.5">
                          <CreditCard size={15} /> Card
                        </span>
                        <span className="text-[10px] text-text-secondary">Visa, Mastercard</span>
                      </div>
                    </label>

                    <label className={`flex items-center gap-3 p-4 border rounded-sm cursor-pointer transition-colors ${paymentMethod === 'paypal' ? 'border-primary bg-primary-light/30' : 'border-border hover:border-gray-300'}`}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="paypal"
                        checked={paymentMethod === 'paypal'}
                        onChange={() => setPaymentMethod('paypal')}
                        className="accent-primary"
                      />
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold text-text-primary">PayPal</span>
                        <span className="text-[10px] text-text-secondary">Express Checkout</span>
                      </div>
                    </label>

                    <label className={`flex items-center gap-3 p-4 border rounded-sm cursor-pointer transition-colors ${paymentMethod === 'cod' ? 'border-primary bg-primary-light/30' : 'border-border hover:border-gray-300'}`}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cod"
                        checked={paymentMethod === 'cod'}
                        onChange={() => setPaymentMethod('cod')}
                        className="accent-primary"
                      />
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold text-text-primary flex items-center gap-1.5">
                          <Truck size={15} /> COD
                        </span>
                        <span className="text-[10px] text-text-secondary">Cash on Delivery</span>
                      </div>
                    </label>
                  </div>

                  {/* Card Fields Conditional */}
                  {paymentMethod === 'card' && (
                    <div className="space-y-4 pt-4 border-t border-border">
                      <div className="space-y-2">
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <Input
                          id="cardNumber"
                          name="cardNumber"
                          value={formData.cardNumber}
                          onChange={handleChange}
                          placeholder="4000 1234 5678 9010"
                          required={paymentMethod === 'card'}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="cardExpiry">Expiration Date</Label>
                          <Input
                            id="cardExpiry"
                            name="cardExpiry"
                            value={formData.cardExpiry}
                            onChange={handleChange}
                            placeholder="MM/YY"
                            required={paymentMethod === 'card'}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cardCvc">CVC / CVV</Label>
                          <Input
                            id="cardCvc"
                            name="cardCvc"
                            value={formData.cardCvc}
                            onChange={handleChange}
                            placeholder="123"
                            required={paymentMethod === 'card'}
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'paypal' && (
                    <div className="p-4 bg-slate-50 border border-border text-center text-xs text-text-secondary rounded-sm">
                      Redirects to PayPal securely upon completing order details.
                    </div>
                  )}

                  {paymentMethod === 'cod' && (
                    <div className="p-4 bg-slate-50 border border-border text-center text-xs text-text-secondary rounded-sm">
                      Please pay with cash to our courier partner upon delivery.
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Right Side: Order Summary */}
            <div>
              <div className="sticky top-28 space-y-6">
                <Card className="bg-white border border-border shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-base font-bold tracking-wider">Your Order</CardTitle>
                  </CardHeader>
                  <CardContent className="divide-y divide-border">
                    {/* Items List */}
                    <div className="max-h-60 overflow-y-auto mb-4 pr-1">
                      {cartItems.map((item) => (
                        <div key={item.id} className="flex gap-3 py-3 items-center">
                          <div className="relative w-12 h-12 flex-shrink-0 rounded-md overflow-hidden bg-surface border border-border">
                            <Image src={item.image} alt={item.title} fill className="object-cover" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-semibold text-text-primary line-clamp-1">{item.title}</p>
                            <p className="text-[10px] text-text-secondary">
                              Qty: {item.quantity} | Size: {item.size}
                            </p>
                          </div>
                          <div className="text-xs font-bold text-text-primary">
                            ${(item.price * item.quantity).toFixed(2)}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Totals */}
                    <div className="space-y-2.5 pt-4 text-sm text-text-secondary">
                      <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span className="font-semibold text-text-primary">${subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Shipping</span>
                        <span className="font-semibold text-text-primary">
                          {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                        </span>
                      </div>
                      <div className="flex justify-between border-t border-border pt-3 font-bold text-base text-text-primary">
                        <span>Total</span>
                        <span className="text-primary">${total.toFixed(2)}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-4">
                    <Button
                      type="submit"
                      className="w-full flex items-center justify-center gap-2 py-3 bg-primary hover:bg-primary-dark text-white font-bold text-sm rounded-sm transition-colors uppercase tracking-wide"
                    >
                      Place Order <ArrowRight size={16} />
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
