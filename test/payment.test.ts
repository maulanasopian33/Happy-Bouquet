import { describe, it, expect } from 'vitest'
import { computePaymentSummary } from '../utils/payment'

describe('computePaymentSummary', () => {
  it('tanpa metode: bayar penuh, label Total, sisa 0', () => {
    const s = computePaymentSummary(150_000, null)
    expect(s.totalLabel).toBe('Total')
    expect(s.amountToPay).toBe(150_000)
    expect(s.remainingAmount).toBe(0)
  })

  it('lunas: bayar penuh, sisa 0', () => {
    const s = computePaymentSummary(100_000, { id: 'full_payment', rate: 1 })
    expect(s.totalLabel).toBe('Tagihan Total')
    expect(s.amountToPay).toBe(100_000)
    expect(s.remainingAmount).toBe(0)
  })

  it('DP 70%: bayar 70rb, sisa 30rb, label Total Pesanan', () => {
    const s = computePaymentSummary(100_000, { id: 'dp_70', rate: 0.7 })
    expect(s.totalLabel).toBe('Total Pesanan')
    expect(s.amountToPay).toBe(70_000)
    expect(s.remainingAmount).toBe(30_000)
  })

  it('DP 50%: bayar setengah, sisa setengah', () => {
    const s = computePaymentSummary(240_000, { id: 'dp_50', rate: 0.5 })
    expect(s.amountToPay).toBe(120_000)
    expect(s.remainingAmount).toBe(120_000)
  })

  it('COD rate 0: bayar 0 saat terima, sisa penuh, label Total Bayar COD', () => {
    const s = computePaymentSummary(90_000, { id: 'cod', rate: 0 })
    expect(s.totalLabel).toBe('Total Bayar COD')
    expect(s.amountToPay).toBe(0)
    expect(s.remainingAmount).toBe(90_000)
  })

  it('sisa DP + totalAmount konsisten', () => {
    const total = 123_456
    const s = computePaymentSummary(total, { id: 'dp_30', rate: 0.3 })
    expect(s.totalAmount).toBe(total)
    expect(s.amountToPay + s.remainingAmount).toBe(total)
  })
})
