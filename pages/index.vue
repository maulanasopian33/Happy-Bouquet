<template>
  <div class="noir-home overflow-hidden">
    <!-- ======= 1. TOPBAR PROMO ======= -->
    <div class="border-b border-[var(--noir-line)] bg-[#171612]">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 py-1.5 flex flex-col md:flex-row items-center justify-between gap-2 text-sm">
        <div class="flex items-center gap-2 text-[var(--noir-champagne-dim)]">
          <span>{{ topbarPromoLabel }}:</span>
          <span class="label-crest px-2 py-0.5 rounded bg-[var(--noir-gold)]/20 border border-[var(--noir-gold)]/30">{{ topbarPromoCode }}</span>
        </div>
        <div class="hidden lg:flex items-center gap-4 text-[var(--noir-champagne-dim)]">
          <span class="flex items-center gap-1.5"><Icon name="ph:clock-bold" class="w-4 h-4 text-[var(--noir-gold)]" />Kirim Hari Ini (Order sebelum 14:00 WIB)</span>
          <span class="opacity-30 text-[var(--noir-gold)]">•</span>
          <span class="flex items-center gap-1.5"><Icon name="ph:truck-bold" class="w-4 h-4 text-[var(--noir-gold)]" />Gratis Ongkir Min. Rp 150rb</span>
        </div>
        <div class="flex items-center gap-4">
          <NuxtLink to="/tracking" class="flex items-center gap-1 text-[var(--noir-champagne-dim)] hover:text-[var(--noir-gold)] transition-colors">
            <Icon name="ph:package-bold" class="w-3.5 h-3.5 text-[var(--noir-gold)]" />Lacak Pesanan
          </NuxtLink>
          <span class="opacity-30">|</span>
          <a :href="waHref()" target="_blank" rel="noopener noreferrer" class="flex items-center gap-1 text-[var(--noir-champagne-dim)] hover:text-[var(--noir-gold)] transition-colors">
            <Icon name="ph:headset-bold" class="w-3.5 h-3.5 text-[var(--noir-gold)]" />Concierge WhatsApp
          </a>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6">
      <!-- ======= 2. HERO SLIDER ======= -->
      <section class="pt-3 pb-4">
        <HeroSlider :banners="heroBanners" />
      </section>

      <!-- ======= 3. VALUE PROPS ======= -->
      <section class="py-4">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div
            v-for="badge in trustBadges"
            :key="badge.title"
            class="noir-card p-4 flex items-start gap-3.5 hover:border-[var(--noir-gold)]/50 transition-colors"
          >
            <div class="w-11 h-11 rounded-xl bg-[var(--noir-gold)]/10 border border-[var(--noir-gold)]/30 text-[var(--noir-gold)] flex items-center justify-center shrink-0">
              <Icon :name="badge.icon" class="w-5 h-5" />
            </div>
            <div class="flex flex-col">
              <h3 class="font-bold text-sm text-[var(--noir-champagne)] leading-tight">{{ badge.title }}</h3>
              <p class="text-xs text-[var(--noir-champagne-dim)] leading-snug mt-0.5">{{ badge.text }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- ======= 4. FLASH SALE ======= -->
      <section class="py-4">
        <div class="noir-card p-6 lg:p-8 relative overflow-hidden">
          <div class="pointer-events-none absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-[var(--noir-gold)]/10 blur-3xl" />

          <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 relative z-10">
            <div>
              <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--noir-gold)]/20 border border-[var(--noir-gold)]/40 label-crest mb-2">
                <Icon name="ph:fire-fill" class="w-3.5 h-3.5" />
                Penawaran Terbatas Hari Ini
              </span>
              <h2 class="noir-display text-2xl text-[var(--noir-champagne)]">Flash Offer Spesial Hari Ini</h2>
              <p class="text-sm text-[var(--noir-champagne-dim)] mt-1">Koleksi buket eksklusif dengan harga istimewa, kuota slot terbatas harian.</p>
            </div>

            <!-- Countdown -->
            <div class="flex items-center gap-2">
              <div v-for="(unit, index) in timerUnits" :key="unit.label" class="flex items-center gap-2">
                <div class="flex flex-col items-center">
                  <div class="w-12 h-12 rounded-xl bg-[var(--noir-raised)] border border-[var(--noir-champagne-dim)]/40 text-[var(--noir-gold)] font-bold flex items-center justify-center tabular-nums">
                    {{ String(unit.value).padStart(2, '0') }}
                  </div>
                  <span class="label-crest !text-[10px] text-[var(--noir-champagne-dim)] mt-1">{{ unit.label }}</span>
                </div>
                <span v-if="index < timerUnits.length - 1" class="noir-display text-[var(--noir-gold)] text-xl mb-3">:</span>
              </div>
            </div>
          </div>

          <!-- 3 flash cards -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 relative z-10">
            <div
              v-for="product in flashSale"
              :key="product.id"
              class="rounded-2xl bg-[var(--noir-surface)] p-4 border border-[var(--noir-champagne-dim)]/30 hover:border-[var(--noir-gold)]/60 transition-all flex flex-col justify-between group"
            >
              <div>
                <div class="relative w-full aspect-square rounded-xl overflow-hidden mb-3 bg-[var(--noir-raised)]">
                  <NuxtImg
                    :src="product.image"
                    :alt="product.name"
                    class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    width="400"
                    height="400"
                    @error="onImgError"
                  />
                </div>
                <h3 class="noir-display text-base text-[var(--noir-champagne)] leading-tight group-hover:text-[var(--noir-gold)] transition-colors line-clamp-2">
                  {{ product.name }}
                </h3>
              </div>
              <div class="mt-4 pt-3 flex flex-col gap-2">
                <div class="w-full bg-[var(--noir-raised)] rounded-full h-1.5 overflow-hidden" role="progressbar" aria-label="Ketersediaan stok" aria-valuemin="0" aria-valuemax="100" :aria-valuenow="flashStockPercent(product)">
                  <div class="bg-[var(--noir-gold)] h-full rounded-full" :style="{ width: `${flashStockPercent(product)}%` }" />
                </div>
                <span class="price-gold text-base">{{ formatRupiah(product.price) }}</span>
                <NuxtLink :to="`/products/${product.slug}`" class="btn-gold w-full py-2.5 text-sm">
                  <Icon name="ph:shopping-bag-bold" class="w-4 h-4" />
                  Beli Sekarang
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ======= 5. KATEGORI ======= -->
      <section class="py-12">
        <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span class="label-crest">Jelajahi Koleksi</span>
            <h2 class="noir-display text-2xl mt-1 text-[var(--noir-champagne)]">Belanja Berdasarkan Kategori</h2>
          </div>
          <NuxtLink to="/products" class="text-sm font-semibold text-[var(--noir-gold)] hover:text-[var(--noir-gold-hover)] flex items-center gap-1 group/link shrink-0">
            Lihat Semua Kategori
            <Icon name="ph:arrow-right-bold" class="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
          </NuxtLink>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <button
            v-for="cat in categoryTiles"
            :key="cat.name"
            class="noir-card group flex flex-col items-center p-3 hover:border-[var(--noir-gold)]/60 transition-all text-center"
            @click="goToCategory(cat)"
          >
            <div class="w-full aspect-square rounded-xl overflow-hidden mb-3 bg-[var(--noir-raised)]">
              <NuxtImg
                v-if="cat.photo"
                :src="cat.photo"
                :alt="cat.name"
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                loading="lazy"
                width="300"
                height="300"
                @error="onImgError"
              />
              <div v-else class="w-full h-full flex items-center justify-center text-4xl">{{ cat.emoji || '🌸' }}</div>
            </div>
            <span class="text-sm font-bold text-[var(--noir-champagne)] group-hover:text-[var(--noir-gold)] transition-colors">{{ cat.name }}</span>
            <span class="text-[11px] text-[var(--noir-champagne-dim)] mt-0.5">{{ cat.count }} Rangkaian</span>
          </button>
        </div>
      </section>
    </div>

    <!-- ======= 6. BESTSELLER ======= -->
    <section class="bg-[var(--noir-surface)]/60 border-y border-[var(--noir-line)] py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6">
        <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
          <div>
            <span class="label-crest">Pilihan Kurator</span>
            <h2 class="noir-display text-2xl mt-1 text-[var(--noir-champagne)]">Rekomendasi Bunga Terlaris</h2>
            <p class="text-sm text-[var(--noir-champagne-dim)] mt-1">Koleksi terfavorit yang paling banyak membahagiakan penerima.</p>
          </div>
          <div class="flex flex-wrap items-center gap-2">
            <button
              v-for="chip in filterChips"
              :key="chip"
              class="px-4 py-2 text-sm transition-all"
              :class="activeChip === chip ? 'chip-noir chip-noir-active' : 'chip-noir'"
              @click="activeChip = chip"
            >
              {{ chip }}
            </button>
          </div>
        </div>

        <div v-if="filteredBestsellers.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <ProductCardNoir v-for="product in filteredBestsellers" :key="product.id" v-bind="product" />
        </div>
        <div v-else class="text-center py-12 text-sm text-[var(--noir-champagne-dim)]">
          Tidak ada produk pada kategori ini.
        </div>

        <div class="flex justify-center mt-12">
          <NuxtLink to="/products" class="btn-noir px-8 py-3.5 text-sm font-semibold">
            Lihat Semua Koleksi Lengkap
            <Icon name="ph:expand-more-bold" class="w-4 h-4 text-[var(--noir-gold)]" />
          </NuxtLink>
        </div>
      </div>
    </section>

    <div class="max-w-7xl mx-auto px-4 sm:px-6">
      <!-- ======= 7. CUSTOM ORDER ======= -->
      <section class="py-12">
        <div class="rounded-2xl bg-gradient-to-r from-[#18181a] via-[#1f1e1b] to-[#121214] border border-[var(--noir-gold)]/40 px-6 py-10 lg:px-12 lg:py-14 relative overflow-hidden shadow-2xl">
          <div class="pointer-events-none absolute -top-12 -right-12 w-96 h-96 rounded-full bg-[var(--noir-gold)]/15 blur-3xl" />
          <div class="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div class="lg:col-span-8 flex flex-col items-start gap-3">
              <span class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--noir-gold)]/15 border border-[var(--noir-gold)]/40">
                <Icon name="ph:paint-brush-bold" class="w-4 h-4 text-[var(--noir-gold)]" />
                <span class="label-crest">Bespoke Floral Artisan</span>
              </span>
              <h2 class="noir-display text-2xl text-[var(--noir-champagne)] tracking-tight">Punya Konsep Rangkaian Sendiri?</h2>
              <p class="text-[var(--noir-champagne-dim)] max-w-2xl leading-relaxed">
                Sesuaikan jenis bunga favorit, tema warna, hingga budget Anda bersama Floral Stylist kami secara gratis.
              </p>
            </div>
            <div class="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
              <a :href="waHref()" target="_blank" rel="noopener noreferrer" class="btn-gold px-6 py-3.5 text-sm">
                <Icon name="ph:whatsapp-logo-fill" class="w-5 h-5" />
                Chat Stylist via WhatsApp
              </a>
              <NuxtLink to="/contact" class="btn-noir px-6 py-3.5 text-sm">
                <Icon name="ph:envelope-simple-bold" class="w-5 h-5 text-[var(--noir-gold)]" />
                Kirim Pesan
              </NuxtLink>
            </div>
          </div>
        </div>
      </section>

      <!-- ======= 8. METRICS + TESTIMONI ======= -->
      <section class="py-12">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12 p-6 rounded-2xl bg-[var(--noir-card)] border border-[var(--noir-line)]">
          <div v-for="stat in trustStats" :key="stat.label" class="flex items-center gap-4 px-4 py-2">
            <div class="w-12 h-12 rounded-2xl bg-[var(--noir-gold)]/10 border border-[var(--noir-gold)]/30 text-[var(--noir-gold)] flex items-center justify-center shrink-0">
              <Icon :name="stat.icon" class="w-6 h-6" />
            </div>
            <div class="flex flex-col">
              <span class="noir-display text-xl font-bold text-[var(--noir-champagne)] leading-none">{{ stat.value }}</span>
              <span class="text-xs text-[var(--noir-champagne-dim)] mt-1">{{ stat.label }}</span>
            </div>
          </div>
        </div>

        <div class="text-center max-w-xl mx-auto mb-8">
          <span class="label-crest">Cerita Bahagia</span>
          <h2 class="noir-display text-2xl mt-1 text-[var(--noir-champagne)]">Momen Berharga yang Kami Rayakan Bersama</h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div
            v-for="t in testimonials"
            :key="t.name"
            class="noir-card p-6 hover:border-[var(--noir-gold)]/50 transition-all flex flex-col justify-between"
          >
            <div class="flex flex-col gap-3">
              <div class="flex items-center justify-between">
                <div class="flex text-[var(--noir-gold)]">
                  <Icon v-for="s in 5" :key="s" name="ph:star-fill" class="w-4 h-4" />
                </div>
                <span class="px-2.5 py-0.5 rounded-full bg-[var(--noir-gold)]/15 border border-[var(--noir-gold)]/30 text-[var(--noir-gold)] text-[11px] font-semibold">{{ t.tag }}</span>
              </div>
              <p class="text-sm italic leading-relaxed text-[var(--noir-champagne-dim)]">“{{ t.text }}”</p>
            </div>
            <div class="flex items-center gap-3 pt-4 mt-4 border-t border-[var(--noir-line)]">
              <div class="w-10 h-10 rounded-full bg-[var(--noir-gold)]/20 border border-[var(--noir-gold)]/40 text-[var(--noir-gold)] flex items-center justify-center font-bold text-xs">{{ t.initials }}</div>
              <div class="flex flex-col">
                <span class="text-sm font-bold text-[var(--noir-champagne)]">{{ t.name }}</span>
                <span class="text-[11px] text-[var(--noir-champagne-dim)]">{{ t.location }}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ======= 9. FAQ ======= -->
      <section class="py-12 pb-16">
        <div class="max-w-4xl mx-auto">
          <div class="text-center mb-8">
            <span class="label-crest">Bantuan &amp; Informasi</span>
            <h2 class="noir-display text-2xl mt-1 text-[var(--noir-champagne)]">Pertanyaan yang Sering Diajukan</h2>
            <p class="text-sm text-[var(--noir-champagne-dim)] mt-1">Hal yang perlu Anda ketahui soal pemesanan, pengiriman, dan perawatan buket.</p>
          </div>
          <div class="flex flex-col gap-3">
            <details
              v-for="faq in faqs"
              :key="faq.q"
              class="group noir-card p-5 cursor-pointer open:border-[var(--noir-gold)]/50 transition-all"
            >
              <summary class="flex items-center justify-between noir-display text-base text-[var(--noir-champagne)] select-none list-none cursor-pointer">
                <span>{{ faq.q }}</span>
                <Icon name="ph:caret-down-bold" class="w-5 h-5 shrink-0 text-[var(--noir-gold)] transition-transform group-open:rotate-180" />
              </summary>
              <p class="pt-3 text-sm text-[var(--noir-champagne-dim)] leading-relaxed">{{ faq.a }}</p>
            </details>
          </div>
        </div>
      </section>
    </div>
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
const { waHref } = useStoreSettings()
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

// ===== FETCH DYNAMIC DATA =====
const { data: bannersRes } = await useFetch<any>(`${apiUrl}/banners`)
const { data: categoriesRes } = await useFetch<any>(`${apiUrl}/categories`)
const { data: productsRes } = await useFetch<any>(`${apiUrl}/products?active=true`)
const { data: promosRes } = await useFetch<any>(`${apiUrl}/promos?active=true`)

// Topbar promo dinamis (fallback statis bila API kosong)
const topbarPromo = computed(() => promosRes.value?.data?.[0])
const topbarPromoLabel = computed(() => {
  const p = topbarPromo.value
  if (!p?.name) return 'Diskon Pengguna Baru 15%'
  const val = Number(p.value)
  return p.type === 'percentage' ? `${p.name} ${val}%` : `${p.name} Rp${val.toLocaleString('id-ID')}`
})
const topbarPromoCode = computed(() => topbarPromo.value?.code || 'GOLDNOIR')

const heroBanners = computed(() => bannersRes.value?.data?.length ? bannersRes.value.data : dummyBanners)
const categories = computed(() => categoriesRes.value?.data?.length ? categoriesRes.value.data : dummyCategories)

// Mapping lewat mapProduct (composables/useProducts.ts) — satu sumber, rating determinis
const allProductsRaw = computed(() =>
  (productsRes.value?.data || []).map((p: any) => mapProduct(p, apiUrl))
)

const flashSale = computed(() => allProductsRaw.value.slice(0, 3))
const bestsellers = computed(() => allProductsRaw.value.slice(0, 12))

// Stok flash sale determinis (bukan Math.random — anti hydration mismatch)
const flashStockPercent = (product: any) => 20 + ((product?.id ?? 0) % 40)

const formatRupiah = (val: number) =>
  new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(val || 0)

// Gambar produk gagal load -> default.png (hindari loop; target bisa null)
const onImgError = (e: Event) => {
  const t = e.target as HTMLImageElement | null
  if (t?.src && !t.src.endsWith('/default.png')) t.src = '/default.png'
}

// ===== KATEGORI: foto dari produk pertama per kategori =====
const categoryTiles = computed(() =>
  categories.value.slice(0, 6).map((cat: any) => {
    const name = cat.name || cat.NAME || ''
    const matching = allProductsRaw.value.filter((p: any) =>
      String(p.category || '').toLowerCase().includes(String(name).toLowerCase())
    )
    return {
      ...cat,
      name,
      count: matching.length,
      photo: matching[0]?.image || null,
    }
  })
)

// ===== FILTER BESTSELLER =====
const filterChips = ['Semua', 'Wisuda', 'Romantis', 'Birthday']
const activeChip = ref('Semua')

const chipPattern = (chip: string) => {
  switch (chip) {
    case 'Wisuda': return /wisuda|kelulusan/i
    case 'Romantis': return /mawar|romantis|anniversary|tulip|love/i
    case 'Birthday': return /birthday|ulang|snack|hampers/i
    default: return null
  }
}

const filteredBestsellers = computed(() => {
  const pattern = chipPattern(activeChip.value)
  if (!pattern) return bestsellers.value
  return bestsellers.value.filter((p: any) => pattern.test(String(p.category || '')))
})

// ===== TESTIMONI (statis, determinis) =====
const testimonials = [
  { text: 'Buket mawarnya luar biasa segar dan harum tahan sampai 6 hari di vas! Kartu wax seal-nya premium banget, istri saya sampai terharu.', name: 'Raka Aditya', location: 'Kebayoran Baru, Jakarta Selatan', initials: 'RA', tag: 'Anniversary ke-5' },
  { text: 'Pesan jam 10 pagi minta dikirim jam 13.00 ke Balairung UI, beneran sampai tepat waktu dengan bunga yang mekar sempurna. Kurir sangat sopan!', name: 'Siti Nurhaliza', location: 'Depok, Jawa Barat', initials: 'SN', tag: 'Wisuda Adik' },
  { text: 'Florist-nya ramah diajak konsultasi via WhatsApp. Warnanya disesuaikan sama dress wisuda pacar saya. Hasilnya artistik, bukan bunga pasaran.', name: 'Dedi Setiawan', location: 'Bandung Wetan, Bandung', initials: 'DS', tag: 'Custom Gift Box' },
]

// ===== VALUE PROPS =====
const trustBadges = [
  { icon: 'ph:flower-bold', title: '100% Bunga Segar Pilihan', text: 'Dipilih & dirancang ulang tiap hari.' },
  { icon: 'ph:bolt-bold', title: 'Kirim Hari Ini (Same Day)', text: 'Order sebelum 14:00 WIB, garansi sampai hari ini.' },
  { icon: 'ph:envelope-bold', title: 'Gratis Kartu Ucapan', text: 'Kartu custom tanpa biaya tambahan.' },
  { icon: 'ph:shield-check-bold', title: 'Garansi 100% Ganti Baru', text: 'Bunga layu saat diterima? Kami ganti baru.' },
]

// ===== TRUST STATS =====
const trustStats = [
  { value: '500+', label: 'Pelanggan Puas', icon: 'ph:flowers-bold' },
  { value: '4.9★', label: 'Rating Rata-rata', icon: 'ph:star-fill' },
  { value: '2h', label: 'Estimasi Kirim', icon: 'ph:clock-fill' },
]

// ===== FAQ (statis) =====
const faqs = [
  { q: 'Bagaimana cara merawat bunga agar tetap segar?', a: 'Potong batang miring 45 derajat setiap 2 hari, gunakan air bersih sejuk, dan hindari sinar matahari langsung atau hembusan AC secara konstan. Kami sertakan satu sachet nutrisi bunga gratis di setiap kemasan.' },
  { q: 'Apakah bisa meminta waktu pengiriman spesifik?', a: 'Bisa. Sampaikan slot waktu yang diinginkan saat pemesanan, atau hubungi Concierge WhatsApp kami untuk pengiriman di waktu menit-presisi pada event mendesak.' },
  { q: 'Bagaimana prosedur klaim garansi jika bunga layu saat diterima?', a: 'Kirimkan foto buket saat pertama tiba melalui WhatsApp dalam 3 jam setelah paket diterima. Tim kami akan merangkai buket pengganti dan mengirimkannya tanpa biaya.' },
  { q: 'Metode pembayaran apa saja yang didukung?', a: 'Kami menerima Transfer Bank, QRIS (GoPay, OVO, Dana, ShopeePay), serta COD (Bayar di Tempat) untuk area tertentu.' },
]

// ===== FLASH SALE COUNTDOWN (berakhir akhir hari) =====
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
const router = useRouter()
const goToCategory = (cat: any) => {
  if (!cat) return router.push('/products')
  router.push(`/category/${cat.id || cat.name}`)
}
</script>
