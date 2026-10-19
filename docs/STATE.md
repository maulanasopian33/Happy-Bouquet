# HappyBouquet - STATE

Diperbarui: 2026-10-19 | Versi app: 0.2.0-dev (T1 selesai) | Tahap: Eksekusi T2

> Bukan log. Timpa tiap sesi; pertahankan di bawah ~60 baris. Riwayat ada di register, CHANGELOG, dan git.

## Langkah berikutnya (maks. 5)
1. T5 wishlist hydration (BUG-0018) + test DP/cart (BUG-0016)
2. Deploy ulang ke server (bash deploy-local.sh) & pantau stderr.log — site publik + build baru aktif setelah ini
3. Ganti nomor WA placeholder di checkout dengan nomor asli
4. Opsional: endpoint related di API backend (hilangkan shortcut BUG-0010)
5. Saat siap analytics: daftarkan `@nuxtjs/google-gtag` ke `modules` di nuxt.config (sudah terpasang, belum aktif)
6. Deploy ke produksi: jalankan `bash deploy-local-cache.sh` dari Git Bash; pastikan env server: `NUXT_API_URL`, `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`. Ganti nomor WA placeholder `6281234567890` sebelum rilis.

## Keputusan
- 2026-10-19: Situs **PUBLIK** (bukan maintenance). T2 dieksekusi.
- 2026-10-19: Cache app **tetap Upstash** (persistensi lintas restart > latensi REST). Env wajib di server.
- 2026-10-19: `deploy-local-cache.sh` = deploy-local.sh + (1) npm ci lokal hanya bila package.json/lock berubah (hash di `node_modules/.package-json-hash`); (2) `node_modules` ikut dikirim ke server hanya bila deps berubah atau server belum punya. Script utama user.
- 2026-10-19: `@nuxtjs/google-gtag` **dipertahankan** — akan di-wire ke modules saat analytics disiapkan (belum aktif).

## Dokumen
| Dokumen | Status | Versi | Diubah |
|---|---|---|---|
| 00-brief/project-brief | Belum ada | - | - |
| 04-delivery/roadmap | Aktif, T1-T4 centang penuh | 0.1.0 | 2026-10-19 |
| 06-maintenance/register | 2 BUG terbuka (T5), 18 selesai | - | 2026-10-19 |
| CHANGELOG.md | Aktif | 0.2.0-dev | 2026-10-19 |

## Task
| TASK | Status | Catatan |
|---|---|---|
| T1 | Selesai | BUG-0001..0004, 0006; build lulus |
| T2 | Selesai | BUG-0005, 0007, 0017, 0020; build lulus |
| T3 | Selesai | BUG-0008..0013, 0019; build 8.48MB -> 3.78MB |
| T4 | Selesai | BUG-0014, 0015; deploy ringan, 6 file + 5 deps dihapus |
| T5 | Belum | BUG-0016, 0018 |

## Terbuka (keputusan, [ISI], asumsi)
- [ISI] Target tanggal T2-T5
- [ASUMSI] Nomor WA 6281234567890 di checkout = placeholder; ganti dengan nomor asli sebelum rilis
- Belum ada Project Brief

## Peta ID -> file
| ID | Dokumen |
|---|---|
| BUG-/RISK- | 06-maintenance/register.md + 04-delivery/roadmap.md |
| T1-T5 | 04-delivery/roadmap.md |

## Sesi terakhir (1-3 baris, ditimpa)
- T4 dieksekusi: 3 jalur deploy hanya .output+package.json (tanpa npm ci/root node_modules), deploy-local-cache.sh dihapus, 6 file mati + 5 deps dibersihkan. Build lulus. Verifikasi L1.
