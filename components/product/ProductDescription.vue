<template>
  <div class="card-premium p-8 md:p-10 space-y-8">
    <div class="flex items-center gap-4">
      <div class="w-1.5 h-8 bg-rose-600 rounded-full" />
      <h2 class="text-2xl font-black text-primary tracking-tight">Kisah Di Balik Buket Ini</h2>
    </div>
    
    <div class="prose prose-rose dark:prose-invert max-w-none">
      <div 
        class="text-secondary leading-loose text-sm md:text-base font-medium space-y-4"
        v-html="formattedDescription"
      ></div>
    </div>

    <!-- Features / Highlights -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-(--border-color)">
      <div v-for="f in features" :key="f.text" class="flex items-center gap-3">
        <Icon name="ph:check-circle-fill" class="text-emerald-500 w-5 h-5 shrink-0" />
        <span class="text-xs font-bold text-primary uppercase tracking-widest">{{ f.text }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ description: string }>()

const formattedDescription = computed(() => {
  if (!props.description) return 'Belum ada deskripsi untuk produk ini.'
  // Replace newlines with <br> for better HTML rendering if it's plain text
  return props.description.replace(/\n/g, '<br>')
})

const features = [
  { text: 'Hand-picked fresh flowers' },
  { text: 'Eco-friendly premium wrapping' },
  { text: 'Complimentary message card' },
  { text: 'Professional floral styling' }
]
</script>