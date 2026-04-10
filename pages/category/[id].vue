<template>
  <div class="max-w-7xl mx-auto px-4 lg:px-8 py-8">
    <!-- Breadcrumbs -->
    <nav class="flex mb-8 text-sm text-gray-500" aria-label="Breadcrumb">
      <ol class="inline-flex items-center space-x-1 md:space-x-3">
        <li class="inline-flex items-center">
          <NuxtLink to="/" class="hover:text-rose-600 transition-colors">Home</NuxtLink>
        </li>
        <li>
          <div class="flex items-center">
            <svg class="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 11H3a1 1 0 110-2h7.586l-3.293-3.293a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
            </svg>
            <span class="ml-1 md:ml-2 text-rose-600 font-medium">{{ categoryName }}</span>
          </div>
        </li>
      </ol>
    </nav>

    <!-- Header Section -->
    <div class="mb-10">
      <h1 class="text-4xl font-extrabold text-gray-900 mb-3 tracking-tight">
        {{ categoryName }}
      </h1>
      <p v-if="categoryDescription" class="text-lg text-gray-600 max-w-2xl">
        {{ categoryDescription }}
      </p>
    </div>

    <!-- Loading State -->
    <div v-if="pending" class="flex justify-center items-center py-20">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-600"></div>
    </div>

    <!-- Product Grid -->
    <div v-else-if="filteredProducts.length > 0">
      <ProductGrid :products="filteredProducts" @view="openQuickView" />
    </div>

    <!-- Empty State -->
    <div v-else class="text-center py-20 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
      <div class="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 text-gray-400">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 118 0m-4 4v2m0-6V4m0 6V4m-6 6h10" />
        </svg>
      </div>
      <h3 class="text-xl font-bold text-gray-900 mb-2">Belum ada produk</h3>
      <p class="text-gray-500 mb-6">Maaf, kategori ini belum memiliki koleksi produk saat ini.</p>
      <NuxtLink to="/" class="inline-flex items-center px-6 py-3 bg-rose-600 text-white font-bold rounded-xl hover:bg-rose-700 transition-all shadow-lg shadow-rose-100">
        Kembali ke Beranda
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const config = useRuntimeConfig()
const apiUrl = config.public.apiUrl
const categoryId = route.params.id

// Fetch Category Details
const { data: catRes } = await useFetch<any>(`${apiUrl}/categories/${categoryId}`)
const categoryName = computed(() => catRes.value?.data?.name || 'Kategori')
const categoryDescription = computed(() => catRes.value?.data?.description || '')

// Fetch Products for this Category
const { data: productsRes, pending } = await useFetch<any>(`${apiUrl}/products`, {
  query: { category_id: categoryId, active: true }
})

const filteredProducts = computed(() => {
  const raw = productsRes.value?.data || []
  return raw.map((p: any) => ({
    ...p,
    image: p.photo_url ? `${apiUrl.replace('/api', '')}${p.photo_url}` : 'https://images.unsplash.com/photo-1547096301-4ebda79e93d7?q=80',
    rating: 4.5,
    reviewCount: 0
  }))
})

// Quick View Handler
const productModal = useProductModalStore()
const openQuickView = (product: any) => {
  productModal.openModal(product)
}
</script>
