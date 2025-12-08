<template>
  <div class="bg-linear-to-br from-rose-50 via-white to-pink-50 rounded-2xl p-5 shadow-md">
    <!-- Header -->
    <div class="flex items-center justify-between mb-4">
      <div>
        <h3 class="text-xl font-bold text-pink-600 tracking-wide">FLASH SALE</h3>
        <p class="text-sm text-gray-500">Berakhir dalam:</p>
      </div>
      <!-- Countdown Timer -->
      <div class="flex items-center gap-1.5">
        <div class="bg-white/80 backdrop-blur-sm border border-pink-100 rounded-md px-2.5 py-1.5 text-center">
          <p class="text-lg font-bold text-pink-600">{{ timeLeft.hours }}</p>
        </div>
        <span class="font-semibold text-pink-400">:</span>
        <div class="bg-white/80 backdrop-blur-sm border border-pink-100 rounded-md px-2.5 py-1.5 text-center">
          <p class="text-lg font-bold text-pink-600">{{ timeLeft.minutes }}</p>
        </div>
        <span class="font-semibold text-pink-400">:</span>
        <div class="bg-white/80 backdrop-blur-sm border border-pink-100 rounded-md px-2.5 py-1.5 text-center">
          <p class="text-lg font-bold text-pink-600">{{ timeLeft.seconds }}</p>
        </div>
      </div>
    </div>

    <!-- Product List -->
    <div class="grid grid-cols-1 gap-3">
      <div
        v-for="item in products"
        :key="item.id"
        class="flex items-center gap-4 bg-white rounded-xl p-3 border border-gray-100 hover:shadow-lg hover:border-pink-200 transition-all duration-300 group"
      >
        <img :src="item.image" class="w-20 h-20 object-cover rounded-lg" />
        <div class="flex-1">
          <p class="font-semibold text-gray-800 text-sm truncate">{{ item.name }}</p>
          <p class="text-sm font-bold text-pink-600 mt-1">
            {{ item.price }} 
            <span class="text-xs font-normal text-gray-400 line-through ml-1">{{ item.original }}</span>
          </p>
        </div>
        <button class="px-3 py-2 rounded-lg bg-pink-100 text-pink-600 group-hover:bg-pink-600 group-hover:text-white transition-colors duration-300">
          <Icon name="ph:shopping-bag-open-bold" class="h-5 w-5" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, reactive } from "vue";

const props = defineProps<{
  products: any[]
}>()

const timeLeft = reactive({
  hours: '00',
  minutes: '00',
  seconds: '00',
});

let intervalId: any = null;
const twoHoursFromNow = new Date().getTime() + 2 * 60 * 60 * 1000;

onMounted(() => {
  const updateCountdown = () => {
    const now = new Date().getTime();
    const distance = twoHoursFromNow - now;

    timeLeft.hours = String(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, '0');
    timeLeft.minutes = String(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
    timeLeft.seconds = String(Math.floor((distance % (1000 * 60)) / 1000)).padStart(2, '0');

    if (distance < 0) {
      clearInterval(intervalId);
      timeLeft.hours = timeLeft.minutes = timeLeft.seconds = '00';
    }
  };

  updateCountdown(); // Panggil sekali saat mount untuk menghindari delay 1 detik
  intervalId = setInterval(updateCountdown, 1000);
});

onUnmounted(() => {
  clearInterval(intervalId); // Membersihkan interval untuk mencegah memory leak
});
</script>
