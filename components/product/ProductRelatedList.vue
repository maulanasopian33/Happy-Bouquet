<template>
  <div class="space-y-8 pb-10">
    <!-- Grid System -->
    <div 
      v-if="items.length > 0" 
      class="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
    >
      <ProductCard 
        v-for="item in items.slice(0, 4)" 
        :key="item.id" 
        v-bind="item" 
      />
    </div>

    <!-- Empty State Fallback -->
    <div 
      v-else 
      class="p-12 text-center bg-rose-50 dark:bg-rose-950/20 rounded-[2.5rem] border border-rose-100 dark:border-rose-900/30"
    >
      <Icon name="ph:flower-lotus-bold" class="w-12 h-12 text-rose-200 mx-auto mb-4" />
      <p class="text-sm font-bold text-muted uppercase tracking-widest">Mencari Buket Serupa...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import ProductCard from './ProductCard.vue'

defineProps<{ items: any[] }>()
</script>