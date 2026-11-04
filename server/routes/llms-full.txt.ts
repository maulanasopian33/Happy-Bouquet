export default defineEventHandler(async (event) => {
  setHeader(event, 'Content-Type', 'text/markdown; charset=utf-8')
  setHeader(event, 'Cache-Control', 'public, max-age=3600, s-maxage=3600')

  const config = useRuntimeConfig()
  const apiUrl = config.public.apiUrl || 'http://localhost:5000/api'
  const host = getRequestHeader(event, 'host') || 'happybouquet.web.id'
  const proto = getRequestHeader(event, 'x-forwarded-proto') || 'https'
  const siteUrl = `${proto}://${host}`

  let productMarkdown = ''

  try {
    const res: any = await $fetch(`${apiUrl}/products?active=true`, { timeout: 3500 })
    const products = res?.data || []

    if (products.length > 0) {
      productMarkdown = products.map((p: any) => {
        const slug = p.slug || (p.name ? p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') : `product-${p.id}`)
        const priceNum = Number(p.price) || 0
        const formattedPrice = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(priceNum)
        const typeText = p.type === 'preorder' ? `Preorder (${p.preorder_duration || p.preorderDuration || 2} hari pengerjaan handmade)` : 'Ready Stock / Siap Kirim'
        const category = typeof p.category === 'object' && p.category !== null ? (p.category.NAME || p.category.name) : (p.category || 'Buket Pita Satin')

        return `### [${p.name}](${siteUrl}/products/${slug})
- **Harga**: ${formattedPrice}
- **Kategori**: ${category}
- **Ketersediaan**: ${typeText}
- **Deskripsi**: ${p.description || 'Rangkaian buket pita satin handmade premium karya artisan Happy Bouquet, dilengkapi wrapping cantik dan kartu ucapan kustom.'}
`
      }).join('\n')
    } else {
      productMarkdown = '_Daftar produk sedang diperbarui secara berkala._\n'
    }
  } catch {
    productMarkdown = '_Daftar produk dapat dilihat langsung di katalog web._\n'
  }

  return `# Happy Bouquet — Dokumen Lengkap Katalog & Profil Toko (LLMs Full)

> **"Make Your Always Happy"**
> Dokumen komprehensif profil dan katalog produk Happy Bouquet untuk mesin pencari cerdas dan agen AI (Perplexity, ChatGPT, Claude, Gemini, Google Search/AI Overviews). Memuat daftar produk aktif, opsi pengerjaan handmade, legalitas usaha, panduan kustomisasi, dan garansi pengiriman.

## Profil Bisnis, Legalitas & Kontak
- **Brand**: Happy Bouquet
- **Tagline**: *"Make Your Always Happy"*
- **Status Legalitas**: Usaha Mikro (UMKM) Resmi Ber-NIB (Nomor Induk Berusaha) KBLI 47781 (Perdagangan Eceran Barang Kerajinan / Hasil Kesenian).
- **Spesialisasi**: Buket pita satin (*handmade satin ribbon bouquet*), buket uang (*money bouquet*), buket *snack*, kalender kustom, dan *creative hampers*.
- **Lokasi Workshop**: Desa Cibeber, Kecamatan Leuwiliang, Kabupaten Bogor, Jawa Barat, Indonesia (Kode Pos: 16640).
- **Google Maps**: [Lokasi Happy Bouquet Studio di Google Maps](https://maps.app.goo.gl/QmFJN6TWHLfzxVVh8)
- **Area Layanan Pengiriman**: Area Bogor & Jabodetabek via Kurir/Instan, serta seluruh Indonesia via Ekspedisi (JNE/J&T/Sicepat).
- **Jam Operasional**: Senin – Sabtu pukul 08:00 - 17:00 WIB.
- **Website Resmi**: ${siteUrl}
- **WhatsApp Admin / Custom Order**: https://wa.me/6285150573089

---

## Daftar Produk Aktif (Real-Time Database)

${productMarkdown}

---

## 4 Pilar Jaminan Mutu & Layanan
1. **100% Handmade Precision**: Dibuat teliti dari bahan pita satin pilihan bertekstur mewah yang awet tahan lama tanpa khawatir layu.
2. **Kustomisasi Bebas (Full Customization)**: Kebebasan memilih kombinasi warna pita, tema *wrapping*, susunan buket, hingga jumlah tangkai.
3. **Gratis Kartu Ucapan Kustom**: Setiap pembelian menyertakan kartu ucapan (*greeting card*) dengan pesan personal sesuai permintaan.
4. **Pratinjau Foto Asli via WhatsApp**: Foto produk buket yang telah selesai dirangkai dikirimkan via WhatsApp ke pemesan sebelum dikemas dan dikirim.

---

## Panduan Perawatan & Penanganan Buket Pita Satin
1. Simpan buket di ruangan yang bersih dan kering.
2. Jauhkan dari paparan air atau cairan berwarna agar kualitas pita satin dan kertas *wrapping* tetap terjaga.
3. Apabila berdebu setelah disimpan lama, bersihkan permukaan pita secara perlahan menggunakan kuas lembut atau pembersih debu mikro.
4. Untuk buket uang (*money bouquet*), buka gulungan/plastik pelindung uang secara perlahan agar tidak merusak fisik uang kertas.
`
})