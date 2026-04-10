import { defineEventHandler, setHeader } from 'h3'

export default defineEventHandler((event) => {
  // Silent handler for zombie service worker requests
  // This prevents 404s that crash the Nitro/Nuxt dev overlay
  setHeader(event, 'Content-Type', 'application/javascript')
  setHeader(event, 'Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
  
  return '// Silent service worker placeholder to prevent dev-server crashes'
})
