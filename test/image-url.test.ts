import { describe, expect, it } from 'vitest'
import { resolveImageUrl } from '../composables/useProducts'

describe('resolveImageUrl', () => {
  const apiUrl = 'https://api.happybouquet.web.id/api'

  // Regresi BUG-0033: replace('/api','') memotong 'https://api.' -> 'https:/'
  it('gabung origin API + photo_url relatif tanpa slash (bentuk API sekarang)', () => {
    expect(resolveImageUrl('public/uploads/media/a.png', apiUrl))
      .toBe('https://api.happybouquet.web.id/public/uploads/media/a.png')
  })

  it('photo_url diawali slash tidak menghasilkan double slash', () => {
    expect(resolveImageUrl('/public/uploads/a.png', apiUrl))
      .toBe('https://api.happybouquet.web.id/public/uploads/a.png')
  })

  it('URL absolut dipertahankan apa adanya', () => {
    expect(resolveImageUrl('https://cdn.example.com/a.png', apiUrl))
      .toBe('https://cdn.example.com/a.png')
  })

  it('kosong/tidak ada -> /default.png', () => {
    expect(resolveImageUrl(undefined, apiUrl)).toBe('/default.png')
    expect(resolveImageUrl('', apiUrl)).toBe('/default.png')
  })

  it('dev server: origin localhost tanpa path /api', () => {
    expect(resolveImageUrl('public/uploads/a.png', 'http://localhost:5000/api'))
      .toBe('http://localhost:5000/public/uploads/a.png')
  })
})
