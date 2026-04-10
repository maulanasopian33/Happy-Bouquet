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
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
        
        <!-- LEFT COLUMN: Gallery & Extra Info (8 cols) -->
        <div class="lg:col-span-7 xl:col-span-8 space-y-8">
          
          <!-- Product Title & Info -->
          <ProductInfo :product="product" />

          <!-- Product Gallery -->
          <div class="space-y-6">
            <ProductGallery 
              :images="product.images || [product.image]" 
              v-model="activeImage" 
              :product="product"
            />
          </div>

          <!-- Product Detailed Tabs/Description -->
          <div class="space-y-10">
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

            <div v-if="activeTab === 'Deskripsi'" class="reveal">
              <ProductDescription :description="product.description" />
            </div>
            
            <div v-else-if="activeTab === 'Spesifikasi'" class="reveal space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div v-for="v in product.variants" :key="v.id" class="flex items-center justify-between p-4 bg-(--bg-card) border border-(--border-color) rounded-2xl">
                  <span class="text-xs font-bold text-muted uppercase tracking-widest">{{ v.name }}</span>
                  <span class="text-sm font-black text-primary">{{ Array.isArray(v.options) ? v.options.map((o: any) => o.label).join(', ') : '' }}</span>
                </div>
              </div>
            </div>

            <div v-else class="reveal py-10 text-center space-y-4">
              <Icon name="ph:star-half-bold" class="w-12 h-12 text-rose-200 mx-auto" />
              <p class="text-muted text-sm font-medium">Belum ada ulasan untuk produk ini.</p>
            </div>
          </div>
        </div>

        <!-- RIGHT COLUMN: Purchase Box & Trust (4 cols) -->
        <aside class="lg:col-span-5 xl:col-span-4 space-y-8">
          <div class="lg:sticky lg:top-24 space-y-8">
            <!-- Main Purchase Box -->
            <ProductPriceBox
              :price="product.price"
              :originalPrice="product.originalPrice"
              :variants="product.variants"
              :stock="product.stock"
              @add-to-cart="onAddToCart"
              @buy-now="onBuyNow"
            />

            <!-- Brand Trust (Single Tenant Replacement for SellerInfo) -->
            <ProductTrustPromise />

            <!-- Payment Security -->
            <SecurePaymentCard />
          </div>
        </aside>

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
import ProductInfo from './ProductInfo.vue'
import ProductPriceBox from './ProductPriceBox.vue'
import ProductTrustPromise from './ProductTrustPromise.vue'
import SecurePaymentCard from './SecurePaymentCard.vue'
import ProductRelatedList from './ProductRelatedList.vue'
import ProductDescription from './ProductDescription.vue'
import StickyPurchaseBar from './StickyPurchaseBar.vue'

const props = defineProps<{ id: number }>()

// Fetching Logic
const { product, related, loading, error } = useProductDetail(computed(() => props.id))

const activeImage = ref(0)
const activeTab = ref('Deskripsi')

const onAddToCart = (payload: any) => {
  const cartStore = useCartStore()
  if (product.value) {
    // Map Product to CartItem structure
    const item = {
      ...product.value,
      name: product.value.title,
      quantity: payload.qty,
      variants: payload.selections
    }
    cartStore.addItem(item as any)
  }
}

const onBuyNow = (payload: any) => {
  console.log('Buy Now triggered', payload)
  // Logic buy now usually directly to checkout
}

// Update SEO Title
watch(
  () => product.value,
  (p) => {
    if (p) {
      useHead({ title: p.title })
    }
  },
  { immediate: true }
)
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.8s cubic-bezier(0.22, 1, 0.36, 1);
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>