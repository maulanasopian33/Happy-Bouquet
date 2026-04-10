<template>
  <div class="card-premium p-6 space-y-5 overflow-hidden relative">
    <!-- Background Decoration -->
    <Icon name="ph:flower-lotus-fill" class="absolute -bottom-6 -right-6 w-32 h-32 text-rose-500/5 rotate-12 pointer-events-none" />
    
    <div class="flex items-center gap-3 border-b border-(--border-color) pb-4">
      <div class="w-10 h-10 rounded-xl bg-rose-50 dark:bg-rose-950/30 flex items-center justify-center text-rose-600">
        <Icon name="ph:seal-check-fill" class="w-6 h-6" />
      </div>
      <div>
        <h3 class="text-sm font-black uppercase tracking-widest text-primary">Janji HappyBouquet</h3>
        <p class="text-[10px] text-muted font-bold uppercase tracking-wider">Terpercaya & Bergaransi</p>
      </div>
    </div>

    <div class="space-y-4">
      <div v-for="promise in promises" :key="promise.title" class="flex gap-4 group">
        <div class="shrink-0 w-8 h-8 rounded-lg bg-(--bg-section) flex items-center justify-center text-rose-500 group-hover:bg-rose-100 dark:group-hover:bg-rose-900/30 transition-colors">
          <Icon :name="promise.icon" class="w-4.5 h-4.5" />
        </div>
        <div class="space-y-1">
          <h4 class="text-xs font-bold text-primary">{{ promise.title }}</h4>
          <p class="text-[11px] text-secondary leading-relaxed">{{ promise.desc }}</p>
        </div>
      </div>
    </div>

    <div class="pt-2">
      <a 
        href="https://wa.me/6281234567890" 
        target="_blank"
        class="flex items-center justify-center gap-2 w-full py-3 bg-rose-50 dark:bg-rose-900/20 text-rose-600 rounded-xl text-xs font-bold hover:bg-rose-100 dark:hover:bg-rose-900/30 transition-all border border-rose-100 dark:border-rose-900/40"
      >
        <Icon name="ph:chat-circle-dots-fill" class="w-4 h-4" />
        Tanya Florist Kami
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
const promises = [
  { icon: 'ph:flower-bold', title: '100% Bunga Segar', desc: 'Kami menjamin kesegaran bunga hingga sampai ke tangan Anda.' },
  { icon: 'ph:lightning-bold', title: 'Kirim Hari Ini', desc: 'Pesan sebelum jam 14.00 untuk pengiriman di hari yang sama.' },
  { icon: 'ph:hand-heart-bold', title: 'Hand-Made with Love', desc: 'Setiap buket dirangkai khusus oleh florist profesional kami.' },
]
</script>
