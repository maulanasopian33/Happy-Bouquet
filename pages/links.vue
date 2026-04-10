<template>
  <div class="min-h-screen bg-(--bg-main) transition-colors duration-500 flex flex-col items-center py-12 px-6 relative overflow-hidden">
    
    <!-- ======= AMBIENT BACKGROUND ======= -->
    <div class="absolute -top-24 -left-24 w-96 h-96 bg-rose-500/10 rounded-full blur-[100px] pointer-events-none"></div>
    <div class="absolute top-1/2 -right-24 w-80 h-80 bg-rose-500/5 rounded-full blur-[80px] pointer-events-none"></div>

    <div class="w-full max-w-sm flex flex-col items-center space-y-10 relative z-10">
      
      <!-- ======= PROFILE SECTION ======= -->
      <header class="text-center space-y-4 reveal">
        <div class="relative inline-block group">
           <div class="absolute -inset-1.5 bg-linear-to-tr from-rose-500 to-rose-700 rounded-4xl blur opacity-40 group-hover:opacity-70 transition-opacity"></div>
           <div class="relative w-24 h-24 rounded-4xl bg-white dark:bg-slate-900 border-2 border-white dark:border-slate-800 flex items-center justify-center p-4">
              <img src="https://happybouquet.id/logo.png" alt="HappyBouquet Logo" class="w-full h-auto" onerror="this.src='https://api.dicebear.com/7.x/initials/svg?seed=HB&backgroundColor=e11d48'" />
           </div>
           <div class="absolute -bottom-1 -right-1 bg-emerald-500 text-white p-1 rounded-full border-2 border-white dark:border-slate-800 flex items-center justify-center shadow-lg">
              <Icon name="ph:seal-check-fill" class="w-4 h-4" />
           </div>
        </div>

        <div class="space-y-1">
          <h1 class="text-xl font-black text-primary tracking-tight">HappyBouquet Central</h1>
          <p class="text-sm font-bold text-rose-600 uppercase tracking-widest leading-none">@happybouquet.id</p>
        </div>
        
        <p class="text-xs font-medium text-secondary leading-relaxed max-w-[280px] mx-auto opacity-80">
          Seni merangkai emosi dalam puitisasi bunga yang menakjubkan. Pengiriman Premium Jabodetabek & Bandung. 🌸
        </p>
      </header>

      <!-- ======= LINKS STACK ======= -->
      <main class="w-full space-y-4 reveal">
        <NuxtLink 
          v-for="(link, i) in mainLinks" 
          :key="i"
          :to="link.path"
          class="flex items-center justify-between w-full p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 hover:border-rose-400 dark:hover:border-rose-900 hover:shadow-xl hover:shadow-rose-500/10 hover:-translate-y-1 transition-all group"
        >
          <div class="flex items-center gap-4">
            <div 
              class="w-10 h-10 rounded-xl flex items-center justify-center transition-colors shadow-inner"
              :class="link.primary ? 'bg-rose-600 text-white shadow-rose-500/30' : 'bg-rose-50 dark:bg-rose-950/20 text-rose-600'"
            >
              <Icon :name="link.icon" class="w-5 h-5 group-hover:scale-110 transition-transform" />
            </div>
            <p class="text-sm font-black text-primary uppercase tracking-tight">{{ link.label }}</p>
          </div>
          <Icon name="ph:caret-right-bold" class="w-4 h-4 text-muted group-hover:text-rose-600 transition-colors" />
        </NuxtLink>

        <!-- Dynamic Featured Card -->
        <div class="p-4 bg-linear-to-br from-rose-600 to-rose-700 rounded-2xl text-white shadow-xl shadow-rose-500/30 space-y-4 group cursor-pointer hover:scale-[1.02] transition-all">
           <div class="flex items-center gap-3">
              <Icon name="ph:sparkle-fill" class="w-5 h-5 animate-pulse" />
              <p class="text-[10px] font-black uppercase tracking-widest opacity-80">Promo Minggu Ini</p>
           </div>
           <div class="flex gap-4 items-center">
              <img src="https://images.unsplash.com/photo-1596436889106-be35e843f974?q=80&w=200&fit=crop" class="w-16 h-16 rounded-xl object-cover border border-white/20" alt="Promo Bouquet" />
              <div class="flex-1">
                 <h4 class="text-sm font-black leading-tight">Bundle "Spring Love"</h4>
                 <p class="text-[10px] font-medium opacity-80 mt-1">Diskon 15% + Gratis Kartu Ucapan Premium</p>
              </div>
              <div class="p-2 bg-white/20 rounded-lg">
                 <Icon name="ph:arrow-right-bold" class="w-4 h-4" />
              </div>
           </div>
        </div>
      </main>

      <!-- ======= SOCIAL CONNECT ======= -->
      <footer class="w-full pt-6 flex flex-col items-center gap-8 reveal">
         <div class="flex items-center justify-center gap-5">
            <a 
              v-for="social in socialLinks" 
              :key="social.label"
              :href="social.href"
              target="_blank"
              class="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 flex items-center justify-center text-secondary hover:text-rose-600 hover:border-rose-400 transition-all active:scale-90"
              :title="social.label"
            >
              <Icon :name="social.icon" class="w-5 h-5" />
            </a>
         </div>

         <div class="flex flex-col items-center gap-1 opacity-50">
            <NuxtLink to="/" class="flex items-center gap-1 px-3 py-1.5 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-all">
               <div class="w-4 h-4 rounded-sm bg-rose-600 flex items-center justify-center text-[10px] text-white font-black">HB</div>
               <span class="text-[10px] font-black uppercase tracking-widest text-primary">HappyBouquet.id</span>
            </NuxtLink>
         </div>
      </footer>

    </div>

  </div>
</template>

<script setup lang="ts">
// Disable main layout
definePageMeta({
  layout: false
})

const mainLinks = [
  { label: 'Belanja Buket Pilihan', icon: 'ph:shopping-bag-bold', path: '/products', primary: true },
  { label: 'Lacak Pesanan Saya', icon: 'ph:truck-bold', path: '/tracking' },
  { label: 'Konsultasi via WhatsApp', icon: 'ph:whatsapp-logo-fill', path: '/contact' },
  { label: 'Tentang Our Story', icon: 'ph:rose-bold', path: '/about' },
  { label: 'Lokasi Galeri Kami', icon: 'ph:map-pin-fill', path: '/contact' },
]

const socialLinks = [
  { label: 'Instagram', href: '#', icon: 'ph:instagram-logo-fill' },
  { label: 'TikTok', href: '#', icon: 'ph:tiktok-logo-fill' },
  { label: 'WhatsApp', href: '#', icon: 'ph:whatsapp-logo-fill' },
  { label: 'Facebook', href: '#', icon: 'ph:facebook-logo-fill' },
]

useHead({
  title: 'Link-in-Bio - HappyBouquet'
})
</script>

<style scoped>
.reveal {
  opacity: 0;
  animation: revealUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

@keyframes revealUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Delay for stack items could be added if needed, but keeping it simple for performance */

/* Verified badge pulse */
.bg-emerald-500 {
  animation: badge-pulse 2s infinite;
}

@keyframes badge-pulse {
  0% { shadow: 0 0 0 0 rgba(16, 185, 129, 0.4); }
  70% { box-shadow: 0 0 0 8px rgba(16, 185, 129, 0); }
  100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
}
</style>
