<template>
  <div class="min-h-screen bg-(--bg-main) transition-colors duration-500 pb-24">
    
    <!-- ======= HERO SECTION ======= -->
    <div class="section-wrapper py-20 lg:py-32">
      <div class="reveal max-w-3xl">
        <div class="section-tag">Ketentuan Penggunaan</div>
        <h1 class="section-title text-4xl md:text-6xl text-gradient font-serif">Terms of Service</h1>
        <p class="text-xs md:text-sm text-secondary font-black uppercase tracking-[0.2em] mt-6">Terakhir Diperbarui: 02 April 2026</p>
      </div>
    </div>

    <!-- ======= CONTENT SECTION ======= -->
    <div class="section-wrapper relative">
      <div class="max-w-4xl mx-auto reveal">
        <div class="card-premium p-8 md:p-16 space-y-12 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl">
           
           <div class="space-y-6">
              <h2 class="text-2xl font-black text-primary tracking-tight">Perjanjian Layanan</h2>
              <p class="text-sm md:text-base text-secondary leading-relaxed font-medium">
                Selamat datang di HappyBouquet. Dengan mengakses situs web ini dan melakukan pembelian, Anda menyetujui ketentuan berikut. Kami berkomitmen untuk memberikan transparansi penuh tentang hak dan kewajiban Anda sebagai anggota komunitas bunga kami.
              </p>
           </div>

           <div v-for="(term, i) in terms" :key="i" class="space-y-4 border-t border-(--border-color) pt-8 group">
              <div class="flex items-center gap-4">
                 <span class="text-xs font-black text-rose-500 bg-rose-50 dark:bg-rose-950/30 w-8 h-8 rounded-full flex items-center justify-center shrink-0">0{{ i + 1 }}</span>
                 <h3 class="text-base font-black text-primary uppercase tracking-widest">{{ term.title }}</h3>
              </div>
              <div class="pl-12">
                 <p class="text-sm text-secondary leading-relaxed whitespace-pre-line">{{ term.content }}</p>
              </div>
           </div>

           <!-- Agreement Note -->
           <div class="p-8 bg-slate-50 dark:bg-slate-950/40 rounded-3xl border border-(--border-color) border-dashed">
              <div class="flex gap-4">
                 <Icon name="ph:info-bold" class="w-6 h-6 text-rose-500 shrink-0 mt-0.5" />
                 <p class="text-xs md:text-sm text-secondary leading-relaxed font-medium italic">
                    Penggunaan layanan kami secara berkelanjutan setelah adanya perubahan akan dianggap sebagai persetujuan Anda atas syarat dan ketentuan yang baru. Jika Anda memiliki pertentangan dengan syarat ini, mohon kordinasikan dengan tim legal kami.
                 </p>
              </div>
           </div>

        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
const terms = [
  { 
    title: 'Keaslian & Variabilitas Produk', 
    content: 'Setiap buket bunga adalah karya tangan unik. Kami berupaya keras untuk mencocokkan desain dengan foto katalog.\n\n• Musiman: Jika bunga tertentu tidak tersedia, kami akan menggantinya dengan nilai yang setara atau lebih tinggi.\n• Visual: Warna bunga dapat sedikit berbeda karena pencahayaan atau resolusi layar Anda.' 
  },
  { 
    title: 'Ketentuan Pembayaran', 
    content: 'Pembayaran harus diselesaikan secara penuh sebelum pesanan diproses dan dikirim.\n\n• Harga: Semua harga yang tertera sudah termasuk pajak yang berlaku.\n• Voucher: Penggunaan kode promo hanya berlaku satu kali per transaksi kecuali dinyatakan lain.' 
  },
  { 
    title: 'Tanggung Jawab Akun', 
    content: 'Anda bertanggung jawab untuk menjaga kerahasiaan informasi akun dan kata sandi Anda.\n\n• Akurasi: Anda setuju untuk memberikan informasi yang akurat dan terkini untuk kemudahan pengiriman.\n• Penyalahgunaan: Kami berhak menonaktifkan akun yang terindikasi melakukan penipuan atau spam.' 
  },
  { 
    title: 'Hak Kekayaan Intelektual', 
    content: 'Seluruh konten dalam situs web HappyBouquet (foto, teks, logo, desain) adalah milik eksklusif kami.\n\n• Larangan: Dilarang keras menggandakan atau menyebarluaskan konten tanpa izin tertulis.\n• Lisensi: Penggunaan logo kami oleh pihak ketiga hanya diperbolehkan untuk keperluan rujukan media resmi.' 
  }
]

useHead({
  title: 'Ketentuan Layanan - HappyBouquet'
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
