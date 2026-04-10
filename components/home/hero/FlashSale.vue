<template>
  <div class="bg-gradient-to-br from-rose-500 to-pink-500 rounded-3xl p-5 shadow-lg text-white">
    <!-- Header -->
    <div class="flex items-center justify-between mb-4">
      <div>
        <div class="flex items-center gap-2 mb-1">
          <span class="text-xl">⚡</span>
          <h3 class="text-xl font-bold tracking-wide" style="font-family: var(--font-heading);">FLASH SALE</h3>
        </div>
        <p class="text-pink-100 text-xs">Berakhir dalam:</p>
      </div>
      <!-- Countdown Timer -->
      <div class="flex items-center gap-1">
        <div class="bg-white/20 backdrop-blur-sm rounded-xl px-2.5 py-1.5 text-center min-w-[2.25rem]">
          <p class="text-lg font-bold leading-none">{{ timeLeft.hours }}</p>
          <p class="text-pink-200 text-[10px] mt-0.5">Jam</p>
        </div>
        <span class="font-bold text-pink-200 pb-4">:</span>
        <div class="bg-white/20 backdrop-blur-sm rounded-xl px-2.5 py-1.5 text-center min-w-[2.25rem]">
          <p class="text-lg font-bold leading-none">{{ timeLeft.minutes }}</p>
          <p class="text-pink-200 text-[10px] mt-0.5">Min</p>
        </div>
        <span class="font-bold text-pink-200 pb-4">:</span>
        <div class="bg-white/20 backdrop-blur-sm rounded-xl px-2.5 py-1.5 text-center min-w-[2.25rem]">
          <p class="text-lg font-bold leading-none">{{ timeLeft.seconds }}</p>
          <p class="text-pink-200 text-[10px] mt-0.5">Det</p>
        </div>
      </div>
    </div>

    <!-- Product List -->
    <div class="flex flex-col gap-3">
      <div
        v-for="item in displayProducts"
        :key="item.id || item.name"
        class="flex items-center gap-3 bg-white/15 backdrop-blur-sm rounded-2xl p-3 hover:bg-white/25 transition-colors duration-200 cursor-pointer group"
      >
        <img
          :src="item.image || 'https://images.unsplash.com/photo-1487530811015-780d4d5af7d8?q=80&w=200&fit=crop'"
          :alt="item.name"
          class="w-16 h-16 object-cover rounded-xl flex-shrink-0"
        />
        <div class="flex-1 min-w-0">
          <p class="font-semibold text-sm truncate">{{ item.name }}</p>
          <p class="text-white font-bold mt-0.5 text-sm">
            {{ formatPrice(item.price) }}
            <span class="text-pink-200 text-xs font-normal line-through ml-1">
              {{ item.original || formatPrice(item.price * 1.25) }}
            </span>
          </p>
          <div class="mt-1 w-full bg-white/20 rounded-full h-1">
            <div class="bg-white rounded-full h-1 w-3/5" />
          </div>
          <p class="text-pink-100 text-[10px] mt-0.5">Terjual 60%</p>
        </div>
        <button class="flex-shrink-0 w-8 h-8 rounded-full bg-white text-pink-500 flex items-center justify-center hover:scale-110 transition-transform duration-200 shadow-md">
          <Icon name="ph:shopping-bag-open-bold" class="h-4 w-4" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ products: any[] }>()

const dummyProducts = [
  { id: 1, name: 'Buket Mawar Premium', price: 148000, image: 'https://images.unsplash.com/photo-1487530811015-780d4d5af7d8?q=80&w=200&fit=crop' },
  { id: 2, name: 'Mini Tulip Pastel', price: 96000, image: 'https://images.unsplash.com/photo-1468327768560-75b778cbb551?q=80&w=200&fit=crop' },
  { id: 3, name: 'Buket Wisuda Elegance', price: 200000, image: 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?q=80&w=200&fit=crop' },
]

const displayProducts = computed(() => props.products.length > 0 ? props.products : dummyProducts)

const formatPrice = (price: number) =>
  new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price)

const timeLeft = reactive({ hours: '02', minutes: '00', seconds: '00' })
let intervalId: any = null
const deadline = new Date().getTime() + 2 * 60 * 60 * 1000

onMounted(() => {
  const update = () => {
    const dist = deadline - new Date().getTime()
    if (dist <= 0) {
      clearInterval(intervalId)
      timeLeft.hours = timeLeft.minutes = timeLeft.seconds = '00'
      return
    }
    timeLeft.hours = String(Math.floor(dist / 3600000)).padStart(2, '0')
    timeLeft.minutes = String(Math.floor((dist % 3600000) / 60000)).padStart(2, '0')
    timeLeft.seconds = String(Math.floor((dist % 60000) / 1000)).padStart(2, '0')
  }
  update()
  intervalId = setInterval(update, 1000)
})

onUnmounted(() => clearInterval(intervalId))
</script>
