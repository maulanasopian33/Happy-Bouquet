<template>
  <div class="min-h-screen bg-(--bg-main) transition-colors duration-500 pb-24">
    
    <!-- ======= HERO SECTION ======= -->
    <div class="section-wrapper py-20 lg:py-32">
      <div class="reveal max-w-3xl">
        <div class="section-tag">Kebijakan & Jaminan</div>
        <h1 class="section-title text-5xl md:text-6xl text-gradient">Pengembalian & Refund</h1>
        <p class="text-sm md:text-base text-secondary font-medium mt-6 leading-relaxed">
          Kami berkomitmen untuk memberikan bunga terbaik. Jika ada ketidaksesuaian yang signifikan, kami siap memberikan solusi terbaik demi senyum Anda.
        </p>
      </div>
    </div>

    <!-- ======= POLICY STEPS: THE PROCESS ======= -->
    <div class="section-wrapper">
      <div class="text-center mb-16 reveal">
         <h2 class="section-title">Prosedur Pengajuan</h2>
         <p class="text-sm text-secondary font-medium">Langkah sederhana untuk klaim garansi kesegaran.</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-12 reveal">
        <div 
          v-for="(step, i) in policySteps" 
          :key="i"
          class="relative space-y-6 group"
        >
          <!-- Step Number Decor -->
          <div class="absolute -top-6 -left-6 text-7xl font-black text-rose-500/5 group-hover:text-rose-500/10 transition-all font-serif italic select-none">0{{ i + 1 }}</div>
          
          <div class="w-16 h-16 rounded-3xl bg-white dark:bg-slate-900 border border-rose-100 dark:border-rose-900/30 flex items-center justify-center shadow-xl shadow-rose-500/5 group-hover:scale-110 group-hover:border-rose-300 transition-all z-10 relative">
            <Icon :name="step.icon" class="w-8 h-8 text-rose-600" />
          </div>
          
          <div class="space-y-3">
             <h3 class="text-lg font-black text-primary uppercase tracking-tight">{{ step.title }}</h3>
             <p class="text-sm text-secondary font-medium leading-relaxed">{{ step.desc }}</p>
          </div>
          
          <!-- Connector Line (Desktop) -->
          <div v-if="i < 2" class="hidden md:block absolute top-8 left-full w-full h-px bg-linear-to-r from-rose-200 to-transparent dark:from-rose-900/30"></div>
        </div>
      </div>
    </div>

    <!-- ======= ELIGIBILITY SECTION ======= -->
    <div class="section-wrapper mt-32">
       <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-stretch reveal">
          <!-- Eligibility Checks -->
          <div class="lg:col-span-7 space-y-10">
             <h2 class="text-3xl font-black text-primary tracking-tight">Kriteria Pengembalian</h2>
             <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div 
                  v-for="(item, i) in eligibility" 
                  :key="i"
                  class="card-premium p-6 flex items-start gap-4"
                  :class="item.ok ? 'border-emerald-100 dark:border-emerald-900/30 bg-emerald-50/20' : 'border-rose-100 dark:border-rose-900/30 bg-rose-50/20 opacity-70'"
                >
                  <Icon 
                    :name="item.ok ? 'ph:check-circle-fill' : 'ph:x-circle-fill'" 
                    class="w-6 h-6 mt-1 shrink-0"
                    :class="item.ok ? 'text-emerald-500' : 'text-rose-400'"
                  />
                  <div>
                    <h4 class="text-sm font-black text-primary tracking-tight">{{ item.reason }}</h4>
                    <p class="text-[11px] font-bold text-muted uppercase tracking-widest mt-1">{{ item.label }}</p>
                  </div>
                </div>
             </div>
             
             <div class="p-8 bg-(--bg-card) border border-(--border-color) rounded-[3rem] border-dashed space-y-4">
                <div class="flex items-center gap-3">
                  <Icon name="ph:info-bold" class="w-6 h-6 text-rose-500" />
                  <h4 class="text-sm font-black text-primary uppercase tracking-tight">Catatan Penting</h4>
                </div>
                <p class="text-xs md:text-sm text-secondary leading-relaxed font-medium">
                  Karena bunga adalah produk segar yang bersifat mudah layu (*perishable*), klaim harus diajukan maksimal <strong>2 jam</strong> setelah paket diterima oleh customer/security.
                </p>
             </div>
          </div>

          <!-- Refund Info Card -->
          <div class="lg:col-span-5 h-full">
             <div class="card-premium p-10 bg-linear-to-br from-slate-900 to-black text-white h-full space-y-10 flex flex-col justify-center relative overflow-hidden group shadow-2xl">
                <div class="absolute inset-0 bg-rose-500/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                
                <div class="space-y-2">
                  <h3 class="text-2xl font-black">Metode Refund</h3>
                  <p class="text-xs opacity-70">Dana akan dikembalikan melalui metode pembayaran awal atau voucher HappyBouquet.</p>
                </div>

                <div class="space-y-6">
                   <div v-for="(refund, i) in refundMethods" :key="i" class="flex items-center gap-4">
                      <div class="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-rose-400">
                        <Icon :name="refund.icon" class="w-6 h-6" />
                      </div>
                      <div>
                        <p class="text-[10px] font-black uppercase tracking-widest opacity-60 mb-1">{{ refund.label }}</p>
                        <p class="text-sm font-black">{{ refund.time }}</p>
                      </div>
                   </div>
                </div>

                <button class="btn-premium w-full py-4 text-xs tracking-widest font-black uppercase mt-4">Hubungi Kami (WhatsApp)</button>
             </div>
          </div>
       </div>
    </div>

    <!-- ======= FAQ Section ======= -->
    <div class="section-wrapper mt-32 space-y-12 reveal">
       <div class="text-center">
          <h2 class="section-title">Informasi Tambahan</h2>
       </div>

       <div class="max-w-3xl mx-auto grid grid-cols-1 gap-4">
          <div 
            v-for="(faq, i) in refundFaqs" 
            :key="i"
            class="p-6 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl hover:border-rose-200 dark:hover:border-rose-900 transition-all shadow-sm"
          >
             <h4 class="text-sm font-black text-primary uppercase tracking-tight mb-2">{{ faq.q }}</h4>
             <p class="text-xs md:text-sm text-secondary font-medium leading-relaxed">{{ faq.a }}</p>
          </div>
       </div>
    </div>

  </div>
</template>

<script setup lang="ts">
const policySteps = [
  { title: 'Foto Bukti', icon: 'ph:camera-bold', desc: 'Ambil foto buket yang diterima dalam kondisi belum dibuka/dirusak jika ada kerusakan.' },
  { title: 'Kirim Chat', icon: 'ph:chat-teardrop-dots-bold', desc: 'Hubungi tim via WhatsApp dengan menyertakan Nomor Pesanan dan foto bukti.' },
  { title: 'Verifikasi', icon: 'ph:shield-check-bold', desc: 'Tim akan memvalidasi klaim dan memberikan solusi dalam waktu maksimal 30 menit.' },
]

const eligibility = [
  { reason: 'Bunga Layu Saat Diterima', label: 'Refund/Ganti Baru', ok: true },
  { reason: 'Item Tidak Sesuai Order', label: 'Pengiriman Ulang', ok: true },
  { reason: 'Salah Alamat (Kesalahan Kami)', label: 'Pengiriman Ulang', ok: true },
  { reason: 'Tukar Pikiran (Seleranya Berubah)', label: 'Tidak Berlaku', ok: false },
  { reason: 'Kesalahan Alamat (Dari Pembeli)', label: 'Tidak Berlaku', ok: false },
  { reason: 'Tidak Ada yang Menerima', label: 'Tidak Berlaku', ok: false },
]

const refundMethods = [
  { label: 'Bank Transfer / E-Wallet', time: '1-3 Hari Kerja', icon: 'ph:bank-bold' },
  { label: 'HappyBouquet Credit / Voucher', time: 'Instan (Tersedia Langsung)', icon: 'ph:ticket-fill' },
]

const refundFaqs = [
  { q: 'Bagaimana jika kurir terlambat?', a: 'Jika pengiriman terlambat lebih dari 2 jam dari batas slot waktu yang dipilih karena kendala operasional kami, kami akan memberikan voucher kompensasi atau diskon 20%.' },
  { q: 'Apakah biaya ongkir dikembalikan?', a: 'Untuk pengembalian dana penuh (Refund) karena kesalahan kami, biaya ongkir akan dikembalikan sepenuhnya.' },
]

useHead({
  title: 'Kebijakan Pengembalian - HappyBouquet'
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
