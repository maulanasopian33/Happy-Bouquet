<template>
  <div class="space-y-12">
    <!-- ======= LOADING / ERROR STATES ======= -->
    <div v-if="loading" class="flex flex-col items-center justify-center py-32 space-y-4">
      <div class="w-12 h-12 border-4 border-rose-100 border-t-rose-600 rounded-full animate-spin"></div>
      <p class="text-sm font-bold text-muted uppercase tracking-widest">Menyiapkan Detail Produk...</p>
    </div>

    <div v-else-if="error" class="card-premium p-12 text-center space-y-6 max-w-2xl mx-auto">
      <div class="w-20 h-20 bg-rose-50 rounded-full flex items-center justify-center mx-auto text-rose-600">
        <Icon name="ph:warning-circle-bold" class="w-10 h-10" />
      </div>
      <div class="space-y-2">
        <h2 class="text-2xl font-black text-primary">Produk Tidak Ditemukan</h2>
        <p class="text-secondary text-sm">{{ error }}</p>
      </div>
      <NuxtLink to="/products" class="btn-premium inline-flex">Kembali ke Katalog</NuxtLink>
    </div>

    <!-- ======= PRODUCT CONTENT ======= -->
    <div v-else-if="product" class="animate-fade-in">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

        <!-- LEFT COLUMN: Botanical Visual Gallery (6 cols, mengikuti desain code.html) -->
        <div class="lg:col-span-6 flex flex-col gap-4">
          <ProductGallery
            :images="product.images || [product.image]"
            v-model="activeImage"
            :product="product"
          />

          <!-- Florist Guarantee Pill Box -->
          <div class="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-(--bg-section) border border-(--border-color) shadow-sm">
            <div v-for="g in guarantees" :key="g.title" class="flex flex-col items-center text-center gap-1">
              <Icon :name="g.icon" class="w-5.5 h-5.5 text-rose-600" />
              <span class="text-xs font-bold text-primary">{{ g.title }}</span>
              <span class="text-[11px] text-muted leading-tight">{{ g.desc }}</span>
            </div>
          </div>
        </div>

        <!-- RIGHT COLUMN: Purchase Engine -->
        <div class="lg:col-span-6 flex flex-col gap-6">
          <!-- Badges, SKU & Title -->
          <div class="flex flex-col gap-2">
            <div class="flex items-center gap-2 flex-wrap">
              <span class="px-2.5 py-1 rounded bg-rose-600 text-white text-xs font-black tracking-widest uppercase">
                {{ product.type === 'preorder' ? `Preorder ${product.preorderDuration || '-'}` : 'Ready Stock' }}
              </span>
              <span v-if="product.category" class="px-2.5 py-1 rounded bg-(--bg-section) text-secondary text-xs tracking-wider uppercase">
                {{ product.category }}
              </span>
              <span class="text-muted text-xs">• Kode: {{ product.slug }}</span>
            </div>

            <h1 class="text-3xl md:text-4xl lg:text-5xl font-black text-primary leading-tight mt-1">
              {{ product.name }}
            </h1>

            <p v-if="product.description" class="text-sm text-secondary leading-relaxed line-clamp-2">
              {{ product.description }}
            </p>

            <div v-if="product.reviewCount" class="flex items-center gap-1.5 py-1 text-sm">
              <div class="flex text-amber-400">
                <Icon v-for="s in 5" :key="s" name="ph:star-fill" class="w-4 h-4" />
              </div>
              <span class="font-bold text-primary">{{ product.rating }}</span>
              <span class="text-muted">({{ product.reviewCount }} Ulasan)</span>
            </div>
          </div>

          <!-- Price Display Card -->
          <div class="p-4 rounded-2xl bg-(--bg-section) border border-(--border-color) flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div class="flex flex-col">
              <div class="flex items-baseline gap-3">
                <span class="text-3xl md:text-4xl font-black text-rose-600 tracking-tight">{{ formatPrice(product.price) }}</span>
                <span v-if="product.originalPrice" class="text-lg text-muted line-through">{{ formatPrice(product.originalPrice) }}</span>
              </div>
              <p v-if="discountPercentage" class="text-xs font-black text-rose-600 mt-1">
                Hemat {{ formatPrice(product.originalPrice! - product.price) }} ({{ discountPercentage }}%)
              </p>
            </div>
            <div class="text-left sm:text-right flex sm:flex-col items-center sm:items-end gap-1">
              <span class="text-xs text-primary uppercase tracking-widest font-bold flex items-center gap-1">
                <Icon name="ph:shield-check-fill" class="w-4 h-4" /> Pembayaran Aman
              </span>
              <span class="text-xs text-muted">Harga termasuk PPN</span>
            </div>
          </div>

          <!-- Quantity & Purchase CTAs -->
          <ProductPriceBox
            :price="product.price"
            :originalPrice="product.originalPrice"
            :variants="product.variants"
            :stock="product.stock"
            @add-to-cart="onAddToCart"
            @buy-now="onBuyNow"
          />

          <!-- Channel Strip: WhatsApp + marketplace (dari orderChannels API) -->
          <div class="card-premium p-6 space-y-3">
            <h3 class="text-xs font-black uppercase tracking-widest text-primary">Pesan Juga Melalui</h3>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a
                :href="waHref(`Halo ${settings.brand_name}, saya tertarik dengan ${product.name}. Boleh info lanjut?`)"
                target="_blank"
                rel="noopener noreferrer"
                @click="trackChannelOutbound('WhatsApp', product.id)"
                class="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#25D366]/15 hover:bg-[#25D366]/25 text-[#25D366] text-xs font-black uppercase tracking-wider transition-colors"
              >
                <Icon name="ph:whatsapp-logo-fill" class="w-4.5 h-4.5" />
                Konsultasi WhatsApp
              </a>
              <a
                v-for="ch in marketplaceChannels"
                :key="ch.name"
                :href="ch.storeUrl"
                target="_blank"
                rel="noopener noreferrer"
                @click="trackChannelOutbound(ch.name, product.id)"
                class="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-(--bg-section) hover:bg-(--bg-main) text-primary text-xs font-black uppercase tracking-wider transition-colors border border-(--border-color)"
              >
                <Icon :name="ch.icon" class="w-4.5 h-4.5" />
                Beli di {{ ch.name }}
              </a>
            </div>
          </div>

          <!-- Brand Trust -->
          <ProductTrustPromise />

          <!-- Payment Security -->
          <SecurePaymentCard />
        </div>
      </div>

      <!-- ======= DESCRIPTION / SPECS / REVIEWS TABS ======= -->
      <div class="mt-16 md:mt-24 space-y-8">
        <div class="flex items-center gap-6 border-b border-(--border-color) overflow-x-auto scroll-hide">
          <button
            v-for="tab in ['Deskripsi', 'Spesifikasi', 'Ulasan']"
            :key="tab"
            class="pb-4 text-sm font-black uppercase tracking-widest transition-all relative shrink-0"
            :class="activeTab === tab ? 'text-rose-600' : 'text-muted hover:text-primary'"
            @click="activeTab = tab"
          >
            {{ tab }}
            <div v-if="activeTab === tab" class="absolute bottom-0 left-0 right-0 h-1 bg-rose-600 rounded-full" />
          </button>
        </div>

        <div v-if="activeTab === 'Deskripsi'">
          <ProductDescription :description="product.description" />
        </div>

        <div v-else-if="activeTab === 'Spesifikasi'" class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div v-for="s in specs" :key="s.label" class="flex items-center justify-between p-4 bg-(--bg-card) border border-(--border-color) rounded-2xl">
            <span class="text-xs font-bold text-muted uppercase tracking-widest">{{ s.label }}</span>
            <span class="text-sm font-black text-primary">{{ s.value }}</span>
          </div>
        </div>

        <div v-else class="py-10 text-center space-y-4">
          <Icon name="ph:star-half-bold" class="w-12 h-12 text-rose-200 mx-auto" />
          <p class="text-muted text-sm font-medium">Belum ada ulasan untuk produk ini.</p>
        </div>
      </div>

      <!-- ======= RELATED PRODUCTS ======= -->
      <section class="mt-24 space-y-10">
        <div class="flex items-end justify-between">
          <div class="space-y-1">
            <div class="section-tag">Rekomendasi</div>
            <h2 class="section-title">Produk Terkait</h2>
          </div>
          <NuxtLink to="/products" class="text-xs font-black text-rose-600 flex items-center gap-2 hover:gap-3 transition-all">
            Lihat Koleksi
            <Icon name="ph:arrow-right-bold" />
          </NuxtLink>
        </div>

        <ProductRelatedList :items="related" />
      </section>
    </div>

    <!-- Mobile Sticky Purchase Bar -->
    <StickyPurchaseBar
      v-if="product"
      :price="product.price"
      @buy-now="onBuyNow"
    />

  </div>
</template>

<script setup lang="ts">
import ProductGallery from './ProductGallery.vue'
import ProductPriceBox from './ProductPriceBox.vue'
import ProductTrustPromise from './ProductTrustPromise.vue'
import SecurePaymentCard from './SecurePaymentCard.vue'
import ProductRelatedList from './ProductRelatedList.vue'
import ProductDescription from './ProductDescription.vue'
import StickyPurchaseBar from './StickyPurchaseBar.vue'
import type { Product } from '~/composables/useProducts'

// Data produk diterima dari halaman (pages/products/[slug].vue) sebagai pemilik
// tunggal fetch useProductDetail — kalau komponen ini juga memanggil, useAsyncData
// jalan 2× per render (dedupe 'cancel' = fetch pertama dibatalkan percuma).
const props = defineProps<{
  product: Product | null
  related: Product[]
  loading: boolean
  error: string | null
}>()

const { settings, waHref } = useStoreSettings()
const { trackChannelOutbound, trackAction } = useAnalytics()

const activeImage = ref(0)
const activeTab = ref('Deskripsi')

// Marketplace dari orderChannels API — hanya tampil jika store_url terisi
const marketplaceChannels = computed(() =>
  (props.product?.orderChannels || [])
    .filter((c: any) => c?.is_active && c?.name !== 'WhatsApp' && c?.ProductOrderChannel?.store_url)
    .map((c: any) => ({
      name: c.name,
      storeUrl: c.ProductOrderChannel.store_url,
      icon: c.name === 'Shopee' ? 'ph:storefront-fill' : c.name === 'TikTok' ? 'ph:tiktok-logo-fill' : 'ph:shopping-bag-fill',
    }))
)

const guarantees = [
  { icon: 'ph:seal-check-fill', title: '100% Bunga Segar', desc: 'Kualitas Grade Premium' },
  { icon: 'ph:camera-fill', title: 'Foto Real-Time', desc: 'Preview via WA Sebelum Kirim' },
  { icon: 'ph:shield-check-fill', title: 'Garansi Sampai', desc: 'Ganti Baru Jika Rusak' },
]

const specs = computed(() => {
  const p = props.product
  if (!p) return []
  const list = [
    { label: 'Kode Produk', value: p.slug },
    { label: 'Kategori', value: p.category || '-' },
    { label: 'Tipe', value: p.type === 'preorder' ? `Preorder ${p.preorderDuration || '-'} hari` : 'Ready Stock' },
    { label: 'Harga', value: formatPrice(p.price) },
  ]
  for (const v of p.variants || []) {
    list.push({
      label: v.name,
      value: Array.isArray(v.options) ? v.options.map((o: any) => o.label).join(', ') : '-',
    })
  }
  return list
})

const formatPrice = (v: number) =>
  new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(v)

const discountPercentage = computed(() => {
  const p = props.product
  if (!p?.originalPrice || !p.price) return null
  return Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100)
})

const router = useRouter()

const addToCart = (payload: any) => {
  const cartStore = useCartStore()
  if (props.product) {
    const item = {
      ...props.product,
      name: props.product.name,
      quantity: payload?.qty || 1,
      variants: payload?.selections
    }
    cartStore.addItem(item as any)
    trackAction('add_to_cart', {
      product_id: props.product.id,
      name: props.product.name,
      price: props.product.price,
      quantity: payload?.qty || 1
    })
  }
}

const onAddToCart = (payload: any) => addToCart(payload)

// Beli Sekarang: masukkan ke keranjang lalu langsung ke checkout (order channel Web)
const onBuyNow = (payload: any) => {
  addToCart(payload)
  router.push('/checkout')
}

// SEO title reaktif — useHead di dalam callback watch memicu
// "[nuxt] instance unavailable" saat instance sudah hancur
useHead({ title: computed(() => props.product?.name || 'Detail Produk') })
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.8s cubic-bezier(0.22, 1, 0.36, 1);
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.scroll-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.scroll-hide::-webkit-scrollbar {
  display: none;
}
</style>
