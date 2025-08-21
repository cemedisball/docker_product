'use client'

import { useState, useEffect } from 'react'

type Category = {
  id: number
  name: string
}

export default function AddProductPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState<number | ''>('')
  const [categoryId, setCategoryId] = useState<number | ''>('')
  const [newCategoryName, setNewCategoryName] = useState('')

  useEffect(() => {
    fetchCategories()
  }, [])

  async function fetchCategories() {
    try {
      const res = await fetch('/api/categories')
      const data = await res.json()
      setCategories(data)
    } catch (error) {
      console.error(error)
    }
  }

  // ฟังก์ชันเพิ่มหมวดหมู่ใหม่
  async function handleAddCategory() {
    if (!newCategoryName.trim()) {
      alert('กรุณากรอกชื่อหมวดหมู่')
      return
    }
    try {
      const res = await fetch('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newCategoryName }),
      })
      if (!res.ok) {
        alert('เพิ่มหมวดหมู่ไม่สำเร็จ')
        return
      }
      alert('เพิ่มหมวดหมู่สำเร็จ!')
      setNewCategoryName('')
      fetchCategories() // โหลดหมวดหมู่ใหม่ เพื่อแสดงใน dropdown
    } catch (error) {
      console.error(error)
      alert('เกิดข้อผิดพลาดในการเพิ่มหมวดหมู่')
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name || !description || !price || !categoryId) {
      alert('กรุณากรอกข้อมูลให้ครบทุกช่อง')
      return
    }

    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          description,
          price: Number(price),
          categoryId: Number(categoryId),
        }),
      })

      if (!res.ok) {
        alert('เพิ่มสินค้าไม่สำเร็จ')
        return
      }

      alert('เพิ่มสินค้าสำเร็จ!')
      window.location.href = '/products'
    } catch (error) {
      console.error(error)
      alert('เกิดข้อผิดพลาดในการเพิ่มสินค้า')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 p-6 flex items-center justify-center">
  <div className="p-8 max-w-lg w-full mx-auto space-y-8 bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/30">
    {/* Header */}
    <div className="text-center">
      <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg mx-auto mb-4">
        ✨
      </div>
      <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
        เพิ่มสินค้าใหม่
      </h1>
      <p className="text-gray-600 mt-2">เติมข้อมูลสินค้าของคุณ</p>
    </div>

    {/* ฟอร์มเพิ่มสินค้า */}
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="group">
        <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
          🏷️ ชื่อสินค้า
        </label>
        <input
          type="text"
          placeholder="ระบุชื่อสินค้า..."
          value={name}
          onChange={e => setName(e.target.value)}
          className="w-full px-4 py-3 bg-white/70 border-2 border-purple-200 rounded-xl focus:ring-4 focus:ring-purple-300 focus:border-purple-400 transition-all duration-300 hover:shadow-md group-hover:border-purple-300"
        />
      </div>

      <div className="group">
        <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
          📝 รายละเอียด
        </label>
        <textarea
          placeholder="อธิบายรายละเอียดสินค้า..."
          value={description}
          onChange={e => setDescription(e.target.value)}
          rows={3}
          className="w-full px-4 py-3 bg-white/70 border-2 border-purple-200 rounded-xl focus:ring-4 focus:ring-purple-300 focus:border-purple-400 transition-all duration-300 hover:shadow-md resize-none group-hover:border-purple-300"
        />
      </div>

      <div className="group">
        <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
          💰 ราคา
        </label>
        <div className="relative">
          <input
            type="number"
            placeholder="0"
            value={price}
            onChange={e => setPrice(e.target.value === '' ? '' : Number(e.target.value))}
            className="w-full px-4 py-3 pl-12 bg-white/70 border-2 border-purple-200 rounded-xl focus:ring-4 focus:ring-purple-300 focus:border-purple-400 transition-all duration-300 hover:shadow-md group-hover:border-purple-300"
          />
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">
            ฿
          </div>
        </div>
      </div>

      <div className="group">
        <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
          📦 หมวดหมู่
        </label>
        <div className="relative">
          <select
            value={categoryId}
            onChange={e => setCategoryId(e.target.value === '' ? '' : Number(e.target.value))}
            className="w-full appearance-none px-4 py-3 bg-white/70 border-2 border-purple-200 rounded-xl focus:ring-4 focus:ring-purple-300 focus:border-purple-400 transition-all duration-300 hover:shadow-md group-hover:border-purple-300"
          >
            <option value="">เลือกหมวดหมู่...</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
            <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      <button 
        type="submit" 
        className="w-full group bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-4 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 font-semibold text-lg flex items-center justify-center gap-3"
      >
        <span className="group-hover:rotate-12 transition-transform duration-300">🚀</span>
        เพิ่มสินค้า
        <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
      </button>
    </form>

    {/* Divider */}
    <div className="relative">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-gradient-to-r from-purple-200 to-pink-200"></div>
      </div>
      <div className="relative flex justify-center text-sm">
        <span className="px-4 bg-white/80 text-gray-500 font-medium rounded-full">หรือ</span>
      </div>
    </div>

    {/* ฟอร์มเพิ่มหมวดหมู่ใหม่ */}
    <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border-2 border-green-200/50">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center text-white shadow-md">
          📁
        </div>
        <h2 className="text-xl font-bold text-gray-800">เพิ่มหมวดหมู่ใหม่</h2>
      </div>
      
      <div className="space-y-4">
        <div className="group">
          <input
            type="text"
            placeholder="ชื่อหมวดหมู่ใหม่..."
            value={newCategoryName}
            onChange={e => setNewCategoryName(e.target.value)}
            className="w-full px-4 py-3 bg-white/70 border-2 border-green-200 rounded-xl focus:ring-4 focus:ring-green-300 focus:border-green-400 transition-all duration-300 hover:shadow-md group-hover:border-green-300"
          />
        </div>
        
        <button
          onClick={handleAddCategory}
          className="w-full group bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-4 py-3 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 font-semibold flex items-center justify-center gap-3"
        >
          <span className="group-hover:rotate-90 transition-transform duration-300">➕</span>
          สร้างหมวดหมู่
        </button>
      </div>
    </div>

    {/* Floating decorative elements */}
    <div className="absolute -top-10 -left-10 w-20 h-20 bg-purple-300/20 rounded-full blur-xl animate-pulse pointer-events-none" />
    <div className="absolute -bottom-10 -right-10 w-16 h-16 bg-pink-300/20 rounded-full blur-xl animate-pulse delay-1000 pointer-events-none" />
  </div>
</div>
  )
}
