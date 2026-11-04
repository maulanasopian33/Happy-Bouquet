export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()
  const { getSessionId, getTelemetry, trackAction } = useAnalytics()

  let pageStartTime = Date.now()
  let maxScrollDepth = 0
  const recordedMilestones = new Set<number>()
  let heartbeatTimer: any = null

  const calculateScrollDepth = (): number => {
    try {
      const scrollTop = window.scrollY || document.documentElement.scrollTop
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      if (docHeight <= 0) return 100
      return Math.min(100, Math.round((scrollTop / docHeight) * 100))
    } catch {
      return 0
    }
  }

  const handleScroll = () => {
    const depth = calculateScrollDepth()
    if (depth > maxScrollDepth) {
      maxScrollDepth = depth
    }

    const milestones = [25, 50, 75, 100]
    for (const m of milestones) {
      if (depth >= m && !recordedMilestones.has(m)) {
        recordedMilestones.add(m)
        trackAction('scroll_depth', { depth: m })
      }
    }
  }

  const startHeartbeat = () => {
    if (heartbeatTimer) clearInterval(heartbeatTimer)
    heartbeatTimer = setInterval(() => {
      if (document.hidden) return // Jeda heartbeat jika tab sedang tidak dilihat
      const apiUrl = config.public.apiUrl
      if (apiUrl) {
        const durationSeconds = Math.floor((Date.now() - pageStartTime) / 1000)
        fetch(`${apiUrl}/analytics/collect`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            session_id: getSessionId(),
            url: window.location.pathname,
            event_type: 'heartbeat',
            duration_seconds: durationSeconds,
            scroll_depth: maxScrollDepth,
            ...getTelemetry(),
          }),
          keepalive: true,
        }).catch(() => {})
      }
    }, 30000) // Heartbeat setiap 30 detik
  }

  nuxtApp.hook('page:finish', () => {
    pageStartTime = Date.now()
    maxScrollDepth = 0
    recordedMilestones.clear()

    // 1. Google Analytics (if gaId provided)
    if (window.gtag && config.public.gaId) {
      window.gtag('event', 'page_view', {
        page_location: window.location.href,
        page_path: window.location.pathname,
        page_title: document.title,
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
        referrer: document.referrer || '',
        ...getTelemetry(),
      }

      fetch(`${apiUrl}/analytics/collect`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        keepalive: true,
      }).catch(() => {
        // Silent catch: Jangan ganggu UX jika API analytics offline
      })
    }

    // Pasang scroll listener
    if (typeof window !== 'undefined') {
      window.removeEventListener('scroll', handleScroll)
      window.addEventListener('scroll', handleScroll, { passive: true })
      startHeartbeat()
    }
  })

  // Send exit event on tab close / unload
  if (typeof window !== 'undefined') {
    const sendExitBeacon = () => {
      const apiUrl = config.public.apiUrl
      if (apiUrl) {
        const durationSeconds = Math.floor((Date.now() - pageStartTime) / 1000)
        const payload = JSON.stringify({
          session_id: getSessionId(),
          url: window.location.pathname,
          event_type: 'exit',
          duration_seconds: durationSeconds,
          scroll_depth: maxScrollDepth,
          ...getTelemetry(),
        })

        if (navigator.sendBeacon) {
          navigator.sendBeacon(`${apiUrl}/analytics/collect`, new Blob([payload], { type: 'application/json' }))
        }
      }
    }

        window.addEventListener('beforeunload', sendExitBeacon)
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        sendExitBeacon()
      }
    })

    // 3. Web Vitals Observer (LCP, CLS, TTFB)
    try {
      // TTFB
      window.addEventListener('load', () => {
        const navEntries = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[]
        if (navEntries.length > 0) {
          const ttfb = Math.round(navEntries[0].responseStart - navEntries[0].requestStart)
          if (ttfb > 0 && config.public.apiUrl) {
            trackAction('web_vital', { metric: 'TTFB', value: ttfb, unit: 'ms' })
          }
        }
      })

      // LCP (Largest Contentful Paint)
      if ('PerformanceObserver' in window) {
        const lcpObserver = new PerformanceObserver((entryList) => {
          const entries = entryList.getEntries()
          const lastEntry = entries[entries.length - 1]
          if (lastEntry) {
            const lcp = Math.round(lastEntry.startTime)
            trackAction('web_vital', { metric: 'LCP', value: lcp, unit: 'ms' })
          }
        })
        lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true })

        // CLS (Cumulative Layout Shift)
        let clsValue = 0
        const clsObserver = new PerformanceObserver((entryList) => {
          for (const entry of entryList.getEntries() as any[]) {
            if (!entry.hadRecentInput) {
              clsValue += entry.value
            }
          }
        })
        clsObserver.observe({ type: 'layout-shift', buffered: true })

        // Kirim CLS saat sebelum unload
        window.addEventListener('visibilitychange', () => {
          if (document.visibilityState === 'hidden' && clsValue > 0) {
            trackAction('web_vital', { metric: 'CLS', value: Math.round(clsValue * 1000) / 1000, unit: 'score' })
          }
        })
      }
    } catch {
      // Browser tidak mendukung PerformanceObserver
    }
  }
})
