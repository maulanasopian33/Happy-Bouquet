<template>
  <div 
    class="relative flex flex-col sm:flex-row bg-white dark:bg-slate-900 border border-slate-100 dark:border-rose-900/30 rounded-3xl overflow-hidden group shadow-lg hover:shadow-rose-500/10 transition-all duration-500"
    :class="voucher.isUsed ? 'opacity-50 grayscale pointer-events-none' : ''"
  >
    <!-- Left Section: Discount -->
    <div class="px-8 py-10 bg-linear-to-br from-rose-500 to-rose-700 text-white flex flex-col items-center justify-center text-center sm:w-40 shrink-0 relative overflow-hidden">
      <!-- Decoration Circles -->
      <div class="absolute -top-10 -left-10 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
      <div class="absolute -bottom-10 -right-10 w-20 h-20 bg-rose-400/20 rounded-full"></div>
      
      <span class="text-3xl font-black tracking-tighter leading-none">{{ voucher.discount }}</span>
      <span class="text-[10px] font-black uppercase tracking-widest mt-1 opacity-80">OFF</span>
      
      <Icon name="ph:ticket-fill" class="absolute -bottom-4 -left-4 w-16 h-16 opacity-10 -rotate-12" />
    </div>

    <!-- Divider (Dotted look) -->
    <div class="hidden sm:flex flex-col justify-between py-2 relative w-px bg-slate-100 dark:bg-slate-800">
      <div v-for="i in 8" :key="i" class="w-2 h-2 rounded-full bg-(--bg-main) -ml-[4px]"></div>
    </div>

    <!-- Right Section: Details -->
    <div class="flex-1 p-6 sm:p-8 flex flex-col justify-between">
      <div>
        <div class="flex items-center justify-between gap-4 mb-2">
          <h4 class="text-base font-black text-primary line-clamp-1 uppercase tracking-tight">{{ voucher.description }}</h4>
          <span 
            v-if="!voucher.isUsed"
            class="hidden sm:block px-2.5 py-1 rounded-lg bg-rose-50 dark:bg-rose-950/30 text-[9px] font-black text-rose-600 uppercase tracking-widest border border-rose-100 dark:border-rose-900/30"
          >
            Aktif
          </span>
        </div>
        <p class="text-[11px] font-medium text-secondary leading-relaxed">Berlaku hingga {{ voucher.expiryDate }}</p>
      </div>

      <div class="mt-8 flex flex-col sm:flex-row items-center gap-4">
        <div class="w-full flex items-center bg-slate-50 dark:bg-slate-950 rounded-2xl p-0.5 border border-slate-100 dark:border-slate-800 transition-all group-hover:border-rose-300 dark:group-hover:border-rose-900 shadow-inner">
          <span class="flex-1 px-4 py-2.5 text-xs font-black text-primary tracking-widest uppercase">CODE: {{ voucher.code }}</span>
          <button 
            @click="copyCode(voucher.code)"
            class="px-5 py-2.5 rounded-xl bg-white dark:bg-slate-800 text-rose-600 shadow-sm hover:bg-rose-50 transition-all active:scale-95"
          >
            <Icon name="ph:copy-bold" class="w-3.5 h-3.5" />
          </button>
        </div>
        <button class="btn-premium w-full sm:w-auto py-3 px-8 text-xs shrink-0 rounded-2xl whitespace-nowrap">Gunakan</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  voucher: {
    id: string
    code: string
    discount: string
    description: string
    expiryDate: string
    isUsed: boolean
  }
}>()

const copyCode = (code: string) => {
  navigator.clipboard.writeText(code)
  alert('Kode voucher disalin ke clipboard!')
}
</script>
