import Link from 'next/link'
import Image from 'next/image'
import { ChevronRight, Users, Award, Globe, Heart } from 'lucide-react'

const STATS = [
  { value: '15K+', label: 'Happy Customers' },
  { value: '8K+', label: 'Products' },
  { value: '50+', label: 'Brands' },
  { value: '99%', label: 'Satisfaction Rate' },
]

const TEAM = [
  { name: 'Sarah Johnson', role: 'Founder & CEO', image: '/assets/images/testimonial-1.jpg' },
  { name: 'Mike Chen', role: 'Head of Design', image: '/assets/images/blog-1.jpg' },
  { name: 'Emma Wilson', role: 'Head of Marketing', image: '/assets/images/blog-2.jpg' },
]

export default function AboutPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Page Header */}
      <section className="bg-surface border-b border-border py-10">
        <div className="container mx-auto px-4">
          <nav className="flex items-center gap-1 text-xs text-text-secondary mb-3">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight size={12} />
            <span className="text-text-primary font-medium">About Us</span>
          </nav>
          <h1 className="text-3xl font-bold text-text-primary">About Us</h1>
        </div>
      </section>

      {/* Story */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">Our Story</p>
              <h2 className="text-3xl font-bold text-text-primary mb-5 leading-tight">
                Fashion that Speaks to Every Style
              </h2>
              <p className="text-text-secondary text-sm leading-relaxed mb-4">
                Anon was founded in 2018 with a simple mission: make premium fashion accessible to everyone. We curate the finest clothing, accessories, and lifestyle products from around the world, bringing them directly to your doorstep.
              </p>
              <p className="text-text-secondary text-sm leading-relaxed mb-6">
                From our humble beginnings as a small boutique, we&apos;ve grown into a trusted online destination for thousands of fashion-forward customers who value quality, style, and exceptional service.
              </p>
              <div className="flex gap-4">
                <Link
                  href="/shop"
                  className="bg-primary hover:bg-primary-dark text-white font-semibold text-sm px-6 py-2.5 rounded-sm transition-colors uppercase tracking-wide"
                >
                  Shop Now
                </Link>
                <Link
                  href="/contact"
                  className="border border-border text-text-primary hover:border-primary hover:text-primary font-semibold text-sm px-6 py-2.5 rounded-sm transition-colors uppercase tracking-wide"
                >
                  Contact Us
                </Link>
              </div>
            </div>
            <div className="relative h-80 rounded-2xl overflow-hidden">
              <Image
                src="/assets/images/banner-2.jpg"
                alt="About Anon"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-14 bg-primary">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {STATS.map(({ value, label }) => (
              <div key={label}>
                <p className="text-4xl font-extrabold text-white mb-1">{value}</p>
                <p className="text-sm text-white/80 font-medium">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-surface">
        <div className="container mx-auto px-4 text-center">
          <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-2">What We Believe</p>
          <h2 className="text-3xl font-bold text-text-primary mb-12">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { icon: Heart, title: 'Customer First', desc: 'Every decision we make starts with our customers in mind.' },
              { icon: Award, title: 'Quality Assured', desc: 'We never compromise on the quality of our products.' },
              { icon: Globe, title: 'Sustainability', desc: 'Committed to eco-friendly packaging and ethical sourcing.' },
              { icon: Users, title: 'Community', desc: 'Building a fashion community that celebrates every style.' },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white rounded-xl border border-border p-6">
                <div className="w-12 h-12 bg-primary-light rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Icon size={24} className="text-primary" />
                </div>
                <h3 className="font-bold text-text-primary mb-2">{title}</h3>
                <p className="text-xs text-text-secondary leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-2">Our People</p>
          <h2 className="text-3xl font-bold text-text-primary mb-12">Meet the Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            {TEAM.map(({ name, role, image }) => (
              <div key={name} className="text-center">
                <div className="relative w-28 h-28 rounded-full overflow-hidden mx-auto mb-4 border-4 border-primary-light">
                  <Image src={image} alt={name} fill className="object-cover" />
                </div>
                <h3 className="font-bold text-text-primary">{name}</h3>
                <p className="text-sm text-primary font-medium">{role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
