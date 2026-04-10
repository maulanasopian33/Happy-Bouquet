<template>
  <div class="card-premium p-4 md:p-6 space-y-6 relative group/gallery transition-all duration-700">
    <!-- Floating Quick Actions (Share/Favorite) -->
    <div class="absolute top-8 right-8 z-20 flex flex-col gap-3 opacity-0 group-hover/gallery:opacity-100 translate-x-4 group-hover/gallery:translate-x-0 transition-all duration-500">
      <button 
        @click="toggleWishlist"
        class="w-10 h-10 rounded-xl shadow-xl flex items-center justify-center transition-all active:scale-95"
        :class="isWishlisted ? 'bg-rose-600 text-white' : 'bg-white/90 dark:bg-slate-900/90 backdrop-blur-md text-secondary hover:text-rose-600 hover:scale-110'"
      >
        <Icon :name="isWishlisted ? 'ph:heart-fill' : 'ph:heart-bold'" class="w-5 h-5" />
      </button>
      <button 
        @click="shareProduct"
        class="w-10 h-10 rounded-xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-xl flex items-center justify-center text-secondary hover:text-rose-600 hover:scale-110 active:scale-95 transition-all"
      >
        <Icon name="ph:share-network-bold" class="w-5 h-5" />
      </button>
    </div>

    <!-- Main Exhibition Image -->
    <div class="relative overflow-hidden rounded-4xl aspect-square bg-(--bg-section) shadow-inner border border-(--border-color)">
      <Transition name="fade-zoom" mode="out-in">
        <img 
          :key="activeIndex"
          :src="images[activeIndex]" 
          :alt="`Galeri produk ${activeIndex + 1}`"
          class="w-full h-full object-cover transition-all duration-1000 transform group-hover/gallery:scale-105"
        />
      </Transition>
      
      <!-- Overlay Gradient -->
      <div class="absolute inset-0 bg-linear-to-t from-black/10 to-transparent pointer-events-none"></div>
    </div>

    <!-- Interactive Thumbnails -->
    <div class="flex items-center gap-4 py-2 overflow-x-auto scroll-hide">
      <button 
        v-for="(src, i) in images" 
        :key="i"
        @click="setActive(i)"
        class="relative shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden border-2 transition-all duration-500 p-0.5"
        :class="activeIndex === i ? 'border-rose-600 scale-105 shadow-lg shadow-rose-500/20' : 'border-transparent opacity-50 grayscale hover:grayscale-0 hover:opacity-100'"
      >
        <img :src="src" class="w-full h-full object-cover rounded-xl" />
        <!-- Active Indicator Dot -->
        <div v-if="activeIndex === i" class="absolute bottom-1 right-1 w-2 h-2 bg-rose-600 rounded-full border-2 border-white dark:border-slate-900 transition-all scale-100 shadow-lg"></div>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ 
  images: string[];
  modelValue: number;
  product?: any;
}>()

const emit = defineEmits(['update:modelValue'])
const activeIndex = computed(() => props.modelValue)

const wishlistStore = useWishlistStore()
const isWishlisted = computed(() => props.product ? wishlistStore.isWishlisted(props.product.id) : false)

function setActive(i: number) {
  emit('update:modelValue', i)
}

function toggleWishlist() {
  if (props.product) {
    wishlistStore.toggleItem(props.product)
  }
}

function shareProduct() {
  if (navigator.share) {
    navigator.share({
      title: props.product?.title || 'HappyBouquet',
      text: 'Lihat buket cantik ini!',
      url: window.location.href
    })
  } else {
    alert('Link disalin ke clipboard!')
    navigator.clipboard.writeText(window.location.href)
  }
}
</script>

<style scoped>
.fade-zoom-enter-active,
.fade-zoom-leave-active {
  transition: all 0.6s cubic-bezier(0.22, 1, 0.36, 1);
}

.fade-zoom-enter-from {
  opacity: 0;
  transform: scale(0.95) scaleX(0.98);
  filter: blur(8px);
}

.fade-zoom-leave-to {
  opacity: 0;
  transform: scale(1.05) scaleX(1.02);
  filter: blur(8px);
}

/* Hide scrollbar but keep functionality */
.scroll-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.scroll-hide::-webkit-scrollbar {
  display: none;
}
</style>
