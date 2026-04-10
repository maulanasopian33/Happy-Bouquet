import { defineEventHandler, getCookie, sendRedirect, getRequestURL } from 'h3'

export default defineEventHandler((event) => {
  const config = useRuntimeConfig()
  const maintenance = config.public.maintenance
  
  if (!maintenance?.enabled) return

  const url = getRequestURL(event)
  const path = url.pathname

  // 1. Skip system paths, assets, and error handlers
  if (
    path.startsWith('/_nuxt') || 
    path.startsWith('/__nuxt') ||
    path.startsWith('/api') ||
    path === '/maintenance' ||
    path === '/dev-sw.js' ||
    path.includes('.') ||
    path.includes('error') // Catches /__nuxt_error etc.
  ) {
    return
  }

  // 2. Check for bypass cookie
  const bypassCookie = getCookie(event, 'maintenance_bypass')
  
  // 3. Check for bypass secret in query (redundant but helpful for the very first request)
  const query = url.searchParams
  const isBypassQuery = query.get('dev_mode') === maintenance.secret

  if (bypassCookie === 'true' || isBypassQuery) {
    // Inject robots noindex header even if bypassed (safe for dev)
    event.node.res.setHeader('X-Robots-Tag', 'noindex, nofollow')
    return
  }

  // 4. Redirect to maintenance page
  return sendRedirect(event, '/maintenance', 302)
})
