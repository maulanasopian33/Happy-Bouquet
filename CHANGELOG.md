# HappyBouquet - CHANGELOG

Format: [Keep a Changelog](https://keepachangelog.com/). Rujuk ID: `docs/06-maintenance/register.md`.

## [Unreleased] - 0.3.0

### Added
- CR-0006: Dynamic SEO Suite, Structured Data JSON-LD, Dynamic Sitemap, Robots.txt & LLM AI Engine — Pengelolaan SEO toko kini dinamis dari Panel Admin (`StoreSettingView.vue`) dengan tab SEO lengkap (Meta Title, Description dengan live character counter, Keywords, Canonical URL, Social Share OG Image, Verifikasi Google Search Console & Bing, serta simulator pratinjau live Google SERP & WhatsApp bubble chat). Backend API `StoreSetting` diperluas dengan allowlist dan validasi Zod untuk 9 key SEO baru. Frontend Storefront mengintegrasikan composable `useSeo()` yang secara otomatis menyuntikkan meta tags, canonical link, Open Graph, Twitter Cards, dan 4 tipe Schema.org JSON-LD (LocalBusiness/Florist, Product dengan offers & aggregateRating, BreadcrumbList, dan FAQPage). Nitro Server Routes dinamis ditambahkan: `server/routes/robots.txt.ts` (lengkap dengan arahan AI bot GPTBot, PerplexityBot, ClaudeBot), `server/routes/sitemap.xml.ts` (XML sitemap dinamis real-time dari database produk), serta `server/routes/llms.txt.ts` & `llms-full.txt.ts` (standar llmstxt.org untuk mesin pencari berbasis AI).
- CR-0005: Full-Funnel Web Analytics, Traffic Acquisition & Performance Suite (Rencana Implementasi) — Restrukturisasi modul analitik ke grup `Analitik Web` di Panel Admin, menyusun rencana komprehensif 4 halaman analisis: Realtime & Bot Intel (selesai), Trafik & Akuisisi (T14), Konversi & Funnel (T15), serta Kecepatan & Core Web Vitals (T16).
- CR-0004: Multi-Channel Order Ingestion, Real-Time Tracking, & Storefront Sync (T10-T13 selesai penuh) — Checkout FE otomatis mencatat pesanan ke API `POST /api/orders/public` (`channel: 'Web'`) dan menyisipkan nomor pesanan resmi (`HB-...`) ke pesan WhatsApp dan link pelacakan; Halaman `/tracking` terhubung ke API riil `GET /api/orders/track/:orderNumber` dengan stepper dinamis & fallback bantuan WhatsApp; Backend otomatis mem-broadcast notifikasi realtime SSE (`notification`) ke Panel Admin saat pesanan publik masuk, serta menggabungkan data `PublicOrders` di `GET /api/orders`; Panel Admin `OrderListView.vue` kini memiliki filter multi-channel (`Web`, `WhatsApp`, `Shopee`, `TikTok`, `Direct`, `Reseller`) dan badge channel visual per pesanan.
- BUG-0034: Data toko terpusat — composable `composables/useStoreSettings.ts` (fallback `STORE_SETTINGS_FALLBACK`, siap menimpa dari `GET /api/settings` begitu backend menyediakan) + `composables/useAnalytics.ts` (`trackChannelOutbound` -> `POST /analytics/collect`). Terintegrasi di FooterMain, contact, faq, privacy, maintenance, links, tracking, index (topbar promo kini dari `GET /promos?active=true`), products index, checkout. Sweep `<img>` -> `NuxtImg` + fallback `/default.png` di sisa file (about, shipping, links, heroSection, account, HeaderMain, FooterMain) — 0 `<img>` tersisa.
- BUG-0035: Redesign PDP `components/product/ProductDetailPage.vue` mengikuti `design/home/code.html` — split 6/6 gallery (aspect 4/5, `ProductGallery`) + guarantee pill, kolom kanan (badge tipe/SKU/judul/price card/qty+CTA), tabs Deskripsi/Spesifikasi/Ulasan (spesifikasi dari data API), "Beli Sekarang" kini add-to-cart + redirect `/checkout`.
- BUG-0036: Order multi-channel — FE checkout kirim `channel: 'Web'` ke `POST /orders/public`; backend `api-happyBouquet` (Zod enum `Web|WhatsApp|Shopee|TikTok`, simpan `data.channel`); strip channel di PDP (WhatsApp + Shopee/TikTok dari `product.orderChannels` bila `store_url` terisi) dengan `trackChannelOutbound` per klik; `mapProduct` bawa `orderChannels`/`type`/`preorder_duration`. Backend: `GET/PUT /api/settings` kini tersedia (RISK-0001 selesai, commit api `3d06767`) + alias mount `/api/analytics` — FE memakai data live, bukan fallback.

### Fixed
- BUG-0038: Breadcrumb PDP `pages/products/[slug].vue` kini mengikuti `design/home/code.html` — bar penuh `bg-(--bg-section)` dengan jejak Beranda / Koleksi Produk / kategori (`/products?cat=`) / nama produk + pill status (dot ping, Ready Stock/Preorder dari data API). Sekaligus: fetch produk hanya di halaman (`useProductDetail` di `[slug].vue`), `ProductDetailPage` menerima props `product/related/loading/error` — sebelumnya page & komponen sama-sama memanggil composable sehingga `useAsyncData` dieksekusi 2× per render (dedupe `'cancel'` membatalkan fetch pertama).
- BUG-0037: PDP 500 + `[nuxt] instance unavailable` di `/products/*` — `useProductDetail` (async) memanggil `useAsyncData` SETELAH `await` sehingga kehilangan Nuxt instance, dan `useHead` dipanggil di dalam callback `watch`. Direstrukturisasi: satu `useAsyncData` dipanggil sync dari setup (fetch produk + daftar produk aktif via `Promise.all` di dalam handler), `useHead({ title: computed(...) })` langsung di setup, `ProductDetailPage` tidak lagi `await`, slug tak ada → `createError({ statusCode: 404 })` (render 200 + state "Produk Tidak Ditemukan", bukan 500). Terbukti: `/products/sadas` 200, slug tak ada 200, `npm test` 17/17.
- BUG-0033: URL gambar produk 404 di produksi (`https://happybouquet.web.id/.happybouquet.web.id/apipublic/uploads/...`) — `apiUrl.replace('/api','')` memotong kemunculan pertama `/api` di `https://api.happybouquet.web.id/api` menjadi `https:/...`, lalu `photo_url` relatif tanpa slash (`public/uploads/...`) menempel jadi `apipublic`. Kini helper `resolveImageUrl` (`composables/useProducts.ts`) memakai `new URL(apiUrl).origin` + path bersih, dipakai di `mapProduct`, `pages/products/index.vue`, `pages/category/[id].vue`.
- BUG-0032: Scoped dynamic key `product-detail-${id}` pada `useAsyncData` di `composables/useProductDetail.ts` untuk mencegah cache collision antar produk berbeda saat SSR / navigasi.
- BUG-0031: Hapus route dummy `pages/admin/index.vue` dari storefront dan alihkan permanen (301 redirect) `/admin` -> `/` di `routeRules`.
- BUG-0030: Reverse Tabnabbing fix — menambahkan `rel="noopener noreferrer"` pada semua tautan eksternal `target="_blank"` (`FooterMain.vue`, `ProductTrustPromise.vue`, `contact.vue`, `links.vue`, `maintenance.vue`, `index.vue`).
- BUG-0029: Keamanan Cookie Maintenance — cookie `maintenance_bypass` kini menyimpan signature HMAC SHA-256 token turunan (`httpOnly`, `sameSite: lax`, `secure: prod`), tidak lagi membocorkan secret mentah (`NUXT_MAINTENANCE_SECRET`) ke client browser.
- BUG-0028: Tambah HTTP Security Headers global di `routeRules` `nuxt.config.ts` (`X-Frame-Options: SAMEORIGIN` anti-clickjacking, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy`).
- BUG-0027: Runtime "Cannot read properties of null (reading 'src')" — semua handler `onImgError` (10 file) kini null-guard (`e.target` bisa null saat elemen dilepas/transisi).
- BUG-0026: Image produk di seluruh situs kini `NuxtImg` + fallback `/default.png` — ProductCard, ProductGrid (list), ProductGallery, ProductVariantsVisual, ProductVariantModal, CartModal, ringkasan checkout (lanjutan BUG-0025).
- BUG-0025: Semua image di home pindah ke `NuxtImg` (`@nuxt/image`, provider ipx — optimasi otomatis) — flash sale, kategori, hero banner, ProductCardNoir; setiap gambar punya fallback `/default.png` saat gagal load (`@error`, anti-loop).
- BUG-0024: Footer disamakan persis palet mockup — teks utama `#e5e1e4`, border `#4a4538`, surface `#1f1f21`, sekunder `#ccc6bb` (sebelumnya memakai champagne hangat). Header: tombol keranjang disembunyikan di mobile (sudah ada CTA di bottom bar) — hilangkan dobel.
- BUG-0023: Fitur dark/light mode dihapus (satu desain saja, ikut noir-gold terbaru) — tombol toggle di header, `composables/useTheme.ts`, token `.dark` di `main.css`.
- BUG-0022: Footer kini pakai class `noir-shell` — font Plus Jakarta + helper noir (Playfair untuk heading kolom, btn) aktif; spacing footer disamakan mockup (`py-18`, `gap-12`). Fallback gambar produk pindah dari URL Unsplash ke `/default.png` + handler `@error` (anti-loop) di mapper, katalog, kategori, ProductCard, ProductCardNoir, dan kartu flash sale home.
- BUG-0021: Audit home/header/footer — helper noir (btn-gold, btn-noir, noir-display, label-crest) kini aktif juga di `.noir-shell` (header/footer); footer: link `/custom-order` -> `/contact`, param `?kategori=` -> `?cat=`, bottom bar beri ruang untuk bottom bar mobile; FAQ caret berputar (class `group`); progress bar flash sale punya aria-label; body scroll-lock saat drawer mobile; tap target icon header 40px; kontras counter hero; topbar 14px; font Playfair+Outfit self-host (hapus CDN import); mapping produk home pakai `mapProduct` (hapus duplikasi). Kebutuhan API home didokumentasikan di `docs/home-api-requirements.md`.

### Changed
- CR-0002: Shell noir — header (logo, nav, search, drawer mobile), TickerBanner, MobileBottomBar, FooterMain ikut tema `.noir-shell` (token noir di `:root`); meta theme-color `#E11D48` -> `#D4AF37`. Modal cart/variant & isi halaman lain masih rose/terang (menyusul).
- CR-0001: Home (`/`) redesign "Aura Botanica Noir" — tema noir-gold (design/home/): topbar promo, hero slider gelap 380px, value props, flash sale 3 kartu + countdown, kategori berfoto (foto produk per kategori), bestseller grid + chip filter lokal (`ProductCardNoir`), banner custom order, metrics + testimoni statis, FAQ accordion baru. Font Plus Jakarta Sans via `@nuxtjs/google-fonts`. Harga coret TIDAK dikembalikan.
- Dihapus (tak terpakai setelah redesign): `QuickCategories.vue`, `FlashSaleSmall.vue`, `ProductCarousel.vue`, `TestimonialSlider.vue`.

## [Unreleased] - 0.2.0 (T1)

### Fixed
- BUG-0018: Wishlist (localStorage) dibungkus `ClientOnly` — grid+empty state halaman wishlist & tombol heart ProductCard; hilangkan hydration mismatch.
- BUG-0001: Checkout mengirim pesanan via WhatsApp (sebelumnya hanya console.log). Tombol "Bayar Sekarang" -> "Pesan via WhatsApp".
- BUG-0002: Harga coret palsu (mock 1.2x/1.3x) dihapus dari home, katalog, dan mapper produk.
- BUG-0003: Keranjang sekarang awet di localStorage (`happybouquet-cart`), selamat saat refresh.
- BUG-0004: Rating/reviewCount produk determinis — hilangkan hydration mismatch SSR.
- BUG-0006: GA4 tidak lagi dalam `debug_mode` di produksi.

### Changed
- BUG-0005: Build rilis tidak lagi mengaktifkan maintenance mode (publik). Maintenance hanya aktif jika build dengan `NUXT_MAINTENANCE_ENABLED=true` + `NUXT_MAINTENANCE_SECRET` di-set.
- BUG-0017: Bypass maintenance via header `x-maintenance-secret` (sebelumnya `?dev_mode=` di URL, secret bocor di log). Secret default 'happy-dev' dihapus.
- BUG-0007: Data contoh di halaman akun diganti placeholder generik.
- BUG-0020: Badge "DEV MODE" hanya tampil di `nuxt dev`.
- BUG-0014: Deploy (lokal, lokal-server, GitHub) hanya mengirim `.output` + `package.json` — tanpa `npm ci` dan tanpa root `node_modules` (~100MB lebih ringan). `deploy-local-cache.sh`: npm ci lokal + kirim `node_modules` ke server hanya bila package.json/lock berubah atau server belum punya (hash di `node_modules/.package-json-hash`).

### Performance
- BUG-0008: Detail produk (`/products/[slug]`) kini SSR penuh lewat `useAsyncData` — HTML berisi produk, fetch tidak dobel, SEO judul produk terisi.
- BUG-0009: Home hanya menyertakan 12 produk di payload.
- BUG-0010: Produk terkait memakai cache SWR 15 menit, bukan fetch katalog tiap halaman.
- BUG-0011: Cache halaman tetap di Redis Upstash (keputusan user 2026-10-19; trade-off latensi diterima demi persistensi lintas restart).
- BUG-0012: Koleksi ikon `ph` (4.5MB) tidak lagi di-bundle ke RAM server (`serverBundle: 'remote'`). Total build 8.48MB -> 3.78MB.
- BUG-0013: Swiper dimuat sekali dari komponen; plugin global dihapus. Entry JS client 302KB -> 209KB.
- BUG-0019: Hero image ada `width`/`height` + lazy untuk slide selain pertama; stok flash sale determinis.

### Added
- BUG-0016: Test unit pertama (vitest, `npm test`): `utils/payment.ts` (`computePaymentSummary` — dipakai checkout) 6 test + cart store 6 test; 12/12 lulus.

### Removed
- BUG-0015: File mati: `pages/counter.vue`, `stores/counter.ts`, `CartSidebar.vue`, `FlashSale.vue`, `QuickViewModal.vue`, `composables/Analytics.ts`. Dependensi: `consola`, `unstorage`, `@iconify/utils`. Dipertahankan (keputusan user): `@nuxtjs/google-gtag` (analytics menyusul), `@upstash/redis` (driver cache).
