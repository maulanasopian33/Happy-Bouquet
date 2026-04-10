<template>
  <ClientOnly>
    <Teleport to="body">
      <!-- Overlay / Backdrop -->
      <Transition
        enter-active-class="transition-opacity ease-out duration-500"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-opacity ease-in duration-300"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div 
          v-if="cart.isOpen" 
          @click="cart.showCart(false)" 
          class="fixed inset-0 z-100 bg-slate-900/40 backdrop-blur-md" 
          aria-hidden="true"
        ></div>
      </Transition>

      <!-- Cart Drawer -->
      <Transition
        enter-active-class="transition-transform ease-out duration-600 delay-100"
        enter-from-class="translate-x-full"
        enter-to-class="translate-x-0"
        leave-active-class="transition-transform ease-in duration-400"
        leave-from-class="translate-x-0"
        leave-to-class="translate-x-full"
      >
        <div 
          v-if="cart.isOpen" 
          class="fixed top-0 right-0 bottom-0 z-101 w-full max-w-lg bg-(--bg-main) shadow-2xl flex flex-col border-l border-(--border-color) transition-colors duration-500"
        >
          <!-- ======= DRAWER HEADER ======= -->
          <div class="px-6 py-8 flex items-center justify-between bg-(--bg-card) border-b border-(--border-color) relative overflow-hidden">
            <Icon name="ph:shopping-cart-fill" class="absolute -bottom-4 -right-4 w-24 h-24 text-rose-500/5 rotate-12" />
            <div class="relative">
              <h3 class="text-2xl font-black text-primary tracking-tight">Keranjang Belanja</h3>
              <p class="text-[10px] font-black text-rose-600 uppercase tracking-widest mt-1">
                {{ cart.totalItems }} Item Terpilih
              </p>
            </div>
            <button 
              @click="cart.showCart(false)"
              class="w-10 h-10 rounded-full flex items-center justify-center bg-(--bg-section) text-secondary hover:text-rose-600 hover:rotate-90 transition-all duration-500"
            >
              <Icon name="ph:x-bold" class="w-5 h-5" />
            </button>
          </div>

          <!-- ======= DRAWER BODY ======= -->
          <div class="flex-1 overflow-y-auto px-6 py-8 space-y-6 scroll-hide">
            <div v-if="cart.totalItems > 0" class="space-y-4">
              <div 
                v-for="item in cart.items" 
                :key="item.cartItemId" 
                class="group p-4 bg-(--bg-card) border border-(--border-color) rounded-3xl hover:border-rose-300 dark:hover:border-rose-900 transition-all duration-300 hover:shadow-xl hover:shadow-rose-500/5"
              >
                <div class="flex gap-5">
                  <!-- Product Image -->
                  <div class="w-24 h-24 rounded-2xl overflow-hidden shrink-0 bg-(--bg-section) border border-(--border-color)">
                    <img :src="item.image" :alt="item.name" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  </div>
                  
                  <!-- Info -->
                  <div class="flex-1 min-w-0 flex flex-col justify-between py-1">
                    <div>
                      <div class="flex justify-between gap-3">
                        <h4 class="text-sm font-black text-primary line-clamp-1 group-hover:text-rose-600 transition-colors">
                          {{ item.name }}
                        </h4>
                        <button 
                          @click="cart.removeItem(item.id)"
                          class="p-1 text-muted hover:text-rose-600 transition-colors"
                        >
                          <Icon name="ph:trash-bold" class="w-4 h-4" />
                        </button>
                      </div>
                      
                      <div v-if="item.variants" class="flex flex-wrap gap-1.5 mt-2">
                        <span 
                          v-for="(val, key) in item.variants" 
                          :key="key"
                          class="px-2 py-0.5 bg-(--bg-section) text-[9px] font-bold text-secondary uppercase tracking-widest rounded-md"
                        >
                          {{ val }}
                        </span>
                      </div>
                    </div>

                    <div class="flex items-end justify-between gap-4 mt-4">
                      <p class="text-base font-black text-rose-600">{{ formatCurrency(item.price) }}</p>
                      
                      <!-- Qty Control -->
                      <div class="flex items-center bg-(--bg-section) rounded-xl p-0.5 border border-(--border-color)">
                        <button 
                          @click="cart.decrease(item.id)"
                          class="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-white dark:hover:bg-rose-900 text-rose-600 transition-all"
                        >
                          <Icon name="ph:minus-bold" class="w-3 h-3" />
                        </button>
                        <span class="w-8 text-center text-xs font-black text-primary">{{ item.quantity }}</span>
                        <button 
                          @click="cart.increase(item.id)"
                          class="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-white dark:hover:bg-rose-900 text-rose-600 transition-all"
                        >
                          <Icon name="ph:plus-bold" class="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Empty State -->
            <div v-else class="h-full flex flex-col items-center justify-center text-center space-y-6 py-20 px-10">
              <div class="relative">
                <div class="w-24 h-24 rounded-full bg-rose-50 dark:bg-rose-950/30 flex items-center justify-center text-rose-300">
                  <Icon name="ph:shopping-bag-open-duotone" class="w-12 h-12" />
                </div>
                <div class="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-white dark:bg-slate-900 border-2 border-rose-100 flex items-center justify-center">
                  <Icon name="ph:question-bold" class="w-4 h-4 text-rose-600" />
                </div>
              </div>
              <div class="space-y-2">
                <h3 class="text-xl font-black text-primary">Keranjang Kosong?</h3>
                <p class="text-xs text-secondary font-medium leading-relaxed">Sepertinya Anda belum memilih buket spesial. Mari telusuri koleksi terbaik kami.</p>
              </div>
              <button 
                @click="cart.showCart(false)"
                class="btn-premium px-8"
              >
                Mulai Belanja
              </button>
            </div>
          </div>

          <!-- ======= DRAWER FOOTER ======= -->
          <div v-if="cart.totalItems > 0" class="p-8 bg-(--bg-card) border-t border-(--border-color) space-y-6">
            <div class="space-y-4">
              <div class="flex items-center justify-between text-xs font-bold text-muted uppercase tracking-widest">
                <span>Subtotal Pesanan</span>
                <span class="text-primary tracking-normal">{{ formatCurrency(cart.totalPrice) }}</span>
              </div>
              <div class="flex items-center justify-between text-xs font-bold text-muted uppercase tracking-widest">
                <span>Estimasi Pajak (Included)</span>
                <span class="text-emerald-500 tracking-normal">Rp 0</span>
              </div>
              <div class="pt-4 flex items-center justify-between border-t border-dashed border-(--border-color)">
                <span class="text-sm font-black text-primary uppercase tracking-widest">Total Pembayaran</span>
                <span class="text-3xl font-black text-rose-600 tracking-tight">{{ cart.formattedTotalPrice }}</span>
              </div>
            </div>

            <div class="flex flex-col gap-3">
              <button 
                @click="cart.showCart(false)"
                class="btn-premium-outline w-full py-4.5 rounded-2xl"
              >
                Lanjut Belanja
              </button>
              <NuxtLink 
                to="/checkout" 
                @click="cart.showCart(false)"
                class="btn-premium w-full flex items-center justify-center gap-3 py-4.5 rounded-2xl shadow-xl shadow-rose-500/20"
              >
                <Icon name="ph:credit-card-fill" class="w-5 h-5 text-amber-300" />
                Selesaikan Pembayaran
              </NuxtLink>
            </div>
            
            <p class="text-center text-[10px] text-muted font-bold uppercase tracking-widest">
              Dikelola Dengan <Icon name="ph:heart-fill" class="text-rose-500 inline mx-0.5" /> HappyBouquet Official
            </p>
          </div>
        </div>
      </Transition>
    </Teleport>
  </ClientOnly>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'

const cart = useCartStore()

const formatCurrency = (value: number) => {
  if (typeof value !== 'number') return ''
  return value.toLocaleString('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  })
}

const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && cart.isOpen) cart.showCart(false)
}

// Menutup modal dengan tombol Escape
onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
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
</style>
