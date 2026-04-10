<template>
  <div class="card-premium p-6 space-y-4">
    <div class="flex items-center gap-3">
      <Icon name="ph:lock-key-fill" class="w-5 h-5 text-emerald-500" />
      <h3 class="text-xs font-black uppercase tracking-widest text-primary">Pembayaran Aman</h3>
    </div>
    
    <div class="grid grid-cols-4 gap-3 opacity-60 dark:opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
      <div v-for="icon in paymentIcons" :key="icon" class="aspect-video bg-(--bg-section) rounded-lg flex items-center justify-center p-2 border border-(--border-color)">
        <Icon :name="icon" class="w-full h-full text-secondary" />
      </div>
    </div>
    
    <p class="text-[10px] text-muted leading-relaxed font-medium">
      Mendukung Transfer Bank, QRIS, GoPay, dan Bayar di Tempat (COD) untuk kenyamanan Anda.
    </p>
  </div>
</template>

<script setup lang="ts">
const paymentIcons = [
  'ph:bank-bold',
  'ph:qr-code-bold',
  'ph:wallet-bold',
  'ph:coins-bold'
]
</script>
