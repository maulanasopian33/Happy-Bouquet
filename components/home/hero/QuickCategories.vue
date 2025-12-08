<template>
  <div class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-3 sm:gap-4">
    <div
      v-for="(cat, i) in categories"
      :key="i"
      class="flex flex-col items-center justify-center text-center p-4 bg-white rounded-xl border border-gray-100 shadow-sm cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-lg group"
      @click="$emit('select', cat)"
    >
      <div class="w-16 h-16 flex items-center justify-center bg-rose-50 rounded-full transition-colors duration-300 group-hover:bg-pink-100">
        <Icon :name="cat.icon" class="h-8 w-8 text-pink-600" />
      </div>
      <span class="mt-2 text-sm font-medium text-gray-700 text-center">{{ cat.name }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
interface CategoryItem {
  name: string
  icon: string
}

interface Props {
  categories: CategoryItem[]
}

defineProps<Props>()
defineEmits(["select"])
</script>
