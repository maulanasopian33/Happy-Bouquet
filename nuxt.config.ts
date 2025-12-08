// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ["@/assets/css/main.css"],
  modules: ['@pinia/nuxt', "@nuxt/icon"],
  runtimeConfig: {
    public: {
      gaId: 'G-1H48JGPPD8' // ganti dengan Measurement ID
    }
  },
  vite: {
    plugins: [
      tailwindcss()
    ]
  },
})