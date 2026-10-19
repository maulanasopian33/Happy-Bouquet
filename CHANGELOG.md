# HappyBouquet - CHANGELOG

Format: [Keep a Changelog](https://keepachangelog.com/). Rujuk ID: `docs/06-maintenance/register.md`.

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
