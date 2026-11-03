// Data toko tunggal untuk seluruh storefront.
// Backend saat ini BELUM punya GET /api/settings (404) — fallback di bawah yang dipakai.
// Begitu endpoint itu ada, field dengan nama sama otomatis menimpa fallback (kontrak di docs/store-settings-api.md).
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
}

export const STORE_SETTINGS_FALLBACK: StoreSettings = {
  brand_name: 'HappyBouquet',
  whatsapp_number: '6281234567890', // [ISI] nomor asli sebelum rilis produksi
  email: 'hello@happybouquet.id',
  address: 'Jl. Senopati No. 42, Kebayoran Baru, Jakarta Selatan 12190',
  hours: 'Buka Setiap Hari: 08:00 - 21:00 WIB',
  instagram_url: 'https://instagram.com/happybouquet.id',
  tiktok_url: 'https://tiktok.com/@happybouquet.id',
  shopee_url: '', // [ISI] link toko Shopee — kosong = tombol marketplace tidak tampil
  tiktok_shop_url: '', // [ISI] link toko TikTok Shop
}

// Format tampilan nomor:6281234567890 -> +62 812-3456-7890
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
