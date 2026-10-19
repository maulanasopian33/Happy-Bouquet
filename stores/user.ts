import { defineStore } from 'pinia'

export interface Order {
  id: string
  date: string
  status: 'Diproses' | 'Dikirim' | 'Selesai' | 'Dibatalkan'
  total: number
  items: number
  tracking: {
    status: string
    updatedAt: string
    steps: {
      label: string
      time: string
      isDone: boolean
      isCurrent?: boolean
    }[]
  }
}

export interface Voucher {
  id: string
  code: string
  discount: string
  description: string
  expiryDate: string
  isUsed: boolean
}

export interface UserAddress {
  id: number
  label: string
  receiver: string
  phone: string
  fullAddress: string
  isDefault: boolean
}

export interface LoginSession {
  id: string
  device: string
  browser: string
  location: string
  time: string
  isCurrent: boolean
}

export interface UserProfile {
  name: string
  email: string
  phone: string
  address: string
  memberSince: string
  avatar?: string
  tier: string
  points: number
}

export const useUserStore = defineStore('user', () => {
  const profile = ref<UserProfile>({
    name: 'Pelanggan',
    email: 'pelanggan@example.com',
    phone: '0812-xxxx-xxxx',
    address: '[ISI: alamat Anda]',
    memberSince: '2026',
    avatar: 'https://ui-avatars.com/api/?name=Pelanggan&background=E11D48&color=fff',
    tier: 'Member',
    points: 0
  })

  const orders = ref<Order[]>([
    { 
      id: 'HB-9921', 
      date: '01 April 2026', 
      status: 'Diproses', 
      total: 245000, 
      items: 1,
      tracking: {
        status: 'Bunga sedang dirangkai oleh florist kami.',
        updatedAt: '02 April 2026, 14:00',
        steps: [
          { label: 'Pesanan Diterima', time: '01 April, 10:00', isDone: true },
          { label: 'Pembayaran Terverifikasi', time: '01 April, 10:05', isDone: true },
          { label: 'Bunga Sedang Dirangkai', time: '02 April, 09:00', isDone: true, isCurrent: true },
          { label: 'Siap Dikirim', time: '-', isDone: false },
          { label: 'Selesai', time: '-', isDone: false },
        ]
      }
    },
    { 
      id: 'HB-8812', 
      date: '25 Maret 2026', 
      status: 'Selesai', 
      total: 150000, 
      items: 1,
      tracking: {
        status: 'Paket telah diterima oleh customer.',
        updatedAt: '26 Maret 2026, 17:30',
        steps: [
          { label: 'Pesanan Diterima', time: '25 Maret, 09:00', isDone: true },
          { label: 'Selesai', time: '26 Maret, 17:30', isDone: true, isCurrent: true },
        ]
      }
    }
  ])

  const vouchers = ref<Voucher[]>([
    { id: '1', code: 'HAPPY20', discount: '20%', description: 'Diskon untuk koleksi Rose Bouquet', expiryDate: '30 April 2026', isUsed: false },
    { id: '2', code: 'FREEONGKIR', discount: 'Gratis Ongkir', description: 'Min. pembelian Rp 200rb', expiryDate: '15 Mei 2026', isUsed: false },
  ])

  const addresses = ref<UserAddress[]>([
    { id: 1, label: 'Rumah', receiver: 'Penerima', phone: '0812-xxxx-xxxx', fullAddress: '[ISI: alamat rumah]', isDefault: true },
    { id: 2, label: 'Kantor', receiver: 'Penerima', phone: '0812-xxxx-xxxx', fullAddress: '[ISI: alamat kantor]', isDefault: false },
  ])

  const loginSessions = ref<LoginSession[]>([
    { id: 's1', device: 'Perangkat Saat Ini', browser: 'Browser', location: 'Indonesia', time: 'Baru Saja', isCurrent: true },
    { id: 's2', device: 'Perangkat Lain', browser: 'Browser', location: 'Indonesia', time: '2 hari yang lalu', isCurrent: false },
  ])

  const updateProfile = (newProfile: UserProfile) => {
    profile.value = { ...profile.value, ...newProfile }
  }

  return {
    profile,
    orders,
    vouchers,
    addresses,
    loginSessions,
    updateProfile
  }
})
