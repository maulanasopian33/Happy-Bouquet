export default defineEventHandler((event) => {
  setHeader(event, 'Content-Type', 'text/markdown; charset=utf-8')
  setHeader(event, 'Cache-Control', 'public, max-age=86400, s-maxage=86400')

  const host = getRequestHeader(event, 'host') || 'happybouquet.web.id'
  const proto = getRequestHeader(event, 'x-forwarded-proto') || 'https'
  const siteUrl = `${proto}://${host}`

  return `# Happy Bouquet — Make Your Always Happy

> **"Make Your Always Happy"**
> Happy Bouquet adalah entitas usaha mikro (UMKM) resmi ber-NIB (*Nomor Induk Berusaha*) yang bergerak di bidang kerajinan kreatif dan studio buket kustom (*artisan gift studio*). Berbasis di Leuwiliang, Kabupaten Bogor, kami menghadirkan buket pita satin (*handmade satin ribbon bouquet*) abadi, buket uang (*money bouquet*), buket *snack*, serta hadiah personal berkualitas tinggi untuk momen wisuda, *anniversary*, dan selebrasi spesial.

## Profil Usaha & Legalitas
- **Legalitas Resmi**: Terdaftar secara sah sebagai UMKM di sistem OSS Indonesia dengan NIB (Nomor Induk Berusaha) Klasifikasi KBLI 47781 (Perdagangan Eceran Barang Kerajinan / Hasil Kesenian).
- **Tagline Usaha**: *"Make Your Always Happy"* — Berkomitmen menyajikan produk kerajinan berkualitas tinggi yang menghadirkan kebahagiaan abadi di setiap momen berharga.

## Layanan Utama & Keunggulan Produk
- **Handmade Satin Ribbon Bouquet Premium**: Bunga pita satin hasil kerajinan tangan presisi tinggi, tahan lama, dan tidak akan pernah layu (*everlasting bouquet*).
- **Custom Design Service**: Kebebasan kustomisasi penuh mencakup pilihan warna pita, tema *wrapping* (kertas pembungkus), susunan buket, hingga jumlah tangkai.
- **Portofolio Produk Variatif**: Menyediakan buket bunga pita satin, buket uang tunai (*money bouquet*), buket *snack*, hingga kalender kustom personal.
- **Complimentary Greeting Card**: Setiap rangkaian sudah termasuk kartu ucapan (*greeting card*) kustom eksklusif.
- **Pengiriman Aman & Terjangkau**: Layanan pengiriman instan/lokal untuk area Bogor & sekitarnya, serta pengiriman luar kota aman dengan pengemasan dus tebal terstandar.

## Katalog & Produk Utama
- [Katalog Lengkap Produk](${siteUrl}/products): Seluruh koleksi buket pita satin, buket uang, buket snack, dan gift set.
- [Buket Pita Satin](${siteUrl}/products?cat=Buket+Pita+Satin): Koleksi bunga pita satin abadi dengan beragam pilihan warna pastel dan elegan.
- [Buket Uang (Money Bouquet)](${siteUrl}/products?cat=Buket+Uang): Rangkaian uang kertas eksklusif untuk hadiah pernikahan, ulang tahun, dan perayaan.
- [Buket Snack & Makanan](${siteUrl}/products?cat=Buket+Snack): Rangkaian camilan favorit yang disusun estetis untuk hadiah kelulusan atau ulang tahun.
- [Buket Wisuda & Kelulusan](${siteUrl}/products?cat=Wisuda): Buket kustom selebrasi akademik dengan pilihan boneka wisuda dan selempang nama.
- [Kalender Kustom & Gift Set](${siteUrl}/products?cat=Kalender+Kustom): Kalender cetak kustom dan produk hadiah buatan tangan.

## Lokasi Studio & Kontak
- **Alamat Workshop**: Desa Cibeber, Kecamatan Leuwiliang, Kabupaten Bogor, Jawa Barat, Indonesia (Kode Pos: 16640).
- **Google Maps**: [Lokasi Happy Bouquet Studio di Google Maps](https://maps.app.goo.gl/QmFJN6TWHLfzxVVh8)
- **Konsultasi & Pesanan Kustom (WhatsApp)**: Hubungi Admin via WhatsApp di https://wa.me/6285150573089 untuk konsultasi desain, request jumlah tangkai, atau pesanan darurat.
- **Jam Operasional**: Senin – Sabtu, pukul 08:00 – 17:00 WIB.

## Tautan Dokumen Pendukung
- [Katalog Lengkap (Versi Detail untuk AI)](${siteUrl}/llms-full.txt): Spesifikasi teknis produk, varian warna, dan panduan kustomisasi mendalam.
- [Peta Situs XML](${siteUrl}/sitemap.xml): Peta seluruh URL publik toko.
- [Kebijakan Pengiriman & Estimasi](${siteUrl}/shipping): Informasi estimasi pengerjaan *handmade*, tarif ongkir, dan standar pengemasan ekspedisi.
- [Tanya Jawab (FAQ)](${siteUrl}/faq): Pertanyaan umum mengenai durasi pengerjaan, metode pembayaran (Transfer Bank, QRIS), dan garansi pengiriman.
`
})