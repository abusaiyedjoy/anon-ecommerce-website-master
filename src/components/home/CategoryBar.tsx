import Link from 'next/link'
import Image from 'next/image'

const CATEGORIES = [
  {
    label: 'Dress & Frock',
    count: 53,
    image: '/assets/images/products/clothes-1.jpg',
    href: '/shop?category=dresses',
  },
  {
    label: 'Winter Wear',
    count: 58,
    image: '/assets/images/products/jacket-1.jpg',
    href: '/shop?category=winter-wear',
  },
  {
    label: 'Glasses & Lens',
    count: 68,
    image: '/assets/images/products/jewellery-1.jpg',
    href: '/shop?category=glasses',
  },
  {
    label: 'Shorts & Jeans',
    count: 84,
    image: '/assets/images/products/shorts-1.jpg',
    href: '/shop?category=shorts-jeans',
  },
]

export default function CategoryBar() {
  return (
    <section className="py-6 bg-white border-b border-border">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.label}
              href={cat.href}
              className="category-quick-card group"
            >
              {/* Icon/Image */}
              <div className="w-14 h-14 rounded-lg overflow-hidden bg-surface flex-shrink-0 relative">
                <Image
                  src={cat.image}
                  alt={cat.label}
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Text */}
              <div>
                <p className="font-semibold text-sm text-text-primary group-hover:text-primary transition-colors">
                  {cat.label}
                </p>
                <p className="text-xs text-text-secondary">({cat.count})</p>
                <p className="text-xs text-primary font-medium mt-0.5">Show All</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
