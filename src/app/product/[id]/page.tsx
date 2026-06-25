'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Heart, ShoppingCart, GitCompare, Share2, Truck, Shield, RefreshCw, ChevronRight, CheckCircle, Star, Minus, Plus } from 'lucide-react'
import { StarRating } from '@/components/ui/StarRating'
import ProductCard from '@/components/product/ProductCard'
import { getProductById, getRelatedProducts, getAllProducts } from '@/lib/products'

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const { id } = params

  const product = getProductById(id)
  const relatedProducts = product
    ? getRelatedProducts(product.category, id)
    : getAllProducts().slice(0, 4)

  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedSize, setSelectedSize] = useState<string | null>(product?.sizes?.[0] || null)
  const [selectedColor, setSelectedColor] = useState<string | null>(product?.colors?.[0] || null)
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [cartSuccess, setCartSuccess] = useState(false)

  // Reset state when product changes
  useEffect(() => {
    setSelectedImage(0)
    setSelectedSize(product?.sizes?.[0] || null)
    setSelectedColor(product?.colors?.[0] || null)
    setQuantity(1)
    setCartSuccess(false)
  }, [id, product])

  if (!product) {
    return (
      <div className="bg-surface min-h-screen flex items-center justify-center">
        <div className="text-center py-20">
          <ShoppingCart size={56} className="mx-auto mb-4 text-gray-300" />
          <h2 className="text-2xl font-bold text-text-primary mb-3">Product Not Found</h2>
          <p className="text-text-secondary mb-6">The product you are looking for does not exist.</p>
          <Link href="/shop" className="bg-primary hover:bg-primary-dark text-white font-semibold px-6 py-3 rounded-sm transition-colors">
            Back to Shop
          </Link>
        </div>
      </div>
    )
  }

  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size first.')
      return
    }
    if (!selectedColor && product.colors.length > 1) {
      alert('Please select a color first.')
      return
    }

    try {
      const cartStr = localStorage.getItem('anon_cart') || '[]'
      const cartItems: any[] = JSON.parse(cartStr)

      const useColor = selectedColor || product.colors[0]
      const existingIndex = cartItems.findIndex(
        (item) => item.id === product.id && item.size === selectedSize && item.color === useColor
      )

      if (existingIndex >= 0) {
        cartItems[existingIndex].quantity += quantity
      } else {
        cartItems.push({
          id: product.id,
          title: product.title,
          category: product.category,
          price: product.price,
          originalPrice: product.originalPrice,
          image: product.image,
          size: selectedSize,
          color: useColor,
          quantity: quantity,
          rating: product.rating,
        })
      }

      localStorage.setItem('anon_cart', JSON.stringify(cartItems))
      window.dispatchEvent(new Event('cart-updated'))
      setCartSuccess(true)
      setTimeout(() => setCartSuccess(false), 3000)
    } catch (err) {
      console.error('Failed to add to cart:', err)
    }
  }

  return (
    <div className="bg-surface min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1 text-xs text-text-secondary mb-6">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight size={12} />
          <Link href="/shop" className="hover:text-primary transition-colors">Shop</Link>
          <ChevronRight size={12} />
          <Link href={`/shop?category=${product.category.toLowerCase()}`} className="hover:text-primary transition-colors capitalize">{product.category}</Link>
          <ChevronRight size={12} />
          <span className="text-text-primary font-medium line-clamp-1">{product.title}</span>
        </nav>

        {/* Product Detail */}
        <div className="bg-white rounded-xl border border-border p-6 md:p-8 mb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Images */}
            <div>
              {/* Main Image */}
              <div className="relative h-96 md:h-[480px] rounded-lg overflow-hidden bg-surface mb-4">
                <Image
                  src={product.images[selectedImage]}
                  alt={product.title}
                  fill
                  className="object-cover object-center transition-opacity duration-300"
                  priority
                />
                {/* Badge */}
                {product.badge && (
                  <div className={`absolute top-4 left-4 text-white text-xs font-bold uppercase px-3 py-1 rounded-sm ${
                    product.badge === 'New' ? 'bg-primary' : 'bg-text-primary'
                  }`}>
                    {product.badge}
                  </div>
                )}
                {/* Discount badge */}
                {!product.badge && discount > 0 && (
                  <div className="absolute top-4 left-4 bg-green-600 text-white text-xs font-bold uppercase px-3 py-1 rounded-sm">
                    -{discount}%
                  </div>
                )}
              </div>
              {/* Thumbnails */}
              <div className="flex gap-3 overflow-x-auto pb-1">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`relative w-16 h-16 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 ${
                      selectedImage === i ? 'border-primary shadow-sm' : 'border-border hover:border-primary'
                    }`}
                  >
                    <Image src={img} alt={`View ${i + 1}`} fill className="object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Info */}
            <div>
              <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-2">
                {product.category}
              </p>
              <h1 className="text-2xl md:text-3xl font-bold text-text-primary mb-3">{product.title}</h1>

              <div className="flex items-center gap-3 mb-4">
                <StarRating rating={product.rating} showCount count={product.reviews} />
                <span className="text-xs text-text-secondary">|</span>
                <span className="text-xs text-green-600 font-semibold">✓ In Stock</span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-4 pb-4 border-b border-border">
                <span className="text-3xl font-bold text-text-primary">${product.price.toFixed(2)}</span>
                {product.originalPrice > product.price && (
                  <span className="text-lg text-text-secondary line-through">${product.originalPrice.toFixed(2)}</span>
                )}
                {discount > 0 && (
                  <span className="text-sm font-semibold text-primary bg-primary-light px-2 py-0.5 rounded">
                    -{discount}% OFF
                  </span>
                )}
              </div>

              <p className="text-sm text-text-secondary leading-relaxed mb-6">
                {product.description}
              </p>

              {/* Size */}
              <div className="mb-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-text-primary mb-2">
                  Size: {selectedSize && <span className="text-primary font-bold">{selectedSize}</span>}
                  {!selectedSize && <span className="text-text-secondary font-normal normal-case ml-1">— Select a size</span>}
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`min-w-[40px] h-10 px-3 text-xs font-semibold rounded-sm border transition-all ${
                        selectedSize === size
                          ? 'border-primary bg-primary text-white shadow-sm'
                          : 'border-border text-text-primary hover:border-primary hover:text-primary'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Colors */}
              {product.colors.length > 0 && (
                <div className="mb-6">
                  <p className="text-xs font-semibold uppercase tracking-wide text-text-primary mb-2">
                    Color: {selectedColor && <span className="text-primary font-bold ml-1">{selectedColor}</span>}
                  </p>
                  <div className="flex gap-3">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`w-8 h-8 rounded-full border-2 transition-all hover:scale-110 ${
                          selectedColor === color ? 'border-primary scale-110 ring-2 ring-primary/30' : 'border-gray-200'
                        }`}
                        style={{ backgroundColor: color }}
                        aria-label={`Color ${color}`}
                        title={color}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity + Add to Cart */}
              <div className="flex items-center gap-3 mb-5">
                <div className="flex items-center border border-border rounded-sm bg-white">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-10 h-11 flex items-center justify-center text-text-secondary hover:text-primary hover:bg-surface transition-colors"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-12 text-center text-sm font-bold border-x border-border h-11 flex items-center justify-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-10 h-11 flex items-center justify-center text-text-secondary hover:text-primary hover:bg-surface transition-colors"
                  >
                    <Plus size={16} />
                  </button>
                </div>
                <button
                  onClick={handleAddToCart}
                  className="flex-1 flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white font-semibold text-sm py-3 px-6 rounded-sm transition-colors uppercase tracking-wide"
                >
                  <ShoppingCart size={18} />
                  Add to Cart
                </button>
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`w-11 h-11 rounded-sm border flex items-center justify-center transition-all ${
                    isWishlisted
                      ? 'border-primary bg-primary text-white'
                      : 'border-border text-text-secondary hover:border-primary hover:text-primary'
                  }`}
                  aria-label="Add to wishlist"
                >
                  <Heart size={18} className={isWishlisted ? 'fill-current' : ''} />
                </button>
              </div>

              {/* Cart Success Message */}
              {cartSuccess && (
                <div className="flex items-center gap-2 text-green-600 bg-green-50 border border-green-200 rounded-sm px-4 py-3 mb-4 text-sm font-medium">
                  <CheckCircle size={16} />
                  Added to cart!{' '}
                  <Link href="/cart" className="underline hover:no-underline font-semibold ml-1">
                    View Cart →
                  </Link>
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center gap-4 mb-6 text-xs text-text-secondary">
                <button className="flex items-center gap-1 hover:text-primary transition-colors">
                  <GitCompare size={14} /> Compare
                </button>
                <button className="flex items-center gap-1 hover:text-primary transition-colors">
                  <Share2 size={14} /> Share
                </button>
              </div>

              {/* Guarantees */}
              <div className="border-t border-border pt-5 grid grid-cols-3 gap-3">
                {[
                  { icon: Truck, label: 'Free Shipping', sub: 'On orders $55+' },
                  { icon: Shield, label: 'Secure Payment', sub: '100% Protected' },
                  { icon: RefreshCw, label: 'Free Returns', sub: 'Within 30 days' },
                ].map(({ icon: Icon, label, sub }) => (
                  <div key={label} className="text-center">
                    <Icon size={22} className="mx-auto mb-1 text-primary" />
                    <p className="text-xs font-semibold text-text-primary">{label}</p>
                    <p className="text-[10px] text-text-secondary">{sub}</p>
                  </div>
                ))}
              </div>

              {/* Product Meta */}
              <div className="border-t border-border pt-4 mt-4 space-y-1 text-xs text-text-secondary">
                <p><span className="font-semibold text-text-primary">SKU:</span> ANON-{product.id.padStart(4, '0')}</p>
                <p><span className="font-semibold text-text-primary">Category:</span> {product.category}</p>
                <p>
                  <span className="font-semibold text-text-primary">Tags:</span>{' '}
                  {product.category}, Fashion, Trending
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="bg-white rounded-xl border border-border p-6 md:p-8 mb-10">
          <h2 className="text-xl font-bold text-text-primary mb-6">Customer Reviews</h2>
          <div className="flex flex-col md:flex-row gap-10">
            {/* Rating Summary */}
            <div className="flex-shrink-0 text-center">
              <div className="text-6xl font-extrabold text-text-primary">{product.rating}.0</div>
              <StarRating rating={product.rating} className="justify-center mt-2" />
              <p className="text-sm text-text-secondary mt-1">Based on {product.reviews} reviews</p>
            </div>
            {/* Star Bars */}
            <div className="flex-1 space-y-2">
              {[5, 4, 3, 2, 1].map((star) => {
                const pct = star === product.rating ? 65 : star === product.rating - 1 ? 20 : star > product.rating ? 0 : 10
                return (
                  <div key={star} className="flex items-center gap-3 text-sm">
                    <span className="w-6 text-text-secondary text-right">{star}</span>
                    <Star size={14} className="text-gold fill-gold flex-shrink-0" />
                    <div className="flex-1 h-2 bg-surface rounded-full overflow-hidden">
                      <div className="h-full bg-gold rounded-full transition-all" style={{ width: `${pct}%` }} />
                    </div>
                    <span className="w-8 text-text-secondary">{pct}%</span>
                  </div>
                )
              })}
            </div>
            {/* Sample review */}
            <div className="flex-1 border-l border-border pl-8 hidden md:block">
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold">JD</div>
                  <span className="text-sm font-semibold text-text-primary">John Doe</span>
                  <StarRating rating={product.rating} size="sm" />
                </div>
                <p className="text-xs text-text-secondary leading-relaxed">
                  "Great product! The quality is exactly as described and the delivery was fast. Would definitely recommend this to friends and family."
                </p>
                <p className="text-[10px] text-text-secondary mt-1">2 days ago</p>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs font-bold">SA</div>
                  <span className="text-sm font-semibold text-text-primary">Sarah A.</span>
                  <StarRating rating={Math.max(3, product.rating - 1)} size="sm" />
                </div>
                <p className="text-xs text-text-secondary leading-relaxed">
                  "Good value for money. Fits well and looks stylish. The material feels premium for the price."
                </p>
                <p className="text-[10px] text-text-secondary mt-1">1 week ago</p>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-text-primary">Related Products</h2>
            <Link href="/shop" className="text-sm text-primary hover:text-primary-dark font-medium transition-colors">
              View All →
            </Link>
          </div>
          {relatedProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} {...p} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {getAllProducts().filter(p => p.id !== id).slice(0, 4).map((p) => (
                <ProductCard key={p.id} {...p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
