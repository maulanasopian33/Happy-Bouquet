<template>
  <div class="min-h-screen bg-(--bg-main) transition-colors duration-500 pb-24">
    
    <!-- ======= HERO SECTION ======= -->
    <div class="section-wrapper py-20 lg:py-32 text-center md:text-left">
      <div class="reveal max-w-3xl">
        <div class="section-tag">Bantuan & Informasi</div>
        <h1 class="section-title text-4xl md:text-6xl text-gradient font-serif">Tanya Jawab (FAQ)</h1>
        <p class="text-sm md:text-base text-secondary font-medium mt-6 leading-relaxed">
          Temukan jawaban cepat untuk pertanyaan umum seputar pesanan, pengiriman, dan perawatan bunga Anda. Kami di sini untuk membantu.
        </p>
      </div>

      <!-- Search Bar -->
      <div class="mt-12 reveal max-w-2xl">
        <div class="relative group">
          <Icon name="ph:magnifying-glass-bold" class="absolute left-6 top-1/2 -translate-y-1/2 text-muted group-focus-within:text-rose-500 w-5 h-5 transition-colors" />
          <input 
            v-model="searchQuery"
            type="text" 
            placeholder="Cari pertanyaan... (Cth: Cara merawat bunga, Refund)"
            class="w-full pl-16 pr-6 py-5 rounded-[2.5rem] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:border-rose-400 focus:ring-4 focus:ring-rose-500/10 outline-none transition-all text-sm font-semibold shadow-xl shadow-rose-500/5 placeholder:text-muted/60"
          />
        </div>
      </div>
    </div>

    <!-- ======= CATEGORIES & FAQ SECTION ======= -->
    <div class="section-wrapper grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
      
      <!-- Left: Categories Sidebar (Desktop) -->
      <div class="hidden lg:block lg:col-span-3 space-y-4 sticky top-32 h-fit reveal">
         <div class="p-6 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-(--border-color) shadow-sm">
            <p class="text-[10px] font-black text-muted uppercase tracking-[0.2em] mb-6 pl-4">Kategori Bantuan</p>
            <div class="space-y-2">
               <button 
                 v-for="cat in categories" 
                 :key="cat.id"
                 @click="activeCategory = cat.id"
                 class="w-full text-left px-5 py-3.5 rounded-2xl text-xs font-black uppercase tracking-widest transition-all flex items-center justify-between group"
                 :class="activeCategory === cat.id ? 'bg-rose-600 text-white shadow-lg' : 'text-secondary hover:bg-rose-50 dark:hover:bg-rose-950/20 hover:text-rose-600'"
               >
                 {{ cat.label }}
                 <Icon :name="cat.icon" class="w-4 h-4 opacity-70 group-hover:scale-110 transition-transform" />
               </button>
            </div>
         </div>
      </div>

      <!-- Right: Accordions -->
      <div class="lg:col-span-9 space-y-6 reveal">
         <!-- Filtered Message -->
         <div v-if="searchQuery" class="mb-4">
            <p class="text-xs font-medium text-secondary">Menampilkan hasil untuk: <span class="font-black text-primary">"{{ searchQuery }}"</span></p>
         </div>

         <!-- FAQ Items -->
         <TransitionGroup name="list" mode="out-in">
            <div 
              v-for="(faq, i) in filteredFaqs" 
              :key="faq.q"
              class="card-premium overflow-hidden group cursor-pointer hover:border-rose-300 dark:hover:border-rose-900 transition-all"
              @click="toggleFaq(faq.q)"
            >
              <div class="p-6 md:p-8 flex items-start justify-between gap-6">
                 <div class="flex gap-4">
                    <span class="text-[10px] font-black text-rose-500/40 mt-1 uppercase tracking-tighter">Q{{ i + 1 }}</span>
                    <h3 class="text-sm md:text-base font-black text-primary uppercase tracking-tight group-hover:text-rose-600 transition-colors leading-relaxed">{{ faq.q }}</h3>
                 </div>
                 <Icon 
                   name="ph:caret-down-bold" 
                   class="w-5 h-5 text-muted transition-transform duration-500" 
                   :class="openedFaqs.includes(faq.q) ? 'rotate-180 text-rose-500' : ''" 
                 />
              </div>

              <Transition
                enter-active-class="transition-all duration-500 ease-out"
                enter-from-class="max-h-0 opacity-0 overflow-hidden"
                enter-to-class="max-h-[500px] opacity-100 border-t border-dashed border-(--border-color)"
                leave-active-class="transition-all duration-300 ease-in"
                leave-from-class="max-h-[500px] opacity-100 border-t border-dashed border-(--border-color)"
                leave-to-class="max-h-0 opacity-0 overflow-hidden"
              >
                <div v-if="openedFaqs.includes(faq.q)" class="p-8 bg-slate-50/50 dark:bg-slate-950/30">
                   <p class="text-sm md:text-base text-secondary leading-relaxed font-medium">
                      {{ faq.a }}
                   </p>
                </div>
              </Transition>
            </div>
         </TransitionGroup>

         <!-- Empty results -->
         <div v-if="filteredFaqs.length === 0" class="py-20 text-center space-y-6 card-premium border-dashed border-rose-200">
            <div class="w-20 h-20 bg-rose-50 dark:bg-rose-950/30 rounded-full flex items-center justify-center mx-auto text-rose-300">
              <Icon name="ph:seal-question-duotone" class="w-10 h-10" />
            </div>
            <div class="space-y-2 px-6">
              <h3 class="text-xl font-black text-primary">Tidak Ada Hasil</h3>
              <p class="text-sm text-secondary font-medium">Coba gunakan kata kunci lain atau hubungi tim concierge kami jika pertanyaan Anda belum terjawab.</p>
            </div>
            <NuxtLink to="/contact" class="btn-premium px-8 inline-flex items-center gap-2">Hubungi CS</NuxtLink>
         </div>
      </div>
    </div>

    <!-- ======= SUPPORT FOOTER ======= -->
    <div class="section-wrapper mt-32 border-t border-(--border-color) pt-24 reveal text-center space-y-10">
       <div class="max-w-2xl mx-auto space-y-4">
          <h2 class="text-3xl font-black text-primary">Masih Butuh Bantuan?</h2>
          <p class="text-sm text-secondary font-medium">Tim kami siap membantu Anda dengan layanan personal untuk setiap kebutuhan bunga Anda.</p>
       </div>
       
       <div class="flex flex-col sm:flex-row items-center justify-center gap-6">
          <div class="p-6 card-premium flex items-center gap-4 min-w-[280px]">
             <div class="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 flex items-center justify-center">
                <Icon name="ph:whatsapp-logo-fill" class="w-6 h-6" />
             </div>
             <div class="text-left">
                <p class="text-[9px] font-black text-muted uppercase tracking-widest leading-none mb-1">WhatsApp CS</p>
                <p class="text-sm font-black text-primary">+62 812 3456 7890</p>
             </div>
          </div>
          <div class="p-6 card-premium flex items-center gap-4 min-w-[280px]">
             <div class="w-12 h-12 rounded-2xl bg-rose-50 dark:bg-rose-950/30 text-rose-600 flex items-center justify-center">
                <Icon name="ph:envelope-simple-fill" class="w-6 h-6" />
             </div>
             <div class="text-left">
                <p class="text-[9px] font-black text-muted uppercase tracking-widest leading-none mb-1">Email Support</p>
                <p class="text-sm font-black text-primary">hello@happybouquet.id</p>
             </div>
          </div>
       </div>
    </div>

  </div>
</template>

<script setup lang="ts">
const searchQuery = ref('')
const activeCategory = ref('order')
const openedFaqs = ref<string[]>([])

const categories = [
  { id: 'all', label: 'Semua', icon: 'ph:stack-bold' },
  { id: 'order', label: 'Pemesanan', icon: 'ph:shopping-bag-bold' },
  { id: 'payment', label: 'Pembayaran', icon: 'ph:credit-card-bold' },
  { id: 'care', label: 'Perawatan', icon: 'ph:leaf-bold' },
  { id: 'account', label: 'Akun Saya', icon: 'ph:user-circle-bold' },
]

const faqs = [
  // ORDER
  { cat: 'order', q: 'Berapa lama waktu untuk merangkai satu buket?', a: 'Untuk buket ready-stock, kami membutuhkan waktu sekitar 30-60 menit. Untuk custom order atau acara besar, kami menyarankan pemesanan minimal 2 hari sebelumnya.' },
  { cat: 'order', q: 'Dapatkah saya menambahkan kartu ucapan kustom?', a: 'Tentu. Setiap pesanan sudah termasuk kartu ucapan premium gratis. Anda dapat menuliskan pesan personal pada saat proses checkout.' },
  { cat: 'order', q: 'Apakah melayani pengiriman luar kota?', a: 'Saat ini kami hanya melayani area Jabodetabek dan Bandung untuk menjaga kesegaran bunga asli tetap prima saat sampai di tujuan.' },
  
  // PAYMENT
  { cat: 'payment', q: 'Apa saja metode pembayaran yang tersedia?', a: 'Kami menerima berbagai metode pembayaran digital: Transfer Bank (VA), QRIS, GoPay, OVO, Dana, serta kartu kredit berlogo Visa/Mastercard.' },
  { cat: 'payment', q: 'Apakah harga sudah termasuk ongkos kirim?', a: 'Belum. Ongkos kirim akan dihitung secara otomatis berdasarkan jarak pengiriman dari galeri terdekat kami saat Anda memasukkan alamat di halaman checkout.' },

  // CARE
  { cat: 'care', q: 'Bagaimana cara agar bunga tetap segar lebih lama?', a: 'Sangat mudah: Berikan air dingin pada spons atau wadah secara rutin, jauhkan dari sinar matahari langsung, dan simpan di ruangan dengan suhu sejuk/ber-AC.' },
  { cat: 'care', q: 'Berapa lama rata-rata bunga HappyBouquet bertahan?', a: 'Bunga kami rata-rata bertahan 3-5 hari dalam kondisi prima. Jenis bunga tertentu seperti Lily atau Carnation bahkan dapat bertahan hingga 7 hari dengan perawatan yang tepat.' },

  // ACCOUNT
  { cat: 'account', q: 'Bagaimana cara bergabung dengan program loyalitas?', a: 'Cukup buat akun di HappyBouquet. Anda akan otomatis tergabung dan mulai mengumpulkan poin dari setiap pembelian pertama Anda.' },
  { cat: 'account', q: 'Apakah saya bisa memesan tanpa membuat akun?', a: 'Bisa. Kami menyediakan fitur "Guest Checkout", namun kami menyarankan membuat akun untuk mendapatkan poin loyalitas dan kemudahan pelacakan pesanan.' },
]

const filteredFaqs = computed(() => {
  let result = faqs
  
  // Filter by category
  if (activeCategory.value !== 'all' && !searchQuery.value) {
    result = result.filter(f => f.cat === activeCategory.value)
  }
  
  // Filter by search
  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase()
    result = result.filter(f => 
      f.q.toLowerCase().includes(q) || 
      f.a.toLowerCase().includes(q)
    )
  }
  
  return result
})

const toggleFaq = (question: string) => {
  if (openedFaqs.value.includes(question)) {
    openedFaqs.value = openedFaqs.value.filter(q => q !== question)
  } else {
    openedFaqs.value.push(question)
  }
}

useHead({
  title: 'Bantuan & FAQ - HappyBouquet'
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

/* List Transitions */
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
.list-leave-active {
  position: absolute;
  width: 100%;
}
</style>
