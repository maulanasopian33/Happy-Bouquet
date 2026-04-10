<template>
  <div class="relative overflow-hidden group rounded-[2rem] shadow-2xl">
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
      class="h-[480px] md:h-[600px] lg:h-[680px] w-full"
      @slide-change="onSlideChange"
      @swiper="onSwiperInit"
    >
      <swiper-slide v-for="(banner, i) in displayBanners" :key="i">
        <div class="relative w-full h-full overflow-hidden">
          <!-- Background Image -->
          <img
            :src="banner.imageUrl"
            :alt="banner.title || 'Koleksi Bunga'"
            class="w-full h-full object-cover transition-transform duration-[12s] ease-linear scale-105 group-hover:scale-110"
            loading="eager"
          />

          <!-- Multi-layer Gradient Overlay (premium cinematic look) -->
          <div class="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-900/50 to-transparent" />
          <div class="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

          <!-- Content Wrapper -->
          <div class="absolute inset-0 flex flex-col justify-center px-8 md:px-16 lg:px-24">
            <div class="max-w-2xl space-y-5">
              <!-- Subtitle Tag -->
              <div class="reveal" style="animation-delay: 0s">
                <span class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-600/20 backdrop-blur-md border border-rose-500/25 text-rose-300 text-[11px] font-bold uppercase tracking-[0.25em]">
                  <span class="w-1.5 h-1.5 bg-rose-400 rounded-full animate-pulse" />
                  {{ banner.subtitle || 'Exclusive Collection' }}
                </span>
              </div>

              <!-- Main Title -->
              <h2
                class="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] reveal"
                style="animation-delay: 0.12s"
              >
                {{ banner.title }}
              </h2>

              <!-- Description -->
              <p
                class="text-slate-300 text-sm md:text-base max-w-lg leading-relaxed reveal"
                style="animation-delay: 0.22s"
              >
                Rangkaian bunga premium yang dibuat dengan penuh cinta dan dikirim segar ke pintu rumahmu.
              </p>

              <!-- CTA Buttons -->
              <div class="flex flex-wrap items-center gap-4 pt-2 reveal" style="animation-delay: 0.32s">
                <NuxtLink
                  v-if="banner.link"
                  :to="banner.link"
                  class="btn-premium flex items-center gap-2.5"
                >
                  <Icon name="ph:flower-lotus-fill" class="w-4.5 h-4.5" />
                  Lihat Koleksi
                  <Icon name="ph:arrow-right-bold" class="w-4 h-4" />
                </NuxtLink>
                <NuxtLink
                  to="/contact"
                  class="flex items-center gap-2 px-5 py-3 rounded-2xl border border-white/25 text-white text-sm font-semibold hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
                >
                  <Icon name="ph:chat-circle-dots-bold" class="w-4 h-4" />
                  Custom Order
                </NuxtLink>
              </div>
            </div>
          </div>

          <!-- Floating Rating Badge (bottom right) -->
          <div class="absolute bottom-8 right-8 hidden md:flex items-center gap-3 px-5 py-3 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/15 reveal" style="animation-delay: 0.45s">
            <div class="flex -space-x-2">
              <img
                v-for="(avatar, ai) in miniAvatars"
                :key="ai"
                :src="avatar"
                class="w-8 h-8 rounded-full border-2 border-white/30 object-cover"
              />
            </div>
            <div>
              <p class="text-white text-xs font-black leading-none">500+ pelanggan puas</p>
              <div class="flex items-center gap-1 mt-1">
                <Icon v-for="s in 5" :key="s" name="ph:star-fill" class="w-3 h-3 text-amber-400" />
                <span class="text-white/70 text-[10px] font-bold ml-1">4.9/5</span>
              </div>
            </div>
          </div>
        </div>
      </swiper-slide>
    </swiper>

    <!-- Navigation Arrows (visible on hover, always on mobile) -->
    <button
      class="hero-prev absolute left-4 md:left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full glass border-white/20 flex items-center justify-center text-white
             hover:bg-rose-600 hover:border-rose-600 transition-all duration-300
             opacity-60 hover:opacity-100 group-hover:opacity-100 md:-translate-x-2 md:group-hover:translate-x-0"
    >
      <Icon name="ph:caret-left-bold" class="w-5 h-5" />
    </button>
    <button
      class="hero-next absolute right-4 md:right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full glass border-white/20 flex items-center justify-center text-white
             hover:bg-rose-600 hover:border-rose-600 transition-all duration-300
             opacity-60 hover:opacity-100 group-hover:opacity-100 md:translate-x-2 md:group-hover:translate-x-0"
    >
      <Icon name="ph:caret-right-bold" class="w-5 h-5" />
    </button>

    <!-- Pagination + Slide Counter -->
    <div class="absolute bottom-6 left-8 md:left-16 lg:left-24 z-20 flex items-center gap-5">
      <div class="hero-custom-pagination flex items-center gap-2" />
      <span class="text-white/40 text-xs font-bold tabular-nums select-none">{{ currentSlide }} / {{ displayBanners.length }}</span>
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

// Mini avatars for social proof badge
const miniAvatars = [
  'https://ui-avatars.com/api/?name=Rina+A&background=f472b6&color=fff&size=64',
  'https://ui-avatars.com/api/?name=Dedi+S&background=e11d48&color=fff&size=64',
  'https://ui-avatars.com/api/?name=Siti+N&background=fb7185&color=fff&size=64',
]
</script>

<style scoped>
:deep(.hero-bullet) {
  width: 8px;
  height: 8px;
  background: rgba(255, 255, 255, 0.35);
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  display: inline-block;
}

:deep(.hero-bullet-active) {
  width: 30px;
  background: #E11D48;
  border-radius: 4px;
}
</style>
