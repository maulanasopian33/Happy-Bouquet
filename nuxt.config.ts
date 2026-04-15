// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  css: ["@/assets/css/main.css"],
  modules: ['@pinia/nuxt', "@nuxt/icon"],
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

  // =========================================================
  // NITRO STORAGE — Redis via Upstash (menghemat RAM server)
  // Aktifkan blok ini jika sudah memiliki kredensial Upstash.
  //
  // CARA SETUP:
  //   1. Buka https://upstash.com → buat database Redis.
  //   2. Salin UPSTASH_REDIS_REST_URL & UPSTASH_REDIS_REST_TOKEN.
  //   3. Tambahkan ke file .env project:
  //        UPSTASH_REDIS_REST_URL=https://xxxxxx.upstash.io
  //        UPSTASH_REDIS_REST_TOKEN=AxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxQ
  //   4. Install driver: npm install unstorage @upstash/redis
  //   5. Hapus komentar pada blok nitro di bawah ini.
  // =========================================================
  //
  nitro: {
    storage: {
      // Mengganti backend cache Nitro dari RAM → Redis Upstash
      cache: {
        driver: 'upstash',
        url: process.env.UPSTASH_REDIS_REST_URL,
        token: process.env.UPSTASH_REDIS_REST_TOKEN,
        // Prefix key di Redis agar mudah didentifikasi
        base: 'happybouquet:cache:',
      },
    },
    devStorage: {
      cache: {
        driver: 'memory'
      }
    }
  },

  runtimeConfig: {
    public: {
      gaId: 'G-1H48JGPPD8',
      apiUrl: process.env.NUXT_API_URL || 'http://localhost:5000/api',
      maintenance: {
        enabled: process.env.NUXT_MAINTENANCE_ENABLED === 'true',
        secret: 'happy-dev'
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
