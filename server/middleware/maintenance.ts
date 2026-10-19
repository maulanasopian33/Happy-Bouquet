import { defineEventHandler, getCookie, setCookie, sendRedirect, getRequestURL, getRequestHeader } from 'h3'

export default defineEventHandler((event) => {
  const config = useRuntimeConfig()
  const maintenanceEnabled = config.public.maintenance?.enabled
  const secret = config.maintenance?.secret

  if (!maintenanceEnabled) return

  // Enabled tapi secret kosong = salah konfigurasi. Jangan kunci semua orang.
  if (!secret) {
    console.error('[maintenance] NUXT_MAINTENANCE_SECRET belum di-set; maintenance diabaikan.')
    return
  }

  const url = getRequestURL(event)
  const path = url.pathname

  // 1. Skip system paths, assets, dan error handlers
  if (
    path.startsWith('/_nuxt') ||
    path.startsWith('/__nuxt') ||
    path.startsWith('/api') ||
    path === '/maintenance' ||
    path === '/dev-sw.js' ||
    /\.[a-z0-9]+$/i.test(path) || // file berekstensi (jangan pakai includes('.') — path normal ikut lolos)
    path.includes('error') // Catches /__nuxt_error etc.
  ) {
    return
  }

  // 2. Bypass via header — secret tidak bocor di log/history URL
  //    (server menaruh cookie; header: x-maintenance-secret: <secret>)
  const isBypassHeader = getRequestHeader(event, 'x-maintenance-secret') === secret
  if (isBypassHeader) {
    setCookie(event, 'maintenance_bypass', secret, {
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
      httpOnly: true
    })
  }

  // 3. Cookie bypass hanya valid jika nilainya sama dengan secret
  const bypassCookie = getCookie(event, 'maintenance_bypass')

  if (bypassCookie === secret || isBypassHeader) {
    // Inject robots noindex header even if bypassed (safe for dev)
    event.node.res.setHeader('X-Robots-Tag', 'noindex, nofollow')
    return
  }

  // 4. Redirect to maintenance page
  return sendRedirect(event, '/maintenance', 302)
})
