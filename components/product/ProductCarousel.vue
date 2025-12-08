<template>
  <div class="relative">
    <swiper
      :modules="[SwiperNavigation, SwiperAutoplay,]"
      :slides-per-view="1.2"
      :space-between="30"
      :loop="true"
      :autoplay="{
        delay: 4000,
        disableOnInteraction: false,
      }"
      :navigation="{
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      }"
      :breakpoints="{
        640: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      }"
    >
      <swiper-slide v-for="product in products" :key="product.id">
        <ProductCard v-bind="product" />
      </swiper-slide>

      <!-- Tombol Navigasi Kustom -->
      <div class="swiper-button-prev absolute top-1/2 -translate-y-1/2 -left-4 z-10 cursor-pointer p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition hidden lg:block">
        <Icon name="ph:caret-left-bold" class="h-6 w-6 text-gray-800" />
      </div>
      <div class="swiper-button-next absolute top-1/2 -translate-y-1/2 -right-4 z-10 cursor-pointer p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition hidden lg:block">
        <Icon name="ph:caret-right-bold" class="h-6 w-6 text-gray-800" />
      </div>

    </swiper>
  </div>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation as SwiperNavigation, Autoplay as SwiperAutoplay } from 'swiper/modules';
import ProductCard from '~/components/product/ProductCard.vue';

defineProps({
  products: {
    type: Array,
    required: true
  }
})
</script>

<style>
/* Sembunyikan tombol navigasi default Swiper */
.swiper-button-next:after,
.swiper-button-prev:after {
  display: none;
}
</style>