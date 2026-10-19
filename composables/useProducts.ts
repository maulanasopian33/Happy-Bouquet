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
}

export const mapProduct = (p: any, apiUrl: string): Product => {
  const imageUrl = p.photo_url
    ? `${apiUrl.replace('/api', '')}${p.photo_url}`
    : 'https://images.unsplash.com/photo-1547096301-4ebda79e93d7?q=80'
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
    category: typeof p.category === 'object' ? (p.category.name || p.category.NAME) : p.category
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
