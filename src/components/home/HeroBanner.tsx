'use client'

import Image from 'next/image'
import Link from 'next/link'

export default function HeroBanner() {
  return (
    <section className="hero-banner min-h-[420px] relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute right-1/3 top-0 w-80 h-80 rounded-full bg-[#FFD6DF] opacity-60 translate-x-1/2 -translate-y-1/4" />
      <div className="absolute right-1/4 bottom-0 w-48 h-48 rounded-full bg-[#FFE4C4] opacity-40 translate-y-1/3" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex items-center min-h-[420px]">
          {/* Text Content */}
          <div className="flex-1 py-12 max-w-lg">
            <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">
              Trending Item
            </p>
            <h1 className="text-4xl md:text-5xl font-extrabold text-text-primary mb-4 leading-tight uppercase">
              Women&apos;s Latest{' '}
              <span className="block">Fashion Sale</span>
            </h1>
            <p className="text-lg text-text-secondary mb-8">
              starting at{' '}
              <span className="font-bold text-2xl text-text-primary">$</span>
              <span className="font-bold text-3xl text-text-primary">20</span>
              <span className="font-bold text-2xl text-text-primary">.00</span>
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center bg-primary hover:bg-primary-dark text-white font-bold text-sm uppercase tracking-widest px-8 py-3 transition-colors duration-200"
            >
              Shop Now
            </Link>
          </div>

          {/* Banner Image */}
          <div className="hidden lg:flex flex-1 justify-end items-end h-full relative">
            <div className="relative w-[520px] h-[380px]">
              <Image
                src="/assets/images/banner-1.jpg"
                alt="Women's Latest Fashion Sale"
                fill
                className="object-cover object-center"
                priority
              />
            </div>
            {/* Just for you stamp */}
            <div className="absolute bottom-8 left-1/4 text-center leading-none">
              <p className="text-primary font-bold italic text-lg" style={{ fontFamily: 'cursive' }}>
                Just
              </p>
              <p className="text-primary font-bold italic text-lg" style={{ fontFamily: 'cursive' }}>
                For
              </p>
              <p className="text-primary font-bold italic text-xl" style={{ fontFamily: 'cursive' }}>
                you
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
