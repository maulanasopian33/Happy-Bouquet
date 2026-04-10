<template>
  <!-- Hanya tampil di mobile (hidden md ke atas) -->
  <nav
    class="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-(--bg-card)/95 backdrop-blur-xl border-t border-(--border-color) shadow-2xl"
    style="padding-bottom: env(safe-area-inset-bottom, 0px);"
    aria-label="Navigasi bawah"
  >
    <div class="flex items-center justify-around px-2 py-2">

      <!-- Beranda -->
      <NuxtLink
        to="/"
        class="flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-2xl transition-all duration-200 group"
        :class="isActive('/') ? 'text-rose-600' : 'text-(--text-muted) hover:text-rose-500'"
      >
        <Icon
          :name="isActive('/') ? 'ph:house-fill' : 'ph:house-bold'"
          class="w-5 h-5 transition-transform group-active:scale-90"
        />
        <span class="text-[10px] font-bold leading-none">Beranda</span>
      </NuxtLink>

      <!-- Cari -->
      <button
        @click="$emit('open-search')"
        class="flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-2xl transition-all duration-200 text-(--text-muted) hover:text-rose-500 group"
      >
        <Icon name="ph:magnifying-glass-bold" class="w-5 h-5 transition-transform group-active:scale-90" />
        <span class="text-[10px] font-bold leading-none">Cari</span>
      </button>

      <!-- Keranjang (CTA utama) -->
      <button
        @click="$emit('open-cart')"
        class="flex flex-col items-center gap-0.5 -mt-5 relative group"
        aria-label="Buka keranjang"
      >
        <div class="w-14 h-14 rounded-2xl bg-rose-600 text-white flex items-center justify-center shadow-xl shadow-rose-500/40 hover:shadow-rose-500/60 hover:-translate-y-1 transition-all duration-300 relative">
          <Icon name="ph:shopping-cart-simple-bold" class="w-6 h-6 transition-transform group-active:scale-90" />
          <!-- Badge count -->
          <ClientOnly>
            <span
              v-if="cartCount > 0"
              class="absolute -top-1.5 -right-1.5 bg-white text-rose-600 text-[9px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-rose-600 font-black shadow-sm animate-pulse-ring"
            >
              {{ cartCount > 9 ? '9+' : cartCount }}
            </span>
          </ClientOnly>
        </div>
        <span class="text-[10px] font-bold text-rose-600 leading-none mt-1">Keranjang</span>
      </button>

      <!-- Wishlist -->
      <NuxtLink
        to="/wishlist"
        class="flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-2xl transition-all duration-200 group"
        :class="isActive('/wishlist') ? 'text-rose-600' : 'text-(--text-muted) hover:text-rose-500'"
      >
        <Icon
          :name="isActive('/wishlist') ? 'ph:heart-fill' : 'ph:heart-bold'"
          class="w-5 h-5 transition-transform group-active:scale-90"
        />
        <span class="text-[10px] font-bold leading-none">Wishlist</span>
      </NuxtLink>

      <!-- Akun -->
      <NuxtLink
        to="/account"
        class="flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-2xl transition-all duration-200 group"
        :class="isActive('/account') ? 'text-rose-600' : 'text-(--text-muted) hover:text-rose-500'"
      >
        <Icon
          :name="isActive('/account') ? 'ph:user-circle-fill' : 'ph:user-circle-bold'"
          class="w-5 h-5 transition-transform group-active:scale-90"
        />
        <span class="text-[10px] font-bold leading-none">Akun</span>
      </NuxtLink>

    </div>
  </nav>
</template>

<script setup lang="ts">
defineEmits(['open-cart', 'open-search'])

const route = useRoute()
const cartStore = useCartStore()
const cartCount = computed(() => cartStore.totalItems)

const isActive = (path: string) => {
  if (path === '/') return route.path === '/'
  return route.path.startsWith(path)
}
</script>
