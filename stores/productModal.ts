import { defineStore } from 'pinia'

// Definisikan tipe data untuk produk
export interface Product {
  id: number
  name: string
  price: number
  image: string
  description?: string
  options?: Record<string, string[]>
}

export const useProductModalStore = defineStore('productModal', {
  state: () => ({
    isOpen: false,
    product: null as Product | null
  }),
  actions: {
    openModal(product: Product) {
      this.product = product
      this.isOpen = true
    },
    closeModal() {
      this.isOpen = false
      this.product = null
    }
  }
})