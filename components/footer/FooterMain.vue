<template>
  <footer class="bg-[var(--bg-card)] border-t border-[var(--border-color)] pt-16 pb-8 mt-24 transition-colors duration-500 relative overflow-hidden">
    <!-- Top gradient accent -->
    <div class="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-rose-500/50 to-transparent" />

    <div class="section-wrapper">
      <!-- Main Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">

        <!-- Brand & About -->
        <div class="space-y-5 sm:col-span-2 lg:col-span-1">
          <NuxtLink to="/" class="flex items-center gap-3 group w-fit">
            <div class="w-11 h-11 rounded-2xl bg-gradient-to-br from-rose-500 to-rose-700 text-white font-black flex items-center justify-center shadow-lg group-hover:rotate-6 transition-all duration-300">
              <span class="text-sm">HB</span>
            </div>
            <div>
              <h2 class="text-xl font-extrabold tracking-tight text-primary leading-none">
                Happy<span class="text-rose-600">Bouquet</span>
              </h2>
              <p class="text-[9px] uppercase tracking-widest text-secondary mt-0.5">Premium Floral Art</p>
            </div>
          </NuxtLink>

          <p class="text-secondary text-sm leading-relaxed max-w-xs">
            Meramu emosi menjadi rangkaian bunga yang menakjubkan. Setiap kelopak dipilih dengan penuh semangat dan dikirim tepat waktu.
          </p>

          <!-- Social Icons (using Nuxt Icon) -->
          <div class="flex gap-2.5">
            <a
              v-for="social in socialLinks"
              :key="social.label"
              :href="social.href"
              :title="social.label"
              target="_blank"
              rel="noopener noreferrer"
              class="w-10 h-10 rounded-xl bg-[var(--bg-section)] flex items-center justify-center text-secondary hover:bg-rose-600 hover:text-white transition-all duration-300 hover:-translate-y-1 border border-[var(--border-color)] hover:border-rose-600"
            >
              <Icon :name="social.icon" class="w-4.5 h-4.5" />
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div>
          <h4 class="text-primary font-bold text-xs uppercase tracking-[0.2em] mb-6">Navigasi</h4>
          <ul class="space-y-3.5">
            <li v-for="link in navLinks" :key="link.path">
              <NuxtLink
                :to="link.path"
                class="text-secondary hover:text-rose-600 transition-colors duration-300 text-sm font-medium flex items-center gap-2.5 group"
              >
                <span class="w-1.5 h-1.5 rounded-full bg-[var(--border-strong)] group-hover:bg-rose-600 transition-all duration-300 group-hover:scale-125" />
                {{ link.label }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Support -->
        <div>
          <h4 class="text-primary font-bold text-xs uppercase tracking-[0.2em] mb-6">Bantuan</h4>
          <ul class="space-y-3.5">
            <li v-for="link in helpLinks" :key="link.path">
              <NuxtLink
                :to="link.path"
                class="text-secondary hover:text-rose-600 transition-colors duration-300 text-sm font-medium flex items-center gap-2.5 group"
              >
                <span class="w-1.5 h-1.5 rounded-full bg-[var(--border-strong)] group-hover:bg-rose-600 transition-all duration-300 group-hover:scale-125" />
                {{ link.label }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Newsletter & Contact -->
        <div class="space-y-7">
          <!-- Newsletter -->
          <div>
            <h4 class="text-primary font-bold text-xs uppercase tracking-[0.2em] mb-4">Newsletter</h4>
            <p class="text-secondary text-xs mb-4 leading-relaxed">Dapatkan inspirasi bunga & promo eksklusif langsung di inbox kamu.</p>
            <form @submit.prevent="handleSubscribe" class="relative">
              <input
                v-model="emailInput"
                type="email"
                placeholder="email@kamu.com"
                class="w-full pl-4 pr-14 py-3 rounded-2xl bg-[var(--bg-section)] border border-[var(--border-color)] focus:ring-2 focus:ring-rose-500/20 focus:border-rose-400/60 text-xs font-medium text-primary outline-none transition-all placeholder:text-muted"
                required
              />
              <button
                type="submit"
                class="absolute right-1.5 top-1.5 bottom-1.5 px-3.5 rounded-xl bg-rose-600 text-white shadow-md hover:bg-rose-700 transition-all hover:-translate-y-0.5 flex items-center"
              >
                <Icon name="ph:paper-plane-tilt-fill" class="w-4 h-4" />
              </button>
            </form>
            <Transition enter-active-class="transition-all duration-300" enter-from-class="opacity-0 -translate-y-1" enter-to-class="opacity-100 translate-y-0">
              <p v-if="subscribed" class="text-emerald-600 dark:text-emerald-400 text-xs font-semibold mt-2 flex items-center gap-1.5">
                <Icon name="ph:check-circle-fill" class="w-3.5 h-3.5" />
                Berhasil! Terima kasih sudah subscribe 🌸
              </p>
            </Transition>
          </div>

          <!-- Contact Info -->
          <div class="space-y-3.5">
            <div v-for="contact in contactInfo" :key="contact.label" class="flex items-center gap-3.5 group">
              <div class="w-9 h-9 rounded-xl bg-rose-50 dark:bg-rose-950/30 flex items-center justify-center text-rose-600 shrink-0 group-hover:scale-110 transition-transform border border-rose-100 dark:border-rose-900/40">
                <Icon :name="contact.icon" class="w-4 h-4" />
              </div>
              <div class="overflow-hidden">
                <p class="text-[9px] font-bold text-muted uppercase tracking-widest leading-none mb-0.5">{{ contact.label }}</p>
                <p class="text-xs font-semibold text-primary truncate">{{ contact.value }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Payment Methods -->
      <div class="py-8 border-t border-[var(--border-color)] flex flex-col sm:flex-row items-center justify-between gap-6">
        <div class="flex items-center gap-3">
          <p class="text-[10px] font-bold text-muted uppercase tracking-widest shrink-0">Pembayaran:</p>
          <div class="flex items-center gap-2 flex-wrap">
            <span
              v-for="method in paymentMethods"
              :key="method"
              class="px-2.5 py-1 bg-[var(--bg-section)] border border-[var(--border-color)] rounded-lg text-[10px] font-bold text-secondary"
            >
              {{ method }}
            </span>
          </div>
        </div>
        <div class="flex items-center gap-3 text-muted">
          <Icon name="ph:shield-check-fill" class="w-4 h-4 text-emerald-500" />
          <span class="text-xs font-semibold">Transaksi 100% Aman & Terpercaya</span>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="pt-6 border-t border-[var(--border-color)] flex flex-col sm:flex-row justify-between items-center gap-5">
        <p class="text-xs font-medium text-muted text-center sm:text-left">
          &copy; {{ new Date().getFullYear() }} <span class="font-bold text-primary">HappyBouquet</span>. Dibuat dengan
          <Icon name="ph:heart-fill" class="inline-block w-3 h-3 text-rose-500 mx-0.5" />
          di Jakarta.
        </p>
        <div class="flex items-center gap-5">
          <NuxtLink to="/privacy" class="text-xs font-semibold text-muted hover:text-rose-600 transition-colors">Privasi</NuxtLink>
          <NuxtLink to="/terms" class="text-xs font-semibold text-muted hover:text-rose-600 transition-colors">Ketentuan</NuxtLink>
          <NuxtLink to="/shipping" class="text-xs font-semibold text-muted hover:text-rose-600 transition-colors">Pengiriman</NuxtLink>
        </div>
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

// Using Nuxt Icon (ph: provider) — consistent with rest of app
const socialLinks = [
  { label: 'Instagram', href: 'https://instagram.com', icon: 'ph:instagram-logo-fill' },
  { label: 'TikTok', href: 'https://tiktok.com', icon: 'ph:tiktok-logo-fill' },
  { label: 'WhatsApp', href: 'https://wa.me/6281234567890', icon: 'ph:whatsapp-logo-fill' },
  { label: 'Facebook', href: 'https://facebook.com', icon: 'ph:facebook-logo-fill' },
]

const navLinks = [
  { path: '/', label: 'Beranda' },
  { path: '/products', label: 'Buket Pilihan' },
  { path: '/about', label: 'About Us' },
  { path: '/blog', label: 'Inspirasi Bunga' },
]

const helpLinks = [
  { path: '/faq', label: 'Tanya Jawab' },
  { path: '/contact', label: 'Hubungi CS' },
  { path: '/tracking', label: 'Lacak Pesanan' },
  { path: '/returns', label: 'Return & Refund' },
]

const contactInfo = [
  { label: 'Email Support', value: 'hello@happybouquet.id', icon: 'ph:envelope-fill' },
  { label: 'WhatsApp CS', value: '+62 812 3456 7890', icon: 'ph:whatsapp-logo-fill' },
  { label: 'Lokasi Toko', value: 'Jakarta Selatan, Indonesia', icon: 'ph:map-pin-fill' },
]

const paymentMethods = ['Transfer Bank', 'QRIS', 'GoPay', 'OVO', 'Dana', 'COD']
</script>
