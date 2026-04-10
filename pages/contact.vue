<template>
  <div class="min-h-screen bg-(--bg-main) transition-colors duration-500 pb-24">
    
    <!-- ======= HERO SECTION ======= -->
    <div class="section-wrapper py-20 lg:py-32 text-center lg:text-left">
      <div class="reveal max-w-2xl">
        <div class="section-tag">Komunikasi & Hubungan</div>
        <h1 class="section-title text-5xl md:text-6xl text-gradient">Terhubung dengan Kami</h1>
        <p class="text-sm md:text-base text-secondary font-medium mt-6 leading-relaxed">
          Punya pertanyaan khusus atau ingin konsultasi desain buket untuk momen spesial Anda? Tim concierge kami siap memberikan layanan personal yang Anda butuhkan.
        </p>
      </div>
    </div>

    <!-- ======= CONTACT GRID ======= -->
    <div class="section-wrapper">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-stretch">
        
        <!-- Left: Contact Info Info -->
        <div class="lg:col-span-5 space-y-12 reveal">
          <div class="space-y-8">
            <div 
              v-for="info in contactInfo" 
              :key="info.label"
              class="flex items-start gap-6 group"
            >
              <div class="w-14 h-14 rounded-2xl bg-rose-50 dark:bg-rose-950/30 text-rose-600 flex items-center justify-center shrink-0 shadow-sm group-hover:scale-110 group-hover:bg-rose-600 group-hover:text-white transition-all duration-500">
                <Icon :name="info.icon" class="w-6 h-6" />
              </div>
              <div class="space-y-1 pt-1">
                <p class="text-[10px] font-black text-muted uppercase tracking-[0.2em] leading-none mb-2">{{ info.label }}</p>
                <h3 class="text-lg font-black text-primary tracking-tight">{{ info.value }}</h3>
                <p v-if="info.desc" class="text-xs text-secondary font-medium">{{ info.desc }}</p>
              </div>
            </div>
          </div>

          <!-- Social Media Grid -->
          <div class="p-10 card-premium bg-linear-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-950/50 space-y-8">
             <h4 class="text-xs font-black text-primary uppercase tracking-[0.2em] text-center lg:text-left">Temukan Kami di Media Sosial</h4>
             <div class="flex flex-wrap justify-center lg:justify-start gap-4">
                <a 
                  v-for="social in socialLinks" 
                  :key="social.label" 
                  :href="social.href"
                  target="_blank"
                  class="w-12 h-12 rounded-2xl bg-white dark:bg-slate-800 flex items-center justify-center text-secondary hover:text-rose-600 hover:shadow-xl hover:shadow-rose-500/10 hover:-translate-y-1 transition-all border border-slate-100 dark:border-slate-800"
                >
                  <Icon :name="social.icon" class="w-5 h-5" />
                </a>
             </div>
          </div>
        </div>

        <!-- Right: Contact Form -->
        <div class="lg:col-span-7 reveal h-full">
           <form 
             @submit.prevent="handleSubmit" 
             class="card-premium p-8 md:p-12 space-y-8 h-full bg-white/50 dark:bg-slate-900/50 backdrop-blur-md relative overflow-hidden"
           >
              <!-- Submission Success Overlay -->
              <Transition name="fade">
                <div v-if="isSubmitted" class="absolute inset-0 z-50 bg-white/95 dark:bg-slate-900/95 flex flex-col items-center justify-center text-center p-8 space-y-6">
                   <div class="w-20 h-20 rounded-full bg-emerald-50 dark:bg-emerald-950/30 text-emerald-500 flex items-center justify-center animate-bounce-short">
                      <Icon name="ph:check-circle-fill" class="w-12 h-12" />
                   </div>
                   <div class="space-y-2">
                     <h2 class="text-2xl font-black text-primary">Pesan Terkirim!</h2>
                     <p class="text-sm font-medium text-secondary">Terima kasih atas pesan Anda. Kami akan menghubungi Anda dalam waktu 1x24 jam.</p>
                   </div>
                   <button @click="isSubmitted = false" class="btn-premium px-8">Kirim Pesan Lagi</button>
                </div>
              </Transition>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div class="space-y-2 group">
                    <label class="text-[10px] font-black text-muted uppercase tracking-widest pl-1 group-focus-within:text-rose-500 transition-colors">Nama Lengkap</label>
                    <input 
                      v-model="form.name"
                      type="text" 
                      placeholder="Masukkan nama Anda"
                      required
                      class="w-full px-5 py-4 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:border-rose-400 focus:ring-4 focus:ring-rose-500/10 outline-none transition-all text-sm font-medium placeholder:text-muted/60"
                    />
                 </div>
                 <div class="space-y-2 group">
                    <label class="text-[10px] font-black text-muted uppercase tracking-widest pl-1 group-focus-within:text-rose-500 transition-colors">Alamat Email</label>
                    <input 
                      v-model="form.email"
                      type="email" 
                      placeholder="email@example.com"
                      required
                      class="w-full px-5 py-4 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:border-rose-400 focus:ring-4 focus:ring-rose-500/10 outline-none transition-all text-sm font-medium placeholder:text-muted/60"
                    />
                 </div>
              </div>

              <div class="space-y-2 group">
                <label class="text-[10px] font-black text-muted uppercase tracking-widest pl-1 group-focus-within:text-rose-500 transition-colors">Subjek Pesan</label>
                <select 
                  v-model="form.subject"
                  class="w-full px-5 py-4 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:border-rose-400 focus:ring-4 focus:ring-rose-500/10 outline-none transition-all text-sm font-medium appearance-none"
                >
                   <option value="General Inquiry">Tanya-tanya Umum</option>
                   <option value="Custom Order">Pesanan Khusus / Event</option>
                   <option value="Partnership">Kerja Sama / Partnership</option>
                   <option value="Feedback">Kritik & Saran</option>
                </select>
              </div>

              <div class="space-y-2 group">
                <label class="text-[10px] font-black text-muted uppercase tracking-widest pl-1 group-focus-within:text-rose-500 transition-colors">Pesan Anda</label>
                <textarea 
                  v-model="form.message"
                  placeholder="Tulis pesan lengkap Anda di sini..."
                  rows="4"
                  required
                  class="w-full px-5 py-5 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:border-rose-400 focus:ring-4 focus:ring-rose-500/10 outline-none transition-all text-sm font-medium placeholder:text-muted/60 resize-none"
                ></textarea>
              </div>

              <div class="pt-4">
                <button 
                  type="submit"
                  class="btn-premium w-full py-5 rounded-2xl text-base flex items-center justify-center gap-3 group/btn shadow-xl shadow-rose-500/20"
                >
                  <Icon name="ph:paper-plane-tilt-fill" class="w-5 h-5 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                  Kirim Pesan Sekarang
                </button>
              </div>
           </form>
        </div>
      </div>
    </div>

    <!-- ======= MAP SECTION ======= -->
    <div class="section-wrapper mt-32 reveal">
       <div class="card-premium h-96 w-full relative overflow-hidden group shadow-2xl rounded-[3rem] border-white dark:border-slate-800 border-4">
          <!-- Stylized Mock Map Background -->
          <div class="absolute inset-0 bg-slate-100 dark:bg-slate-900 overflow-hidden">
             <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] opacity-20 pointer-events-none">
                <div class="w-full h-full border-40 border-slate-200 dark:border-slate-800 rounded-full animate-ping rotate-45"></div>
             </div>
             
             <!-- Central Marker -->
             <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                <div class="w-16 h-16 bg-rose-600 rounded-full flex items-center justify-center text-white shadow-2xl animate-bounce-short relative z-10 border-4 border-white dark:border-slate-800">
                   <Icon name="ph:flower-tulip-fill" class="w-8 h-8" />
                </div>
                <div class="w-6 h-2 bg-black/10 blur-md rounded-full mt-2"></div>
                
                <div class="mt-4 p-4 bg-white dark:bg-slate-950 rounded-2xl shadow-2xl border border-rose-100 min-w-[200px] text-center">
                   <p class="text-xs font-black text-rose-600 tracking-widest uppercase">HappyBouquet Central</p>
                   <p class="text-[10px] font-bold text-muted mt-1 leading-tight">Gedung Antigravity, Lt. 12 <br> Jakarta Selatan, 12345</p>
                </div>
             </div>
          </div>
          
          <div class="absolute bottom-6 right-6 z-20">
             <button class="px-6 py-3 rounded-xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-xl text-primary text-xs font-black uppercase tracking-widest flex items-center gap-2 hover:bg-rose-600 hover:text-white transition-all">
                <Icon name="ph:navigation-arrow-fill" />
                Dapatkan Rute
             </button>
          </div>
       </div>
    </div>

  </div>
</template>

<script setup lang="ts">
const isSubmitted = ref(false)
const form = ref({
  name: '',
  email: '',
  subject: 'General Inquiry',
  message: ''
})

const handleSubmit = () => {
  // Mock submission
  setTimeout(() => {
    isSubmitted.value = true
    form.value = {
      name: '',
      email: '',
      subject: 'General Inquiry',
      message: ''
    }
  }, 1000)
}

const contactInfo = [
  { label: 'Telepon Concierge', icon: 'ph:phone-fill', value: '+62 21 555-0123', desc: 'Senin - Minggu, 08:00 - 20:00' },
  { label: 'Email Pelayanan', icon: 'ph:envelope-simple-fill', value: 'hello@happybouquet.id', desc: 'Respon cepat dalam 24 jam' },
  { label: 'Lokasi Galeri', icon: 'ph:map-pin-fill', value: 'Gedung Antigravity, Lt. 12', desc: 'Kuningan, Jakarta Selatan, 12345' },
]

const socialLinks = [
  { label: 'Instagram', href: '#', icon: 'ph:instagram-logo-fill' },
  { label: 'TikTok', href: '#', icon: 'ph:tiktok-logo-fill' },
  { label: 'WhatsApp', href: '#', icon: 'ph:whatsapp-logo-fill' },
]

useHead({
  title: 'Hubungi Kami - HappyBouquet'
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

@keyframes bounce-short {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-15px); }
}

.animate-bounce-short {
  animation: bounce-short 1.5s infinite;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
