<template>
  <div class="min-h-screen bg-[#0e0e10] text-[#e5e1e4] font-sans transition-colors duration-500">

    <!-- ======= BREADCRUMB & QUICK TRUST BAR ======= -->
    <section class="w-full bg-[#0e0e10] border-b border-[#4a4538]/30 px-4 sm:px-8 lg:px-12 py-4">
      <div class="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-sm">
        <nav class="flex items-center gap-2 text-[#b8b2a3] min-w-0 flex-wrap">
          <NuxtLink to="/" class="hover:text-[#d4af37] transition-colors">Beranda</NuxtLink>
          <span class="opacity-40">/</span>
          <NuxtLink to="/products" class="hover:text-[#d4af37] transition-colors">Katalog Koleksi</NuxtLink>
          <template v-if="product?.category">
            <span class="opacity-40">/</span>
            <NuxtLink
              :to="`/products?cat=${encodeURIComponent(product.category)}`"
              class="hover:text-[#d4af37] transition-colors truncate max-w-[10rem]"
            >{{ product.category }}</NuxtLink>
          </template>
          <span class="opacity-40">/</span>
          <span class="text-[#d4af37] font-medium truncate max-w-xs sm:max-w-sm">
            {{ product?.name || 'Detail Produk' }}
          </span>
        </nav>

        <div class="flex items-center gap-3">
          <span
            v-if="product"
            class="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1f1f21] border border-[#d4af37]/30 text-[#d4af37] text-xs font-semibold tracking-wider uppercase shrink-0"
          >
            <span class="w-2 h-2 rounded-full bg-[#d4af37] animate-ping"></span>
            {{ product.type === 'preorder' ? `Preorder ${product.preorderDuration || '-'} Hari` : 'Ready Stock Hari Ini' }}
          </span>
        </div>
      </div>
    </section>

    <!-- ======= MAIN CONTENT ======= -->
    <div class="w-full pb-24 lg:pb-32">
      <ProductDetailPage :product="product" :related="related" :loading="loading" :error="error" />
    </div>

  </div>
</template>

<script setup lang="ts">
import ProductDetailPage from '~/components/product/ProductDetailPage.vue'

const route = useRoute()
const productSlug = computed(() => route.params.slug as string)

// Pemilik tunggal fetch — ProductDetailPage menerima data via props.
// Menghindari fetch 2x per render (aturan SSR e-commerce).
const { product, related, loading, error } = useProductDetail(productSlug)

// ===== SEO Head =====
useHead({
  titleTemplate: (title) => title ? `${title} — HappyBouquet Artisan Florist` : 'Detail Produk — HappyBouquet Artisan Florist',
})
</script>
