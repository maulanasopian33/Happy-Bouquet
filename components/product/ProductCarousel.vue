<template>
  <div>
    <!-- Carousel -->
    <div class="relative">
      <swiper
        :modules="[SwiperNavigation, SwiperAutoplay]"
        :slides-per-view="1.15"
        :space-between="16"
        :loop="displayProducts.length > 2"
        :autoplay="{ delay: 4500, disableOnInteraction: false }"
        :navigation="{
          nextEl: '.carousel-btn-next',
          prevEl: '.carousel-btn-prev',
        }"
        :breakpoints="{
          480: { slidesPerView: 1.5, spaceBetween: 16 },
          640: { slidesPerView: 2, spaceBetween: 20 },
          900: { slidesPerView: 3, spaceBetween: 20 },
          1200: { slidesPerView: 4, spaceBetween: 24 },
        }"
      >
        <swiper-slide v-for="product in displayProducts" :key="product.id || product.name">
          <ProductCard v-bind="product" @view="$emit('view', $event)" />
        </swiper-slide>
      </swiper>

      <!-- Custom Nav Buttons -->
      <button
        class="carousel-btn-prev absolute top-1/2 -translate-y-1/2 -left-5 z-10 w-11 h-11 bg-[var(--bg-card)] rounded-full shadow-lg border border-[var(--border-color)]
               hover:bg-rose-600 hover:border-rose-600 hover:text-white hover:shadow-rose-500/20
               transition-all hidden lg:flex items-center justify-center group text-secondary"
      >
        <Icon name="ph:caret-left-bold" class="w-5 h-5" />
      </button>
      <button
        class="carousel-btn-next absolute top-1/2 -translate-y-1/2 -right-5 z-10 w-11 h-11 bg-[var(--bg-card)] rounded-full shadow-lg border border-[var(--border-color)]
               hover:bg-rose-600 hover:border-rose-600 hover:text-white hover:shadow-rose-500/20
               transition-all hidden lg:flex items-center justify-center group text-secondary"
      >
        <Icon name="ph:caret-right-bold" class="w-5 h-5" />
      </button>
    </div>
  </div>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation as SwiperNavigation, Autoplay as SwiperAutoplay } from 'swiper/modules'
import ProductCard from '~/components/product/ProductCard.vue'
import 'swiper/css'
import 'swiper/css/navigation'

const props = defineProps({
  title: { type: String, default: 'Rekomendasi Produk' },
  products: { type: Array, default: () => [] }
})

defineEmits(['view'])

const dummyProducts = [
  { id: 1, name: 'Buket Mawar Premium', price: 185000, rating: 4.8, reviewCount: 127, badge: 'Terlaris', category: 'Mawar', image: 'https://images.unsplash.com/photo-1487530811015-780d4d5af7d8?q=80&w=600&fit=crop' },
  { id: 2, name: 'Buket Wisuda Elegance', price: 250000, rating: 4.9, reviewCount: 89, badge: 'Baru', category: 'Wisuda', image: 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?q=80&w=600&fit=crop' },
  { id: 3, name: 'Mini Bouquet Anniversary', price: 120000, rating: 4.7, reviewCount: 54, badge: 'Diskon', category: 'Anniversary', image: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=600&fit=crop' },
  { id: 4, name: 'Buket Snack Unik', price: 150000, rating: 4.6, reviewCount: 38, badge: null, category: 'Snack', image: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?q=80&w=600&fit=crop' },
]

const displayProducts = computed(() => props.products.length > 0 ? props.products : dummyProducts)
</script>

<style>
.carousel-btn-prev::after,
.carousel-btn-next::after,
.swiper-button-next::after,
.swiper-button-prev::after {
  display: none;
}
</style>