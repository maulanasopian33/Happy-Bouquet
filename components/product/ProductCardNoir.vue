<template>
  <div
    class="noir-card group relative p-4 flex flex-col justify-between transition-all duration-300 hover:border-[var(--noir-gold)]/60 h-full"
  >
    <div>
      <!-- Image -->
      <div class="relative w-full aspect-square rounded-xl overflow-hidden mb-3 bg-[var(--noir-raised)]">
        <NuxtImg
          :src="image || '/default.png'"
          :alt="name"
          class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          width="400"
          height="400"
          @error="onImgError"
        />

        <span
          v-if="badge"
          class="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full bg-[var(--noir-gold)] text-[#141416] label-crest !text-[10px]"
        >
          {{ badge }}
        </span>

        <!-- Wishlist (ClientOnly — localStorage baru terbaca di client) -->
        <ClientOnly>
          <button
            class="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-[var(--noir-canvas)]/80 backdrop-blur-sm border border-[var(--noir-champagne-dim)]/30 flex items-center justify-center transition-colors"
            :class="isWishlisted ? 'text-[var(--noir-gold)]' : 'text-[var(--noir-champagne-dim)] hover:text-[var(--noir-gold)]'"
            :aria-label="isWishlisted ? 'Hapus dari wishlist' : 'Tambah ke wishlist'"
            @click.prevent="toggleWishlist"
          >
            <Icon :name="isWishlisted ? 'ph:heart-fill' : 'ph:heart-bold'" class="w-4 h-4" />
          </button>
          <template #fallback>
            <button
              class="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-[var(--noir-canvas)]/80 backdrop-blur-sm border border-[var(--noir-champagne-dim)]/30 flex items-center justify-center text-[var(--noir-champagne-dim)]"
              aria-label="Tambah ke wishlist"
              tabindex="-1"
            >
              <Icon name="ph:heart-bold" class="w-4 h-4" />
            </button>
          </template>
        </ClientOnly>

        <span class="absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded-md bg-[var(--noir-canvas)]/90 backdrop-blur-sm text-[var(--noir-gold)] text-[11px] font-semibold flex items-center gap-1 border border-[var(--noir-gold)]/20">
          <Icon name="ph:bolt-fill" class="w-3 h-3" />
          Kirim Hari Ini
        </span>

        <NuxtLink :to="`/products/${slug ?? id}`" class="absolute inset-0 z-10" :aria-label="`Lihat detail ${name}`" />
      </div>

      <!-- Rating -->
      <div class="flex items-center gap-1.5 mb-1">
        <div class="flex items-center text-[var(--noir-gold)]">
          <Icon name="ph:star-fill" class="w-3.5 h-3.5" />
          <span class="font-bold text-[var(--noir-champagne)] text-xs ml-0.5">{{ (rating || 4.5).toFixed(1) }}</span>
        </div>
        <span class="text-[var(--noir-champagne-dim)] text-xs">({{ reviewCount || 0 }} ulasan)</span>
      </div>

      <h3 class="noir-display text-[17px] text-[var(--noir-champagne)] font-semibold leading-snug group-hover:text-[var(--noir-gold)] transition-colors line-clamp-2">
        {{ name }}
      </h3>
    </div>

    <!-- Price + Add to cart -->
    <div class="mt-4 pt-3 flex items-center justify-between border-t border-[var(--noir-line)]">
      <div class="flex flex-col">
        <span class="label-crest !text-[10px] text-[var(--noir-champagne-dim)]">Mulai Dari</span>
        <span class="price-gold text-lg leading-tight">{{ priceFormatted }}</span>
      </div>
      <button
        class="w-10 h-10 rounded-full bg-[var(--noir-gold)] hover:bg-[var(--noir-gold-hover)] text-[#141416] flex items-center justify-center shadow-md transition-transform hover:scale-105 active:scale-95"
        :aria-label="`Tambah ${name} ke keranjang`"
        @click.prevent="handleAddToCart"
      >
        <Icon :name="addedToCart ? 'ph:check-bold' : 'ph:shopping-bag-bold'" class="w-5 h-5" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  id: Number,
  slug: String,
  name: String,
  price: [Number, String],
  image: String,
  rating: Number,
  reviewCount: Number,
  badge: String,
  category: [String, Object],
})

const productModal = useProductModalStore()
const wishlistStore = useWishlistStore()

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

const priceFormatted = computed(() =>
  new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(Number(props.price) || 0)
)

// Gambar gagal load (404 remote) -> default.png (hindari loop; target bisa null)
const onImgError = (e: Event) => {
  const t = e.target as HTMLImageElement | null
  if (t?.src && !t.src.endsWith('/default.png')) t.src = '/default.png'
}
</script>
