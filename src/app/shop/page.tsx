import { Suspense } from 'react'
import ShopPageContent from '@/components/shop/ShopPageContent'

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="bg-surface min-h-screen py-8" />}> 
      <ShopPageContent />
    </Suspense>
  )
}
