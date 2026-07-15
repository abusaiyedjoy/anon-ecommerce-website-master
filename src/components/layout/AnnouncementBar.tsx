'use client'

import Link from 'next/link'
import { ChevronDown } from 'lucide-react'
import { Facebook, Twitter, Instagram, Linkedin } from '@/components/ui/Icons'

export default function AnnouncementBar() {
  return (
    <div className="announcement-bar py-2">
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Social Icons - Left */}
        <div className="flex items-center gap-3">
          <Link
            href="https://www.facebook.com/share/18omCV1PCi/"
            className="text-text-secondary hover:text-primary transition-colors"
            aria-label="Facebook"
          >
            <Facebook size={15} />
          </Link>
          <Link
            href="https://twitter.com/share?text=Check%20out%20this%20awesome%20product!&url=https://example.com/product"
            className="text-text-secondary hover:text-primary transition-colors"
            aria-label="Twitter"
          >
            <Twitter size={15} />
          </Link>
          <Link
            href="https://www.instagram.com/arfatul599?igsh=dG9tZGNwNGNsNjdv"
            className="text-text-secondary hover:text-primary transition-colors"
            aria-label="Instagram"
          >
            <Instagram size={15} />
          </Link>
          <Link
            href="https://www.linkedin.com/shareArticle?mini=true&url=https://example.com/product&title=Check%20out%20this%20awesome%20product!"
            className="text-text-secondary hover:text-primary transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin size={15} />
          </Link>
        </div>

        {/* Center Message */}
        <p className="text-xs text-text-secondary font-medium hidden sm:block">
          FREE SHIPPING THIS WEEK ORDER OVER -{' '}
          <span className="font-semibold text-text-primary">$55</span>
        </p>

        {/* Right - Currency & Language */}
        <div className="flex items-center gap-4 text-xs text-text-secondary">
          <button className="flex items-center gap-1 hover:text-primary transition-colors">
            USD $
            <ChevronDown size={12} />
          </button>
          <button className="flex items-center gap-1 hover:text-primary transition-colors">
            ENGLISH
            <ChevronDown size={12} />
          </button>
        </div>
      </div>
    </div>
  )
}
