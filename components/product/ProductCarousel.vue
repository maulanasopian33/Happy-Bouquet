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


const displayProducts = computed(() => props.products)
</script>

<style>
.carousel-btn-prev::after,
.carousel-btn-next::after,
.swiper-button-next::after,
.swiper-button-prev::after {
  display: none;
}
</style>