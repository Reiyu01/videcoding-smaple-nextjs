'use client';

import { useState } from 'react';
import Link from 'next/link';
import { BarChart3, Package, ShoppingBag, DollarSign, TrendingUp, Edit2, Trash2 } from 'lucide-react';

interface AdminProduct {
  id: string;
  name: string;
  nameZh: string;
  price: number;
  category: string;
  available: boolean;
  orders: number;
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [products, setProducts] = useState<AdminProduct[]>([
    { id: '1', name: 'Soy Milk', nameZh: '豆漿', price: 2, category: 'DRINK', available: true, orders: 45 },
    { id: '2', name: 'Egg Crepe', nameZh: '蛋餅', price: 3.5, category: 'MAIN', available: true, orders: 32 },
    { id: '3', name: 'Radish Cake', nameZh: '蘿蔔糕', price: 3, category: 'SIDE', available: true, orders: 28 },
  ]);

  const [newProduct, setNewProduct] = useState({
    nameZh: '',
    name: '',
    price: '',
    category: 'DRINK',
  });

  const stats = [
    { label: '今日訂單', value: '12', icon: ShoppingBag, color: 'bg-blue-500' },
    { label: '今日營收', value: '$127.50', icon: DollarSign, color: 'bg-green-500' },
    { label: '商品總數', value: products.length, icon: Package, color: 'bg-purple-500' },
    { label: '月均成長', value: '+12%', icon: TrendingUp, color: 'bg-orange-500' },
  ];

  const handleAddProduct = () => {
    if (newProduct.nameZh && newProduct.name && newProduct.price) {
      setProducts([
        ...products,
        {
          id: Date.now().toString(),
          name: newProduct.name,
          nameZh: newProduct.nameZh,
          price: parseFloat(newProduct.price),
          category: newProduct.category,
          available: true,
          orders: 0,
        },
      ]);
      setNewProduct({ nameZh: '', name: '', price: '', category: 'DRINK' });
    }
  };

  const handleDeleteProduct = (id: string) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">管理面板</h1>
            <p className="text-sm text-gray-600">台灣早餐 - 店家管理</p>
          </div>
          <Link
            href="/"
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-all active:scale-95"
          >
            查看客戶頁面
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">{stat.label}</p>
                    <p className="text-3xl font-bold text-gray-800 mt-2">{stat.value}</p>
                  </div>
                  <div className={`${stat.color} p-3 rounded-full`}>
                    <Icon className="text-white" size={24} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-3 font-semibold border-b-2 transition-all ${
              activeTab === 'overview'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-800'
            }`}
          >
            概覽
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`px-4 py-3 font-semibold border-b-2 transition-all ${
              activeTab === 'products'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-800'
            }`}
          >
            商品管理
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-3 font-semibold border-b-2 transition-all ${
              activeTab === 'orders'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-800'
            }`}
          >
            訂單列表
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">店家概覽</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-700 mb-3">本週訂單趨勢</h3>
                <div className="flex items-end gap-2 h-40 bg-gray-50 p-4 rounded-lg">
                  {[40, 60, 45, 75, 55, 80, 65].map((height, i) => (
                    <div
                      key={i}
                      className="flex-1 bg-blue-400 rounded-t opacity-75 hover:opacity-100 transition-opacity"
                      style={{ height: `${height}%` }}
                    />
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-700 mb-3">熱銷商品排行</h3>
                <div className="space-y-2">
                  {products
                    .sort((a, b) => b.orders - a.orders)
                    .slice(0, 5)
                    .map((product, idx) => (
                      <div key={product.id} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                        <span className="text-gray-700">
                          {idx + 1}. {product.nameZh}
                        </span>
                        <span className="text-sm font-semibold text-blue-600">{product.orders} 訂單</span>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'products' && (
          <div className="space-y-6">
            {/* Add Product Form */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">新增商品</h2>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-3 items-end">
                <input
                  type="text"
                  placeholder="中文名稱"
                  value={newProduct.nameZh}
                  onChange={(e) => setNewProduct({ ...newProduct, nameZh: e.target.value })}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  placeholder="英文名稱"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="number"
                  placeholder="價格"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <select
                  value={newProduct.category}
                  onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="DRINK">飲料</option>
                  <option value="MAIN">主食</option>
                  <option value="SIDE">配菜</option>
                </select>
                <button
                  onClick={handleAddProduct}
                  className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-all active:scale-95"
                >
                  新增
                </button>
              </div>
            </div>

            {/* Products List */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">商品名稱</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">分類</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">價格</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">銷售數</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">狀態</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">操作</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id} className="border-b hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-3 text-sm text-gray-800">{product.nameZh}</td>
                      <td className="px-6 py-3 text-sm text-gray-600">{product.category}</td>
                      <td className="px-6 py-3 text-sm font-semibold text-gray-800">${product.price.toFixed(2)}</td>
                      <td className="px-6 py-3 text-sm text-gray-600">{product.orders}</td>
                      <td className="px-6 py-3 text-sm">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          product.available
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {product.available ? '上架' : '下架'}
                        </span>
                      </td>
                      <td className="px-6 py-3 text-sm flex gap-2">
                        <button className="p-2 hover:bg-blue-50 text-blue-600 rounded transition-all active:scale-90">
                          <Edit2 size={18} />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(product.id)}
                          className="p-2 hover:bg-red-50 text-red-600 rounded transition-all active:scale-90"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">最近訂單</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left font-semibold text-gray-700">訂單號</th>
                    <th className="px-6 py-3 text-left font-semibold text-gray-700">時間</th>
                    <th className="px-6 py-3 text-left font-semibold text-gray-700">金額</th>
                    <th className="px-6 py-3 text-left font-semibold text-gray-700">狀態</th>
                    <th className="px-6 py-3 text-left font-semibold text-gray-700">操作</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b hover:bg-gray-50">
                    <td className="px-6 py-3">TWB-20241120-001</td>
                    <td className="px-6 py-3">08:30</td>
                    <td className="px-6 py-3 font-semibold">$7.50</td>
                    <td className="px-6 py-3">
                      <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">
                        已完成
                      </span>
                    </td>
                    <td className="px-6 py-3">
                      <button className="text-blue-600 hover:text-blue-700 font-semibold">詳情</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
