<template>
  <div class="min-h-screen bg-(--bg-main) transition-colors duration-500 pb-24">
    
    <!-- ======= HEADER SECTION: PROFILE CARD ======= -->
    <div class="section-wrapper py-12 md:py-20 lg:pb-12">
      <div class="reveal card-premium p-8 md:p-12 relative overflow-hidden group">
        <!-- Decoration Background -->
        <div class="absolute -top-12 -right-12 w-64 h-64 bg-rose-500/5 rounded-full blur-3xl group-hover:bg-rose-500/10 transition-all duration-700"></div>
        <div class="absolute -bottom-12 -left-12 w-48 h-48 bg-rose-500/10 rounded-full blur-2xl"></div>

        <div class="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-8">
          <!-- Avatar Section -->
          <div class="relative shrink-0">
            <div class="w-24 h-24 md:w-32 md:h-32 rounded-4xl overflow-hidden border-4 border-white dark:border-slate-800 shadow-2xl shadow-rose-500/20 bg-(--bg-section)">
              <img :src="user.profile.avatar" :alt="user.profile.name" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">
            </div>
            <div class="absolute -bottom-2 -right-2 w-10 h-10 rounded-2xl bg-rose-600 text-white flex items-center justify-center border-4 border-white dark:border-slate-800 shadow-lg">
              <Icon name="ph:pencil-simple-bold" class="w-4 h-4" />
            </div>
          </div>

          <!-- Info Section -->
          <div class="flex-1 text-center md:text-left space-y-3">
            <div class="space-y-1">
              <div class="section-tag inline-flex">{{ user.profile.tier }}</div>
              <h1 class="text-3xl md:text-4xl font-black text-primary tracking-tight">{{ user.profile.name }}</h1>
              <p class="text-sm font-bold text-muted uppercase tracking-widest">{{ user.profile.email }}</p>
            </div>
            <div class="flex flex-wrap items-center justify-center md:justify-start gap-4 md:gap-8 pt-2">
              <div class="flex items-center gap-2">
                <Icon name="ph:calendar-check-fill" class="w-5 h-5 text-rose-500" />
                <span class="text-xs font-black text-secondary tracking-wide uppercase">Sejak {{ user.profile.memberSince }}</span>
              </div>
              <div class="flex items-center gap-2">
                <Icon name="ph:crown-fill" class="w-5 h-5 text-amber-500" />
                <span class="text-xs font-black text-secondary tracking-wide uppercase">Loyalty Points: {{ user.profile.points }}</span>
              </div>
            </div>
          </div>

          <!-- Actions -->
          <div class="flex flex-col items-center gap-3 pt-4 md:pt-0">
            <button class="btn-premium px-10 py-4 w-full md:w-auto rounded-2xl">Edit Profil</button>
            <button class="btn-premium-outline px-10 py-4 w-full md:w-auto rounded-2xl border-dashed border-rose-300">Keluar Sesi</button>
          </div>
        </div>
      </div>
    </div>

    <!-- ======= TABS NAVIGATION ======= -->
    <div class="section-wrapper mb-10">
      <div class="reveal flex items-center justify-center gap-2 sm:gap-4 bg-(--bg-card) p-1.5 rounded-3xl border border-(--border-color) shadow-sm w-fit mx-auto overflow-x-auto scroll-hide max-w-full">
        <button 
          v-for="tab in tabs" 
          :key="tab.id"
          @click="activeTab = tab.id"
          class="px-6 sm:px-8 py-3.5 text-[11px] font-black uppercase tracking-widest rounded-2xl transition-all duration-300 whitespace-nowrap flex items-center gap-2.5"
          :class="activeTab === tab.id ? 'bg-rose-600 text-white shadow-xl shadow-rose-500/20' : 'text-muted hover:text-rose-600 hover:bg-rose-50/50 dark:hover:bg-rose-950/20'"
        >
          <Icon :name="tab.icon" class="w-4 h-4" />
          {{ tab.label }}
        </button>
      </div>
    </div>

    <!-- ======= TABS CONTENT ======= -->
    <div class="section-wrapper">
      <div class="reveal max-w-5xl mx-auto space-y-12">
        
        <!-- ============ ORDERS TAB ============ -->
        <div v-if="activeTab === 'orders'" class="space-y-6">
          <div 
            v-for="order in user.orders" 
            :key="order.id" 
            class="card-premium p-6 md:p-8 group hover:border-rose-300 dark:hover:border-rose-900 transition-all cursor-pointer"
            @click="toggleOrderExpand(order.id)"
          >
            <div class="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div class="flex items-center gap-5">
                <div class="w-16 h-16 rounded-2xl bg-rose-50 dark:bg-rose-950/30 flex items-center justify-center text-rose-600 group-hover:scale-110 transition-transform duration-500">
                  <Icon name="ph:package-bold" class="w-8 h-8" />
                </div>
                <div class="space-y-1.5">
                  <div class="flex items-center gap-3">
                    <h3 class="text-lg font-black text-primary tracking-tight">{{ order.id }}</h3>
                    <span 
                      class="px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-wider"
                      :class="order.status === 'Diproses' ? 'bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-400' : 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400'"
                    >
                      {{ order.status }}
                    </span>
                  </div>
                  <p class="text-[10px] font-bold text-muted uppercase tracking-widest">{{ order.date }} • {{ order.items }} Bouquet</p>
                </div>
              </div>
              
              <div class="flex items-center justify-between md:justify-end gap-12 border-t md:border-t-0 border-dashed border-(--border-color) pt-6 md:pt-0">
                <div class="text-right">
                  <p class="text-[9px] font-bold text-muted uppercase tracking-widest leading-none mb-1.5">Investasi Kebahagiaan</p>
                  <p class="text-2xl font-black text-rose-600 tracking-tight transition-all group-hover:scale-110 transform origin-right">
                    {{ formatCurrency(order.total) }}
                  </p>
                </div>
                <button 
                  class="w-12 h-12 rounded-2xl bg-(--bg-section) border border-(--border-color) flex items-center justify-center text-secondary hover:text-rose-600 hover:border-rose-300 transition-all shadow-sm"
                  :class="expandedOrder === order.id ? 'rotate-90' : ''"
                >
                  <Icon name="ph:caret-right-bold" class="w-5 h-5" />
                </button>
              </div>
            </div>

            <!-- Expandable Content: Order Detail & Timeline -->
            <Transition
              enter-active-class="transition-all duration-500 ease-out"
              enter-from-class="max-h-0 opacity-0 overflow-hidden"
              enter-to-class="max-h-[1000px] opacity-100 mt-8 pt-8 border-t border-dashed border-(--border-color)"
              leave-active-class="transition-all duration-300 ease-in"
              leave-from-class="max-h-[1000px] opacity-100 mt-8 pt-8 border-t border-dashed border-(--border-color)"
              leave-to-class="max-h-0 opacity-0 overflow-hidden"
            >
              <div v-if="expandedOrder === order.id" class="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div class="space-y-6">
                  <h4 class="text-xs font-black text-primary uppercase tracking-widest flex items-center gap-2">
                    <Icon name="ph:map-pin-line-bold" class="text-rose-600" />
                    Detail Pengiriman
                  </h4>
                  <div v-if="order.tracking" class="p-6 bg-(--bg-section) rounded-3xl border border-(--border-color) space-y-4">
                    <template v-for="(step, i) in order.tracking.steps" :key="i">
                      <div v-if="step.isDone" class="flex gap-4">
                        <Icon name="ph:check-circle-fill" class="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <p class="text-xs font-medium text-secondary"><span class="font-black text-primary">{{ step.label }}</span>: {{ step.time }}</p>
                      </div>
                    </template>
                  </div>
                </div>
                <div>
                   <h4 class="text-xs font-black text-primary uppercase tracking-widest flex items-center gap-2 mb-4">
                    <Icon name="ph:truck-bold" class="text-rose-600" />
                    Progres Pesanan
                  </h4>
                  <OrderTimeline 
                    v-if="order.tracking"
                    :status="order.tracking.status" 
                    :steps="order.tracking.steps" 
                  />
                </div>
              </div>
            </Transition>
          </div>
        </div>

        <!-- ============ LOYALTY TAB ============ -->
        <div v-if="activeTab === 'loyalty'" class="space-y-10 reveal">
          <!-- Reward Cards Header -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
             <div class="card-premium p-8 bg-linear-to-br from-rose-500 to-rose-700 text-white flex flex-col items-center justify-center text-center space-y-4 shadow-xl shadow-rose-500/30">
               <div class="w-16 h-16 rounded-3xl bg-white/20 backdrop-blur-md flex items-center justify-center">
                 <Icon name="ph:crown-bold" class="w-8 h-8" />
               </div>
               <div>
                 <p class="text-[10px] font-black uppercase tracking-widest opacity-80 mb-1">Status Member</p>
                 <h3 class="text-2xl font-black">{{ user.profile.tier }}</h3>
               </div>
             </div>
             <div class="card-premium p-8 flex flex-col items-center justify-center text-center space-y-4 bg-white/50 border-rose-100">
               <div class="w-16 h-16 rounded-3xl bg-amber-50 dark:bg-amber-950/20 text-amber-600 flex items-center justify-center">
                 <Icon name="ph:lightning-bold" class="w-8 h-8" />
               </div>
               <div>
                 <p class="text-[10px] font-black uppercase tracking-widest text-muted mb-1">Total Poin</p>
                 <h3 class="text-2xl font-black text-primary tracking-tight tabular-nums">{{ user.profile.points }}</h3>
               </div>
               <p class="text-[10px] font-bold text-rose-500 uppercase">Dapatkan 500 poin lagi untuk Platinum</p>
             </div>
             <div class="card-premium p-8 flex flex-col items-center justify-center text-center space-y-4 bg-white/50 border-rose-100">
               <div class="w-16 h-16 rounded-3xl bg-rose-50 dark:bg-rose-950/20 text-rose-600 flex items-center justify-center">
                 <Icon name="ph:ticket-bold" class="w-8 h-8" />
               </div>
               <div>
                 <p class="text-[10px] font-black uppercase tracking-widest text-muted mb-1">Voucher Aktif</p>
                 <h3 class="text-2xl font-black text-primary tabular-nums">{{ user.vouchers.length }} Kupon</h3>
               </div>
               <p class="text-[10px] font-bold text-rose-500 uppercase">Tersedia per April 2026</p>
             </div>
          </div>

          <!-- Section: My Vouchers -->
          <div class="space-y-6">
            <h2 class="text-xl font-black text-primary tracking-tight border-b border-(--border-color) pb-4">Voucher & Penawaran Eksklusif</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
               <VoucherCard v-for="v in user.vouchers" :key="v.id" :voucher="v" />
            </div>
          </div>
        </div>

        <!-- ============ ADDRESS TAB ============ -->
        <div v-else-if="activeTab === 'addresses'" class="space-y-8 reveal">
          <div class="flex items-center justify-between border-b border-(--border-color) pb-6">
            <h2 class="text-xl font-black text-primary tracking-tight">Manajemen Alamat</h2>
            <button class="text-xs font-black text-rose-600 uppercase tracking-widest flex items-center gap-2 hover:gap-3 transition-all">
              Tambah Alamat Baru
              <Icon name="ph:plus-bold" />
            </button>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div 
              v-for="addr in user.addresses" 
              :key="addr.id" 
              class="card-premium p-8 relative group hover:border-rose-300 dark:hover:border-rose-900 transition-all cursor-pointer"
              :class="addr.isDefault ? 'border-rose-500 bg-rose-50/20 dark:bg-rose-950/20' : ''"
            >
              <div v-if="addr.isDefault" class="absolute top-6 right-6">
                 <span class="px-2.5 py-1 rounded-lg bg-rose-600 text-[8px] font-black text-white uppercase tracking-widest shadow-lg shadow-rose-500/30">Utama</span>
              </div>
              
              <div class="flex items-start gap-4">
                <div 
                  class="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
                  :class="addr.id === 1 ? 'bg-orange-50 dark:bg-orange-950/30 text-orange-600' : 'bg-blue-50 dark:bg-blue-950/30 text-blue-600'"
                >
                  <Icon :name="addr.id === 1 ? 'ph:house-line-bold' : 'ph:buildings-bold'" class="w-6 h-6" />
                </div>
                <div class="space-y-3">
                  <div>
                    <h3 class="text-sm font-black text-primary uppercase tracking-widest">{{ addr.label }}</h3>
                    <p class="text-xs font-bold text-secondary mt-1">{{ addr.receiver }} • {{ addr.phone }}</p>
                  </div>
                  <p class="text-xs leading-relaxed text-secondary font-medium">{{ addr.fullAddress }}</p>
                  
                  <div class="flex items-center gap-3 pt-2">
                    <button class="text-[10px] font-black text-rose-600 uppercase tracking-widest hover:underline">Edit</button>
                    <button v-if="!addr.isDefault" class="text-[10px] font-black text-muted uppercase tracking-widest hover:text-rose-600">Jadikan Utama</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- ============ SECURITY TAB ============ -->
        <div v-else-if="activeTab === 'security'" class="space-y-10 reveal">
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <!-- Left: Strength & Change Pass -->
            <div class="lg:col-span-5 space-y-8">
              <div class="card-premium p-8 space-y-8">
                <h3 class="text-lg font-black text-primary tracking-tight border-b border-(--border-color) pb-4">Status Keamanan</h3>
                
                <div class="space-y-4">
                  <div class="flex items-center justify-between">
                    <span class="text-xs font-black text-muted uppercase tracking-widest">Kekuatan Akun</span>
                    <span class="text-xs font-black text-emerald-500 tracking-widest uppercase">Sangat Kuat</span>
                  </div>
                  <div class="grid grid-cols-4 gap-1.5 h-1.5">
                    <div class="rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/20"></div>
                    <div class="rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/20"></div>
                    <div class="rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/20"></div>
                    <div class="rounded-full bg-slate-100 dark:bg-slate-800"></div>
                  </div>
                </div>

                <div class="space-y-4 pt-4">
                  <button class="btn-premium w-full py-4 rounded-2xl flex items-center justify-center gap-3">
                    <Icon name="ph:key-fill" class="w-4 h-4" />
                    Ganti Password
                  </button>
                  <p class="text-[10px] text-center font-bold text-muted uppercase tracking-widest">Diperbarui 3 bulan yang lalu</p>
                </div>
              </div>
            </div>

            <!-- Right: Log Sessions -->
            <div class="lg:col-span-7">
               <div class="card-premium p-8 space-y-8">
                 <h3 class="text-lg font-black text-primary tracking-tight border-b border-(--border-color) pb-4">Sesi Login Terakhir</h3>
                 <div class="space-y-6">
                    <div 
                      v-for="session in user.loginSessions" 
                      :key="session.id"
                      class="flex items-center justify-between gap-4 p-4 rounded-2xl hover:bg-(--bg-section) transition-all"
                    >
                      <div class="flex items-center gap-4">
                        <div class="w-10 h-10 rounded-xl bg-(--bg-section) border border-(--border-color) flex items-center justify-center text-secondary">
                          <Icon :name="session.device.includes('iPhone') ? 'ph:device-mobile-bold' : 'ph:desktop-bold'" class="w-5 h-5" />
                        </div>
                        <div>
                          <p class="text-xs font-black text-primary uppercase tracking-widest">{{ session.device }} • {{ session.browser }}</p>
                          <p class="text-[10px] font-bold text-muted uppercase tracking-widest leading-none mt-1">{{ session.location }} • {{ session.time }}</p>
                        </div>
                      </div>
                      <span v-if="session.isCurrent" class="text-[9px] font-black text-emerald-500 uppercase tracking-widest">Aktif</span>
                    </div>
                 </div>
                 <button class="w-full py-4 text-xs font-black text-rose-600 uppercase tracking-widest hover:bg-rose-50 dark:hover:bg-rose-950/20 rounded-2xl transition-all">Keluar dari semua perangkat</button>
               </div>
            </div>
          </div>
        </div>

        <!-- HELP & SUPPORT SECTION -->
        <SupportSection />

      </div>
    </div>
    
    <!-- RECOMMENDATIONS AT THE BOTTOM -->
    <div class="section-wrapper mt-24">
       <div class="reveal flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
         <div class="space-y-1">
           <div class="section-tag">Untuk Anda</div>
           <h2 class="section-title">Mungkin Anda Suka</h2>
         </div>
         <NuxtLink to="/products" class="text-xs font-black text-rose-600 flex items-center gap-2 group">
           Lihat Semua Koleksi
           <Icon name="ph:arrow-right-bold" class="group-hover:translate-x-1 transition-transform" />
         </NuxtLink>
       </div>
       
       <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 reveal">
          <ProductCard
            v-for="p in recommendedProducts"
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
import VoucherCard from '~/components/account/VoucherCard.vue'
import SupportSection from '~/components/account/SupportSection.vue'

const user = useUserStore()
const productModal = useProductModalStore()
const activeTab = ref('orders')
const expandedOrder = ref<string | null>(null)

const tabs = [
  { id: 'orders', label: 'Pesanan Saya', icon: 'ph:shopping-bag-bold' },
  { id: 'loyalty', label: 'Hadiah & Kupon', icon: 'ph:gift-bold' },
  { id: 'addresses', label: 'Alamat', icon: 'ph:map-pin-bold' },
  { id: 'security', label: 'Keamanan', icon: 'ph:shield-check-bold' },
]

const toggleOrderExpand = (id: string) => {
  expandedOrder.value = expandedOrder.value === id ? null : id
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(value)
}

const onViewProduct = (product: any) => {
  productModal.openModal(product)
}

const recommendedProducts = [
  { id: 101, name: 'Midnight Mystery', price: 345000, image: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?q=80&w=600&fit=crop', category: 'Luxury', rating: 4.9, reviewCount: 124, badge: 'Hot' },
  { id: 102, name: 'Golden Hour', price: 285000, image: 'https://images.unsplash.com/photo-1563201444-2c973aafa5f6?q=80&w=600&fit=crop', category: 'Birthday', rating: 4.8, reviewCount: 89 },
  { id: 103, name: 'Snow White Peonies', price: 420000, image: 'https://images.unsplash.com/photo-1596436889106-be35e843f974?q=80&w=600&fit=crop', category: 'Wedding', rating: 5.0, reviewCount: 56, badge: 'Terlaris' },
  { id: 104, name: 'Pastel Dream', price: 195000, image: 'https://images.unsplash.com/photo-1588691338766-3e051314e363?q=80&w=600&fit=crop', category: 'Cheerful', rating: 4.7, reviewCount: 231 },
]

useHead({
  title: 'Akun Saya - HappyBouquet'
})
</script>

<style scoped>
.scroll-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.scroll-hide::-webkit-scrollbar {
  display: none;
}

.reveal {
  opacity: 0;
  animation: revealUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

@keyframes revealUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Custom transitions for dark mode items */
.card-premium {
   transition-property: all;
   transition-duration: 500ms;
}
</style>
