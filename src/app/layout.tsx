import './globals.css'
import type { Metadata } from 'next'
import Script from 'next/script'
import { Poppins } from 'next/font/google'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Anon - Premium eCommerce Store',
  description: 'Shop the latest products with Anon. Quality items, great prices, and exceptional service.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={poppins.className}>
      <body>
        <Header />
        {children}
        <Footer />
      </body>
      <Script src="/assets/js/script.js" strategy="afterInteractive" />
      <Script src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js" type="module" strategy="afterInteractive" />
      <Script src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js" noModule strategy="afterInteractive" />
    </html>
  )
}
