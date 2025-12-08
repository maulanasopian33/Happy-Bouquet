<template>
  <div class="container mx-auto my-12 px-4">
    <div class="grid grid-cols-1 md:grid-cols-4 gap-8">

    <!-- Sidebar -->
    <aside class="md:col-span-1 bg-white p-6 rounded-xl shadow-md h-fit">
      <h3 class="font-bold text-xl mb-4">Kategori</h3>
      <ul class="space-y-2">
        <li v-for="c in categories">
          <button class="block w-full text-left p-2 hover:bg-rose-50 rounded-lg">
            {{ c }}
          </button>
        </li>
      </ul>
    </aside>

    <!-- Products -->
    <section class="md:col-span-3">
      <!-- Carousel Section -->
      <div class="mb-12">
        <h2 class="text-3xl font-bold mb-6">Produk Unggulan</h2>
        <ProductCarousel :products="products" />
      </div>

      <!-- All Products Section -->
      <div>
        <h2 class="text-3xl font-bold mb-6">Semua Produk</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <ProductCard v-for="item in products" :key="item.id" v-bind="item" />
        </div>
      </div>
    </section>
    </div>

  </div>
</template>

<script setup>
import ProductCard from '~/components/product/ProductCard.vue'
import ProductCarousel from '~/components/product/ProductCarousel.vue'

const categories = [
  "Semua Buket",
  "Buket Bunga Segar",
  "Buket Snack",
  "Buket Uang",
  "Buket Wisuda",
  "Buket Custom"
]

const products = [
  {
    id: 1,
    name: "Buket Mawar Merah Romantis",
    price: 250000,
    image: "https://images.unsplash.com/photo-1587334274328-64186a80aeee?q=80&w=1974&auto=format&fit=crop",
    description: "Untuk ulang tahun atau hari jadi",
    rating: 4.9,
    reviewCount: 210,
    options: {
      ukuran: ['Kecil', 'Sedang', 'Besar'],
      warna_kertas: ['Putih', 'Hitam', 'Pink', 'Biru Muda']
    }
  },
  {
    id: 2,
    name: "Buket Snack Ceria",
    price: 150000,
    image: "https://images.unsplash.com/photo-1618833818273-7572a25c6547?q=80&w=2070&auto=format&fit=crop",
    description: "Hadiah wisuda atau ulang tahun",
    rating: 4.8,
    reviewCount: 154,
    options: {
      tema_warna: ['Merah', 'Biru', 'Kuning'],
      snack_utama: ['Cokelat', 'Keripik Kentang']
    }
  },
  {
    id: 3,
    name: "Buket Uang Elegan",
    price: 500000,
    image: "https://images.unsplash.com/photo-1627863453293-552b38446d3a?q=80&w=1964&auto=format&fit=crop",
    description: "Untuk hadiah spesial dan mewah",
    rating: 5.0,
    reviewCount: 99,
    options: {
      pecahan_uang: ['Rp 50.000', 'Rp 100.000'],
      jumlah_lembar: ['10 Lembar', '20 Lembar', '30 Lembar']
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
    id: 5,
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
  // tambahkan data lain
]
</script>
