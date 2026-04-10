<template>
  <div class="overflow-hidden">

    <!-- ======= HERO SECTION ======= -->
    <section class="section-wrapper py-4 sm:py-6 animate-fade-in">
      <HeroSlider :banners="heroBanners" />
    </section>

    <!-- ======= TRUST BADGES ======= -->
    <section class="section-wrapper py-10">
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5">
        <div
          v-for="badge in trustBadges"
          :key="badge.title"
          class="group flex items-center gap-4 p-4 md:p-5 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)] hover:border-rose-300/50 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
          :style="{ boxShadow: 'var(--shadow-card)' }"
        >
          <div
            class="w-11 h-11 md:w-13 md:h-13 rounded-2xl flex items-center justify-center text-2xl shrink-0 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300"
            :class="badge.color"
          >
            {{ badge.icon }}
          </div>
          <div class="min-w-0">
            <h3 class="text-primary font-bold text-sm leading-tight mb-0.5">{{ badge.title }}</h3>
            <p class="text-muted text-[11px] leading-snug">{{ badge.text }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ======= FLASH SALE & DEALS ======= -->
    <section class="section-wrapper py-8">
      <div class="rounded-[2rem] bg-gradient-to-br from-rose-600 via-rose-600 to-rose-800 p-7 md:p-14 relative overflow-hidden shadow-2xl shadow-rose-500/20">
        <!-- Decorations -->
        <div class="absolute top-0 right-0 w-80 h-80 bg-white/8 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />
        <div class="absolute bottom-0 left-0 w-64 h-64 bg-rose-400/20 rounded-full blur-2xl translate-y-1/2 -translate-x-1/4 pointer-events-none" />
        <div class="absolute top-1/2 right-1/4 w-32 h-32 bg-white/5 rounded-full blur-2xl pointer-events-none" />

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center relative z-10">

          <!-- Left: Text & Timer -->
          <div class="space-y-7 text-white">
            <div class="space-y-4">
              <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-[11px] font-black uppercase tracking-widest">
                <Icon name="ph:lightning-fill" class="w-4 h-4 text-amber-300 animate-pulse" />
                Penawaran Terbatas
              </div>
              <h2 class="text-3xl md:text-5xl font-black tracking-tight leading-tight">
                Flash Sale<br />
                <span class="text-gradient-gold" style="-webkit-text-fill-color: #FCD34D;">Special Deals!</span>
              </h2>
              <p class="text-rose-100/80 text-sm md:text-base max-w-md font-medium leading-relaxed">
                Jangan lewatkan buket eksklusif dengan harga spesial — hanya hari ini!
              </p>
            </div>

            <!-- Countdown Timer -->
            <div class="space-y-3">
              <p class="text-rose-200/70 text-[10px] font-bold uppercase tracking-widest">Berakhir Dalam</p>
              <div class="flex items-center gap-3">
                <div
                  v-for="(unit, index) in timerUnits"
                  :key="unit.label"
                  class="flex items-center gap-3"
                >
                  <div class="text-center">
                    <div class="bg-white/15 backdrop-blur-md border border-white/20 rounded-2xl px-4 py-3 min-w-[60px]">
                      <span class="text-2xl md:text-3xl font-black tabular-nums block" :key="unit.value">
                        {{ String(unit.value).padStart(2, '0') }}
                      </span>
                    </div>
                    <p class="text-rose-200/60 text-[9px] font-bold uppercase tracking-widest mt-1.5">{{ unit.label }}</p>
                  </div>
                  <span v-if="index < timerUnits.length - 1" class="text-white/50 text-2xl font-black -mt-5 select-none">:</span>
                </div>
              </div>
            </div>

            <NuxtLink
              to="/promo"
              class="inline-flex items-center gap-3 px-7 py-3.5 bg-white text-rose-600 rounded-2xl font-black text-sm shadow-xl hover:bg-rose-50 hover:-translate-y-1 hover:shadow-2xl transition-all w-fit"
            >
              <Icon name="ph:lightning-fill" class="w-4.5 h-4.5 text-amber-500" />
              Ambil Promo Sekarang
              <Icon name="ph:arrow-right-bold" class="w-4 h-4" />
            </NuxtLink>
          </div>

          <!-- Right: Flash Sale Products -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div
              v-for="product in flashSale.slice(0, 2)"
              :key="product.id"
              class="bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-white/15 hover:bg-white/20 transition-all duration-300 cursor-pointer group"
            >
              <FlashSaleSmall :product="product" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ======= QUICK CATEGORIES ======= -->
    <section class="section-wrapper space-y-6 py-8">
      <div class="flex items-end justify-between gap-4">
        <div class="space-y-1.5">
          <div class="section-tag">Jelajahi</div>
          <h2 class="section-title">Belanja per Kategori</h2>
        </div>
        <NuxtLink
          to="/products"
          class="text-xs font-bold text-rose-600 hover:gap-3 flex items-center gap-2 transition-all group shrink-0 pb-1"
        >
          Lihat Semua
          <Icon name="ph:arrow-right-bold" class="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </NuxtLink>
      </div>
      <QuickCategories :categories="categories" @select="goToCategory" />
    </section>

    <!-- ======= FEATURED / RECOMMENDATION ======= -->
    <section class="bg-(--bg-section) py-20 transition-colors">
      <div class="section-wrapper space-y-10">
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div class="space-y-1.5">
            <div class="section-tag">Pilihan Kami</div>
            <h2 class="section-title">Rekomendasi Untukmu</h2>
            <p class="text-secondary text-sm max-w-lg">Koleksi bunga pilihan yang paling dicintai pelanggan setia kami.</p>
          </div>
          <NuxtLink
            to="/products"
            class="text-xs font-bold text-rose-600 flex items-center gap-2 transition-all group shrink-0 pb-1"
          >
            Lihat Semua
            <Icon name="ph:arrow-right-bold" class="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </NuxtLink>
        </div>
        <ProductCarousel
          :products="recoProducts"
          @view="openQuickView"
        />
      </div>
    </section>

    <!-- ======= MAIN PRODUCT GRID ======= -->
    <section class="section-wrapper py-16 space-y-10">
      <div class="text-center space-y-3 max-w-2xl mx-auto">
        <div class="section-tag mx-auto">Koleksi Lengkap</div>
        <h2 class="section-title">Temukan Buket Sempurnamu</h2>
        <p class="text-secondary text-sm">Dari mawar romantis hingga buket wisuda elegan — semua ada di sini.</p>
      </div>

      <ProductGrid :products="allProducts" :show-filter="false" @view="openQuickView" />

      <div class="flex justify-center pt-4">
        <NuxtLink to="/products" class="btn-premium-outline flex items-center gap-2">
          <Icon name="ph:flower-lotus-bold" class="w-4.5 h-4.5" />
          Lihat Semua Koleksi
        </NuxtLink>
      </div>
    </section>

    <!-- ======= TESTIMONIALS ======= -->
    <section class="bg-[var(--bg-card)] dark:bg-slate-900 border-t border-[var(--border-color)] py-20 relative overflow-hidden transition-colors duration-500">
      <!-- Subtle background pattern -->
      <div class="absolute inset-0 opacity-[0.03] dark:opacity-[0.06]" style="background-image: radial-gradient(circle at 1px 1px, var(--color-brand) 1px, transparent 0); background-size: 32px 32px;" />

      <div class="section-wrapper relative z-10 space-y-14">
        <div class="text-center space-y-3">
          <div class="section-tag mx-auto">Cerita Bahagia</div>
          <h2 class="section-title">Apa Kata Mereka?</h2>
          <p class="text-secondary text-sm max-w-lg mx-auto">Ribuan pelanggan puas mempercayakan momen spesial mereka kepada kami.</p>
        </div>

        <TestimonialSlider :testimonials="testimonials" />

        <!-- Trust stat summary -->
        <div class="grid grid-cols-3 gap-6 max-w-lg mx-auto">
          <div v-for="stat in trustStats" :key="stat.label" class="text-center">
            <p class="text-2xl md:text-3xl font-black text-gradient">{{ stat.value }}</p>
            <p class="text-xs text-secondary font-medium mt-1">{{ stat.label }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ======= CTA SECTION (NEW) ======= -->
    <section class="section-wrapper py-16">
      <div class="rounded-[2rem] p-8 md:p-14 relative overflow-hidden bg-[var(--bg-card)] border border-[var(--border-color)] shadow-lg">
        <!-- Decorative circles -->
        <div class="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-rose-50 dark:bg-rose-950/20 pointer-events-none" />
        <div class="absolute -bottom-12 -left-12 w-48 h-48 rounded-full bg-rose-50 dark:bg-rose-950/10 pointer-events-none" />

        <div class="relative z-10 flex flex-col md:flex-row items-center gap-10">
          <div class="flex-1 space-y-5 text-center md:text-left">
            <div class="section-tag md:text-left mx-auto md:mx-0">Custom Order</div>
            <h2 class="section-title">Punya Konsep Sendiri?</h2>
            <p class="text-secondary text-sm leading-relaxed max-w-md mx-auto md:mx-0">
              Kami siap mewujudkan buket impianmu sesuai tema, warna, dan anggaran. Konsultasi gratis via WhatsApp!
            </p>
          </div>
          <div class="flex flex-col sm:flex-row gap-3 shrink-0">
            <a
              href="https://wa.me/6281234567890"
              target="_blank"
              class="btn-premium flex items-center gap-2.5"
            >
              <Icon name="ph:whatsapp-logo-fill" class="w-4.5 h-4.5" />
              Chat di WhatsApp
            </a>
            <NuxtLink
              to="/contact"
              class="btn-premium-outline flex items-center gap-2.5"
            >
              <Icon name="ph:envelope-fill" class="w-4.5 h-4.5" />
              Kirim Pesan
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup lang="ts">
// ===== SEO =====
useHead({
  title: 'HappyBouquet — Buket Premium Jakarta | Rangkaian Bunga Segar',
  meta: [
    { name: 'description', content: 'Toko buket bunga premium Jakarta. Buket wisuda, anniversary, birthday & custom order. Pengiriman hari ini! Order sebelum pukul 14.00.' },
    { property: 'og:title', content: 'HappyBouquet — Buket Premium Jakarta' },
    { property: 'og:description', content: 'Buket bunga premium hand-made, dikirim segar ke pintumu. Wisuda, Anniversary, Birthday, Custom Order.' },
    { property: 'og:type', content: 'website' },
    { property: 'og:locale', content: 'id_ID' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ]
})
const config = useRuntimeConfig()
const apiUrl = config.public.apiUrl

// ===== DUMMY FALLBACK DATA =====
const dummyBanners = [
  { imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1600&fit=crop', title: 'Rangkaian Bunga untuk Momen Istimewa', subtitle: 'Koleksi Terbaru 2026', link: '/products' },
  { imageUrl: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?q=80&w=1600&fit=crop', title: 'Buket Wisuda Premium — Dibuat dengan Cinta', subtitle: 'Special Graduation Season', link: '/products' },
  { imageUrl: 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?q=80&w=1600&fit=crop', title: 'Ucapkan Perasaanmu dengan Bunga Pilihan', subtitle: 'Anniversary & Birthday', link: '/products' },
]

const dummyCategories = [
  { name: 'Mawar', emoji: '🌹' },
  { name: 'Wisuda', emoji: '🎓' },
  { name: 'Snack', emoji: '🍫' },
  { name: 'Anniversary', emoji: '💍' },
  { name: 'Birthday', emoji: '🎂' },
  { name: 'Tulip', emoji: '🌷' },
  { name: 'Kering', emoji: '🍂' },
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

// ===== FETCH DYNAMIC DATA =====
const { data: bannersRes } = await useFetch<any>(`${apiUrl}/banners`)
const { data: categoriesRes } = await useFetch<any>(`${apiUrl}/categories`)
const { data: productsRes } = await useFetch<any>(`${apiUrl}/products?active=true`)

const heroBanners = computed(() => bannersRes.value?.data?.length ? bannersRes.value.data : dummyBanners)
const categories = computed(() => categoriesRes.value?.data?.length ? categoriesRes.value.data : dummyCategories)

const allProductsRaw = computed(() => {
  const apiData = productsRes.value?.data || []
  if (apiData.length === 0) return dummyProducts
  return apiData.map((p: any) => ({
    ...p,
    price: p.price ? Number(p.price) : 0,
    image: p.photo_url ? `${apiUrl.replace('/api', '')}${p.photo_url}` : 'https://images.unsplash.com/photo-1547096301-4ebda79e93d7?q=80',
    rating: 4.5,
    reviewCount: 0
  }))
})

const allProducts = computed(() => allProductsRaw.value)
const recoProducts = computed(() => allProductsRaw.value.slice(0, 6))
const flashSale = computed(() =>
  allProductsRaw.value.slice(0, 2).map((p: any) => ({
    ...p,
    original: new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(Number(p.price) * 1.3)
  }))
)

// ===== TESTIMONIALS =====
const testimonials = [
  { text: "Buketnya fresh dan cantik banget! Pengiriman juga tepat waktu. Pacarku suka banget!", name: "Rina Amelia", location: "Jakarta", avatar: "https://ui-avatars.com/api/?name=Rina+Amelia&background=f472b6&color=fff&size=80" },
  { text: "Pesan buket wisuda untuk adik, hasilnya rapi dan sesuai ekspektasi. Recommended!", name: "Dedi Setiawan", location: "Bandung", avatar: "https://ui-avatars.com/api/?name=Dedi+Setiawan&background=e11d48&color=fff&size=80" },
  { text: "Pelayanan ramah dan sangat membantu saat konsultasi buket custom. Hasilnya luar biasa!", name: "Siti Nurhaliza", location: "Surabaya", avatar: "https://ui-avatars.com/api/?name=Siti+Nurhaliza&background=f472b6&color=fff&size=80" },
]

// ===== TRUST BADGES =====
const trustBadges = [
  { icon: '🚚', title: 'Gratis Ongkir', text: 'Min. pembelian Rp 150.000', color: 'bg-blue-50 dark:bg-blue-950/30' },
  { icon: '🌸', title: 'Bunga Segar', text: 'Dipilih & dirancang tiap hari', color: 'bg-rose-50 dark:bg-rose-950/30' },
  { icon: '⚡', title: 'Kirim Hari Ini', text: 'Order sebelum pukul 14.00', color: 'bg-amber-50 dark:bg-amber-950/30' },
  { icon: '🔒', title: 'Pembayaran Aman', text: 'COD, Transfer & QRIS', color: 'bg-emerald-50 dark:bg-emerald-950/30' },
]

// ===== TRUST STATS =====
const trustStats = [
  { value: '500+', label: 'Pelanggan Puas' },
  { value: '4.9★', label: 'Rating Rata-rata' },
  { value: '2h', label: 'Estimasi Kirim' },
]

// ===== FLASH SALE REAL COUNTDOWN =====
// Target: end of today at 23:59:59
const getEndOfDay = () => {
  const now = new Date()
  now.setHours(23, 59, 59, 0)
  return now
}

const countdown = ref({ hours: 0, minutes: 0, seconds: 0 })

const updateCountdown = () => {
  const now = new Date()
  const end = getEndOfDay()
  const diff = Math.max(0, end.getTime() - now.getTime())

  const totalSeconds = Math.floor(diff / 1000)
  countdown.value = {
    hours: Math.floor(totalSeconds / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  }
}

const timerUnits = computed(() => [
  { label: 'Jam', value: countdown.value.hours },
  { label: 'Menit', value: countdown.value.minutes },
  { label: 'Detik', value: countdown.value.seconds },
])

let timerInterval: ReturnType<typeof setInterval> | null = null

onMounted(() => {
  updateCountdown()
  timerInterval = setInterval(updateCountdown, 1000)
})

onUnmounted(() => {
  if (timerInterval) clearInterval(timerInterval)
})

// ===== ACTIONS =====
const productModal = useProductModalStore()
const openQuickView = (product: any) => productModal.openModal(product)

const router = useRouter()
const goToCategory = (cat: any) => {
  if (!cat) return router.push('/products')
  router.push(`/category/${cat.id || cat.name}`)
}
</script>
