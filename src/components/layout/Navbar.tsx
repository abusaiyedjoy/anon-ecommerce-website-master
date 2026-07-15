'use client'

import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { cn } from '@/lib/utils'

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'All', href: '/shop' },
  { label: "Men's", href: '/shop?gender=mens' },
  { label: "Women's", href: '/shop?gender=womens' },
  { label: 'Jewelry', href: '/shop?category=jewelry' },
  { label: 'Perfume', href: '/shop?category=perfume' },
  { label: 'Blog', href: '/about' },
]

function normalizeQuery(query: string) {
  return new URLSearchParams(query).toString()
}

function normalizePath(path: string) {
  return path.endsWith('?') ? path.slice(0, -1) : path
}

export default function Navbar() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const currentSearch = searchParams.toString()
  const currentPath = pathname + (currentSearch ? `?${currentSearch}` : '')

  return (
    <nav className="site-navbar hidden md:block">
      <div className="w-full max-w-full px-8">
        <ul className="flex items-center justify-center gap-8 py-1">
          {NAV_LINKS.map((link) => {
            const [linkPath, linkQuery] = link.href.split('?')
            const normalizedLink = linkPath + (linkQuery ? `?${normalizeQuery(linkQuery)}` : '')
            const [currentPathname, currentQuery] = currentPath.split('?')
            const normalizedCurrent = currentPathname + (currentQuery ? `?${normalizeQuery(currentQuery)}` : '')
            const isActive = normalizedLink === normalizedCurrent
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    'nav-link',
                    isActive && 'active',
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
