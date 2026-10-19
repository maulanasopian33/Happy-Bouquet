// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  css: ["@/assets/css/main.css"],
  modules: ['@pinia/nuxt', "@nuxt/icon"],
  icon: {
    serverBundle: 'remote'
  },
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      htmlAttrs: { lang: 'id' },
      meta: [
        { name: 'robots', content: 'index, follow' },
        { name: 'theme-color', content: '#E11D48' },
      ]
    }
  },

  // =========================================================
  // ROUTE CACHING — SWR (Stale-While-Revalidate)
  // Strategi:
  //   swr: N  → Halaman di-serve dari cache. Cache diperbarui
  //             di background setelah N detik (tidak memblokir user).
  //   Rekomendasi durasi berdasarkan frekuensi perubahan konten.
  // =========================================================
  routeRules: {
    // Landing Page — konten statis (hero, promo, testimoni).
    // Cache 24 jam; sangat jarang berubah, ideal untuk SWR.
    '/': { swr: 86400 },

    // Halaman Produk (index & detail) — berubah saat ada produk baru/update harga.
    // Cache 1 jam; cukup fresh untuk e-commerce dengan update ringan.
    '/products': { swr: 3600 },
    '/products/**': { swr: 3600 },
    '/category': { swr: 3600 },

    // Halaman statis — hampir tidak pernah berubah.
    // Cache 7 hari; ideal untuk konten legal & brand.
    '/about': { swr: 604800 },
    '/shipping': { swr: 604800 },
    '/privacy': { swr: 604800 },
    '/terms': { swr: 604800 },
    '/faq': { swr: 604800 },
    '/contact': { swr: 604800 },
    '/blog': { swr: 604800 },
    '/blog/**': { swr: 604800 },
    '/links': { swr: 604800 },

    // API Routes & halaman dinamis — JANGAN di-cache di sini.
    '/api/**': { cache: false },
    '/checkout/**': { cache: false },
    '/account/**': { cache: false },
    '/tracking': { cache: false },
    '/maintenance': { cache: false },
  },

  // Cache SWR Nitro -> Redis Upstash (persisten lintas restart Passenger).
  // Wajib set UPSTASH_REDIS_REST_URL & UPSTASH_REDIS_REST_TOKEN di .env server.
  nitro: {
    storage: {
      cache: {
        driver: 'upstash',
        url: process.env.UPSTASH_REDIS_REST_URL,
        token: process.env.UPSTASH_REDIS_REST_TOKEN,
        base: 'happybouquet:cache:',
      },
    },
    devStorage: {
      cache: {
        driver: 'memory'
      }
    }
  },
  // Ikon: 'remote' agar koleksi ph (4.5MB) tidak dimuat ke RAM tiap proses;
  // SVG di-fetch dari Iconify API sekali lalu di-cache.

  runtimeConfig: {
    // Secret hanya di server (private) — jangan dipindahkan ke public.
    // Maintenance hanya aktif jika NUXT_MAINTENANCE_ENABLED=true saat build
    // DAN secret di-set; tanpa secret, middleware menganggap salah konfigurasi.
    maintenance: {
      secret: process.env.NUXT_MAINTENANCE_SECRET || ''
    },
    public: {
      gaId: 'G-1H48JGPPD8',
      apiUrl: process.env.NUXT_API_URL || 'http://localhost:5000/api',
      maintenance: {
        enabled: process.env.NUXT_MAINTENANCE_ENABLED === 'true'
      }
    }
  },
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],
  vite: {
    plugins: [
      tailwindcss()
    ]
  },
})
