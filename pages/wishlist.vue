<template>
  <div class="min-h-screen bg-(--bg-main) transition-colors duration-500 pb-24">
    
    <!-- ======= HEADER SECTION ======= -->
    <div class="section-wrapper py-12 md:py-20">
      <div class="reveal max-w-2xl">
        <div class="section-tag">Koleksi Anda</div>
        <h1 class="section-title text-gradient">Daftar Keinginan</h1>
        <p class="text-sm md:text-base text-secondary font-medium mt-2 leading-relaxed">
          Simpan buket favorit Anda di sini. Klik ikon hati pada produk apa pun untuk menambahkannya ke daftar ini.
        </p>
      </div>
    </div>

    <!-- ======= WISHLIST CONTENT ======= -->
    <div class="section-wrapper">
      <TransitionGroup 
        v-if="wishlist.items.length > 0"
        tag="div" 
        name="list"
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
      >
        <div v-for="product in wishlist.items" :key="product.id" class="reveal">
          <ProductCard
            :id="product.id"
            :name="product.title || product.name"
            :price="product.price"
            :original-price="product.originalPrice"
            :image="product.image"
            :badge="product.badge"
            :category="product.category"
            :rating="product.rating"
            :review-count="product.reviewCount"
            @view="onViewProduct"
          />
        </div>
      </TransitionGroup>

      <!-- Empty State -->
      <div v-else class="reveal flex flex-col items-center justify-center py-20 px-6 text-center space-y-8 card-premium max-w-3xl mx-auto">
        <div class="relative">
          <div class="w-32 h-32 rounded-full bg-rose-50 dark:bg-rose-950/30 flex items-center justify-center text-rose-300">
            <Icon name="ph:heart-break-duotone" class="w-16 h-16" />
          </div>
          <div class="absolute -top-2 -right-2 w-10 h-10 rounded-full bg-white dark:bg-slate-900 border-2 border-rose-100 flex items-center justify-center shadow-lg">
            <Icon name="ph:sparkle-bold" class="w-5 h-5 text-rose-500 animate-pulse" />
          </div>
        </div>
        
        <div class="space-y-3">
          <h2 class="text-2xl font-black text-primary">Belum Ada Favorit?</h2>
          <p class="text-secondary text-sm font-medium max-w-md mx-auto leading-relaxed">
            Sepertinya Anda belum menemukan buket yang mencuri hati. Mari jelajahi koleksi terbaik kami untuk momen spesial Anda.
          </p>
        </div>

        <div class="flex flex-col sm:flex-row gap-4 pt-4">
          <NuxtLink to="/products" class="btn-premium px-10">Mulai Jelajah</NuxtLink>
          <NuxtLink to="/" class="btn-premium-outline px-10">Kembali Beranda</NuxtLink>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
const wishlist = useWishlistStore()
const productModal = useProductModalStore()

const onViewProduct = (product: any) => {
  productModal.openModal(product)
}

useHead({
  title: 'Wishlist - HappyBouquet'
})
</script>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.reveal {
  opacity: 0;
  animation: revealUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

@keyframes revealUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
