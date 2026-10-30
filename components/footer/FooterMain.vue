<template>
  <!-- Warna persis mockup design/home/code.html: on-surface #e5e1e4, outline #4a4538, surface-container #1f1f21, secondary #ccc6bb -->
  <footer class="noir-shell w-full bg-[#0a0a0c]! text-[#e5e1e4] border-t border-[#4a4538]/30">
    <div class="max-w-7xl mx-auto px-6 py-18 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">

      <!-- Kolom 1: Brand + Alamat + Sosial -->
      <div class="lg:col-span-2 flex flex-col gap-4">
        <NuxtLink to="/" class="flex items-center gap-3 group w-fit">
          <div class="w-9 h-9 rounded-full border border-[var(--noir-gold)]/40 p-1 flex items-center justify-center bg-[#1f1f21] group-hover:border-[var(--noir-gold)] transition-colors">
            <img src="/icon.png" alt="HappyBouquet Logo" class="w-full h-full object-contain" />
          </div>
          <span class="noir-display text-lg font-semibold">Happy<span class="text-[var(--noir-gold)]">Bouquet</span></span>
        </NuxtLink>

        <p class="text-sm text-[var(--noir-champagne-dim)] max-w-sm leading-relaxed">
          Kurasi mahakarya bunga segar dan hampers premium bertaraf editorial. Setiap helai dirangkai penuh kehangatan untuk merayakan cinta, pencapaian, dan momen berharga Anda.
        </p>

        <div class="flex flex-col gap-1 text-sm text-[var(--noir-champagne-dim)]">
          <span class="font-semibold text-[var(--noir-gold)]">Boutique &amp; Showroom:</span>
          <span>Jl. Senopati No. 42, Kebayoran Baru, Jakarta Selatan 12190</span>
          <span>Buka Setiap Hari: 08:00 - 21:00 WIB</span>
        </div>

        <div class="flex items-center gap-3 mt-2">
          <a
            v-for="s in socials"
            :key="s.icon"
            :href="s.href"
            target="_blank"
            rel="noopener noreferrer"
            :title="s.title"
            class="w-9 h-9 rounded-full bg-[#1f1f21] border border-[#4a4538]/40 flex items-center justify-center text-[#ccc6bb] hover:text-[var(--noir-gold)] hover:border-[var(--noir-gold)] transition-all"
          >
            <Icon :name="s.icon" class="w-[18px] h-[18px]" />
          </a>
        </div>
      </div>

      <!-- Kolom 2: Kategori Pilihan -->
      <div class="flex flex-col gap-2">
        <span class="noir-display text-base mb-2">Kategori Pilihan</span>
        <NuxtLink
          v-for="k in kategori"
          :key="k.label"
          :to="k.to"
          class="text-sm text-[var(--noir-champagne-dim)] hover:text-[var(--noir-gold)] transition-colors"
        >{{ k.label }}</NuxtLink>
      </div>

      <!-- Kolom 3: Layanan & Bantuan -->
      <div class="flex flex-col gap-2">
        <span class="noir-display text-base mb-2">Layanan &amp; Bantuan</span>
        <NuxtLink
          v-for="l in layanan"
          :key="l.label"
          :to="l.to"
          class="text-sm text-[var(--noir-champagne-dim)] hover:text-[var(--noir-gold)] transition-colors"
        >{{ l.label }}</NuxtLink>
      </div>

      <!-- Kolom 4: Warta Botani (Newsletter) -->
      <div class="flex flex-col gap-2">
        <span class="noir-display text-base mb-2">Warta Botani</span>
        <p class="text-sm text-[var(--noir-champagne-dim)] leading-relaxed">
          Dapatkan inspirasi rangkaian seasonal dan penawaran eksklusif setiap bulannya.
        </p>
        <form @submit.prevent="handleSubscribe" class="flex flex-col gap-2 mt-2">
          <input
            v-model="emailInput"
            type="email"
            placeholder="Alamat email Anda..."
            required
            class="w-full px-4 py-2.5 rounded-lg bg-[#1f1f21] border border-[#4a4538]/50 text-[#e5e1e4] placeholder:text-[var(--noir-champagne-dim)]/50 text-sm focus:outline-none focus:border-[var(--noir-gold)] transition-all"
          />
          <button
            type="submit"
            class="w-full py-2.5 rounded-lg bg-[var(--noir-gold)] hover:bg-[var(--noir-gold-hover)] text-[#0e0e10] text-sm font-bold transition-colors shadow-sm"
          >Berlangganan</button>
        </form>
        <Transition enter-active-class="transition-all duration-300" enter-from-class="opacity-0 -translate-y-1" enter-to-class="opacity-100 translate-y-0">
          <p v-if="subscribed" class="text-[var(--noir-gold)] text-xs font-semibold mt-1 flex items-center gap-1.5">
            <Icon name="ph:check-circle-fill" class="w-3.5 h-3.5" />
            Berhasil! Terima kasih sudah berlangganan.
          </p>
        </Transition>
      </div>
    </div>

    <!-- Bottom bar (pb tambahan di mobile: ruang untuk MobileBottomBar fixed) -->
    <div class="bg-[#08080a]! pt-6 pb-24 md:pb-6 border-t border-[#4a4538]/20">
      <div class="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-[var(--noir-champagne-dim)]">
        <div class="flex items-center gap-2">
          <Icon name="ph:shield-check-fill" class="w-[18px] h-[18px] text-[var(--noir-gold)]" />
          <span>Garansi 100% Bunga Segar &amp; Penggantian Gratis jika Rusak Saat Pengantaran</span>
        </div>
        <div class="flex flex-wrap items-center gap-2">
          <span
            v-for="m in metodeBayar"
            :key="m"
            class="px-2 py-1 rounded bg-[#1f1f21] border border-[#4a4538]/30 text-xs text-[#ccc6bb] font-semibold"
          >{{ m }}</span>
        </div>
        <p>&copy; {{ new Date().getFullYear() }} HappyBouquet Indonesia. Hak cipta dilindungi undang-undang.</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
const emailInput = ref('')
const subscribed = ref(false)

const handleSubscribe = () => {
  if (emailInput.value) {
    subscribed.value = true
    emailInput.value = ''
    setTimeout(() => { subscribed.value = false }, 5000)
  }
}

const socials = [
  { icon: 'ph:instagram-logo-fill', href: 'https://instagram.com', title: 'Instagram' },
  { icon: 'ph:play-circle-fill', href: 'https://tiktok.com', title: 'TikTok' },
  { icon: 'ph:chat-circle-dots-fill', href: 'https://wa.me/6281234567890', title: 'WhatsApp' },
]

const kategori = [
  { label: 'Signature Rose Bouquets', to: '/products?cat=buket-bunga' },
  { label: 'Graduation Special', to: '/products?cat=buket-wisuda' },
  { label: 'Wellness & Baby Hampers', to: '/products?cat=hampers-dan-gift' },
  { label: 'Bunga Meja & Vas Keramik', to: '/products?cat=koleksi' },
  { label: 'Standing Flower Pernikahan', to: '/products?cat=koleksi' },
]

const layanan = [
  { label: 'Bespoke Floral Consultation', to: '/contact' },
  { label: 'Lacak Status Pengiriman', to: '/tracking' },
  { label: 'Pertanyaan Umum (FAQ)', to: '/faq' },
  { label: 'Kebijakan Privasi & Syarat', to: '/privacy' },
  { label: 'Pengiriman Korporasi', to: '/contact' },
]

const metodeBayar = ['BCA', 'Mandiri', 'QRIS', 'GoPay', 'Visa/Mastercard']
</script>
