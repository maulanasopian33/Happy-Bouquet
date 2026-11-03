# HappyBouquet — Kebutuhan API Halaman Home

- Proyek: HappyBouquet (happybouquet.web.id) — frontend Nuxt 4, backend terpisah (`runtimeConfig.public.apiUrl`)
- Versi dokumen: 0.3
- Tanggal: 2026-10-19, diperbarui 2026-11-02 (audit integrasi data toko + endpoint settings dibangun)
- Status: Daftar kebutuhan; sumber: audit BUG-0021 + audit integrasi FE 2026-11-02
- Terkait: `pages/index.vue`, `components/header/*`, `components/footer/FooterMain.vue`, `composables/useStoreSettings.ts`

Semua endpoint di bawah saat ini dipanggil frontend dengan **fallback data dummy** bila gagal/kosong (try/catch atau pengecekan `length`), kecuali #5 yang kini sudah tersedia di backend.

## Endpoint yang sudah dipanggil (kontrak minimal)

| # | Endpoint | Dipakai di | Field yang dibaca frontend | Catatan |
|---|---|---|---|---|
| 1 | `GET /banners` | HeroSlider (index.vue) | `data[]: imageUrl, title, subtitle, link` | Fallback: 3 banner dummy Unsplash |
| 2 | `GET /categories` | grid kategori (index.vue) | `data[]: id, name` | Fallback: 7 kategori emoji. Idealnya tambah `photo_url` + `productCount` agar foto & jumlah tidak ditarik dari produk |
| 3 | `GET /products?active=true` | flash sale + bestseller (index.vue) | `data[]: id, slug, name, price, photo_url, category` | Saat ini fetch SELURUH katalog lalu `slice`. Idealnya backend dukung `?limit=12&sort=bestseller` |
| 4 | `GET /promos?active=true` | TickerBanner + topbar home | `data[]: name, type, value, code` | Sudah dipakai topbar home (dinamis, fallback `GOLDNOIR`). Fallback promo dummy lain |

## Endpoint baru yang dibutuhkan

| # | Endpoint | Kebutuhan | Dipakai di | Prioritas |
|---|---|---|---|---|
| 5 | `GET /settings` + `PUT /settings` | Data toko tunggal: `brand_name, whatsapp_number, email, address, hours, instagram_url, tiktok_url, shopee_url, tiktok_shop_url` (kontrak lihat `composables/useStoreSettings.ts`) | Footer, contact, faq, privacy, maintenance, links, tracking, index, products, checkout, PDP | **SELESAI (2026-11-02)** — backend `api` commit `3d06767`: tabel `StoreSettings`, GET publik + PUT admin-only, allowlist 9 key. Admin kelola via Panel (`/settings`). Juga: alias mount `/api/analytics` di `app.js` (path FE `POST /analytics/collect` sudah cocok) |
| 6 | `GET /flash-sales/today` | Produk flash sale: `products[]: id, slug, name, price, originalPrice?, photo_url, stockLeft`, `endsAt` (ISO) | Section flash sale (index.vue) | **DITUNDA** — FE belum memanggil endpoint ini (masih data statis); membangun = kode mati |
| 7 | `GET /products?rating_min=…` atau field `rating`, `review_count` di `/products` | Rating & jumlah ulasan asli | ProductCardNoir, mapProduct | **DITUNDA** — FE tidak memanggil (hardcode `4.5` / `0`) |
| 8 | `POST /newsletter/subscribe` | `email` | Form "Warta Botani" (FooterMain) | **DITUNDA** — FE submit palsu, belum ada fetch ke endpoint |
| 9 | `GET /testimonials?limit=3&approved=true` | `name, location, initials, tag, text, rating` | Section testimoni (index.vue) | **DITUNDA** — FE pakai testimoni statis |
| 10 | `GET /faqs` | `q, a` (atau `question, answer`) | FAQ home + `/faq` | **DITUNDA** — FE pakai 4 FAQ statis |
| 11 | `GET /stats` | `customers, avgRating, deliveryEstimate` | Section metrics (index.vue) | **DITUNDA** — FE hardcode `500+` / `4.9★` / `2h` |
| 12 | `GET /shipping-methods` + `GET /payment-methods` | `name, description, cost` / `name, id` | Checkout (`pages/checkout/index.vue`) | **DITUNDA** — FE pakai 2 metode statis |

Aturan tunda: endpoint #6–#12 hanya dibangun setelah FE benar-benar memanggilnya (saat itu FE masih data statis — membangun sekarang = kode mati di backend).

## Field produk yang belum ada di backend (kontrak `mapProduct`)

`composables/useProducts.ts` (`mapProduct`) saat ini memberi nilai default untuk field ini — backend perlu menyediakan agar tidak perlu default lagi:

| Field | Default sekarang | Kebutuhan |
|---|---|---|
| `rating` | `4.5` (hardcode) | Rata-rata rating asli |
| `reviewCount` / `review_count` | `0` (hardcode) | Jumlah ulasan |
| `stock` | `20` (hardcode) | Stok nyata (untuk detail + flash sale) |
| `variants` | `[]` (hardcode) | Varian produk (warna/ukuran) jika ada |
| `originalPrice` / `price_before_disc` | tidak ada | Harga coret flash sale (hanya tampil bila API menyediakan — BUG-0002) |

## Integrasi selesai (audit 2026-11-02)

- Nomor WA, alamat, jam buka, email, sosmed, brand name kini terpusat di `composables/useStoreSettings.ts` (fallback stabil, otomatis menimpa dari `GET /settings` begitu endpoint ada). Sudah dipakai di: Footer, contact, faq, privacy, maintenance, links, tracking, index, products index, checkout, PDP (channel strip + trust promise).
- `POST /orders/public` backend kini menerima field `channel` (enum `Web|WhatsApp|Shopee|TikTok`, default `Web`) — diubah di `api-happyBouquet/src/controllers/publicOrderController.js` (Zod schema + `data.channel`). Frontend checkout mengirim `channel: 'Web'`.
- Klik tombol channel (WA/Shopee/TikTok) di PDP memicu `trackChannelOutbound()` → `POST /analytics/collect` (event `channel_outbound`) untuk atribusi channel.
- Topbar home memakai promo aktif pertama dari `GET /promos?active=true` (fallback `GOLDNOIR`).

## Bukan API (catatan implementasi)

- Nomor WA `6281234567890` di `STORE_SETTINGS_FALLBACK` = **placeholder** — kini bisa diisi via Panel Admin → Pengaturan Toko (`PUT /settings`); fallback hanya dipakai bila API gagal.
