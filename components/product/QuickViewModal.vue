<template>
  <div
    v-if="show"
    class="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
  >
    <div class="bg-white rounded-2xl p-6 w-full max-w-2xl">
      <div class="flex justify-between items-start">
        <h3 class="text-lg font-semibold">{{ product?.name }}</h3>
        <button class="text-gray-500" @click="$emit('close')">✕</button>
      </div>

      <div class="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <img :src="product?.image" class="rounded-lg w-full h-64 object-cover" />

        <div>
          <p class="text-pink-600 font-bold text-xl">{{ product?.price }}</p>
          <p class="text-sm text-gray-600 mt-2">{{ product?.description }}</p>

          <div class="mt-4 flex gap-2">
            <button class="px-4 py-2 rounded bg-pink-600 text-white">Tambah ke Keranjang</button>
            <button class="px-4 py-2 rounded border" @click="$emit('close')">Tutup</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  show: boolean
  product: any | null
}>()
</script>
