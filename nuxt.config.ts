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
