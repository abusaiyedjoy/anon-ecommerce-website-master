'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { Heart, Share2, Truck, Shield, RotateCcw, ChevronRight } from 'lucide-react'

export default function ProductPage({ params }: { params: { id: string } }) {
  const [quantity, setQuantity] = useState(1)
  const [isFavorite, setIsFavorite] = useState(false)

  // Mock product data
  const product = {
    id: params.id,
    title: 'Premium Leather Jacket',
    price: 129.99,
    originalPrice: 199.99,
    rating: 4.5,
    reviews: 128,
    inStock: true,
    sku: 'LJ-2024-001',
    category: 'Fashion',
    description: 'Premium quality leather jacket perfect for any occasion. Made with genuine leather and designed for comfort and style.',
    images: [
      '/assets/images/products/jacket-1.jpg',
      '/assets/images/products/jacket-3.jpg',
    ],
    specifications: [
      { label: 'Material', value: 'Genuine Leather' },
      { label: 'Color', value: 'Black' },
      { label: 'Size Range', value: 'XS - XXL' },
      { label: 'Care', value: 'Hand wash recommended' },
    ],
    features: [
      'Premium genuine leather',
      'Comfortable fit',
      'Durable stitching',
      'Multiple pockets',
      'Adjustable cuffs',
    ],
  }

  const [selectedImage, setSelectedImage] = useState(0)

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="border-b border-slate-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/shop" className="hover:text-primary transition-colors">
              Shop
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-slate-900 font-medium">{product.title}</span>
          </div>
        </div>
      </div>

      {/* Product Details */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Images */}
          <div className="space-y-4">
            <div className="relative h-96 overflow-hidden rounded-lg bg-slate-100">
              <Image
                src={product.images[selectedImage]}
                alt={product.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex gap-3">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative h-20 w-20 overflow-hidden rounded-lg border-2 transition-all ${
                    selectedImage === index ? 'border-blue-600' : 'border-transparent'
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${product.title} ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="space-y-6">
            {/* Header */}
            <div>
              <div className="mb-3 inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-600">
                {product.category}
              </div>
              <h1 className="mb-2 text-3xl font-bold text-slate-900">{product.title}</h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex text-yellow-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i}>{i < Math.floor(product.rating) ? '★' : '☆'}</span>
                  ))}
                </div>
                <span className="text-sm text-slate-600">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold text-slate-900">
                  ${product.price.toFixed(2)}
                </span>
                <span className="line-through text-lg text-slate-500">
                  ${product.originalPrice.toFixed(2)}
                </span>
                <span className="text-sm font-semibold text-green-600">
                  Save {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                </span>
              </div>
            </div>

            {/* Stock Status */}
            <div>
              {product.inStock ? (
                <div className="inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                  ✓ In Stock
                </div>
              ) : (
                <div className="inline-flex items-center gap-2 rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-700">
                  Out of Stock
                </div>
              )}
            </div>

            {/* Description */}
            <p className="text-slate-600">{product.description}</p>

            {/* Quantity & Actions */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-slate-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 text-slate-600 hover:bg-slate-100"
                  >
                    −
                  </button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2 text-slate-600 hover:bg-slate-100"
                  >
                    +
                  </button>
                </div>
                <Button className="flex-1">Add to Cart</Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setIsFavorite(!isFavorite)}
                >
                  <Heart
                    className={`h-5 w-5 ${
                      isFavorite ? 'fill-red-500 text-red-500' : 'text-slate-600'
                    }`}
                  />
                </Button>
                <Button variant="outline" size="icon">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Features */}
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Truck className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-slate-900">Free Shipping</p>
                      <p className="text-sm text-slate-600">On orders over $50</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Shield className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-slate-900">Secure Payment</p>
                      <p className="text-sm text-slate-600">100% protected transactions</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <RotateCcw className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-slate-900">Easy Returns</p>
                      <p className="text-sm text-slate-600">30-day return policy</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* SKU */}
            <div className="pt-4 border-t border-slate-200">
              <p className="text-sm text-slate-600">
                SKU: <span className="font-medium text-slate-900">{product.sku}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Specifications & Features */}
        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {/* Specifications */}
          <Card>
            <div className="border-b border-slate-200 p-6">
              <h2 className="text-lg font-semibold text-slate-900">Specifications</h2>
            </div>
            <CardContent className="pt-0">
              <table className="w-full text-sm">
                <tbody>
                  {product.specifications.map((spec, index) => (
                    <tr
                      key={index}
                      className="border-b border-slate-200 last:border-b-0"
                    >
                      <td className="py-3 font-medium text-slate-600">{spec.label}</td>
                      <td className="py-3 text-slate-900">{spec.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>

          {/* Features */}
          <Card>
            <div className="border-b border-slate-200 p-6">
              <h2 className="text-lg font-semibold text-slate-900">Features</h2>
            </div>
            <CardContent>
              <ul className="space-y-3 pt-6">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="mt-1.5 h-2 w-2 rounded-full bg-blue-600 flex-shrink-0"></span>
                    <span className="text-slate-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
