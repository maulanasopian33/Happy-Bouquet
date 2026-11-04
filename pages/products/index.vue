<template>
  <div class="min-h-screen bg-[#0e0e10] text-[#e5e1e4] font-sans antialiased selection:bg-[#d4af37] selection:text-[#0e0e10] transition-colors duration-500 pb-20">
    
    <!-- ========================================================================= -->
    <!-- 1. TOP BREADCRUMB & EDITORIAL HEADER                                     -->
    <!-- ========================================================================= -->
    <section class="relative w-full px-4 sm:px-6 lg:px-12 pt-8 pb-10 overflow-hidden border-b border-[#4a4538]/25">
      <!-- Subtle Auric Ambient Glow -->
      <div class="absolute -top-32 left-1/2 -translate-x-1/2 w-[720px] h-[320px] bg-[#d4af37]/10 rounded-full blur-[120px] pointer-events-none" />

      <div class="max-w-7xl mx-auto flex flex-col gap-6 relative z-10">
        <!-- Breadcrumb -->
        <nav aria-label="Breadcrumb" class="flex items-center gap-2 text-xs sm:text-sm text-[#b8b2a3] flex-wrap">
          <NuxtLink to="/" class="hover:text-[#d4af37] transition-colors">Beranda</NuxtLink>
          <span class="opacity-40">/</span>
          <span class="hover:text-[#d4af37] transition-colors cursor-pointer" @click="resetFilters">Katalog Koleksi</span>
          <span class="opacity-40">/</span>
          <span class="text-[#d4af37] font-semibold">Buket &amp; Rangkaian Mewah</span>
        </nav>

        <!-- Editorial Title & Narrative -->
        <div class="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pt-1">
          <div class="max-w-3xl flex flex-col gap-3">
            <div class="inline-flex items-center gap-2 self-start px-3 py-1 rounded-full bg-[#242427] border border-[#d4af37]/30 text-[#d4af37] text-[11px] font-bold tracking-[0.2em] uppercase">
              <span class="w-2 h-2 rounded-full bg-[#d4af37] animate-pulse"></span>
              Haute Botanique 2025
            </div>

            <h1 class="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#e5e1e4] tracking-tight leading-tight">
              Koleksi Rangkaian Bunga &amp; Buket Mewah
            </h1>

            <p class="text-sm sm:text-base text-[#b8b2a3] leading-relaxed max-w-2xl">
              Setiap tangkai mawar impor dan kelopak botanik dipilih saat fajar merekah, dirangkai cermat oleh master florist bersertifikat untuk mengabadikan momen cinta, kelulusan, dan apresiasi penuh martabat.
            </p>
          </div>

          <!-- Quick Metatags / Counter Pill -->
          <div class="flex items-center gap-4 py-2.5 px-4 rounded-2xl bg-[#18181a] border border-[#4a4538]/30 text-[#b8b2a3] self-start lg:self-auto shrink-0 shadow-lg">
            <div class="flex flex-col text-right">
              <span class="text-[10px] font-bold tracking-wider text-[#d4af37] uppercase">Kurasi Aktif</span>
              <span class="font-serif text-xl sm:text-2xl text-[#e5e1e4] font-bold">
                {{ filteredProducts.length }} <span class="text-xs text-[#ccc6bb] font-sans font-normal">Komposisi</span>
              </span>
            </div>
            <div class="w-px h-8 bg-[#353437]"></div>
            <div class="flex items-center gap-2 text-[#d4af37]">
              <Icon name="ph:seal-check-fill" class="w-5 h-5 text-[#d4af37]" />
              <span class="text-xs text-[#ccc6bb] leading-tight font-medium">100% Bunga Asli Segar</span>
            </div>
          </div>
        </div>

        <!-- Quick Category Navigation Chips -->
        <div class="flex items-center gap-2 overflow-x-auto no-scrollbar pt-2 pb-1">
          <button
            v-for="cat in quickCategories"
            :key="cat.id"
            @click="setCategory(cat.id)"
            class="flex-shrink-0 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-200 border"
            :class="selectedCategory === cat.id
              ? 'bg-[#d4af37] border-[#d4af37] text-[#131315] font-bold shadow-md shadow-[#d4af37]/20 scale-[1.02]'
              : 'bg-[#18181a] border-[#4a4538]/40 text-[#ccc6bb] hover:border-[#d4af37]/50 hover:text-[#e5e1e4]'"
          >
            {{ cat.name }} <span class="opacity-70 text-[10px] ml-1">({{ cat.count }})</span>
          </button>
        </div>
      </div>
    </section>

    <!-- ========================================================================= -->
    <!-- 2. MAIN CATALOG BODY (SIDEBAR + MAIN CONTENT AREA)                        -->
    <!-- ========================================================================= -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-8">
      <div class="flex flex-col lg:flex-row gap-8 items-start">
        
        <!-- ==================== LEFT FILTER SIDEBAR (DESKTOP) ==================== -->
        <aside class="hidden lg:flex w-72 shrink-0 flex-col gap-6 bg-[#18181a] border border-[#4a4538]/30 rounded-2xl p-5 sticky top-24 shadow-xl">
          <!-- Sidebar Header -->
          <div class="flex items-center justify-between pb-3 border-b border-[#4a4538]/30">
            <div class="flex items-center gap-2">
              <Icon name="ph:sliders-horizontal-bold" class="text-[#d4af37] w-5 h-5" />
              <h3 class="font-serif text-base text-[#e5e1e4] font-semibold tracking-wide">Filter Koleksi</h3>
            </div>
            <button
              @click="resetFilters"
              class="text-xs text-[#d4af37] hover:underline font-medium cursor-pointer"
            >
              Reset Semua
            </button>
          </div>

          <!-- Kecepatan Pengiriman -->
          <div class="flex flex-col gap-2.5 pb-4 border-b border-[#4a4538]/20">
            <span class="text-[11px] font-bold tracking-wider text-[#d4af37] uppercase">Waktu Pengiriman</span>
            <label class="flex items-center justify-between text-xs text-[#ccc6bb] hover:text-[#e5e1e4] cursor-pointer select-none">
              <div class="flex items-center gap-2.5">
                <input
                  type="radio"
                  name="delivery"
                  value="all"
                  v-model="deliveryFilter"
                  class="w-3.5 h-3.5 text-[#d4af37] bg-[#1f1f21] border-[#4a4538] focus:ring-0"
                />
                <span>Semua Jadwal</span>
              </div>
              <span class="text-[11px] text-[#b8b2a3]">({{ allProducts.length }})</span>
            </label>
            <label class="flex items-center justify-between text-xs text-[#ccc6bb] hover:text-[#e5e1e4] cursor-pointer select-none">
              <div class="flex items-center gap-2.5">
                <input
                  type="radio"
                  name="delivery"
                  value="sameday"
                  v-model="deliveryFilter"
                  class="w-3.5 h-3.5 text-[#d4af37] bg-[#1f1f21] border-[#4a4538] focus:ring-0"
                />
                <span class="flex items-center gap-1.5">
                  <Icon name="ph:lightning-fill" class="text-[#d4af37] w-3.5 h-3.5" /> Kirim Hari Ini (Same Day)
                </span>
              </div>
              <span class="text-[11px] text-[#b8b2a3]">({{ samedayCount }})</span>
            </label>
            <label class="flex items-center justify-between text-xs text-[#ccc6bb] hover:text-[#e5e1e4] cursor-pointer select-none">
              <div class="flex items-center gap-2.5">
                <input
                  type="radio"
                  name="delivery"
                  value="preorder"
                  v-model="deliveryFilter"
                  class="w-3.5 h-3.5 text-[#d4af37] bg-[#1f1f21] border-[#4a4538] focus:ring-0"
                />
                <span class="flex items-center gap-1.5">
                  <Icon name="ph:calendar-blank-bold" class="text-[#b8b2a3] w-3.5 h-3.5" /> Terjadwal / Besok
                </span>
              </div>
              <span class="text-[11px] text-[#b8b2a3]">({{ preorderCount }})</span>
            </label>
          </div>

          <!-- Jenis Bunga -->
          <div class="flex flex-col gap-2.5 pb-4 border-b border-[#4a4538]/20">
            <span class="text-[11px] font-bold tracking-wider text-[#d4af37] uppercase">Jenis Bunga</span>
            <div class="flex flex-col gap-2 max-h-48 overflow-y-auto pr-1 no-scrollbar text-xs">
              <label
                v-for="flower in flowerOptions"
                :key="flower.name"
                class="flex items-center justify-between text-[#ccc6bb] hover:text-[#e5e1e4] cursor-pointer select-none"
              >
                <div class="flex items-center gap-2.5">
                  <input
                    type="checkbox"
                    :value="flower.name"
                    v-model="selectedFlowers"
                    class="w-3.5 h-3.5 rounded bg-[#1f1f21] border-[#4a4538] text-[#d4af37] focus:ring-0"
                  />
                  <span>{{ flower.name }}</span>
                </div>
                <span class="text-[10px] text-[#b8b2a3]">({{ flower.count }})</span>
              </label>
            </div>
          </div>

          <!-- Pilihan Acara / Momen -->
          <div class="flex flex-col gap-2.5 pb-4 border-b border-[#4a4538]/20">
            <span class="text-[11px] font-bold tracking-wider text-[#d4af37] uppercase">Pilihan Acara / Momen</span>
            <div class="flex flex-col gap-2 max-h-44 overflow-y-auto pr-1 no-scrollbar text-xs">
              <label
                v-for="occ in occasionOptions"
                :key="occ.name"
                class="flex items-center justify-between text-[#ccc6bb] hover:text-[#e5e1e4] cursor-pointer select-none"
              >
                <div class="flex items-center gap-2.5">
                  <input
                    type="checkbox"
                    :value="occ.name"
                    v-model="selectedOccasions"
                    class="w-3.5 h-3.5 rounded bg-[#1f1f21] border-[#4a4538] text-[#d4af37] focus:ring-0"
                  />
                  <span>{{ occ.name }}</span>
                </div>
                <span class="text-[10px] text-[#b8b2a3]">({{ occ.count }})</span>
              </label>
            </div>
          </div>

          <!-- Rentang Harga -->
          <div class="flex flex-col gap-3 pb-4 border-b border-[#4a4538]/20">
            <div class="flex items-center justify-between">
              <span class="text-[11px] font-bold tracking-wider text-[#d4af37] uppercase">Rentang Harga</span>
              <span v-if="priceMin || priceMax" @click="resetPriceRange" class="text-[10px] text-[#d4af37] hover:underline cursor-pointer">Reset</span>
            </div>

            <!-- Quick Radio Chips -->
            <div class="grid grid-cols-2 gap-1.5">
              <button
                v-for="r in priceRanges"
                :key="r.id"
                @click="applyQuickPriceRange(r.min, r.max, r.id)"
                type="button"
                class="px-2 py-1.5 rounded-lg text-[11px] border text-left transition-all truncate"
                :class="activePriceRangeId === r.id
                  ? 'bg-[#d4af37]/20 border-[#d4af37] text-[#d4af37] font-semibold'
                  : 'bg-[#1f1f21] border-[#4a4538]/40 text-[#ccc6bb] hover:border-[#d4af37]/40'"
              >
                {{ r.label }}
              </button>
            </div>

            <!-- Inputs Min & Max -->
            <div class="flex items-center gap-2 pt-1">
              <div class="flex-1 flex flex-col gap-1">
                <span class="text-[10px] text-[#b8b2a3] uppercase font-bold">Min (Rp)</span>
                <input
                  type="number"
                  v-model.number="priceMin"
                  @input="activePriceRangeId = ''"
                  placeholder="0"
                  class="w-full px-2.5 py-1.5 rounded-lg bg-[#1f1f21] border border-[#4a4538]/50 text-xs text-[#e5e1e4] focus:outline-none focus:border-[#d4af37]"
                />
              </div>
              <span class="text-[#4a4538] pt-4">-</span>
              <div class="flex-1 flex flex-col gap-1">
                <span class="text-[10px] text-[#b8b2a3] uppercase font-bold">Max (Rp)</span>
                <input
                  type="number"
                  v-model.number="priceMax"
                  @input="activePriceRangeId = ''"
                  placeholder="3000000"
                  class="w-full px-2.5 py-1.5 rounded-lg bg-[#1f1f21] border border-[#4a4538]/50 text-xs text-[#e5e1e4] focus:outline-none focus:border-[#d4af37]"
                />
              </div>
            </div>
          </div>

          <!-- Jenis Wadah & Kemasan -->
          <div class="flex flex-col gap-2 pb-4 border-b border-[#4a4538]/20">
            <span class="text-[11px] font-bold tracking-wider text-[#d4af37] uppercase">Wadah &amp; Kemasan</span>
            <div class="flex flex-col gap-2 text-xs">
              <label
                v-for="pkg in packagingOptions"
                :key="pkg"
                class="flex items-center gap-2.5 text-[#ccc6bb] hover:text-[#e5e1e4] cursor-pointer select-none"
              >
                <input
                  type="checkbox"
                  :value="pkg"
                  v-model="selectedPackaging"
                  class="w-3.5 h-3.5 rounded bg-[#1f1f21] border-[#4a4538] text-[#d4af37] focus:ring-0"
                />
                <span>{{ pkg }}</span>
              </label>
            </div>
          </div>

          <!-- Palet Warna Bunga -->
          <div class="flex flex-col gap-2.5 pb-2">
            <span class="text-[11px] font-bold tracking-wider text-[#d4af37] uppercase">Palet Warna Utama</span>
            <div class="flex flex-wrap gap-2">
              <button
                v-for="color in colorOptions"
                :key="color.name"
                @click="toggleColor(color.name)"
                type="button"
                class="flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[11px] transition-all"
                :class="selectedColors.includes(color.name)
                  ? 'bg-[#d4af37]/20 border-[#d4af37] text-[#d4af37] font-semibold'
                  : 'bg-[#1f1f21] border-[#4a4538]/40 text-[#ccc6bb] hover:border-[#d4af37]/30'"
              >
                <span class="w-2.5 h-2.5 rounded-full" :style="{ backgroundColor: color.hex }"></span>
                <span>{{ color.name }}</span>
              </button>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex flex-col gap-2 pt-2">
            <button
              @click="windowScrollToCatalog"
              class="w-full py-2.5 rounded-xl bg-[#d4af37] hover:bg-[#ffe088] text-[#131315] font-bold text-xs uppercase tracking-wider transition-all shadow-md active:scale-98"
            >
              Terapkan Filter ({{ filteredProducts.length }})
            </button>
            <button
              @click="resetFilters"
              class="w-full py-2 rounded-xl bg-transparent border border-[#4a4538]/40 hover:border-[#d4af37]/50 text-[#ccc6bb] hover:text-[#e5e1e4] text-xs font-semibold uppercase tracking-wider transition-all"
            >
              Reset ke Default
            </button>
          </div>
        </aside>

        <!-- ==================== RIGHT / MAIN CONTENT AREA ==================== -->
        <main class="flex-1 flex flex-col gap-6 min-w-0 w-full">
          
          <!-- Interactive Control & View Header -->
          <div class="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-[#18181a] border border-[#4a4538]/30 rounded-2xl p-4 shadow-md">
            
            <!-- Search Bar -->
            <div class="relative flex-1 max-w-md">
              <Icon name="ph:magnifying-glass-bold" class="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#b8b2a3]" />
              <input
                type="text"
                v-model="searchQuery"
                placeholder="Cari mawar, peony, warna, atau momen..."
                class="w-full pl-10 pr-9 py-2.5 rounded-xl bg-[#1f1f21] border border-[#4a4538]/40 text-xs sm:text-sm text-[#e5e1e4] placeholder:text-[#b8b2a3]/60 focus:outline-none focus:border-[#d4af37] transition-all"
              />
              <button
                v-if="searchQuery"
                @click="searchQuery = ''"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-[#b8b2a3] hover:text-[#d4af37] transition-colors"
              >
                <Icon name="ph:x-circle-fill" class="w-4 h-4" />
              </button>
            </div>

            <!-- Right Controls: Filter Drawer Toggle (Mobile) + Sort & Grid Switcher -->
            <div class="flex items-center justify-between md:justify-end gap-3 shrink-0">
              <!-- Mobile Filter Trigger -->
              <button
                @click="isMobileFilterOpen = true"
                class="lg:hidden flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-[#1f1f21] border border-[#4a4538]/40 text-xs font-bold text-[#e5e1e4] hover:border-[#d4af37]/50 transition-colors"
              >
                <Icon name="ph:sliders-horizontal-bold" class="w-4 h-4 text-[#d4af37]" />
                <span>Filter</span>
                <span v-if="activeFilterCount > 0" class="w-4 h-4 rounded-full bg-[#d4af37] text-[#131315] text-[10px] font-black flex items-center justify-center">
                  {{ activeFilterCount }}
                </span>
              </button>

              <!-- Sort Selection -->
              <div class="relative">
                <select
                  v-model="sortBy"
                  class="appearance-none bg-[#1f1f21] border border-[#4a4538]/40 text-xs font-semibold text-[#e5e1e4] rounded-xl pl-3.5 pr-8 py-2.5 cursor-pointer focus:outline-none focus:border-[#d4af37]"
                >
                  <option value="curator">Pilihan Kurator (Terbaru)</option>
                  <option value="popular">Terpopuler &amp; Diminati</option>
                  <option value="price_asc">Harga: Terendah ke Tertinggi</option>
                  <option value="price_desc">Harga: Tertinggi ke Terendah</option>
                  <option value="rating">Rating Bintang Tertinggi</option>
                </select>
                <Icon name="ph:caret-down-bold" class="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#b8b2a3] pointer-events-none" />
              </div>

              <!-- Grid Column View Switcher (Desktop) -->
              <div class="hidden sm:flex items-center gap-1 p-1 bg-[#1f1f21] border border-[#4a4538]/40 rounded-xl">
                <button
                  @click="gridCols = 3"
                  :title="'Tampilan 3 Kolom'"
                  class="w-7 h-7 flex items-center justify-center rounded-lg transition-colors"
                  :class="gridCols === 3 ? 'bg-[#353437] text-[#d4af37] shadow-sm' : 'text-[#ccc6bb] hover:text-[#e5e1e4]'"
                >
                  <Icon name="ph:squares-four-fill" class="w-4 h-4" />
                </button>
                <button
                  @click="gridCols = 4"
                  :title="'Tampilan 4 Kolom'"
                  class="w-7 h-7 flex items-center justify-center rounded-lg transition-colors"
                  :class="gridCols === 4 ? 'bg-[#353437] text-[#d4af37] shadow-sm' : 'text-[#ccc6bb] hover:text-[#e5e1e4]'"
                >
                  <Icon name="ph:grid-four-fill" class="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>

          <!-- Active Filter Pill Indicator Strip -->
          <div v-if="hasActiveFilters" class="flex flex-wrap items-center gap-2 p-3 rounded-xl bg-[#18181a] border border-[#4a4538]/25 text-xs">
            <span class="text-[#b8b2a3] font-medium mr-1">Filter Aktif:</span>
            
            <span v-if="searchQuery" class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#1f1f21] border border-[#d4af37]/40 text-[#d4af37]">
              Pencarian: "{{ searchQuery }}"
              <button @click="searchQuery = ''" class="hover:text-white"><Icon name="ph:x-bold" class="w-3 h-3" /></button>
            </span>

            <span v-if="selectedCategory !== 'all'" class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#1f1f21] border border-[#d4af37]/40 text-[#d4af37]">
              Kategori: {{ selectedCategoryName }}
              <button @click="selectedCategory = 'all'" class="hover:text-white"><Icon name="ph:x-bold" class="w-3 h-3" /></button>
            </span>

            <span v-if="deliveryFilter !== 'all'" class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#1f1f21] border border-[#d4af37]/40 text-[#d4af37]">
              {{ deliveryFilter === 'sameday' ? 'Same Day' : 'Terjadwal' }}
              <button @click="deliveryFilter = 'all'" class="hover:text-white"><Icon name="ph:x-bold" class="w-3 h-3" /></button>
            </span>

            <span v-for="fl in selectedFlowers" :key="fl" class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#1f1f21] border border-[#d4af37]/40 text-[#d4af37]">
              Bunga: {{ fl }}
              <button @click="removeFlower(fl)" class="hover:text-white"><Icon name="ph:x-bold" class="w-3 h-3" /></button>
            </span>

            <span v-for="occ in selectedOccasions" :key="occ" class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#1f1f21] border border-[#d4af37]/40 text-[#d4af37]">
              Momen: {{ occ }}
              <button @click="removeOccasion(occ)" class="hover:text-white"><Icon name="ph:x-bold" class="w-3 h-3" /></button>
            </span>

            <span v-if="priceMin || priceMax" class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#1f1f21] border border-[#d4af37]/40 text-[#d4af37]">
              Harga: {{ priceMin ? formatShortRupiah(priceMin) : '0' }} - {{ priceMax ? formatShortRupiah(priceMax) : '∞' }}
              <button @click="resetPriceRange" class="hover:text-white"><Icon name="ph:x-bold" class="w-3 h-3" /></button>
            </span>

            <span v-for="clr in selectedColors" :key="clr" class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#1f1f21] border border-[#d4af37]/40 text-[#d4af37]">
              Warna: {{ clr }}
              <button @click="toggleColor(clr)" class="hover:text-white"><Icon name="ph:x-bold" class="w-3 h-3" /></button>
            </span>

            <button
              @click="resetFilters"
              class="text-xs text-[#d4af37] hover:underline font-semibold ml-auto"
            >
              Hapus Semua
            </button>
          </div>

          <!-- Top Curator's Highlight Strip / Mini Promo Bar -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            <!-- Curator Pick Mini Card -->
            <div
              v-if="curatorPick"
              class="rounded-xl bg-[#18181a] border border-[#4a4538]/30 p-3.5 flex items-center gap-3.5 hover:border-[#d4af37]/40 transition-colors shadow-sm"
            >
              <div class="w-14 h-16 rounded-lg bg-[#242427] overflow-hidden shrink-0 relative">
                <NuxtImg
                  :src="curatorPick.image || '/default.png'"
                  :alt="curatorPick.name"
                  class="w-full h-full object-cover"
                  loading="lazy"
                  @error="onImgError"
                />
              </div>
              <div class="flex-1 min-w-0">
                <span class="text-[10px] font-bold text-[#d4af37] uppercase tracking-wider block">Pilihan Kurator</span>
                <NuxtLink :to="`/products/${curatorPick.slug}`" class="text-xs font-semibold text-[#e5e1e4] hover:text-[#d4af37] transition-colors truncate block">
                  {{ curatorPick.name }}
                </NuxtLink>
                <span class="text-xs font-serif text-[#d4af37] font-bold block mt-0.5">
                  {{ formatPrice(curatorPick.price) }}
                </span>
              </div>
              <NuxtLink
                :to="`/products/${curatorPick.slug}`"
                class="w-8 h-8 rounded-full bg-[#1f1f21] border border-[#4a4538]/40 hover:border-[#d4af37] text-[#d4af37] flex items-center justify-center shrink-0 transition-colors"
                title="Lihat Detail"
              >
                <Icon name="ph:arrow-right-bold" class="w-4 h-4" />
              </NuxtLink>
            </div>

            <!-- Mini Cart Quick Overview (ClientOnly) -->
            <ClientOnly>
              <div class="rounded-xl bg-[#18181a] border border-[#4a4538]/30 p-3.5 flex items-center justify-between gap-3 shadow-sm">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-full bg-[#d4af37]/15 text-[#d4af37] flex items-center justify-center">
                    <Icon name="ph:bag-simple-bold" class="w-5 h-5" />
                  </div>
                  <div class="flex flex-col">
                    <span class="text-[10px] uppercase font-bold text-[#b8b2a3] tracking-wider">Keranjang Belanja</span>
                    <span class="text-xs font-bold text-[#e5e1e4]">
                      {{ cartStore.totalItems }} Item <span class="text-[#b8b2a3] font-normal">({{ cartStore.formattedTotalPrice }})</span>
                    </span>
                  </div>
                </div>
                <button
                  @click="cartStore.showCart(true)"
                  class="px-3 py-1.5 rounded-lg bg-[#1f1f21] border border-[#d4af37]/40 hover:bg-[#d4af37] hover:text-[#131315] text-[#d4af37] text-xs font-bold uppercase tracking-wider transition-all"
                >
                  Lihat
                </button>
              </div>
              <template #fallback>
                <div class="rounded-xl bg-[#18181a] border border-[#4a4538]/30 p-3.5 flex items-center gap-3">
                  <div class="w-10 h-10 rounded-full bg-[#1f1f21] text-[#b8b2a3] flex items-center justify-center">
                    <Icon name="ph:bag-simple-bold" class="w-5 h-5" />
                  </div>
                  <span class="text-xs text-[#b8b2a3]">Memuat keranjang...</span>
                </div>
              </template>
            </ClientOnly>

            <!-- Bespoke Promo Banner -->
            <div class="rounded-xl bg-gradient-to-r from-[#242427] to-[#1f1f21] border border-[#d4af37]/30 p-3.5 flex items-center justify-between gap-3 shadow-sm">
              <div class="flex flex-col min-w-0">
                <span class="text-[10px] font-bold text-[#d4af37] uppercase tracking-wider flex items-center gap-1">
                  <Icon name="ph:sparkle-fill" class="w-3 h-3" /> Custom Atelier
                </span>
                <span class="text-xs text-[#e5e1e4] font-medium truncate">Ide buket khusus 100+ mawar?</span>
              </div>
              <a
                :href="waHref('Halo Florist HappyBouquet, saya ingin konsultasi desain buket custom bespoke')"
                target="_blank"
                class="px-3 py-1.5 rounded-lg bg-[#d4af37] hover:bg-[#ffe088] text-[#131315] text-xs font-bold uppercase tracking-wider shrink-0 transition-all flex items-center gap-1 shadow-sm"
              >
                <Icon name="ph:whatsapp-logo-fill" class="w-3.5 h-3.5" />
                <span>Konsul</span>
              </a>
            </div>

          </div>

          <!-- Result Counter Info -->
          <div class="flex items-center justify-between text-xs text-[#b8b2a3] pt-1">
            <span>
              Menampilkan <span class="font-bold text-[#e5e1e4]">{{ paginatedProducts.length }}</span> dari <span class="font-bold text-[#e5e1e4]">{{ filteredProducts.length }}</span> rangkaian mahakarya
            </span>
            <span class="hidden sm:inline text-[11px] text-[#ccc6bb]">
              Halaman {{ currentPage }} dari {{ Math.max(1, totalPages) }}
            </span>
          </div>

          <!-- ==================== PRODUCT MATRIX GRID ==================== -->
          <div
            v-if="paginatedProducts.length > 0"
            id="catalog-products-container"
            class="grid grid-cols-1 sm:grid-cols-2 gap-5 transition-all duration-300"
            :class="gridCols === 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'"
          >
            <article
              v-for="product in paginatedProducts"
              :key="product.id"
              class="group relative flex flex-col rounded-xl bg-[#18181a] border border-[#4a4538]/25 overflow-hidden hover:bg-[#1f1f21] hover:border-[#d4af37]/50 transition-all duration-300 shadow-lg hover:shadow-2xl"
            >
              <!-- Card Image Area (Aspect Ratio 4/5) -->
              <div class="relative aspect-[4/5] w-full overflow-hidden bg-[#242427]">
                <NuxtImg
                  :src="product.image || '/default.png'"
                  :alt="product.name"
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                  width="500"
                  height="625"
                  @error="onImgError"
                />

                <div class="absolute inset-0 bg-gradient-to-t from-[#0e0e10]/90 via-transparent to-transparent opacity-60"></div>

                <!-- Top Badges -->
                <div class="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
                  <span
                    v-if="product.badge"
                    class="px-2.5 py-1 rounded bg-[#d4af37] text-[#131315] text-[10px] font-black uppercase tracking-wider shadow-sm"
                  >
                    {{ product.badge }}
                  </span>
                  <span
                    v-else-if="product.is_featured"
                    class="px-2.5 py-1 rounded bg-[#d4af37] text-[#131315] text-[10px] font-black uppercase tracking-wider shadow-sm"
                  >
                    Bestseller No. 1
                  </span>
                  <span
                    class="px-2 py-0.5 rounded bg-[#0e0e10]/80 backdrop-blur text-[#d4af37] text-[10px] font-semibold uppercase tracking-wider border border-[#d4af37]/30"
                  >
                    {{ product.type === 'preorder' ? 'Terjadwal' : 'Same Day' }}
                  </span>
                </div>

                <!-- Wishlist Heart Button (ClientOnly) -->
                <ClientOnly>
                  <button
                    @click.prevent="toggleWishlist(product)"
                    :aria-label="wishlistStore.isWishlisted(product.id) ? 'Hapus dari Wishlist' : 'Simpan ke Wishlist'"
                    class="absolute top-3 right-3 w-8 h-8 rounded-full bg-[#0e0e10]/80 backdrop-blur text-[#ccc6bb] hover:text-[#d4af37] flex items-center justify-center transition-all z-10 hover:scale-110 active:scale-95"
                    :class="{ '!text-[#d4af37]': wishlistStore.isWishlisted(product.id) }"
                  >
                    <Icon
                      :name="wishlistStore.isWishlisted(product.id) ? 'ph:heart-fill' : 'ph:heart-bold'"
                      class="w-4 h-4"
                    />
                  </button>
                  <template #fallback>
                    <button
                      class="absolute top-3 right-3 w-8 h-8 rounded-full bg-[#0e0e10]/80 backdrop-blur text-[#ccc6bb] flex items-center justify-center z-10"
                      aria-label="Simpan ke Wishlist"
                    >
                      <Icon name="ph:heart-bold" class="w-4 h-4" />
                    </button>
                  </template>
                </ClientOnly>

                <!-- Bottom Image Info Bar -->
                <div class="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-xs z-10">
                  <span class="px-2 py-0.5 rounded bg-[#242427]/90 backdrop-blur text-[#ccc6bb] text-[10px] font-medium border border-[#4a4538]/30 truncate max-w-[140px]">
                    {{ product.category || 'Atelier Collection' }}
                  </span>
                  <span class="text-[#d4af37] font-semibold flex items-center gap-1 text-[11px] bg-[#0e0e10]/80 px-1.5 py-0.5 rounded">
                    <Icon name="ph:star-fill" class="w-3.5 h-3.5 text-[#d4af37]" />
                    <span>{{ (product.rating || 4.9).toFixed(1) }}</span>
                    <span class="text-[#b8b2a3] text-[10px]">({{ product.reviewCount || 120 }})</span>
                  </span>
                </div>

                <!-- Full Card Click Overlay to Detail Page -->
                <NuxtLink
                  :to="`/products/${product.slug}`"
                  class="absolute inset-0 z-0"
                  :aria-label="`Buka detail ${product.name}`"
                />
              </div>

              <!-- Card Body Area -->
              <div class="p-4 flex flex-col flex-1 justify-between gap-3">
                <div>
                  <span class="text-[10px] uppercase font-bold text-[#d4af37] tracking-widest block">
                    {{ product.subtitle || product.category || 'Grade A+ Fresh Flowers' }}
                  </span>
                  <h2 class="font-serif text-base sm:text-lg text-[#e5e1e4] group-hover:text-[#d4af37] transition-colors line-clamp-1 mt-1 leading-snug">
                    <NuxtLink :to="`/products/${product.slug}`">
                      {{ product.name }}
                    </NuxtLink>
                  </h2>
                  <p class="text-xs text-[#b8b2a3] line-clamp-2 mt-1 leading-relaxed">
                    {{ product.description || 'Rangkaian eksklusif bunga segar dengan sentuhan wax seal dan pita sutra artisanal.' }}
                  </p>
                </div>

                <!-- Price + Quick Add Button -->
                <div class="pt-2 flex items-center justify-between border-t border-[#4a4538]/20">
                  <div class="flex flex-col">
                    <span v-if="product.strikePrice" class="text-[11px] text-[#b8b2a3] line-through">
                      {{ formatPrice(product.strikePrice) }}
                    </span>
                    <span class="font-serif text-lg font-bold text-[#d4af37]">
                      {{ formatPrice(product.price) }}
                    </span>
                  </div>

                  <button
                    @click.stop="handleQuickAddToCart(product)"
                    :aria-label="`Tambah ${product.name} ke keranjang`"
                    class="w-10 h-10 rounded-xl bg-[#d4af37] hover:bg-[#ffe088] text-[#131315] flex items-center justify-center transition-all active:scale-95 shadow-md hover:shadow-[#d4af37]/20 cursor-pointer"
                    :title="'Tambah ke Keranjang'"
                  >
                    <Icon
                      :name="addedProductIds[product.id] ? 'ph:check-bold' : 'ph:bag-simple-bold'"
                      class="w-5 h-5"
                    />
                  </button>
                </div>
              </div>
            </article>
          </div>

          <!-- Empty State -->
          <div
            v-else
            class="w-full py-16 px-6 rounded-2xl bg-[#18181a] border border-[#4a4538]/30 flex flex-col items-center justify-center text-center gap-4"
          >
            <div class="w-16 h-16 rounded-full bg-[#1f1f21] border border-[#d4af37]/30 text-[#d4af37] flex items-center justify-center">
              <Icon name="ph:flower-lotus-bold" class="w-8 h-8" />
            </div>
            <h3 class="font-serif text-xl text-[#e5e1e4]">Tidak ada buket yang sesuai filter</h3>
            <p class="text-xs sm:text-sm text-[#b8b2a3] max-w-md">
              Coba kurangi filter atau reset kriteria pencarian untuk menemukan koleksi rangkaian bunga lainnya.
            </p>
            <button
              @click="resetFilters"
              class="px-6 py-2.5 rounded-full bg-[#d4af37] text-[#131315] font-bold text-xs uppercase tracking-wider hover:bg-[#ffe088] transition-all shadow-md mt-2"
            >
              Reset Semua Filter
            </button>
          </div>

          <!-- Pagination & Infinite Load Trigger -->
          <div v-if="totalPages > 1" class="flex flex-col items-center justify-center gap-4 mt-8 pt-6 border-t border-[#4a4538]/25">
            <!-- Progress Bar Indicator -->
            <div class="w-full max-w-xs flex flex-col gap-1.5 items-center">
              <div class="w-full h-1 bg-[#1f1f21] rounded-full overflow-hidden">
                <div
                  class="h-full bg-[#d4af37] transition-all duration-300"
                  :style="{ width: `${(currentPage / totalPages) * 100}%` }"
                ></div>
              </div>
              <span class="text-[11px] text-[#b8b2a3]">
                Halaman {{ currentPage }} dari {{ totalPages }}
              </span>
            </div>

            <!-- Page Buttons -->
            <div class="flex items-center gap-2">
              <button
                @click="goToPage(currentPage - 1)"
                :disabled="currentPage === 1"
                class="w-9 h-9 rounded-xl flex items-center justify-center bg-[#18181a] border border-[#4a4538]/40 text-[#ccc6bb] hover:border-[#d4af37] hover:text-[#d4af37] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                title="Halaman Sebelumnya"
              >
                <Icon name="ph:caret-left-bold" class="w-4 h-4" />
              </button>

              <button
                v-for="page in totalPages"
                :key="page"
                @click="goToPage(page)"
                class="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold transition-all border"
                :class="currentPage === page
                  ? 'bg-[#d4af37] border-[#d4af37] text-[#131315] shadow-md shadow-[#d4af37]/20'
                  : 'bg-[#18181a] border-[#4a4538]/40 text-[#ccc6bb] hover:border-[#d4af37]/50 hover:text-[#e5e1e4]'"
              >
                {{ page }}
              </button>

              <button
                @click="goToPage(currentPage + 1)"
                :disabled="currentPage === totalPages"
                class="w-9 h-9 rounded-xl flex items-center justify-center bg-[#18181a] border border-[#4a4538]/40 text-[#ccc6bb] hover:border-[#d4af37] hover:text-[#d4af37] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                title="Halaman Selanjutnya"
              >
                <Icon name="ph:caret-right-bold" class="w-4 h-4" />
              </button>
            </div>
          </div>

        </main>
      </div>
    </div>

    <!-- ========================================================================= -->
    <!-- 3. BESPOKE VIP FLORAL CONSULTATION SECTION                                -->
    <!-- ========================================================================= -->
    <section class="w-full px-4 sm:px-6 lg:px-12 py-16 bg-[#18181a] relative overflow-hidden border-t border-[#4a4538]/25 mt-10">
      <!-- Ambient Accent Graphic -->
      <div class="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-[#d4af37]/5 rounded-full blur-3xl pointer-events-none"></div>
      
      <div class="max-w-7xl mx-auto rounded-2xl bg-[#1f1f21] border border-[#4a4538]/40 p-6 sm:p-10 lg:p-12 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-2xl relative z-10">
        <div class="flex flex-col gap-3 max-w-2xl">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#353437] text-[#d4af37] text-[11px] font-bold tracking-widest uppercase self-start">
            <Icon name="ph:paint-brush-bold" class="w-4 h-4 text-[#d4af37]" />
            Bespoke Floral Service
          </div>

          <h2 class="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#e5e1e4]">
            Mencari Tema Warna Khusus atau Bunga Tertentu?
          </h2>

          <p class="text-sm sm:text-base text-[#b8b2a3] leading-relaxed">
            Atelier kami melayani pesanan kustom untuk lamaran, dekorasi mobil pengantin, hampers korporasi, hingga buket raksasa (giant bouquet 100 mawar). Diskusikan visi botanik Anda langsung bersama Lead Florist kami.
          </p>

          <div class="flex flex-wrap items-center gap-4 pt-3 text-xs text-[#ccc6bb]">
            <span class="flex items-center gap-1.5">
              <Icon name="ph:check-circle-fill" class="w-4 h-4 text-[#d4af37]" /> Konsultasi Tema &amp; Palet Gratis
            </span>
            <span class="flex items-center gap-1.5">
              <Icon name="ph:check-circle-fill" class="w-4 h-4 text-[#d4af37]" /> Foto &amp; Video Sebelum Pengiriman
            </span>
            <span class="flex items-center gap-1.5">
              <Icon name="ph:check-circle-fill" class="w-4 h-4 text-[#d4af37]" /> Pengiriman Dedicated Kurir Mobil
            </span>
          </div>
        </div>

        <div class="flex flex-col sm:flex-row lg:flex-col gap-3 w-full lg:w-auto shrink-0">
          <a
            :href="waHref('Halo HappyBouquet, saya ingin konsultasi rangkaian bunga bespoke kustom')"
            target="_blank"
            class="px-6 py-3.5 rounded-xl bg-[#d4af37] hover:bg-[#ffe088] text-[#131315] text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg"
          >
            <Icon name="ph:whatsapp-logo-fill" class="w-5 h-5" />
            <span>Konsultasi Florist VIP</span>
          </a>
          <button
            @click="resetFilters"
            class="px-6 py-3 rounded-xl bg-[#242427] hover:bg-[#353437] text-[#e5e1e4] text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 border border-[#4a4538]/40"
          >
            <span>Jelajahi Koleksi Tersedia</span>
          </button>
        </div>
      </div>
    </section>

    <!-- ========================================================================= -->
    <!-- 4. LUXURY ASSURANCE & BOTANICAL TRUST PILLARS                             -->
    <!-- ========================================================================= -->
    <section class="w-full px-4 sm:px-6 lg:px-12 py-16">
      <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        <div class="p-6 rounded-2xl bg-[#18181a] border border-[#4a4538]/25 flex flex-col gap-2.5">
          <div class="w-10 h-10 rounded-full bg-[#d4af37]/15 text-[#d4af37] flex items-center justify-center mb-1">
            <Icon name="ph:flower-lotus-bold" class="w-5 h-5" />
          </div>
          <h3 class="font-serif text-lg text-[#e5e1e4] font-semibold">100% Tangkai Segar</h3>
          <p class="text-xs text-[#b8b2a3] leading-relaxed">
            Dipanen langsung dari kebun dataran tinggi bersuhu sejuk serta impor premium dengan jaminan kesegaran hingga 5 hari.
          </p>
        </div>

        <div class="p-6 rounded-2xl bg-[#18181a] border border-[#4a4538]/25 flex flex-col gap-2.5">
          <div class="w-10 h-10 rounded-full bg-[#d4af37]/15 text-[#d4af37] flex items-center justify-center mb-1">
            <Icon name="ph:truck-bold" class="w-5 h-5" />
          </div>
          <h3 class="font-serif text-lg text-[#e5e1e4] font-semibold">Garansi Tiba Selamat</h3>
          <p class="text-xs text-[#b8b2a3] leading-relaxed">
            Pengantaran menggunakan water-tube penyimpan air dan armada kurir terlatih. Rusak di perjalanan langsung diganti baru.
          </p>
        </div>

        <div class="p-6 rounded-2xl bg-[#18181a] border border-[#4a4538]/25 flex flex-col gap-2.5">
          <div class="w-10 h-10 rounded-full bg-[#d4af37]/15 text-[#d4af37] flex items-center justify-center mb-1">
            <Icon name="ph:scroll-bold" class="w-5 h-5" />
          </div>
          <h3 class="font-serif text-lg text-[#e5e1e4] font-semibold">Wax Seal &amp; Kaligrafi</h3>
          <p class="text-xs text-[#b8b2a3] leading-relaxed">
            Setiap pemesanan disertai kartu ucapan bahan katun bertekstur, ditulis tangan dengan tinta kaligrafi dan segel cap lilin emas.
          </p>
        </div>

        <div class="p-6 rounded-2xl bg-[#18181a] border border-[#4a4538]/25 flex flex-col gap-2.5">
          <div class="w-10 h-10 rounded-full bg-[#d4af37]/15 text-[#d4af37] flex items-center justify-center mb-1">
            <Icon name="ph:camera-bold" class="w-5 h-5" />
          </div>
          <h3 class="font-serif text-lg text-[#e5e1e4] font-semibold">Pratinjau Foto Asli</h3>
          <p class="text-xs text-[#b8b2a3] leading-relaxed">
            Foto hasil akhir buket dikirimkan via WhatsApp sebelum diberangkatkan kurir untuk menjamin kepuasan ekspektasi Anda.
          </p>
        </div>

      </div>
    </section>

    <!-- ========================================================================= -->
    <!-- 5. MOBILE FILTER DRAWER                                                   -->
    <!-- ========================================================================= -->
    <Transition name="drawer">
      <div v-if="isMobileFilterOpen" class="fixed inset-0 z-[100] flex">
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-black/80 backdrop-blur-sm" @click="isMobileFilterOpen = false"></div>

        <!-- Drawer Content -->
        <div class="relative w-full max-w-xs bg-[#18181a] border-l border-[#4a4538]/40 h-full flex flex-col ml-auto shadow-2xl overflow-hidden">
          <!-- Drawer Header -->
          <div class="px-5 py-4 border-b border-[#4a4538]/30 flex items-center justify-between bg-[#1f1f21]">
            <h2 class="text-xs font-bold uppercase tracking-widest text-[#e5e1e4] flex items-center gap-2">
              <Icon name="ph:sliders-horizontal-bold" class="w-4 h-4 text-[#d4af37]" />
              Filter Koleksi
            </h2>
            <button @click="isMobileFilterOpen = false" class="w-8 h-8 rounded-full bg-[#242427] text-[#ccc6bb] hover:text-[#d4af37] flex items-center justify-center transition-colors">
              <Icon name="ph:x-bold" class="w-4 h-4" />
            </button>
          </div>

          <!-- Drawer Body -->
          <div class="flex-1 overflow-y-auto p-5 space-y-6 text-xs">
            <!-- Waktu Pengiriman -->
            <div class="space-y-2">
              <span class="text-[11px] font-bold tracking-wider text-[#d4af37] uppercase">Waktu Pengiriman</span>
              <div class="flex flex-col gap-2">
                <label class="flex items-center gap-2 text-[#ccc6bb]">
                  <input type="radio" value="all" v-model="deliveryFilter" class="text-[#d4af37] bg-[#1f1f21] border-[#4a4538]" />
                  Semua Jadwal
                </label>
                <label class="flex items-center gap-2 text-[#ccc6bb]">
                  <input type="radio" value="sameday" v-model="deliveryFilter" class="text-[#d4af37] bg-[#1f1f21] border-[#4a4538]" />
                  Kirim Hari Ini (Same Day)
                </label>
                <label class="flex items-center gap-2 text-[#ccc6bb]">
                  <input type="radio" value="preorder" v-model="deliveryFilter" class="text-[#d4af37] bg-[#1f1f21] border-[#4a4538]" />
                  Terjadwal / Besok
                </label>
              </div>
            </div>

            <!-- Rentang Harga -->
            <div class="space-y-2">
              <span class="text-[11px] font-bold tracking-wider text-[#d4af37] uppercase">Rentang Harga</span>
              <div class="grid grid-cols-2 gap-2">
                <input
                  type="number"
                  v-model.number="priceMin"
                  placeholder="Min (Rp)"
                  class="px-2.5 py-1.5 rounded-lg bg-[#1f1f21] border border-[#4a4538]/50 text-xs text-[#e5e1e4]"
                />
                <input
                  type="number"
                  v-model.number="priceMax"
                  placeholder="Max (Rp)"
                  class="px-2.5 py-1.5 rounded-lg bg-[#1f1f21] border border-[#4a4538]/50 text-xs text-[#e5e1e4]"
                />
              </div>
            </div>

            <!-- Jenis Bunga -->
            <div class="space-y-2">
              <span class="text-[11px] font-bold tracking-wider text-[#d4af37] uppercase">Jenis Bunga</span>
              <div class="flex flex-col gap-1.5 max-h-40 overflow-y-auto pr-1">
                <label v-for="fl in flowerOptions" :key="fl.name" class="flex items-center gap-2 text-[#ccc6bb]">
                  <input type="checkbox" :value="fl.name" v-model="selectedFlowers" class="text-[#d4af37] rounded bg-[#1f1f21] border-[#4a4538]" />
                  <span>{{ fl.name }}</span>
                </label>
              </div>
            </div>

            <!-- Momen -->
            <div class="space-y-2">
              <span class="text-[11px] font-bold tracking-wider text-[#d4af37] uppercase">Momen &amp; Acara</span>
              <div class="flex flex-col gap-1.5 max-h-36 overflow-y-auto pr-1">
                <label v-for="occ in occasionOptions" :key="occ.name" class="flex items-center gap-2 text-[#ccc6bb]">
                  <input type="checkbox" :value="occ.name" v-model="selectedOccasions" class="text-[#d4af37] rounded bg-[#1f1f21] border-[#4a4538]" />
                  <span>{{ occ.name }}</span>
                </label>
              </div>
            </div>

            <!-- Palet Warna -->
            <div class="space-y-2">
              <span class="text-[11px] font-bold tracking-wider text-[#d4af37] uppercase">Warna Bunga</span>
              <div class="flex flex-wrap gap-1.5">
                <button
                  v-for="color in colorOptions"
                  :key="color.name"
                  @click="toggleColor(color.name)"
                  type="button"
                  class="flex items-center gap-1 px-2 py-0.5 rounded-full border text-[10px]"
                  :class="selectedColors.includes(color.name) ? 'bg-[#d4af37]/20 border-[#d4af37] text-[#d4af37]' : 'border-[#4a4538]/40 text-[#ccc6bb]'"
                >
                  <span class="w-2 h-2 rounded-full" :style="{ backgroundColor: color.hex }"></span>
                  <span>{{ color.name }}</span>
                </button>
              </div>
            </div>
          </div>

          <!-- Drawer Footer -->
          <div class="p-4 border-t border-[#4a4538]/30 bg-[#1f1f21] flex items-center gap-3">
            <button @click="resetFilters" class="px-3 py-2 rounded-xl text-xs text-[#ccc6bb] hover:text-[#e5e1e4]">
              Reset
            </button>
            <button
              @click="isMobileFilterOpen = false"
              class="flex-1 py-2.5 rounded-xl bg-[#d4af37] text-[#131315] font-bold text-xs uppercase tracking-wider"
            >
              Terapkan ({{ filteredProducts.length }})
            </button>
          </div>
        </div>
      </div>
    </Transition>

  </div>
</template>

<script setup lang="ts">
import { useCartStore } from '~/stores/cart'
import { useWishlistStore } from '~/stores/wishlist'

// ===== DYNAMIC SEO & SCHEMA.ORG (CR-0006) =====
useSeo({
  title: 'Koleksi Rangkaian Bunga & Buket Mewah — Haute Botanique',
  description: 'Jelajahi buket mawar Ekuador, buket wisuda, bloom box velvet, dan vas keramik artisan dengan garansi bunga segar dan pengiriman Same Day Jakarta.',
  breadcrumbs: [
    { name: 'Beranda', path: '/' },
    { name: 'Katalog Koleksi', path: '/products' }
  ]
})

const config = useRuntimeConfig()
const { waHref } = useStoreSettings()
const apiUrl = config.public.apiUrl
const route = useRoute()
const router = useRouter()

const cartStore = useCartStore()
const wishlistStore = useWishlistStore()

// State feedback tombol keranjang
const addedProductIds = ref<Record<number, boolean>>({})

// ===== DATA FETCHING =====
const { data: productsRes } = await useFetch<any>(`${apiUrl}/products?active=true`)

const allProducts = computed(() => {
  const apiData = productsRes.value?.data || []
  return apiData.map((p: any) => {
    const rawCat = typeof p.category === 'object' && p.category !== null ? (p.category.NAME || p.category.name) : p.category
    const slug = p.slug || (p.name ? p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') : `product-${p.id}`)
    const priceNum = Number(p.price) || 0
    const strike = p.strike_price || p.strikePrice ? Number(p.strike_price || p.strikePrice) : (priceNum > 300000 ? Math.round(priceNum * 1.15) : null)

    return {
      ...p,
      id: p.id,
      slug,
      name: p.name,
      price: priceNum,
      strikePrice: strike,
      image: resolveImageUrl(p.photo_url, apiUrl),
      rating: p.rating ? Number(p.rating) : 4.9,
      reviewCount: p.review_count || p.reviewCount || 98,
      category: rawCat || 'Buket Bunga',
      description: p.description || 'Rangkaian mawar dan bunga segar berkualitas terbaik dengan sentuhan pita satin premium.',
      type: p.type || 'regular',
      badge: p.badge || (p.is_featured ? 'Bestseller' : null)
    }
  })
})

// ===== FILTER STATE =====
const isMobileFilterOpen = ref(false)
const searchQuery = ref((route.query.q as string) || '')
const selectedCategory = ref((route.query.cat as string) || 'all')
const deliveryFilter = ref<'all' | 'sameday' | 'preorder'>('all')
const selectedFlowers = ref<string[]>([])
const selectedOccasions = ref<string[]>([])
const selectedPackaging = ref<string[]>([])
const selectedColors = ref<string[]>([])
const priceMin = ref<number | ''>(route.query.min ? Number(route.query.min) : '')
const priceMax = ref<number | ''>(route.query.max ? Number(route.query.max) : '')
const activePriceRangeId = ref<string>('')
const sortBy = ref((route.query.sort as string) || 'curator')
const gridCols = ref<number>(3)

// Pagination State
const currentPage = ref(route.query.page ? Number(route.query.page) : 1)
const itemsPerPage = 12

// ===== CATEGORIES & QUICK PILLS =====
const quickCategories = computed(() => {
  const catCounts: Record<string, number> = {}
  allProducts.value.forEach((p) => {
    const c = p.category || 'Lainnya'
    catCounts[c] = (catCounts[c] || 0) + 1
  })

  const list = [
    { id: 'all', name: 'Semua Koleksi', count: allProducts.value.length },
    { id: 'Mawar', name: 'Mawar Klasik & Ekuador', count: allProducts.value.filter(p => /mawar|rose/i.test(p.name + p.category)).length },
    { id: 'Wisuda', name: 'Wisuda & Akademik', count: allProducts.value.filter(p => /wisuda|graduation|boneka/i.test(p.name + p.category)).length },
    { id: 'Bloom Box', name: 'Bloom Box & Velvet', count: allProducts.value.filter(p => /box|bloom/i.test(p.name + p.category)).length },
    { id: 'Vas Keramik', name: 'Vas & Table Flower', count: allProducts.value.filter(p => /vas|table|keramik/i.test(p.name + p.category)).length },
    { id: 'Preserved', name: 'Preserved & Abadi', count: allProducts.value.filter(p => /preserved|dried|kering|abadi/i.test(p.name + p.category)).length }
  ]

  return list
})

const selectedCategoryName = computed(() => {
  const found = quickCategories.value.find(c => c.id === selectedCategory.value)
  return found ? found.name : selectedCategory.value
})

const setCategory = (catId: string) => {
  selectedCategory.value = catId
  currentPage.value = 1
  updateURL()
}

// Counts for delivery speed
const samedayCount = computed(() => allProducts.value.filter(p => p.type !== 'preorder').length)
const preorderCount = computed(() => allProducts.value.filter(p => p.type === 'preorder').length)

// Flower options
const flowerOptions = computed(() => [
  { name: 'Mawar (Roses)', query: 'mawar|rose', count: allProducts.value.filter(p => /mawar|rose/i.test(p.name)).length },
  { name: 'Peony & Ranunculus', query: 'peony|ranunculus', count: allProducts.value.filter(p => /peony|ranunculus/i.test(p.name)).length },
  { name: 'Lili Casablanca', query: 'lili|lily', count: allProducts.value.filter(p => /lili|lily/i.test(p.name)).length },
  { name: 'Tulip Belanda', query: 'tulip', count: allProducts.value.filter(p => /tulip/i.test(p.name)).length },
  { name: 'Bunga Matahari', query: 'matahari|sunflower', count: allProducts.value.filter(p => /matahari|sunflower/i.test(p.name)).length },
  { name: 'Anggrek Bulan', query: 'anggrek|orchid', count: allProducts.value.filter(p => /anggrek|orchid/i.test(p.name)).length },
  { name: 'Hydrangea', query: 'hydrangea|hortensia', count: allProducts.value.filter(p => /hydrangea|hortensia/i.test(p.name)).length },
  { name: 'Preserved & Dried', query: 'preserved|dried', count: allProducts.value.filter(p => /preserved|dried|abadi/i.test(p.name)).length }
])

// Occasion options
const occasionOptions = computed(() => [
  { name: 'Wisuda & Kelulusan', count: allProducts.value.filter(p => /wisuda|kelulusan|grad/i.test(p.name + p.category)).length },
  { name: 'Romantis & Anniversary', count: allProducts.value.filter(p => /cinta|romantis|anniversary|valentine/i.test(p.name + p.category)).length },
  { name: 'Ulang Tahun (Birthday)', count: allProducts.value.filter(p => /ulang tahun|birthday|bday/i.test(p.name + p.category)).length },
  { name: 'Grand Opening & Selamat', count: allProducts.value.filter(p => /opening|selamat|standing/i.test(p.name + p.category)).length },
  { name: 'Duka Cita & Bela Sungkawa', count: allProducts.value.filter(p => /duka|bela sungkawa/i.test(p.name + p.category)).length }
])

// Price Ranges Quick Filters
const priceRanges = [
  { id: 'p1', label: '< 350rb', min: 0, max: 350000 },
  { id: 'p2', label: '350rb - 750rb', min: 350000, max: 750000 },
  { id: 'p3', label: '750rb - 1.5jt', min: 750000, max: 1500000 },
  { id: 'p4', label: '> 1.5jt', min: 1500000, max: 10000000 }
]

const applyQuickPriceRange = (min: number, max: number, id: string) => {
  if (activePriceRangeId.value === id) {
    resetPriceRange()
    return
  }
  activePriceRangeId.value = id
  priceMin.value = min
  priceMax.value = max
  currentPage.value = 1
  updateURL()
}

const resetPriceRange = () => {
  activePriceRangeId.value = ''
  priceMin.value = ''
  priceMax.value = ''
  currentPage.value = 1
  updateURL()
}

// Packaging Options
const packagingOptions = [
  'Kertas Matte Noir & Gold',
  'Velvet Hatbox Eksklusif',
  'Vas Keramik Artisan',
  'Dome Kaca Akrilik',
  'Standing Wreath Standar'
]

// Color Options
const colorOptions = [
  { name: 'Merah Crimson', hex: '#8B0000' },
  { name: 'Champagne & Gold', hex: '#D4AF37' },
  { name: 'Pink Pastel', hex: '#FFB6C1' },
  { name: 'Putih Murni', hex: '#F5F5F5' },
  { name: 'Kuning Vibrant', hex: '#FFD700' }
]

const toggleColor = (clr: string) => {
  const idx = selectedColors.value.indexOf(clr)
  if (idx > -1) {
    selectedColors.value.splice(idx, 1)
  } else {
    selectedColors.value.push(clr)
  }
  currentPage.value = 1
}

const removeFlower = (fl: string) => {
  selectedFlowers.value = selectedFlowers.value.filter(f => f !== fl)
  currentPage.value = 1
}

const removeOccasion = (occ: string) => {
  selectedOccasions.value = selectedOccasions.value.filter(o => o !== occ)
  currentPage.value = 1
}

// Curator Pick item (first featured item or first in list)
const curatorPick = computed(() => {
  return allProducts.value.find(p => p.is_featured) || allProducts.value[0] || null
})

// Active Filter Count
const hasActiveFilters = computed(() => {
  return (
    searchQuery.value !== '' ||
    selectedCategory.value !== 'all' ||
    deliveryFilter.value !== 'all' ||
    selectedFlowers.value.length > 0 ||
    selectedOccasions.value.length > 0 ||
    selectedColors.value.length > 0 ||
    selectedPackaging.value.length > 0 ||
    (priceMin.value !== '' && priceMin.value > 0) ||
    (priceMax.value !== '' && priceMax.value > 0)
  )
})

const activeFilterCount = computed(() => {
  let count = 0
  if (selectedCategory.value !== 'all') count++
  if (deliveryFilter.value !== 'all') count++
  if (selectedFlowers.value.length > 0) count += selectedFlowers.value.length
  if (selectedOccasions.value.length > 0) count += selectedOccasions.value.length
  if (selectedColors.value.length > 0) count += selectedColors.value.length
  if (selectedPackaging.value.length > 0) count += selectedPackaging.value.length
  if (priceMin.value !== '' && priceMin.value > 0) count++
  if (priceMax.value !== '' && priceMax.value > 0) count++
  return count
})

// ===== FILTERED & SORTED PRODUCTS =====
const filteredProducts = computed(() => {
  let result = [...allProducts.value]

  // Category filter
  if (selectedCategory.value !== 'all') {
    if (selectedCategory.value === 'Mawar') {
      result = result.filter(p => /mawar|rose/i.test(p.name + p.category))
    } else if (selectedCategory.value === 'Wisuda') {
      result = result.filter(p => /wisuda|graduation|boneka/i.test(p.name + p.category))
    } else if (selectedCategory.value === 'Bloom Box') {
      result = result.filter(p => /box|bloom/i.test(p.name + p.category))
    } else if (selectedCategory.value === 'Vas Keramik') {
      result = result.filter(p => /vas|table|keramik/i.test(p.name + p.category))
    } else if (selectedCategory.value === 'Preserved') {
      result = result.filter(p => /preserved|dried|kering|abadi/i.test(p.name + p.category))
    } else {
      result = result.filter(p => p.category === selectedCategory.value)
    }
  }

  // Delivery filter
  if (deliveryFilter.value === 'sameday') {
    result = result.filter(p => p.type !== 'preorder')
  } else if (deliveryFilter.value === 'preorder') {
    result = result.filter(p => p.type === 'preorder')
  }

  // Search filter
  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase().trim()
    result = result.filter(p =>
      p.name.toLowerCase().includes(q) ||
      (p.category && p.category.toLowerCase().includes(q)) ||
      (p.description && p.description.toLowerCase().includes(q))
    )
  }

  // Flower types filter
  if (selectedFlowers.value.length > 0) {
    result = result.filter(p => {
      const text = (p.name + ' ' + (p.description || '')).toLowerCase()
      return selectedFlowers.value.some(fl => {
        if (/mawar/i.test(fl)) return /mawar|rose/i.test(text)
        if (/peony/i.test(fl)) return /peony|ranunculus/i.test(text)
        if (/lili/i.test(fl)) return /lili|lily/i.test(text)
        if (/tulip/i.test(fl)) return /tulip/i.test(text)
        if (/matahari/i.test(fl)) return /matahari|sunflower/i.test(text)
        if (/anggrek/i.test(fl)) return /anggrek|orchid/i.test(text)
        if (/hydrangea/i.test(fl)) return /hydrangea|hortensia/i.test(text)
        if (/preserved/i.test(fl)) return /preserved|dried|abadi/i.test(text)
        return false
      })
    })
  }

  // Occasion filter
  if (selectedOccasions.value.length > 0) {
    result = result.filter(p => {
      const text = (p.name + ' ' + (p.category || '') + ' ' + (p.description || '')).toLowerCase()
      return selectedOccasions.value.some(occ => {
        if (/wisuda/i.test(occ)) return /wisuda|grad/i.test(text)
        if (/romantis/i.test(occ)) return /cinta|romantis|anniversary|valentine/i.test(text)
        if (/ulang tahun/i.test(occ)) return /ulang tahun|birthday/i.test(text)
        if (/grand opening/i.test(occ)) return /opening|selamat|standing/i.test(text)
        if (/duka/i.test(occ)) return /duka|bela sungkawa/i.test(text)
        return false
      })
    })
  }

  // Price Min
  if (priceMin.value !== '' && Number(priceMin.value) > 0) {
    result = result.filter(p => p.price >= Number(priceMin.value))
  }

  // Price Max
  if (priceMax.value !== '' && Number(priceMax.value) > 0) {
    result = result.filter(p => p.price <= Number(priceMax.value))
  }

  // Color filter (mock mapping by name/description)
  if (selectedColors.value.length > 0) {
    result = result.filter(p => {
      const text = (p.name + ' ' + (p.description || '')).toLowerCase()
      return selectedColors.value.some(clr => {
        if (clr.includes('Merah')) return /merah|red|crimson/i.test(text)
        if (clr.includes('Champagne') || clr.includes('Gold')) return /champagne|gold|emas/i.test(text)
        if (clr.includes('Pink')) return /pink|merah muda|rose/i.test(text)
        if (clr.includes('Putih')) return /putih|white/i.test(text)
        if (clr.includes('Kuning')) return /kuning|yellow|sun/i.test(text)
        return true
      })
    })
  }

  // Sort
  if (sortBy.value === 'price_asc') {
    result.sort((a, b) => a.price - b.price)
  } else if (sortBy.value === 'price_desc') {
    result.sort((a, b) => b.price - a.price)
  } else if (sortBy.value === 'rating') {
    result.sort((a, b) => (b.rating || 0) - (a.rating || 0))
  } else if (sortBy.value === 'popular') {
    result.sort((a, b) => (b.reviewCount || 0) - (a.reviewCount || 0))
  } else {
    // Default 'curator' -> featured first, then id desc
    result.sort((a, b) => (b.is_featured ? 1 : 0) - (a.is_featured ? 1 : 0) || b.id - a.id)
  }

  return result
})

// Pagination
const totalPages = computed(() => Math.ceil(filteredProducts.value.length / itemsPerPage))
const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage)
const endIndex = computed(() => startIndex.value + itemsPerPage)
const paginatedProducts = computed(() => filteredProducts.value.slice(startIndex.value, endIndex.value))

// ===== ACTIONS =====
const updateURL = () => {
  const query: any = {}
  if (searchQuery.value) query.q = searchQuery.value
  if (selectedCategory.value !== 'all') query.cat = selectedCategory.value
  if (priceMin.value) query.min = priceMin.value
  if (priceMax.value) query.max = priceMax.value
  if (sortBy.value !== 'curator') query.sort = sortBy.value
  if (currentPage.value > 1) query.page = currentPage.value

  router.replace({ query })
}

const goToPage = (page: number) => {
  if (page < 1 || page > totalPages.value) return
  currentPage.value = page
  updateURL()
  windowScrollToCatalog()
}

const windowScrollToCatalog = () => {
  if (import.meta.client) {
    window.scrollTo({ top: 380, behavior: 'smooth' })
  }
}

const resetFilters = () => {
  searchQuery.value = ''
  selectedCategory.value = 'all'
  deliveryFilter.value = 'all'
  selectedFlowers.value = []
  selectedOccasions.value = []
  selectedPackaging.value = []
  selectedColors.value = []
  activePriceRangeId.value = ''
  priceMin.value = ''
  priceMax.value = ''
  sortBy.value = 'curator'
  currentPage.value = 1
  updateURL()
}

// Quick Add to Cart
const handleQuickAddToCart = (product: any) => {
  cartStore.addItem({
    id: product.id,
    name: product.name,
    price: product.price,
    image: product.image,
    quantity: 1,
    variants: {}
  })

  addedProductIds.value[product.id] = true
  setTimeout(() => {
    addedProductIds.value[product.id] = false
  }, 1800)
}

// Wishlist
const toggleWishlist = (product: any) => {
  wishlistStore.toggleItem(product)
}

// Helpers
const formatPrice = (v: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(v || 0)
}

const formatShortRupiah = (v: number) => {
  if (v >= 1000000) return `${(v / 1000000).toFixed(1).replace('.0', '')}jt`
  if (v >= 1000) return `${Math.round(v / 1000)}rb`
  return `${v}`
}

const onImgError = (e: Event) => {
  const target = e.target as HTMLImageElement
  if (target && !target.src.includes('default.png')) {
    target.src = '/default.png'
  }
}

// Watch route changes
watch(() => route.query, (newQuery) => {
  searchQuery.value = (newQuery.q as string) || ''
  selectedCategory.value = (newQuery.cat as string) || 'all'
  priceMin.value = newQuery.min ? Number(newQuery.min) : ''
  priceMax.value = newQuery.max ? Number(newQuery.max) : ''
  sortBy.value = (newQuery.sort as string) || 'curator'
  currentPage.value = newQuery.page ? Number(newQuery.page) : 1
})
</script>

<style scoped>
/* Mobile Drawer Transitions */
.drawer-enter-active,
.drawer-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.drawer-enter-from,
.drawer-leave-to {
  opacity: 0;
}
.drawer-enter-from .max-w-xs,
.drawer-leave-to .max-w-xs {
  transform: translateX(100%);
}

/* Hide scrollbar */
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
