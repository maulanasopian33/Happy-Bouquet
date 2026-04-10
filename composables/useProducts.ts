export interface Product {
  id: number
  title: string
  price: number
  originalPrice?: number
  image: string
  description: string
  stock: number
  variants: any[]
  rating?: number
  reviewCount?: number
  images: string[]
  category?: string
  seller: {
    name: string
    online: string
    rating: number
    followers: string
  }
  shipping: {
    origin: string
    eta: string
    basePrice: number
  }
}

const allProducts: Product[] = [
  {
    id: 1,
    title: "Bouquet Romantis — HappyBouquet",
    price: 150000,
    originalPrice: 199000,
    stock: 25,
    description:
      '\nBouquet cantik dengan kombinasi mawar dan eustoma. Dilengkapi kartu ucapan. \nPilih warna kertas dan bunga untuk personalisasi.\n',
    rating: 4.8,
    reviewCount: 88,
    image: "https://images.unsplash.com/photo-1547096301-4ebda79e93d7?q=80",
    images: [
      "https://images.unsplash.com/photo-1547096301-4ebda79e93d7?q=80",
      "https://images.unsplash.com/photo-1567649532312-34b3969a5f87?q=80",
      "https://images.unsplash.com/photo-1551893138-e44b1a4a5e9a?q=80",
    ],
    variants: [
      {
        id: 'paper_color',
        name: 'Warna Kertas',
        type: 'visual',
        options: [
          { id: 'pc1', label: 'Pink Pastel', value: '#fbcfe8', image: '/images/swatches/pink.png' },
          { id: 'pc2', label: 'Lavender', value: '#e9d5ff', image: '/images/swatches/lavender.png' },
          { id: 'pc3', label: 'Ivory', value: '#fff7ed', image: '/images/swatches/ivory.png' },
        ],
      },
      {
        id: 'flower_color',
        name: 'Warna Bunga',
        type: 'visual',
        options: [
          { id: 'fc1', label: 'Merah Muda', value: '#ff85a2', image: '/images/swatches/rose.png' },
          { id: 'fc2', label: 'Putih', value: '#ffffff', image: '/images/swatches/white.png' },
        ],
      },
      {
        id: 'size',
        name: 'Ukuran',
        type: 'text',
        options: [
          { id: 's', label: 'Small' },
          { id: 'm', label: 'Medium' },
          { id: 'l', label: 'Large' },
        ],
      },
    ],
    seller: {
      name: 'HappyBouquet Official',
      online: 'Online 30 menit lalu',
      rating: 4.9,
      followers: '12k',
    },
    shipping: {
      origin: 'Jakarta',
      eta: '1-3 hari',
      basePrice: 10000,
    },
    category: "Bunga Segar"
  },
  {
    id: 2,
    title: "Buket Minimalis",
    price: 95000,
    description: "Desain buket yang simpel namun tetap elegan, cocok untuk berbagai kesempatan. Menggunakan bunga daisy dan sentuhan daun eukaliptus yang menenangkan.",
    rating: 4.5,
    reviewCount: 102,
    image: "https://images.unsplash.com/photo-1528825871115-3581a5387919?q=80",
    images: [
      "https://images.unsplash.com/photo-1528825871115-3581a5387919?q=80",
    ],
    stock: 50,
    variants: [],
    seller: { name: 'Toko Bunga ABC', online: 'Online 1 jam lalu', rating: 4.7, followers: '5k' },
    shipping: { origin: 'Bandung', eta: '2-4 hari', basePrice: 12000 },
    category: "Bunga Segar"
  },
  {
    id: 3,
    title: "Buket Bunga Matahari",
    price: 125000,
    description: "Bawa keceriaan dengan buket bunga matahari yang cerah. Melambangkan kebahagiaan dan optimisme, hadiah yang sempurna untuk mencerahkan hari seseorang.",
    rating: 4.9,
    reviewCount: 120,
    image: "https://images.unsplash.com/photo-1597822622510-cd5368da973d?q=80",
    images: [
      "https://images.unsplash.com/photo-1597822622510-cd5368da973d?q=80",
    ],
    stock: 30,
    variants: [],
    seller: { name: 'Toko Bunga ABC', online: 'Online 1 jam lalu', rating: 4.7, followers: '5k' },
    shipping: { origin: 'Bandung', eta: '2-4 hari', basePrice: 12000 },
    category: "Bunga Segar"
  },
  {
    id: 4,
    title: "Buket Tulip Putih",
    price: 180000,
    description: "Keanggunan tulip putih yang melambangkan kesucian, pengampunan, dan cinta yang tulus. Pilihan klasik untuk momen romantis atau permintaan maaf.",
    rating: 4.7,
    reviewCount: 75,
    image: "https://images.unsplash.com/photo-1518701006-57d5488e7a84?q=80",
    images: [
      "https://images.unsplash.com/photo-1518701006-57d5488e7a84?q=80",
    ],
    stock: 15,
    variants: [],
    seller: { name: 'Florist Mewah', online: 'Online 5 menit lalu', rating: 4.9, followers: '20k' },
    shipping: { origin: 'Jakarta', eta: '1-2 hari', basePrice: 15000 },
    category: "Bunga Segar"
  },
  // ... tambahkan semua produk lain di sini
];

export const useProducts = () => {
  // Simulate API call
  const findProduct = async (id: number): Promise<Product | undefined> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const product = allProducts.find(p => p.id === id);
        if (product) {
          resolve(product);
        } else {
          reject(new Error('Product not found'));
        }
      }, 500); // Simulate 500ms network delay
    });
  }

  const getRelatedProducts = async (currentProduct: Product): Promise<Product[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const related = allProducts.filter(p => p.category === currentProduct.category && p.id !== currentProduct.id).slice(0, 4);
        resolve(related);
      }, 500);
    });
  }

  return { allProducts, findProduct, getRelatedProducts };
}