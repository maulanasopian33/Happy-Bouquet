# HappyBouquet - Register Perubahan dan Bug

Baca hanya bagian "Terbuka" saat memulai sesi. Pindahkan baris selesai ke "Selesai" (satu baris). Perubahan besar: buat `CR-xxxx.md` di folder ini (konteks, perubahan spec, dampak, task) dan rujuk di sini.

Sumber: audit menyeluruh 2026-10-19 (sesi opencode). Detail analisis: `docs/04-delivery/roadmap.md`.

## Terbuka
| ID | Jenis | Tanggal | Ringkasan | ID terdampak | Dokumen diubah | Status |
|---|---|---|---|---|---|---|
| BUG-0008 | Bug | 2026-10-19 | Detail produk di-fetch 2x (SSR hasil dibuang + client); [slug] tidak pakai useAsyncData -> SEO kosong (useProductDetail.ts:47) | FR produk | - | Selesai |
| BUG-0009 | NFR | 2026-10-19 | useFetch embed SEMUA data API ke payload HTML; home kini slice 12 produk (index.vue) | NFR performa | - | Selesai |
| BUG-0010 | Bug | 2026-10-19 | Related fetch semua katalog; kini dari cache useAsyncData SWR 15 mnt 'products-active-all' | NFR performa | - | Selesai |
| BUG-0011 | NFR | 2026-10-19 | Cache SWR via Upstash REST; keputusan user: TETAP pakai Upstash (trade-off latensi diterima, cache awet lintas restart). Env wajib ada di server | NFR infra | - | Selesai (by design) |
| BUG-0012 | NFR | 2026-10-19 | Bundle ikon 4.5MB; `icon.serverBundle: 'remote'` -> chunk icons.mjs hilang, total build 8.48MB -> 3.78MB | NFR infra | - | Selesai |
| BUG-0013 | NFR | 2026-10-19 | Swiper dobel; plugin global dihapus, komponen import sendiri; entry client 302KB -> 209KB | NFR performa | - | Selesai |
| BUG-0014 | NFR | 2026-10-19 | Deploy kirim root node_modules; kini semua jalur deploy hanya .output + package.json. deploy-local-cache.sh dipertahankan sebagai alias utama (user) | NFR deploy | - | Selesai |
| BUG-0015 | Lean | 2026-10-19 | Dihapus: counter.vue, counter.ts, CartSidebar, FlashSale, QuickViewModal, Analytics.ts, deploy-local-cache.sh; deps: consola, unstorage, @iconify/utils. DIPERTAHANKAN (keputusan user): @nuxtjs/google-gtag (analytics nanti), @upstash/redis (driver cache), deploy-local-cache.sh (script utama user, kini alias) | - | - | Selesai |
| BUG-0016 | Test | 2026-10-19 | Nol test → kini ada test unit vitest (`npm test`): payment summary DP (6) + cart reducer (6), 12/12 lulus; logika DP dipindah ke `utils/payment.ts` | NFR kualitas | - | Selesai |
| BUG-0017 | Bug | 2026-10-19 | Middleware maintenance: secret default 'happy-dev', bypass ?dev_mode=secret (bocor di log), path.includes('.') bypass sembarang (maintenance.ts:9,20,27) | NFR security | - | Selesai |
| BUG-0018 | Bug | 2026-10-19 | Wishlist localStorage → dibungkus `ClientOnly` (grid+empty state wishlist, tombol heart ProductCard) | NFR performa | - | Selesai |
| BUG-0019 | NFR | 2026-10-19 | Hero image 1600px eager tanpa width/height -> kini width/height + lazy non-slide-pertama; FlashSaleSmall stok determinis | NFR performa | - | Selesai |
| CR-0002 | Fitur | 2026-10-19 | Shell noir: header, TickerBanner, MobileBottomBar, FooterMain ikut tema `.noir-shell`; meta theme-color -> gold. Modal cart/variant & isi halaman lain tetap terang (menyusul) | roadmap T7 | roadmap, STATE | Selesai |
| BUG-0021 | Bug | 2026-10-19 | Audit home/header/footer: helper noir tak aktif di `.noir-shell`; footer link 404 `/custom-order` & param `?kategori=` (products baca `cat`); FAQ caret tanpa class `group`; bottom bar tutup copyright footer; drawer tanpa scroll-lock; tap target 36px; kontras counter hero /60; topbar text-xs; Playfair/Outfit CDN -> self-host google-fonts; mapping produk duplikat -> mapProduct. Kebutuhan API home: `docs/home-api-requirements.md` | roadmap T8 | roadmap, STATE, docs/home-api-requirements.md | Selesai |
| BUG-0022 | Bug | 2026-10-19 | Footer tanpa class `noir-shell` (font + helper noir-display/btn tidak aktif, spacing beda dari mockup); fallback gambar produk unsplash -> `/default.png` + `@error` handler (mapProduct, products/index, category/[id], ProductCard, ProductCardNoir, flash sale home) | FR produk, CR-0002 | CHANGELOG, STATE | Selesai |
| BUG-0023 | Lean | 2026-10-19 | Fitur dark/light mode dihapus (keputusan user: satu desain / noir saja): tombol toggle header, `composables/useTheme.ts`, token `.dark` di main.css | CR-0002 | CHANGELOG, STATE | Selesai |
| BUG-0024 | Bug | 2026-10-19 | Footer salah palet (champagne hangat; mockup pakai on-surface #e5e1e4, outline #4a4538, surface-container #1f1f21, secondary #ccc6bb); header tampil 2 tombol keranjang di mobile (header + MobileBottomBar) -> header cart `hidden! md:inline-flex!` | CR-0002 | CHANGELOG, STATE | Selesai |
| BUG-0025 | NFR | 2026-10-19 | Image home pindah ke `NuxtImg` (@nuxt/image, provider ipx): flash sale, kategori, hero banner, ProductCardNoir; semua punya `@error` fallback `/default.png` | NFR performa | roadmap, CHANGELOG, STATE | Selesai |
| BUG-0026 | NFR | 2026-10-19 | Lanjutan BUG-0025: image produk di luar home -> `NuxtImg` + `@error` `/default.png`: ProductCard, ProductGrid (list), ProductGallery (utama+thumb), ProductVariantsVisual, ProductVariantModal, CartModal, checkout summary | NFR performa | CHANGELOG, STATE | Selesai |
| BUG-0027 | Bug | 2026-10-19 | Runtime "Cannot read properties of null (reading 'src')" — handler `onImgError` tidak null-guard (`e.target` bisa null saat elemen sudah dilepas/transisi). Semua 10 handler kini `t?.src && ...` | BUG-0025/0026 | CHANGELOG, STATE | Selesai |

## Selesai
| ID | Tanggal | Ringkasan | Versi | Commit/PR |
|---|---|---|---|---|
| CR-0001 | 2026-10-19 | Home redesign noir-gold (9 section sesuai design/home/): font Playfair+Plus Jakarta (@nuxtjs/google-fonts), token `.noir-home` scoped, ProductCardNoir baru, FAQ baru; 4 komponen lama dihapus. Build+test lulus (L1) | 0.3.0 | - |
| BUG-0001 | 2026-10-19 | placeOrder kirim ringkasan pesanan ke WhatsApp (wa.me), tombol "Pesan via WhatsApp" | 0.2.0 | - |
| BUG-0002 | 2026-10-19 | Mock originalPrice (*1.2/*1.3) dihapus; harga coret hanya jika API menyediakan | 0.2.0 | - |
| BUG-0003 | 2026-10-19 | Cart store -> useLocalStorage('happybouquet-cart'); badge sudah ClientOnly | 0.2.0 | - |
| BUG-0004 | 2026-10-19 | Rating/reviewCount determinis (4.5/0) di useProducts + products/index | 0.2.0 | - |
| BUG-0006 | 2026-10-19 | debug_mode:true dihapus dari gtag config | 0.2.0 | - |
| BUG-0005 | 2026-10-19 | NUXT_MAINTENANCE_ENABLED=true dibuang dari 3 script deploy + workflow + .env lokal; rilis publik tanpa maintenance | 0.2.0 | - |
| BUG-0007 | 2026-10-19 | Data pribadi di user store diganti placeholder generik ([ISI: ...]) | 0.2.0 | - |
| BUG-0017 | 2026-10-19 | Secret default dihapus ('' + error log jika kosong); bypass via header x-maintenance-secret (bukan query); cek ekstensi file regex | 0.2.0 | - |
| BUG-0020 | 2026-10-19 | TestingBadge hanya render saat import.meta.dev | 0.2.0 | - |
| BUG-0028 | 2026-10-30 | Security Headers global di nuxt.config.ts (X-Frame-Options SAMEORIGIN, nosniff, Referrer-Policy, Permissions-Policy) | 0.3.0 | - |
| BUG-0029 | 2026-10-30 | Maintenance bypass cookie kini pakai HMAC SHA256 token (tidak lagi bocorkan raw secret ke cookie client) | 0.3.0 | - |
| BUG-0030 | 2026-10-30 | Reverse Tabnabbing fix: tambah rel="noopener noreferrer" pada semua link target="_blank" | 0.3.0 | - |
| BUG-0031 | 2026-10-30 | Hapus dummy route pages/admin/index.vue + 301 redirect /admin -> / di routeRules | 0.3.0 | - |
| BUG-0032 | 2026-10-30 | Dynamic cache key pada useAsyncData detail produk (`product-detail-${id}`) untuk mencegah cache collision | 0.3.0 | - |
