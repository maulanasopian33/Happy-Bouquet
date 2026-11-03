// Telemetri internal — kunci session sama dengan plugins/ga-router.client.ts
// (storage key sama => session_id sama, tanpa perlu refactor plugin).
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

  // Event klik kanal order (WhatsApp / Shopee / TikTok) — untuk atribusi channel di dashboard
  const trackChannelOutbound = (channel: string, productId?: number) => {
    if (!import.meta.client || !config.public.apiUrl) return
    const payload = {
      session_id: getSessionId(),
      url: window.location.pathname,
      event_type: 'event',
      event_name: 'channel_outbound',
      channel,
      ...(productId != null ? { product_id: productId } : {}),
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

  return { trackChannelOutbound }
}
