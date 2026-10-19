import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useCartStore } from '../stores/cart'

const productA = { id: 1, name: 'Buket Mawar', price: 150_000, image: 'a.jpg' }
const productB = { id: 2, name: 'Buket Tulip', price: 200_000, image: 'b.jpg' }

describe('useCartStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('addItem membuat item baru dengan quantity 1 dan cartItemId', () => {
    const cart = useCartStore()
    cart.addItem({ ...productA, quantity: 0 as any })
    expect(cart.items).toHaveLength(1)
    expect(cart.items[0].quantity).toBe(1)
    expect(cart.items[0].cartItemId).toBe('1-')
    expect(cart.totalItems).toBe(1)
    expect(cart.totalPrice).toBe(150_000)
  })

  it('addItem produk sama (tanpa varian) menumpuk quantity', () => {
    const cart = useCartStore()
    cart.addItem(productA)
    cart.addItem(productA)
    expect(cart.items).toHaveLength(1)
    expect(cart.items[0].quantity).toBe(2)
  })

  it('varian berbeda = item terpisah', () => {
    const cart = useCartStore()
    cart.addItem({ ...productA, variants: { warna: 'Pink' } })
    cart.addItem({ ...productA, variants: { warna: 'Putih' } })
    expect(cart.items).toHaveLength(2)
  })

  it('increase/decrease; decrease berhenti di 1', () => {
    const cart = useCartStore()
    cart.addItem(productA)
    const id = cart.items[0].cartItemId!
    cart.increase(id)
    cart.increase(id)
    expect(cart.items[0].quantity).toBe(3)
    cart.decrease(id)
    expect(cart.items[0].quantity).toBe(2)
    cart.decrease(id)
    cart.decrease(id)
    cart.decrease(id)
    expect(cart.items[0].quantity).toBe(1)
  })

  it('removeItem dan clearCart', () => {
    const cart = useCartStore()
    cart.addItem(productA)
    cart.addItem(productB)
    cart.removeItem('1-')
    expect(cart.items).toHaveLength(1)
    cart.clearCart()
    expect(cart.items).toHaveLength(0)
    expect(cart.totalItems).toBe(0)
    expect(cart.totalPrice).toBe(0)
  })

  it('totalPrice menghitung harga x quantity', () => {
    const cart = useCartStore()
    cart.addItem({ ...productA, quantity: 2 })
    cart.addItem(productB)
    expect(cart.totalPrice).toBe(150_000 * 2 + 200_000)
  })
})
