export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()

  // Generate or retrieve session ID for internal API analytics
  const getSessionId = (): string => {
    try {
      let sid = sessionStorage.getItem('hb_analytics_sid')
      if (!sid) {
        sid = 'hb_sess_' + Math.random().toString(36).substring(2, 10) + Date.now().toString(36)
        sessionStorage.setItem('hb_analytics_sid', sid)
      }
      return sid
    } catch {
      return 'hb_sess_fallback_' + Math.random().toString(36).substring(2, 8)
    }
  }

  nuxtApp.hook('page:finish', () => {
    // 1. Google Analytics (if gaId provided)
    if (window.gtag && config.public.gaId) {
      window.gtag('event', 'page_view', {
        page_location: window.location.href,
        page_path: window.location.pathname,
        page_title: document.title
      })
    }

    // 2. Internal API Analytics Collector (non-blocking)
    const apiUrl = config.public.apiUrl
    if (apiUrl) {
      const payload = {
        session_id: getSessionId(),
        url: window.location.pathname,
        event_type: 'pageview',
        page_title: document.title,
        referrer: document.referrer || ''
      }

      fetch(`${apiUrl}/analytics/collect`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        keepalive: true
      }).catch(() => {
        // Silent catch: Jangan ganggu UX jika API analytics offline
      })
    }
  })

  // Send exit event on tab close / unload
  if (typeof window !== 'undefined') {
    window.addEventListener('beforeunload', () => {
      const apiUrl = config.public.apiUrl
      if (apiUrl) {
        const payload = JSON.stringify({
          session_id: getSessionId(),
          url: window.location.pathname,
          event_type: 'exit'
        })
        if (navigator.sendBeacon) {
          navigator.sendBeacon(`${apiUrl}/analytics/collect`, new Blob([payload], { type: 'application/json' }))
        }
      }
    })
  }
})
