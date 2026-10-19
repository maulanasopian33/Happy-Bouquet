export interface PaymentSelection {
  id: string
  name?: string
  rate: number
}

export interface PaymentSummary {
  totalLabel: string
  totalAmount: number
  amountToPay: number
  remainingAmount: number
}

// Dipakai halaman checkout; diuji di test/payment.test.ts
export function computePaymentSummary(total: number, p: PaymentSelection | null): PaymentSummary {
  if (!p) return { totalLabel: 'Total', totalAmount: total, amountToPay: total, remainingAmount: 0 }

  const amountToPay = total * p.rate
  const remainingAmount = total - amountToPay

  let totalLabel = 'Tagihan Total'
  if (p.id.startsWith('dp')) {
    totalLabel = 'Total Pesanan'
  } else if (p.id === 'cod') {
    totalLabel = 'Total Bayar COD'
  }

  return {
    totalLabel,
    totalAmount: total,
    amountToPay,
    remainingAmount,
  }
}
