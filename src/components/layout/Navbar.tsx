'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: "Categories", href: '/shop' },
  { label: "Men's", href: '/shop?gender=mens' },
  { label: "Women's", href: '/shop?gender=womens' },
  { label: 'Jewelry', href: '/shop?category=jewelry' },
  { label: 'Perfume', href: '/shop?category=perfume' },
  { label: 'Blog', href: '/about' },
  { label: 'Hot Offers', href: '/shop?tag=hot', hot: true },
]

export default function Navbar() {
  const pathname = usePathname()

  return (
    <nav className="site-navbar hidden md:block">
      <div className="w-full max-w-full px-8">
        <ul className="flex items-center justify-center gap-8 py-1">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    'nav-link',
                    isActive && 'active',
                    link.hot && 'text-primary'
                  )}
                >
                  {link.label}
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </nav>
  )
}
