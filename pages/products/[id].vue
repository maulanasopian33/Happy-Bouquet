<template>
  <div class="min-h-screen bg-(--bg-main) transition-colors duration-500">
    
    <!-- ======= BREADCRUMBS ======= -->
    <div class="section-wrapper py-6">
      <nav class="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-muted">
        <NuxtLink to="/" class="hover:text-rose-600 transition-colors">Beranda</NuxtLink>
        <span class="opacity-30">/</span>
        <NuxtLink to="/products" class="hover:text-rose-600 transition-colors">Koleksi Produk</NuxtLink>
        <span class="opacity-30">/</span>
        <span class="text-rose-600 line-clamp-1">Detail Produk</span>
      </nav>
    </div>

    <!-- ======= MAIN CONTENT ======= -->
    <div class="section-wrapper pb-24 lg:pb-32">
      <ProductDetailPage :id="productId" />
    </div>

  </div>
</template>

<script setup lang="ts">
import ProductDetailPage from '~/components/product/ProductDetailPage.vue'

const route = useRoute()
const productId = computed(() => parseInt(route.params.id as string, 10))

// ===== SEO =====
useHead({
  titleTemplate: (title) => title ? `${title} — HappyBouquet` : 'Detail Produk — HappyBouquet',
})
</script>
