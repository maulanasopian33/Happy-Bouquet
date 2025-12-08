<template>
  <ClientOnly>
    <Teleport to="body">
      <!-- Backdrop -->
      <transition
        enter-active-class="transition-opacity ease-out duration-300"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-opacity ease-in duration-200"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div v-if="productModal.isOpen" @click="productModal.closeModal()" class="fixed inset-0 z-50 bg-gray-900/60 backdrop-blur-sm" aria-hidden="true"></div>
      </transition>

      <!-- Modal Panel -->
      <transition
        enter-active-class="transition ease-out duration-300"
        enter-from-class="opacity-0 scale-95"
        enter-to-class="opacity-100 scale-100"
        leave-active-class="transition ease-in duration-200"
        leave-from-class="opacity-100 scale-100"
        leave-to-class="opacity-0 scale-95"
      >
        <div v-if="productModal.isOpen && product" class="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div class="relative w-full max-w-lg bg-white rounded-2xl shadow-xl flex flex-col">
            <!-- Header -->
            <div class="flex items-center justify-between p-5 border-b">
              <h3 class="text-xl font-semibold text-gray-900">
                Pilih Varian
              </h3>
              <button @click="productModal.closeModal()" type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 rounded-lg p-1.5 ml-auto inline-flex items-center">
                <Icon name="ph:x-bold" class="w-5 h-5" />
              </button>
            </div>

            <!-- Body -->
            <div class="p-6 space-y-4">
              <!-- Product Info -->
              <div class="flex items-start sm:items-center gap-4 flex-col sm:flex-row">
                <img :src="product.image" :alt="product.name" class="w-20 h-20 rounded-lg object-cover border">
                <div>
                  <h4 class="font-semibold text-gray-800">{{ product.name }}</h4>
                  <p class="text-lg font-bold text-pink-600">{{ priceFormatted }}</p>
                </div>
              </div>

              <!-- Variant Options -->
              <div v-if="hasVariants" class="space-y-4 pt-4 border-t">
                <div v-for="(options, key) in product.options" :key="key" >
                  <label class="text-sm font-medium text-gray-700 capitalize">{{ key.replace('_', ' ') }}</label>
                  <div class="mt-2 flex flex-wrap gap-2">
                    <button
                      v-for="option in options"
                      :key="option"
                      @click="selectedVariants[key] = option"
                      class="px-4 py-2 text-sm border rounded-full transition"
                      :class="selectedVariants[key] === option ? 'bg-pink-600 text-white border-pink-600' : 'bg-white hover:border-gray-400'"
                    >
                      {{ option }}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Footer -->
            <div class="flex flex-col sm:flex-row-reverse items-center gap-3 p-6 border-t bg-gray-50 rounded-b-2xl">
              <button @click="handleAddToCart" class="w-full sm:w-auto px-6 py-3 text-sm font-medium text-center text-white bg-pink-600 rounded-lg hover:bg-pink-700 shadow-sm">
                Tambah ke Keranjang
              </button>
              <NuxtLink :to="`/products/${product.id}`" @click="productModal.closeModal()" class="w-full sm:w-auto px-6 py-3 text-sm font-medium text-center text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100">
                Lihat Detail Produk
              </NuxtLink>
            </div>
          </div>
        </div>
      </transition>
    </Teleport>
  </ClientOnly>
</template>

<script setup>
const productModal = useProductModalStore()
const cart = useCartStore()
const { product } = storeToRefs(productModal)

const selectedVariants = ref({})

const hasVariants = computed(() => {
  return product.value && product.value.options && Object.keys(product.value.options).length > 0
})

watch(product, (newProduct) => {
  if (newProduct && newProduct.options) {
    // Set default variant selection
    const defaults = {}
    for (const key in newProduct.options) {
      defaults[key] = newProduct.options[key][0]
    }
    selectedVariants.value = defaults
  }
})

const handleAddToCart = () => {
  if (!product.value) return
  cart.addItem({
    ...product.value,
    variants: hasVariants.value ? { ...selectedVariants.value } : undefined
  })
  productModal.closeModal()
}

const priceFormatted = computed(() => {
  if (!product.value) return ''
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(product.value.price)
})
</script>