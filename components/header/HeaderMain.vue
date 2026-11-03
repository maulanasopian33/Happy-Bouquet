<template>
  <header
    class="noir-shell sticky top-0 z-50 transition-all duration-500 border-b"
    :class="isScrolled ? 'border-[var(--noir-line)] shadow-[0_4px_20px_rgba(0,0,0,0.4)] py-2' : 'border-transparent py-3'"
  >
    <!-- Ticker Banner -->
    <TickerBanner v-if="!isScrolled" />

    <!-- Main Header Bar -->
    <div class="section-wrapper">
      <div class="flex items-center gap-3 lg:gap-5 py-1">

        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center gap-3 group shrink-0">
          <div class="w-10 h-10 rounded-full border border-[var(--noir-gold)]/40 bg-[var(--noir-card)] flex items-center justify-center group-hover:border-[var(--noir-gold)] transition-colors">
            <NuxtImg src="/icon.png" alt="HappyBouquet Logo" class="w-6 h-6" width="24" height="24" @error="onImgError" />
          </div>
          <div class="hidden sm:block">
            <span class="block noir-display text-lg font-semibold tracking-tight text-[var(--noir-champagne)] leading-none">
              Happy<span class="text-[var(--noir-gold)]">Bouquet</span>
            </span>
            <p class="text-[9px] uppercase tracking-[0.2em] text-[var(--noir-champagne-dim)] font-semibold mt-0.5">Premium Floral Art</p>
          </div>
        </NuxtLink>

        <!-- Center Search Bar -->
        <div class="flex-1 max-w-xl hidden md:block">
          <div class="relative group">
            <Icon
              name="ph:magnifying-glass-bold"
              class="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--noir-champagne-dim)] group-focus-within:text-[var(--noir-gold)] w-4 h-4 transition-colors"
            />
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Cari buket, kategori, atau momen..."
              class="w-full pl-11 pr-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 outline-none
                     bg-[var(--noir-raised)] border border-[var(--noir-champagne-dim)]/15
                     focus:border-[var(--noir-gold)] focus:ring-2 focus:ring-[var(--noir-gold)]/20
                     text-[var(--noir-champagne)] placeholder:text-[var(--noir-champagne-dim)]"
              @keyup.enter="handleSearch"
            />
            <button
              v-if="searchQuery"
              @click="searchQuery = ''"
              class="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--noir-champagne-dim)] hover:text-[var(--noir-gold)] transition-colors"
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
            class="text-sm font-semibold text-[var(--noir-champagne-dim)] hover:text-[var(--noir-gold)] transition-all duration-300 relative group whitespace-nowrap"
          >
            {{ link.label }}
            <span class="absolute -bottom-1.5 left-0 w-0 h-0.5 bg-[var(--noir-gold)] transition-all duration-300 group-hover:w-full rounded-full" />
          </NuxtLink>
        </nav>

        <!-- Right Side Actions -->
        <div class="flex items-center gap-1.5 sm:gap-2 shrink-0 ml-auto lg:ml-0">

          <!-- Search icon (Mobile) -->
          <button
            @click="isMobileSearchOpen = !isMobileSearchOpen"
            class="md:hidden w-10 h-10 rounded-xl flex items-center justify-center hover:bg-[var(--noir-raised)] text-[var(--noir-champagne-dim)] hover:text-[var(--noir-gold)] transition-colors"
          >
            <Icon name="ph:magnifying-glass-bold" class="w-4.5 h-4.5" />
          </button>

          <!-- Wishlist -->
          <NuxtLink
            to="/wishlist"
            class="relative w-10 h-10 rounded-xl flex items-center justify-center hover:bg-[var(--noir-raised)] text-[var(--noir-champagne-dim)] hover:text-[var(--noir-gold)] transition-colors group"
            title="Wishlist"
          >
            <Icon name="ph:heart-bold" class="w-4.5 h-4.5 group-hover:scale-110 transition-transform" />
          </NuxtLink>

          <!-- Cart (desktop — di mobile sudah ada CTA di MobileBottomBar) -->
          <button
            @click="openCart"
            class="hidden! md:inline-flex! group relative btn-gold px-3.5 py-2 text-sm"
          >
            <Icon name="ph:shopping-cart-simple-bold" class="w-4.5 h-4.5" />
            <span class="hidden sm:inline text-xs font-bold">Keranjang</span>
            <ClientOnly>
              <span
                v-if="cartCount > 0"
                class="absolute -top-2 -right-2 bg-[var(--noir-canvas)] text-[var(--noir-gold)] text-xs w-5 h-5 rounded-full flex items-center justify-center border-2 border-[var(--noir-gold)] font-black shadow-sm"
              >{{ cartCount }}</span>
            </ClientOnly>
          </button>

          <!-- Mobile Menu Toggle -->
          <button
            @click="isMobileMenuOpen = !isMobileMenuOpen"
            class="lg:hidden w-10 h-10 rounded-xl flex flex-col items-center justify-center gap-1.5 hover:bg-[var(--noir-raised)] transition-colors"
            :aria-label="isMobileMenuOpen ? 'Tutup menu' : 'Buka menu'"
          >
            <span
              class="block w-5 h-0.5 bg-[var(--noir-champagne-dim)] rounded-full transform transition-all duration-300"
              :class="isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''"
            />
            <span
              class="block w-5 h-0.5 bg-[var(--noir-champagne-dim)] rounded-full transition-all duration-300"
              :class="isMobileMenuOpen ? 'opacity-0 scale-x-0' : ''"
            />
            <span
              class="block w-5 h-0.5 bg-[var(--noir-champagne-dim)] rounded-full transform transition-all duration-300"
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
              class="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--noir-champagne-dim)] w-4 h-4"
            />
            <input
              ref="mobileSearchInput"
              v-model="searchQuery"
              type="text"
              placeholder="Cari buket atau momen spesial..."
              class="w-full pl-11 pr-5 py-3 rounded-full text-sm font-medium transition-all duration-300 outline-none
                     bg-[var(--noir-raised)] border border-[var(--noir-champagne-dim)]/15
                     focus:border-[var(--noir-gold)] focus:ring-2 focus:ring-[var(--noir-gold)]/20
                     text-[var(--noir-champagne)] placeholder:text-[var(--noir-champagne-dim)]"
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
        class="noir-shell fixed inset-0 z-[60] lg:hidden overflow-y-auto"
      >
        <!-- Drawer Header -->
        <div class="flex items-center justify-between px-6 py-5 border-b border-[var(--noir-line)]">
          <NuxtLink to="/" class="flex items-center gap-3" @click="isMobileMenuOpen = false">
            <div class="w-9 h-9 rounded-full border border-[var(--noir-gold)]/40 bg-[var(--noir-card)] flex items-center justify-center">
              <NuxtImg src="/icon.png" alt="HappyBouquet Logo" class="w-5 h-5" width="20" height="20" @error="onImgError" />
            </div>
            <span class="noir-display text-base font-semibold text-[var(--noir-champagne)]">Happy<span class="text-[var(--noir-gold)]">Bouquet</span></span>
          </NuxtLink>
          <button
            @click="isMobileMenuOpen = false"
            class="w-10 h-10 rounded-xl bg-[var(--noir-raised)] flex items-center justify-center text-[var(--noir-champagne-dim)] hover:text-[var(--noir-gold)] transition-colors"
          >
            <Icon name="ph:x-bold" class="w-5 h-5" />
          </button>
        </div>

        <div class="px-6 py-6 flex flex-col gap-2">
          <!-- Main Nav -->
          <p class="label-crest mb-2">Menu Utama</p>
          <NuxtLink
            v-for="link in navLinks"
            :key="link.path"
            :to="link.path"
            @click="isMobileMenuOpen = false"
            class="flex items-center justify-between py-3.5 px-4 rounded-xl text-base font-semibold text-[var(--noir-champagne)] hover:bg-[var(--noir-raised)] hover:text-[var(--noir-gold)] transition-all group"
          >
            <div class="flex items-center gap-3">
              <Icon :name="link.icon" class="w-5 h-5 text-[var(--noir-gold)]" />
              {{ link.label }}
            </div>
            <Icon name="ph:caret-right-bold" class="w-4 h-4 text-[var(--noir-champagne-dim)] group-hover:text-[var(--noir-gold)] transition-colors" />
          </NuxtLink>

          <div class="h-px bg-[var(--noir-line)] my-4" />

          <!-- Account Links -->
          <p class="label-crest mb-2">Akun & Lainnya</p>
          <NuxtLink
            to="/account"
            @click="isMobileMenuOpen = false"
            class="flex items-center gap-3 py-3.5 px-4 rounded-xl text-base font-semibold text-[var(--noir-champagne)] hover:bg-[var(--noir-raised)] hover:text-[var(--noir-gold)] transition-all"
          >
            <Icon name="ph:user-circle-bold" class="w-5 h-5 text-[var(--noir-gold)]" />
            Akun Saya
          </NuxtLink>
          <NuxtLink
            to="/wishlist"
            @click="isMobileMenuOpen = false"
            class="flex items-center gap-3 py-3.5 px-4 rounded-xl text-base font-semibold text-[var(--noir-champagne)] hover:bg-[var(--noir-raised)] hover:text-[var(--noir-gold)] transition-all"
          >
            <Icon name="ph:heart-bold" class="w-5 h-5 text-[var(--noir-gold)]" />
            Wishlist
          </NuxtLink>

          <div class="h-px bg-[var(--noir-line)] my-4" />

          <!-- Cart CTA -->
          <button
            @click="openCart(); isMobileMenuOpen = false"
            class="btn-gold w-full py-4 text-base"
          >
            <Icon name="ph:shopping-cart-simple-bold" class="w-5 h-5" />
            Lihat Keranjang
            <ClientOnly>
              <span v-if="cartCount > 0" class="bg-[#141416]/20 px-2 py-0.5 rounded-lg text-sm font-black">{{ cartCount }}</span>
            </ClientOnly>
          </button>
        </div>
      </div>
    </Transition>
  </header>
</template>

<script setup lang="ts">
const onImgError = (e: Event) => {
  const t = e.target as HTMLImageElement | null
  if (t?.src && !t.src.endsWith('/default.png')) t.src = '/default.png'
}
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
  if (import.meta.client) {
    if (scrollHandler) window.removeEventListener('scroll', scrollHandler)
    document.body.style.overflow = ''
  }
})

// Close on route change + scroll-lock body saat drawer terbuka
const route = useRoute()
watch(() => route.path, () => {
  isMobileMenuOpen.value = false
  isMobileSearchOpen.value = false
})

watch(isMobileMenuOpen, (open) => {
  if (import.meta.client) document.body.style.overflow = open ? 'hidden' : ''
})
</script>
