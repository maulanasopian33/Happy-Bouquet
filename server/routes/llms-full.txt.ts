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
        const typeText = p.type === 'preorder' ? `Preorder (${p.preorder_duration || p.preorderDuration || 2} hari)` : 'Ready Stock / Same Day Delivery'
        const category = typeof p.category === 'object' && p.category !== null ? (p.category.NAME || p.category.name) : (p.category || 'Buket Bunga')

        return `### [${p.name}](${siteUrl}/products/${slug})
- **Harga**: ${formattedPrice}
- **Kategori**: ${category}
- **Ketersediaan**: ${typeText}
- **Deskripsi**: ${p.description || 'Rangkaian bunga segar premium dengan pita satin mewah dan kartu ucapan berstempel lilin emas.'}
`
      }).join('\n')
    } else {
      productMarkdown = '_Daftar produk sedang diperbarui secara berkala._\n'
    }
  } catch {
    productMarkdown = '_Daftar produk dapat dilihat langsung di katalog web._\n'
  }

  return `# HappyBouquet — Dokumen Lengkap Katalog & Profil Toko (LLMs Full)

> Dokumen komprehensif profil HappyBouquet untuk mesin pencari cerdas (Perplexity, ChatGPT, Claude, Gemini, Google SGE/AI Overviews). Memuat seluruh daftar produk aktif, opsi pengiriman, garansi, dan panduan perawatan bunga.

## Ringkasan Bisnis & Kontak
- **Brand**: HappyBouquet (Haute Botanique)
- **Kategori Bisnis**: Florist Artisan, Toko Bunga Segar & Gift Atelier
- **Area Layanan**: Jakarta Pusat, Jakarta Selatan, Jakarta Barat, Jakarta Timur, Jakarta Utara, Tangerang, Depok, Bekasi (Jabodetabek)
- **Jam Layanan**: Setiap Hari 08:00 - 21:00 WIB
- **Website Resmi**: ${siteUrl}
- **WhatsApp Concierge**: https://wa.me/6281234567890
- **Layanan Pengiriman Hari Ini**: Order sebelum jam 14.00 WIB dikirim dan tiba di hari yang sama.

---

## Daftar Produk Aktif (Real-Time Database)

${productMarkdown}

---

## 4 Pilar Jaminan Mutu
1. **100% Tangkai Segar (Grade A+)**: Dipanen dari kebun bersuhu dingin dengan jaminan kesegaran mekar hingga 5 hari.
2. **Garansi Tiba Selamat**: Rusak atau layu di perjalanan langsung diganti baru tanpa biaya tambahan.
3. **Wax Seal & Kaligrafi**: Kartu ucapan katun bertekstur, ditulis kaligrafi elegan dan disegel wax lilin emas asli.
4. **Pratinjau Foto Asli via WhatsApp**: Foto hasil akhir dikirimkan ke nomor WhatsApp pemesan sebelum kurir berangkat.

---

## Panduan Perawatan Rangkaian Bunga Segar
1. Segera letakkan buket dalam vas berisi air bersih sejuk begitu tiba.
2. Potong bagian bawah batang bunga secara miring (sudut 45 derajat) kira-kira 1-2 cm setiap 2 hari untuk penyerapan air optimal.
3. Jauhkan rangkaian dari paparan sinar matahari langsung, hawa panas dapur, atau hembusan udara AC langsung.
4. Ganti air vas setiap 1-2 hari dan tambahkan sachet nutrisi bunga yang disertakan.
`
})
