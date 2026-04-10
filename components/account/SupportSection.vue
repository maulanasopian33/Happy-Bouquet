<template>
  <div class="card-premium p-8 md:p-12 mt-16 bg-linear-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-950/50 overflow-hidden relative group transition-all duration-700">
    <!-- Abstract Background Shape -->
    <div class="absolute -bottom-10 -right-10 w-48 h-48 bg-rose-500/5 rounded-full blur-3xl group-hover:bg-rose-500/10 transition-all duration-700"></div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 relative z-10 items-center">
      <!-- Left: Content -->
      <div class="space-y-6">
        <div class="space-y-1">
          <div class="section-tag inline-flex">Pusat Bantuan</div>
          <h2 class="text-3xl font-black text-primary tracking-tight">Butuh Bantuan Lebih?</h2>
          <p class="text-sm md:text-base text-secondary font-medium leading-relaxed max-w-md">
            Tim HappyBouquet siap membantu Anda setiap harinya. Jangan ragu untuk menghubungi kami untuk pertanyaan seputar pesanan atau desain buket khusus.
          </p>
        </div>

        <div class="flex flex-wrap gap-4 pt-4">
          <button class="btn-premium px-8 py-3.5 flex items-center justify-center gap-3 w-full sm:w-auto">
            <Icon name="ph:whatsapp-logo-fill" class="w-5 h-5 text-emerald-300" />
            Chat WhatsApp
          </button>
          <NuxtLink to="/contact" class="btn-premium-outline px-8 py-3.5 w-full sm:w-auto">Pusat Layanan</NuxtLink>
        </div>
      </div>

      <!-- Right: Quick FAQ -->
      <div class="space-y-4">
        <div 
          v-for="(faq, i) in faqs" 
          :key="i"
          class="p-4 bg-white/50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 rounded-2xl hover:border-rose-200 dark:hover:border-rose-900 transition-all cursor-pointer group/faq shadow-sm"
        >
          <div class="flex items-center justify-between gap-4">
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 rounded-lg bg-rose-50 dark:bg-rose-950/30 flex items-center justify-center text-rose-600">
                <Icon :name="faq.icon" class="w-4 h-4" />
              </div>
              <span class="text-xs font-black text-primary uppercase tracking-tight">{{ faq.q }}</span>
            </div>
            <Icon name="ph:caret-right-bold" class="w-3.5 h-3.5 text-muted group-hover/faq:text-rose-600 transition-all" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const faqs = [
  { q: 'Bagaimana cara lacak pesanan?', icon: 'ph:map-pin-bold' },
  { q: 'Ketentuan pengembalian dana', icon: 'ph:coins-bold' },
  { q: 'Custom buket untuk event', icon: 'ph:flower-tulip-bold' },
]
</script>
