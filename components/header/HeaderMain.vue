<template>
  <header class="sticky top-0 z-50 bg-white/80 glass border-b">
  <div class="max-w-7xl mx-auto px-4 lg:px-8 h-20 flex items-center justify-between">
    <div class="flex items-center gap-4">
      <NuxtLink to="/" class="flex items-center gap-3">
        <div class="w-12 h-12 rounded-2xl bg-pink-500 text-white font-extrabold flex items-center justify-center shadow">HB</div>
        <div class="hidden sm:block">
          <div class="text-lg font-semibold">Happy<span class="text-pink-600 font-light">Bouquet</span></div>
          <div class="text-xs text-gray-500">Buket segar — kirim hari ini</div>
        </div>
      </NuxtLink>
    </div>

    <!-- Search with suggestions -->
    <div class="flex-1 max-w-2xl mx-6">
      <div class="relative">
        <input type="search" placeholder="Cari: buket wisuda, buket mawar, paket anniversary..." class="w-full px-4 py-3 rounded-full border shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-200" autocomplete="off" />
        <button class="absolute right-2 top-1/2 -translate-y-1/2 bg-pink-500 text-white px-4 py-2 rounded-full">Cari</button>
        <!-- Suggestions will be shown here -->
      </div>
    </div>

    <div class="flex items-center gap-4">
      <NuxtLink to="/wishlist" class="hidden md:inline-flex items-center gap-2 text-sm px-3 py-2 rounded-md hover:bg-gray-50">
        <Icon name="ph:heart-bold" class="h-5 w-5" /> Wishlist
      </NuxtLink>
      <NuxtLink to="/account" class="hidden md:inline-flex items-center gap-2 text-sm px-3 py-2 rounded-md hover:bg-gray-50">
        <Icon name="ph:user-circle-bold" class="h-5 w-5" /> Akun
      </NuxtLink>

      <button @click="openCart" class="relative inline-flex items-center gap-2 text-sm px-3 py-2 rounded-md bg-white border hover:shadow-sm">
        <Icon name="ph:shopping-cart-simple-bold" class="h-5 w-5" />
        <span class="hidden sm:inline">Keranjang</span>
        <ClientOnly>
          <span v-if="cartCount > 0" class="absolute -top-2 -right-2 bg-pink-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">{{ cartCount }}</span>
        </ClientOnly>
      </button>

      <button @click="toggleMobileMenu" class="md:hidden p-2 rounded-md hover:bg-gray-100">
        <Icon v-if="!isMobileMenuOpen" name="ph:list-bold" class="h-5 w-5" />
        <Icon v-else name="ph:x-bold" class="h-5 w-5" />
      </button>
    </div>
  </div>

  <!-- Mobile Menu -->
  <ClientOnly>
    <transition
      enter-active-class="transition ease-out duration-200"
      enter-from-class="opacity-0 -translate-y-4"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition ease-in duration-150"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-4"
    >
      <div v-if="isMobileMenuOpen" class="md:hidden absolute top-full left-0 right-0 bg-white border-t shadow-xl">
        <div class="p-5">
          <div class="space-y-2 mb-5">
            <NuxtLink to="/wishlist" @click="closeMobileMenu" class="flex items-center gap-4 p-3 rounded-xl text-gray-700 font-medium hover:bg-pink-50 hover:text-pink-600 transition-colors duration-200">
              <Icon name="ph:heart-bold" class="h-6 w-6" />
              <span>Wishlist</span>
            </NuxtLink>
            <NuxtLink to="/account" @click="closeMobileMenu" class="flex items-center gap-4 p-3 rounded-xl text-gray-700 font-medium hover:bg-pink-50 hover:text-pink-600 transition-colors duration-200">
              <Icon name="ph:user-circle-bold" class="h-6 w-6" />
              <span>Akun Saya</span>
            </NuxtLink>
          </div>
          <NuxtLink to="/login" @click="closeMobileMenu" class="w-full flex items-center justify-center gap-3 p-3 rounded-xl bg-pink-500 text-white font-bold hover:bg-pink-600 transition-colors duration-200 shadow-lg">
            <Icon name="ph:sign-in-bold" class="h-6 w-6" />
            <span>Masuk / Daftar</span>
          </NuxtLink>
        </div>
      </div>
    </transition>
  </ClientOnly>
  </header>
</template>

<script setup>
const cart = useCartStore()
const cartCount = computed(() => cart.totalItems)
const openCart = () => cart.showCart(true)
const isMobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}
</script>

<style scoped>
.glass {
  backdrop-filter: blur(10px);
}
</style>
