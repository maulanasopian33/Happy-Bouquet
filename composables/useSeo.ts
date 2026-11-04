import { computed } from 'vue'
import { useStoreSettings } from './useStoreSettings'

export interface SeoOptions {
  title?: string
  description?: string
  keywords?: string
  image?: string
  url?: string
  type?: 'website' | 'article' | 'product'
  robots?: string
  product?: {
    name: string
    price: number
    image?: string
    description?: string
    sku?: string
    category?: string
    availability?: 'InStock' | 'PreOrder' | 'OutOfStock'
    rating?: number
    reviewCount?: number
  }
  breadcrumbs?: Array<{ name: string; path: string }>
  faqs?: Array<{ q: string; a: string }>
}

export const useSeo = (options: SeoOptions = {}) => {
  const { settings } = useStoreSettings()
  const route = useRoute()

  const baseUrl = computed(() => settings.value.seo_canonical_url || 'https://happybouquet.web.id')
  const currentUrl = computed(() => {
    if (options.url) return options.url
    const path = route.path === '/' ? '' : route.path
    return `${baseUrl.value}${path}`
  })

  const pageTitle = computed(() => {
    if (options.title) {
      return `${options.title} — ${settings.value.brand_name || 'HappyBouquet'}`
    }
    return settings.value.seo_meta_title || `${settings.value.brand_name || 'HappyBouquet'} — Toko Buket Bunga Mewah Jakarta`
  })

  const pageDescription = computed(() => {
    return options.description || settings.value.seo_meta_description || 'Toko buket bunga artisan Jakarta. Rangkaian bunga segar, mawar impor Ekuador, buket wisuda, dan bloom box mewah dengan pengiriman hari ini (Same Day).'
  })

  const pageImage = computed(() => {
    if (options.image) return options.image
    return settings.value.seo_og_image || `${baseUrl.value}/default.png`
  })

  const pageKeywords = computed(() => {
    return options.keywords || settings.value.seo_meta_keywords || 'buket bunga jakarta, florist jakarta, buket mawar ekuador, buket wisuda, bloom box, gift flowers'
  })

  const robotsDirective = computed(() => {
    return options.robots || settings.value.seo_robots_directive || 'index, follow'
  })

  // Injeksi Meta Tags Standar & Open Graph / Twitter Card
  useHead({
    title: pageTitle,
    link: [
      { rel: 'canonical', href: currentUrl }
    ],
    meta: [
      { name: 'description', content: pageDescription },
      { name: 'keywords', content: pageKeywords },
      { name: 'robots', content: robotsDirective },
      // Open Graph
      { property: 'og:site_name', content: computed(() => settings.value.brand_name || 'HappyBouquet') },
      { property: 'og:title', content: pageTitle },
      { property: 'og:description', content: pageDescription },
      { property: 'og:url', content: currentUrl },
      { property: 'og:type', content: options.type || 'website' },
      { property: 'og:image', content: pageImage },
      { property: 'og:image:alt', content: pageTitle },
      { property: 'og:locale', content: 'id_ID' },
      // Twitter Card
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: pageTitle },
      { name: 'twitter:description', content: pageDescription },
      { name: 'twitter:image', content: pageImage },
      // Search Console Verifications
      ...(settings.value.seo_google_verification ? [{ name: 'google-site-verification', content: settings.value.seo_google_verification }] : []),
      ...(settings.value.seo_bing_verification ? [{ name: 'msvalidate.01', content: settings.value.seo_bing_verification }] : [])
    ]
  })

  // Injeksi Schema.org JSON-LD
  const schemas: any[] = []

  // 1. Schema LocalBusiness / Florist & Organization (Homepage / Global)
  if (route.path === '/') {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': ['Florist', 'LocalBusiness', 'Organization'],
      '@id': `${baseUrl.value}/#organization`,
      name: settings.value.brand_name || 'HappyBouquet',
      url: baseUrl.value,
      logo: `${baseUrl.value}/icon.png`,
      image: pageImage.value,
      telephone: `+${settings.value.whatsapp_number}`,
      email: settings.value.email,
      priceRange: 'Rp 150.000 - Rp 3.500.000',
      address: {
        '@type': 'PostalAddress',
        streetAddress: settings.value.address || 'Jl. Senopati No. 42',
        addressLocality: 'Jakarta Selatan',
        addressRegion: 'DKI Jakarta',
        postalCode: '12190',
        addressCountry: 'ID'
      },
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
          opens: '08:00',
          closes: '21:00'
        }
      ],
      sameAs: [
        settings.value.instagram_url,
        settings.value.tiktok_url
      ].filter(Boolean)
    })
  }

  // 2. Schema Product (Halaman Detail Produk)
  if (options.product) {
    const prod = options.product
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: prod.name,
      image: prod.image || pageImage.value,
      description: prod.description || pageDescription.value,
      sku: prod.sku || `HB-${prod.name.replace(/[^a-zA-Z0-9]/g, '').toUpperCase()}`,
      brand: {
        '@type': 'Brand',
        name: settings.value.brand_name || 'HappyBouquet'
      },
      category: prod.category || 'Buket Bunga',
      offers: {
        '@type': 'Offer',
        url: currentUrl.value,
        priceCurrency: 'IDR',
        price: prod.price,
        priceValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        itemCondition: 'https://schema.org/NewCondition',
        availability: prod.availability === 'OutOfStock' ? 'https://schema.org/OutOfStock' : (prod.availability === 'PreOrder' ? 'https://schema.org/PreOrder' : 'https://schema.org/InStock'),
        seller: {
          '@type': 'Organization',
          name: settings.value.brand_name || 'HappyBouquet'
        }
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: (prod.rating || 4.9).toString(),
        reviewCount: (prod.reviewCount || 128).toString(),
        bestRating: '5',
        worstRating: '1'
      }
    })
  }

  // 3. Schema Breadcrumbs
  if (options.breadcrumbs && options.breadcrumbs.length > 0) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: options.breadcrumbs.map((b, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        name: b.name,
        item: b.path.startsWith('http') ? b.path : `${baseUrl.value}${b.path}`
      }))
    })
  }

  // 4. Schema FAQ
  if (options.faqs && options.faqs.length > 0) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: options.faqs.map(f => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: f.a
        }
      }))
    })
  }

  // Inject Script JSON-LD ke Head
  if (schemas.length > 0) {
    useHead({
      script: schemas.map((schema, i) => ({
        id: `schema-jsonld-${i}`,
        type: 'application/ld+json',
        children: JSON.stringify(schema)
      }))
    })
  }

  return {
    pageTitle,
    pageDescription,
    pageImage,
    currentUrl
  }
}

