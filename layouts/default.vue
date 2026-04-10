<!-- layouts/default.vue -->
<template>
  <div class="min-h-screen flex flex-col bg-(--bg-main) transition-colors duration-300">

    <HeaderMain />

    <main class="grow pb-16 md:pb-0">
      <slot />
    </main>

    <FooterMain />

    <!-- Cart Modal -->
    <CartModal />

    <!-- Product Variant Modal -->
    <ProductVariantModal />

    <!-- Mobile Bottom Navigation Bar -->
    <MobileBottomBar
      @open-cart="openCart"
      @open-search="openSearch"
    />
  </div>
</template>

<script setup>
import HeaderMain from '~/components/header/HeaderMain.vue'
import FooterMain from '~/components/footer/FooterMain.vue'
import CartModal from '~/components/cart/CartModal.vue'
import ProductVariantModal from '~/components/product/ProductVariantModal.vue'
import MobileBottomBar from '~/components/header/MobileBottomBar.vue'

const cartStore = useCartStore()
const openCart = () => cartStore.showCart(true)
const openSearch = () => {
  // Emit ke header untuk membuka mobile search — bisa dikembangkan via eventBus
  // Untuk sementara, scroll ke atas agar header terlihat
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>
