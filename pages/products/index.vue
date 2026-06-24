<template>
  <div class="pb-20 min-h-screen bg-(--bg-main) transition-colors duration-500">
    
    <!-- ======= PAGE HERO / BREADCRUMBS ======= -->
    <div class="relative py-8 md:py-12 overflow-hidden bg-(--bg-section) transition-colors duration-500">
      <div class="absolute inset-0 opacity-[0.03] dark:opacity-[0.06]" style="background-image: radial-gradient(circle at 1px 1px, var(--color-brand) 1px, transparent 0); background-size: 32px 32px;" />
      
      <div class="section-wrapper relative z-10">
        <div class="flex flex-col items-center text-center space-y-3">
          <!-- Breadcrumbs -->
          <nav class="flex items-center gap-2 text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-muted">
            <NuxtLink to="/" class="hover:text-rose-600 transition-colors">Beranda</NuxtLink>
            <Icon name="ph:caret-right-bold" class="w-3 h-3" />
            <span class="text-rose-600">Koleksi Produk</span>
          </nav>
          
          <div class="space-y-1 sm:space-y-2">
            <h1 class="section-title text-2xl sm:text-3xl md:text-5xl lg:text-6xl mb-0">Koleksi Buket Kami</h1>
            <p class="text-secondary text-xs sm:text-sm md:text-base max-w-xl mx-auto px-4">
              Temukan rangkaian bunga segar dan kreatif untuk setiap momen berharga Anda.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- ======= MAIN CONTENT (MOBILE FIRST E-COMMERCE STYLE) ======= -->
    <div class="section-wrapper py-6 md:py-10 space-y-6">
      
      <!-- ==================== SEARCH & FILTER BAR ==================== -->
      <div class="flex flex-col gap-4">
        <!-- Search -->
        <div class="relative w-full max-w-2xl mx-auto">
          <Icon name="ph:magnifying-glass-bold" class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary" />
          <input 
            type="text" 
            v-model="searchQuery"
            @input="onFilterChange"
            placeholder="Cari produk favoritmu..."
            class="w-full pl-12 pr-12 py-3.5 rounded-2xl bg-(--bg-card) border border-(--border-color) text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-300 transition-all font-medium text-primary shadow-sm placeholder:text-muted"
          />
          <button v-if="searchQuery" @click="clearSearch" class="absolute right-4 top-1/2 -translate-y-1/2 text-muted hover:text-rose-600 transition-colors">
            <Icon name="ph:x-circle-fill" class="w-5 h-5" />
          </button>
        </div>

        <!-- Category Pills (Horizontal Scroll) -->
        <div class="relative -mx-4 px-4 sm:mx-0 sm:px-0">
          <div class="flex overflow-x-auto hide-scrollbar gap-2 pb-2 snap-x snap-mandatory items-center justify-start sm:justify-center">
            <label 
              v-for="cat in filterOptions.categories" 
              :key="cat"
              class="shrink-0 snap-start"
            >
              <div 
                class="px-4 py-2 rounded-full border text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2"
                :class="selectedCategory === cat 
                  ? 'bg-rose-600 border-rose-600 text-white shadow-md shadow-rose-500/20' 
                  : 'bg-(--bg-card) border-(--border-color) text-secondary hover:border-rose-300 hover:text-primary'"
              >
                <span>{{ cat }}</span>
                <Icon v-if="selectedCategory === cat" name="ph:check-bold" class="w-3 h-3" />
              </div>
              <input type="radio" :value="cat" v-model="selectedCategory" @change="onFilterChange" class="hidden" />
            </label>
          </div>
        </div>
      </div>

      <!-- ==================== TOP CONTROLS ==================== -->
      <div class="flex items-center justify-between gap-4 mt-2 max-w-7xl mx-auto w-full">
        <button 
          @click="isMobileFilterOpen = true"
          class="px-4 py-2.5 bg-(--bg-card) text-primary rounded-xl text-xs font-black uppercase tracking-widest flex items-center gap-2 border border-(--border-color) shadow-sm hover:border-rose-300 transition-colors"
        >
          <Icon name="ph:faders-bold" class="w-4 h-4 text-rose-600" />
          Filter
          <span v-if="activeFilterCount > 0" class="flex items-center justify-center w-5 h-5 rounded-full bg-rose-600 text-white text-[10px] font-black ml-1">
            {{ activeFilterCount }}
          </span>
        </button>
        
        <div class="flex items-center gap-3">
          <!-- Sort -->
          <div class="relative">
            <select 
              v-model="sortBy"
              @change="onFilterChange"
              class="appearance-none bg-(--bg-card) border border-(--border-color) text-xs font-bold text-primary rounded-xl pl-4 pr-10 py-2.5 shadow-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20 cursor-pointer"
            >
              <option value="latest">Terbaru</option>
              <option value="price_asc">Termurah</option>
              <option value="price_desc">Termahal</option>
              <option value="rating">Rating</option>
            </select>
            <Icon name="ph:caret-down-bold" class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary pointer-events-none" />
          </div>

          <!-- View Mode Toggle (Hidden on very small screens to simplify UI) -->
          <div class="hidden sm:flex items-center gap-1 p-1 bg-(--bg-section) rounded-xl border border-(--border-color)">
            <button
              @click="viewMode = 'grid'"
              class="w-7 h-7 flex items-center justify-center rounded-lg transition-colors"
              :class="viewMode === 'grid' ? 'bg-rose-600 text-white shadow-sm' : 'text-secondary hover:text-rose-600'"
            >
              <Icon name="ph:squares-four-fill" class="w-4 h-4" />
            </button>
            <button
              @click="viewMode = 'list'"
              class="w-7 h-7 flex items-center justify-center rounded-lg transition-colors"
              :class="viewMode === 'list' ? 'bg-rose-600 text-white shadow-sm' : 'text-secondary hover:text-rose-600'"
            >
              <Icon name="ph:rows-bold" class="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div class="text-xs text-secondary font-medium text-center sm:text-left mt-2 max-w-7xl mx-auto w-full">
        <span v-if="filteredProducts.length > 0">
          Menampilkan <span class="font-black text-primary">{{ startIndex + 1 }}-{{ Math.min(endIndex, filteredProducts.length) }}</span> dari <span class="font-black text-primary">{{ filteredProducts.length }}</span> produk
        </span>
        <span v-else>
          Tidak ada produk ditemukan
        </span>
      </div>

      <!-- ==================== PRODUCT GRID ==================== -->
      <main class="w-full max-w-7xl mx-auto">
        <ProductGrid 
          :products="paginatedProducts" 
          :show-filter="false" 
          :external-view-mode="viewMode"
          @view="openQuickView"
        />

        <!-- Pagination -->
        <div v-if="totalPages > 1" class="flex items-center justify-center gap-2 mt-12 pb-8">
          <button 
            @click="goToPage(currentPage - 1)"
            :disabled="currentPage === 1"
            class="w-10 h-10 rounded-full flex items-center justify-center bg-(--bg-card) border border-(--border-color) text-secondary hover:text-rose-600 hover:border-rose-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
          >
            <Icon name="ph:caret-left-bold" class="w-4 h-4" />
          </button>
          
          <button 
            v-for="page in totalPages" 
            :key="page"
            @click="goToPage(page)"
            class="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold transition-all border shadow-sm"
            :class="currentPage === page 
              ? 'bg-rose-600 border-rose-600 text-white shadow-md shadow-rose-500/20' 
              : 'bg-(--bg-card) border-(--border-color) text-secondary hover:text-rose-600 hover:border-rose-300'"
          >
            {{ page }}
          </button>

          <button 
            @click="goToPage(currentPage + 1)"
            :disabled="currentPage === totalPages"
            class="w-10 h-10 rounded-full flex items-center justify-center bg-(--bg-card) border border-(--border-color) text-secondary hover:text-rose-600 hover:border-rose-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
          >
            <Icon name="ph:caret-right-bold" class="w-4 h-4" />
          </button>
        </div>
      </main>

    </div>

    <!-- ==================== MOBILE/GENERAL FILTER DRAWER ==================== -->
    <Transition name="drawer">
      <div v-if="isMobileFilterOpen" class="fixed inset-0 z-[100] flex">
        <!-- Overlay -->
        <div class="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" @click="isMobileFilterOpen = false"></div>
        
        <!-- Drawer Panel -->
        <div class="relative w-full max-w-sm bg-(--bg-main) h-full flex flex-col ml-auto shadow-2xl overflow-hidden border-l border-(--border-color)">
          <!-- Header -->
          <div class="px-5 py-4 border-b border-(--border-color) flex items-center justify-between bg-(--bg-card)">
            <h2 class="text-sm font-black uppercase tracking-widest text-primary flex items-center gap-2">
              <Icon name="ph:faders-bold" class="w-4 h-4 text-rose-600" />
              Filter Lanjutan
            </h2>
            <button @click="isMobileFilterOpen = false" class="w-8 h-8 rounded-full bg-(--bg-section) flex items-center justify-center text-secondary hover:text-rose-600 transition-colors">
              <Icon name="ph:x-bold" class="w-4 h-4" />
            </button>
          </div>

          <!-- Body (Scrollable) -->
          <div class="flex-1 overflow-y-auto p-5 space-y-8">
            
            <!-- Price Range -->
            <div class="space-y-4">
              <h3 class="text-xs font-black uppercase tracking-widest text-muted flex items-center gap-2">
                <Icon name="ph:money-bold" class="w-4 h-4 text-rose-600" />
                Rentang Harga
              </h3>
              <div class="grid grid-cols-2 gap-3">
                <div class="space-y-1">
                  <label class="text-[10px] font-bold uppercase tracking-wider text-muted">Min (Rp)</label>
                  <input 
                    type="number" 
                    v-model.number="priceMin"
                    @input="onFilterChange"
                    placeholder="0"
                    class="w-full px-3 py-3 rounded-xl bg-(--bg-section) border border-(--border-color) text-xs font-bold text-primary focus:outline-none focus:ring-1 focus:ring-rose-500/30 focus:border-rose-300"
                  />
                </div>
                <div class="space-y-1">
                  <label class="text-[10px] font-bold uppercase tracking-wider text-muted">Max (Rp)</label>
                  <input 
                    type="number" 
                    v-model.number="priceMax"
                    @input="onFilterChange"
                    placeholder="2000000"
                    class="w-full px-3 py-3 rounded-xl bg-(--bg-section) border border-(--border-color) text-xs font-bold text-primary focus:outline-none focus:ring-1 focus:ring-rose-500/30 focus:border-rose-300"
                  />
                </div>
              </div>
            </div>

            <!-- Help Banner -->
            <div class="bg-gradient-to-br from-rose-500 to-rose-700 rounded-2xl p-5 text-white shadow-lg shadow-rose-500/20 relative overflow-hidden mt-6">
              <Icon name="ph:flower-lotus-duotone" class="absolute -bottom-4 -right-4 w-24 h-24 text-white/10 rotate-12" />
              <p class="font-black text-base relative mb-1">Butuh Buket Custom?</p>
              <p class="text-rose-100 text-xs font-medium leading-relaxed relative mb-4">Wujudkan desain buket impian Anda bersama florist kami.</p>
              <a href="https://wa.me/6281234567890" target="_blank" class="w-full py-2.5 bg-white text-rose-600 rounded-xl font-bold text-xs hover:bg-rose-50 flex items-center justify-center gap-2 transition-colors relative shadow-sm">
                <Icon name="ph:whatsapp-logo-fill" class="w-4 h-4" />
                Chat WhatsApp
              </a>
            </div>

          </div>

          <!-- Footer -->
          <div class="p-5 border-t border-(--border-color) bg-(--bg-card) flex items-center gap-3">
            <button @click="resetFilters" class="px-5 py-3.5 rounded-xl text-xs font-black uppercase tracking-widest text-secondary hover:text-primary transition-colors">
              Reset
            </button>
            <button @click="isMobileFilterOpen = false" class="flex-1 py-3.5 rounded-xl bg-rose-600 text-white text-xs font-black uppercase tracking-widest shadow-md hover:bg-rose-700 transition-colors">
              Terapkan ({{ filteredProducts.length }})
            </button>
          </div>
        </div>
      </div>
    </Transition>

  </div>
</template>

<script setup lang="ts">
import ProductGrid from '~/components/product/ProductGrid.vue'

// ===== SEO & HEAD =====
useHead({
  title: 'Katalog Produk — HappyBouquet Jakarta',
  meta: [
    { name: 'description', content: 'Jelajahi berbagai pilihan buket bunga segar, buket snack, uang, dan custom order terbaik di Jakarta.' },
  ]
})

const config = useRuntimeConfig()
const apiUrl = config.public.apiUrl
const route = useRoute()
const router = useRouter()

// ===== DATA FETCHING =====
const { data: productsRes } = await useFetch<any>(`${apiUrl}/products?active=true`)

const allProducts = computed(() => {
  const apiData = productsRes.value?.data || []
  return apiData.map((p: any) => ({
    ...p,
    id: p.id,
    slug: p.slug || (p.name ? p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') : `product-${p.id}`),
    name: p.name,
    price: p.price ? Number(p.price) : 0,
    originalPrice: p.price ? Number(p.price) * 1.2 : 0,
    image: p.photo_url ? `${apiUrl.replace('/api', '')}${p.photo_url}` : 'https://images.unsplash.com/photo-1547096301-4ebda79e93d7?q=80',
    rating: 4.5 + Math.random() * 0.5,
    reviewCount: Math.floor(Math.random() * 200) + 10,
    category: typeof p.category === 'object' && p.category !== null ? (p.category.NAME || p.category.name) : p.category
  }))
})

// ===== FILTER STATE =====
const isMobileFilterOpen = ref(false)
const searchQuery = ref((route.query.q as string) || '')
const selectedCategory = ref((route.query.cat as string) || 'Semua')
const priceMin = ref<number | ''>(route.query.min ? Number(route.query.min) : '')
const priceMax = ref<number | ''>(route.query.max ? Number(route.query.max) : '')
const sortBy = ref((route.query.sort as string) || 'latest')
const viewMode = ref<'grid' | 'list'>('grid')

// Active Filter Count for Badge
const activeFilterCount = computed(() => {
  let count = 0
  if (priceMin.value !== '' && priceMin.value > 0) count++
  if (priceMax.value !== '' && priceMax.value > 0) count++
  return count
})

// ===== PAGINATION STATE =====
const currentPage = ref(route.query.page ? Number(route.query.page) : 1)
const itemsPerPage = 12

// Extract dynamic categories from products
const filterOptions = computed(() => {
  const cats = [...new Set(allProducts.value.map(p => p.category).filter(Boolean))]
  return {
    categories: ['Semua', ...cats]
  }
})

// Apply Filters & Sort
const filteredProducts = computed(() => {
  let result = [...allProducts.value]

  // Filter by Category
  if (selectedCategory.value !== 'Semua') {
    result = result.filter(p => p.category === selectedCategory.value)
  }

  // Filter by Search
  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase()
    result = result.filter(p => p.name.toLowerCase().includes(q) || (p.category && p.category.toLowerCase().includes(q)))
  }

  // Filter by Price Min
  if (priceMin.value !== '' && priceMin.value > 0) {
    result = result.filter(p => p.price >= Number(priceMin.value))
  }

  // Filter by Price Max
  if (priceMax.value !== '' && priceMax.value > 0) {
    result = result.filter(p => p.price <= Number(priceMax.value))
  }

  // Sort
  if (sortBy.value === 'price_asc') {
    result.sort((a, b) => a.price - b.price)
  } else if (sortBy.value === 'price_desc') {
    result.sort((a, b) => b.price - a.price)
  } else if (sortBy.value === 'rating') {
    result.sort((a, b) => b.rating - a.rating)
  } else {
    // Default 'latest'
    result.sort((a, b) => b.id - a.id)
  }

  return result
})

// Paginated Results
const totalPages = computed(() => Math.ceil(filteredProducts.value.length / itemsPerPage))
const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage)
const endIndex = computed(() => startIndex.value + itemsPerPage)
const paginatedProducts = computed(() => filteredProducts.value.slice(startIndex.value, endIndex.value))

// ===== ACTIONS =====
const onFilterChange = () => {
  currentPage.value = 1
  updateURL()
}

const updateURL = () => {
  const query: any = {}
  if (searchQuery.value) query.q = searchQuery.value
  if (selectedCategory.value !== 'Semua') query.cat = selectedCategory.value
  if (priceMin.value) query.min = priceMin.value
  if (priceMax.value) query.max = priceMax.value
  if (sortBy.value !== 'latest') query.sort = sortBy.value
  if (currentPage.value > 1) query.page = currentPage.value

  router.push({ query })
}

const goToPage = (page: number) => {
  if (page < 1 || page > totalPages.value) return
  currentPage.value = page
  updateURL()
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const clearSearch = () => {
  searchQuery.value = ''
  onFilterChange()
}

const resetFilters = () => {
  searchQuery.value = ''
  selectedCategory.value = 'Semua'
  priceMin.value = ''
  priceMax.value = ''
  onFilterChange()
}

const productModal = useProductModalStore()
const openQuickView = (product: any) => productModal.openModal(product)

// Watch for URL changes (e.g. back button)
watch(() => route.query, (newQuery) => {
  searchQuery.value = (newQuery.q as string) || ''
  selectedCategory.value = (newQuery.cat as string) || 'Semua'
  priceMin.value = newQuery.min ? Number(newQuery.min) : ''
  priceMax.value = newQuery.max ? Number(newQuery.max) : ''
  sortBy.value = (newQuery.sort as string) || 'latest'
  currentPage.value = newQuery.page ? Number(newQuery.page) : 1
})
</script>

<style scoped>
/* Transisi Drawer Mobile */
.drawer-enter-active,
.drawer-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.drawer-enter-from,
.drawer-leave-to {
  opacity: 0;
}
.drawer-enter-from .max-w-sm,
.drawer-leave-to .max-w-sm {
  transform: translateX(100%);
}

/* Hide scrollbar for Chrome, Safari and Opera */
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
/* Hide scrollbar for IE, Edge and Firefox */
.hide-scrollbar {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
</style>
