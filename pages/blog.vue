<script setup lang="ts">
useHead({
  title: 'Inspirasi Bunga — HappyBouquet',
  meta: [
    { name: 'description', content: 'Temukan tips perawatan bunga, makna di balik setiap kelopak, dan inspirasi kado terbaik di Blog HappyBouquet.' }
  ]
})
</script>

<template>
  <div class="blog-page pb-20">
    <!-- Page Hero -->
    <div class="relative py-20 overflow-hidden bg-(--bg-section) transition-all duration-500">
      <div class="absolute inset-0 opacity-[0.03] dark:opacity-[0.06]" style="background-image: radial-gradient(circle at 1px 1px, var(--color-brand) 1px, transparent 0); background-size: 32px 32px;" />
      
      <div class="section-wrapper relative z-10 text-center space-y-4 reveal">
        <div class="section-tag mx-auto">Journal</div>
        <h1 class="section-title text-5xl md:text-6xl">Inspirasi Bunga</h1>
        <p class="text-secondary text-sm md:text-base max-w-xl mx-auto">
          Melihat keindahan dari sudut pandang yang berbeda.
        </p>
      </div>
    </div>

    <!-- Placeholder Content -->
    <section class="section-wrapper py-24">
      <div class="max-w-4xl mx-auto space-y-16 text-center">
        <div class="space-y-6">
          <div class="w-24 h-24 rounded-full bg-rose-50 dark:bg-rose-900/20 flex items-center justify-center mx-auto mb-8 animate-float">
            <Icon name="ph:notebook-duotone" size="40" class="text-rose-600" />
          </div>
          <h2 class="text-3xl font-black text-primary italic">Sedang Menulis Cerita Baru...</h2>
          <p class="text-secondary leading-relaxed">
            Kami sedang menyiapkan artikel-artikel menarik seputar tips merawat bunga agar tahan lama, 
            arti simbolis setiap warna bunga, dan panduan memilih buket untuk momen spesialmu.
          </p>
        </div>

        <!-- Featured Posts Mock -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 text-left opacity-30 pointer-events-none select-none">
          <div v-for="i in 2" :key="i" class="card-premium p-6 space-y-4 grayscale">
            <div class="aspect-video bg-slate-200 dark:bg-slate-800 rounded-2xl overflow-hidden shimmer" />
            <div class="space-y-2">
              <div class="h-4 w-1/4 bg-slate-200 rounded-full" />
              <div class="h-6 w-3/4 bg-slate-200 rounded-full" />
              <div class="h-4 w-full bg-slate-200 rounded-full" />
            </div>
          </div>
        </div>

        <div class="pt-8">
          <NuxtLink to="/products" class="btn-premium">
            <Icon name="ph:shopping-cart" size="20" />
            Kembali Belanja
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.blog-page {
  background-color: var(--bg-main);
}
</style>
