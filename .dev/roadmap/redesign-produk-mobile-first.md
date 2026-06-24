# Redesign Tampilan Produk Mobile First

## Tujuan
Merombak tampilan `pages/products/index.vue` agar mobile-first, mengikuti gaya UI e-commerce seperti pada `katalog/Happy Bouquet/src/App.vue`, tetapi tetap nyaman digunakan di desktop.

## Scope
- ✅ Menyesuaikan struktur HTML dan CSS di `pages/products/index.vue` untuk meniru gaya mobile-first yang ada di `App.vue` referensi.
- ✅ Memastikan tampilan desktop tetap responsif dan nyaman (maksimal lebar atau layout yang sesuai).
- ❌ Mengubah logika pengambilan data produk.

## Depends On
- [] — status: planned

## Sub-Tasks
- [x] Menganalisa struktur App.vue referensi.
- [x] Mengubah layout utama `pages/products/index.vue` (menghapus sidebar desktop, menggunakan tata letak stacked satu kolom).
- [x] Menyesuaikan komponen filter, search, grid untuk cocok dengan desain baru (scroll horizontal untuk kategori).
- [x] Test responsivitas di mobile dan desktop.

## Rollback Plan
Jika gagal: revert perubahan pada `pages/products/index.vue`.

## Status
done

## Catatan
Pastikan tidak merusak fungsi filter, search, dan pagination yang sudah ada.
