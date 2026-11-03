# HappyBouquet - STATE

Diperbarui: 2026-11-04 | Versi app: 0.3.0-dev (Full-Funnel Analytics & Bot Separation) | Tahap: Siap Deploy

> Bukan log. Timpa tiap sesi; pertahankan di bawah ~60 baris. Riwayat ada di register, CHANGELOG, dan git.

## Langkah berikutnya (maks. 5)
1. **Deploy Produksi**: Jalankan migrasi DB backend (`npx sequelize-cli db:migrate`) untuk tabel `AnalyticsLogs` & bot telemetry, lalu deploy API, FE (`bash deploy-local-cache.sh`), dan Panel Admin.
2. Konfigurasi remote git di Panel Admin (`git remote add origin <URL>`) dan push commit rilis.
3. Verifikasi end-to-end analitik di production: kunjungi web -> cek deteksi bot vs manusia -> pantau di dashboard Dual-Tab Analytics Admin.

## Keputusan
- 2026-10-19: Situs **PUBLIK** (bukan maintenance). Cache app **tetap Upstash**.
- 2026-10-30: Arsitektur Multi-Channel & Tracking (CR-0004): Reseller dipisah; Ingestion via `POST /api/orders/public`; Tracking via `GET /api/orders/track/:orderNumber`.
- 2026-11-04: T13 tuntas (SSE order notification + multi-channel filter di Panel) & Log modern.
- 2026-11-04: Analitik Web Full-Funnel & Isolasi Bot (CR-0005): FE kirim event action, scroll depth, dwell time, webdriver telemetry; BE klasifikasikan bot (search engine, social preview, SEO crawler, CLI scraper, security scanner) dan pisahkan Redis set (`active_visitors` vs `bot_active`); Panel pisahkan tab Pengunjung Asli vs Intelijen Bot & Crawler dengan rekomendasi tindakan blokir.

## Dokumen
| Dokumen | Status | Versi | Diubah |
|---|---|---|---|
| 04-delivery/roadmap | Aktif, T1-T13 selesai | 0.5.0 | 2026-11-04 |
| 06-maintenance/CR-0004.md | Selesai | 1.0 | 2026-11-04 |
| 06-maintenance/register | 0 terbuka, 39 selesai | - | 2026-11-04 |
| CHANGELOG.md | Aktif | 0.3.0-dev | 2026-11-04 |

## Task
| TASK | Status | Catatan |
|---|---|---|
| T1-T9 | Selesai | Fondasi, shell noir, audit, keamanan |
| T10-T13 | Selesai | Promo, Public order, Tracking, SSE Panel |
| Analisis Web & Bot | Selesai | Full-funnel analytics + bot separation (FE, API, Panel) |

## Sesi terakhir (1-3 baris, ditimpa)
- Sesi 2026-11-04 (Analitik Web & Bot Intelligence): FE catat pageview, scroll depth, dwell time, action events & telemetry; BE pisahkan metrik Redis manusia vs bot dengan botDetector cerdas; Panel sediakan dashboard dual-tab (Real Visitors vs Bot Intelligence & Security Action); verifikasi: test API 114/114 lulus, test Panel 14/14 lulus, build Panel lulus, test FE 17/17 lulus, build FE 5.93MB lulus.
