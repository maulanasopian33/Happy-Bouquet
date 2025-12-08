<template>
  <div class="bg-white rounded-2xl p-5 shadow-md border">
    <h4 class="font-bold text-xl text-gray-800 mb-4">Apa Kata Mereka?</h4>

    <swiper :modules="[Autoplay]" :loop="true" :autoplay="{ delay: 5000 }">
      <swiper-slide v-for="(item, i) in testimonials" :key="i" class="p-1">
        <div class="flex flex-col items-center text-center">
          <img :src="item.avatar" class="w-16 h-16 rounded-full mb-3 border-2 border-pink-100" />
          <p class="text-gray-700 italic">"{{ item.text }}"</p>
          <p class="text-sm font-semibold text-gray-800 mt-3">— {{ item.name }}</p>
          <p class="text-xs text-gray-400">{{ item.location }}</p>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

withDefaults(defineProps<{
  testimonials: { text: string; name: string; location: string; avatar: string }[]
}>(), {
  testimonials: () => [
    { text: "Buketnya fresh & cantik banget! Pengiriman juga cepat. Sangat direkomendasikan.", name: "Rina Amelia", location: "Jakarta", avatar: "https://i.pravatar.cc/150?img=1" },
    { text: "Pesan buket snack untuk wisuda adik, hasilnya rapi dan sesuai ekspektasi. Adik saya suka banget!", name: "Dedi Setiawan", location: "Bandung", avatar: "https://i.pravatar.cc/150?img=3" },
    { text: "Pelayanannya ramah dan sangat membantu saat konsultasi buket custom. Hasilnya luar biasa!", name: "Siti Nurhaliza", location: "Surabaya", avatar: "https://i.pravatar.cc/150?img=5" }
  ]
})
</script>
