# HappyBouquet - STATE

Diperbarui: 2026-11-02 | Versi app: 0.3.0-dev (T1-T11 selesai, T12 sebagian) | Tahap: Audit FE↔BE + fix PDP 500

> Bukan log. Timpa tiap sesi; pertahankan di bawah ~60 baris. Riwayat ada di register, CHANGELOG, dan git.

## Langkah berikutnya (maks. 5)
1. **Deploy**: fix PDP (BUG-0037) + endpoint settings belum di-deploy — produksi masih kode lama (PDP 500, `/settings` 404). Backend: deploy commit `3d06767` + jalankan migration manual di produksi (`npx sequelize-cli db:migrate`); lalu FE dan Panel.
2. Ganti nomor WA placeholder `6281234567890` via Panel → Pengaturan Toko (`PUT /settings`) — fallback hanya bila API gagal.
3. Hubungkan `pages/tracking.vue` ke `GET /api/orders/track/:orderNumber` (T12 sisa — kini masih mock Pinia).
4. T13: SSE notifikasi + filter channel di Panel Admin.
5. Endpoint #6–#12 (`docs/home-api-requirements.md`) **ditunda** — bangun hanya saat FE sudah memanggilnya.

## Keputusan
- 2026-10-19: Situs **PUBLIK** (bukan maintenance). Cache app **tetap Upstash**.
- 2026-10-30: Penguatan Keamanan Frontend (BUG-0028..0032); Arsitektur Multi-Channel & Tracking (CR-0004).
- 2026-11-02: Data toko tunggal via `useStoreSettings`; order kirim field `channel` (backend Zod enum); desain PDP ikut `design/home/code.html` tapi konten tetap data API.
- 2026-11-02: Endpoint settings DIBANGKAN di backend (allowlist 9 key, GET publik + PUT admin, tanpa seeder). Endpoint #6–#12 ditunda (FE belum memanggil = kode mati). Fix PDP: `useProductDetail` jadi satu `useAsyncData` sync (akar `[nuxt] instance unavailable`: `useAsyncData` setelah `await` di composable async).

## Dokumen
| Dokumen | Status | Versi | Diubah |
|---|---|---|---|
| 04-delivery/roadmap | Aktif, T1-T11 selesai, T12 sebagian | 0.4.0 | 2026-11-02 |
| 06-maintenance/CR-0004.md | Aktif (Rencana Multi-Channel & Tracking) | 0.1 | 2026-10-30 |
| 06-maintenance/register | 1 terbuka (CR-0004), 38 selesai | - | 2026-11-03 |
| home-api-requirements | Aktif (audit integrasi; #5 selesai, #6-12 ditunda) | 0.3 | 2026-11-02 |
| CHANGELOG.md | Aktif | 0.3.0-dev | 2026-11-02 |

## Task
| TASK | Status | Catatan |
|---|---|---|
| T1-T9 | Selesai | Fondasi, shell noir, audit, keamanan |
| T10 | Selesai | Promo sync + telemetri channel (BUG-0034) |
| T11 | Selesai | Public order API + channel enum di backend (BUG-0036) |
| T12 | Sebagian | Checkout auto-record + channel strip PDP selesai; tracking riil belum |
| T13 | Terjadwal | SSE Panel + filter channel |

## Sesi terakhir (1-3 baris, ditimpa)
- Sesi 2026-11-03 (BUG-0038): breadcrumb PDP ikut `design/home/code.html` (bar + pill status); fetch produk jadi milik halaman saja, `ProductDetailPage` terima props (fix `useAsyncData` jalan 2× per render). Verifikasi: `sadas` 200 + nama breadcrumb, slug tak ada 200, 1× fetch per request, `npm test` 17/17. Belum di-commit.
- Sesi 2026-11-02 (BUG-0034..0037 + RISK-0001): audit FE↔BE; backend bangun `GET/PUT /api/settings` (commit api `3d06767`) + alias `/api/analytics`; Panel dapat halaman Pengaturan Toko (`/settings`, admin) + skrip `deploy-local.sh`; fix PDP 500 + `[nuxt] instance unavailable` (BUG-0037). Verifikasi: FE `npm test` 17/17; Panel `npm test` 14/14 + `npm run build` sukses. **Belum di-deploy; commit FE belum diminta user.**
