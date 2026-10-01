import { ref, onMounted, type Ref, isRef, unref } from 'vue'
import type { Product } from './useProducts'

export const useProductDetail = (productIdentifier: Ref<string | number> | string | number) => {
  const { findProduct, findProductBySlug, getRelatedProducts } = useProducts()

  const product = ref<Product | null>(null)
  const related = ref<Product[]>([])
  const loading = ref(true)
  const error = ref<string | null>(null)

  const fetchProduct = async () => {
    loading.value = true
    error.value = null
    product.value = null
    related.value = []

    try {
      const identifier = unref(productIdentifier)
      if (!identifier || identifier === 'undefined') {
        throw new Error('Product identifier tidak valid.')
      }

      let foundProduct: Product | undefined
      const isNumericId = !isNaN(Number(identifier))

      if (isNumericId) {
        foundProduct = await findProduct(Number(identifier))
      } else {
        foundProduct = await findProductBySlug(String(identifier))
      }

      if (foundProduct) {
        product.value = foundProduct
        related.value = await getRelatedProducts(foundProduct)
      } else {
        throw new Error(`Product not found.`)
      }
    } catch (e: any) {
      error.value = e.message || 'Failed to fetch product details.'
    } finally {
      loading.value = false
    }
  }

  onMounted(fetchProduct)

  return { product, related, loading, error, fetchProduct }
}