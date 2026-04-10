import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'

export interface CartItem  {
  id: number
  name: string
  price: number
  image: string
  quantity: number
  variants?: Record<string, string>
  cartItemId?: string // Unique ID for cart item including variants
}

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [] as CartItem[],
    isOpen: false
  }),

  getters: {
    totalItems: (state): number =>
      state.items.reduce((t: number, i: CartItem) => t + i.quantity, 0),

    totalPrice: (state): number =>
      state.items.reduce((t: number, i: CartItem) => t + i.price * i.quantity, 0),

    formattedTotalPrice(): string {
      return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
      }).format(this.totalPrice)
    }
  },

  actions: {
    showCart(open: boolean = true) {
      this.isOpen = open
    },

    addItem(product: CartItem) {
      // Buat ID unik berdasarkan produk dan variannya
      const cartItemId = product.id + '-' + Object.values(product.variants || {}).join('-')

      const exist = this.items.find((i) => i.cartItemId === cartItemId)
      
      if (exist) {
        exist.quantity += product.quantity || 1
      } else {
        this.items.push({
          ...product,
          price: Number(product.price), // Pastikan harga adalah angka
          cartItemId: cartItemId,
          quantity: product.quantity || 1
        })
      }

      this.showCart(true)

      // Hapus tracking sementara karena struktur produk berubah
      // ⬅️ Tracking Add to Cart
      // const { trackAddToCart } = useAnalytics()
      // trackAddToCart(product, 1)
    },

    removeItem(productId: number) {
      this.items = this.items.filter((i) => i.id !== productId)
    },

    increase(id: number) {
      const item = this.items.find((i) => i.id === id)
      if (item) item.quantity++
    },

    decrease(id: number) {
      const item = this.items.find((i) => i.id === id)
      if (item && item.quantity > 1) item.quantity--
    },

    clearCart() {
      this.items = []
    }
  }
})
