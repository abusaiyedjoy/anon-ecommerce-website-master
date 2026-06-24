'use client'

import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import Link from 'next/link'
import { Award, Users, TrendingUp, Globe, Zap, Heart } from 'lucide-react'

export default function AboutPage() {
  const stats = [
    { label: 'Products', value: '10,000+', icon: Award },
    { label: 'Happy Customers', value: '50,000+', icon: Users },
    { label: 'Countries', value: '45+', icon: Globe },
    { label: 'Growth Rate', value: '150%', icon: TrendingUp },
  ]

  const values = [
    {
      icon: Zap,
      title: 'Innovation',
      description: 'We constantly innovate to bring you the latest products and technologies.',
    },
    {
      icon: Heart,
      title: 'Customer First',
      description: 'Your satisfaction is our top priority. We go the extra mile for you.',
    },
    {
      icon: Award,
      title: 'Quality',
      description: 'We only offer premium products that meet our strict quality standards.',
    },
  ]

  const team = [
    { name: 'John Doe', role: 'Founder & CEO', image: '/assets/images/logo/logo.svg' },
    { name: 'Jane Smith', role: 'Chief Product Officer', image: '/assets/images/logo/logo.svg' },
    { name: 'Mike Johnson', role: 'Chief Technology Officer', image: '/assets/images/logo/logo.svg' },
    { name: 'Sarah Williams', role: 'Head of Operations', image: '/assets/images/logo/logo.svg' },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">About Anon</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            We're passionate about delivering the best shopping experience with quality products
            and exceptional customer service.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            {stats.map((stat) => {
              const Icon = stat.icon
              return (
                <Card key={stat.label} className="text-center">
                  <CardContent className="pt-6">
                    <Icon className="mx-auto mb-4 h-10 w-10 text-blue-600" />
                    <p className="text-3xl font-bold text-slate-900 mb-2">{stat.value}</p>
                    <p className="text-slate-600">{stat.label}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <h2 className="text-4xl font-bold text-slate-900 mb-6">Our Story</h2>
              <p className="text-slate-600 mb-4">
                Anon was founded in 2020 with a simple vision: to make quality products accessible
                to everyone. What started as a small online store has grown into a thriving e-commerce
                platform serving thousands of customers worldwide.
              </p>
              <p className="text-slate-600 mb-4">
                We believe in the power of technology to transform shopping. Our platform combines
                cutting-edge features with an intuitive interface to create the best possible shopping
                experience for our customers.
              </p>
              <p className="text-slate-600 mb-6">
                Today, we continue to grow and innovate, always keeping our customers at the heart
                of everything we do. We're committed to delivering excellence in every aspect of our
                business.
              </p>
              <Button size="lg" asChild>
                <Link href="/shop">Shop Now</Link>
              </Button>
            </div>
            <div className="relative h-96 rounded-lg overflow-hidden bg-gradient-to-br from-blue-200 to-blue-300">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white">
                  <p className="text-lg font-semibold">Anon Store</p>
                  <p className="text-sm opacity-80">Since 2020</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-slate-900 text-center mb-12">Our Core Values</h2>
          <div className="grid gap-8 md:grid-cols-3">
            {values.map((value) => {
              const Icon = value.icon
              return (
                <Card key={value.title}>
                  <CardContent className="pt-6">
                    <Icon className="mb-4 h-12 w-12 text-blue-600" />
                    <h3 className="mb-3 text-xl font-semibold text-slate-900">
                      {value.title}
                    </h3>
                    <p className="text-slate-600">{value.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-slate-900 text-center mb-12">Our Team</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {team.map((member) => (
              <Card key={member.name} className="text-center overflow-hidden">
                <div className="h-48 bg-gradient-to-br from-blue-200 to-blue-300"></div>
                <CardContent className="pt-6 pb-6">
                  <h3 className="mb-1 text-lg font-semibold text-slate-900">
                    {member.name}
                  </h3>
                  <p className="text-sm text-blue-600 font-medium">{member.role}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-slate-900 text-center mb-12">
            Why Choose Anon?
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {[
              'Wide selection of quality products',
              'Competitive pricing and frequent discounts',
              'Fast and reliable shipping',
              'Secure payment options',
              'Excellent customer service',
              '30-day money back guarantee',
              'Free returns on most items',
              'Regular new product launches',
            ].map((reason, index) => (
              <div key={index} className="flex items-start gap-3">
                <span className="mt-1 h-6 w-6 rounded-full bg-blue-600 text-white flex items-center justify-center flex-shrink-0 text-sm">
                  ✓
                </span>
                <p className="text-slate-700">{reason}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Shop?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Discover our amazing collection of products and enjoy the best shopping experience.
          </p>
          <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50" asChild>
            <Link href="/shop">Explore Our Store</Link>
          </Button>
        </div>
      </section>

      {/* Contact */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Questions?</h2>
          <p className="text-slate-600 mb-6">
            Get in touch with our support team. We're here to help!
          </p>
          <Button variant="outline" size="lg" asChild>
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
