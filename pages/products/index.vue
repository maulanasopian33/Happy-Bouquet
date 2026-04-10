<template>
  <div class="pb-20">
    <!-- ======= PAGE HERO / BREADCRUMBS ======= -->
    <div class="relative py-12 md:py-20 overflow-hidden bg-(--bg-section) transition-colors duration-500">
      <div class="absolute inset-0 opacity-[0.03] dark:opacity-[0.06]" style="background-image: radial-gradient(circle at 1px 1px, var(--color-brand) 1px, transparent 0); background-size: 32px 32px;" />
      
      <div class="section-wrapper relative z-10">
        <div class="flex flex-col items-center text-center space-y-4">
          <!-- Breadcrumbs -->
          <nav class="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-muted">
            <NuxtLink to="/" class="hover:text-rose-600 transition-colors">Beranda</NuxtLink>
            <Icon name="ph:caret-right-bold" class="w-3 h-3" />
            <span class="text-rose-600">Koleksi Produk</span>
          </nav>
          
          <div class="space-y-2">
            <h1 class="section-title text-4xl md:text-5xl lg:text-6xl mb-0">Koleksi Buket Kami</h1>
            <p class="text-secondary text-sm md:text-base max-w-xl mx-auto">
              Temukan rangkaian bunga segar dan kreatif untuk setiap momen berharga Anda.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- ======= MAIN CONTENT ======= -->
    <div class="section-wrapper py-12 md:py-16">
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-12">
        
        <!-- Sidebar: Filter & Categories (Desktop) -->
        <aside class="hidden lg:block lg:col-span-1 space-y-8">
          <div class="sticky top-24 space-y-8">
            <!-- Search Box -->
            <div class="space-y-3">
              <h3 class="text-sm font-black uppercase tracking-widest text-primary flex items-center gap-2">
                <Icon name="ph:magnifying-glass-bold" class="w-4 h-4 text-rose-600" />
                Cari Produk
              </h3>
              <div class="relative group">
                <input 
                  type="text" 
                  placeholder="Mawar Merah..."
                  class="w-full px-5 py-3.5 rounded-2xl bg-(--bg-card) border border-(--border-color) text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-300 transition-all"
                />
              </div>
            </div>

            <!-- Categories Card -->
            <div class="card-premium p-6 space-y-5">
              <h3 class="text-sm font-black uppercase tracking-widest text-primary border-b border-(--border-color) pb-3">Kategori</h3>
              <ul class="space-y-1.5">
                <li v-for="c in categories" :key="typeof c === 'string' ? c : c.name">
                  <button 
                    class="flex items-center justify-between w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition-all group hover:bg-rose-50 dark:hover:bg-rose-950/20"
                    :class="activeCategory === (typeof c === 'string' ? c : c.name) ? 'bg-rose-50 dark:bg-rose-950/30 text-rose-600' : 'text-secondary hover:text-rose-600'"
                    @click="activeCategory = (typeof c === 'string' ? c : c.name)"
                  >
                    <span class="flex items-center gap-3">
                      <span v-if="typeof c !== 'string'" class="text-base">{{ c.emoji }}</span>
                      {{ typeof c === 'string' ? c : c.name }}
                    </span>
                    <Icon name="ph:caret-right-bold" class="w-3 h-3 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                  </button>
                </li>
              </ul>
            </div>

            <!-- Help Card -->
            <div class="bg-rose-600 rounded-3xl p-6 text-white space-y-4 shadow-xl shadow-rose-500/20 relative overflow-hidden">
              <Icon name="ph:flower-lotus-fill" class="absolute -bottom-4 -right-4 w-24 h-24 text-white/10 rotate-12" />
              <p class="font-bold text-lg leading-tight relative">Butuh Buket Custom?</p>
              <p class="text-rose-100 text-xs leading-relaxed relative">Konsultasikan desain impianmu secara gratis dengan tim florist kami.</p>
              <a href="https://wa.me/6281234567890" target="_blank" class="flex items-center justify-center gap-2 w-full py-2.5 bg-white text-rose-600 rounded-xl font-bold text-xs hover:bg-rose-50 transition-colors relative">
                <Icon name="ph:whatsapp-logo-fill" class="w-4 h-4" />
                Hubungi Kami
              </a>
            </div>
          </div>
        </aside>

        <!-- Main Products Display -->
        <main class="lg:col-span-3 space-y-16">
          
          <!-- Recommendation / Trending -->
          <section class="space-y-8 animate-fade-in">
            <div class="flex items-end justify-between">
              <div class="space-y-1">
                <div class="section-tag">Hot Choice</div>
                <h2 class="text-2xl font-black text-primary">Paling Banyak Dicari</h2>
              </div>
            </div>
            <ProductCarousel :products="featuredProducts" />
          </section>

          <hr class="border-(--border-color)" />

          <!-- All Products Grid -->
          <section class="space-y-8">
            <div class="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div class="space-y-1">
                <div class="section-tag">Katalog Kami</div>
                <h2 class="text-2xl font-black text-primary">Semua Koleksi</h2>
              </div>
            </div>
            
            <ProductGrid 
              :products="products" 
              :show-filter="true" 
              @view="openQuickView"
            />
          </section>

        </main>
      </div>
    </div>

    <!-- ======= CTA SECTION ======= -->
    <section class="section-wrapper py-16">
      <div class="rounded-[2.5rem] bg-(--bg-card) border border-(--border-color) p-10 md:p-16 flex flex-col items-center text-center space-y-8 shadow-sm">
        <div class="w-16 h-16 rounded-3xl bg-rose-50 dark:bg-rose-950/30 flex items-center justify-center">
          <Icon name="ph:gift-bold" class="w-8 h-8 text-rose-600" />
        </div>
        <div class="space-y-3">
          <h2 class="text-3xl font-black text-primary">Beri Kejutan Spesial Hari Ini</h2>
          <p class="text-secondary max-w-lg mx-auto">Tersedia pengiriman hari yang sama untuk wilayah Jakarta & sekitarnya. Pesan sekarang sebelum jam 14.00.</p>
        </div>
        <div class="flex flex-col sm:flex-row gap-4">
          <button class="btn-premium">Belanja Sekarang</button>
          <NuxtLink to="/promo" class="btn-premium-outline">Lihat Promo</NuxtLink>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup lang="ts">
import ProductGrid from '~/components/product/ProductGrid.vue'
import ProductCarousel from '~/components/product/ProductCarousel.vue'

// ===== SEO & HEAD =====
useHead({
  title: 'Koleksi Buket Premium — HappyBouquet Jakarta',
  meta: [
    { name: 'description', content: 'Jelajahi berbagai pilihan buket bunga segar, buket snack, uang, dan custom order terbaik di Jakarta. Kirim hari ini!' },
    { property: 'og:title', content: 'Koleksi Buket Premium — HappyBouquet' },
    { property: 'og:description', content: 'Rangkaian bunga segar dan buket kado pilihan untuk momen spesialmu.' },
  ]
})

const config = useRuntimeConfig()
const apiUrl = config.public.apiUrl
const activeCategory = ref('Semua Buket')

// ===== DUMMY FALLBACKS =====
const dummyCategories = [
  "Semua Buket",
  "Buket Bunga Segar",
  "Buket Snack",
  "Buket Uang",
  "Buket Wisuda",
  "Buket Custom"
]

const dummyProducts = [
  { id: 1, name: "Buket Mawar Merah Romantis", price: 250000, image: "https://images.unsplash.com/photo-1587334274328-64186a80aeee?q=80&w=1974&auto=format&fit=crop", category: "Buket Bunga Segar", rating: 4.9, reviewCount: 210, badge: 'Terlaris' },
  { id: 2, name: "Buket Snack Ceria", price: 150000, image: "https://images.unsplash.com/photo-1618833818273-7572a25c6547?q=80&w=2070&auto=format&fit=crop", category: "Buket Snack", rating: 4.8, reviewCount: 154 },
  { id: 3, name: "Buket Uang Elegan", price: 500000, image: "https://images.unsplash.com/photo-1627863453293-552b38446d3a?q=80&w=1964&auto=format&fit=crop", category: "Buket Uang", rating: 5.0, reviewCount: 99, badge: 'Premium' },
  { id: 4, name: "Buket Tulip Putih", price: 180000, image: "https://images.unsplash.com/photo-1518701006-57d5488e7a84?q=80", category: "Buket Bunga Segar", rating: 4.7, reviewCount: 75 },
  { id: 5, name: "Buket Bunga Matahari", price: 125000, image: "https://images.unsplash.com/photo-1597822622510-cd5368da973d?q=80", category: "Buket Bunga Segar", rating: 4.9, reviewCount: 120 },
  { id: 6, name: "Buket Wisuda Lavender", price: 220000, image: "https://images.unsplash.com/photo-1547096301-4ebda79e93d7?q=80", category: "Buket Wisuda", rating: 4.8, reviewCount: 86, badge: 'Baru' },
]

// ===== DATA FETCHING =====
const { data: categoriesRes } = await useFetch<any>(`${apiUrl}/categories`)
const { data: productsRes } = await useFetch<any>(`${apiUrl}/products?active=true`)

const categories = computed(() => {
  if (categoriesRes.value?.data?.length) {
    return ['Semua Buket', ...categoriesRes.value.data]
  }
  return dummyCategories
})

const products = computed(() => {
  const apiData = productsRes.value?.data || []
  if (apiData.length === 0) return dummyProducts
  return apiData.map((p: any) => ({
    ...p,
    price: p.price ? Number(p.price) : 0,
    image: p.photo_url ? `${apiUrl.replace('/api', '')}${p.photo_url}` : 'https://images.unsplash.com/photo-1547096301-4ebda79e93d7?q=80',
    rating: 4.5 + Math.random() * 0.5,
    reviewCount: Math.floor(Math.random() * 200) + 10
  }))
})

const featuredProducts = computed(() => products.value.slice(0, 5))

// ===== ACTIONS =====
const productModal = useProductModalStore()
const openQuickView = (product: any) => productModal.openModal(product)
</script>

<style scoped>
/* Transisi halus saat ganti kategori via sidebar di desktop */
.animate-fade-in {
  animation: fadeIn 0.6s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
