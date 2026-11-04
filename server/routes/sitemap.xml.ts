export default defineEventHandler(async (event) => {
  setHeader(event, 'Content-Type', 'application/xml; charset=utf-8')
  setHeader(event, 'Cache-Control', 'public, max-age=3600, s-maxage=3600')

  const config = useRuntimeConfig()
  const apiUrl = config.public.apiUrl || 'http://localhost:5000/api'
  const host = getRequestHeader(event, 'host') || 'happybouquet.web.id'
  const proto = getRequestHeader(event, 'x-forwarded-proto') || 'https'
  const siteUrl = `${proto}://${host}`

  // Halaman Statis Inti
  const staticRoutes = [
    { loc: '/', changefreq: 'daily', priority: '1.0' },
    { loc: '/products', changefreq: 'hourly', priority: '0.9' },
    { loc: '/about', changefreq: 'monthly', priority: '0.6' },
    { loc: '/contact', changefreq: 'monthly', priority: '0.6' },
    { loc: '/faq', changefreq: 'weekly', priority: '0.6' },
    { loc: '/shipping', changefreq: 'monthly', priority: '0.5' },
    { loc: '/privacy', changefreq: 'yearly', priority: '0.3' },
    { loc: '/terms', changefreq: 'yearly', priority: '0.3' },
  ]

  let productEntries: Array<{ loc: string; lastmod: string; changefreq: string; priority: string; image?: string; title?: string }> = []

  try {
    const res: any = await $fetch(`${apiUrl}/products?active=true`, { timeout: 3500 })
    const products = res?.data || []

    productEntries = products.map((p: any) => {
      const slug = p.slug || (p.name ? p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') : `product-${p.id}`)
      const lastmod = p.updatedAt ? new Date(p.updatedAt).toISOString() : new Date().toISOString()
      const rawImage = p.photo_url ? (p.photo_url.startsWith('http') ? p.photo_url : `${apiUrl.replace('/api', '')}/uploads/${p.photo_url.replace(/^\/?uploads\/?/, '')}`) : undefined

      return {
        loc: `/products/${slug}`,
        lastmod,
        changefreq: 'daily',
        priority: '0.8',
        image: rawImage,
        title: p.name || 'Buket Bunga'
      }
    })
  } catch {
    // Graceful fallback jika backend API down
    productEntries = []
  }

  const currentDate = new Date().toISOString()

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${staticRoutes.map(route => `  <url>
    <loc>${siteUrl}${route.loc}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`).join('\n')}
${productEntries.map(prod => `  <url>
    <loc>${siteUrl}${prod.loc}</loc>
    <lastmod>${prod.lastmod}</lastmod>
    <changefreq>${prod.changefreq}</changefreq>
    <priority>${prod.priority}</priority>${prod.image ? `
    <image:image>
      <image:loc>${prod.image}</image:loc>
      <image:title>${escapeXml(prod.title || '')}</image:title>
    </image:image>` : ''}
  </url>`).join('\n')}
</urlset>`

  return xml
})

function escapeXml(unsafe: string): string {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<': return '&lt;'
      case '>': return '&gt;'
      case '&': return '&amp;'
      case '\'': return '&apos;'
      case '"': return '&quot;'
      default: return c
    }
  })
}
