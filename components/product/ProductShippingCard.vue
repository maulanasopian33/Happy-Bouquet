// File: components/product/ProductShippingCard.vue
<template>
  <div class="bg-white rounded-2xl shadow-sm p-4 space-y-2 text-xs text-gray-600">
    <div class="flex items-center gap-2">
      <span class="material-icons text-[18px] text-pink-600">local_shipping</span>
      <p class="font-semibold text-xs text-gray-800">Pengiriman</p>
    </div>
    <p>Ongkir mulai dari {{ formatPrice(shipping.basePrice) }} dari {{ shipping.origin }}</p>
    <p class="text-pink-600">Estimasi tiba: {{ shipping.eta }}</p>
  </div>
</template>

<script setup>
const props = defineProps({ shipping: { type: Object, required: true } })
function formatPrice(v) { return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(v) }
</script>