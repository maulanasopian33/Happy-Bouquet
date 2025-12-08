<template>
  <div>
    <div class="flex items-center justify-between mb-4">
      <h3 class="text-lg font-semibold">Semua Produk</h3>

      <select class="border rounded px-3 py-2 text-sm">
        <option>Terbaru</option>
        <option>Harga: Rendah → Tinggi</option>
        <option>Harga: Tinggi → Rendah</option>
      </select>
    </div>

    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <ProductCard
        v-for="(product, i) in products"
         v-bind="product"
        :key="i"
        @view="$emit('view', $event)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import ProductCard from "./ProductCard.vue";

defineProps<{ products: any[] }>()
</script>
