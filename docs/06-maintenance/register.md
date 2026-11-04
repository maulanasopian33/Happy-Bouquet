# HappyBouquet - Register Perubahan dan Bug

Baca hanya bagian "Terbuka" saat memulai sesi. Pindahkan baris selesai ke "Selesai" (satu baris). Perubahan besar: buat `CR-xxxx.md` di folder ini (konteks, perubahan spec, dampak, task) dan rujuk di sini.

Sumber: audit menyeluruh 2026-10-19 & 2026-10-30. Detail analisis: `docs/04-delivery/roadmap.md`.

## Terbuka
*Tidak ada isu terbuka saat ini.*

## Selesai
| ID | Tanggal | Ringkasan | Versi | Commit/PR |
|---|---|---|---|---|
| CR-0005 | 2026-11-05 | Full-Funnel Web Analytics Suite (T14-T16 selesai penuh): backend API controller & routes (`/api/analytics/traffic`, `/conversion`, `/performance`), Panel Admin views & router lengkap (`/admin/analytics/traffic`, `/conversion`, `/performance`) dengan visual funnel 5 tahap, tren harian, akuisisi UTM, matriks konversi produk, dan Google Core Web Vitals | 0.3.0 | — |
| CR-0006 | 2026-11-05 | Dynamic SEO Suite, Structured Data JSON-LD, Dynamic Sitemap, Robots.txt & LLM AI Engine: backend StoreSetting & Zod diperluas, panel StoreSettingView dengan tab SEO & live SERP/WhatsApp simulator, FE composable useSeo() terintegrasi di app.vue/home/katalog/PDP, nitro server routes robots.txt, sitemap.xml, llms.txt & llms-full.txt. Test 17/17 lulus | 0.3.0 | — |
| CR-0004 | 2026-11-04 | Multi-Channel Order Ingestion, Real-Time Order Tracking & Storefront Sync (T10-T13 selesai penuh): FE checkout auto-record `POST /api/orders/public` (`channel:'Web'`) + WA template nomor order; tracking riil `GET /api/orders/track/:orderNumber` (sanitized); Panel Admin SSE realtime toast pesanan baru + filter channel pesanan di `OrderListView.vue` | 0.3.0 | — |
| BUG-0038 | 2026-11-03 | Breadcrumb PDP `pages/products/[slug].vue` belum ikut `design/home/code.html` — kini full-width bar `bg-(--bg-section)`: jejak 4 level (Beranda / Koleksi Produk / kategori → `?cat=` / nama produk) + pill status (dot ping + Ready Stock/Preorder, data API tanpa mengarang angka stok). Fetch dipindah jadi kepemilikan halaman saja — `ProductDetailPage` terima props (`product/related/loading/error`); sebelumnya page & komponen sama-sama memanggil `useProductDetail` → `useAsyncData` jalan 2× per render (dedupe 'cancel' = fetch pertama dibatalkan). Terbukti: `sadas` 200 + nama di breadcrumb, slug tak ada 200, 1× fetch, test 17/17 | 0.3.0 | — |
| BUG-0037 | 2026-11-02 | PDP 500 + `[nuxt] instance unavailable` di `/products/*` — `useProductDetail` async memanggil `useAsyncData` SETELAH `await` (kehilangan Nuxt instance) + `useHead` di dalam `watch`; direstrukturisasi jadi satu `useAsyncData` sync (`Promise.all` produk + related), `useHead(computed)` langsung di setup, slug tak ada → 404 lempar `createError` (render 200 + state error). Terbukti: `/products/sadas` 200, slug tak ada 200, test 17/17 | 0.3.0 | — |
| RISK-0001 | 2026-11-02 | Endpoint `GET/PUT /api/settings` **sudah dibangun di backend** (tabel `StoreSettings`, allowlist 9 key kontrak `useStoreSettings.ts`, GET publik + PUT admin, commit api `3d06767`) + alias mount `/api/analytics` — FE kini memakai data live, bukan fallback | 0.3.0 | api `3d06767` |
| BUG-0034 | 2026-11-02 | Sweep `<img>` -> `NuxtImg` + fallback `/default.png` (about, shipping, links, heroSection, account, HeaderMain, FooterMain; 0 `<img>` tersisa). Data toko terpusat: composable `useStoreSettings` (fallback, siap `GET /settings`) + `useAnalytics.trackChannelOutbound`; terintegrasi di Footer, contact, faq, privacy, maintenance, links, tracking, index (topbar promo dinamis), products index, checkout | 0.3.0 | - |
| BUG-0035 | 2026-11-02 | Redesign PDP `ProductDetailPage.vue` mengikuti `design/home/code.html`: split 6/6 gallery (aspect 4/5) + guarantee pill, kolom kanan (badges/SKU/title/price card/qty+CTA), channel strip WA+marketplace dari `orderChannels`, tabs Deskripsi/Spesifikasi/Ulasan (specs dari data API); "Beli Sekarang" kini add-to-cart + redirect `/checkout` | 0.3.0 | - |
| BUG-0036 | 2026-11-02 | Order multi-channel: FE checkout kirim `channel:'Web'` ke `POST /orders/public`; backend (`api-happyBouquet/publicOrderController.js`) Zod enum `Web\|WhatsApp\|Shopee\|TikTok` + simpan `data.channel`; klik tombol channel PDP tercatat via `POST /analytics/collect` (`channel_outbound`). `mapProduct` bawa `orderChannels`, `type`, `preorder_duration` | 0.3.0 | - |
| CR-0001 | 2026-10-19 | Home redesign noir-gold (9 section sesuai design/home/): font Playfair+Plus Jakarta (@nuxtjs/google-fonts), token `.noir-home` scoped, ProductCardNoir baru, FAQ baru; 4 komponen lama dihapus. Build+test lulus (L1) | 0.3.0 | - |
| CR-0002 | 2026-10-19 | Shell noir: header, TickerBanner, MobileBottomBar, FooterMain ikut tema `.noir-shell`; meta theme-color -> gold. Modal cart/variant & isi halaman lain tetap terang (menyusul) | 0.3.0 | - |
| BUG-0001 | 2026-10-19 | placeOrder kirim ringkasan pesanan ke WhatsApp (wa.me), tombol "Pesan via WhatsApp" | 0.2.0 | - |
| BUG-0002 | 2026-10-19 | Mock originalPrice (*1.2/*1.3) dihapus; harga coret hanya jika API menyediakan | 0.2.0 | - |
| BUG-0003 | 2026-10-19 | Cart store -> useLocalStorage('happybouquet-cart'); badge sudah ClientOnly | 0.2.0 | - |
| BUG-0004 | 2026-10-19 | Rating/reviewCount determinis (4.5/0) di useProducts + products/index | 0.2.0 | - |
| BUG-0005 | 2026-10-19 | NUXT_MAINTENANCE_ENABLED=true dibuang dari 3 script deploy + workflow + .env lokal; rilis publik tanpa maintenance | 0.2.0 | - |
| BUG-0006 | 2026-10-19 | debug_mode:true dihapus dari gtag config | 0.2.0 | - |
| BUG-0007 | 2026-10-19 | Data pribadi di user store diganti placeholder generik ([ISI: ...]) | 0.2.0 | - |
| BUG-0008 | 2026-10-19 | Detail produk di-fetch 2x (SSR hasil dibuang + client); [slug] pakai useAsyncData -> SEO aman | 0.3.0 | - |
| BUG-0009 | 2026-10-19 | useFetch embed SEMUA data API ke payload HTML; home kini slice 12 produk (index.vue) | 0.3.0 | - |
| BUG-0010 | 2026-10-19 | Related fetch semua katalog; kini dari cache useAsyncData SWR 15 mnt 'products-active-all' | 0.3.0 | - |
| BUG-0011 | 2026-10-19 | Cache SWR via Upstash REST; keputusan user: TETAP pakai Upstash | 0.3.0 | - |
| BUG-0012 | 2026-10-19 | Bundle ikon 4.5MB; `icon.serverBundle: 'remote'` -> chunk icons.mjs hilang | 0.3.0 | - |
| BUG-0013 | 2026-10-19 | Swiper dobel; plugin global dihapus, komponen import sendiri | 0.3.0 | - |
| BUG-0014 | 2026-10-19 | Deploy kirim root node_modules; kini semua jalur deploy hanya .output + package.json | 0.3.0 | - |
| BUG-0015 | 2026-10-19 | Dihapus: file mati & unused deps; lean bundle | 0.3.0 | - |
| BUG-0016 | 2026-10-19 | Nol test -> vitest payment summary DP + cart reducer (12/12 lulus) | 0.3.0 | - |
| BUG-0017 | 2026-10-19 | Secret default dihapus ('' + error log jika kosong); bypass via header x-maintenance-secret | 0.3.0 | - |
| BUG-0018 | 2026-10-19 | Wishlist localStorage dibungkus `ClientOnly` (anti hydration mismatch) | 0.3.0 | - |
| BUG-0019 | 2026-10-19 | Hero image width/height + lazy non-slide-pertama; FlashSaleSmall stok determinis | 0.3.0 | - |
| BUG-0020 | 2026-10-19 | TestingBadge hanya render saat import.meta.dev | 0.3.0 | - |
| BUG-0021 | 2026-10-19 | Audit home/header/footer: helper noir, Playfair/Outfit google-fonts, mapping produk mapProduct | 0.3.0 | - |
| BUG-0022 | 2026-10-19 | Footer noir-shell, fallback gambar produk /default.png + @error handler | 0.3.0 | - |
| BUG-0023 | 2026-10-19 | Dark/light mode dihapus (satu desain noir saja) | 0.3.0 | - |
| BUG-0024 | 2026-10-19 | Footer palet disesuaikan mockup, header cart disembunyikan di mobile | 0.3.0 | - |
| BUG-0025 | 2026-10-19 | NuxtImg (@nuxt/image, ipx) untuk flash sale, kategori, hero banner, ProductCardNoir | 0.3.0 | - |
| BUG-0026 | 2026-10-19 | NuxtImg + @error fallback di ProductCard, ProductGrid, ProductGallery, CartModal | 0.3.0 | - |
| BUG-0027 | 2026-10-19 | Null-guard onImgError handler (t?.src) cegah uncaught exception saat transisi | 0.3.0 | - |
| BUG-0028 | 2026-10-30 | Security Headers global di nuxt.config.ts (X-Frame-Options SAMEORIGIN, nosniff, Referrer-Policy, Permissions-Policy) | 0.3.0 | - |
| BUG-0029 | 2026-10-30 | Maintenance bypass cookie kini pakai HMAC SHA256 token (tidak lagi bocorkan raw secret ke cookie client) | 0.3.0 | - |
| BUG-0030 | 2026-10-30 | Reverse Tabnabbing fix: pasang `rel="noopener noreferrer"` pada semua tautan eksternal `target="_blank"` (FooterMain, ProductTrustPromise, contact, links, maintenance, index) | 0.3.0 | - |
| BUG-0031 | 2026-10-30 | Hapus dummy route pages/admin/index.vue + 301 redirect /admin -> / di routeRules | 0.3.0 | - |
| BUG-0032 | 2026-10-30 | Dynamic cache key pada useAsyncData detail produk (`product-detail-${id}`) untuk mencegah cache collision | 0.3.0 | - |
| BUG-0033 | 2026-11-02 | URL gambar produk 404 (`https://happybouquet.web.id/.happybouquet.web.id/apipublic/...`): `apiUrl.replace('/api','')` memotong `https://api.` + `photo_url` relatif tanpa slash. Helper `resolveImageUrl` (useProducts) dipakai di mapProduct, products/index, category/[id]; test baru `test/image-url.test.ts`. Build+test lulus (L2) | 0.3.0 | - |
