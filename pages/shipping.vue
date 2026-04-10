<template>
  <div class="min-h-screen bg-(--bg-main) transition-colors duration-500 pb-24">
    
    <!-- ======= HERO SECTION ======= -->
    <div class="section-wrapper py-20 lg:py-32">
      <div class="reveal max-w-3xl">
        <div class="section-tag">Logistik & Keamanan</div>
        <h1 class="section-title text-5xl md:text-6xl text-gradient">Layanan Pengiriman</h1>
        <p class="text-sm md:text-base text-secondary font-medium mt-6 leading-relaxed">
          Setiap buket dirawat dengan cinta, bahkan selama perjalanan. Kami memastikan bunga Anda sampai dalam kondisi segar dan sempurna dengan protokol pengiriman khusus.
        </p>
      </div>
    </div>

    <!-- ======= SHIPPING TIERS ======= -->
    <div class="section-wrapper">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 reveal">
        <div 
          v-for="(method, i) in shippingMethods" 
          :key="i"
          class="card-premium p-10 space-y-8 group hover:-translate-y-2 transition-all duration-500"
        >
          <div class="w-16 h-16 rounded-3xl bg-rose-50 dark:bg-rose-950/30 text-rose-600 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
            <Icon :name="method.icon" class="w-8 h-8" />
          </div>
          <div class="space-y-3">
            <h3 class="text-xl font-black text-primary uppercase tracking-tight">{{ method.name }}</h3>
            <p class="text-sm text-secondary font-medium leading-relaxed">{{ method.desc }}</p>
          </div>
          <div class="pt-4 border-t border-dashed border-(--border-color) flex items-center justify-between">
            <span class="text-[10px] font-black text-muted uppercase tracking-widest">{{ method.time }}</span>
            <span class="text-sm font-black text-rose-600">{{ method.price }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- ======= PACKAGING STANDARDS ======= -->
    <div class="section-wrapper mt-32 bg-white/30 dark:bg-slate-900/30 py-24 rounded-[4rem] border border-(--border-color) reveal">
       <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center px-8 md:px-16">
         <div class="space-y-8">
            <div class="space-y-3">
              <div class="section-tag">Kualitas Premium</div>
              <h2 class="text-3xl md:text-4xl font-black text-primary tracking-tight">Standar Pengemasan Kami</h2>
              <p class="text-sm md:text-base text-secondary font-medium leading-relaxed">
                Bukan sekadar dibungkus kertas, setiap pengiriman HappyBouquet dilengkapi dengan proteksi berlapis untuk menjaga estetika dan kesegaran.
              </p>
            </div>
            
            <ul class="space-y-6">
               <li v-for="(item, i) in packagingFeatures" :key="i" class="flex gap-4">
                  <div class="w-10 h-10 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 flex items-center justify-center shrink-0">
                    <Icon name="ph:check-bold" class="w-5 h-5" />
                  </div>
                  <div>
                    <h4 class="text-sm font-black text-primary uppercase tracking-widest">{{ item.title }}</h4>
                    <p class="text-xs font-medium text-secondary mt-1">{{ item.desc }}</p>
                  </div>
               </li>
            </ul>
         </div>

         <!-- Image/Visual Representation of Box -->
         <div class="relative group">
            <div class="absolute inset-0 bg-rose-500/10 rounded-4xl blur-3xl group-hover:scale-110 transition-transform duration-700"></div>
            <img 
              src="https://images.unsplash.com/photo-1547096301-4ebda79e93d7?q=80&w=800&fit=crop" 
              alt="Premium Packaging Visual" 
              class="relative z-10 w-full rounded-4xl shadow-2xl border border-white/20"
            />
            <div class="absolute -bottom-6 -left-6 z-20 card-premium p-6 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md max-w-[200px] shadow-2xl border-rose-100">
               <div class="flex items-center gap-3">
                 <Icon name="ph:shield-star-fill" class="w-6 h-6 text-amber-500" />
                 <p class="text-[10px] font-black uppercase tracking-tight text-primary leading-tight">Jaminan 100% Kesegaran Bunga</p>
               </div>
            </div>
         </div>
       </div>
    </div>

    <!-- ======= SHIPPING FAQ ======= -->
    <div class="section-wrapper mt-32 space-y-12 reveal">
       <div class="text-center space-y-2">
          <h2 class="section-title">Pertanyaan Sering Diajukan</h2>
          <p class="text-sm text-secondary font-medium">Informasi tambahan seputar jangkauan dan operasional kurir kami.</p>
       </div>

       <div class="max-w-3xl mx-auto space-y-4">
          <div 
            v-for="(faq, i) in faqs" 
            :key="i"
            class="card-premium p-6 hover:border-rose-300 dark:hover:border-rose-900 transition-all cursor-pointer group"
            @click="activeFaq = activeFaq === i ? null : i"
          >
            <div class="flex items-center justify-between gap-4">
               <h3 class="text-sm font-black text-primary uppercase tracking-tight">{{ faq.q }}</h3>
               <Icon name="ph:caret-down-bold" class="w-4 h-4 text-muted group-hover:text-rose-600 transition-all" :class="activeFaq === i ? 'rotate-180' : ''" />
            </div>
            <Transition
              enter-active-class="transition-all duration-300 ease-out"
              enter-from-class="max-h-0 opacity-0 overflow-hidden"
              enter-to-class="max-h-40 opacity-100 mt-4 pt-4 border-t border-dashed border-(--border-color)"
              leave-active-class="transition-all duration-200 ease-in"
              leave-from-class="max-h-40 opacity-100 mt-4 pt-4 border-t border-dashed border-(--border-color)"
              leave-to-class="max-h-0 opacity-0 overflow-hidden"
            >
              <div v-if="activeFaq === i" class="text-xs md:text-sm font-medium text-secondary leading-relaxed">
                {{ faq.a }}
              </div>
            </Transition>
          </div>
       </div>
    </div>

  </div>
</template>

<script setup lang="ts">
const activeFaq = ref<number | null>(null)

const shippingMethods = [
  { name: 'Instant Delivery', icon: 'ph:clock-countdown-bold', desc: 'Cocok untuk kejutan mendadak dan momen krusial.', time: '1-3 Jam', price: 'Mulai Rp 35rb' },
  { name: 'Same Day Premium', icon: 'ph:truck-bold', desc: 'Pesan hari ini sebelum jam 14:00, bunga sampai hari ini juga.', time: 'Hari yang sama', price: 'Mulai Rp 20rb' },
  { name: 'Standard Service', icon: 'ph:package-bold', desc: 'Pengiriman terjadwal untuk hari spesial yang telah direncanakan.', time: 'Terjadwal', price: 'Gratis (Min. 500rb)' },
]

const packagingFeatures = [
  { title: 'Hydration Pack', desc: 'Batang bunga dilengkapi wadah air nutrisi agar tetap segar selama 24 jam di jalan.' },
  { title: 'Luxury Hard-Box', desc: 'Kardus kokoh bermerek dengan sekat khusus agar buket tidak bergeser.' },
  { title: 'Sealed Envelope', desc: 'Kartu ucapan Anda diletakkan dalam amplop segel lilin tradisional.' },
]

const faqs = [
  { q: 'Apakah melayani pengiriman luar kota?', a: 'Saat ini kami fokus memberikan kesegaran terbaik di area Jabodetabek dan Bandung saja untuk menjaga kualitas bunga hidup.' },
  { q: 'Bisakah saya memilih jam sampai yang spesifik?', a: 'Bisa. Pada saat checkout, Anda dapat memilih slot waktu pengiriman dengan rentang 2-3 jam.' },
  { q: 'Bagaimana jika penerima tidak ada di tempat?', a: 'Kurir kami akan menghubungi pemesan/penerima. Jika tidak ada konfirmasi, buket akan dititipkan ke security atau tetangga terdekat dengan konfirmasi foto.' },
]

useHead({
  title: 'Pengiriman - HappyBouquet'
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
