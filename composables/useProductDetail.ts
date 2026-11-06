import { computed, unref, type Ref } from 'vue'
import type { Product } from './useProducts'
import { useProducts, mapProduct } from './useProducts'

export const useProductDetail = (productIdentifier: Ref<string | number> | string | number) => {
  const { findProductBySlug } = useProducts()
  const config = useRuntimeConfig()
  const identifier = computed(() => unref(productIdentifier))

  // Satu useAsyncData yang dipanggil sync dari setup — useAsyncData yang dipanggil
  // SETELAH await di dalam composable async kehilangan Nuxt instance
  // ("[nuxt] instance unavailable") sehingga semua halaman produk 500.
  // shortcut: produk terkait difilter dari daftar produk aktif (cache SWR 15 mnt);
  // ganti ke endpoint related di API bila backend menyediakan (BUG-0010)
  const { data, pending, error: fetchError } = useAsyncData(
    `product-detail-${unref(productIdentifier)}`,
    async () => {
      const id = identifier.value
      if (!id || id === 'undefined') throw createError({ statusCode: 404, statusMessage: 'Produk tidak ditemukan.' })
      const isNumericId = !isNaN(Number(id))
      const [allActive, found] = await Promise.all([
        $fetch(`${config.public.apiUrl}/products?active=true`)
          .then((res: any) => (res.data || []).map((p: any) => mapProduct(p, config.public.apiUrl)))
          .catch(() => [] as Product[]),
        isNumericId ? Promise.resolve(undefined) : findProductBySlug(String(id)),
      ])
      // Link lama berbasis ID numerik dicari dari daftar produk aktif (endpoint by-ID sudah dihapus).
      const product = found ?? allActive.find((p: Product) => String(p.id) === String(id))
      if (!product) throw createError({ statusCode: 404, statusMessage: 'Produk tidak ditemukan.' })
      const related = allActive
        .filter((p: Product) => p.category === product.category && p.id !== product.id)
        .slice(0, 4)
      return { product, related }
    },
    { watch: [identifier] }
  )

  const product = computed<Product | null>(() => data.value?.product ?? null)
  const related = computed<Product[]>(() => data.value?.related ?? [])
  const error = computed(() => fetchError.value?.message ?? null)

  return { product, related, loading: pending, error }
}
