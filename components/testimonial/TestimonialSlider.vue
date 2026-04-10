<template>
  <div>
    <!-- Desktop Grid (3 kolom) -->
    <div class="hidden md:grid grid-cols-3 gap-6">
      <div
        v-for="(item, i) in displayTestimonials"
        :key="i"
        class="relative group bg-(--bg-card) border border-(--border-color) rounded-3xl p-6 flex flex-col gap-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-rose-300/40"
        :style="{ boxShadow: 'var(--shadow-card)' }"
      >
        <!-- Quote icon dekoratif -->
        <div class="absolute top-5 right-6 text-5xl text-rose-100 dark:text-rose-900/40 font-serif leading-none select-none pointer-events-none">"</div>

        <!-- Star rating -->
        <div class="flex items-center gap-0.5">
          <Icon v-for="s in 5" :key="s" name="ph:star-fill" class="w-3.5 h-3.5 text-amber-400" />
        </div>

        <!-- Teks testimoni -->
        <p class="text-(--text-secondary) text-sm leading-relaxed italic flex-1">
          "{{ item.text }}"
        </p>

        <!-- Divider -->
        <div class="h-px bg-(--border-color)" />

        <!-- Profil -->
        <div class="flex items-center gap-3">
          <img
            :src="item.avatar"
            :alt="item.name"
            class="w-11 h-11 rounded-full border-2 border-rose-100 dark:border-rose-900/40 object-cover shrink-0"
            width="44"
            height="44"
          />
          <div>
            <p class="text-sm font-bold text-(--text-primary) leading-tight">{{ item.name }}</p>
            <div class="flex items-center gap-1 mt-0.5">
              <Icon name="ph:map-pin-fill" class="w-3 h-3 text-rose-400 shrink-0" />
              <p class="text-xs text-(--text-muted)">{{ item.location }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile Slider (Swiper) -->
    <div class="md:hidden">
      <swiper
        :modules="[Autoplay, Pagination]"
        :loop="true"
        :autoplay="{ delay: 5000, disableOnInteraction: false }"
        :pagination="{ clickable: true, el: '.testi-pagination' }"
        class="pb-10"
      >
        <swiper-slide v-for="(item, i) in displayTestimonials" :key="i" class="px-1 py-2">
          <div
            class="bg-(--bg-card) border border-(--border-color) rounded-3xl p-5 flex flex-col gap-4 relative"
            :style="{ boxShadow: 'var(--shadow-card)' }"
          >
            <!-- Quote dekoratif -->
            <div class="absolute top-4 right-5 text-4xl text-rose-100 dark:text-rose-900/40 font-serif leading-none select-none">"</div>

            <!-- Star -->
            <div class="flex items-center gap-0.5">
              <Icon v-for="s in 5" :key="s" name="ph:star-fill" class="w-3.5 h-3.5 text-amber-400" />
            </div>

            <!-- Text -->
            <p class="text-(--text-secondary) text-sm leading-relaxed italic">
              "{{ item.text }}"
            </p>

            <div class="h-px bg-(--border-color)" />

            <!-- Profile -->
            <div class="flex items-center gap-3">
              <img
                :src="item.avatar"
                :alt="item.name"
                class="w-10 h-10 rounded-full border-2 border-rose-100 dark:border-rose-900/40 object-cover shrink-0"
                width="40"
                height="40"
              />
              <div>
                <p class="text-sm font-bold text-(--text-primary) leading-tight">{{ item.name }}</p>
                <div class="flex items-center gap-1 mt-0.5">
                  <Icon name="ph:map-pin-fill" class="w-3 h-3 text-rose-400" />
                  <p class="text-xs text-(--text-muted)">{{ item.location }}</p>
                </div>
              </div>
            </div>
          </div>
        </swiper-slide>
      </swiper>
      <!-- Custom pagination -->
      <div class="testi-pagination flex justify-center gap-1.5 mt-2" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

const props = withDefaults(defineProps<{
  testimonials?: { text: string; name: string; location: string; avatar: string; rating?: number }[]
}>(), {
  testimonials: () => [
    { text: "Buketnya fresh & cantik banget! Pengiriman juga tepat waktu. Pacarku suka banget!", name: "Rina Amelia", location: "Jakarta", avatar: "https://ui-avatars.com/api/?name=Rina+Amelia&background=f472b6&color=fff&size=80" },
    { text: "Pesan buket wisuda untuk adik, hasilnya rapi dan sesuai ekspektasi. Recommended!", name: "Dedi Setiawan", location: "Bandung", avatar: "https://ui-avatars.com/api/?name=Dedi+Setiawan&background=e11d48&color=fff&size=80" },
    { text: "Pelayanan ramah dan sangat membantu saat konsultasi buket custom. Hasilnya luar biasa!", name: "Siti Nurhaliza", location: "Surabaya", avatar: "https://ui-avatars.com/api/?name=Siti+Nurhaliza&background=f472b6&color=fff&size=80" },
  ]
})

const displayTestimonials = computed(() => props.testimonials)
</script>

<style scoped>
:deep(.testi-pagination .swiper-pagination-bullet) {
  width: 8px;
  height: 8px;
  background: var(--border-strong);
  opacity: 0.5;
  border-radius: 50%;
  display: inline-block;
  transition: all 0.3s ease;
}
:deep(.testi-pagination .swiper-pagination-bullet-active) {
  width: 22px;
  background: var(--color-brand);
  border-radius: 4px;
  opacity: 1;
}
</style>
