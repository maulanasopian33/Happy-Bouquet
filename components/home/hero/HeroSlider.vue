<template>
  <div class="relative overflow-hidden group rounded-2xl border border-[var(--noir-line-strong)] shadow-[0_4px_30px_rgba(0,0,0,0.5)] bg-[var(--noir-card)] min-h-[340px] md:min-h-[380px]">
    <swiper
      :modules="[Autoplay, Pagination, Navigation, EffectFade]"
      :loop="true"
      :effect="'fade'"
      :fade-effect="{ crossFade: true }"
      :autoplay="{ delay: 6000, disableOnInteraction: false }"
      :pagination="{
        clickable: true,
        el: '.hero-custom-pagination',
        bulletClass: 'hero-bullet',
        bulletActiveClass: 'hero-bullet-active'
      }"
      :navigation="{
        nextEl: '.hero-next',
        prevEl: '.hero-prev',
      }"
      class="h-[340px] md:h-[380px] w-full"
      @slide-change="onSlideChange"
      @swiper="onSwiperInit"
    >
      <swiper-slide v-for="(banner, i) in displayBanners" :key="i">
        <div class="relative w-full h-full overflow-hidden">
          <!-- Background Image -->
          <NuxtImg
            :src="banner.imageUrl"
            :alt="banner.title || 'Koleksi Bunga'"
            class="w-full h-full object-cover opacity-30 brightness-75 scale-105 transition-transform duration-[12s] ease-linear group-hover:scale-110"
            :loading="i === 0 ? 'eager' : 'lazy'"
            :fetchpriority="i === 0 ? 'high' : 'auto'"
            width="1600"
            height="900"
            @error="onImgError"
          />

          <!-- Noir gradient overlay -->
          <div class="absolute inset-0 bg-gradient-to-r from-[#0e0e10] via-[#0e0e10]/85 to-transparent" />
          <div class="absolute top-0 right-0 w-96 h-96 bg-[var(--noir-gold)]/10 rounded-full blur-3xl pointer-events-none" />

          <!-- Content -->
          <div class="absolute inset-0 flex flex-col justify-center px-6 md:px-14 lg:px-16">
            <div class="max-w-2xl flex flex-col items-start gap-3">
              <span class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--noir-gold)]/15 border border-[var(--noir-gold)]/40 backdrop-blur-md">
                <Icon name="ph:sparkle-fill" class="text-[var(--noir-gold)] text-[15px]" />
                <span class="label-crest">{{ banner.subtitle || 'Exclusive Collection' }}</span>
              </span>

              <h2 class="noir-display text-2xl sm:text-3xl lg:text-4xl text-[var(--noir-champagne)] leading-tight">
                {{ banner.title }}
              </h2>

              <p class="text-[var(--noir-champagne-dim)] text-sm md:text-base leading-relaxed line-clamp-2">
                Rangkaian bunga premium yang dirangkai penuh kehangatan, dikirim segar ke pintu rumahmu.
              </p>

              <div class="flex items-center gap-3 pt-2">
                <NuxtLink
                  v-if="banner.link"
                  :to="banner.link"
                  class="btn-gold px-6 py-2.5 text-sm"
                >
                  Lihat Koleksi
                  <Icon name="ph:arrow-right-bold" class="w-4 h-4" />
                </NuxtLink>
                <NuxtLink
                  to="/contact"
                  class="btn-noir px-5 py-2.5 text-sm"
                >
                  Custom Order
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </swiper-slide>
    </swiper>

    <!-- Navigation Arrows -->
    <button
      class="hero-prev absolute left-4 md:left-6 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-[var(--noir-raised)]/80 border border-[var(--noir-champagne-dim)]/40 text-[var(--noir-champagne)] flex items-center justify-center hover:text-[var(--noir-gold)] hover:border-[var(--noir-gold)] transition-colors"
      aria-label="Slide sebelumnya"
    >
      <Icon name="ph:caret-left-bold" class="w-4 h-4" />
    </button>
    <button
      class="hero-next absolute right-4 md:right-10 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-[var(--noir-raised)]/80 border border-[var(--noir-champagne-dim)]/40 text-[var(--noir-champagne)] flex items-center justify-center hover:text-[var(--noir-gold)] hover:border-[var(--noir-gold)] transition-colors"
      aria-label="Slide berikutnya"
    >
      <Icon name="ph:caret-right-bold" class="w-4 h-4" />
    </button>

    <!-- Pagination + counter -->
    <div class="absolute bottom-5 right-6 md:right-24 z-20 flex items-center gap-4">
      <div class="hero-custom-pagination flex items-center gap-2" />
      <span class="text-[var(--noir-champagne-dim)] text-xs font-bold tabular-nums select-none">{{ currentSlide }} / {{ displayBanners.length }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import 'swiper/css/effect-fade'

interface Banner {
  imageUrl: string
  title?: string
  subtitle?: string
  link?: string
}

interface Props {
  banners: Banner[]
}

const props = withDefaults(defineProps<Props>(), {
  banners: () => []
})

const defaultBanners: Banner[] = [
  {
    imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1600&fit=crop',
    subtitle: 'Koleksi Spesial 2026',
    title: 'Buket untuk Momen Paling Istimewa',
    link: '/products'
  },
  {
    imageUrl: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?q=80&w=1600&fit=crop',
    subtitle: 'Premium Selection',
    title: 'Keindahan di Setiap Kelopaknya',
    link: '/products'
  },
  {
    imageUrl: 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?q=80&w=1600&fit=crop',
    subtitle: 'Anniversary & Birthday',
    title: 'Ungkapkan Rasa dengan Bunga Pilihan',
    link: '/products'
  },
]

const displayBanners = computed(() => props.banners.length > 0 ? props.banners : defaultBanners)

const currentSlide = ref(1)
const swiperInstance = ref<any>(null)

const onSwiperInit = (swiper: any) => {
  swiperInstance.value = swiper
}

const onSlideChange = (swiper: any) => {
  currentSlide.value = (swiper.realIndex ?? 0) + 1
}

// Banner gagal load -> default.png (hindari loop; target bisa null)
const onImgError = (e: Event) => {
  const t = e.target as HTMLImageElement | null
  if (t?.src && !t.src.endsWith('/default.png')) t.src = '/default.png'
}
</script>

<style scoped>
:deep(.hero-bullet) {
  width: 8px;
  height: 6px;
  background: rgba(184, 178, 163, 0.5);
  border-radius: 9999px;
  cursor: pointer;
  transition: all 0.4s ease;
  display: inline-block;
}

:deep(.hero-bullet-active) {
  width: 24px;
  background: #d4af37;
}
</style>
