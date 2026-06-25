import './globals.css'
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import AnnouncementBar from '@/components/layout/AnnouncementBar'
import Header from '@/components/layout/Header'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
  variable: '--font-poppins',
})

export const metadata: Metadata = {
  title: 'Anon - Premium Fashion & Lifestyle Store',
  description:
    'Shop the latest fashion, accessories, and lifestyle products at Anon. Quality items, great prices, and exceptional service.',
  keywords: 'fashion, clothing, accessories, jewelry, perfume, online shopping',
  openGraph: {
    title: 'Anon - Premium Fashion & Lifestyle Store',
    description: 'Shop the latest fashion, accessories, and lifestyle products at Anon.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className="min-h-screen flex flex-col">
        <AnnouncementBar />
        <Header />
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
