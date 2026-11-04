// Data toko tunggal untuk seluruh storefront.
// Terintegrasi dengan GET /api/settings dan Panel Admin (CR-0006 & CR-0007).

export interface ShippingOption {
  id: number
  name: string
  description: string
  cost: number
  is_active?: boolean
  eta?: string
}

export interface PaymentMethodConfig {
  id: string
  name: string
  rate: number
  is_active?: boolean
  hint?: string
}

export interface BankAccount {
  bank_name: string
  account_number: string
  account_holder: string
  is_active?: boolean
}

export interface TrustStat {
  value: string
  label: string
  icon: string
}

export interface TrustBadge {
  icon: string
  title: string
  text: string
}

export interface TestimonialItem {
  name: string
  location: string
  initials: string
  tag: string
  text: string
}

export interface FaqItem {
  q: string
  a: string
}

export interface BrandStory {
  title: string
  subtitle: string
  story_p1: string
  story_p2: string
  years_experience: string
}

export interface BrandValue {
  title: string
  icon: string
  desc: string
}

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
  // Dynamic Content & CMS Settings (CR-0007)
  shipping_options?: string | ShippingOption[]
  payment_methods_config?: string | PaymentMethodConfig[]
  store_bank_accounts?: string | BankAccount[]
  home_trust_stats?: string | TrustStat[]
  home_trust_badges?: string | TrustBadge[]
  home_testimonials?: string | TestimonialItem[]
  store_faqs?: string | FaqItem[]
  about_brand_story?: string | BrandStory
  about_values?: string | BrandValue[]
  page_shipping_content?: string
  page_terms_content?: string
  page_privacy_content?: string
}

export const DEFAULT_SHIPPING_OPTIONS: ShippingOption[] = [
  { id: 1, name: 'Pengiriman Standar', description: 'Estimasi tiba dalam 3-5 hari kerja.', cost: 15000, is_active: true, eta: '3-5 hari' },
  { id: 2, name: 'Pengiriman Express', description: 'Priority shipping, tiba dalam 1-2 hari.', cost: 30000, is_active: true, eta: '1-2 hari' },
]

export const DEFAULT_PAYMENT_METHODS: PaymentMethodConfig[] = [
  { id: 'full_payment', name: 'Lunas Sekarang', rate: 1.0, is_active: true, hint: 'Pembayaran penuh instan' },
  { id: 'dp_70', name: 'Angsuran DP 70%', rate: 0.7, is_active: true, hint: 'Cicil Sekarang, Lunas Kemudian' },
  { id: 'dp_50', name: 'Angsuran DP 50%', rate: 0.5, is_active: true, hint: 'Cicil Sekarang, Lunas Kemudian' },
  { id: 'cod', name: 'Bayar Di Tempat (COD)', rate: 0, is_active: true, hint: 'Bayar saat buket diterima' },
]

export const DEFAULT_BANK_ACCOUNTS: BankAccount[] = [
  { bank_name: 'BCA', account_number: '8831234567', account_holder: 'PT Happy Bouquet Indonesia', is_active: true },
  { bank_name: 'Mandiri', account_number: '1370012345678', account_holder: 'PT Happy Bouquet Indonesia', is_active: true },
  { bank_name: 'QRIS', account_number: 'QRIS All Payment', account_holder: 'HappyBouquet Atelier', is_active: true },
]

export const DEFAULT_TRUST_STATS: TrustStat[] = [
  { value: '500+', label: 'Pelanggan Puas', icon: 'ph:flowers-bold' },
  { value: '4.9★', label: 'Rating Rata-rata', icon: 'ph:star-fill' },
  { value: '2h', label: 'Estimasi Kirim', icon: 'ph:clock-fill' },
]

export const DEFAULT_TRUST_BADGES: TrustBadge[] = [
  { icon: 'ph:flower-bold', title: '100% Bunga Segar Pilihan', text: 'Dipilih & dirancang ulang tiap hari.' },
  { icon: 'ph:bolt-bold', title: 'Kirim Hari Ini (Same Day)', text: 'Order sebelum 14:00 WIB, garansi sampai hari ini.' },
  { icon: 'ph:envelope-bold', title: 'Gratis Kartu Ucapan', text: 'Kartu custom tanpa biaya tambahan.' },
  { icon: 'ph:shield-check-bold', title: 'Garansi 100% Ganti Baru', text: 'Bunga layu saat diterima? Kami ganti baru.' },
]

export const DEFAULT_TESTIMONIALS: TestimonialItem[] = [
  { text: 'Buket mawarnya luar biasa segar dan harum tahan sampai 6 hari di vas! Kartu wax seal-nya premium banget, istri saya sampai terharu.', name: 'Raka Aditya', location: 'Kebayoran Baru, Jakarta Selatan', initials: 'RA', tag: 'Anniversary ke-5' },
  { text: 'Pesan jam 10 pagi minta dikirim jam 13.00 ke Balairung UI, beneran sampai tepat waktu dengan bunga yang mekar sempurna. Kurir sangat sopan!', name: 'Siti Nurhaliza', location: 'Depok, Jawa Barat', initials: 'SN', tag: 'Wisuda Adik' },
  { text: 'Florist-nya ramah diajak konsultasi via WhatsApp. Warnanya disesuaikan sama dress wisuda pacar saya. Hasilnya artistik, bukan bunga pasaran.', name: 'Dedi Setiawan', location: 'Bandung Wetan, Bandung', initials: 'DS', tag: 'Custom Gift Box' },
]

export const DEFAULT_FAQS: FaqItem[] = [
  { q: 'Bagaimana cara merawat bunga agar tetap segar?', a: 'Potong batang miring 45 derajat setiap 2 hari, gunakan air bersih sejuk, dan hindari sinar matahari langsung atau hembusan AC secara konstan. Kami sertakan satu sachet nutrisi bunga gratis di setiap kemasan.' },
  { q: 'Apakah bisa meminta waktu pengiriman spesifik?', a: 'Bisa. Sampaikan slot waktu yang diinginkan saat pemesanan, atau hubungi Concierge WhatsApp kami untuk pengiriman di waktu menit-presisi pada event mendesak.' },
  { q: 'Bagaimana prosedur klaim garansi jika bunga layu saat diterima?', a: 'Kirimkan foto buket saat pertama tiba melalui WhatsApp dalam 3 jam setelah paket diterima. Tim kami akan merangkai buket pengganti dan mengirimkannya tanpa biaya.' },
  { q: 'Metode pembayaran apa saja yang didukung?', a: 'Kami menerima Transfer Bank (BCA, Mandiri), QRIS (GoPay, OVO, Dana, ShopeePay), serta COD (Bayar di Tempat) untuk area tertentu.' },
]

export const DEFAULT_BRAND_STORY: BrandStory = {
  title: 'Lebih dari Sekadar Buket Bunga.',
  subtitle: 'Seni di Balik Setiap Kelopak',
  story_p1: 'Didirikan pada tahun 2020 di jantung kota Jakarta, HappyBouquet lahir dari keinginan untuk mengubah cara kita merayakan momen penting. Kami percaya bahwa setiap bunga memiliki bahasa unik, dan tugas kami adalah merangkainya menjadi sebuah puisi visual yang tak terlupakan.',
  story_p2: 'Kami bekerja sama langsung dengan kebun bunga lokal dan internasional terbaik untuk memastikan hanya bunga peraih penghargaan yang sampai di depan pintu Anda.',
  years_experience: '4+'
}

export const DEFAULT_BRAND_VALUES: BrandValue[] = [
  { title: 'Kesegaran Mutlak', icon: 'ph:leaf-fill', desc: 'Hanya bunga segar dari kebun terbaik yang kami pilih untuk setiap pesanan Anda.' },
  { title: 'Desain Artisanal', icon: 'ph:paint-brush-broad-fill', desc: 'Rangkaian kami bukan hasil masal, melainkan kurasi seni dari para florist ahli.' },
  { title: 'Tepat di Hati', icon: 'ph:heart-fill', desc: 'Setiap pengiriman adalah misi untuk menyampaikan emosi dan senyuman.' },
]

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
  // Fallbacks Dynamic Content (JSON stringified)
  shipping_options: JSON.stringify(DEFAULT_SHIPPING_OPTIONS),
  payment_methods_config: JSON.stringify(DEFAULT_PAYMENT_METHODS),
  store_bank_accounts: JSON.stringify(DEFAULT_BANK_ACCOUNTS),
  home_trust_stats: JSON.stringify(DEFAULT_TRUST_STATS),
  home_trust_badges: JSON.stringify(DEFAULT_TRUST_BADGES),
  home_testimonials: JSON.stringify(DEFAULT_TESTIMONIALS),
  store_faqs: JSON.stringify(DEFAULT_FAQS),
  about_brand_story: JSON.stringify(DEFAULT_BRAND_STORY),
  about_values: JSON.stringify(DEFAULT_BRAND_VALUES),
}

export const formatWaDisplay = (n: string): string => {
  const m = n.match(/^(\d{2})(\d{3})(\d{3})(\d+)$/)
  return m ? `+${m[1]} ${m[2]}-${m[3]}-${m[4]}` : `+${n}`
}

function safeParse<T>(val: any, fallback: T): T {
  if (!val) return fallback
  if (typeof val === 'object') return val
  try {
    const parsed = JSON.parse(val)
    return parsed && typeof parsed === 'object' ? parsed : fallback
  } catch {
    return fallback
  }
}

export const useStoreSettings = () => {
  const config = useRuntimeConfig()

  const { data } = useAsyncData<StoreSettings>('store-settings', async () => {
    try {
      const res: any = await $fetch(`${config.public.apiUrl}/settings`)
      return { ...STORE_SETTINGS_FALLBACK, ...(res?.data || {}) }
    } catch {
      return { ...STORE_SETTINGS_FALLBACK }
    }
  })

  const settings = computed(() => data.value ?? STORE_SETTINGS_FALLBACK)

  const waHref = (text?: string) => {
    const base = `https://wa.me/${settings.value.whatsapp_number}`
    return text ? `${base}?text=${encodeURIComponent(text)}` : base
  }

  // Parsed Dynamic Data
  const shippingOptions = computed<ShippingOption[]>(() => {
    const list = safeParse<ShippingOption[]>(settings.value.shipping_options, DEFAULT_SHIPPING_OPTIONS)
    return Array.isArray(list) ? list.filter(s => s.is_active !== false) : DEFAULT_SHIPPING_OPTIONS
  })

  const paymentMethods = computed<PaymentMethodConfig[]>(() => {
    const list = safeParse<PaymentMethodConfig[]>(settings.value.payment_methods_config, DEFAULT_PAYMENT_METHODS)
    return Array.isArray(list) ? list.filter(p => p.is_active !== false) : DEFAULT_PAYMENT_METHODS
  })

  const bankAccounts = computed<BankAccount[]>(() => {
    const list = safeParse<BankAccount[]>(settings.value.store_bank_accounts, DEFAULT_BANK_ACCOUNTS)
    return Array.isArray(list) ? list.filter(b => b.is_active !== false) : DEFAULT_BANK_ACCOUNTS
  })

  const trustStats = computed<TrustStat[]>(() =>
    safeParse<TrustStat[]>(settings.value.home_trust_stats, DEFAULT_TRUST_STATS)
  )

  const trustBadges = computed<TrustBadge[]>(() =>
    safeParse<TrustBadge[]>(settings.value.home_trust_badges, DEFAULT_TRUST_BADGES)
  )

  const testimonials = computed<TestimonialItem[]>(() =>
    safeParse<TestimonialItem[]>(settings.value.home_testimonials, DEFAULT_TESTIMONIALS)
  )

  const faqs = computed<FaqItem[]>(() =>
    safeParse<FaqItem[]>(settings.value.store_faqs, DEFAULT_FAQS)
  )

  const brandStory = computed<BrandStory>(() =>
    safeParse<BrandStory>(settings.value.about_brand_story, DEFAULT_BRAND_STORY)
  )

  const brandValues = computed<BrandValue[]>(() =>
    safeParse<BrandValue[]>(settings.value.about_values, DEFAULT_BRAND_VALUES)
  )

  return {
    settings,
    waHref,
    shippingOptions,
    paymentMethods,
    bankAccounts,
    trustStats,
    trustBadges,
    testimonials,
    faqs,
    brandStory,
    brandValues,
  }
}
