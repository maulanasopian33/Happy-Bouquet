<template>
  <div class="min-h-screen bg-(--bg-main) transition-colors duration-500">

    <!-- ======= BREADCRUMBS (design/home/code.html: section breadcrumb bar) ======= -->
    <div class="w-full bg-(--bg-section) py-4">
      <div class="section-wrapper flex flex-wrap items-center justify-between gap-3 text-sm">
        <nav class="flex items-center gap-2 text-(--text-muted) min-w-0">
          <NuxtLink to="/" class="hover:text-rose-600 transition-colors">Beranda</NuxtLink>
          <span class="opacity-40">/</span>
          <NuxtLink to="/products" class="hover:text-rose-600 transition-colors">Koleksi Produk</NuxtLink>
          <template v-if="product?.category">
            <span class="opacity-40">/</span>
            <NuxtLink
              :to="`/products?cat=${encodeURIComponent(product.category)}`"
              class="hover:text-rose-600 transition-colors truncate max-w-[10rem]"
            >{{ product.category }}</NuxtLink>
          </template>
          <span class="opacity-40">/</span>
          <span class="text-rose-600 font-medium truncate max-w-xs sm:max-w-sm">
            {{ product?.name || 'Detail Produk' }}
          </span>
        </nav>

        <span
          v-if="product"
          class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-(--bg-card) border border-(--border-color) text-rose-600 text-xs font-bold tracking-wider uppercase shrink-0"
        >
          <span class="w-2 h-2 rounded-full bg-rose-600 animate-ping"></span>
          {{ product.type === 'preorder' ? `Preorder ${product.preorderDuration || '-'} Hari` : 'Ready Stock' }}
        </span>
      </div>
    </div>

    <!-- ======= MAIN CONTENT ======= -->
    <div class="section-wrapper pt-6 lg:pt-10 pb-24 lg:pb-32">
      <ProductDetailPage :product="product" :related="related" :loading="loading" :error="error" />
    </div>

  </div>
</template>

<script setup lang="ts">
import ProductDetailPage from '~/components/product/ProductDetailPage.vue'

const route = useRoute()
const productSlug = computed(() => route.params.slug as string)

// Pemilik tunggal fetch — ProductDetailPage menerima data via props.
// Kalau komponen juga memanggil composable ini, useAsyncData jalan 2×
// per render (dedupe 'cancel' = fetch pertama dibatalkan percuma).
const { product, related, loading, error } = useProductDetail(productSlug)

// ===== SEO =====
useHead({
  titleTemplate: (title) => title ? `${title} — HappyBouquet` : 'Detail Produk — HappyBouquet',
})
</script>
