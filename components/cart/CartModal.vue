<template>
  <ClientOnly>
    <Teleport to="body">
      <!-- Backdrop -->
      <transition
        enter-active-class="transition-opacity ease-out duration-300"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-opacity ease-in duration-200"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div v-if="cart.isOpen" @click="cart.showCart(false)" class="fixed inset-0 z-50 bg-gray-900/60 backdrop-blur-sm" aria-hidden="true"></div>
      </transition>

      <!-- Modal Panel -->
      <transition
        enter-active-class="transition-transform ease-out duration-300"
        enter-from-class="sm:opacity-0 sm:scale-95 translate-y-full sm:translate-y-0"
        enter-to-class="sm:opacity-100 sm:scale-100 translate-y-0"
        leave-active-class="transition-transform ease-in duration-200"
        leave-from-class="sm:opacity-100 sm:scale-100 translate-y-0"
        leave-to-class="sm:opacity-0 sm:scale-95 translate-y-full sm:translate-y-0"
      >
        <div v-if="cart.isOpen" class="fixed inset-0 z-50 flex sm:items-center sm:justify-center items-end" @click.self="cart.showCart(false)">
          <div class="relative w-full sm:max-w-2xl max-h-[95vh] sm:max-h-[90vh] bg-white sm:rounded-2xl rounded-t-2xl shadow-xl flex flex-col">
            <!-- Modal Header -->
            <div class="flex items-center justify-between p-4 sm:p-5 border-b shrink-0">
              <h3 class="text-xl font-semibold text-gray-900">
                Keranjang Belanja
              </h3>
              <button @click="cart.showCart(false)" type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-2 ml-auto inline-flex items-center">
                <Icon name="ph:x-bold" class="w-5 h-5" />
                <span class="sr-only">Tutup modal</span>
              </button>
            </div>

            <!-- Modal Body -->
            <div class="p-4 sm:p-6 flex-1 overflow-y-auto">
              <!-- Daftar Item -->
              <ul v-if="cart.totalItems > 0" role="list" class="divide-y divide-gray-200">
                <li v-for="item in cart.items" :key="item.cartItemId" class="flex py-6">
                  <div class="h-24 w-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
                    <img :src="item.image" :alt="item.name" class="h-full w-full object-cover object-center">
                  </div>
                  <div class="ml-4 flex flex-1 flex-col justify-between">
                    <div>
                      <div class="flex justify-between text-base font-medium text-gray-900">
                        <h3>{{ item.name }}</h3>
                        <p class="ml-4 shrink-0">{{ formatCurrency(item.price * item.quantity) }}</p>
                      </div>
                      <p class="mt-1 text-sm text-gray-500">{{ formatCurrency(item.price) }}</p>
                      <!-- Tampilkan Varian -->
                      <div v-if="item.variants" class="mt-1 text-xs text-gray-500 space-x-2">
                        <span v-for="(value, key) in item.variants" :key="key" class="capitalize">{{ key.replace('_', ' ') }}: <strong>{{ value }}</strong></span>
                      </div>
                    </div>
                    <div class="flex items-center justify-between text-sm">
                      <div class="flex items-center border rounded-lg">
                        <button @click="cart.decrease(item.id)" class="px-2 py-1 text-gray-600 hover:text-pink-600 rounded-l-lg transition">-</button>
                        <p class="px-3 text-gray-900 font-medium">{{ item.quantity }}</p>
                        <button @click="cart.increase(item.id)" class="px-2 py-1 text-gray-600 hover:text-pink-600 rounded-r-lg transition">+</button>
                      </div>
                      <div class="flex">
                        <button @click="cart.removeItem(item.id)" type="button" class="font-medium text-pink-600 hover:text-pink-500 transition">Hapus</button>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>

              <!-- Status Keranjang Kosong -->
              <div v-else class="text-center py-10 px-4 flex flex-col items-center justify-center h-full">
                <div class="w-20 h-20 bg-pink-50 rounded-full flex items-center justify-center mb-4">
                  <Icon name="ph:shopping-cart-simple-bold" class="h-10 w-10 text-pink-400" />
                </div>
                <h3 class="text-lg font-semibold text-gray-900">Keranjang Anda masih kosong</h3>
                <p class="mt-1 text-sm text-gray-500 max-w-xs">Sepertinya Anda belum menambahkan apa pun. Mari kita cari sesuatu yang indah!</p>
                <button @click="cart.showCart(false)" type="button" class="mt-6 px-5 py-2.5 text-sm font-medium text-white bg-pink-600 rounded-lg hover:bg-pink-700 shadow-sm transition">
                  Mulai Belanja
                </button>
              </div>
            </div>

            <!-- Modal Footer -->
            <div v-if="cart.totalItems > 0" class="p-4 sm:p-6 border-t bg-gray-50/80 shrink-0">
              <div class="flex items-center justify-between mb-4">
                <p class="text-base font-medium text-gray-900">Subtotal</p>
                <p class="text-xl font-bold text-gray-900">{{ cart.formattedTotalPrice }}</p>
              </div>
              <div class="flex flex-col sm:flex-row gap-3">
                <button @click="cart.showCart(false)" type="button" class="w-full px-6 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 transition">
                  Lanjut Belanja
                </button>
                <NuxtLink to="/checkout" @click="cart.showCart(false)" class="w-full flex items-center justify-center px-6 py-3 text-sm font-medium text-center text-white bg-pink-600 rounded-lg hover:bg-pink-700 shadow-sm transition">
                  Checkout
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </Teleport>
  </ClientOnly>
</template>

<script setup>
const cart = useCartStore()

const formatCurrency = (value) => {
  if (typeof value !== 'number') {
    return ''
  }
  return value.toLocaleString('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  })
}

// Menutup modal dengan tombol Escape
onMounted(() => {
  const handleKeydown = (e) => {
    if (e.key === 'Escape' && cart.isOpen) {
      cart.showCart(false)
    }
  }
  document.addEventListener('keydown', handleKeydown)
  onBeforeUnmount(() => {
    document.removeEventListener('keydown', handleKeydown)
  })
})
</script>
