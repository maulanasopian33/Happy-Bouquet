<template>
  <div class="card-premium p-6 md:p-8 space-y-6 overflow-hidden relative transition-colors duration-500">
    <!-- Floating Sparkles Decoration -->
    <Icon name="ph:sparkles-fill" class="absolute top-4 right-4 w-12 h-12 text-rose-500/10 pointer-events-none" />
    
    <div class="space-y-4">
      <div v-if="product.badge" class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 dark:bg-rose-950/40 text-rose-600 text-[10px] font-black uppercase tracking-widest border border-rose-100 dark:border-rose-900/30">
        <Icon name="ph:seal-check-fill" class="w-3.5 h-3.5" />
        {{ product.badge }}
      </div>

      <h1 class="text-3xl md:text-4xl lg:text-5xl font-black text-primary leading-tight">
        {{ product.title }}
      </h1>

      <div class="flex flex-wrap items-center gap-6">
        <div class="flex items-center gap-2">
          <div class="flex items-center gap-0.5">
            <Icon v-for="s in 5" :key="s" name="ph:star-fill" class="w-4 h-4 text-amber-400" />
          </div>
          <span class="text-sm font-black text-primary">4.9</span>
          <span class="text-xs font-bold text-muted uppercase tracking-widest">(1,2rb Ulasan)</span>
        </div>
        
        <div class="h-4 w-px bg-(--border-color) hidden sm:block"></div>
        
        <div class="flex items-center gap-2 font-bold text-sm text-secondary">
          <Icon name="ph:shopping-bag-open-bold" class="text-rose-600" />
          Terjual 5.400+
        </div>
      </div>
    </div>

    <!-- Pricing Area -->
    <div class="p-6 md:p-8 rounded-3xl bg-(--bg-section) border border-(--border-color) relative overflow-hidden group">
      <div class="absolute inset-0 bg-linear-to-br from-rose-50/50 to-transparent dark:from-rose-950/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
      
      <div class="relative z-10 space-y-4">
        <div class="flex items-center gap-3">
          <span class="px-2.5 py-1 rounded-lg bg-rose-600 text-white text-[10px] font-black uppercase tracking-widest shadow-lg shadow-rose-500/20">
            Penawaran Spesial
          </span>
          <p v-if="discountPercentage" class="text-xs font-black text-rose-600">
            Hemat {{ formatPrice(product.originalPrice - product.price) }} ({{ discountPercentage }}%)
          </p>
        </div>

        <div class="flex items-baseline gap-4">
          <span class="text-4xl md:text-5xl font-black text-rose-600 tracking-tight">
            {{ formatPrice(product.price) }}
          </span>
          <span v-if="product.originalPrice" class="text-xl font-bold text-muted line-through decoration-rose-400/50">
            {{ formatPrice(product.originalPrice) }}
          </span>
        </div>

        <div class="pt-4 border-t border-(--border-color) flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div class="flex items-center gap-2 text-xs font-bold text-muted uppercase tracking-wider">
            <Icon name="ph:check-circle-fill" class="text-emerald-500" />
            Harga sudah termasuk PPN 11%
          </div>
          <button class="flex items-center gap-2 text-xs font-black text-rose-600 uppercase tracking-widest hover:gap-3 transition-all shrink-0">
            <Icon name="ph:share-network-bold" />
            Bagikan
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ product: any }>()

const formatPrice = (v: number) => 
  new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(v)

const discountPercentage = computed(() => {
  if (!props.product.originalPrice || !props.product.price) return null
  const discount = ((props.product.originalPrice - props.product.price) / props.product.originalPrice) * 100
  return Math.round(discount)
})
</script>