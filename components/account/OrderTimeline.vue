<template>
  <div class="py-6 space-y-6">
    <div class="flex items-center gap-3 mb-2">
      <div class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
      <p class="text-xs font-black text-emerald-600 uppercase tracking-widest">{{ status }}</p>
    </div>

    <div class="relative pl-8 space-y-8">
      <!-- Vertical Line -->
      <div class="absolute left-[11px] top-2 bottom-2 w-0.5 bg-(--border-color)"></div>

      <div 
        v-for="(step, i) in steps" 
        :key="i"
        class="relative flex flex-col gap-1 transition-all duration-500"
        :class="step.isDone ? 'opacity-100' : 'opacity-40 grayscale blur-[0.5px]'"
      >
        <!-- Marker -->
        <div 
          class="absolute -left-[27px] top-1 w-4 h-4 rounded-full border-2 transition-all duration-500 z-10"
          :class="step.isDone 
            ? (step.isCurrent ? 'bg-rose-600 border-rose-200 scale-125' : 'bg-emerald-500 border-emerald-100 shadow-lg shadow-emerald-500/20') 
            : 'bg-white dark:bg-slate-900 border-(--border-color)'"
        >
          <Icon v-if="step.isDone && !step.isCurrent" name="ph:check-bold" class="w-2.5 h-2.5 text-white absolute inset-0 m-auto" />
        </div>

        <h4 class="text-sm font-black text-primary">{{ step.label }}</h4>
        <p class="text-[10px] font-bold text-muted uppercase tracking-widest">{{ step.time }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  status: string
  steps: {
    label: string
    time: string
    isDone: boolean
    isCurrent?: boolean
  }[]
}>()
</script>
