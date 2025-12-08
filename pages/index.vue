<template>
  <div>
    <!-- MAIN LAYOUT GRID -->
    <section class="max-w-7xl mx-auto px-4 lg:px-8 py-6 grid grid-cols-1 lg:grid-cols-3 gap-6">

      <!-- LEFT CONTENT -->
      <div class="lg:col-span-2 space-y-6">
        <!-- Slider Banner -->
      <HeroSlider :images="heroImages" />

      <!-- Quick Categories -->
      <QuickCategories :categories="categories" @select="goToCategory" />

      <!-- Product Recommendation -->
      <ProductCarousel
        title="Rekomendasi Untukmu"
        :products="recoProducts"
        @view="openQuickView"
      />
      </div>

      <!-- RIGHT SIDEBAR -->
      <aside class="space-y-6">
        <!-- Flash Sale -->
        <FlashSale :products="flashSale" />
        <TestimonialSlider :testimonials="testimonials" />
      </aside>

    </section>
    <!-- Product SECTION -->
    <section class="max-w-7xl mx-auto px-4 lg:px-8 py-6 space-y-6">
      <!-- Product Grid -->
        <ProductGrid :products="allProducts" @view="openQuickView" />
    </section>

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// Components
import HeroSlider from '@/components/home/hero/HeroSlider.vue'
import QuickCategories from '@/components/home/hero/QuickCategories.vue'
import ProductCarousel from '@/components/product/ProductCarousel.vue'
import FlashSale from '@/components/home/hero/FlashSale.vue'
import ProductGrid from '@/components/product/ProductGrid.vue'
import TestimonialSlider from '@/components/testimonial/TestimonialSlider.vue'

// ===== HERO IMAGES =====
const heroImages = [
  "https://images.unsplash.com/photo-1519741497674-611481863552?q=80",
  "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?q=80",
  "https://images.unsplash.com/photo-1520975916680-8f6b1f0d6f11?q=80",
]

// ===== QUICK CATEGORIES =====
const categories = [
  { name: "Bunga Segar", icon: "ph:flower-lotus-bold" },
  { name: "Wisuda", icon: "ph:graduation-cap-bold" },
  { name: "Ulang Tahun", icon: "ph:gift-bold" },
  { name: "Buket Snack", icon: "ph:cookie-bold" },
  { name: "Buket Uang", icon: "ph:money-bold" },
  { name: "Bunga Papan", icon: "ph:image-square-bold" },
  { name: "Hadiah Custom", icon: "ph:magic-wand-bold" },
]

// ===== REKOMENDASI PRODUK =====
const recoProducts = [
  {
    id: 1,
    name: "Buket Mix Wedding",
    price: 150000,
    description: "Buket cantik premium",
    rating: 4.8,
    reviewCount: 88,
    image: "https://images.unsplash.com/photo-1547096301-4ebda79e93d7?q=80",
    options: {
      ukuran: ['Sedang', 'Besar'],
      kertas_pembungkus: ['Pink', 'Putih', 'Biru']
    }
  },
  {
    id: 2,
    name: "Buket Minimalis",
    price: 95000,
    description: "Simple & elegan",
    rating: 4.5,
    reviewCount: 102,
    image: "https://images.unsplash.com/photo-1528825871115-3581a5387919?q=80",
    options: {
      warna_kertas: ['Kraft Coklat', 'Hitam', 'Putih']
    }
  },
  {
    id: 3,
    name: "Buket Bunga Matahari",
    price: 125000,
    description: "Penuh keceriaan & semangat",
    rating: 4.9,
    reviewCount: 120,
    image: "https://images.unsplash.com/photo-1597822622510-cd5368da973d?q=80",
    options: {
      ukuran: ['Kecil', 'Sedang'],
      tambahan_bunga: ['Baby Breath', 'Tanpa Tambahan']
    }
  },
  {
    id: 4,
    name: "Buket Tulip Putih",
    price: 180000,
    description: "Melambangkan kesucian & cinta",
    rating: 4.7,
    reviewCount: 75,
    image: "https://images.unsplash.com/photo-1518701006-57d5488e7a84?q=80",
    options: {
      jumlah_tangkai: ['5', '7', '10'],
      warna_kertas: ['Putih', 'Transparan']
    }
  }
]

// ===== FLASH SALE =====
const flashSale = [
  {
    id: 11,
    name: "Buket Mawar Pink",
    price: 75000,
    original: "Rp 120.000",
    image: "https://images.unsplash.com/photo-1504208434309-cb69f4fe52b0?q=80",
    options: {
      jumlah_mawar: ['3', '5'],
      warna_kertas: ['Pink', 'Putih']
    }
  },
  {
    id: 12,
    name: "Buket Wisuda Blue",
    price: 55000,
    original: "Rp 90.000",
    image: "https://images.unsplash.com/photo-1510437094962-85b7d0a1c8da?q=80",
    options: {
      boneka: ['Teddy Bear', 'Tanpa Boneka'],
      warna_kertas: ['Biru', 'Silver']
    }
  },
  {
    id: 13,
    name: "Snack & Drink Bouquet",
    price: 99000,
    original: "Rp 150.000",
    image: "https://images.unsplash.com/photo-1618833818273-7572a25c6547?q=80",
    options: {
      minuman: ['Coca-cola', 'Sprite'],
      snack_tambahan: ['Oreo', 'Chitato']
    }
  }
]

// ===== ALL PRODUCTS (GRID) =====
const allProducts = [
  {
    id: 1,
    name: "Buket Mix Wedding",
    price: 150000,
    description: "Buket cantik premium",
    rating: 4.8,
    reviewCount: 88,
    image: "https://images.unsplash.com/photo-1547096301-4ebda79e93d7?q=80",
    options: {
      ukuran: ['Sedang', 'Besar'],
      kertas_pembungkus: ['Pink', 'Putih', 'Biru']
    }
  },
  {
    id: 2,
    name: "Buket Minimalis",
    price: 95000,
    description: "Simple & elegan",
    rating: 4.5,
    reviewCount: 102,
    image: "https://images.unsplash.com/photo-1528825871115-3581a5387919?q=80",
    options: {
      warna_kertas: ['Kraft Coklat', 'Hitam', 'Putih']
    }
  },
  {
    id: 3,
    name: "Buket Bunga Matahari",
    price: 125000,
    description: "Penuh keceriaan & semangat",
    rating: 4.9,
    reviewCount: 120,
    image: "https://images.unsplash.com/photo-1597822622510-cd5368da973d?q=80",
    options: {
      ukuran: ['Kecil', 'Sedang'],
      tambahan_bunga: ['Baby Breath', 'Tanpa Tambahan']
    }
  },
  {
    id: 4,
    name: "Buket Tulip Putih",
    price: 180000,
    description: "Melambangkan kesucian & cinta",
    rating: 4.7,
    reviewCount: 75,
    image: "https://images.unsplash.com/photo-1518701006-57d5488e7a84?q=80",
    options: {
      jumlah_tangkai: ['5', '7', '10'],
      warna_kertas: ['Putih', 'Transparan']
    }
  },
  {
    id: 24,
    name: "Buket Uang Fantasi",
    price: 350000,
    description: "Hadiah unik dan berkesan",
    rating: 5.0,
    reviewCount: 55,
    image: "https://images.unsplash.com/photo-1627863453293-552b38446d3a?q=80",
    options: {
      pecahan_uang: ['Rp 50.000', 'Rp 100.000'],
      jumlah_lembar: ['10 Lembar', '20 Lembar', '30 Lembar']
    }
  },
  {
    id: 25,
    name: "Buket Snack Cokelat",
    price: 115000,
    description: "Untuk pecinta cokelat",
    rating: 4.8,
    reviewCount: 98,
    image: "https://images.unsplash.com/photo-1600185815492-405a5a3598d4?q=80",
    options: {
      jenis_cokelat: ['Silverqueen', 'Cadbury', 'KitKat'],
      tambahan: ['Pocky', 'Tanpa Tambahan']
    }
  }
]

// ===== TESTIMONI =====
const testimonials = [
  { text: "Buketnya fresh dan cantik!", name: "Rina, Jakarta" },
  { text: "Pengerjaannya rapi, recommended!", name: "Dedi, Bandung" }
]

// ===== STATE: Product Modal =====
const productModal = useProductModalStore()
const openQuickView = (product: any) => {
  productModal.openModal(product)
}

// ===== CATEGORY REDIRECT =====
const goToCategory = (cat: any) => {
  console.log("Kategori dipilih:", cat)
  // useRouter().push(`/category/${cat.name.toLowerCase()}`)
}
</script>
