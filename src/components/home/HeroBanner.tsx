'use client'

import Image from 'next/image'
import Link from 'next/link'

export default function HeroBanner() {
  return (
    <section className="hero-banner relative w-full h-[600px] overflow-hidden">
      {/* Full Width Background Image */}
      <Image
        src="/assets/images/banner-1.jpg"
        alt="Women's Latest Fashion Sale"
        fill
        quality={100}
        unoptimized
        className="object-cover object-center"
        priority
      />

      {/* Decorative Circles directly over background */}
      <div className="absolute left-10 top-0 w-80 h-80 rounded-full bg-[#FFD6DF] opacity-40 -translate-y-1/3 pointer-events-none" />
      <div className="absolute left-1/3 bottom-0 w-48 h-48 rounded-full bg-[#FFE4C4] opacity-30 translate-y-1/3 pointer-events-none" />

      {/* Text Overlay Container */}
      <div className="container mx-auto px-6 h-full relative z-10 flex items-center">
        <div className="max-w-lg py-12">
          <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">
            Trending Item
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-text-primary mb-4 leading-tight uppercase">
            Women&apos;s Latest{' '}
            <span className="block text-primary">Fashion Sale</span>
          </h1>
          <p className="text-lg text-text-secondary mb-8">
            starting at{' '}
            <span className="font-bold text-2xl text-text-primary">$</span>
            <span className="font-bold text-3xl text-text-primary">20</span>
            <span className="font-bold text-2xl text-text-primary">.00</span>
          </p>

          <div className="flex items-center gap-6">
            <Link
              href="/shop"
              className="inline-flex items-center bg-primary hover:bg-primary-dark text-white font-bold text-sm uppercase tracking-widest px-8 py-3.5 transition-colors duration-200"
            >
              Shop Now
            </Link>

            {/* Just for you stamp */}
            <div className="text-center leading-none select-none">
              <p className="text-primary font-bold italic text-base" style={{ fontFamily: 'cursive' }}>
                Just
              </p>
              <p className="text-primary font-bold italic text-base" style={{ fontFamily: 'cursive' }}>
                For
              </p>
              <p className="text-primary font-bold italic text-lg" style={{ fontFamily: 'cursive' }}>
                you
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}