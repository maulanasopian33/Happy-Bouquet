<template>
  <div v-for="variant in textVariants" :key="variant.id" class="space-y-2">
    <p class="font-medium text-gray-800">{{ variant.name }}</p>
    <div class="flex flex-wrap gap-2">
      <button
        v-for="option in variant.options"
        :key="option.id"
        @click="selectOption(variant.id, option.id)"
        class="px-3 py-1.5 rounded-full border text-xs transition-colors"
        :class="selections[variant.id] === option.id
          ? 'bg-pink-600 text-white border-pink-600'
          : 'bg-white text-gray-700 border-gray-200 hover:border-gray-400'"
      >
        {{ option.label }}
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

const textVariants = computed(() => props.variants.filter(v => v.type === 'text'))
const selections = ref({})

function selectOption(variantId, optionId) {
  selections.value[variantId] = optionId
}

watch(selections, (newSelections) => {
  emit('update:selections', newSelections)
}, { deep: true })

onMounted(() => {
  textVariants.value.forEach(variant => {
    if (variant.options.length > 0) {
      selections.value[variant.id] = variant.options[0].id
    }
  })
})
</script>