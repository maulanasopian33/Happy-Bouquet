export default defineNuxtRouteMiddleware((to) => {
  if (import.meta.server) return

  const config = useRuntimeConfig()
  const maintenanceSecret = config.public.maintenance?.secret || 'happy-dev'
  
  // 1. Detect query parameter activation
  if (to.query.dev_mode === maintenanceSecret) {
    // Save to localStorage
    localStorage.setItem('maintenance_bypass', 'true')
    
    // Set cookie for server-side recognition (Nitro middleware)
    const bypassCookie = useCookie('maintenance_bypass', {
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/'
    })
    bypassCookie.value = 'true'
    
    // Clean up URL without refreshing (optional, but cleaner)
    // We can't easily remove query params in middleware without redirecting,
    // so we'll just let it be or redirect to the same path without query.
    return navigateTo(to.path, { replace: true })
  }

  // 2. Sync localStorage to cookie if not already set
  // This helps if the user cleared cookies but kept localStorage
  const bypassCookie = useCookie('maintenance_bypass')
  if (localStorage.getItem('maintenance_bypass') === 'true' && !bypassCookie.value) {
    bypassCookie.value = 'true'
  }
})
