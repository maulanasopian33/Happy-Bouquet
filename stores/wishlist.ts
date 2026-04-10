import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'

export const useWishlistStore = defineStore('wishlist', () => {
  // Persistence using LocalStorage
  const items = useLocalStorage<any[]>('happybouquet-wishlist', [])

  const toggleItem = (product: any) => {
    const index = items.value.findIndex((i) => i.id === product.id)
    if (index > -1) {
      items.value.splice(index, 1)
    } else {
      items.value.push(product)
    }
  }

  const isWishlisted = (productId: number) => {
    return items.value.some((i) => i.id === productId)
  }

  const removeItem = (productId: number) => {
    const index = items.value.findIndex((i) => i.id === productId)
    if (index > -1) {
      items.value.splice(index, 1)
    }
  }

  const clearWishlist = () => {
    items.value = []
  }

  return {
    items,
    toggleItem,
    isWishlisted,
    removeItem,
    clearWishlist
  }
})
