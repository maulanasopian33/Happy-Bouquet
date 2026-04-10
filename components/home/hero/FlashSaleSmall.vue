<template>
  <div class="relative flex items-center gap-4 group/small">
    <!-- Product Thumbnail -->
    <div class="w-20 h-20 rounded-2xl overflow-hidden shrink-0 border border-white/20">
      <img
        :src="product.image"
        :alt="product.name"
        class="w-full h-full object-cover group-hover/small:scale-110 transition-transform duration-500"
        loading="lazy"
      />
    </div>

    <!-- Product Info -->
    <div class="flex-1 min-w-0">
      <h4 class="text-white text-sm font-bold truncate mb-1">{{ product.name }}</h4>
      <div class="flex items-baseline gap-2 flex-wrap">
        <span class="text-white font-black text-base">{{ priceFormatted }}</span>
        <span class="text-rose-200/70 text-[11px] line-through font-medium">{{ product.original }}</span>
      </div>

      <!-- Stock Progress Bar -->
      <div class="mt-2 h-1.5 w-full bg-white/15 rounded-full overflow-hidden">
        <div
          class="h-full bg-amber-400 rounded-full transition-all duration-1000"
          :style="{ width: `${stockPercent}%` }"
        />
      </div>
      <p class="text-[10px] text-rose-100/80 mt-1 font-semibold">
        <span class="text-amber-300 font-black">{{ stockLeft }}</span> tersisa
      </p>
    </div>

    <!-- Link Overlay -->
    <NuxtLink :to="`/products/${product.id}`" class="absolute inset-0 z-10" :aria-label="`Lihat ${product.name}`" />
  </div>
</template>

<script setup>
const props = defineProps({
  product: {
    type: Object,
    required: true,
    default: () => ({})
  }
})

const priceFormatted = computed(() =>
  new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(props.product?.price ?? 0)
)

// Mock stock for visual interest
const stockPercent = computed(() => Math.floor(Math.random() * 40) + 20)
const stockLeft = computed(() => Math.floor(stockPercent.value / 10) + 3)
</script>
