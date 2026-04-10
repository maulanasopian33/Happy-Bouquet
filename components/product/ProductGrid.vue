<template>
  <div class="space-y-6">
    <!-- Filter & Sort Row — hanya tampil jika showFilter=true -->
    <div v-if="showFilter" class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">

      <!-- Category Filter Tabs (horizontal scroll) -->
      <div class="flex items-center gap-2 overflow-x-auto scroll-hide pb-1">
        <button
          v-for="tab in categoryTabs"
          :key="tab"
          @click="activeCategory = tab"
          class="shrink-0 px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-200"
          :class="activeCategory === tab
            ? 'bg-rose-600 text-white shadow-md shadow-rose-500/20'
            : 'bg-[var(--bg-section)] text-secondary hover:text-rose-600 border border-[var(--border-color)] hover:border-rose-300'"
        >
          {{ tab }}
        </button>
      </div>

      <!-- Sort -->
      <div class="flex items-center gap-2 shrink-0">
        <span class="text-xs font-semibold text-muted hidden sm:inline">Urutkan:</span>

        <!-- Desktop Pills -->
        <div class="hidden sm:flex items-center gap-1.5">
          <button
            v-for="opt in sortOptions"
            :key="opt.value"
            @click="activeSort = opt.value"
            class="px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200"
            :class="activeSort === opt.value
              ? 'bg-rose-600 text-white border-rose-600 shadow-sm'
              : 'bg-[var(--bg-card)] text-secondary border-[var(--border-color)] hover:border-rose-300 hover:text-rose-600'"
          >
            {{ opt.label }}
          </button>
        </div>

        <!-- Mobile Sort Select -->
        <select
          v-model="activeSort"
          class="sm:hidden text-xs border border-[var(--border-color)] rounded-xl px-3 py-2 bg-[var(--bg-card)] text-primary focus:outline-none focus:ring-2 focus:ring-rose-500/20 font-semibold"
        >
          <option v-for="opt in sortOptions" :key="opt.value" :value="opt.value">
            {{ opt.label }}
          </option>
        </select>

        <!-- Grid/List toggle -->
        <div class="flex items-center gap-1 p-1 bg-[var(--bg-section)] rounded-xl border border-[var(--border-color)]">
          <button
            @click="viewMode = 'grid'"
            class="w-7 h-7 flex items-center justify-center rounded-lg transition-colors"
            :class="viewMode === 'grid' ? 'bg-rose-600 text-white' : 'text-secondary hover:text-rose-600'"
            title="Grid view"
          >
            <Icon name="ph:squares-four-fill" class="w-3.5 h-3.5" />
          </button>
          <button
            @click="viewMode = 'list'"
            class="w-7 h-7 flex items-center justify-center rounded-lg transition-colors"
            :class="viewMode === 'list' ? 'bg-rose-600 text-white' : 'text-secondary hover:text-rose-600'"
            title="List view"
          >
            <Icon name="ph:rows-bold" class="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>

    <!-- Result Count — hanya tampil jika showFilter=true -->
    <p v-if="showFilter" class="text-xs text-muted font-medium">
      Menampilkan <span class="text-primary font-bold">{{ filtered.length }}</span> produk
      <span v-if="activeCategory !== 'Semua'"> dalam <span class="text-rose-600 font-bold">{{ activeCategory }}</span></span>
    </p>

    <!-- Skeleton Loading -->
    <div
      v-if="isLoading"
      class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5"
    >
      <div v-for="n in 8" :key="n" class="skeleton aspect-4/5 rounded-3xl" />
    </div>

    <!-- Grid View -->
    <div
      v-else-if="filtered.length > 0 && viewMode === 'grid'"
      class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5"
    >
      <ProductCard
        v-for="(product, i) in sortedProducts"
        :key="product.id || i"
        v-bind="product"
        @view="$emit('view', $event)"
      />
    </div>

    <!-- List View -->
    <div v-else-if="filtered.length > 0 && viewMode === 'list'" class="flex flex-col gap-4">
      <div
        v-for="(product, i) in sortedProducts"
        :key="product.id || i"
        class="flex items-center gap-5 p-4 bg-[var(--bg-card)] rounded-2xl border border-[var(--border-color)] hover:border-rose-300/50 hover:shadow-lg transition-all duration-300 group"
      >
        <div class="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden shrink-0">
          <img
            :src="product.image"
            :alt="product.name"
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        <div class="flex-1 min-w-0">
          <p v-if="product.category" class="text-[10px] font-bold text-rose-500 uppercase tracking-widest mb-0.5">{{ product.category }}</p>
          <h3 class="text-sm sm:text-base font-bold text-primary group-hover:text-rose-600 transition-colors line-clamp-1">{{ product.name }}</h3>
          <div class="flex items-center gap-1 mt-1">
            <Icon v-for="s in 5" :key="s" name="ph:star-fill" class="w-3 h-3" :class="s <= Math.round(product.rating || 5) ? 'text-amber-400' : 'text-slate-200 dark:text-slate-700'" />
            <span class="text-[10px] text-muted ml-1">({{ product.reviewCount || 0 }})</span>
          </div>
        </div>
        <div class="flex flex-col items-end gap-2 shrink-0">
          <p class="text-base font-black text-rose-600">
            {{ formatPrice(product.price) }}
          </p>
          <button
            @click="$emit('view', product)"
            class="px-3 py-1.5 rounded-xl bg-rose-600 text-white text-xs font-bold hover:bg-rose-700 transition-colors"
          >
            Pilih
          </button>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else class="flex flex-col items-center justify-center py-20 text-muted text-center">
      <Icon name="ph:package-open-duotone" class="w-16 h-16 mb-4 opacity-30" />
      <p class="font-semibold text-base">Produk tidak ditemukan</p>
      <p class="text-sm mt-1 max-w-xs">Coba pilih kategori lain atau hubungi kami untuk custom order.</p>
      <button
        @click="activeCategory = 'Semua'"
        class="mt-4 px-5 py-2 rounded-xl bg-rose-600 text-white text-sm font-bold hover:bg-rose-700 transition-colors"
      >
        Lihat Semua
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import ProductCard from './ProductCard.vue'

const props = defineProps<{ products: any[]; showFilter?: boolean }>()
defineEmits(['view'])

const activeSort = ref('latest')
const activeCategory = ref('Semua')
const viewMode = ref<'grid' | 'list'>('grid')
const isLoading = computed(() => props.products.length === 0 && displayProducts.value === dummyProducts ? false : false)
// showFilter default true jika tidak di-pass
const showFilter = computed(() => props.showFilter !== false)

const sortOptions = [
  { label: 'Terbaru', value: 'latest' },
  { label: 'Harga ↑', value: 'price_asc' },
  { label: 'Harga ↓', value: 'price_desc' },
  { label: 'Rating', value: 'rating' },
]

const dummyProducts = [
  { id: 1, name: 'Buket Mawar Premium', price: 185000, rating: 4.8, reviewCount: 127, badge: 'Terlaris', category: 'Mawar', image: 'https://images.unsplash.com/photo-1487530811015-780d4d5af7d8?q=80&w=600&fit=crop' },
  { id: 2, name: 'Buket Wisuda Elegance', price: 250000, rating: 4.9, reviewCount: 89, badge: 'Baru', category: 'Wisuda', image: 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?q=80&w=600&fit=crop' },
  { id: 3, name: 'Mini Bouquet Anniversary', price: 120000, rating: 4.7, reviewCount: 54, badge: 'Diskon', category: 'Anniversary', image: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=600&fit=crop' },
  { id: 4, name: 'Buket Snack Unik', price: 150000, rating: 4.6, reviewCount: 38, badge: null, category: 'Snack', image: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?q=80&w=600&fit=crop' },
  { id: 5, name: 'Hand Bouquet Tulip', price: 200000, rating: 4.9, reviewCount: 210, badge: 'Hot', category: 'Tulip', image: 'https://images.unsplash.com/photo-1468327768560-75b778cbb551?q=80&w=600&fit=crop' },
  { id: 6, name: 'Dried Flower Rustic', price: 160000, rating: 4.5, reviewCount: 76, badge: null, category: 'Kering', image: 'https://images.unsplash.com/photo-1530552182927-a6ea415d6ae1?q=80&w=600&fit=crop' },
  { id: 7, name: 'Buket Mewah Gold', price: 350000, rating: 5.0, reviewCount: 34, badge: 'Terlaris', category: 'Premium', image: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?q=80&w=600&fit=crop' },
  { id: 8, name: 'Buket Ulang Tahun Pastel', price: 175000, rating: 4.7, reviewCount: 92, badge: 'Baru', category: 'Birthday', image: 'https://images.unsplash.com/photo-1518709594023-6eab9bab7b23?q=80&w=600&fit=crop' },
]

const displayProducts = computed(() => props.products.length > 0 ? props.products : dummyProducts)

// Dynamic category tabs
const categoryTabs = computed(() => {
  const cats = [...new Set(displayProducts.value.map((p: any) => p.category).filter(Boolean))]
  return ['Semua', ...cats]
})

const filtered = computed(() => {
  if (activeCategory.value === 'Semua') return displayProducts.value
  return displayProducts.value.filter((p: any) => p.category === activeCategory.value)
})

const sortedProducts = computed(() => {
  const arr = [...filtered.value]
  if (activeSort.value === 'price_asc') return arr.sort((a, b) => a.price - b.price)
  if (activeSort.value === 'price_desc') return arr.sort((a, b) => b.price - a.price)
  if (activeSort.value === 'rating') return arr.sort((a, b) => (b.rating || 0) - (a.rating || 0))
  return arr
})

const formatPrice = (price: number) =>
  new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price)
</script>
