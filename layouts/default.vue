<!-- layouts/default.vue -->
<template>
  <div class="min-h-screen flex flex-col bg-[#f0f2f5]">
    
    <HeaderMain />

    <main class="grow">
      <slot />
    </main>

    <FooterMain />

    <!-- Cart Modal -->
    <CartModal />

    <!-- Product Variant Modal -->
    <ProductVariantModal />
  </div>
</template>

<script setup>
import HeaderMain from '~/components/header/HeaderMain.vue'
import FooterMain from '~/components/footer/FooterMain.vue'
import CartModal from '~/components/cart/CartModal.vue'
import ProductVariantModal from '~/components/product/ProductVariantModal.vue'
</script>
