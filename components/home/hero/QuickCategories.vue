<template>
  <div class="relative">
    <!-- Fade edges for scroll hint -->
    <div class="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[var(--bg-main)] to-transparent z-10 pointer-events-none rounded-l-full" />
    <div class="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[var(--bg-main)] to-transparent z-10 pointer-events-none rounded-r-full" />

    <!-- Horizontal Scroll Container -->
    <div class="flex items-center gap-3 overflow-x-auto scroll-hide snap-x snap-mandatory px-2 pb-2">

      <!-- "Semua" pill -->
      <button
        class="flex flex-col items-center gap-2 shrink-0 snap-start group"
        @click="$emit('select', null)"
      >
        <div
          class="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center transition-all duration-300 bg-rose-600 shadow-lg shadow-rose-500/25 scale-105"
        >
          <Icon name="ph:squares-four-fill" class="w-7 h-7 text-white" />
        </div>
        <span class="text-[11px] font-bold text-rose-600 whitespace-nowrap leading-tight">Semua</span>
      </button>

      <!-- Category pills -->
      <button
        v-for="(cat, i) in displayCategories"
        :key="i"
        class="flex flex-col items-center gap-2 shrink-0 snap-start group"
        @click="$emit('select', cat)"
      >
        <div
          class="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex flex-col items-center justify-center transition-all duration-300 cursor-pointer
                 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700
                 hover:border-rose-400/60 hover:shadow-lg hover:shadow-rose-500/10 hover:-translate-y-1
                 group-hover:bg-rose-50 dark:group-hover:bg-rose-950/20"
        >
          <span class="text-2xl sm:text-3xl leading-none">{{ cat.emoji || '🌸' }}</span>
        </div>
        <div class="text-center">
          <span class="block text-[11px] font-semibold text-secondary group-hover:text-rose-600 transition-colors whitespace-nowrap leading-tight">
            {{ cat.name }}
          </span>
        </div>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
interface CategoryItem {
  name: string
  icon?: string
  emoji?: string
  id?: number
}

interface Props {
  categories: CategoryItem[]
}

const props = defineProps<Props>()
defineEmits(['select'])

const dummyCategories: CategoryItem[] = [
  { name: 'Mawar', emoji: '🌹' },
  { name: 'Wisuda', emoji: '🎓' },
  { name: 'Snack', emoji: '🍫' },
  { name: 'Anniversary', emoji: '💍' },
  { name: 'Birthday', emoji: '🎂' },
  { name: 'Tulip', emoji: '🌷' },
  { name: 'Kering', emoji: '🍂' },
  { name: 'Premium', emoji: '✨' },
  { name: 'Custom', emoji: '🎁' },
]

const displayCategories = computed(() => props.categories.length > 0 ? props.categories : dummyCategories)
</script>
