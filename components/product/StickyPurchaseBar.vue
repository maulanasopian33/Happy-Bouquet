<template>
  <Transition name="slide-up">
    <div 
      v-if="isVisible" 
      class="lg:hidden fixed bottom-16 left-0 right-0 z-50 px-4 pb-4 animate-slide-up"
    >
      <div 
        class="glass border-(--border-strong) rounded-2xl p-4 flex items-center justify-between gap-4 shadow-2xl shadow-rose-500/30"
      >
        <div class="space-y-0.5">
          <p class="text-[10px] font-bold text-muted uppercase tracking-widest">Total Harga</p>
          <p class="text-lg font-black text-rose-600">{{ formatPrice(price) }}</p>
        </div>
        
        <div class="flex items-center gap-2 grow max-w-[200px]">
          <button 
            @click="$emit('buy-now')"
            class="grow py-3 px-4 bg-rose-600 text-white rounded-xl text-xs font-black shadow-lg shadow-rose-500/20 active:scale-95 transition-all"
          >
            Beli Sekarang
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
const props = defineProps<{ price: number }>()
const emit = defineEmits(['buy-now'])

const isVisible = ref(false)

const handleScroll = () => {
  // Tampilkan bar jika sudah scroll lebih dari 400px (melewati gallery/info awal)
  isVisible.value = window.scrollY > 400
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

const formatPrice = (v: number) => 
  new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(v)
</script>

<style scoped>
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
}

.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(100%);
  opacity: 0;
}
</style>
