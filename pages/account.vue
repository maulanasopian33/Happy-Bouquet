<template>
  <div class="min-h-screen bg-(--bg-main) transition-colors duration-500 pb-24">
    
    <!-- ======= TITLE SECTION ======= -->
    <div class="section-wrapper pt-8 lg:pt-16 pb-6">
      <div class="reveal max-w-7xl mx-auto">
         <h1 class="text-3xl md:text-4xl lg:text-5xl font-black text-primary tracking-tight">Akun Saya</h1>
         <p class="text-xs md:text-sm text-secondary font-medium mt-2">Kelola pesanan, alamat, dan preferensi profil Anda.</p>
      </div>
    </div>

    <!-- ======= DASHBOARD GRID ======= -->
    <div class="section-wrapper">
      <div class="reveal max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        
        <!-- ==================== SIDEBAR ==================== -->
        <div class="lg:col-span-3 space-y-6 lg:sticky lg:top-24 h-fit">
           <!-- Profile Card Mini -->
           <div class="card-premium p-6 flex items-center lg:flex-col gap-4 lg:text-center">
             <div class="relative shrink-0">
               <div class="w-16 h-16 lg:w-24 lg:h-24 rounded-full overflow-hidden border-2 border-white dark:border-slate-800 shadow-md">
                 <img :src="user.profile.avatar" :alt="user.profile.name" class="w-full h-full object-cover">
               </div>
               <button class="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-rose-600 text-white flex items-center justify-center border-2 border-white dark:border-slate-800 hover:bg-rose-700 transition-colors shadow-sm">
                 <Icon name="ph:pencil-simple-bold" class="w-3.5 h-3.5" />
               </button>
             </div>
             <div class="flex-1">
               <h2 class="text-lg lg:text-xl font-black text-primary tracking-tight">{{ user.profile.name }}</h2>
               <p class="text-xs font-bold text-muted mt-0.5">{{ user.profile.email }}</p>
               <div class="mt-2 inline-flex px-2 py-0.5 rounded-md bg-amber-50 dark:bg-amber-950/30 text-amber-600 text-[10px] font-black uppercase tracking-widest border border-amber-200 dark:border-amber-900/50">
                 {{ user.profile.tier }} Member
               </div>
             </div>
           </div>

           <!-- Navigation Menu -->
           <div class="bg-(--bg-main) lg:bg-transparent -mx-4 px-4 lg:mx-0 lg:px-0 sticky top-[60px] md:top-[70px] lg:static z-30 py-3 lg:py-0 border-b border-(--border-color) lg:border-none shadow-sm lg:shadow-none">
             <div class="flex lg:flex-col gap-2.5 overflow-x-auto lg:overflow-visible scroll-hide">
                <button 
                  v-for="tab in tabs" 
                  :key="tab.id"
                  @click="activeTab = tab.id"
                  class="shrink-0 lg:w-full px-5 py-3 lg:py-4 text-xs font-black uppercase tracking-widest rounded-xl lg:rounded-2xl transition-all duration-300 flex items-center gap-3"
                  :class="activeTab === tab.id 
                    ? 'bg-rose-600 lg:bg-rose-50 lg:dark:bg-rose-950/30 text-white lg:text-rose-600 shadow-md lg:shadow-none lg:border lg:border-rose-200 lg:dark:border-rose-900/40' 
                    : 'bg-(--bg-card) lg:bg-transparent text-secondary border border-(--border-color) lg:border-transparent hover:text-rose-600 lg:hover:bg-(--bg-section)'"
                >
                  <Icon :name="tab.icon" class="w-4.5 h-4.5 lg:w-5 lg:h-5" />
                  {{ tab.label }}
                  <Icon v-if="activeTab === tab.id" name="ph:caret-right-bold" class="hidden lg:block w-4 h-4 ml-auto" />
                </button>
                <div class="hidden lg:block h-px bg-(--border-color) my-2 w-full"></div>
                <button class="shrink-0 lg:w-full px-5 py-3 lg:py-4 text-xs font-black uppercase tracking-widest rounded-xl lg:rounded-2xl transition-all duration-300 flex items-center gap-3 bg-(--bg-card) lg:bg-transparent text-red-500 border border-(--border-color) lg:border-transparent hover:bg-red-50 dark:hover:bg-red-950/20 lg:mt-2">
                  <Icon name="ph:sign-out-bold" class="w-4.5 h-4.5 lg:w-5 lg:h-5" />
                  Keluar Sesi
                </button>
             </div>
           </div>
        </div>

        <!-- ==================== MAIN CONTENT AREA ==================== -->
        <div class="lg:col-span-9">
          
          <!-- ============ ORDERS TAB ============ -->
          <Transition name="fade" mode="out-in">
            <div v-if="activeTab === 'orders'" class="space-y-6">
              <h2 class="text-xl font-black text-primary tracking-tight mb-6 hidden lg:block border-b border-(--border-color) pb-4">Pesanan Saya</h2>
              
              <div 
                v-for="order in user.orders" 
                :key="order.id" 
                class="card-premium p-6 group hover:border-rose-300 dark:hover:border-rose-900 transition-all cursor-pointer"
                @click="toggleOrderExpand(order.id)"
              >
                <!-- Receipt Header -->
                <div class="flex items-center justify-between border-b border-dashed border-(--border-color) pb-4 mb-4">
                  <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-xl bg-(--bg-section) flex items-center justify-center text-secondary">
                      <Icon name="ph:shopping-bag-bold" class="w-5 h-5" />
                    </div>
                    <div>
                      <p class="text-xs font-bold text-muted uppercase tracking-widest">No. Pesanan</p>
                      <h3 class="text-sm font-black text-primary tracking-tight">{{ order.id }}</h3>
                    </div>
                  </div>
                  <div class="text-right">
                    <span 
                      class="px-3 py-1 rounded-lg text-xs font-black uppercase tracking-wider shadow-sm"
                      :class="order.status === 'Diproses' ? 'bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800' : 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800'"
                    >
                      {{ order.status }}
                    </span>
                  </div>
                </div>

                <!-- Receipt Body -->
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                  <div>
                    <p class="text-xs font-bold text-muted uppercase tracking-widest mb-1">Tanggal & Total Item</p>
                    <p class="text-sm font-bold text-primary">{{ order.date }} <span class="text-muted mx-1">•</span> {{ order.items }} Buket</p>
                  </div>
                  
                  <div class="flex items-center justify-between sm:justify-end gap-6">
                    <div class="text-left sm:text-right">
                      <p class="text-xs font-bold text-muted uppercase tracking-widest mb-1">Total Belanja</p>
                      <p class="text-lg font-black text-rose-600 tracking-tight">
                        {{ formatCurrency(order.total) }}
                      </p>
                    </div>
                    <button 
                      class="w-10 h-10 rounded-xl bg-(--bg-section) border border-(--border-color) flex items-center justify-center text-secondary group-hover:bg-rose-50 group-hover:text-rose-600 group-hover:border-rose-200 transition-all"
                      :class="expandedOrder === order.id ? 'rotate-90 bg-rose-50 text-rose-600 border-rose-200' : ''"
                    >
                      <Icon name="ph:caret-right-bold" class="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <!-- Expandable Content: Tracking -->
                <div 
                  class="grid transition-all duration-500 ease-in-out"
                  :class="expandedOrder === order.id ? 'grid-rows-[1fr] opacity-100 mt-6 pt-6 border-t border-dashed border-(--border-color)' : 'grid-rows-[0fr] opacity-0'"
                >
                  <div class="overflow-hidden">
                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      <div class="space-y-4">
                        <h4 class="text-xs font-black text-primary uppercase tracking-widest flex items-center gap-2">
                          <Icon name="ph:map-pin-line-bold" class="text-rose-600 w-4 h-4" />
                          Alamat Pengiriman
                        </h4>
                        <div v-if="order.tracking" class="p-4 bg-(--bg-section) rounded-2xl border border-(--border-color) space-y-3">
                          <template v-for="(step, i) in order.tracking.steps" :key="i">
                            <div v-if="step.isDone" class="flex gap-3">
                              <Icon name="ph:check-circle-fill" class="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                              <p class="text-xs font-medium text-secondary leading-snug"><strong class="font-black text-primary">{{ step.label }}</strong><br>{{ step.time }}</p>
                            </div>
                          </template>
                        </div>
                      </div>
                      <div>
                         <h4 class="text-xs font-black text-primary uppercase tracking-widest flex items-center gap-2 mb-4">
                          <Icon name="ph:truck-bold" class="text-rose-600 w-4 h-4" />
                          Status Tracking
                        </h4>
                        <OrderTimeline 
                          v-if="order.tracking"
                          :status="order.tracking.status" 
                          :steps="order.tracking.steps" 
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- ============ LOYALTY TAB ============ -->
            <div v-else-if="activeTab === 'loyalty'" class="space-y-8">
              <h2 class="text-xl font-black text-primary tracking-tight mb-6 hidden lg:block border-b border-(--border-color) pb-4">Hadiah & Kupon</h2>
              
              <!-- Reward Stats -->
              <div class="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6">
                 <!-- Poin Card -->
                 <div class="col-span-2 md:col-span-1 card-premium p-6 bg-linear-to-br from-rose-500 to-rose-700 text-white flex flex-col justify-center space-y-4 shadow-xl shadow-rose-500/20">
                   <div class="flex items-center justify-between">
                     <div class="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center">
                       <Icon name="ph:sparkle-bold" class="w-6 h-6 text-rose-100" />
                     </div>
                     <Icon name="ph:info-bold" class="w-5 h-5 opacity-60 hover:opacity-100 cursor-pointer transition-opacity" />
                   </div>
                   <div>
                     <p class="text-xs font-black uppercase tracking-widest opacity-80 mb-1">Total Poin</p>
                     <h3 class="text-3xl font-black tracking-tight tabular-nums">{{ user.profile.points }}</h3>
                   </div>
                   <div class="w-full bg-white/20 h-1.5 rounded-full overflow-hidden">
                     <div class="bg-white w-3/4 h-full rounded-full"></div>
                   </div>
                   <p class="text-[10px] font-bold text-rose-100 uppercase tracking-widest">500 poin menuju Platinum</p>
                 </div>

                 <!-- Stats Cards -->
                 <div class="card-premium p-6 flex flex-col justify-center space-y-4 bg-(--bg-card)">
                   <div class="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 flex items-center justify-center">
                     <Icon name="ph:money-bold" class="w-5 h-5" />
                   </div>
                   <div>
                     <p class="text-[10px] font-black uppercase tracking-widest text-muted mb-1">Total Hemat</p>
                     <h3 class="text-lg font-black text-primary tracking-tight tabular-nums">Rp 125.000</h3>
                   </div>
                 </div>

                 <div class="card-premium p-6 flex flex-col justify-center space-y-4 bg-(--bg-card)">
                   <div class="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/30 text-amber-600 flex items-center justify-center">
                     <Icon name="ph:ticket-bold" class="w-5 h-5" />
                   </div>
                   <div>
                     <p class="text-[10px] font-black uppercase tracking-widest text-muted mb-1">Kupon Aktif</p>
                     <h3 class="text-lg font-black text-primary tracking-tight tabular-nums">{{ user.vouchers.length }} Kupon</h3>
                   </div>
                 </div>
              </div>

              <!-- Vouchers Grid -->
              <div class="space-y-6 pt-4">
                <h3 class="text-sm font-black text-primary uppercase tracking-widest">Kupon Tersedia</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <VoucherCard v-for="v in user.vouchers" :key="v.id" :voucher="v" />
                </div>
              </div>
            </div>

            <!-- ============ ADDRESS TAB ============ -->
            <div v-else-if="activeTab === 'addresses'" class="space-y-6">
              <div class="flex items-center justify-between border-b border-(--border-color) pb-4 mb-6">
                <h2 class="text-xl font-black text-primary tracking-tight hidden lg:block">Buku Alamat</h2>
                <button class="w-full lg:w-auto px-6 py-3 text-xs font-black text-white bg-rose-600 hover:bg-rose-700 uppercase tracking-widest flex items-center justify-center gap-2 rounded-xl transition-colors shadow-sm">
                  <Icon name="ph:plus-bold" class="w-4 h-4" />
                  Tambah Alamat
                </button>
              </div>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div 
                  v-for="addr in user.addresses" 
                  :key="addr.id" 
                  class="card-premium p-6 relative group hover:border-rose-300 dark:hover:border-rose-900 transition-all cursor-pointer flex flex-col"
                  :class="addr.isDefault ? 'border-rose-400 bg-rose-50/20 dark:bg-rose-950/10 shadow-rose-500/10' : ''"
                >
                  <div v-if="addr.isDefault" class="absolute top-5 right-5">
                     <span class="px-2.5 py-1 rounded-lg bg-rose-600 text-[10px] font-black text-white uppercase tracking-widest shadow-sm">Utama</span>
                  </div>
                  
                  <div class="flex items-center gap-3 mb-4">
                    <div 
                      class="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-sm border border-white dark:border-slate-800"
                      :class="addr.id === 1 ? 'bg-orange-500 text-white' : 'bg-blue-500 text-white'"
                    >
                      <Icon :name="addr.id === 1 ? 'ph:house-line-bold' : 'ph:buildings-bold'" class="w-5 h-5" />
                    </div>
                    <div>
                      <h3 class="text-sm font-black text-primary uppercase tracking-widest">{{ addr.label }}</h3>
                      <p class="text-xs font-bold text-secondary mt-0.5">{{ addr.receiver }}</p>
                    </div>
                  </div>
                  
                  <div class="flex-1 space-y-2 mb-6">
                    <p class="text-xs font-bold text-muted">{{ addr.phone }}</p>
                    <p class="text-xs leading-relaxed text-secondary font-medium">{{ addr.fullAddress }}</p>
                  </div>
                  
                  <div class="grid grid-cols-2 gap-3 mt-auto border-t border-(--border-color) pt-4">
                    <button class="w-full py-2 text-xs font-black text-primary uppercase tracking-widest rounded-lg hover:bg-(--bg-section) transition-colors border border-(--border-color)">Edit</button>
                    <button v-if="!addr.isDefault" class="w-full py-2 text-xs font-black text-rose-600 uppercase tracking-widest rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors border border-rose-200 dark:border-rose-900/50">Jadikan Utama</button>
                  </div>
                </div>
              </div>
            </div>

            <!-- ============ SECURITY TAB ============ -->
            <div v-else-if="activeTab === 'security'" class="space-y-6">
              <h2 class="text-xl font-black text-primary tracking-tight mb-6 hidden lg:block border-b border-(--border-color) pb-4">Keamanan Akun</h2>
              
              <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <!-- Change Password -->
                <div class="card-premium p-6 space-y-6 h-fit">
                  <div class="flex items-center gap-3 mb-2">
                    <div class="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 flex items-center justify-center">
                      <Icon name="ph:shield-check-bold" class="w-5 h-5" />
                    </div>
                    <div>
                      <h3 class="text-sm font-black text-primary uppercase tracking-widest">Password & Login</h3>
                      <p class="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Kekuatan Sangat Kuat</p>
                    </div>
                  </div>
                  
                  <div class="space-y-3">
                    <div class="grid grid-cols-4 gap-2 h-1.5">
                      <div class="rounded-full bg-emerald-500 shadow-sm shadow-emerald-500/20"></div>
                      <div class="rounded-full bg-emerald-500 shadow-sm shadow-emerald-500/20"></div>
                      <div class="rounded-full bg-emerald-500 shadow-sm shadow-emerald-500/20"></div>
                      <div class="rounded-full bg-slate-100 dark:bg-slate-800"></div>
                    </div>
                    <p class="text-xs text-secondary font-medium">Password terakhir diperbarui 3 bulan yang lalu.</p>
                  </div>

                  <button class="btn-premium w-full py-3.5 text-xs rounded-xl flex items-center justify-center gap-2">
                    <Icon name="ph:key-bold" class="w-4 h-4" />
                    Ubah Password
                  </button>
                </div>

                <!-- Active Sessions -->
                <div class="card-premium p-6 space-y-6">
                  <div class="flex items-center gap-3 border-b border-(--border-color) pb-4">
                    <div class="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/30 text-blue-600 flex items-center justify-center">
                      <Icon name="ph:devices-bold" class="w-5 h-5" />
                    </div>
                    <div>
                      <h3 class="text-sm font-black text-primary uppercase tracking-widest">Sesi Aktif</h3>
                      <p class="text-xs font-bold text-muted">Perangkat yang login</p>
                    </div>
                  </div>
                  
                  <div class="space-y-4">
                    <div 
                      v-for="session in user.loginSessions" 
                      :key="session.id"
                      class="flex items-start gap-4"
                    >
                      <Icon :name="session.device.includes('iPhone') ? 'ph:device-mobile-bold' : 'ph:desktop-bold'" class="w-5 h-5 text-secondary mt-0.5" />
                      <div class="flex-1 border-b border-(--border-color) pb-4 last:border-0 last:pb-0">
                        <div class="flex items-center justify-between">
                          <p class="text-xs font-black text-primary uppercase tracking-widest">{{ session.device }}</p>
                          <span v-if="session.isCurrent" class="text-[10px] px-2 py-0.5 rounded bg-emerald-100 text-emerald-700 font-black uppercase">Ini</span>
                        </div>
                        <p class="text-xs font-medium text-secondary mt-1">{{ session.location }}</p>
                        <p class="text-xs font-bold text-muted mt-0.5">{{ session.time }}</p>
                      </div>
                    </div>
                  </div>

                  <button class="w-full py-3 text-xs font-black text-rose-600 uppercase tracking-widest hover:bg-rose-50 dark:hover:bg-rose-950/20 rounded-xl transition-all border border-rose-200 dark:border-rose-900/50">Log Out Semua</button>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </div>
    
    <!-- ======= SUPPORT & RECOMMENDATIONS ======= -->
    <div class="section-wrapper mt-16 lg:mt-24">
      <div class="max-w-7xl mx-auto space-y-16">
        <SupportSection />

        <div>
           <div class="reveal flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
             <div class="space-y-1">
               <div class="section-tag">Untuk Anda</div>
               <h2 class="text-2xl md:text-3xl font-black text-primary tracking-tight">Mungkin Anda Suka</h2>
             </div>
             <NuxtLink to="/products" class="text-xs font-black text-rose-600 flex items-center gap-2 group hover:underline">
               Koleksi Lengkap
               <Icon name="ph:arrow-right-bold" class="group-hover:translate-x-1 transition-transform" />
             </NuxtLink>
           </div>
           
           <div class="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 lg:gap-8 reveal">
              <ProductCard
                v-for="p in recommendedProducts"
                :key="p.id"
                v-bind="p"
                @view="onViewProduct"
              />
           </div>
        </div>
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
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Transisi Tab Konten */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
