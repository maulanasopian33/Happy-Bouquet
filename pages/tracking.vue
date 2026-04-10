<template>
  <div class="min-h-screen bg-(--bg-main) transition-colors duration-500 pb-24">
    
    <!-- ======= HERO SECTION: SEARCH ======= -->
    <div class="section-wrapper py-20 lg:py-32 text-center space-y-10">
      <div class="reveal max-w-2xl mx-auto space-y-4">
        <div class="section-tag mx-auto">Real-time Tracking</div>
        <h1 class="section-title text-5xl md:text-6xl text-gradient">Lacak Pesanan Anda</h1>
        <p class="text-sm md:text-base text-secondary font-medium leading-relaxed">
          Masukkan ID Pesanan Anda untuk melihat status terbaru dan perjalanan buket bunga Anda secara real-time.
        </p>
      </div>

      <div class="reveal max-w-xl mx-auto px-4">
        <div class="card-premium p-1.5 flex items-center bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border-rose-100 shadow-2xl shadow-rose-500/10 rounded-3xl">
          <div class="pl-5 text-rose-500">
            <Icon name="ph:magnifying-glass-bold" class="w-5 h-5" />
          </div>
          <input 
            v-model="searchQuery" 
            type="text" 
            placeholder="Masukkan ID Pesanan (Cth: HB-9921)"
            class="flex-1 bg-transparent border-none focus:ring-0 text-primary font-black uppercase tracking-widest text-sm py-4 px-4 placeholder:text-muted placeholder:normal-case placeholder:font-medium"
            @keyup.enter="handleSearch"
          />
          <button 
            @click="handleSearch"
            class="btn-premium px-8 py-3.5 rounded-2xl shadow-lg shadow-rose-500/30"
          >
            Lacak
          </button>
        </div>
      </div>
    </div>

    <!-- ======= RESULT SECTION ======= -->
    <div class="section-wrapper">
      <div class="reveal max-w-4xl mx-auto">
        <!-- SUCCESS RESULT -->
        <Transition name="fade-slide" mode="out-in">
          <div v-if="foundOrder" :key="foundOrder.id" class="space-y-8">
            <div class="card-premium p-8 md:p-12 relative overflow-hidden group">
              <div class="absolute -top-12 -right-12 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl"></div>
              
              <div class="relative z-10 flex flex-col md:flex-row justify-between gap-10">
                <!-- Left: Summary -->
                <div class="space-y-8 flex-1">
                  <div class="flex items-center gap-5">
                    <div class="w-16 h-16 rounded-3xl bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 flex items-center justify-center shadow-inner">
                      <Icon name="ph:package-bold" class="w-8 h-8" />
                    </div>
                    <div>
                      <h3 class="text-2xl font-black text-primary tracking-tight">{{ foundOrder.id }}</h3>
                      <p class="text-xs font-bold text-muted uppercase tracking-widest">{{ foundOrder.date }} • {{ foundOrder.items }} Bouquet</p>
                    </div>
                  </div>

                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div class="p-5 bg-(--bg-section) rounded-3xl border border-(--border-color)">
                      <p class="text-[10px] font-black text-muted uppercase tracking-widest mb-1">Status Terakhir</p>
                      <p class="text-sm font-black text-emerald-600">{{ foundOrder.tracking.status }}</p>
                    </div>
                    <div class="p-5 bg-(--bg-section) rounded-3xl border border-(--border-color)">
                      <p class="text-[10px] font-black text-muted uppercase tracking-widest mb-1">Terakhir Diperbarui</p>
                      <p class="text-sm font-black text-primary">{{ foundOrder.tracking.updatedAt }}</p>
                    </div>
                  </div>
                </div>

                <!-- Right: Timeline -->
                <div class="w-full md:w-80 lg:w-96 border-t md:border-t-0 md:border-l border-dashed border-(--border-color) pt-10 md:pt-0 md:pl-10">
                   <h4 class="text-xs font-black text-primary uppercase tracking-widest flex items-center gap-2 mb-6">
                    <Icon name="ph:truck-bold" class="text-rose-600" />
                    Perjalanan Bunga Anda
                  </h4>
                  <OrderTimeline 
                    :status="foundOrder.tracking.status" 
                    :steps="foundOrder.tracking.steps" 
                  />
                </div>
              </div>
            </div>

            <!-- Additional Help Card -->
            <div class="card-premium p-6 bg-linear-to-r from-rose-500 to-rose-600 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl shadow-rose-500/30">
               <div class="flex items-center gap-4 text-center md:text-left">
                  <div class="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center">
                    <Icon name="ph:phone-call-fill" class="w-6 h-6" />
                  </div>
                  <div>
                    <h4 class="text-sm font-black uppercase tracking-tight">Butuh Bantuan Mendesak?</h4>
                    <p class="text-[11px] opacity-90 font-medium">Tim concierge kami siap membantu koordinasi dengan kurir.</p>
                  </div>
               </div>
               <button class="px-8 py-3 rounded-xl bg-white text-rose-600 text-xs font-black uppercase tracking-widest hover:bg-rose-50 transition-all active:scale-95 shadow-lg">Chat WhatsApp</button>
            </div>
          </div>

          <!-- NOT FOUND STATE -->
          <div v-else-if="hasSearched && !foundOrder" class="reveal py-20 text-center space-y-6 card-premium max-w-2xl mx-auto border-dashed border-rose-200">
            <div class="w-20 h-20 bg-rose-50 dark:bg-rose-950/30 rounded-full flex items-center justify-center mx-auto text-rose-300">
              <Icon name="ph:warning-circle-duotone" class="w-10 h-10" />
            </div>
            <div class="space-y-2">
              <h3 class="text-xl font-black text-primary">Pesanan Tidak Ditemukan</h3>
              <p class="text-sm text-secondary font-medium">Mohon periksa kembali ID Pesanan (biasanya dimulai dengan HB-). Jika Anda baru saja memesan, mungkin perlu waktu beberapa saat untuk masuk ke sistem kami.</p>
            </div>
          </div>
        </Transition>
      </div>
    </div>

    <!-- ======= RECOMMENDATIONS Section ======= -->
    <div class="section-wrapper mt-32 border-t border-(--border-color) pt-24 reveal">
       <div class="flex items-end justify-between mb-12">
         <div class="space-y-1">
           <div class="section-tag">Koleksi Terpopuler</div>
           <h2 class="section-title">Ingin Tambah Kebahagiaan?</h2>
         </div>
       </div>
       
       <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <ProductCard
            v-for="p in popularProducts"
            :key="p.id"
            v-bind="p"
            @view="onViewProduct"
          />
       </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import OrderTimeline from '~/components/account/OrderTimeline.vue'

const userStore = useUserStore()
const productModal = useProductModalStore()
const searchQuery = ref('')
const hasSearched = ref(false)
const foundOrder = ref<any>(null)

const handleSearch = () => {
  if (!searchQuery.value) return
  
  hasSearched.value = true
  const q = searchQuery.value.toUpperCase().trim()
  foundOrder.value = userStore.orders.find(o => o.id === q) || null
}

const onViewProduct = (product: any) => {
  productModal.openModal(product)
}

const popularProducts = [
  { id: 201, name: 'Crimson Velvet', price: 385000, image: 'https://images.unsplash.com/photo-1591886960571-74d43a19e16d?q=80&w=600&fit=crop', category: 'Romantic', rating: 4.9, reviewCount: 312, badge: 'Terlaris' },
  { id: 202, name: 'Ocean Mist', price: 295000, image: 'https://images.unsplash.com/photo-1596436889106-be35e843f974?q=80&w=600&fit=crop', category: 'Calm', rating: 4.8, reviewCount: 145 },
  { id: 203, name: 'Sun-Kissed Lily', price: 245000, image: 'https://images.unsplash.com/photo-1563201444-2c973aafa5f6?q=80&w=600&fit=crop', category: 'Cheerful', rating: 4.7, reviewCount: 92, badge: 'Hot' },
  { id: 204, name: 'White Serenity', price: 450000, image: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?q=80&w=600&fit=crop', category: 'Wedding', rating: 5.0, reviewCount: 67 },
]

useHead({
  title: 'Lacak Pesanan - HappyBouquet'
})
</script>

<style scoped>
.reveal {
  opacity: 0;
  animation: revealUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

@keyframes revealUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.5s ease;
}
.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(20px);
}
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
