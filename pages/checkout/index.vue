<template>
  <div class="bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <div>
        <!-- Header -->
        <div class="text-center">
          <h1 class="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">Selesaikan Pesanan</h1>
          <p class="mt-2 text-lg text-gray-500">Selesaikan pesanan Anda dalam beberapa langkah mudah.</p>
        </div>

        <div class="mt-12 grid grid-cols-1 lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
          <!-- Order Summary (Right Column on Desktop) -->
          <div class="lg:col-start-2">
            <h2 class="text-lg font-medium text-gray-900">Ringkasan Pesanan</h2>
            <div class="sticky top-28 mt-4 bg-white border border-gray-200 rounded-lg shadow-sm">
              <ul role="list" class="divide-y divide-gray-200">
                <li v-for="item in cart.items" :key="item.cartItemId" class="flex items-center px-4 py-4 sm:px-6">
                  <div class="flex-shrink-0">
                    <img :src="item.image" :alt="item.name" class="w-20 h-20 rounded-md object-cover">
                  </div>
                  <div class="ml-4 flex-1 flex flex-col">
                    <div class="flex justify-between">
                      <h3 class="text-sm font-medium text-gray-900">{{ item.name }}</h3>
                      <p class="ml-4 text-sm font-medium text-gray-900">{{ formatCurrency(item.price * item.quantity) }}</p>
                    </div>
                    <div class="flex justify-between items-baseline text-sm">
                      <div v-if="item.variants" class="mt-1 text-xs text-gray-500 space-x-2">
                        <span v-for="(value, key) in item.variants" :key="key" class="capitalize">{{ key.replace('_', ' ') }}: <strong>{{ value }}</strong></span>
                      </div>
                      <p class="text-gray-500">Qty: {{ item.quantity }}</p>
                    </div>
                  </div>
                </li>
              </ul>

              <dl class="border-t border-gray-200 py-6 px-4 space-y-4 sm:px-6">
                <div class="flex items-center justify-between">
                  <dt class="text-sm text-gray-600">Subtotal</dt>
                  <dd class="text-sm font-medium text-gray-900">{{ cart.formattedTotalPrice }}</dd>
                </div>
                <div class="flex items-center justify-between">
                  <dt class="text-sm text-gray-600">Pengiriman</dt>
                  <dd class="text-sm font-medium text-gray-900">{{ formatCurrency(shippingCost) }}</dd>
                </div>
                <div class="flex items-center justify-between border-t border-gray-200 pt-4">
                  <dt class="text-base font-medium text-gray-900">{{ paymentSummary.totalLabel }}</dt>
                  <dd class="text-base font-medium text-gray-900">{{ formatCurrency(paymentSummary.totalAmount) }}</dd>
                </div>
              </dl>

              <!-- Payment Summary for DP -->
              <div v-if="selectedPayment.id.startsWith('dp')" class="border-t border-dashed border-gray-200 py-5 px-4 sm:px-6 bg-green-50">
                <div class="flex items-center justify-between text-green-700" v-if="paymentSummary.amountToPay > 0">
                  <dt class="text-base font-medium">DP (50%) dibayar sekarang</dt>
                  <dd class="text-base font-medium">{{ formatCurrency(paymentSummary.amountToPay) }}</dd>
                </div>
                <div class="flex items-center justify-between mt-2 text-sm text-gray-500">
                  <dt>Sisa pembayaran</dt>
                  <dd>{{ formatCurrency(paymentSummary.remainingAmount) }}</dd>
                </div>
              </div>
            </div>
          </div>

          <!-- Form (Left Column on Desktop) -->
          <div class="mt-10 lg:mt-0 lg:col-start-1 lg:row-start-1">
            <div class="space-y-6">
              <!-- Contact Information -->
              <div class="bg-white p-6 rounded-lg shadow-sm border">
                <h2 class="text-lg font-medium text-gray-900">Informasi Kontak</h2>
                <div class="mt-4">
                  <label for="email-address" class="block text-sm font-medium text-gray-700">Alamat email</label>
                  <div class="mt-1">
                    <input type="email" id="email-address" v-model="form.email" class="block w-full bg-gray-50 border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500 sm:text-sm p-3">
                  </div>
                </div>
              </div>

              <!-- Shipping Information -->
              <div class="bg-white p-6 rounded-lg shadow-sm border">
                <h2 class="text-lg font-medium text-gray-900">Alamat Pengiriman</h2>
                <div class="mt-4 grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-4">
                  <div>
                    <label for="first-name" class="block text-sm font-medium text-gray-700">Nama Lengkap</label>
                    <div class="mt-1">
                      <input type="text" id="first-name" v-model="form.name" class="block w-full bg-gray-50 border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500 sm:text-sm p-3">
                    </div>
                  </div>
                  <div>
                    <label for="phone" class="block text-sm font-medium text-gray-700">Nomor Telepon</label>
                    <div class="mt-1">
                      <input type="text" id="phone" v-model="form.phone" class="block w-full bg-gray-50 border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500 sm:text-sm p-3">
                    </div>
                  </div>
                  <div class="sm:col-span-2">
                    <label for="address" class="block text-sm font-medium text-gray-700">Alamat Lengkap</label>
                    <div class="mt-1">
                      <textarea id="address" v-model="form.address" rows="3" class="block w-full bg-gray-50 border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500 sm:text-sm p-3"></textarea>
                    </div>
                  </div>
                  <div class="sm:col-span-2">
                    <label for="pickup-date" class="block text-sm font-medium text-gray-700">Tanggal Pengambilan/Pengiriman</label>
                    <div class="mt-1">
                      <input type="date" id="pickup-date" v-model="form.pickupDate" :min="minDate" class="block w-full bg-gray-50 border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500 sm:text-sm p-3">
                    </div>
                  </div>
                </div>
              </div>

              <!-- Shipping Method -->
              <div class="bg-white p-6 rounded-lg shadow-sm border">
                <h2 class="text-lg font-medium text-gray-900">Metode Pengiriman</h2>
                <div class="mt-4 grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-4">
                  <label v-for="method in shippingMethods" :key="method.id" class="relative bg-white border rounded-lg p-4 flex cursor-pointer focus:outline-none transition-all" :class="{ 'border-pink-500 ring-2 ring-pink-500 bg-pink-50/50': selectedShipping.id === method.id }">
                    <input type="radio" name="shipping-method" :value="method" v-model="selectedShipping" class="sr-only">
                    <span class="flex-1 flex">
                      <span class="flex flex-col">
                        <span class="block text-sm font-medium text-gray-900">{{ method.name }}</span>
                        <span class="mt-1 flex items-center text-sm text-gray-500">{{ method.description }}</span>
                        <span class="mt-4 text-sm font-medium text-gray-900">{{ formatCurrency(method.cost) }}</span>
                      </span>
                    </span>
                    <Icon v-if="selectedShipping.id === method.id" name="ph:check-circle-fill" class="h-5 w-5 text-pink-600" />
                  </label>
                </div>
              </div>

              <!-- Payment Method -->
              <div class="bg-white p-6 rounded-lg shadow-sm border">
                <h2 class="text-lg font-medium text-gray-900">Metode Pembayaran</h2>
                <div class="mt-4 grid grid-cols-1 gap-y-4">
                  <label v-for="method in paymentMethods" :key="method.id" class="relative bg-white border rounded-lg p-4 flex cursor-pointer focus:outline-none transition-all" :class="{ 'border-pink-500 ring-2 ring-pink-500 bg-pink-50/50': selectedPayment.id === method.id }">
                    <input type="radio" name="payment-method" :value="method" v-model="selectedPayment" class="sr-only">
                    <span class="flex-1 flex">
                      <span class="flex flex-col">
                        <span class="block text-sm font-medium text-gray-900">{{ method.name }}</span>
                      </span>
                    </span>
                    <Icon v-if="selectedPayment.id === method.id" name="ph:check-circle-fill" class="h-5 w-5 text-pink-600" />
                  </label>
                </div>
              </div>
            </div>

            <!-- Payment Button -->
            <div class="mt-10 border-t border-gray-200 pt-6">
              <button @click="placeOrder" class="w-full bg-pink-600 border border-transparent rounded-lg shadow-sm py-3.5 px-4 text-base font-semibold text-white hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 disabled:bg-gray-400">
                Lanjutkan ke Pembayaran
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
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

const shippingMethods = [
  { id: 1, name: 'Pengiriman Standar', description: '3-5 hari kerja', cost: 15000 },
  { id: 2, name: 'Pengiriman Express', description: '1-2 hari kerja', cost: 30000 },
]

const paymentMethods = [
  { id: 'full_payment', name: 'Full Payment Sekarang', rate: 1.0 },
  { id: 'dp_70', name: 'DP (70%)', rate: 0.7 },
  { id: 'dp_50', name: 'DP (50%)', rate: 0.5 },
  { id: 'cod', name: 'COD (Cash on Delivery)', rate: 0 },
]

const selectedShipping = ref(shippingMethods[0])
const selectedPayment = ref(paymentMethods[0])

const shippingCost = computed(() => selectedShipping.value.cost)
const totalOrder = computed(() => cart.totalPrice + shippingCost.value)

const paymentSummary = computed(() => {
  const total = totalOrder.value
  const rate = selectedPayment.value.rate

  const amountToPay = total * rate
  const remainingAmount = total - amountToPay

  let totalLabel = 'Total Pembayaran'
  if (selectedPayment.value.id.startsWith('dp')) {
    totalLabel = 'Total Pesanan'
  } else if (selectedPayment.value.id === 'cod') {
    totalLabel = 'Total Bayar di Tempat'
  }

  return {
    totalLabel,
    totalAmount: total,
    amountToPay,
    remainingAmount,
  }
})

const formatCurrency = (value) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(value)
}

const placeOrder = () => {
  // Validasi sederhana
  if (!form.value.email || !form.value.name || !form.value.phone || !form.value.address || !form.value.pickupDate) {
    alert('Harap lengkapi semua informasi dan pilih tanggal pengambilan/pengiriman.')
    return
  }

  console.log('Order placed:', {
    customer: form.value,
    items: cart.items,
    shipping: selectedShipping.value,
    payment: selectedPayment.value,
    total: totalOrder.value,
    amountPaid: paymentSummary.value.amountToPay
  })

  alert('Pesanan berhasil dibuat! (Simulasi)')
  cart.clearCart()
  router.push('/')
}

// Batasi tanggal pengambilan minimal hari ini
const minDate = computed(() => {
  const today = new Date();
  today.setDate(today.getDate()); // Bisa ditambahkan jika ingin minimal besok, misal: today.getDate() + 1
  return today.toISOString().split('T')[0];
});

onMounted(() => {
  if (cart.totalItems === 0) {
    router.replace('/')
  }
  form.value.pickupDate = minDate.value; // Set tanggal default ke hari ini
})
</script>