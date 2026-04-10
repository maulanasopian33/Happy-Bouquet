<script setup lang="ts">
useHead({
  title: 'Penawaran Spesial — HappyBouquet',
  meta: [
    { name: 'description', content: 'Dapatkan diskon eksklusif, paket bundling, dan promo terbatas hanya di HappyBouquet.' }
  ]
})

const promos = [
  { 
    title: 'Welcome Discount', 
    desc: 'Diskon 10% untuk pembelian pertama kamu.', 
    code: 'HAPPYHELLO', 
    icon: 'ph:ticket-duotone' 
  },
  { 
    title: 'Graduation Bundle', 
    desc: 'Hemat Rp 50.000 untuk paket Buket Bunga + Boneka.', 
    code: 'GRAD2026', 
    icon: 'ph:graduation-cap-duotone' 
  },
  { 
    title: 'Free Shipping', 
    desc: 'Gratis ongkir untuk wilayah Jabodetabek (Min. Rp 250k).', 
    code: 'FREEONGKIR', 
    icon: 'ph:truck-duotone' 
  }
]
</script>

<template>
  <div class="promo-page pb-20">
    <!-- Page Hero -->
    <div class="relative py-20 overflow-hidden bg-(--bg-section) transition-all duration-500">
      <div class="absolute inset-0 opacity-[0.03] dark:opacity-[0.06]" style="background-image: radial-gradient(circle at 1px 1px, var(--color-brand) 1px, transparent 0); background-size: 32px 32px;" />
      
      <div class="section-wrapper relative z-10 text-center space-y-4 reveal">
        <div class="section-tag mx-auto">Offers</div>
        <h1 class="section-title text-5xl md:text-6xl">Penawaran Spesial</h1>
        <p class="text-secondary text-sm md:text-base max-w-xl mx-auto">
          Momen berharga tidak harus mahal. Temukan promo terbaik kami.
        </p>
      </div>
    </div>

    <!-- Promo Cards -->
    <section class="section-wrapper py-20">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div 
          v-for="promo in promos" 
          :key="promo.title"
          class="card-premium p-8 space-y-6 group hover:border-rose-300 transition-all text-center relative overflow-hidden"
        >
          <div class="absolute top-0 right-0 w-24 h-24 bg-rose-50 dark:bg-rose-950/20 rounded-bl-[4rem] -mr-4 -mt-4 transition-all group-hover:scale-110 pointer-events-none" />
          
          <div class="w-16 h-16 rounded-2xl bg-rose-50 dark:bg-rose-950/30 flex items-center justify-center mx-auto text-rose-600 relative z-10">
            <Icon :name="promo.icon" size="32" />
          </div>

          <div class="space-y-2 relative z-10">
            <h3 class="text-xl font-black text-primary">{{ promo.title }}</h3>
            <p class="text-secondary text-sm leading-relaxed">{{ promo.desc }}</p>
          </div>

          <div class="pt-4 relative z-10">
            <div class="px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border-2 border-dashed border-rose-200 dark:border-rose-900/40 flex items-center justify-between">
              <span class="text-xs font-black tracking-widest text-primary">{{ promo.code }}</span>
              <button class="text-[10px] font-black uppercase text-rose-600 hover:text-rose-700">Salin</button>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-20 text-center p-12 rounded-[3rem] bg-rose-600 text-white space-y-6 shadow-2xl shadow-rose-500/20">
        <h2 class="text-3xl font-black">Flash Sale Hari Ini</h2>
        <p class="text-rose-100 max-w-lg mx-auto">Jangan sampai ketinggalan promo harian kami dengan diskon hingga 50% untuk item pilihan.</p>
        <NuxtLink to="/products" class="btn-premium bg-white text-rose-600 hover:bg-rose-50 mx-auto">
          Belanja Produk Promo
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

<style scoped>
.promo-page {
  background-color: var(--bg-main);
}
</style>
