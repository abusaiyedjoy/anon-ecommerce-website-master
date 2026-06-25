import Link from 'next/link'
import Image from 'next/image'
import { Mail, Phone, MapPin } from 'lucide-react'
import { Facebook, Twitter, Instagram, Linkedin, Youtube } from '@/components/ui/Icons'

const footerLinks = {
  categories: ['Dress & Frock', 'Winter Wear', 'Glasses & Lens', 'Shorts & Jeans', 'T-Shirts', 'Jackets'],
  customer: ['My Account', 'Order History', 'Track Order', 'Wishlist', 'Returns & Refunds'],
  info: ['About Us', 'Contact Us', 'Blog', 'Careers', 'Store Locator'],
}

export default function Footer() {
  return (
    <footer className="site-footer">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Anon</h2>
            <p className="text-sm text-gray-400 leading-relaxed mb-5">
              Your favorite e-commerce destination for quality fashion, accessories, and lifestyle products at unbeatable prices.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-3">
              {[
                { icon: Facebook, href: '#', label: 'Facebook' },
                { icon: Twitter, href: '#', label: 'Twitter' },
                { icon: Instagram, href: '#', label: 'Instagram' },
                { icon: Linkedin, href: '#', label: 'LinkedIn' },
                { icon: Youtube, href: '#', label: 'YouTube' },
              ].map(({ icon: Icon, href, label }) => (
                <Link
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-8 h-8 rounded-full border border-gray-700 flex items-center justify-center text-gray-400 hover:border-primary hover:text-primary hover:bg-primary/10 transition-all duration-200"
                >
                  <Icon size={14} />
                </Link>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-widest mb-5">
              Categories
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.categories.map((item) => (
                <li key={item}>
                  <Link
                    href="/shop"
                    className="text-sm text-gray-400 hover:text-primary transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-widest mb-5">
              Customer Service
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.customer.map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="text-sm text-gray-400 hover:text-primary transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-widest mb-5">
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-primary flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-400">
                  123 Fashion Street, New York, NY 10001
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-primary flex-shrink-0" />
                <a href="tel:+12345678900" className="text-sm text-gray-400 hover:text-primary transition-colors">
                  +1 234 567 8900
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-primary flex-shrink-0" />
                <a href="mailto:info@anon.com" className="text-sm text-gray-400 hover:text-primary transition-colors">
                  info@anon.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} Anon. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link>
            <Link href="#" className="hover:text-primary transition-colors">Sitemap</Link>
          </div>
          {/* Payment Icons */}
          <div className="flex items-center gap-2">
            <Image
              src="/assets/images/payment.png"
              alt="Payment methods"
              width={160}
              height={24}
              className="opacity-70 h-6 w-auto object-contain"
            />
          </div>
        </div>
      </div>
    </footer>
  )
}
