<template>
  <div class="min-h-screen bg-(--bg-main) transition-colors duration-500 pb-20">
    
    <!-- ======= HEADER SECTION ======= -->
    <div class="section-wrapper py-12 md:py-20 text-center">
      <div class="reveal">
        <div class="section-tag mx-auto inline-flex items-center">Tahap Akhir</div>
        <h1 class="section-title text-gradient">Selesaikan Pesanan</h1>
        <p class="text-sm md:text-base text-secondary font-medium mt-2 max-w-lg mx-auto leading-relaxed">
          Satu langkah lagi menuju kebahagiaan. Informasi Anda terjaga dengan aman bersama kami.
        </p>
      </div>
    </div>

    <!-- ======= MAIN CONTENT ======= -->
    <div class="section-wrapper lg:px-6">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
        
        <!-- LEFT COLUMN: Forms (7 cols) -->
        <div class="lg:col-span-7 xl:col-span-8 space-y-10 reveal">
          
          <!-- Contact Information -->
          <div class="card-premium p-8 md:p-10 space-y-8 relative overflow-hidden group">
            <Icon name="ph:user-circle-fill" class="absolute -top-6 -right-6 w-32 h-32 text-rose-500/5 rotate-12" />
            <div class="flex items-center gap-4 relative z-10 border-b border-(--border-color) pb-4">
              <div class="w-10 h-10 rounded-xl bg-rose-50 dark:bg-rose-950/30 flex items-center justify-center text-rose-600">
                <Icon name="ph:address-book-bold" class="w-6 h-6" />
              </div>
              <h2 class="text-xl font-black text-primary tracking-tight">Informasi Kontak</h2>
            </div>
            
            <div class="grid grid-cols-1 gap-6 relative z-10">
              <div class="space-y-2">
                <label for="email-address" class="block text-xs font-black text-primary uppercase tracking-widest pl-1">Alamat Email</label>
                <input 
                  type="email" 
                  id="email-address" 
                  v-model="form.email" 
                  class="w-full bg-(--bg-section) border-(--border-color) focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10 rounded-2xl p-4 text-sm font-medium transition-all outline-hidden"
                  placeholder="name@example.com"
                >
              </div>
            </div>
          </div>

          <!-- Shipping Information -->
          <div class="card-premium p-8 md:p-10 space-y-8 relative overflow-hidden group">
            <Icon name="ph:map-pin-fill" class="absolute -top-6 -right-6 w-32 h-32 text-rose-500/5 rotate-12" />
            <div class="flex items-center gap-4 relative z-10 border-b border-(--border-color) pb-4">
              <div class="w-10 h-10 rounded-xl bg-rose-50 dark:bg-rose-950/30 flex items-center justify-center text-rose-600">
                <Icon name="ph:truck-bold" class="w-6 h-6" />
              </div>
              <h2 class="text-xl font-black text-primary tracking-tight">Alamat Pengiriman</h2>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
              <div class="space-y-2">
                <label for="first-name" class="block text-xs font-black text-primary uppercase tracking-widest pl-1">Nama Penerima</label>
                <input 
                  type="text" 
                  id="first-name" 
                  v-model="form.name" 
                  class="w-full bg-(--bg-section) border-(--border-color) focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10 rounded-2xl p-4 text-sm font-medium transition-all outline-hidden"
                >
              </div>
              <div class="space-y-2">
                <label for="phone" class="block text-xs font-black text-primary uppercase tracking-widest pl-1">Nomor Telepon</label>
                <input 
                  type="text" 
                  id="phone" 
                  v-model="form.phone" 
                  class="w-full bg-(--bg-section) border-(--border-color) focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10 rounded-2xl p-4 text-sm font-medium transition-all outline-hidden"
                  placeholder="08123xxxx"
                >
              </div>
              <div class="md:col-span-2 space-y-2">
                <label for="address" class="block text-xs font-black text-primary uppercase tracking-widest pl-1">Alamat Lengkap</label>
                <textarea 
                  id="address" 
                  v-model="form.address" 
                  rows="3" 
                  class="w-full bg-(--bg-section) border-(--border-color) focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10 rounded-2xl p-4 text-sm font-medium transition-all outline-hidden resize-none"
                  placeholder="Nama Jalan, Blok, No Rumah, Kec/Kab..."
                ></textarea>
              </div>
              <div class="md:col-span-2 space-y-2">
                <label for="pickup-date" class="block text-xs font-black text-primary uppercase tracking-widest pl-1">Jadwal Pengiriman</label>
                <input 
                  type="date" 
                  id="pickup-date" 
                  v-model="form.pickupDate" 
                  :min="minDate" 
                  class="w-full bg-(--bg-section) border-(--border-color) focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10 rounded-2xl p-4 text-sm font-medium transition-all outline-hidden"
                >
              </div>
            </div>
          </div>

          <!-- Shipping Method -->
          <div class="card-premium p-8 md:p-10 space-y-8">
            <h2 class="text-xl font-black text-primary tracking-tight border-b border-(--border-color) pb-4">Opsi Pengiriman</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label 
                v-for="method in shippingMethods" 
                :key="method.id" 
                class="relative flex flex-col p-6 rounded-3xl cursor-pointer border-2 transition-all duration-300 overflow-hidden" 
                :class="selectedShipping?.id === method.id 
                  ? 'border-rose-500 bg-rose-50/50 dark:bg-rose-950/20 shadow-lg shadow-rose-500/10 scale-[1.02]' 
                  : 'border-(--border-color) bg-(--bg-section) hover:border-rose-200 dark:hover:border-rose-900 opacity-60'"
              >
                <input type="radio" name="shipping-method" :value="method" v-model="selectedShipping" class="sr-only">
                
                <div class="flex items-center justify-between mb-4">
                  <span class="text-sm font-black text-primary uppercase tracking-widest">{{ method.name }}</span>
                  <div v-if="selectedShipping?.id === method.id" class="w-5 h-5 rounded-full bg-rose-600 flex items-center justify-center text-white">
                    <Icon name="ph:check-bold" class="w-3 h-3" />
                  </div>
                </div>
                
                <p class="text-xs text-secondary font-medium mb-4">{{ method.description }}</p>
                <span class="text-lg font-black text-rose-600 mt-auto">{{ formatCurrency(method.cost) }}</span>
                
                <!-- Background Icon -->
                <Icon name="ph:truck-fill" class="absolute -bottom-2 -right-2 w-12 h-12 opacity-5 pointer-events-none" />
              </label>
            </div>
          </div>

          <!-- Payment Method -->
          <div class="card-premium p-8 md:p-10 space-y-8">
            <h2 class="text-xl font-black text-primary tracking-tight border-b border-(--border-color) pb-4">Mode Pembayaran</h2>
            <div class="grid grid-cols-1 gap-4">
              <label 
                v-for="method in paymentMethods" 
                :key="method.id" 
                class="relative flex items-center p-6 rounded-3xl cursor-pointer border-2 transition-all duration-300" 
                :class="selectedPayment?.id === method.id 
                  ? 'border-rose-500 bg-rose-50/50 dark:bg-rose-950/20 shadow-lg shadow-rose-500/10' 
                  : 'border-(--border-color) bg-(--bg-section) hover:border-rose-200 dark:hover:border-rose-900 opacity-60'"
              >
                <input type="radio" name="payment-method" :value="method" v-model="selectedPayment" class="sr-only">
                
                <div class="w-10 h-10 rounded-xl bg-white dark:bg-slate-900 border border-(--border-color) flex items-center justify-center mr-4">
                  <Icon :name="method.id.startsWith('dp') ? 'ph:cardholder-bold' : (method.id === 'cod' ? 'ph:hand-coins-bold' : 'ph:credit-card-bold')" class="w-5 h-5 text-rose-600" />
                </div>

                <div class="flex-1">
                  <span class="block text-sm font-black text-primary uppercase tracking-widest">{{ method.name }}</span>
                  <p class="text-[10px] text-muted font-bold mt-0.5" v-if="method.rate < 1 && method.rate > 0">Cicil Sekarang, Lunas Kemudian</p>
                </div>
                
                <div v-if="selectedPayment?.id === method.id" class="w-6 h-6 rounded-full bg-rose-600 flex items-center justify-center text-white">
                  <Icon name="ph:check-bold" class="w-4 h-4" />
                </div>
              </label>
            </div>
          </div>
        </div>

        <!-- RIGHT COLUMN: Order Summary (5 cols) -->
        <aside class="lg:col-span-5 xl:col-span-4 space-y-8 lg:sticky lg:top-28 reveal">
          <div class="card-premium p-8 md:p-10 space-y-8">
            <h2 class="text-xl font-black text-primary tracking-tight border-b border-(--border-color) pb-4">Pesanan Anda</h2>
            
            <ul role="list" class="space-y-6">
              <li v-for="item in cart.items" :key="item.cartItemId" class="flex gap-4 group">
                <div class="relative w-20 h-20 shrink-0 rounded-2xl overflow-hidden border border-(--border-color) bg-(--bg-section)">
                  <img :src="item.image" :alt="item.name" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700">
                  <div class="absolute top-1 right-1 bg-rose-600 text-white text-[9px] font-black w-5 h-5 flex items-center justify-center rounded-full shadow-lg">
                    {{ item.quantity }}
                  </div>
                </div>
                <div class="flex flex-col justify-between py-1 min-w-0">
                  <div>
                    <h3 class="text-xs font-black text-primary uppercase tracking-widest line-clamp-1 group-hover:text-rose-600 transition-colors">
                      {{ item.name }}
                    </h3>
                    <div v-if="item.variants" class="mt-1 flex flex-wrap gap-1">
                      <span v-for="(value, key) in item.variants" :key="key" class="text-[9px] font-bold text-muted bg-(--bg-section) px-1.5 py-0.5 rounded-md">
                        {{ value }}
                      </span>
                    </div>
                  </div>
                  <p class="text-sm font-black text-primary">{{ formatCurrency(item.price * item.quantity) }}</p>
                </div>
              </li>
            </ul>

            <div class="space-y-4 pt-8 border-t border-(--border-color)">
              <div class="flex items-center justify-between text-xs font-bold text-muted uppercase tracking-widest">
                <span>Subtotal Buket</span>
                <span class="text-primary tracking-normal">{{ cart.formattedTotalPrice }}</span>
              </div>
              <div class="flex items-center justify-between text-xs font-bold text-muted uppercase tracking-widest">
                <span>Biaya Pengiriman</span>
                <span class="text-primary tracking-normal">{{ formatCurrency(shippingCost) }}</span>
              </div>
              <div class="pt-6 flex items-center justify-between border-t border-dashed border-(--border-color)">
                <span class="text-sm font-black text-primary uppercase tracking-widest">{{ paymentSummary.totalLabel }}</span>
                <span class="text-2xl font-black text-rose-600 tracking-tight">{{ formatCurrency(paymentSummary.totalAmount) }}</span>
              </div>
            </div>

            <!-- Dynamic Payment Breakdown (DP Logic) -->
            <Transition name="fade">
              <div v-if="selectedPayment?.id.startsWith('dp')" class="p-6 bg-emerald-50 dark:bg-emerald-950/20 rounded-3xl border border-emerald-100 dark:border-emerald-900/30 space-y-3">
                <div class="flex items-center justify-between text-emerald-700 dark:text-emerald-400">
                  <dt class="text-xs font-black uppercase tracking-widest flex items-center gap-2">
                    <Icon name="ph:info-bold" />
                    DP Dibayar Sekarang
                  </dt>
                  <dd class="text-base font-black">{{ formatCurrency(paymentSummary.amountToPay) }}</dd>
                </div>
                <div class="pt-2 border-t border-emerald-100/50 dark:border-emerald-900/50 flex items-center justify-between text-[10px] font-bold text-emerald-600/70 dark:text-emerald-500/70 uppercase">
                  <dt>Sisa Pelunasan</dt>
                  <dd>{{ formatCurrency(paymentSummary.remainingAmount) }}</dd>
                </div>
              </div>
            </Transition>

            <div class="pt-4">
              <button 
                @click="placeOrder" 
                class="btn-premium w-full flex items-center justify-center gap-3 py-4.5 rounded-2xl shadow-xl shadow-rose-500/30"
              >
                <Icon name="ph:seal-check-fill" class="w-5 h-5 text-amber-300" />
                Bayar Sekarang
              </button>
            </div>
            
            <div class="flex items-center justify-center gap-2 text-[10px] font-bold text-muted uppercase tracking-widest">
              <Icon name="ph:lock-key-fill" class="text-emerald-500" />
              Transaksi Terenkripsi & Aman
            </div>
          </div>
        </aside>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

definePageMeta({
  layout: 'default'
})

const cart = useCartStore()
const router = useRouter()

const form = ref({
  email: '',
  name: '',
  phone: '',
  address: '',
  pickupDate: ''
})

interface ShippingMethod {
  id: number
  name: string
  description: string
  cost: number
}

interface PaymentMethod {
  id: string
  name: string
  rate: number
}

const shippingMethods: ShippingMethod[] = [
  { id: 1, name: 'Pengiriman Standar', description: 'Estimasi tiba dalam 3-5 hari kerja.', cost: 15000 },
  { id: 2, name: 'Pengiriman Express', description: 'Priority shipping, tiba dalam 1-2 hari.', cost: 30000 },
]

const paymentMethods: PaymentMethod[] = [
  { id: 'full_payment', name: 'Lunas Sekarang', rate: 1.0 },
  { id: 'dp_70', name: 'Angsuran DP 70%', rate: 0.7 },
  { id: 'dp_50', name: 'Angsuran DP 50%', rate: 0.5 },
  { id: 'cod', name: 'Bayar Di Tempat (COD)', rate: 0 },
]

const selectedShipping = ref<ShippingMethod>(shippingMethods[0] as ShippingMethod)
const selectedPayment = ref<PaymentMethod>(paymentMethods[0] as PaymentMethod)

const shippingCost = computed(() => selectedShipping.value?.cost || 0)
const totalOrder = computed(() => cart.totalPrice + shippingCost.value)

const paymentSummary = computed(() => {
  const total = totalOrder.value
  const p = selectedPayment.value
  if (!p) return { totalLabel: 'Total', totalAmount: total, amountToPay: total, remainingAmount: 0 }
  
  const rate = p.rate

  const amountToPay = total * rate
  const remainingAmount = total - amountToPay

  let totalLabel = 'Tagihan Total'
  if (p.id.startsWith('dp')) {
    totalLabel = 'Total Pesanan'
  } else if (p.id === 'cod') {
    totalLabel = 'Total Bayar COD'
  }

  return {
    totalLabel,
    totalAmount: total,
    amountToPay,
    remainingAmount,
  }
})

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(value)
}

const placeOrder = () => {
  // Validasi sederhana
  if (!form.value.email || !form.value.name || !form.value.phone || !form.value.address || !form.value.pickupDate) {
    alert('Harap lengkapi semua informasi pengiriman dan kontak.')
    return
  }

  console.log('Order processed:', {
    customer: form.value,
    items: cart.items,
    shipping: selectedShipping.value!,
    payment: selectedPayment.value!,
    total: totalOrder.value,
    amountRequired: paymentSummary.value.amountToPay
  })

  alert('Pesanan dikonfirmasi! Anda akan diarahkan ke halaman utama.')
  cart.clearCart()
  router.push('/')
}

// Minimal H+1 untuk pesanan bunga
const minDate = computed(() => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow.toISOString().split('T')[0];
});

onMounted(() => {
  if (cart.totalItems === 0) {
    router.replace('/products')
  }
  form.value.pickupDate = minDate.value as string; 
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease, transform 0.4s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.reveal {
  opacity: 0;
  animation: revealUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

@keyframes revealUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>