<template>
  <header
    class="sticky top-0 z-50 transition-all duration-500"
    :class="[
      isScrolled ? 'glass shadow-sm py-2' : 'bg-transparent py-3',
    ]"
  >
    <!-- Ticker Banner -->
    <TickerBanner v-if="!isScrolled" />

    <!-- Main Header Bar -->
    <div class="section-wrapper">
      <div class="flex items-center gap-3 lg:gap-5 py-1">

        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center gap-3 group shrink-0">
          <div class="w-10 h-10 rounded-2xl bg-gradient-to-br from-rose-500 to-rose-700 text-white font-black flex items-center justify-center shadow-lg group-hover:rotate-6 transition-all duration-300">
            <span class="text-base">HB</span>
          </div>
          <div class="hidden sm:block">
            <span class="block text-lg font-extrabold tracking-tight text-primary leading-none">
              Happy<span class="text-rose-600">Bouquet</span>
            </span>
            <p class="text-[9px] uppercase tracking-widest text-secondary font-medium mt-0.5">Premium Floral Art</p>
          </div>
        </NuxtLink>

        <!-- Center Search Bar (best-practice e-commerce placement) -->
        <div class="flex-1 max-w-xl hidden md:block">
          <div class="relative group">
            <Icon
              name="ph:magnifying-glass-bold"
              class="absolute left-4 top-1/2 -translate-y-1/2 text-secondary group-focus-within:text-rose-500 w-4 h-4 transition-colors"
            />
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Cari buket, kategori, atau momen..."
              class="w-full pl-11 pr-5 py-2.5 rounded-2xl text-sm font-medium transition-all duration-300 outline-none
                     bg-slate-100/80 dark:bg-slate-800/80 border border-transparent
                     focus:border-rose-400/50 focus:bg-white dark:focus:bg-slate-800
                     focus:ring-2 focus:ring-rose-500/20 text-primary placeholder:text-secondary"
              @keyup.enter="handleSearch"
            />
            <button
              v-if="searchQuery"
              @click="searchQuery = ''"
              class="absolute right-4 top-1/2 -translate-y-1/2 text-muted hover:text-rose-500 transition-colors"
            >
              <Icon name="ph:x-bold" class="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <!-- Desktop Nav -->
        <nav class="hidden lg:flex items-center gap-8 shrink-0">
          <NuxtLink
            v-for="link in navLinks"
            :key="link.path"
            :to="link.path"
            class="text-sm font-semibold text-secondary hover:text-rose-600 transition-all duration-300 relative group whitespace-nowrap"
          >
            {{ link.label }}
            <span class="absolute -bottom-1.5 left-0 w-0 h-0.5 bg-rose-600 transition-all duration-300 group-hover:w-full rounded-full" />
          </NuxtLink>
        </nav>

        <!-- Right Side Actions -->
        <div class="flex items-center gap-1.5 sm:gap-2 shrink-0 ml-auto lg:ml-0">

          <!-- Search icon (Mobile tap to open search) -->
          <button
            @click="isMobileSearchOpen = !isMobileSearchOpen"
            class="md:hidden w-9 h-9 rounded-xl flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 text-secondary transition-colors"
          >
            <Icon name="ph:magnifying-glass-bold" class="w-4.5 h-4.5" />
          </button>

          <!-- Wishlist -->
          <NuxtLink
            to="/wishlist"
            class="relative w-9 h-9 rounded-xl flex items-center justify-center hover:bg-rose-50 dark:hover:bg-rose-950/30 text-secondary hover:text-rose-600 transition-colors group"
            title="Wishlist"
          >
            <Icon name="ph:heart-bold" class="w-4.5 h-4.5 group-hover:scale-110 transition-transform" />
          </NuxtLink>

          <!-- Theme Toggle -->
          <button
            @click="toggleTheme"
            class="w-9 h-9 rounded-xl flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 text-secondary transition-colors"
            :title="isDark ? 'Mode Terang' : 'Mode Gelap'"
          >
            <Icon :name="isDark ? 'ph:sun-dim-fill' : 'ph:moon-stars-fill'" class="w-4.5 h-4.5 text-rose-500" />
          </button>

          <!-- Cart -->
          <button
            @click="openCart"
            class="group relative flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-rose-600 text-white shadow-md hover:shadow-rose-500/40 hover:-translate-y-0.5 transition-all duration-300 font-bold"
          >
            <Icon name="ph:shopping-cart-simple-bold" class="w-4.5 h-4.5" />
            <span class="hidden sm:inline text-xs font-bold">Keranjang</span>
            <ClientOnly>
              <span
                v-if="cartCount > 0"
                class="absolute -top-2 -right-2 bg-white text-rose-600 text-[10px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-rose-600 font-black shadow-sm"
              >{{ cartCount }}</span>
            </ClientOnly>
          </button>

          <!-- Mobile Menu Toggle -->
          <button
            @click="isMobileMenuOpen = !isMobileMenuOpen"
            class="lg:hidden w-9 h-9 rounded-xl flex flex-col items-center justify-center gap-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            :aria-label="isMobileMenuOpen ? 'Tutup menu' : 'Buka menu'"
          >
            <span
              class="block w-5 h-0.5 bg-secondary rounded-full transform transition-all duration-300"
              :class="isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''"
            />
            <span
              class="block w-5 h-0.5 bg-secondary rounded-full transition-all duration-300"
              :class="isMobileMenuOpen ? 'opacity-0 scale-x-0' : ''"
            />
            <span
              class="block w-5 h-0.5 bg-secondary rounded-full transform transition-all duration-300"
              :class="isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''"
            />
          </button>
        </div>
      </div>

      <!-- Mobile Search Bar (slide down) -->
      <Transition
        enter-active-class="transition-all duration-300 ease-out"
        enter-from-class="opacity-0 -translate-y-2 max-h-0"
        enter-to-class="opacity-100 translate-y-0 max-h-20"
        leave-active-class="transition-all duration-200 ease-in"
        leave-from-class="opacity-100 translate-y-0 max-h-20"
        leave-to-class="opacity-0 -translate-y-2 max-h-0"
      >
        <div v-if="isMobileSearchOpen" class="md:hidden pb-3 overflow-hidden">
          <div class="relative">
            <Icon
              name="ph:magnifying-glass-bold"
              class="absolute left-4 top-1/2 -translate-y-1/2 text-secondary w-4 h-4"
            />
            <input
              ref="mobileSearchInput"
              v-model="searchQuery"
              type="text"
              placeholder="Cari buket atau momen spesial..."
              class="w-full pl-11 pr-5 py-3 rounded-2xl text-sm font-medium transition-all duration-300 outline-none
                     bg-slate-100 dark:bg-slate-800 border border-transparent
                     focus:border-rose-400/50 focus:ring-2 focus:ring-rose-500/20 text-primary"
              @keyup.enter="handleSearch"
            />
          </div>
        </div>
      </Transition>
    </div>

    <!-- Mobile Drawer (Full Screen) -->
    <Transition
      enter-active-class="transition-opacity duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isMobileMenuOpen"
        class="fixed inset-0 z-[60] bg-white dark:bg-slate-950 lg:hidden overflow-y-auto"
      >
        <!-- Drawer Header -->
        <div class="flex items-center justify-between px-6 py-5 border-b border-slate-100 dark:border-slate-800">
          <NuxtLink to="/" class="flex items-center gap-3" @click="isMobileMenuOpen = false">
            <div class="w-9 h-9 rounded-xl bg-gradient-to-br from-rose-500 to-rose-700 text-white font-black flex items-center justify-center text-sm">
              HB
            </div>
            <span class="text-base font-extrabold text-primary">Happy<span class="text-rose-600">Bouquet</span></span>
          </NuxtLink>
          <button
            @click="isMobileMenuOpen = false"
            class="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-secondary hover:text-rose-600 transition-colors"
          >
            <Icon name="ph:x-bold" class="w-5 h-5" />
          </button>
        </div>

        <div class="px-6 py-6 flex flex-col gap-2">
          <!-- Main Nav -->
          <p class="text-[10px] font-bold text-muted uppercase tracking-widest mb-2">Menu Utama</p>
          <NuxtLink
            v-for="link in navLinks"
            :key="link.path"
            :to="link.path"
            @click="isMobileMenuOpen = false"
            class="flex items-center justify-between py-3.5 px-4 rounded-2xl text-base font-semibold text-primary hover:bg-rose-50 dark:hover:bg-rose-950/20 hover:text-rose-600 transition-all group"
          >
            <div class="flex items-center gap-3">
              <Icon :name="link.icon" class="w-5 h-5 text-rose-500" />
              {{ link.label }}
            </div>
            <Icon name="ph:caret-right-bold" class="w-4 h-4 text-muted group-hover:text-rose-500 transition-colors" />
          </NuxtLink>

          <div class="h-px bg-slate-100 dark:bg-slate-800 my-4" />

          <!-- Account Links -->
          <p class="text-[10px] font-bold text-muted uppercase tracking-widest mb-2">Akun & Lainnya</p>
          <NuxtLink
            to="/account"
            @click="isMobileMenuOpen = false"
            class="flex items-center gap-3 py-3.5 px-4 rounded-2xl text-base font-semibold text-primary hover:bg-rose-50 dark:hover:bg-rose-950/20 hover:text-rose-600 transition-all"
          >
            <Icon name="ph:user-circle-bold" class="w-5 h-5 text-rose-500" />
            Akun Saya
          </NuxtLink>
          <NuxtLink
            to="/wishlist"
            @click="isMobileMenuOpen = false"
            class="flex items-center gap-3 py-3.5 px-4 rounded-2xl text-base font-semibold text-primary hover:bg-rose-50 dark:hover:bg-rose-950/20 hover:text-rose-600 transition-all"
          >
            <Icon name="ph:heart-bold" class="w-5 h-5 text-rose-500" />
            Wishlist
          </NuxtLink>

          <div class="h-px bg-slate-100 dark:bg-slate-800 my-4" />

          <!-- Cart CTA -->
          <button
            @click="openCart; isMobileMenuOpen = false"
            class="w-full flex items-center justify-center gap-3 py-4 rounded-2xl bg-rose-600 text-white font-bold text-base shadow-lg hover:bg-rose-700 transition-colors"
          >
            <Icon name="ph:shopping-cart-simple-bold" class="w-5 h-5" />
            Lihat Keranjang
            <ClientOnly>
              <span v-if="cartCount > 0" class="bg-white/20 px-2 py-0.5 rounded-lg text-sm font-black">{{ cartCount }}</span>
            </ClientOnly>
          </button>
        </div>
      </div>
    </Transition>
  </header>
</template>

<script setup lang="ts">
const { isDark, toggleTheme } = useTheme()
const cartStore = useCartStore()
const cartCount = computed(() => cartStore.totalItems)
const openCart = () => cartStore.showCart(true)

const isMobileMenuOpen = ref(false)
const isMobileSearchOpen = ref(false)
const isScrolled = ref(false)
const searchQuery = ref('')
const mobileSearchInput = ref(null)

const navLinks = [
  { path: '/', label: 'Beranda', icon: 'ph:house-bold' },
  { path: '/products', label: 'Belanja', icon: 'ph:storefront-bold' },
  { path: '/about', label: 'Our Story', icon: 'ph:sparkle-bold' },
  { path: '/contact', label: 'Hubungi Kami', icon: 'ph:chat-circle-dots-bold' },
]

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    navigateTo(`/products?q=${encodeURIComponent(searchQuery.value.trim())}`)
    searchQuery.value = ''
    isMobileSearchOpen.value = false
  }
}

// Watch mobile search to auto-focus
watch(isMobileSearchOpen, async (val) => {
  if (val) {
    await nextTick()
    mobileSearchInput.value?.focus()
  }
})

// Scroll handler with cleanup
let scrollHandler: (() => void) | null = null
if (import.meta.client) {
  scrollHandler = () => {
    isScrolled.value = window.scrollY > 20
  }
  window.addEventListener('scroll', scrollHandler, { passive: true })
}

onUnmounted(() => {
  if (import.meta.client && scrollHandler) {
    window.removeEventListener('scroll', scrollHandler)
  }
})

// Close on route change
const route = useRoute()
watch(() => route.path, () => {
  isMobileMenuOpen.value = false
  isMobileSearchOpen.value = false
})
</script>
