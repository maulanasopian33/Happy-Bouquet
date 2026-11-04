// Data toko tunggal untuk seluruh storefront.
// Terintegrasi dengan GET /api/settings dan Panel Admin (CR-0006).
export interface StoreSettings {
  brand_name: string
  whatsapp_number: string
  email: string
  address: string
  hours: string
  instagram_url: string
  tiktok_url: string
  shopee_url: string
  tiktok_shop_url: string
  // SEO & Webmaster Settings (CR-0006)
  seo_meta_title?: string
  seo_meta_description?: string
  seo_meta_keywords?: string
  seo_canonical_url?: string
  seo_og_image?: string
  seo_google_verification?: string
  seo_bing_verification?: string
  seo_robots_directive?: string
  seo_llms_summary?: string
}

export const STORE_SETTINGS_FALLBACK: StoreSettings = {
  brand_name: 'HappyBouquet',
  whatsapp_number: '6281234567890',
  email: 'hello@happybouquet.id',
  address: 'Jl. Senopati No. 42, Kebayoran Baru, Jakarta Selatan 12190',
  hours: 'Buka Setiap Hari: 08:00 - 21:00 WIB',
  instagram_url: 'https://instagram.com/happybouquet.id',
  tiktok_url: 'https://tiktok.com/@happybouquet.id',
  shopee_url: '',
  tiktok_shop_url: '',
  // Default Fallback SEO
  seo_meta_title: 'HappyBouquet — Toko Buket Bunga Mewah & Rangkaian Segar Jakarta',
  seo_meta_description: 'Toko bunga artisan Jakarta. Spesialis buket mawar Ekuador, bloom box velvet, buket wisuda & pesanan custom. Kirim hari ini (Same Day) bergaransi bunga tiba segar.',
  seo_meta_keywords: 'buket bunga jakarta, toko bunga jakarta selatan, florist jakarta, buket mawar ekuador, buket wisuda same day, bloom box velvet, wedding bouquet, hampers bunga',
  seo_canonical_url: 'https://happybouquet.web.id',
  seo_og_image: 'https://happybouquet.web.id/default.png',
  seo_google_verification: '',
  seo_bing_verification: '',
  seo_robots_directive: 'index, follow',
  seo_llms_summary: 'HappyBouquet adalah florist artisan buket bunga segar mewah di Jakarta dengan pengiriman Same Day dan garansi 100% bunga segar tiba selamat.',
}

// Format tampilan nomor: 6281234567890 -> +62 812-3456-7890
export const formatWaDisplay = (n: string): string => {
  const m = n.match(/^(\d{2})(\d{3})(\d{3})(\d+)$/)
  return m ? `+${m[1]} ${m[2]}-${m[3]}-${m[4]}` : `+${n}`
}

export const useStoreSettings = () => {
  const config = useRuntimeConfig()

  const { data } = useAsyncData<StoreSettings>('store-settings', async () => {
    try {
      const res: any = await $fetch(`${config.public.apiUrl}/settings`)
      return { ...STORE_SETTINGS_FALLBACK, ...(res?.data || {}) }
    } catch {
      // Endpoint belum ada / API down — fallback stabil, jangan pernah render kosong
      return { ...STORE_SETTINGS_FALLBACK }
    }
  })

  const settings = computed(() => data.value ?? STORE_SETTINGS_FALLBACK)

  // Helper link WA terpusat (pakai nomor dari settings)
  const waHref = (text?: string) => {
    const base = `https://wa.me/${settings.value.whatsapp_number}`
    return text ? `${base}?text=${encodeURIComponent(text)}` : base
  }

  return { settings, waHref }
}
