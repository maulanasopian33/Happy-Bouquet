<template>
  <div class="card-premium p-8 md:p-10 space-y-8 relative overflow-hidden group">
    <!-- Decorative Circle in Corner -->
    <div class="absolute -top-12 -right-12 w-24 h-24 rounded-full bg-rose-50 dark:bg-rose-950/20 group-hover:scale-110 transition-transform"></div>

    <div class="space-y-6 relative z-10">
      <div class="flex items-center justify-between">
        <h3 class="text-sm font-black uppercase tracking-widest text-primary">Atur Pesanan</h3>
        <span class="text-[10px] font-bold text-muted uppercase tracking-widest border border-rose-100 dark:border-rose-950 px-2 py-0.5 rounded-md">
          Stok: {{ stock || 999 }} Unit
        </span>
      </div>

      <!-- Variants Selection -->
      <div class="space-y-6 py-4 border-t border-b border-(--border-color)">
        <ProductVariantsVisual :variants="variants" @update:selections="onUpdateSelections" />
        <ProductVariantsText :variants="variants" @update:selections="onUpdateSelections" />
        
        <div class="flex items-center justify-between gap-6 pt-2">
          <span class="text-xs font-bold text-muted uppercase tracking-widest shrink-0">Jumlah Buket</span>
          
          <div class="flex items-center bg-(--bg-section) rounded-2xl p-1.5 border border-(--border-color) shadow-inner">
            <button 
              @click="decrement" 
              class="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white dark:hover:bg-rose-900 transition-all text-lg font-bold text-rose-600 disabled:opacity-30"
              :disabled="qty <= 1"
            >
              <Icon name="ph:minus-bold" />
            </button>
            <span class="min-w-[60px] text-center text-lg font-black text-primary">{{ qty }}</span>
            <button 
              @click="increment" 
              class="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white dark:hover:bg-rose-900 transition-all text-lg font-bold text-rose-600 disabled:opacity-30"
              :disabled="qty >= (stock || 999)"
            >
              <Icon name="ph:plus-bold" />
            </button>
          </div>
        </div>
      </div>

      <!-- Subtotal -->
      <div class="flex items-center justify-between text-lg md:text-xl">
        <p class="text-sm font-black text-primary uppercase tracking-widest">Subtotal</p>
        <p class="text-3xl font-black text-rose-600 tracking-tight">{{ formatPrice(price * qty) }}</p>
      </div>

      <!-- Action Buttons -->
      <div class="space-y-4 pt-4">
        <button 
          @click="buyNow" 
          class="btn-premium w-full flex items-center justify-center gap-3 py-4.5 rounded-2xl text-base shadow-xl shadow-rose-500/30"
        >
          <Icon name="ph:lightning-fill" class="w-5 h-5 text-amber-300" />
          Beli Sekarang
        </button>
        <button 
          @click="addToCart" 
          class="btn-premium-outline w-full flex items-center justify-center gap-3 py-4 rounded-2xl text-base hover:scale-[1.02]"
        >
          <Icon name="ph:shopping-cart-bold" class="w-5 h-5" />
          Tambah ke Keranjang
        </button>
      </div>
      
      <p class="text-center text-[10px] text-muted font-bold uppercase tracking-widest">
        Dapat Dibatalkan Sebelum Pengiriman
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ProductVariantsVisual from './ProductVariantsVisual.vue'
import ProductVariantsText from './ProductVariantsText.vue'

const props = defineProps<{ price: number; originalPrice?: number; variants?: any[]; stock?: number }>()
const emit = defineEmits(['add-to-cart', 'buy-now'])

const qty = ref(1)
const selections = ref({})

function increment() { if (qty.value < (props.stock || 999)) qty.value++ }
function decrement() { if (qty.value > 1) qty.value-- }

function onUpdateSelections(newSelections: any) {
  selections.value = { ...selections.value, ...newSelections }
}

function addToCart() {
  emit('add-to-cart', { selections: selections.value, qty: qty.value })
}
function buyNow() {
  emit('buy-now', { selections: selections.value, qty: qty.value })
}

const formatPrice = (v: number) => 
  new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(v)
</script>