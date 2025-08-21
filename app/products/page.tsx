'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

type Product = {
  id: number
  name: string
  description: string
  price: number
  categoryId: number
}

type Category = {
  id: number
  name: string
}

export default function ProductListPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null)

  useEffect(() => {
    fetch('/api/categories')
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(console.error)
  }, [])

  useEffect(() => {
    let url = '/api/products'
    if (selectedCategory) {
      url += `?categoryId=${selectedCategory}`
    }
    fetch(url)
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(console.error)
  }, [selectedCategory])

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 p-6">
  {/* Header with glassmorphism effect */}
  <div className="mb-8 p-6 rounded-2xl bg-white/70 backdrop-blur-lg shadow-xl border border-white/20">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white text-xl shadow-lg">
          🛒
        </div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          รายการสินค้า
        </h1>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative">
          <select
            className="appearance-none bg-white/80 backdrop-blur-sm border-2 border-purple-200 rounded-xl px-6 py-3 text-gray-700 shadow-lg focus:ring-4 focus:ring-purple-300 focus:border-purple-400 transition-all duration-300 hover:shadow-xl"
            value={selectedCategory ?? ''}
            onChange={(e) => {
              const val = e.target.value
              setSelectedCategory(val ? Number(val) : null)
            }}
          >
            <option value="">✨ ทั้งหมด</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </select>
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
            <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        <Link
          href="/products/new"
          className="group bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-3 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 flex items-center gap-2"
        >
          <span className="text-lg group-hover:rotate-90 transition-transform duration-300">➕</span>
          เพิ่มสินค้า
        </Link>
      </div>
    </div>
  </div>

  {/* Category filter chips */}
  <div className="mb-8 flex flex-wrap gap-3">
    {categories.map(category => (
      <button
        key={category.id}
        onClick={() => setSelectedCategory(selectedCategory === category.id ? null : category.id)}
        className={`px-4 py-2 rounded-full transition-all duration-300 flex items-center gap-2 ${
          selectedCategory === category.id
            ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg scale-105'
            : 'bg-white/70 hover:bg-white text-gray-600 hover:shadow-md hover:scale-105'
        }`}
      >
        
        {category.name}
      </button>
    ))}
  </div>

  {/* Products grid */}
  <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
    {products.length === 0 ? (
      <li className="col-span-full text-center py-16">
        <div className="text-6xl mb-4 opacity-50">😔</div>
        <p className="text-xl text-gray-500">ไม่พบสินค้าในประเภทนี้</p>
      </li>
    ) : (
      products.map(product => {
        const category = categories.find(cat => cat.id === product.categoryId);
        return (
          <li
            key={product.id}
            className="group bg-white/70 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:bg-white/80 border border-white/20 cursor-pointer relative overflow-hidden"
          >
            {/* Category badge */}
            <div className="flex justify-between items-start mb-4">
              <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium text-white bg-gradient-to-r from-purple-500 to-pink-500 shadow-md">
                
                {category?.name || 'ไม่ระบุ'}
              </div>
              <div className="transition-transform duration-300 group-hover:scale-125 group-hover:rotate-12">
                ✨
              </div>
            </div>

            {/* Product info */}
            <h2 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-purple-600 transition-colors duration-300">
              {product.name}
            </h2>
            
            <p className="text-gray-600 mb-4 text-sm leading-relaxed">
              {product.description}
            </p>
            
            <div className="flex justify-between items-center">
              <div className="text-right">
                <p className="text-2xl font-bold bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">
                  ฿{product.price.toLocaleString()}
                </p>
              </div>
              
              <button className="opacity-0 group-hover:opacity-100 bg-gradient-to-r from-purple-500 to-pink-500 text-white p-2 rounded-lg transition-all duration-300 hover:scale-110">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5L17 18" />
                </svg>
              </button>
            </div>

            {/* Hover effect overlay */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          </li>
        );
      })
    )}
  </ul>

  {/* Floating decorative elements */}
  <div className="fixed top-20 left-10 w-20 h-20 bg-purple-300/20 rounded-full blur-xl animate-pulse pointer-events-none" />
  <div className="fixed top-40 right-20 w-16 h-16 bg-pink-300/20 rounded-full blur-xl animate-pulse delay-1000 pointer-events-none" />
  <div className="fixed bottom-20 left-1/4 w-24 h-24 bg-blue-300/20 rounded-full blur-xl animate-pulse delay-2000 pointer-events-none" />
</div>
  )
}
