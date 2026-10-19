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
| BUG-0017 | Bug | 2026-10-19 | Middleware maintenance: secret default 'happy-dev', bypass ?dev_mode=secret (bocor di log), path.includes('.') bypass sembarang (maintenance.ts:9,20,27) | NFR security | - | Open |
| BUG-0018 | Bug | 2026-10-19 | Wishlist localStorage → dibungkus `ClientOnly` (grid+empty state wishlist, tombol heart ProductCard) | NFR performa | - | Selesai |
| BUG-0019 | NFR | 2026-10-19 | Hero image 1600px eager tanpa width/height -> kini width/height + lazy non-slide-pertama; FlashSaleSmall stok determinis | NFR performa | - | Selesai |
| BUG-0020 | Bug | 2026-10-19 | Badge "DEV MODE" tampil di produksi saat maintenance bypass (app.vue:20) | - | - | Open |

## Selesai
| ID | Tanggal | Ringkasan | Versi | Commit/PR |
|---|---|---|---|---|
| BUG-0001 | 2026-10-19 | placeOrder kirim ringkasan pesanan ke WhatsApp (wa.me), tombol "Pesan via WhatsApp" | 0.2.0 | - |
| BUG-0002 | 2026-10-19 | Mock originalPrice (*1.2/*1.3) dihapus; harga coret hanya jika API menyediakan | 0.2.0 | - |
| BUG-0003 | 2026-10-19 | Cart store -> useLocalStorage('happybouquet-cart'); badge sudah ClientOnly | 0.2.0 | - |
| BUG-0004 | 2026-10-19 | Rating/reviewCount determinis (4.5/0) di useProducts + products/index | 0.2.0 | - |
| BUG-0006 | 2026-10-19 | debug_mode:true dihapus dari gtag config | 0.2.0 | - |
| BUG-0005 | 2026-10-19 | NUXT_MAINTENANCE_ENABLED=true dibuang dari 3 script deploy + workflow + .env lokal; rilis publik tanpa maintenance | 0.2.0 | - |
| BUG-0007 | 2026-10-19 | Data pribadi di user store diganti placeholder generik ([ISI: ...]) | 0.2.0 | - |
| BUG-0017 | 2026-10-19 | Secret default dihapus ('' + error log jika kosong); bypass via header x-maintenance-secret (bukan query); cek ekstensi file regex | 0.2.0 | - |
| BUG-0020 | 2026-10-19 | TestingBadge hanya render saat import.meta.dev | 0.2.0 | - |
