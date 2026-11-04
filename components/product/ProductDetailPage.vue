<template>
  <div class="space-y-12">
    <!-- ======= LOADING / ERROR STATES ======= -->
    <div v-if="loading" class="flex flex-col items-center justify-center py-32 space-y-4 text-center">
      <div class="w-12 h-12 border-4 border-[#353437] border-t-[#d4af37] rounded-full animate-spin"></div>
      <p class="text-sm font-bold text-[#b8b2a3] uppercase tracking-widest font-sans">Menyiapkan Detail Mahakarya...</p>
    </div>

    <div v-else-if="error" class="p-10 rounded-2xl bg-[#18181a] border border-[#4a4538]/40 text-center space-y-6 max-w-2xl mx-auto shadow-2xl">
      <div class="w-20 h-20 bg-[#d4af37]/10 rounded-full flex items-center justify-center mx-auto text-[#d4af37]">
        <Icon name="ph:warning-circle-bold" class="w-10 h-10" />
      </div>
      <div class="space-y-2">
        <h2 class="text-2xl font-serif font-bold text-[#e5e1e4]">Produk Tidak Ditemukan</h2>
        <p class="text-[#b8b2a3] text-sm">{{ error }}</p>
      </div>
      <NuxtLink to="/products" class="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#d4af37] text-[#0e0e10] font-bold text-sm tracking-wider uppercase hover:bg-[#e9c349] transition-all">
        Kembali ke Katalog
      </NuxtLink>
    </div>

    <!-- ======= MAIN PRODUCT DETAIL CONTENT ======= -->
    <div v-else-if="product" class="animate-fade-in">
      <!-- Main Split Section: Gallery (Left) & Purchasing Engine (Right) -->
      <section class="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-6 lg:py-10">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

          <!-- ==========================================
               LEFT COLUMN: BOTANICAL VISUAL GALLERY
               ========================================== -->
          <div class="lg:col-span-6 flex flex-col gap-4">
            <!-- Main Stage with Ambient Underglow -->
            <div class="relative w-full rounded-2xl overflow-hidden bg-[#18181a] shadow-2xl border border-[#353437]/50">
              <!-- Ambient gold background glow -->
              <div class="absolute -top-16 -left-16 w-64 h-64 bg-[#d4af37]/10 rounded-full blur-3xl pointer-events-none"></div>
              <div class="absolute -bottom-16 -right-16 w-64 h-64 bg-[#d3ad65]/10 rounded-full blur-3xl pointer-events-none"></div>

              <!-- Featured Main Image -->
              <div class="relative aspect-[4/5] w-full overflow-hidden group">
                <NuxtImg
                  :src="currentMainImage || '/default.png'"
                  :alt="product.name"
                  class="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  width="800"
                  height="1000"
                  @error="onImgError"
                />

                <!-- Editorial Badges Floating -->
                <div class="absolute top-4 left-4 flex flex-col gap-2 z-10">
                  <span class="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#0e0e10]/90 backdrop-blur-md text-[#d4af37] text-[11px] font-bold tracking-widest uppercase shadow-md border border-[#d4af37]/20">
                    <Icon name="ph:seal-check-fill" class="w-3.5 h-3.5 text-[#d4af37]" />
                    100% Bunga Segar Pilihan
                  </span>
                  <span class="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#0e0e10]/90 backdrop-blur-md text-[#e5e1e4] text-[11px] font-bold tracking-widest uppercase shadow-md border border-[#353437]">
                    <Icon name="ph:bolt-fill" class="w-3.5 h-3.5 text-[#d4af37]" />
                    {{ product.type === 'preorder' ? `Preorder ${product.preorderDuration || '-'} Hari` : 'Same Day Delivery Jakarta' }}
                  </span>
                </div>

                <!-- Wishlist & Share Quick Actions -->
                <div class="absolute top-4 right-4 flex flex-col gap-2 z-10">
                  <ClientOnly>
                    <button
                      @click="toggleWishlist"
                      class="w-10 h-10 rounded-full backdrop-blur-md flex items-center justify-center shadow-lg transition-all active:scale-95 border"
                      :class="isWishlisted ? 'bg-[#d4af37] text-[#0e0e10] border-[#d4af37]' : 'bg-[#0e0e10]/80 text-[#ccc6bb] hover:text-[#d4af37] hover:bg-[#1f1f21] border-[#353437]'"
                      :title="isWishlisted ? 'Hapus dari Wishlist' : 'Simpan ke Wishlist'"
                      aria-label="Wishlist"
                    >
                      <Icon :name="isWishlisted ? 'ph:heart-fill' : 'ph:heart-bold'" class="w-5 h-5" />
                    </button>
                    <template #fallback>
                      <button class="w-10 h-10 rounded-full bg-[#0e0e10]/80 border border-[#353437] text-[#ccc6bb] flex items-center justify-center">
                        <Icon name="ph:heart-bold" class="w-5 h-5" />
                      </button>
                    </template>
                  </ClientOnly>

                  <button
                    @click="shareProduct"
                    class="w-10 h-10 rounded-full bg-[#0e0e10]/80 backdrop-blur-md text-[#ccc6bb] hover:text-[#d4af37] hover:bg-[#1f1f21] transition-all flex items-center justify-center shadow-lg border border-[#353437] active:scale-95"
                    title="Bagikan Buket"
                    aria-label="Bagikan"
                  >
                    <Icon name="ph:share-network-bold" class="w-5 h-5" />
                  </button>
                </div>

                <!-- Certified Wax Seal Motif Overlay -->
                <div class="absolute bottom-4 right-4 p-2.5 rounded-full bg-[#0e0e10]/90 backdrop-blur-md flex items-center gap-2 shadow-xl border border-[#d4af37]/30">
                  <div class="w-8 h-8 rounded-full bg-[#d4af37]/20 flex items-center justify-center">
                    <Icon name="ph:flower-lotus-fill" class="w-4.5 h-4.5 text-[#d4af37]" />
                  </div>
                  <div class="flex flex-col pr-1">
                    <span class="text-[10px] text-[#d4af37] tracking-wider uppercase leading-tight font-bold">Master Florist</span>
                    <span class="text-[11px] text-[#b8b2a3] leading-none">Handcrafted Series</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Thumbnail Carousel Strip -->
            <div v-if="galleryImages.length > 1" class="grid grid-cols-4 gap-3">
              <button
                v-for="(imgSrc, idx) in galleryImages"
                :key="idx"
                class="relative aspect-square rounded-xl overflow-hidden bg-[#1f1f21] p-0.5 transition-all focus:outline-none border-2"
                :class="activeThumbIdx === idx ? 'border-[#d4af37] opacity-100 shadow-[0_0_12px_rgba(212,175,55,0.3)]' : 'border-transparent opacity-65 hover:opacity-100'"
                @click="activeThumbIdx = idx"
              >
                <NuxtImg
                  :src="imgSrc || '/default.png'"
                  :alt="`${product.name} thumbnail ${idx + 1}`"
                  class="w-full h-full object-cover rounded-lg"
                  width="150"
                  height="150"
                  @error="onImgError"
                />
                <div v-if="activeThumbIdx === idx" class="absolute inset-0 bg-[#d4af37]/10 rounded-lg pointer-events-none"></div>
              </button>
            </div>

            <!-- Florist Guarantee Pill Box -->
            <div class="grid grid-cols-3 gap-3 p-4 rounded-xl bg-[#18181a] border border-[#353437]/60 shadow-sm text-center">
              <div class="flex flex-col items-center text-center gap-1">
                <Icon name="ph:seal-check-fill" class="w-5.5 h-5.5 text-[#d4af37]" />
                <span class="text-xs font-semibold text-[#e5e1e4]">100% Bunga Segar</span>
                <span class="text-[11px] text-[#b8b2a3]">Grade AAA Ekuador</span>
              </div>
              <div class="flex flex-col items-center text-center gap-1 border-x border-[#353437]/40 px-1">
                <Icon name="ph:camera-fill" class="w-5.5 h-5.5 text-[#d4af37]" />
                <span class="text-xs font-semibold text-[#e5e1e4]">Foto Real-Time</span>
                <span class="text-[11px] text-[#b8b2a3]">Preview WA Sebelum Kirim</span>
              </div>
              <div class="flex flex-col items-center text-center gap-1">
                <Icon name="ph:shield-check-fill" class="w-5.5 h-5.5 text-[#d4af37]" />
                <span class="text-xs font-semibold text-[#e5e1e4]">Garansi Sampai</span>
                <span class="text-[11px] text-[#b8b2a3]">Ganti Baru Jika Rusak</span>
              </div>
            </div>
          </div>

          <!-- ==========================================
               RIGHT COLUMN: LUXURY PURCHASING ENGINE & ATELIER CONFIGURATOR
               ========================================== -->
          <div class="lg:col-span-6 flex flex-col gap-6">

            <!-- Header Info & Rating Tier -->
            <div class="flex flex-col gap-2">
              <div class="flex items-center gap-2 flex-wrap">
                <span class="px-2.5 py-1 rounded bg-[#d4af37]/15 text-[#d4af37] text-[11px] font-bold tracking-widest uppercase border border-[#d4af37]/30">
                  Bestseller No. 1
                </span>
                <span v-if="product.category" class="px-2.5 py-1 rounded bg-[#1f1f21] text-[#ccc6bb] text-[11px] tracking-wider uppercase border border-[#353437]">
                  {{ product.category }}
                </span>
                <span class="text-[#b8b2a3] text-xs font-mono">• SKU: HB-{{ product.slug }}</span>
              </div>

              <!-- Product Title -->
              <h1 class="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#e5e1e4] tracking-tight leading-tight mt-1">
                {{ product.name }}
              </h1>

              <p v-if="product.description" class="text-sm text-[#b8b2a3] leading-relaxed line-clamp-2">
                {{ product.description }}
              </p>

              <!-- Social Proof & Review Counters -->
              <div class="flex items-center gap-4 py-1 text-xs">
                <div class="flex items-center gap-1.5">
                  <div class="flex text-[#d4af37]">
                    <Icon v-for="s in 5" :key="s" name="ph:star-fill" class="w-4 h-4" />
                  </div>
                  <span class="font-bold text-[#e5e1e4]">{{ (product.rating || 4.9).toFixed(1) }}</span>
                  <button @click="switchTab('tab-reviews')" class="text-[#b8b2a3] underline hover:text-[#d4af37] transition-colors">
                    ({{ (product.reviewCount || 128).toLocaleString('id-ID') }} Ulasan Terverifikasi)
                  </button>
                </div>
                <span class="text-[#353437]">•</span>
                <span class="text-[#b8b2a3] flex items-center gap-1">
                  <Icon name="ph:flower-lotus-bold" class="w-3.5 h-3.5 text-[#d4af37]" />
                  5.400+ Buket Terkirim
                </span>
              </div>
            </div>

            <!-- Price Display Card -->
            <div class="p-4 rounded-xl bg-[#1f1f21] border border-[#4a4538]/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-lg">
              <div class="flex flex-col">
                <div class="flex items-baseline gap-3">
                  <span class="text-3xl sm:text-4xl font-serif text-[#d4af37] font-bold tracking-tight">
                    {{ formatCurrency(calculatedTotalUnit) }}
                  </span>
                  <span v-if="calculatedOriginalTotalUnit" class="text-sm sm:text-base text-[#b8b2a3]/60 line-through">
                    {{ formatCurrency(calculatedOriginalTotalUnit) }}
                  </span>
                </div>
                <div class="flex items-center gap-2 mt-1 flex-wrap">
                  <span v-if="discountBadge" class="px-2 py-0.5 rounded bg-[#d3ad65]/20 text-[#f1c97d] text-[11px] uppercase font-bold border border-[#d3ad65]/30">
                    {{ discountBadge }}
                  </span>
                  <span class="text-xs text-[#b8b2a3]">Sudah Termasuk PPN 11%</span>
                </div>
                <!-- Status Stok -->
                <div class="flex items-center gap-2 mt-2 text-xs">
                  <span v-if="(product.stock ?? 20) > 10" class="text-emerald-400 flex items-center gap-1">
                    <Icon name="ph:check-circle-fill" class="w-3.5 h-3.5" /> Stok Tersedia ({{ product.stock ?? 20 }} unit)
                  </span>
                  <span v-else-if="(product.stock ?? 20) > 0" class="text-amber-400 flex items-center gap-1 font-semibold">
                    <Icon name="ph:warning-circle-fill" class="w-3.5 h-3.5" /> Stok Terbatas — Sisa {{ product.stock }} unit
                  </span>
                  <span v-else class="text-rose-400 flex items-center gap-1 font-semibold">
                    <Icon name="ph:x-circle-fill" class="w-3.5 h-3.5" /> Stok Habis
                  </span>
                </div>
              </div>

              <div class="text-left sm:text-right flex sm:flex-col items-start sm:items-end justify-between">
                <span class="text-xs text-[#d4af37] uppercase tracking-widest font-bold flex items-center gap-1">
                  <Icon name="ph:truck-fill" class="w-4 h-4" /> Gratis Ongkir
                </span>
                <span class="text-[11px] text-[#b8b2a3]">Area Jabodetabek</span>
              </div>
            </div>

            <!-- Customization Atelier Configurator -->
            <div class="flex flex-col gap-5 p-5 rounded-2xl bg-[#18181a] border border-[#353437]/50 shadow-md">

              <!-- 1. Stem Count Selection / Ukuran Buket -->
              <div class="flex flex-col gap-2.5">
                <div class="flex items-center justify-between text-xs">
                  <span class="font-bold text-[#e5e1e4] uppercase tracking-wider">
                    1. Jumlah Tangkai Mawar: <span class="text-[#d4af37] font-normal">{{ selectedSize.label }}</span>
                  </span>
                  <span class="text-[#b8b2a3]">{{ selectedSize.diameter }}</span>
                </div>

                <div class="grid grid-cols-3 gap-2.5">
                  <button
                    v-for="size in sizeOptions"
                    :key="size.id"
                    type="button"
                    class="p-3 rounded-xl text-left transition-all border"
                    :class="selectedSize.id === size.id ? 'bg-[#353437] border-[#d4af37] shadow-[0_0_10px_rgba(212,175,55,0.2)]' : 'bg-[#1f1f21] border-[#353437] hover:bg-[#242427]'"
                    @click="selectedSize = size"
                  >
                    <div class="font-semibold text-xs text-[#e5e1e4]">{{ size.stems }}</div>
                    <div class="text-[#d4af37] text-xs font-bold">{{ size.name }}</div>
                    <div class="text-[10px] text-[#b8b2a3] mt-0.5">{{ size.priceModifierText }}</div>
                  </button>
                </div>
              </div>

              <!-- 2. Wrapping Color Selection -->
              <div class="flex flex-col gap-2.5">
                <div class="flex items-center justify-between text-xs">
                  <span class="font-bold text-[#e5e1e4] uppercase tracking-wider">
                    2. Warna Kertas Wrapping: <span class="text-[#d4af37] font-normal">{{ selectedWrapping.name }}</span>
                  </span>
                  <span class="text-[#b8b2a3]">Matte Korean Film</span>
                </div>

                <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <button
                    v-for="wrap in wrappingOptions"
                    :key="wrap.name"
                    type="button"
                    class="flex items-center gap-2 p-2 rounded-lg transition-all text-left border"
                    :class="selectedWrapping.name === wrap.name ? 'bg-[#353437] border-[#d4af37]' : 'bg-[#1f1f21] border-[#353437] hover:bg-[#242427]'"
                    @click="selectedWrapping = wrap"
                  >
                    <span class="w-5 h-5 rounded-full shadow-inner border border-white/20 shrink-0" :style="{ backgroundColor: wrap.color }"></span>
                    <span class="text-xs text-[#e5e1e4] truncate">{{ wrap.name }}</span>
                  </button>
                </div>
              </div>

              <!-- 3. Bespoke Add-ons -->
              <div class="flex flex-col gap-2.5">
                <span class="text-xs font-bold text-[#e5e1e4] uppercase tracking-wider">
                  3. Opsi Pelengkap Eksklusif
                </span>
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <label class="flex items-center gap-2.5 p-2.5 rounded-lg bg-[#1f1f21] border border-[#353437] cursor-default opacity-90">
                    <input type="checkbox" checked disabled class="rounded text-[#d4af37] focus:ring-0 bg-[#0e0e10] border-[#4a4538]" />
                    <div class="flex flex-col">
                      <span class="text-xs text-[#e5e1e4] leading-tight font-medium">Wax Seal & Card</span>
                      <span class="text-[10px] text-[#d4af37] font-bold">GRATIS</span>
                    </div>
                  </label>

                  <label class="flex items-center gap-2.5 p-2.5 rounded-lg bg-[#1f1f21] border border-[#353437] hover:bg-[#242427] cursor-pointer transition-colors">
                    <input v-model="addons.led" type="checkbox" class="rounded text-[#d4af37] focus:ring-0 bg-[#0e0e10] border-[#4a4538]" />
                    <div class="flex flex-col">
                      <span class="text-xs text-[#e5e1e4] leading-tight font-medium">Lampu LED Peri</span>
                      <span class="text-[10px] text-[#b8b2a3]">+Rp 25.000</span>
                    </div>
                  </label>

                  <label class="flex items-center gap-2.5 p-2.5 rounded-lg bg-[#1f1f21] border border-[#353437] hover:bg-[#242427] cursor-pointer transition-colors">
                    <input v-model="addons.choco" type="checkbox" class="rounded text-[#d4af37] focus:ring-0 bg-[#0e0e10] border-[#4a4538]" />
                    <div class="flex flex-col">
                      <span class="text-xs text-[#e5e1e4] leading-tight font-medium">Cokelat Belgia</span>
                      <span class="text-[10px] text-[#b8b2a3]">+Rp 65.000</span>
                    </div>
                  </label>
                </div>
              </div>

              <!-- 4. Personalized Greeting Card Input -->
              <div class="flex flex-col gap-2">
                <div class="flex items-center justify-between text-xs">
                  <span class="font-bold text-[#e5e1e4] uppercase tracking-wider flex items-center gap-1.5">
                    <Icon name="ph:note-pencil-bold" class="w-4 h-4 text-[#d4af37]" />
                    4. Kartu Ucapan Personalisasi (Gratis)
                  </span>
                  <span class="text-[#b8b2a3] font-mono">{{ greetingCardText.length }}/200 karakter</span>
                </div>
                <textarea
                  v-model="greetingCardText"
                  maxlength="200"
                  rows="3"
                  class="w-full p-3 rounded-lg bg-[#0e0e10] border border-[#353437] text-[#e5e1e4] placeholder-[#b8b2a3]/40 text-xs focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] transition-all resize-none font-sans"
                  placeholder="Tulis pesan penuh kasih untuk penerima... Contoh: 'Happy Anniversary my love, terima kasih telah menjadi rumah tempatku berlabuh.'"
                ></textarea>
                <div class="flex items-center justify-between text-[11px] text-[#b8b2a3]">
                  <span>Ditulis tangan indah oleh kaligrafer kami dengan tinta emas & segel lilin</span>
                  <span class="text-[#d4af37] flex items-center gap-1 shrink-0">
                    <Icon name="ph:lock-fill" class="w-3.5 h-3.5" /> Privasi Terjaga
                  </span>
                </div>
              </div>

              <!-- 5. Delivery Schedule Picker -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 border-t border-[#353437]/40">
                <div class="flex flex-col gap-1.5">
                  <label class="text-xs font-bold text-[#e5e1e4] uppercase tracking-wider">
                    Tanggal Pengiriman:
                  </label>
                  <input
                    v-model="deliveryDate"
                    type="date"
                    :min="minDateString"
                    class="w-full p-2.5 rounded-lg bg-[#1f1f21] border border-[#353437] text-[#e5e1e4] text-xs focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] cursor-pointer"
                  />
                </div>
                <div class="flex flex-col gap-1.5">
                  <label class="text-xs font-bold text-[#e5e1e4] uppercase tracking-wider">
                    Slot Waktu Pengantaran:
                  </label>
                  <select
                    v-model="deliverySlot"
                    class="w-full p-2.5 rounded-lg bg-[#1f1f21] border border-[#353437] text-[#e5e1e4] text-xs focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] cursor-pointer"
                  >
                    <option value="Pagi (09:00 - 12:00 WIB)">Pagi (09:00 - 12:00 WIB)</option>
                    <option value="Siang (13:00 - 16:00 WIB)">Siang (13:00 - 16:00 WIB)</option>
                    <option value="Sore / Malam (17:00 - 20:00 WIB)">Sore / Malam (17:00 - 20:00 WIB)</option>
                    <option value="Tepat Waktu Spesial (Pilihan Jam Khusus)">Tepat Waktu Spesial (Pilihan Jam Khusus)</option>
                  </select>
                </div>
              </div>

            </div>

            <!-- Quantity & Purchasing CTAs -->
            <div class="flex flex-col gap-3">
              <div class="flex items-center gap-3">
                <!-- Quantity Counter -->
                <div class="flex items-center rounded-xl bg-[#1f1f21] border border-[#353437] p-1 shadow-sm shrink-0">
                  <button
                    type="button"
                    class="w-10 h-10 rounded-lg flex items-center justify-center hover:bg-[#242427] text-[#e5e1e4] transition-colors disabled:opacity-30"
                    :disabled="quantity <= 1"
                    @click="quantity > 1 ? quantity-- : null"
                    aria-label="Kurangi kuantitas"
                  >
                    <Icon name="ph:minus-bold" class="w-4 h-4" />
                  </button>
                  <span class="w-10 text-center font-bold text-sm text-[#e5e1e4]">{{ quantity }}</span>
                  <button
                    type="button"
                    class="w-10 h-10 rounded-lg flex items-center justify-center hover:bg-[#242427] text-[#e5e1e4] transition-colors"
                    @click="quantity++"
                    aria-label="Tambah kuantitas"
                  >
                    <Icon name="ph:plus-bold" class="w-4 h-4" />
                  </button>
                </div>

                <!-- Primary Instant Checkout CTA -->
                <button
                  type="button"
                  @click="handleInstantBuy"
                  class="flex-1 py-3.5 px-6 rounded-xl bg-[#d4af37] hover:bg-[#e9c349] text-[#0e0e10] font-sans text-sm font-bold tracking-wider uppercase flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-[0.98] cursor-pointer"
                >
                  <Icon name="ph:lightning-fill" class="w-5 h-5 text-[#0e0e10]" />
                  Beli Sekarang (Instant Checkout)
                </button>
              </div>

              <!-- Secondary Actions Strip -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  @click="handleAddToCart"
                  class="py-3 px-4 rounded-xl bg-[#1f1f21] hover:bg-[#242427] text-[#d4af37] border border-[#d4af37]/40 text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <Icon name="ph:shopping-bag-bold" class="w-4.5 h-4.5" />
                  Tambah ke Keranjang
                </button>

                <a
                  :href="waConsultHref"
                  target="_blank"
                  rel="noopener noreferrer"
                  @click="trackChannelOutbound('WhatsApp', product.id)"
                  class="py-3 px-4 rounded-xl bg-[#25D366]/15 hover:bg-[#25D366]/25 text-[#25D366] text-xs font-bold tracking-wider flex items-center justify-center gap-2 transition-colors border border-[#25D366]/30"
                >
                  <Icon name="ph:whatsapp-logo-fill" class="w-4.5 h-4.5" />
                  Konsultasi WhatsApp Florist
                </a>
              </div>

              <!-- Marketplace Multi-Channel Strip (Jika Ada Link) -->
              <div v-if="marketplaceChannels.length > 0" class="p-3 rounded-xl bg-[#18181a] border border-[#353437]/50 flex items-center justify-between gap-2 flex-wrap">
                <span class="text-xs text-[#b8b2a3]">Tersedia Juga di Marketplace:</span>
                <div class="flex items-center gap-2">
                  <a
                    v-for="ch in marketplaceChannels"
                    :key="ch.name"
                    :href="ch.storeUrl"
                    target="_blank"
                    rel="noopener noreferrer"
                    @click="trackChannelOutbound(ch.name, product.id)"
                    class="px-3 py-1.5 rounded-lg bg-[#1f1f21] hover:bg-[#242427] text-[#e5e1e4] text-xs font-semibold flex items-center gap-1.5 border border-[#353437] transition-colors"
                  >
                    <Icon :name="ch.icon" class="w-4 h-4 text-[#d4af37]" />
                    {{ ch.name }}
                  </a>
                </div>
              </div>
            </div>

            <!-- Payment Badges Assurance -->
            <div class="flex items-center justify-between p-3 rounded-lg bg-[#0e0e10] border border-[#353437]/40 text-[#b8b2a3] text-xs">
              <span class="flex items-center gap-1.5">
                <Icon name="ph:shield-check-fill" class="w-4 h-4 text-[#d4af37]" />
                Enkripsi Pembayaran 256-bit
              </span>
              <div class="flex items-center gap-1.5 text-[11px] font-semibold text-[#ccc6bb]">
                <span>BCA</span> • <span>Mandiri</span> • <span>QRIS</span> • <span>GoPay</span> • <span>Visa</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      <!-- ==========================================
           PRODUCT DETAILS / EDITORIAL TABS SECTION
           ========================================== -->
      <section class="w-full px-4 sm:px-8 lg:px-12 py-10 bg-[#0e0e10] border-t border-[#353437]/30" id="product-details">
        <div class="max-w-7xl mx-auto flex flex-col gap-8">

          <!-- Interactive Tabs Header -->
          <div class="flex items-center border-b border-[#353437]/40 overflow-x-auto gap-8 text-sm scroll-hide">
            <button
              v-for="tab in tabList"
              :key="tab.id"
              type="button"
              class="pb-3 border-b-2 font-semibold whitespace-nowrap transition-colors cursor-pointer"
              :class="activeTabId === tab.id ? 'text-[#d4af37] border-[#d4af37]' : 'text-[#b8b2a3] hover:text-[#e5e1e4] border-transparent font-medium'"
              @click="activeTabId = tab.id"
            >
              {{ tab.label }}
            </button>
          </div>

          <!-- Tab Content 1: Kisah & Filosofi Rangkaian -->
          <div v-show="activeTabId === 'tab-story'" class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-fade-in">
            <div class="lg:col-span-7 flex flex-col gap-4">
              <span class="text-xs text-[#d4af37] tracking-widest uppercase font-bold">The Botanical Narrative</span>
              <h2 class="font-serif text-2xl sm:text-3xl text-[#e5e1e4] leading-tight">
                Kemewahan Mawar Dataran Tinggi yang Bersemi Abadi
              </h2>
              <p class="text-sm text-[#b8b2a3] leading-relaxed">
                {{ product.description || 'Setiap kelopak bunga dirawat dan dikurasi secara saksama di bawah mikroiklim optimal. Rangkaian ini memadukan kelopak beludru yang tebal, warna pekat nan sensual, serta rentang ketahanan mekar dua kali lipat dibanding bunga tropis biasa.' }}
              </p>
              <p class="text-sm text-[#b8b2a3] leading-relaxed">
                Rangkaian ini dirajut secara manual oleh Master Florist HappyBouquet dengan teknik arsitektural spiral khas atelier Paris, dibalut kertas <em>Matte Korean Film</em> yang tahan air, lalu disegel dengan pita satin emas bertanda tangan cap lilin teratai HappyBouquet.
              </p>
              <div class="grid grid-cols-3 gap-4 pt-4">
                <div class="p-3.5 rounded-xl bg-[#1f1f21] border border-[#353437] text-center">
                  <span class="font-serif text-xl sm:text-2xl text-[#d4af37] font-bold">2.800m</span>
                  <p class="text-[11px] text-[#b8b2a3] mt-0.5">Elevasi Dataran Tinggi</p>
                </div>
                <div class="p-3.5 rounded-xl bg-[#1f1f21] border border-[#353437] text-center">
                  <span class="font-serif text-xl sm:text-2xl text-[#d4af37] font-bold">8.5 cm</span>
                  <p class="text-[11px] text-[#b8b2a3] mt-0.5">Rata-rata Diameter Kelopak</p>
                </div>
                <div class="p-3.5 rounded-xl bg-[#1f1f21] border border-[#353437] text-center">
                  <span class="font-serif text-xl sm:text-2xl text-[#d4af37] font-bold">7 Hari</span>
                  <p class="text-[11px] text-[#b8b2a3] mt-0.5">Garansi Kesegaran Air</p>
                </div>
              </div>
            </div>

            <div class="lg:col-span-5 relative aspect-square rounded-2xl overflow-hidden bg-[#18181a] border border-[#353437]/50 shadow-xl">
              <NuxtImg
                :src="product.image || '/default.png'"
                alt="Artisan florist hands arranging bouquet"
                class="w-full h-full object-cover"
                width="600"
                height="600"
                @error="onImgError"
              />
            </div>
          </div>

          <!-- Tab Content 2: Spesifikasi & Anatomi Bunga -->
          <div v-show="activeTabId === 'tab-specs'" class="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in">
            <div class="p-6 rounded-2xl bg-[#18181a] border border-[#353437] flex flex-col gap-4 shadow-md">
              <h3 class="font-serif text-lg text-[#e5e1e4] flex items-center gap-2 font-bold">
                <Icon name="ph:flower-lotus-fill" class="w-5 h-5 text-[#d4af37]" /> Komposisi Flora & Dedaunan
              </h3>
              <ul class="flex flex-col gap-3 text-xs text-[#b8b2a3]">
                <li
                  v-for="(comp, cIdx) in compositionSpecs"
                  :key="cIdx"
                  class="flex items-center justify-between py-2 border-b border-[#353437]/40"
                >
                  <span class="text-[#e5e1e4] font-medium">{{ comp.label }}:</span>
                  <span>{{ comp.value }}</span>
                </li>
              </ul>
            </div>

            <div class="p-6 rounded-2xl bg-[#18181a] border border-[#353437] flex flex-col gap-4 shadow-md">
              <h3 class="font-serif text-lg text-[#e5e1e4] flex items-center gap-2 font-bold">
                <Icon name="ph:ruler-bold" class="w-5 h-5 text-[#d4af37]" /> Dimensi & Material Packaging
              </h3>
              <ul class="flex flex-col gap-3 text-xs text-[#b8b2a3]">
                <li
                  v-for="(dim, dIdx) in dimensionSpecs"
                  :key="dIdx"
                  class="flex items-center justify-between py-2 border-b border-[#353437]/40"
                >
                  <span class="text-[#e5e1e4] font-medium">{{ dim.label }}:</span>
                  <span>{{ dim.value }}</span>
                </li>
              </ul>
            </div>
          </div>

          <!-- Tab Content 3: Petunjuk Perawatan (Flower Care) -->
          <div v-show="activeTabId === 'tab-care'" class="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in">
            <div
              v-for="(care, cIdx) in careInstructions"
              :key="cIdx"
              class="p-6 rounded-2xl bg-[#1f1f21] border border-[#353437] flex flex-col gap-3 shadow-md"
            >
              <div class="w-10 h-10 rounded-full bg-[#d4af37]/20 text-[#d4af37] flex items-center justify-center font-bold text-sm">
                {{ care.step || cIdx + 1 }}
              </div>
              <h4 class="font-serif text-base text-[#e5e1e4] font-bold">{{ care.title }}</h4>
              <p class="text-xs text-[#b8b2a3] leading-relaxed">
                {{ care.description }}
              </p>
            </div>
          </div>

          <!-- Tab Content 4: Ulasan Pembeli -->
          <div v-show="activeTabId === 'tab-reviews'" class="flex flex-col gap-6 animate-fade-in" id="reviews">
            <div class="p-6 rounded-2xl bg-[#18181a] border border-[#353437] grid grid-cols-1 md:grid-cols-12 gap-6 items-center shadow-md">
              <div class="md:col-span-4 flex flex-col items-center justify-center text-center p-4 border-b md:border-b-0 md:border-r border-[#353437]/40">
                <span class="font-serif text-5xl text-[#d4af37] font-bold">{{ (product.rating || 4.9).toFixed(1) }}</span>
                <div class="flex text-[#d4af37] my-2">
                  <Icon v-for="s in 5" :key="s" name="ph:star-fill" class="w-5 h-5" />
                </div>
                <span class="text-xs text-[#b8b2a3]">Berdasarkan {{ (product.reviewCount || 128).toLocaleString('id-ID') }} ulasan pembeli</span>
              </div>

              <div class="md:col-span-8 flex flex-col gap-2">
                <div class="flex items-center gap-3 text-xs">
                  <span class="w-16 text-[#e5e1e4]">5 Bintang</span>
                  <div class="flex-1 h-2 rounded-full bg-[#353437] overflow-hidden">
                    <div class="h-full bg-[#d4af37] rounded-full" style="width: 94%;"></div>
                  </div>
                  <span class="w-10 text-right text-[#b8b2a3]">94%</span>
                </div>
                <div class="flex items-center gap-3 text-xs">
                  <span class="w-16 text-[#e5e1e4]">4 Bintang</span>
                  <div class="flex-1 h-2 rounded-full bg-[#353437] overflow-hidden">
                    <div class="h-full bg-[#d4af37] rounded-full" style="width: 5%;"></div>
                  </div>
                  <span class="w-10 text-right text-[#b8b2a3]">5%</span>
                </div>
                <div class="flex items-center gap-3 text-xs">
                  <span class="w-16 text-[#e5e1e4]">3 Bintang</span>
                  <div class="flex-1 h-2 rounded-full bg-[#353437] overflow-hidden">
                    <div class="h-full bg-[#d4af37] rounded-full" style="width: 1%;"></div>
                  </div>
                  <span class="w-10 text-right text-[#b8b2a3]">1%</span>
                </div>
              </div>
            </div>

            <!-- Customer Testimonials List -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="p-5 rounded-xl bg-[#1f1f21] border border-[#353437] flex flex-col gap-3 shadow-sm">
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-full bg-[#d4af37]/20 text-[#d4af37] font-bold flex items-center justify-center text-xs">
                      AR
                    </div>
                    <div class="flex flex-col">
                      <span class="text-xs text-[#e5e1e4] font-semibold">Anindya Rahmawati</span>
                      <span class="text-[11px] text-[#b8b2a3]">Pembelian Terverifikasi • Jakarta Selatan</span>
                    </div>
                  </div>
                  <div class="flex text-[#d4af37]">
                    <Icon v-for="s in 5" :key="s" name="ph:star-fill" class="w-3.5 h-3.5" />
                  </div>
                </div>
                <p class="text-xs text-[#b8b2a3] leading-relaxed">
                  "Kualitas bunganya benar-benar tak tertandingi! Warnanya merah beludru pekat, ukurannya besar-besar dan wanginya harum sekali. Tunangan saya sampai berkaca-kaca saat kurir mengantarkan. Kartu kaligrafinya rapi sekali, wax seal-nya sangat berkelas!"
                </p>
                <span class="text-[10px] text-[#b8b2a3]/60">3 hari yang lalu • Varian Classic Matte Noir</span>
              </div>

              <div class="p-5 rounded-xl bg-[#1f1f21] border border-[#353437] flex flex-col gap-3 shadow-sm">
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-full bg-[#d4af37]/20 text-[#d4af37] font-bold flex items-center justify-center text-xs">
                      DS
                    </div>
                    <div class="flex flex-col">
                      <span class="text-xs text-[#e5e1e4] font-semibold">Dimas Satrio</span>
                      <span class="text-[11px] text-[#b8b2a3]">Pembelian Terverifikasi • BSD City</span>
                    </div>
                  </div>
                  <div class="flex text-[#d4af37]">
                    <Icon v-for="s in 5" :key="s" name="ph:star-fill" class="w-3.5 h-3.5" />
                  </div>
                </div>
                <p class="text-xs text-[#b8b2a3] leading-relaxed">
                  "Pelayanan VIP luar biasa. Sebelum dikirim, florist sempat kirim foto buket ke WhatsApp saya untuk approval. Packagingnya aman dan rapi sampai tujuan tanpa lecet setitik pun."
                </p>
                <span class="text-[10px] text-[#b8b2a3]/60">1 minggu yang lalu • Varian Grand Luxe</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      <!-- ==========================================
           RELATED CURATIONS: "MAHAKARYA PILIHAN LAINNYA"
           ========================================== -->
      <section v-if="related && related.length > 0" class="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-12">
        <div class="flex flex-col gap-8">
          <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div class="flex flex-col gap-1">
              <span class="text-xs text-[#d4af37] tracking-widest uppercase font-bold">Koleksi Terkait</span>
              <h2 class="font-serif text-2xl sm:text-3xl text-[#e5e1e4]">Mahakarya Pilihan Lainnya</h2>
            </div>
            <NuxtLink to="/products" class="text-xs text-[#d4af37] hover:text-[#f1c97d] font-bold flex items-center gap-1 transition-colors">
              Lihat Semua Koleksi Buket
              <Icon name="ph:arrow-right-bold" class="w-4 h-4" />
            </NuxtLink>
          </div>

          <!-- Curated Catalog Cards -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div
              v-for="rel in related.slice(0, 4)"
              :key="rel.id"
              class="group flex flex-col rounded-2xl bg-[#1f1f21] border border-[#353437]/50 overflow-hidden transition-all duration-300 hover:border-[#d4af37]/60 hover:shadow-2xl hover:-translate-y-1"
            >
              <NuxtLink :to="`/products/${rel.slug}`" class="relative aspect-[4/5] w-full overflow-hidden bg-[#18181a]">
                <NuxtImg
                  :src="rel.image || '/default.png'"
                  :alt="rel.name"
                  class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  width="400"
                  height="500"
                  @error="onImgError"
                />
                <span class="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-[#0e0e10]/90 backdrop-blur-md text-[#d4af37] text-[10px] uppercase font-bold border border-[#d4af37]/20">
                  {{ rel.category || 'Kurasi' }}
                </span>
              </NuxtLink>

              <div class="p-4 flex flex-col gap-2 flex-1 justify-between">
                <div class="flex flex-col gap-1">
                  <div class="flex items-center justify-between text-xs text-[#b8b2a3]">
                    <span>{{ rel.category || 'Buket Bunga' }}</span>
                    <div class="flex items-center text-[#d4af37] gap-0.5">
                      <Icon name="ph:star-fill" class="w-3.5 h-3.5" />
                      <span>4.9</span>
                    </div>
                  </div>
                  <NuxtLink :to="`/products/${rel.slug}`">
                    <h4 class="font-serif text-base text-[#e5e1e4] group-hover:text-[#d4af37] transition-colors line-clamp-1">
                      {{ rel.name }}
                    </h4>
                  </NuxtLink>
                </div>

                <div class="flex items-baseline justify-between mt-2 pt-2 border-t border-[#353437]/30">
                  <span class="font-serif text-base text-[#d4af37] font-bold">
                    {{ formatCurrency(rel.price) }}
                  </span>
                  <NuxtLink
                    :to="`/products/${rel.slug}`"
                    class="p-2 rounded-full bg-[#353437] hover:bg-[#d4af37] hover:text-[#0e0e10] text-[#e5e1e4] transition-colors"
                    title="Lihat Detail"
                  >
                    <Icon name="ph:arrow-right-bold" class="w-4 h-4" />
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Toast Feedback Popup -->
      <transition name="fade">
        <div
          v-if="toastMessage"
          class="fixed bottom-6 right-6 z-50 px-4 py-2.5 rounded-xl bg-[#d4af37] text-[#0e0e10] font-bold text-xs shadow-2xl flex items-center gap-2 border border-white/20"
        >
          <Icon name="ph:check-circle-fill" class="w-4 h-4 text-[#0e0e10]" />
          {{ toastMessage }}
        </div>
      </transition>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '~/stores/cart'
import { useWishlistStore } from '~/stores/wishlist'
import { useStoreSettings } from '~/composables/useStoreSettings'
import { useAnalytics } from '~/composables/useAnalytics'
import type { Product } from '~/composables/useProducts'

const props = defineProps<{
  product: Product | null
  related: Product[]
  loading: boolean
  error: string | null
}>()

const router = useRouter()
const cartStore = useCartStore()
const wishlistStore = useWishlistStore()
const { settings, waHref } = useStoreSettings()
const { trackChannelOutbound, trackAction } = useAnalytics()

// 1. Galeri Foto
const activeThumbIdx = ref(0)
const galleryImages = computed(() => {
  if (!props.product) return []
  if (Array.isArray(props.product.images) && props.product.images.length > 0) {
    return props.product.images
  }
  return [props.product.image || '/default.png']
})

const currentMainImage = computed(() => {
  return galleryImages.value[activeThumbIdx.value] || galleryImages.value[0] || props.product?.image || '/default.png'
})

// 2. Opsi Tangkai / Ukuran
const defaultSizes = [
  { id: 'standard', stems: '20 Tangkai', name: 'Standard', priceModifier: 0, priceModifierText: 'Sesuai Katalog', diameter: 'Diameter ~45cm', label: '20 Tangkai (Standard)' },
  { id: 'grand', stems: '35 Tangkai', name: 'Grand Luxe', priceModifier: 250000, priceModifierText: '+Rp 250.000', diameter: 'Diameter ~60cm', label: '35 Tangkai (Grand Luxe)' },
  { id: 'sovereign', stems: '50 Tangkai', name: 'Sovereign', priceModifier: 550000, priceModifierText: '+Rp 550.000', diameter: 'Diameter ~75cm', label: '50 Tangkai (Sovereign)' },
]

const sizeOptions = computed(() => {
  const custom = props.product?.variants?.sizes
  if (Array.isArray(custom) && custom.length > 0) {
    return custom.map((s: any, idx: number) => {
      const pMod = Number(s.priceModifier || 0)
      return {
        id: s.id || `size-${idx}`,
        stems: s.stems || s.name || `Pilihan ${idx + 1}`,
        name: s.name || `Varian ${idx + 1}`,
        priceModifier: pMod,
        priceModifierText: pMod === 0 ? 'Sesuai Katalog' : `+${formatCurrency(pMod)}`,
        diameter: s.diameter || '',
        label: s.label || `${s.stems || s.name} (${s.name})`
      }
    })
  }
  return defaultSizes
})

const userSelectedSize = ref<any>(null)
const selectedSize = computed({
  get: () => {
    if (userSelectedSize.value && sizeOptions.value.some((s: any) => s.id === userSelectedSize.value.id)) {
      return userSelectedSize.value
    }
    return sizeOptions.value[0] || defaultSizes[0]
  },
  set: (val: any) => {
    userSelectedSize.value = val
  }
})

// 3. Opsi Warna Wrapping
const defaultWrappings = [
  { name: 'Classic Matte Noir', color: '#171719' },
  { name: 'Pure Pearl White', color: '#ebe7df' },
  { name: 'Emerald Forest', color: '#1b3b2b' },
  { name: 'Royal Champagne Gold', color: '#c5a059' },
]

const wrappingOptions = computed(() => {
  const custom = props.product?.variants?.wrappings
  if (Array.isArray(custom) && custom.length > 0) {
    return custom.map((w: any) => ({
      name: w.name || 'Warna Custom',
      color: w.color || '#d4af37'
    }))
  }
  return defaultWrappings
})

const userSelectedWrapping = ref<any>(null)
const selectedWrapping = computed({
  get: () => {
    if (userSelectedWrapping.value && wrappingOptions.value.some((w: any) => w.name === userSelectedWrapping.value.name)) {
      return userSelectedWrapping.value
    }
    return wrappingOptions.value[0] || defaultWrappings[0]
  },
  set: (val: any) => {
    userSelectedWrapping.value = val
  }
})

// 4. Opsi Pelengkap (Addons)
const addons = ref({
  led: false,
  choco: false,
})

const addOnsTotal = computed(() => {
  let total = 0
  if (addons.value.led) total += 25000
  if (addons.value.choco) total += 65000
  return total
})

// 5. Kartu Ucapan & Jadwal Kirim
const greetingCardText = ref('')
const today = new Date()
const minDateString = today.toISOString().split('T')[0]
const deliveryDate = ref(minDateString)
const deliverySlot = ref('Siang (13:00 - 16:00 WIB)')

// 6. Quantity Counter
const quantity = ref(1)

// 7. Kalkulasi Harga
const baseProductPrice = computed(() => Number(props.product?.price || 0))
const baseOriginalPrice = computed(() => Number(props.product?.originalPrice || 0))

const calculatedTotalUnit = computed(() => {
  return baseProductPrice.value + selectedSize.value.priceModifier + addOnsTotal.value
})

const calculatedOriginalTotalUnit = computed(() => {
  if (!baseOriginalPrice.value) return 0
  return baseOriginalPrice.value + selectedSize.value.priceModifier + addOnsTotal.value
})

const discountBadge = computed(() => {
  if (!calculatedOriginalTotalUnit.value || calculatedOriginalTotalUnit.value <= calculatedTotalUnit.value) {
    return null
  }
  const diff = calculatedOriginalTotalUnit.value - calculatedTotalUnit.value
  const pct = Math.round((diff / calculatedOriginalTotalUnit.value) * 100)
  return `Hemat ${formatCurrency(diff)} (${pct}%)`
})

// 8. Dynamic Tabs & Specs
const defaultComposition = computed(() => [
  { label: 'Bunga Utama', value: `${props.product?.name || 'Mawar'} (Grade AAA Pilihan)` },
  { label: 'Bunga Aksen', value: "Baby's Breath Putih Kering Premium (Million Star)" },
  { label: 'Dedaunan Aromatik', value: 'Eucalyptus Cinerea & Italian Ruscus Hijau' },
  { label: 'Nutrisi & Hidrasi', value: 'Florist Water Sponge dengan Floral Food' },
])

const compositionSpecs = computed(() => {
  const specs = props.product?.specifications?.composition
  if (Array.isArray(specs) && specs.length > 0) return specs
  return defaultComposition.value
})

const defaultDimensions = [
  { label: 'Tinggi Total', value: '± 55 cm (Hingga ujung wrapping luar)' },
  { label: 'Diameter Buket', value: '± 45 cm (Kubah bervolume penuh)' },
  { label: 'Material Pembungkus', value: 'Matte Korean Waterproof Paper 120gsm' },
  { label: 'Finishing Aksen', value: 'Pita Satin Champagne Gold & Stempel Lilin Segel' },
]

const dimensionSpecs = computed(() => {
  const specs = props.product?.specifications?.dimensions
  if (Array.isArray(specs) && specs.length > 0) return specs
  return defaultDimensions
})

const defaultCare = [
  { step: 1, title: 'Potong Tangkai 45°', description: 'Jika dipindahkan ke dalam vas, potong ujung tangkai 1-2 cm secara miring 45 derajat menggunakan gunting tajam di bawah air mengalir agar pori batang tetap terbuka menyerap nutrisi.' },
  { step: 2, title: 'Ganti Air Bersih', description: 'Ganti air dalam vas setiap 2 hari sekali. Campurkan nutrisi bunga yang kami sertakan di dalam amplop untuk mencegah timbulnya bakteri pada air.' },
  { step: 3, title: 'Suhu & Sirkulasi', description: 'Jauhkan rangkaian bunga dari paparan sinar matahari langsung, kipas angin kencang, dan hembusan langsung AC. Tempatkan di ruangan sejuk dengan suhu 18°C - 24°C.' },
]

const careInstructions = computed(() => {
  const care = props.product?.specifications?.careInstructions
  if (Array.isArray(care) && care.length > 0) return care
  return defaultCare
})

const tabList = computed(() => [
  { id: 'tab-story', label: 'Kisah & Filosofi Rangkaian' },
  { id: 'tab-specs', label: 'Spesifikasi & Anatomi Bunga' },
  { id: 'tab-care', label: 'Petunjuk Perawatan (Flower Care)' },
  { id: 'tab-reviews', label: `Ulasan Pembeli (${(props.product?.reviewCount || 128).toLocaleString('id-ID')})` },
])
const activeTabId = ref('tab-story')
const switchTab = (tabId: string) => {
  activeTabId.value = tabId
  const el = document.getElementById('product-details')
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

// 9. Marketplace Channels
const marketplaceChannels = computed(() =>
  (props.product?.orderChannels || [])
    .filter((c: any) => c?.is_active && c?.name !== 'WhatsApp' && c?.ProductOrderChannel?.store_url)
    .map((c: any) => ({
      name: c.name,
      storeUrl: c.ProductOrderChannel.store_url,
      icon: c.name === 'Shopee' ? 'ph:storefront-fill' : c.name === 'TikTok' ? 'ph:tiktok-logo-fill' : 'ph:shopping-bag-fill',
    }))
)

// 10. WhatsApp Link
const waConsultHref = computed(() => {
  const pName = props.product?.name || 'Buket Bunga'
  const text = `Halo ${settings.brand_name || 'HappyBouquet'}, saya tertarik dengan ${pName} varian ${selectedSize.value.label}. Boleh info lanjut dan ketersediaan slotnya?`
  return waHref(text)
})

// 11. Wishlist Handler
const isWishlisted = computed(() => {
  if (!props.product) return false
  return wishlistStore.isWishlisted(props.product.id)
})

const toggleWishlist = () => {
  if (!props.product) return
  wishlistStore.toggleItem(props.product)
  showToast(isWishlisted.value ? 'Disimpan ke Wishlist' : 'Dihapus dari Wishlist')
}

// 12. Share Handler
const toastMessage = ref('')
let toastTimer: any = null
const showToast = (msg: string) => {
  toastMessage.value = msg
  if (toastTimer) clearTimeout(toastTimer)
  toastTimer = setTimeout(() => {
    toastMessage.value = ''
  }, 2500)
}

const shareProduct = async () => {
  if (typeof window === 'undefined') return
  const url = window.location.href
  const title = props.product?.name || 'HappyBouquet'
  if (navigator.share) {
    try {
      await navigator.share({ title, url })
    } catch {
      // User cancelled share
    }
  } else {
    try {
      await navigator.clipboard.writeText(url)
      showToast('Tautan produk berhasil disalin ke clipboard!')
    } catch {
      showToast('Salin URL: ' + url)
    }
  }
}

// 13. Cart Action Helpers
const buildCartPayload = () => {
  if (!props.product) return null
  const selectedAddons: string[] = ['Wax Seal & Greeting Card']
  if (addons.value.led) selectedAddons.push('Lampu LED Peri')
  if (addons.value.choco) selectedAddons.push('Cokelat Belgia')

  return {
    id: props.product.id,
    name: props.product.name,
    price: calculatedTotalUnit.value,
    image: currentMainImage.value,
    quantity: quantity.value,
    variants: {
      'Tangkai/Ukuran': selectedSize.value.label,
      'Kertas Wrapping': selectedWrapping.value.name,
      'Pelengkap': selectedAddons.join(', '),
      'Pesan Kartu': greetingCardText.value || '(Tanpa Pesan)',
      'Jadwal Pengiriman': `${deliveryDate.value} (${deliverySlot.value})`,
    },
  }
}

const handleAddToCart = () => {
  const payload = buildCartPayload()
  if (payload) {
    cartStore.addItem(payload as any)
    trackAction('add_to_cart', {
      product_id: payload.id,
      name: payload.name,
      price: payload.price,
      quantity: payload.quantity,
    })
    showToast('Berhasil dimasukkan ke keranjang!')
  }
}

const handleInstantBuy = () => {
  const payload = buildCartPayload()
  if (payload) {
    cartStore.addItem(payload as any)
    trackAction('add_to_cart', {
      product_id: payload.id,
      name: payload.name,
      price: payload.price,
      quantity: payload.quantity,
    })
    router.push('/checkout')
  }
}

// Format Currency
const formatCurrency = (val: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(val)
}

// Safe Image Error Handler
const onImgError = (e: any) => {
  if (e?.target && e.target.src !== '/default.png') {
    e.target.src = '/default.png'
  }
}

// SEO Head
useHead({ title: computed(() => props.product?.name ? `${props.product.name} — Artisan Florist Jakarta` : 'Detail Produk') })
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.8s cubic-bezier(0.22, 1, 0.36, 1);
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
}

.scroll-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.scroll-hide::-webkit-scrollbar {
  display: none;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
