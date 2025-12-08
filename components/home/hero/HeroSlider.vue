<template>
  <div class="relative rounded-3xl overflow-hidden shadow-lg">
    <swiper
      :modules="[Autoplay, Pagination, Navigation]"
      :loop="true"
      :autoplay="{ delay: 5000 }"
      :pagination="{ clickable: true }"
      :navigation="{
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      }"
      class="mySwiperHero"
    >
      <swiper-slide v-for="(img, i) in images" :key="i">
        <img :src="img" class="w-full h-80 object-cover" />
      </swiper-slide>
    </swiper>
  </div>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
// Import modul dari path spesifik mereka
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

interface Props {
  images: string[]
}

const props = withDefaults(defineProps<Props>(), {
  images: () => [
    "https://images.unsplash.com/photo-1519741497674-611481863552?q=80",
    "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?q=80",
    "https://images.unsplash.com/photo-1520975916680-8f6b1f0d6f11?q=80",
  ]
})
</script>

<style scoped>
.mySwiperHero :deep(.swiper-pagination-bullet-active) {
  background: #ec4899;
}

/* Sembunyikan panah default dari swiper */
.swiper-button-next::after,
.swiper-button-prev::after {
  display: none;
}
</style>
