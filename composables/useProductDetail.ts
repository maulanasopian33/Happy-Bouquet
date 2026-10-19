import { computed, unref, type Ref } from 'vue'
import type { Product } from './useProducts'
import { useProducts, mapProduct } from './useProducts'

export const useProductDetail = async (productIdentifier: Ref<string | number> | string | number) => {
  const { findProduct, findProductBySlug } = useProducts()
  const config = useRuntimeConfig()
  const identifier = computed(() => unref(productIdentifier))

  // shortcut: produk terkait difilter dari daftar produk aktif (cache SWR 15 mnt);
  // ganti ke endpoint related di API bila backend menyediakan (BUG-0010)
  const { data: allActive } = await useAsyncData(
    'products-active-all',
    async () => {
      const res: any = await $fetch(`${config.public.apiUrl}/products?active=true`)
      return (res.data || []).map((p: any) => mapProduct(p, config.public.apiUrl))
    },
    { swr: 900 }
  )

  const { data, pending, error: fetchError } = await useAsyncData(
    'product-detail',
    async () => {
      const id = identifier.value
      if (!id || id === 'undefined') throw new Error('Product identifier tidak valid.')
      const isNumericId = !isNaN(Number(id))
      const found = isNumericId
        ? await findProduct(Number(id))
        : await findProductBySlug(String(id))
      if (!found) throw new Error('Product not found.')
      const related = (allActive.value || [])
        .filter((p: Product) => p.category === found.category && p.id !== found.id)
        .slice(0, 4)
      return { product: found, related }
    },
    { watch: [identifier] }
  )

  const product = computed<Product | null>(() => data.value?.product ?? null)
  const related = computed<Product[]>(() => data.value?.related ?? [])
  const error = computed(() => fetchError.value?.message ?? null)

  return { product, related, loading: pending, error }
}
