<template>
  <div @click="handleAddToCart" class="bg-white rounded-2xl shadow-sm border border-gray-100 group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer">
    <div class="overflow-hidden relative">
      <img :src="image" :alt="name" class="rounded-t-2xl w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
    </div>

    <div class="p-4">
      <h3 class="font-semibold text-gray-800 truncate" :title="name">{{ name }}</h3>
      
      <!-- Bintang Review -->
      <div v-if="rating && reviewCount" class="flex items-center mt-1.5">
        <div class="flex items-center">
          <Icon v-for="i in 5" :key="i" name="ph:star-fill" class="h-4 w-4" :class="i <= Math.round(rating) ? 'text-yellow-400' : 'text-gray-300'" />
        </div>
        <span class="text-xs text-gray-500 ml-2">({{ reviewCount }} ulasan)</span>
      </div>

      <div class="mt-3 flex items-center justify-between">
        <p class="text-base font-bold text-pink-600" :class="{ 'mt-1': !rating }">{{ priceFormatted }}</p>

        <button
          @click.stop="handleAddToCart" 
          class="relative z-20 flex items-center justify-center w-10 h-10 rounded-full bg-pink-100 text-pink-600 transition-all duration-300 group-hover:bg-pink-600 group-hover:text-white"
          aria-label="Tambah ke keranjang"
        >
          <Icon name="ph:plus-bold" class="h-5 w-5" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  id: Number,
  name: String,
  price: Number,
  image: String,
  description: String,
  options: Object,
  rating: Number,
  reviewCount: Number
})

const cart = useCartStore()
const productModal = useProductModalStore()

const handleAddToCart = () => {
  productModal.openModal(props)
}

const priceFormatted = computed(() =>
  new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(props.price)
)
</script>
