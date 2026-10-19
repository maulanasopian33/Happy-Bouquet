import { ref, computed } from 'vue'
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

export const useCartStore = defineStore('cart', () => {
  const items = useLocalStorage<CartItem[]>('happybouquet-cart', [])
  const isOpen = ref(false)

  const totalItems = computed(() =>
    items.value.reduce((t, i) => t + i.quantity, 0)
  )

  const totalPrice = computed(() =>
    items.value.reduce((t, i) => t + i.price * i.quantity, 0)
  )

  const formattedTotalPrice = computed(() =>
    new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(totalPrice.value)
  )

  const showCart = (open: boolean = true) => {
    isOpen.value = open
  }

  const addItem = (product: CartItem) => {
    // Buat ID unik berdasarkan produk dan variannya
    const cartItemId = product.id + '-' + Object.values(product.variants || {}).join('-')

    const exist = items.value.find((i) => i.cartItemId === cartItemId)

    if (exist) {
      exist.quantity += product.quantity || 1
    } else {
      items.value.push({
        ...product,
        price: Number(product.price), // Pastikan harga adalah angka
        cartItemId: cartItemId,
        quantity: product.quantity || 1
      })
    }

    showCart(true)
  }

  const removeItem = (cartItemId: string) => {
    items.value = items.value.filter((i) => i.cartItemId !== cartItemId)
  }

  const increase = (cartItemId: string) => {
    const item = items.value.find((i) => i.cartItemId === cartItemId)
    if (item) item.quantity++
  }

  const decrease = (cartItemId: string) => {
    const item = items.value.find((i) => i.cartItemId === cartItemId)
    if (item && item.quantity > 1) item.quantity--
  }

  const clearCart = () => {
    items.value = []
  }

  return {
    items,
    isOpen,
    totalItems,
    totalPrice,
    formattedTotalPrice,
    showCart,
    addItem,
    removeItem,
    increase,
    decrease,
    clearCart
  }
})
