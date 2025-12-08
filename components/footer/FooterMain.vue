<template>
  <footer class="bg-gray-900 text-white pt-16 pb-6 mt-12">
    <div class="container mx-auto px-4">
      <!-- Main Footer Grid (Expanded to 5 columns on large screens) -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
        
        <!-- Brand & Newsletter -->
        <div class="sm:col-span-2 lg:col-span-1">
          <NuxtLink to="/" class="flex items-center text-2xl font-bold text-white mb-4">
            <Icon name="ph:flower-lotus-bold" class="mr-2 text-rose-400" />
            HappyBouquet
          </NuxtLink>
          <p class="text-gray-400 text-sm mb-6">Membawa kebahagiaan dalam setiap rangkaian bunga.</p>
          <h5 class="font-semibold mb-2">Dapatkan Info & Promo Spesial</h5>
          <div class="flex">
            <input type="email" placeholder="Alamat email Anda" class="w-full px-4 py-2 text-gray-800 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-rose-500">
            <button class="bg-rose-600 text-white px-4 py-2 rounded-r-lg hover:bg-rose-700 transition-colors">Daftar</button>
          </div>
        </div>

        <!-- About Us -->
        <div>
          <h4 class="font-bold text-lg mb-4">Tentang Kami</h4>
          <ul class="space-y-2 text-gray-400">
            <li><NuxtLink to="/about" class="hover:text-white transition-colors">Cerita Kami</NuxtLink></li>
            <li><NuxtLink to="/blog" class="hover:text-white transition-colors">Blog & Inspirasi</NuxtLink></li>
            <li><NuxtLink to="/corporate-orders" class="hover:text-white transition-colors">Pesanan Korporat</NuxtLink></li>
            <li><NuxtLink to="/careers" class="hover:text-white transition-colors">Karir</NuxtLink></li>
            <li><NuxtLink to="/media" class="hover:text-white transition-colors">Untuk Media</NuxtLink></li>
          </ul>
        </div>

        <!-- Customer Service -->
        <div>
          <h4 class="font-bold text-lg mb-4">Bantuan</h4>
          <ul class="space-y-2 text-gray-400">
            <li><NuxtLink to="/faq" class="hover:text-white transition-colors">FAQ</NuxtLink></li>
            <li><NuxtLink to="/contact" class="hover:text-white transition-colors">Hubungi Kami</NuxtLink></li>
            <li><NuxtLink to="/how-to-order" class="hover:text-white transition-colors">Cara Belanja</NuxtLink></li>
            <li><NuxtLink to="/shipping" class="hover:text-white transition-colors">Info Pengiriman</NuxtLink></li>
            <li><NuxtLink to="/returns" class="hover:text-white transition-colors">Kebijakan Pengembalian</NuxtLink></li>
          </ul>
        </div>

        <!-- Store Information -->
        <div>
          <h4 class="font-bold text-lg mb-4">Toko Kami</h4>
          <div class="text-gray-400 text-sm space-y-3">
            <p>Jl. Kebahagiaan No. 123,<br>Jakarta Selatan, 12345</p>
            <p>
              <span class="font-semibold text-gray-200">Jam Buka:</span><br>
              Senin - Sabtu: 09:00 - 20:00<br>
              Minggu: 10:00 - 18:00
            </p>
          </div>
        </div>

        <!-- Social & Security -->
        <div>
          <h4 class="font-bold text-lg mb-4">Ikuti Kami</h4>
          <div class="flex space-x-4 mb-6">
            <a href="#" class="text-gray-400 hover:text-white transition-colors" title="Instagram"><Icon name="mdi:instagram" class="h-6 w-6" /></a>
            <a href="#" class="text-gray-400 hover:text-white transition-colors" title="Facebook"><Icon name="mdi:facebook" class="h-6 w-6" /></a>
            <a href="#" class="text-gray-400 hover:text-white transition-colors" title="TikTok"><Icon name="mdi:tiktok" class="h-6 w-6" /></a>
            <a href="#" class="text-gray-400 hover:text-white transition-colors" title="WhatsApp"><Icon name="mdi:whatsapp" class="h-6 w-6" /></a>
          </div>
          <h4 class="font-bold text-lg mb-4">100% Aman & Terpercaya</h4>
          <div class="flex flex-wrap gap-2 items-center">
            <img src="https://placehold.co/50x30/ffffff/a3a3a3?text=BCA" alt="BCA" class="h-6 rounded-sm">
            <img src="https://placehold.co/50x30/ffffff/a3a3a3?text=GOPAY" alt="Gopay" class="h-6 rounded-sm">
            <img src="https://placehold.co/50x30/ffffff/a3a3a3?text=OVO" alt="OVO" class="h-6 rounded-sm">
            <img src="https://placehold.co/50x30/ffffff/a3a3a3?text=VISA" alt="Visa" class="h-6 rounded-sm">
          </div>
        </div>
      </div>

      <!-- Sub Footer -->
      <div class="border-t border-gray-700 pt-6 flex flex-col sm:flex-row justify-between items-center text-center">
        <p class="text-gray-500 text-sm mb-2 sm:mb-0">&copy; {{ new Date().getFullYear() }} HappyBouquet. Semua Hak Dilindungi.</p>
        <div class="flex space-x-4 text-gray-500 text-sm">
          <NuxtLink to="/privacy-policy" class="hover:text-white transition-colors">Kebijakan Privasi</NuxtLink>
          <NuxtLink to="/terms-of-service" class="hover:text-white transition-colors">Syarat & Ketentuan</NuxtLink>
        </div>
      </div>

    </div>
  </footer>
</template>
