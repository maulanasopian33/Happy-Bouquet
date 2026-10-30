<template>
  <div class="bg-[#171612] border-b border-[var(--noir-line)] text-[var(--noir-champagne-dim)] py-2 overflow-hidden relative select-none">
    <div class="flex whitespace-nowrap animate-ticker">
      <div
        v-for="(promo, index) in tickerItems"
        :key="index"
        class="flex items-center px-8 gap-2.5 shrink-0"
      >
        <span class="w-1.5 h-1.5 rounded-full bg-[var(--noir-gold)]/50 shrink-0" />
        <span class="text-xs font-semibold tracking-wide">
          <span class="text-[var(--noir-gold)] font-black">{{ promo.name }}:</span>
          {{ promo.description }}
          <span
            v-if="promo.code"
            class="ml-2 px-2 py-0.5 bg-[var(--noir-gold)]/15 rounded-md text-[var(--noir-gold)] font-black border border-[var(--noir-gold)]/30 text-xs tracking-widest"
          >
            {{ promo.code }}
          </span>
        </span>
        <span class="mx-3 text-[var(--noir-gold)]/40 text-base">✦</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const config = useRuntimeConfig()
const apiUrl = config.public.apiUrl

const { data: promosRes } = await useFetch<any>(`${apiUrl}/promos?active=true`)
const apiPromos = computed(() => promosRes.value?.data || [])

const dummyPromos = [
  { name: 'HARI INI', description: 'Gratis ongkir untuk pembelian di atas Rp 150.000', code: 'GRATIS150' },
  { name: 'WISUDA SPESIAL', description: 'Diskon 20% untuk semua buket wisuda', code: 'WISUDA20' },
  { name: 'WEEKEND SALE', description: 'Beli 2 gratis 1 untuk buket mini edisi terbatas', code: null },
  { name: 'MEMBER BARU', description: 'Cashback Rp 25.000 untuk pembelian pertama', code: 'NEWMEMBER' },
]

const promos = computed(() => apiPromos.value.length > 0 ? apiPromos.value : dummyPromos)
const tickerItems = computed(() => [...promos.value, ...promos.value, ...promos.value])
</script>
