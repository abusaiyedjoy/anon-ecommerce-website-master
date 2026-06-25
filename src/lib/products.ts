export interface Product {
  id: string
  title: string
  category: string
  price: number
  originalPrice: number
  image: string
  rating: number
  reviews: number
  badge?: string
  description: string
  images: string[]
  sizes: string[]
  colors: string[]
}

const PRODUCTS: Product[] = [
  {
    id: '1',
    title: 'Mens Winter Leathers Jackets',
    category: 'Jacket',
    price: 48.0,
    originalPrice: 75.0,
    image: '/assets/images/products/jacket-1.jpg',
    rating: 3,
    reviews: 8,
    badge: '15%',
    description: 'Premium quality winter leather jacket crafted with genuine leather. Features a warm interior lining, multiple utility pockets, and a classic fit suitable for all outdoor occasions.',
    images: [
      '/assets/images/products/jacket-1.jpg',
      '/assets/images/products/jacket-2.jpg',
      '/assets/images/products/jacket-3.jpg',
      '/assets/images/products/jacket-4.jpg'
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['#1A1A2E', '#4A3728', '#2C5F2E']
  },
  {
    id: '2',
    title: 'Pure Garment Dyed Cotton Shirt',
    category: 'Shirt',
    price: 45.0,
    originalPrice: 56.0,
    image: '/assets/images/products/shirt-1.jpg',
    rating: 3,
    reviews: 5,
    badge: 'Sale',
    description: 'Crisp, lightweight casual shirt made from 100% pure garment-dyed cotton. Breathable fabric that gets softer with every wash. Tailored for a smart-casual summer look.',
    images: [
      '/assets/images/products/shirt-1.jpg',
      '/assets/images/products/shirt-2.jpg',
      '/assets/images/products/clothes-1.jpg',
      '/assets/images/products/clothes-2.jpg'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['#FFFFFF', '#3B82F6', '#EF4444', '#10B981']
  },
  {
    id: '3',
    title: 'MEN Yarn Fleece Full-Zip Jacket',
    category: 'Jacket',
    price: 58.0,
    originalPrice: 65.0,
    image: '/assets/images/products/jacket-2.jpg',
    rating: 3,
    reviews: 12,
    description: 'Cozy yarn-dyed fleece jacket featuring a full-zip front, mock collar, and zip hand pockets. Provides excellent warmth-to-weight ratio for cool weather layering.',
    images: [
      '/assets/images/products/jacket-2.jpg',
      '/assets/images/products/jacket-1.jpg',
      '/assets/images/products/jacket-3.jpg',
      '/assets/images/products/jacket-4.jpg'
    ],
    sizes: ['M', 'L', 'XL', 'XXL'],
    colors: ['#4B5563', '#1F2937', '#1E3A8A']
  },
  {
    id: '4',
    title: 'Black Floral Wrap Midi Skirt',
    category: 'Skirt',
    price: 25.0,
    originalPrice: 35.0,
    image: '/assets/images/products/clothes-4.jpg',
    rating: 5,
    reviews: 20,
    badge: 'New',
    description: 'Elegant flowy midi skirt featuring an adjustable wrap waist and an all-over floral print. Perfect styling piece for weekend brunches or summer outings.',
    images: [
      '/assets/images/products/clothes-4.jpg',
      '/assets/images/products/clothes-3.jpg',
      '/assets/images/products/clothes-2.jpg',
      '/assets/images/products/clothes-1.jpg'
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['#000000', '#F43F5E', '#14B8A6']
  },
  {
    id: '5',
    title: "Casual Men's Brown Shoes",
    category: 'Casual',
    price: 99.0,
    originalPrice: 105.0,
    image: '/assets/images/products/shoe-1.jpg',
    rating: 5,
    reviews: 18,
    description: 'Classic lace-up shoes built with rich synthetic leather upper and a cushioned orthotic insole. Designed for all-day walking comfort and versatile smart-casual style.',
    images: [
      '/assets/images/products/shoe-1.jpg',
      '/assets/images/products/shoe-2.jpg',
      '/assets/images/products/shoe-3.jpg',
      '/assets/images/products/shoe-4.jpg'
    ],
    sizes: ['8', '9', '10', '11', '12'],
    colors: ['#78350F', '#451A03', '#1A1A2E']
  },
  {
    id: '6',
    title: 'Pocket Watch Leather Pouch',
    category: 'Watches',
    price: 150.0,
    originalPrice: 170.0,
    image: '/assets/images/products/watch-2.jpg',
    rating: 3,
    reviews: 6,
    badge: 'Sale',
    description: 'Vintage pocket watch with mechanical hand-wind movement, housed in a premium hand-stitched protective leather pouch with belt loop.',
    images: [
      '/assets/images/products/watch-2.jpg',
      '/assets/images/products/watch-1.jpg',
      '/assets/images/products/watch-3.jpg',
      '/assets/images/products/watch-4.jpg'
    ],
    sizes: ['One Size'],
    colors: ['#D97706', '#1E2937']
  },
  {
    id: '7',
    title: 'Smart Watch Vital Plus',
    category: 'Watches',
    price: 100.0,
    originalPrice: 120.0,
    image: '/assets/images/products/watch-1.jpg',
    rating: 4,
    reviews: 14,
    description: 'Modern smartwatch with real-time heart rate tracking, oxygen saturation monitor, sleep tracking, and customizable digital watch faces. Connects seamlessly via Bluetooth.',
    images: [
      '/assets/images/products/watch-1.jpg',
      '/assets/images/products/watch-2.jpg',
      '/assets/images/products/watch-3.jpg',
      '/assets/images/products/watch-4.jpg'
    ],
    sizes: ['One Size'],
    colors: ['#000000', '#D1D5DB', '#DC2626']
  },
  {
    id: '8',
    title: 'Womens Party Wear Shoes',
    category: 'Party Wear',
    price: 25.0,
    originalPrice: 30.0,
    image: '/assets/images/products/party-wear-1.jpg',
    rating: 3,
    reviews: 9,
    badge: 'Sale',
    description: 'Stunning slip-on pumps with a glossy finish and comfortable block heels. Ideal styling partner for evening dinners, weddings, and special events.',
    images: [
      '/assets/images/products/party-wear-1.jpg',
      '/assets/images/products/party-wear-2.jpg',
      '/assets/images/products/shoe-2.jpg',
      '/assets/images/products/shoe-1.jpg'
    ],
    sizes: ['6', '7', '8', '9'],
    colors: ['#E11D48', '#EC4899', '#000000', '#F59E0B']
  },
  {
    id: '9',
    title: 'Brown Casual Bomber Jacket',
    category: 'Jacket',
    price: 78.0,
    originalPrice: 110.0,
    image: '/assets/images/products/jacket-3.jpg',
    rating: 4,
    reviews: 11,
    description: 'Classic bomber jacket featuring ribbed collar, cuffs, and hem. Sturdy zip closure and lightweight insulated fill make this an excellent windbreaker for transition seasons.',
    images: [
      '/assets/images/products/jacket-3.jpg',
      '/assets/images/products/jacket-1.jpg',
      '/assets/images/products/jacket-2.jpg',
      '/assets/images/products/jacket-4.jpg'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['#78350F', '#1F2937', '#065F46']
  },
  {
    id: '10',
    title: 'Running & Trekking Shoes - White',
    category: 'Shoes',
    price: 49.0,
    originalPrice: 65.0,
    image: '/assets/images/products/sports-1.jpg',
    rating: 5,
    reviews: 24,
    description: 'Performance athletic shoes engineered with mesh panels for airflow and a shock-absorbing lightweight foam midsole. Perfect for daily jogging or heavy gym workouts.',
    images: [
      '/assets/images/products/sports-1.jpg',
      '/assets/images/products/sports-2.jpg',
      '/assets/images/products/sports-3.jpg',
      '/assets/images/products/sports-4.jpg'
    ],
    sizes: ['7', '8', '9', '10', '11'],
    colors: ['#FFFFFF', '#3B82F6', '#000000']
  },
  {
    id: '11',
    title: 'Trekking Running Shoes Black',
    category: 'Shoes',
    price: 78.0,
    originalPrice: 95.0,
    image: '/assets/images/products/sports-2.jpg',
    rating: 4,
    reviews: 16,
    description: 'All-terrain outdoor trekking and trail running shoes featuring deep-lug rubber outsoles for maximum traction on muddy or wet hiking paths.',
    images: [
      '/assets/images/products/sports-2.jpg',
      '/assets/images/products/sports-1.jpg',
      '/assets/images/products/sports-3.jpg',
      '/assets/images/products/sports-4.jpg'
    ],
    sizes: ['8', '9', '10', '11'],
    colors: ['#000000', '#4B5563', '#F59E0B']
  },
  {
    id: '12',
    title: 'Rose Gold Earrings Set',
    category: 'Jewelry',
    price: 25.0,
    originalPrice: 45.0,
    image: '/assets/images/products/jewellery-1.jpg',
    rating: 5,
    reviews: 10,
    badge: 'Sale',
    description: 'Dainty and charming set of hoops and studs crafted in hypoallergenic rose gold plated alloy. Adorned with tiny sparkling crystal accents.',
    images: [
      '/assets/images/products/jewellery-1.jpg',
      '/assets/images/products/jewellery-2.jpg',
      '/assets/images/products/jewellery-3.jpg'
    ],
    sizes: ['One Size'],
    colors: ['#FCA5A5', '#F59E0B', '#E5E7EB']
  },
  {
    id: '13',
    title: 'Men Slim Fit Formal Jacket',
    category: 'Jacket',
    price: 120.0,
    originalPrice: 160.0,
    image: '/assets/images/products/jacket-4.jpg',
    rating: 4,
    reviews: 7,
    description: 'Expertly tailored slim-fit formal blazer jacket. Structured shoulders, notched lapels, and double back vents for a modern sharp corporate profile.',
    images: [
      '/assets/images/products/jacket-4.jpg',
      '/assets/images/products/jacket-1.jpg',
      '/assets/images/products/jacket-2.jpg',
      '/assets/images/products/jacket-3.jpg'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['#1E2937', '#0F172A', '#334155']
  },
  {
    id: '14',
    title: 'High Heel Party Wear Sandals',
    category: 'Shoes',
    price: 55.0,
    originalPrice: 80.0,
    image: '/assets/images/products/shoe-2.jpg',
    rating: 3,
    reviews: 5,
    badge: 'Sale',
    description: 'Premium elegant stiletto heel sandals with wrap-around ankle straps and soft faux leather insoles. Adds immediate sophistication to party and cocktail dresses.',
    images: [
      '/assets/images/products/shoe-2.jpg',
      '/assets/images/products/shoe-1.jpg',
      '/assets/images/products/party-wear-1.jpg',
      '/assets/images/products/party-wear-2.jpg'
    ],
    sizes: ['6', '7', '8', '9'],
    colors: ['#000000', '#F3F4F6', '#EC4899']
  },
  {
    id: '15',
    title: 'Luxury Eau de Parfum 100ml',
    category: 'Perfume',
    price: 75.0,
    originalPrice: 110.0,
    image: '/assets/images/products/perfume.jpg',
    rating: 5,
    reviews: 32,
    description: 'A sophisticated fragrance featuring top notes of fresh bergamot and jasmine, settling into warm amber, cedarwood, and white musk. Housed in a polished display crystal bottle.',
    images: [
      '/assets/images/products/perfume.jpg'
    ],
    sizes: ['100ml'],
    colors: ['#F59E0B']
  },
  {
    id: '16',
    title: 'Sterling Silver Bracelet',
    category: 'Jewelry',
    price: 38.0,
    originalPrice: 55.0,
    image: '/assets/images/products/jewellery-2.jpg',
    rating: 4,
    reviews: 8,
    description: 'Elegant chain link bracelet made of authentic 925 sterling silver. Features a high-polish finish and an adjustable lobster claw clasp.',
    images: [
      '/assets/images/products/jewellery-2.jpg',
      '/assets/images/products/jewellery-1.jpg',
      '/assets/images/products/jewellery-3.jpg'
    ],
    sizes: ['Adjustable'],
    colors: ['#E5E7EB', '#FBBF24']
  },
  {
    id: '17',
    title: 'Baby Fabric Shoes',
    category: 'Shoes',
    price: 4.0,
    originalPrice: 5.0,
    image: '/assets/images/products/1.jpg',
    rating: 5,
    reviews: 20,
    description: 'Ultra-soft fabric baby slippers with elastic ankle bands for easy wear. Soft flannel interiors keep little feet warm and protected during crawling or first steps.',
    images: [
      '/assets/images/products/1.jpg',
      '/assets/images/products/2.jpg',
      '/assets/images/products/3.jpg',
      '/assets/images/products/4.jpg'
    ],
    sizes: ['0-6m', '6-12m', '12-18m'],
    colors: ['#FEE2E2', '#DBEAFE', '#FEF3C7']
  },
  {
    id: '18',
    title: "Men's Hoodies T-Shirt",
    category: 'Shirt',
    price: 7.0,
    originalPrice: 17.0,
    image: '/assets/images/products/2.jpg',
    rating: 4,
    reviews: 14,
    description: 'Casual short-sleeve hooded t-shirt made of soft, stretch cotton blend. Features raw edge details, adjustable drawstrings, and a kangaroo pouch pocket.',
    images: [
      '/assets/images/products/2.jpg',
      '/assets/images/products/1.jpg',
      '/assets/images/products/3.jpg',
      '/assets/images/products/4.jpg'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['#374151', '#9CA3AF', '#DC2626']
  },
  {
    id: '19',
    title: 'Girls T-Shirt',
    category: 'Shirt',
    price: 3.0,
    originalPrice: 5.0,
    image: '/assets/images/products/3.jpg',
    rating: 4,
    reviews: 11,
    description: 'Cute everyday crewneck t-shirt for girls, made with breathable combed cotton fabric. Featuring screen-printed graphics that resist fading.',
    images: [
      '/assets/images/products/3.jpg',
      '/assets/images/products/1.jpg',
      '/assets/images/products/2.jpg',
      '/assets/images/products/4.jpg'
    ],
    sizes: ['4T', '5T', '6T', '8T'],
    colors: ['#F472B6', '#60A5FA', '#FBBF24']
  },
  {
    id: '20',
    title: 'Woolen Hat For Men',
    category: 'Accessories',
    price: 15.0,
    originalPrice: 25.0,
    image: '/assets/images/products/4.jpg',
    rating: 3,
    reviews: 15,
    description: 'Classic ribbed knit beanie hat made of warm wool-acrylic blend yarn. Features a fold-over cuff for adjustable head coverage and wind protection.',
    images: [
      '/assets/images/products/4.jpg',
      '/assets/images/products/1.jpg',
      '/assets/images/products/2.jpg',
      '/assets/images/products/3.jpg'
    ],
    sizes: ['One Size'],
    colors: ['#1F2937', '#78350F', '#047857']
  }
]

export function getAllProducts(): Product[] {
  return PRODUCTS
}

export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id)
}

export function getRelatedProducts(category: string, excludeId: string): Product[] {
  return PRODUCTS.filter(
    (p) => p.category.toLowerCase() === category.toLowerCase() && p.id !== excludeId
  ).slice(0, 4)
}
