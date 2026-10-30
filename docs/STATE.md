# HappyBouquet - STATE

Diperbarui: 2026-10-30 | Versi app: 0.3.0-dev (T1-T9 selesai) | Tahap: Siap deploy / lanjut halaman lain

> Bukan log. Timpa tiap sesi; pertahankan di bawah ~60 baris. Riwayat ada di register, CHANGELOG, dan git.

## Langkah berikutnya (maks. 5)
1. **Cek visual** situs: `npm run dev` → home + detail produk + checkout
2. Deploy: `bash deploy-local-cache.sh`; env server: `NUXT_API_URL`, `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`
3. Ganti nomor WA placeholder `6281234567890` sebelum rilis
4. Backend: wujudkan `docs/home-api-requirements.md` (prioritas: flash-sale/today, rating+review_count, banners, categories+foto)
5. Opsional CR-0003: isi halaman lain (/products, /about, dll) + CartModal ikut noir

## Keputusan
- 2026-10-19: Situs **PUBLIK** (bukan maintenance).
- 2026-10-19: Cache app **tetap Upstash**. Env wajib di server.
- 2026-10-19: `deploy-local-cache.sh` = deploy-local.sh + npm ci lokal hanya bila package.json/lock berubah; node_modules ikut dikirim bila deps berubah/server belum punya. Script utama user.
- 2026-10-19: Redesign home (CR-0001) **home dulu** (shell/header/footer menyusul); font via `@nuxtjs/google-fonts`; foto kategori dari foto produk per kategori.
- 2026-10-19: **Dark/light mode dihapus** (BUG-0023) — satu desain saja (noir-gold terbaru); token `.dark` & useTheme ikut dibuang.
- 2026-10-30: Penguatan Keamanan Frontend (BUG-0028..0032): Security headers global, cookie maintenance HMAC, reverse tabnabbing rel noopener, hapus /admin, dynamic key useProductDetail.

## Dokumen
| Dokumen | Status | Versi | Diubah |
|---|---|---|---|
| 00-brief/project-brief | Belum ada | - | - |
| 04-delivery/roadmap | Aktif, T1-T9 selesai | 0.3.0 | 2026-10-30 |
| home-api-requirements | Baru (BUG-0021) | 0.1 | 2026-10-19 |
| 06-maintenance/register | 0 terbuka, 26+ selesai | - | 2026-10-30 |
| CHANGELOG.md | Aktif | 0.3.0-dev | 2026-10-30 |

## Task
| TASK | Status | Catatan |
|---|---|---|
| T1-T4 | Selesai | BUG-0001..0015,0017,0019,0020; build ringan 3.78MB |
| T5 | Selesai | BUG-0016, 0018; 12/12 test lulus |
| T6 | Selesai | CR-0001 home noir-gold; build 3.94MB (font self-host) |
| T7 | Selesai | CR-0002 shell noir; build+test lulus |
| T8 | Selesai | BUG-0021 audit fix + docs/home-api-requirements.md |
| T9 | Selesai | BUG-0028..0032 audit keamanan FE (headers, HMAC cookie, tabnabbing, /admin 301, asyncData key) |

## Terbuka (keputusan, [ISI], asumsi)
- [ISI] Nomor WA asli (ganti placeholder sebelum rilis)
- [ASUMSI] Kode promo GOLDNOIR di topbar home = placeholder (belum terhubung sistem promo)
- Belum ada Project Brief

## Peta ID -> file
| ID | Dokumen |
|---|---|
| BUG-/CR-/RISK- | 06-maintenance/register.md + 04-delivery/roadmap.md |
| T1-T9 | 04-delivery/roadmap.md |

## Sesi terakhir (1-3 baris, ditimpa)
- BUG-0028..0032: Security audit fixes Nuxt storefront — global security headers, HMAC maintenance bypass, noopener noreferrer external links, hapus /admin route dummy, dynamic key useProductDetail. Test 12/12 & build lulus.
