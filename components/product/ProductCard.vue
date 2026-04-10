<template>
  <div
    class="group relative bg-(--bg-card) rounded-3xl border border-(--border-color) transition-all duration-500 overflow-hidden flex flex-col h-full"
    :style="{ boxShadow: 'var(--shadow-card)' }"
    @mouseenter="hovered = true"
    @mouseleave="hovered = false"
  >

    <!-- Image Section -->
    <div class="relative aspect-4/5 overflow-hidden shrink-0">
      <img
        :src="image || 'https://images.unsplash.com/photo-1547096301-4ebda79e93d7?q=80&w=600&fit=crop'"
        :alt="name"
        class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
        loading="lazy"
        width="400"
        height="500"
      />

      <!-- Gradient overlay on hover -->
      <div class="absolute inset-0 bg-linear-to-t from-slate-950/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <!-- TOP: Badge (always visible) + Wishlist -->
      <div class="absolute top-3 left-3 right-3 flex justify-between items-start z-20">
        <!-- Badge: always visible -->
        <span
          v-if="badge"
          class="px-2.5 py-1 rounded-xl text-[10px] font-black uppercase tracking-wider shadow-md"
          :class="badgeClass"
        >
          {{ badge }}
        </span>
        <span v-else class="w-0" />

        <!-- Wishlist button: always visible -->
        <button
          @click.prevent="toggleWishlist"
          class="w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-300 shadow-md"
          :class="isWishlisted
            ? 'bg-rose-600 text-white shadow-rose-500/30'
            : 'bg-white/85 dark:bg-slate-800/85 text-secondary hover:bg-rose-50 hover:text-rose-600 backdrop-blur-sm'"
          aria-label="Tambah ke wishlist"
        >
          <Icon
            :name="isWishlisted ? 'ph:heart-fill' : 'ph:heart-bold'"
            class="w-4 h-4"
          />
        </button>
      </div>

      <!-- Quick View Overlay (hover desktop + always on mobile) -->
      <div class="absolute bottom-3 left-3 right-3 z-20 flex items-center gap-2 md:opacity-0 md:translate-y-3 md:group-hover:opacity-100 md:group-hover:translate-y-0 transition-all duration-400">
        <button
          @click.prevent="$emit('view', { id, name, price, image, description, options, rating, reviewCount, badge, category })"
          class="flex-1 py-2 px-3 rounded-xl bg-white/90 dark:bg-slate-800/90 backdrop-blur-md text-primary text-xs font-semibold hover:bg-white dark:hover:bg-slate-700 transition-colors flex items-center justify-center gap-1.5 shadow"
        >
          <Icon name="ph:eye-bold" class="w-3.5 h-3.5" />
          Quick View
        </button>
      </div>

      <!-- Full link overlay -->
      <NuxtLink :to="`/products/${id}`" class="absolute inset-0 z-10" :aria-label="`Lihat detail ${name}`" />
    </div>

    <!-- Content Section -->
    <div class="p-4 sm:p-5 flex flex-col flex-1 gap-3">

      <!-- Rating -->
      <div class="flex items-center gap-1.5">
        <div class="flex items-center gap-0.5">
          <Icon
            v-for="i in 5"
            :key="i"
            name="ph:star-fill"
            class="w-3 h-3"
            :class="i <= Math.round(rating || 5) ? 'text-amber-400' : 'text-slate-200 dark:text-slate-700'"
          />
        </div>
        <span class="text-[10px] font-bold text-secondary">
          {{ (rating || 5).toFixed(1) }}
        </span>
        <span class="text-[10px] text-muted">({{ reviewCount || 0 }})</span>
      </div>

      <!-- Category + Name -->
      <div class="space-y-0.5">
        <p v-if="category" class="text-[10px] font-bold text-rose-500 uppercase tracking-widest">
          {{ category }}
        </p>
        <h3 class="text-sm sm:text-base font-bold text-primary group-hover:text-rose-600 transition-colors line-clamp-2 leading-snug">
          {{ name }}
        </h3>
      </div>

      <!-- Price + Add to Cart -->
      <div class="mt-auto flex items-center justify-between gap-3 pt-1">
        <div>
          <p class="text-[9px] text-muted font-semibold uppercase tracking-widest leading-none mb-0.5">Mulai dari</p>
          <!-- Harga coret jika ada originalPrice -->
          <p v-if="originalPrice" class="text-[10px] text-muted line-through leading-none mb-0.5">
            {{ originalPriceFormatted }}
          </p>
          <p class="text-base sm:text-lg font-black text-rose-600 tracking-tight leading-none">
            {{ priceFormatted }}
          </p>
        </div>

        <!-- Add to Cart Button -->
        <button
          @click.prevent="handleAddToCart"
          class="shrink-0 w-10 h-10 rounded-2xl bg-rose-600 text-white flex items-center justify-center shadow-md hover:bg-rose-700 hover:shadow-rose-500/30 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 active:scale-95"
          :class="addedToCart ? 'bg-emerald-500 hover:bg-emerald-600' : 'bg-rose-600 hover:bg-rose-700'"
          aria-label="Tambah ke keranjang"
        >
          <Icon
            :name="addedToCart ? 'ph:check-bold' : 'ph:shopping-cart-simple-bold'"
            class="w-4.5 h-4.5 transition-all"
          />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  id: Number,
  name: String,
  price: [Number, String],
  originalPrice: [Number, String],
  image: String,
  description: String,
  options: Object,
  rating: Number,
  reviewCount: Number,
  badge: String,
  category: String,
})

defineEmits(['view'])

const productModal = useProductModalStore()
const wishlistStore = useWishlistStore()

const hovered = ref(false)
const isWishlisted = computed(() => wishlistStore.isWishlisted(props.id!))
const addedToCart = ref(false)

const handleAddToCart = () => {
  productModal.openModal(props)
  addedToCart.value = true
  setTimeout(() => { addedToCart.value = false }, 2000)
}

const toggleWishlist = () => {
  wishlistStore.toggleItem(props)
}

const priceFormatted = computed(() => {
  const val = Number(props.price)
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(val || 0)
})

const originalPriceFormatted = computed(() => {
  const val = props.originalPrice != null ? Number(props.originalPrice) : null
  return val != null
    ? new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(val)
    : ''
})

const badgeClass = computed(() => {
  const map: Record<string, string> = {
    'Terlaris': 'bg-rose-600 text-white',
    'Baru': 'bg-sky-500 text-white',
    'Diskon': 'bg-emerald-500 text-white',
    'Hot': 'bg-amber-500 text-white',
  }
  return map[props.badge ?? ''] ?? 'bg-slate-800 text-white'
})
</script>
