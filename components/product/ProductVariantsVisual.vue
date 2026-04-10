<template>
  <div v-for="variant in visualVariants" :key="variant.id" class="space-y-2">
    <p class="font-medium text-gray-800">{{ variant.name }}</p>
    <div class="flex flex-wrap gap-2">
      <button
        v-for="option in variant.options"
        :key="option.id"
        @click="selectOption(variant.id, option.id)"
        class="h-10 w-10 rounded-full border overflow-hidden transition-all duration-200"
        :class="selections[variant.id] === option.id ? 'ring-2 ring-pink-500 border-pink-500' : 'border-gray-200'"
        :title="option.label"
      >
        <img v-if="option.image" :src="option.image" :alt="option.label" class="w-full h-full object-cover" />
        <span v-else class="w-full h-full block" :style="{ backgroundColor: option.value }"></span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed, onMounted } from 'vue'

const props = defineProps({
  variants: { type: Array, default: () => [] },
})
const emit = defineEmits(['update:selections'])

const visualVariants = computed(() => props.variants.filter(v => v.type === 'visual'))
const selections = ref({})

function selectOption(variantId, optionId) {
  selections.value[variantId] = optionId
}

watch(selections, (newSelections) => {
  emit('update:selections', newSelections)
}, { deep: true })

onMounted(() => {
  visualVariants.value.forEach(variant => {
    if (variant.options.length > 0) {
      selections.value[variant.id] = variant.options[0].id
    }
  })
})
</script>