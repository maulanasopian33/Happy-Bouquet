import { ref } from 'vue'

export interface Product {
  id: number
  slug: string
  name: string
  price: number
  originalPrice?: number
  image: string
  description: string
  stock: number
  variants: any[]
  rating?: number
  reviewCount?: number
  images: string[]
  category?: string
  type?: string
  preorderDuration?: number
  // Channel order produk dari API (bentuk: { name, icon_url, ProductOrderChannel: { store_url } })
  orderChannels: any[]
}

// photo_url API berupa path relatif ("public/uploads/...") atau URL absolut.
// Origin diambil dari apiUrl — jangan replace('/api','') karena memotong 'https://api.' juga.
export const resolveImageUrl = (photo: string | undefined | null, apiUrl: string): string => {
  if (!photo) return '/default.png'
  if (/^https?:\/\//.test(photo)) return photo
  return `${new URL(apiUrl).origin}/${photo.replace(/^\/+/, '')}`
}

export const mapProduct = (p: any, apiUrl: string): Product => {
  const imageUrl = resolveImageUrl(p.photo_url, apiUrl)
  return {
    id: p.id,
    slug: p.slug || (p.name ? p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') : `product-${p.id}`),
    name: p.name,
    price: Number(p.price),
    image: imageUrl,
    description: p.description || '',
    stock: 20, // Default mock stock if API doesn't provide
    variants: [], // API doesn't seem to have variants yet
    rating: 4.5,
    reviewCount: 0,
    images: [imageUrl],
    category: typeof p.category === 'object' ? (p.category.name || p.category.NAME) : p.category,
    type: p.type,
    preorderDuration: p.preorder_duration,
    orderChannels: p.orderChannels || []
  }
}

export const useProducts = () => {
  const config = useRuntimeConfig()
  const apiUrl = config.public.apiUrl

  const findProduct = async (id: number): Promise<Product | undefined> => {
    try {
      const res: any = await $fetch(`${apiUrl}/products/${id}`)
      return res.data ? mapProduct(res.data, apiUrl) : undefined
    } catch (e) {
      console.error('Failed to fetch product by ID', e)
      return undefined
    }
  }

  const findProductBySlug = async (slug: string): Promise<Product | undefined> => {
    if (!slug || slug === 'undefined') {
      console.warn('findProductBySlug called with invalid slug:', slug)
      return undefined
    }
    try {
      const res: any = await $fetch(`${apiUrl}/products/slug/${slug}`)
      return res.data ? mapProduct(res.data, apiUrl) : undefined
    } catch (e) {
      console.error('Failed to fetch product by slug', e)
      return undefined
    }
  }

  return { findProduct, findProductBySlug }
}
