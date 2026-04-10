<template>
  <div class="min-h-screen bg-(--bg-main) transition-colors duration-500 pb-24">
    
    <!-- ======= HERO SECTION ======= -->
    <div class="relative h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden">
      <!-- Background Image with Overlay -->
      <div class="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1526047932273-341f2a7631f9?q=80&w=1600&fit=crop" 
          class="w-full h-full object-cover scale-110 animate-slow-zoom"
          alt="Luxury Floral Background"
        />
        <div class="absolute inset-0 bg-linear-to-b from-black/60 via-black/40 to-(--bg-main)"></div>
      </div>

      <div class="relative z-10 section-wrapper text-center space-y-6">
        <div class="reveal">
          <div class="section-tag mx-auto bg-white/10 backdrop-blur-md border-white/20 text-white">Our Story</div>
          <h1 class="text-5xl md:text-8xl font-black text-white tracking-tighter mt-4 leading-none lowercase-italic">
            Seni di Balik <br> <span class="text-rose-400">Setiap Kelopak</span>
          </h1>
        </div>
      </div>
    </div>

    <!-- ======= BRAND STORY SECTION ======= -->
    <div class="section-wrapper -mt-20 relative z-20">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
        <!-- Image Story -->
        <div class="lg:col-span-5 reveal">
          <div class="relative group">
            <div class="absolute inset-0 bg-rose-500/20 rounded-[3rem] rotate-3 group-hover:rotate-6 transition-transform"></div>
            <img 
              src="https://images.unsplash.com/photo-1591886960571-74d43a19e16d?q=80&w=800&fit=crop" 
              class="relative z-10 rounded-[3rem] shadow-2xl border-4 border-white dark:border-slate-800"
              alt="Florist Crafting"
            />
            <div class="absolute -bottom-6 -right-6 z-20 bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-xl border border-rose-100">
               <p class="text-4xl font-black text-rose-600 leading-none">4+</p>
               <p class="text-[9px] font-black uppercase tracking-widest text-muted mt-1 leading-tight">Tahun Merangkai <br> Emosi</p>
            </div>
          </div>
        </div>

        <!-- Text Story -->
        <div class="lg:col-span-7 space-y-8 reveal">
          <div class="space-y-4">
            <h2 class="text-3xl md:text-5xl font-black text-primary tracking-tight">Lebih dari Sekadar <br> Buket Bunga.</h2>
            <p class="text-sm md:text-lg text-secondary font-medium leading-relaxed">
              Didirikan pada tahun 2020 di jantung kota Jakarta, HappyBouquet lahir dari keinginan untuk mengubah cara kita merayakan momen penting. Kami percaya bahwa setiap bunga memiliki bahasa unik, dan tugas kami adalah merangkainya menjadi sebuah puisi visual yang tak terlupakan.
            </p>
            <p class="text-sm md:text-base text-secondary/80 font-medium leading-relaxed">
              Kami bekerja sama langsung dengan kebun bunga lokal dan internasional terbaik untuk memastikan hanya bunga peraih penghargaan yang sampai di depan pintu Anda.
            </p>
          </div>
          
          <div class="flex flex-wrap gap-4 pt-4">
            <button class="btn-premium px-10 py-4 rounded-2xl">Visi Kami</button>
            <NuxtLink to="/products" class="btn-premium-outline px-10 py-4 rounded-2xl">Lihat Koleksi</NuxtLink>
          </div>
        </div>
      </div>
    </div>

    <!-- ======= VALUES SECTION ======= -->
    <div class="section-wrapper mt-40 space-y-16">
      <div class="text-center space-y-2 reveal">
        <div class="section-tag mx-auto">Filosofi Kami</div>
        <h2 class="section-title">Nilai-Nilai HappyBouquet</h2>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 reveal">
        <div 
          v-for="(value, i) in values" 
          :key="i"
          class="card-premium p-10 space-y-6 group hover:-translate-y-3 transition-all duration-700 text-center flex flex-col items-center"
        >
          <div class="w-16 h-16 rounded-3xl bg-rose-50 dark:bg-rose-950/30 text-rose-600 flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner">
            <Icon :name="value.icon" class="w-8 h-8" />
          </div>
          <div class="space-y-3">
            <h3 class="text-xl font-black text-primary uppercase tracking-tight">{{ value.title }}</h3>
            <p class="text-sm text-secondary font-medium leading-relaxed">{{ value.desc }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- ======= CRAFTSMANSHIP SECTION ======= -->
    <div class="section-wrapper mt-40 bg-white/30 dark:bg-slate-900/40 rounded-[5rem] py-24 border border-rose-100/50 reveal overflow-hidden relative">
      <!-- Background Ornament -->
      <div class="absolute -top-24 -right-24 w-96 h-96 bg-rose-500/5 rounded-full blur-[100px]"></div>
      
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center px-8 md:px-20 relative z-10">
        <div class="space-y-10 order-2 lg:order-1">
          <div class="space-y-4">
            <div class="section-tag">High-End Craft</div>
            <h2 class="text-4xl font-black text-primary tracking-tight leading-tight">Kurasi dari Para <br> Florist Ahli.</h2>
            <p class="text-sm md:text-base text-secondary font-medium leading-relaxed max-w-lg">
              Setiap buket dirangkai secara manual oleh tim florist kami yang telah berpengalaman bertahun-tahun dalam seni floral kontemporer. Kami memperhatikan setiap detail, mulai dari harmoni warna hingga struktur komposisi, untuk menciptakan karya seni yang hidup.
            </p>
          </div>
          <div class="grid grid-cols-2 gap-8">
             <div v-for="stat in stats" :key="stat.label">
                <p class="text-3xl font-black text-rose-600 mb-1">{{ stat.val }}</p>
                <p class="text-[9px] font-black uppercase tracking-widest text-muted">{{ stat.label }}</p>
             </div>
          </div>
        </div>
        <div class="order-1 lg:order-2">
           <div class="relative rounded-4xl overflow-hidden shadow-2xl group">
             <img src="https://images.unsplash.com/photo-1563201444-2c973aafa5f6?q=80&w=800&fit=crop" class="w-full grayscale group-hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100" />
             <div class="absolute inset-0 bg-transparent group-hover:bg-rose-500/10 transition-all"></div>
           </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
const values = [
  { title: 'Kesegaran Mutlak', icon: 'ph:leaf-fill', desc: 'Hanya bunga segar dari kebun terbaik yang kami pilih untuk setiap pesanan Anda.' },
  { title: 'Desain Artisanal', icon: 'ph:paint-brush-broad-fill', desc: 'Rangkaian kami bukan hasil masal, melainkan kurasi seni dari para florist ahli.' },
  { title: 'Tepat di Hati', icon: 'ph:heart-fill', desc: 'Setiap pengiriman adalah misi untuk menyampaikan emosi dan senyuman.' },
]

const stats = [
  { val: '15k+', label: 'Hati Bahagia' },
  { val: '50+', label: 'Jenis Bunga' },
  { val: '12+', label: 'Florist Ahli' },
  { val: '99%', label: 'Puas & Kembali' },
]

useHead({
  title: 'Our Story - HappyBouquet'
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

@keyframes slow-zoom {
  from { transform: scale(1.1); }
  to { transform: scale(1); }
}

.animate-slow-zoom {
  animation: slow-zoom 2s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

.lowercase-italic {
  text-transform: none;
}
</style>
