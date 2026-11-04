import { ref } from 'vue'

export interface ProductVariantItem {
  id: string
  name: string
  label?: string
  stems?: string
  priceModifier: number
  priceModifierText?: string
  diameter?: string
}

export interface ProductWrappingItem {
  name: string
  color: string
}

export interface ProductAddonItem {
  id: string
  name: string
  price: number
}

export interface ProductVariants {
  sizes?: ProductVariantItem[]
  wrappings?: ProductWrappingItem[]
  addons?: ProductAddonItem[]
}

export interface KeyValueSpec {
  label: string
  value: string
}

export interface CareInstructionItem {
  step: number
  title: string
  description: string
}

export interface ProductSpecifications {
  composition?: KeyValueSpec[]
  dimensions?: KeyValueSpec[]
  careInstructions?: CareInstructionItem[]
}

export interface Product {
  id: number
  slug: string
  name: string
  price: number
  originalPrice?: number
  image: string
  description: string
  stock: number
  variants: ProductVariants | any
  rating?: number
  reviewCount?: number
  images: string[]
  galleryUrls?: string[]
  specifications?: ProductSpecifications | any
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

export const safeJsonParse = (val: any) => {
  if (!val) return null
  if (typeof val === 'object') return val
  try {
    return JSON.parse(val)
  } catch {
    return val
  }
}

export const mapProduct = (p: any, apiUrl: string): Product => {
  const imageUrl = resolveImageUrl(p.photo_url, apiUrl)
  const rawGallery = safeJsonParse(p.gallery_urls)
  const extraImages = Array.isArray(rawGallery)
    ? rawGallery.map((img: string) => resolveImageUrl(img, apiUrl)).filter(Boolean)
    : []
  const allImages = [imageUrl, ...extraImages.filter((img: string) => img !== imageUrl)]
  const parsedVariants = safeJsonParse(p.variants)
  const parsedSpecs = safeJsonParse(p.specifications)

  return {
    id: p.id,
    slug: p.slug || (p.name ? p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') : `product-${p.id}`),
    name: p.name,
    price: Number(p.price),
    image: imageUrl,
    description: p.description || '',
    stock: typeof p.stock === 'number' ? p.stock : (Number(p.stock) || 20),
    variants: parsedVariants || null,
    rating: typeof p.rating === 'number' ? p.rating : (Number(p.rating) || 4.9),
    reviewCount: typeof p.review_count === 'number' ? p.review_count : (Number(p.review_count) || 128),
    images: allImages.length > 0 ? allImages : [imageUrl],
    galleryUrls: extraImages,
    specifications: parsedSpecs || null,
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
