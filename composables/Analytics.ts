export const useAnalytics = () => {
  const config = useRuntimeConfig()

  const trackEvent = (eventName: string, params: any = {}) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', eventName, params)
    } else {
      console.warn('GA4 not loaded yet')
    }
  }

  const trackAddToCart = (product: any, quantity = 1) => {
    trackEvent('add_to_cart', {
      currency: 'IDR',
      value: product.price * quantity,
      items: [
        {
          item_id: product.id,
          item_name: product.name,
          price: product.price,
          quantity: quantity
        }
      ]
    })
  }

  return {
    trackEvent,
    trackAddToCart
  }
}
