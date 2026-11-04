<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{
  error: NuxtError
}>()

const is404 = computed(() => props.error.statusCode === 404)

const handleError = () => {
  clearError({ redirect: '/' })
}

useHead({
  title: is404.value ? '404 - Halaman Tidak Ditemukan | HappyBouquet' : '500 - Terjadi Kendala | HappyBouquet',
  meta: [
    { name: 'robots', content: 'noindex, nofollow' }
  ]
})
</script>

<template>
  <div class="min-h-screen bg-[#131315] text-[#e5e1e4] flex flex-col justify-between selection:bg-[#d4af37] selection:text-[#131315] font-sans">
    <!-- Navbar Minimalis -->
    <header class="w-full border-b border-[#353437]/40 px-6 py-5 flex items-center justify-between max-w-7xl mx-auto">
      <NuxtLink to="/" class="flex items-center gap-2 group">
        <span class="font-serif text-xl font-bold tracking-wider text-[#d4af37] group-hover:text-[#ffe088] transition-colors">
          HAPPYBOUQUET
        </span>
      </NuxtLink>

      <NuxtLink
        to="/products"
        class="text-xs uppercase tracking-widest text-[#b8b2a3] hover:text-[#d4af37] transition-colors font-medium flex items-center gap-1.5"
      >
        <span>Katalog Buket</span>
        <Icon name="ph:arrow-right" size="14" />
      </NuxtLink>
    </header>

    <!-- Konten Utama Error -->
    <main class="flex-1 flex items-center justify-center px-6 py-16">
      <div class="max-w-xl text-center space-y-6">
        <!-- Badge Kode Status -->
        <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#d4af37]/30 bg-[#d4af37]/10 text-[#d4af37] text-xs font-mono font-bold tracking-widest uppercase">
          <span class="w-2 h-2 rounded-full bg-[#d4af37] animate-pulse"></span>
          <span>Status {{ error.statusCode || 500 }}</span>
        </div>

        <!-- Headline & Pesan -->
        <div class="space-y-3">
          <h1 class="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight">
            {{ is404 ? 'Rangkaian Tidak Ditemukan' : 'Keindahan Sedang Disiapkan' }}
          </h1>
          <p class="text-sm sm:text-base text-[#b8b2a3] leading-relaxed max-w-md mx-auto">
            <template v-if="is404">
              Halaman atau buket bunga yang Anda tuju mungkin telah dipindahkan, berganti nama, atau sudah tidak tersedia dalam koleksi musim ini.
            </template>
            <template v-else>
              Sistem kami sedang mengalami pembaruan singkat demi kenyamanan berbelanja Anda. Silakan coba beberapa saat lagi atau hubungi tim florist kami.
            </template>
          </p>
        </div>

        <!-- Tombol Aksi -->
        <div class="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            @click="handleError"
            class="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#d4af37] hover:bg-[#ffe088] text-[#131315] font-bold text-xs uppercase tracking-widest transition-all shadow-lg hover:shadow-[#d4af37]/20 flex items-center justify-center gap-2"
          >
            <Icon name="ph:house-line" size="16" />
            <span>Kembali ke Beranda</span>
          </button>

          <NuxtLink
            to="/products"
            class="w-full sm:w-auto px-6 py-3.5 rounded-xl border border-[#4a4538] hover:border-[#d4af37] text-white hover:text-[#d4af37] font-semibold text-xs uppercase tracking-widest transition-all bg-[#1f1f21]/60 flex items-center justify-center gap-2"
          >
            <Icon name="ph:flower-tulip" size="16" />
            <span>Jelajahi Buket</span>
          </NuxtLink>
        </div>

        <!-- Bantuan Cepat WhatsApp -->
        <div class="pt-8 border-t border-[#353437]/40 text-xs text-[#b8b2a3] flex items-center justify-center gap-2">
          <span>Butuh bantuan khusus?</span>
          <a
            href="https://wa.me/6281234567890?text=Halo%20Florist%20HappyBouquet,%20saya%20mengalami%20kendala%20di%20website"
            target="_blank"
            rel="noopener noreferrer"
            class="text-[#d4af37] hover:underline font-bold flex items-center gap-1"
          >
            <Icon name="ph:whatsapp-logo" size="14" />
            <span>Konsultasi Florist via WhatsApp</span>
          </a>
        </div>
      </div>
    </main>

    <!-- Footer Minimalis -->
    <footer class="w-full border-t border-[#353437]/30 px-6 py-4 text-center text-[11px] text-[#6b675e]">
      &copy; {{ new Date().getFullYear() }} HappyBouquet. Haute Botanique &amp; Luxury Floral Atelier.
    </footer>
  </div>
</template>

