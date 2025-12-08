export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()

  if (!config.public.gaId) return

  // Inject GA script
  const script1 = document.createElement('script')
  script1.async = true
  script1.src = `https://www.googletagmanager.com/gtag/js?id=${config.public.gaId}`
  document.head.appendChild(script1)

  const script2 = document.createElement('script')
  script2.innerHTML = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${config.public.gaId}', { send_page_view: false, debug_mode: true });
  `
  document.head.appendChild(script2)
})
