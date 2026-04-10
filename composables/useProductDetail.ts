import { ref, onMounted } from 'vue'
import type { Product } from './useProducts'

export const useProductDetail = (productId: Ref<number>) => {
  const { findProduct, getRelatedProducts } = useProducts()

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
      const foundProduct = await findProduct(productId.value)
      if (foundProduct) {
        product.value = foundProduct
        // Fetch related products after main product is found
        related.value = await getRelatedProducts(foundProduct)
      } else {
        throw new Error(`Product with ID ${productId.value} not found.`)
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