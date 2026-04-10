<template>
  <div class="min-h-screen bg-(--bg-main) transition-colors duration-500 pb-24">
    
    <!-- ======= HERO SECTION ======= -->
    <div class="section-wrapper py-20 lg:py-32">
      <div class="reveal max-w-3xl">
        <div class="section-tag">Keamanan & Kepercayaan</div>
        <h1 class="section-title text-4xl md:text-6xl text-gradient font-serif">Kebijakan Privasi</h1>
        <p class="text-xs md:text-sm text-secondary font-black uppercase tracking-[0.2em] mt-6">Terakhir Diperbarui: 02 April 2026</p>
      </div>
    </div>

    <!-- ======= CONTENT SECTION ======= -->
    <div class="section-wrapper relative">
      <div class="max-w-4xl mx-auto reveal">
        <div class="card-premium p-8 md:p-16 space-y-12 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl">
           
           <div class="space-y-6">
              <h2 class="text-2xl font-black text-primary tracking-tight flex items-center gap-3">
                 <Icon name="ph:shield-check-fill" class="text-rose-500 w-7 h-7" />
                 Komitmen Kami
              </h2>
              <p class="text-sm md:text-base text-secondary leading-relaxed font-medium">
                Privasi Anda adalah prioritas utama di HappyBouquet. Kami merangkai pengalaman belanja Anda dengan perhatian yang sama seperti kami merangkai bunga—dengan penuh kepedulian dan integritas. Dokumen ini menjelaskan bagaimana kami mengelola data Anda.
              </p>
           </div>

           <div v-for="(section, i) in sections" :key="i" class="space-y-4 border-t border-(--border-color) pt-8">
              <h3 class="text-base font-black text-primary uppercase tracking-widest">{{ section.title }}</h3>
              <p class="text-sm text-secondary leading-relaxed whitespace-pre-line">{{ section.content }}</p>
           </div>

           <!-- Contact for privacy -->
           <div class="bg-rose-50 dark:bg-rose-950/20 rounded-3xl p-8 border border-rose-100 dark:border-rose-900/40 text-center">
              <p class="text-xs font-black text-rose-600 uppercase tracking-widest mb-2">Pertanyaan seputar privasi?</p>
              <p class="text-sm font-medium text-secondary mb-4">Hubungi Petugas Perlindungan Data kami di:</p>
              <a href="mailto:privacy@happybouquet.id" class="text-lg font-black text-primary hover:text-rose-600 transition-colors">privacy@happybouquet.id</a>
           </div>

        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
const sections = [
  { 
    title: '1. Informasi yang Kami Kumpulkan', 
    content: 'Kami mengumpulkan informasi yang Anda berikan langsung kepada kami saat melakukan pemesanan, membuat akun, atau menghubungi tim concierge kami. Hal ini termasuk:\n\n• Identitas Dasar: Nama, alamat email, dan nomor telepon.\n• Pengiriman: Alamat tujuan dan detail penerima kebahagiaan Anda.\n• Transaksi: Riwayat pembelian dan pilihan bunga favorit Anda.' 
  },
  { 
    title: '2. Pengunaan Data Anda', 
    content: 'Data Anda digunakan semata-mata untuk memberikan layanan terbaik, termasuk:\n\n• Memproses pengiriman buket bunga tepat waktu.\n• Mengirimkan update pelacakan pesanan secara real-time.\n• Memberikan rekomendasi bunga berdasarkan preferensi Anda melalui program loyalitas.' 
  },
  { 
    title: '3. Keamanan Informasi', 
    content: 'Kami mengimplementasikan enkripsi standar industri (SSL/TLS) untuk melindungi transmisi data sensitif Anda. HappyBouquet tidak pernah menyimpan informasi kartu kredit secara langsung; semua pembayaran diproses oleh mitra gerbang pembayaran yang tersertifikasi PCI-DSS.' 
  },
  { 
    title: '4. Berbagi Informasi dengan Pihak Ketiga', 
    content: 'Kami hanya berbagi data Anda dengan mitra terpercaya untuk tujuan operasional, seperti:\n\n• Kurir logistik untuk pengantaran buket.\n• Mitra pembayaran untuk verifikasi transaksi.\n• Kami tidak akan pernah menjual data pribadi Anda kepada pihak iklan manapun.' 
  }
]

useHead({
  title: 'Kebijakan Privasi - HappyBouquet'
})
</script>

<style scoped>
.reveal {
  opacity: 0;
  animation: revealUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

@keyframes revealUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
