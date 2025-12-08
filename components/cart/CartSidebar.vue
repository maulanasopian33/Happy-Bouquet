<template>
  <ClientOnly>
    <div class="relative z-50" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
      <!-- Backdrop -->
      <transition
        enter-active-class="ease-in-out duration-500"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="ease-in-out duration-500"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="cart.isOpen"
          @click="cart.showCart(false)"
          class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        ></div>
      </transition>

      <div class="fixed inset-0 overflow-hidden">
        <div class="absolute inset-0 overflow-hidden">
          <div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <!-- Panel Keranjang -->
            <transition
              enter-active-class="transform transition ease-in-out duration-500 sm:duration-700"
              enter-from-class="translate-x-full"
              enter-to-class="translate-x-0"
              leave-active-class="transform transition ease-in-out duration-500 sm:duration-700"
              leave-from-class="translate-x-0"
              leave-to-class="translate-x-full"
            >
              <div v-if="cart.isOpen" class="pointer-events-auto w-screen max-w-md">
                <div class="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                  <!-- Header -->
                  <div class="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                    <div class="flex items-start justify-between">
                      <h2 class="text-lg font-medium text-gray-900" id="slide-over-title">Keranjang Belanja</h2>
                      <div class="ml-3 flex h-7 items-center">
                        <button @click="cart.showCart(false)" type="button" class="relative -m-2 p-2 text-gray-400 hover:text-gray-500">
                          <span class="absolute -inset-0.5"></span>
                          <span class="sr-only">Tutup panel</span>
                          <Icon name="ph:x-bold" class="h-6 w-6" />
                        </button>
                      </div>
                    </div>

                    <!-- Daftar Item -->
                    <div v-if="cart.totalItems > 0" class="mt-8">
                      <ul role="list" class="divide-y divide-gray-200">
                        <li v-for="item in cart.items" :key="item.id" class="flex py-6">
                          <div class="h-24 w-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
                            <img :src="item.image" :alt="item.name" class="h-full w-full object-cover object-center">
                          </div>
                          <div class="ml-4 flex flex-1 flex-col">
                            <div>
                              <div class="flex justify-between text-base font-medium text-gray-900">
                                <h3>{{ item.name }}</h3>
                                <p class="ml-4">{{ formatCurrency(item.price * item.quantity) }}</p>
                              </div>
                            </div>
                            <div class="flex flex-1 items-end justify-between text-sm">
                              <div class="flex items-center border rounded-md">
                                <button @click="cart.decrease(item.id)" class="px-2 py-1 text-gray-500 hover:text-gray-700">-</button>
                                <p class="px-3">{{ item.quantity }}</p>
                                <button @click="cart.increase(item.id)" class="px-2 py-1 text-gray-500 hover:text-gray-700">+</button>
                              </div>
                              <div class="flex">
                                <button @click="cart.removeItem(item.id)" type="button" class="font-medium text-pink-600 hover:text-pink-500">Hapus</button>
                              </div>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>

                    <!-- Pesan Keranjang Kosong -->
                    <div v-else class="text-center mt-20">
                      <Icon name="ph:shopping-cart-simple-bold" class="mx-auto h-16 w-16 text-gray-300" />
                      <h3 class="mt-2 text-lg font-medium text-gray-900">Keranjang Anda kosong</h3>
                      <p class="mt-1 text-sm text-gray-500">Mulai belanja dan tambahkan produk ke keranjang.</p>
                    </div>
                  </div>

                  <!-- Footer -->
                  <div v-if="cart.totalItems > 0" class="border-t border-gray-200 px-4 py-6 sm:px-6">
                    <div class="flex justify-between text-base font-medium text-gray-900">
                      <p>Subtotal</p>
                      <p>{{ cart.formattedTotalPrice }}</p>
                    </div>
                    <p class="mt-0.5 text-sm text-gray-500">Pajak dan ongkir akan dihitung saat checkout.</p>
                    <div class="mt-6">
                      <NuxtLink to="/checkout" @click="cart.showCart(false)" class="flex items-center justify-center rounded-md border border-transparent bg-pink-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-pink-700">
                        Checkout
                      </NuxtLink>
                    </div>
                    <div class="mt-6 flex justify-center text-center text-sm text-gray-500">
                      <p>
                        atau
                        <button @click="cart.showCart(false)" type="button" class="font-medium text-pink-600 hover:text-pink-500">
                          Lanjut Belanja
                          <span aria-hidden="true"> &rarr;</span>
                        </button>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </div>
  </ClientOnly>
</template>

<script setup>
const cart = useCartStore()

const formatCurrency = (value) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(value)
}
</script>