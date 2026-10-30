# HappyBouquet — Kebutuhan API Halaman Home

- Proyek: HappyBouquet (happybouquet.web.id) — frontend Nuxt 4, backend terpisah (`runtimeConfig.public.apiUrl`)
- Versi dokumen: 0.1
- Tanggal: 2026-10-19
- Status: Daftar kebutuhan (belum ada backend); sumber: audit BUG-0021
- Terkait: `pages/index.vue`, `components/header/*`, `components/footer/FooterMain.vue`

Semua endpoint di bawah saat ini dipanggil frontend dengan **fallback data dummy** bila gagal/kosong (try/catch atau pengecekan `length`). Backend perlu menyediakan agar konten home jadi nyata.

## Endpoint yang sudah dipanggil (kontrak minimal)

| # | Endpoint | Dipakai di | Field yang dibaca frontend | Catatan |
|---|---|---|---|---|
| 1 | `GET /banners` | HeroSlider (index.vue) | `data[]: imageUrl, title, subtitle, link` | Fallback: 3 banner dummy Unsplash |
| 2 | `GET /categories` | grid kategori (index.vue) | `data[]: id, name` | Fallback: 7 kategori emoji. Idealnya tambah `photo_url` + `productCount` agar foto & jumlah tidak ditarik dari produk |
| 3 | `GET /products?active=true` | flash sale + bestseller (index.vue) | `data[]: id, slug, name, price, photo_url, category` | Saat ini fetch SELURUH katalog lalu `slice`. Idealnya backend dukung `?limit=12&sort=bestseller` |
| 4 | `GET /promos?active=true` | TickerBanner | `data[]: name, description, code` | Fallback: 4 promo dummy. Topbar home masih hardcoded `GOLDNOIR` — sebaiknya pakai endpoint ini juga |

## Endpoint baru yang dibutuhkan

| # | Endpoint | Kebutuhan | Dipakai di | Prioritas |
|---|---|---|---|---|
| 5 | `GET /flash-sales/today` | Produk flash sale: `products[]: id, slug, name, price, originalPrice?, photo_url, stockLeft`, `endsAt` (ISO) | Section flash sale (index.vue) | Tinggi — kini stok determinis `20+id%40` & countdown akhir hari lokal client |
| 6 | `GET /products?rating_min=…` atau field `rating`, `review_count` di `/products` | Rating & jumlah ulasan asli | ProductCardNoir, mapProduct | Tinggi — kini hardcode `4.5` / `0` |
| 7 | `POST /newsletter/subscribe` | `email` | Form "Warta Botani" (FooterMain) | Sedang — kini submit palsu |
| 8 | `GET /testimonials?limit=3&approved=true` | `name, location, initials, tag, text, rating` | Section testimoni (index.vue) | Rendah — kini 3 testimoni statis |
| 9 | `GET /faqs` | `q, a` (atau `question, answer`) | FAQ home + `/faq` | Rendah — kini 4 FAQ statis |
| 10 | `GET /stats` | `customers, avgRating, deliveryEstimate` | Section metrics (index.vue) | Rendah — kini hardcode `500+` / `4.9★` / `2h` |

## Field produk yang belum ada di backend (kontrak `mapProduct`)

`composables/useProducts.ts` (`mapProduct`) saat ini memberi nilai default untuk field ini — backend perlu menyediakan agar tidak perlu default lagi:

| Field | Default sekarang | Kebutuhan |
|---|---|---|
| `rating` | `4.5` (hardcode) | Rata-rata rating asli |
| `reviewCount` / `review_count` | `0` (hardcode) | Jumlah ulasan |
| `stock` | `20` (hardcode) | Stok nyata (untuk detail + flash sale) |
| `variants` | `[]` (hardcode) | Varian produk (warna/ukuran) jika ada |
| `originalPrice` / `price_before_disc` | tidak ada | Harga coret flash sale (hanya tampil bila API menyediakan — BUG-0002) |

## Bukan API (catatan implementasi)

- Nomor WA `6281234567890` hardcode di 4 tempat (`pages/index.vue` ×2, `FooterMain`, topbar) — pindah ke `runtimeConfig.public` saat diganti nomor asli.
- Kode promo `GOLDNOIR` di topbar home = placeholder marketing, belum terhubung sistem promo.
