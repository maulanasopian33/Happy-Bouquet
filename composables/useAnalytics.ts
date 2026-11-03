// Telemetri internal — pelacakan aktivitas pengunjung nyata vs bot
export const useAnalytics = () => {
  const config = useRuntimeConfig()

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

  const getTelemetry = () => {
    if (!import.meta.client) return {}
    return {
      screen_size: `${window.screen?.width || 0}x${window.screen?.height || 0}`,
      viewport_size: `${window.innerWidth || 0}x${window.innerHeight || 0}`,
      language: navigator.language || 'id-ID',
      is_webdriver: Boolean(navigator.webdriver),
    }
  }

  // Melacak event tindakan khusus (misal: tambah keranjang, klik checkout WA, cari buket)
  const trackAction = (eventName: string, eventData?: Record<string, any>) => {
    if (!import.meta.client || !config.public.apiUrl) return

    const payload = {
      session_id: getSessionId(),
      url: window.location.pathname,
      event_type: 'action',
      event_name: eventName,
      event_data: eventData || {},
      ...getTelemetry(),
    }

    fetch(`${config.public.apiUrl}/analytics/collect`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      keepalive: true,
    }).catch(() => {
      // Silent: analytics tidak boleh mengganggu UX
    })
  }

  // Event klik kanal order (WhatsApp / Shopee / TikTok) — backward compatibility
  const trackChannelOutbound = (channel: string, productId?: number) => {
    trackAction('channel_outbound', {
      channel,
      ...(productId != null ? { product_id: productId } : {}),
    })
  }

  return {
    getSessionId,
    getTelemetry,
    trackAction,
    trackChannelOutbound,
  }
}
