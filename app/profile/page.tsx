'use client';

import { useState } from 'react';
import Link from 'next/link';
import { User, Mail, Phone, MapPin, Heart, LogOut } from 'lucide-react';

export default function ProfilePage() {
  const [userInfo, setUserInfo] = useState({
    name: '張家榮',
    email: 'user@example.com',
    phone: '+886 912 345 678',
    address: '台北市中山區民權東路',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState(userInfo);

  const handleSave = () => {
    setUserInfo(editForm);
    setIsEditing(false);
  };

  const addresses = [
    { id: 1, label: '家', address: '台北市中山區民權東路', isDefault: true },
    { id: 2, label: '公司', address: '台北市信義區信義路', isDefault: false },
  ];

  const favoriteItems = [
    { id: 1, name: '豆漿', count: 5 },
    { id: 2, name: '蛋餅', count: 3 },
    { id: 3, name: '紅茶', count: 7 },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/" className="text-blue-600 hover:text-blue-700 font-semibold">
            ← 返回首頁
          </Link>
          <h1 className="text-2xl font-bold text-gray-800 mt-2">個人資料</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Column - User Info */}
          <div className="md:col-span-2 space-y-6">
            {/* Profile Card */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800">基本信息</h2>
                <button
                  onClick={() => {
                    if (isEditing) handleSave();
                    setIsEditing(!isEditing);
                  }}
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-all active:scale-95"
                >
                  {isEditing ? '保存' : '編輯'}
                </button>
              </div>

              {!isEditing ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <User className="text-blue-500" size={20} />
                    <div>
                      <p className="text-sm text-gray-600">姓名</p>
                      <p className="font-semibold text-gray-800">{userInfo.name}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="text-blue-500" size={20} />
                    <div>
                      <p className="text-sm text-gray-600">電子郵件</p>
                      <p className="font-semibold text-gray-800">{userInfo.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="text-blue-500" size={20} />
                    <div>
                      <p className="text-sm text-gray-600">電話</p>
                      <p className="font-semibold text-gray-800">{userInfo.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="text-blue-500" size={20} />
                    <div>
                      <p className="text-sm text-gray-600">預設地址</p>
                      <p className="font-semibold text-gray-800">{userInfo.address}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">姓名</label>
                    <input
                      type="text"
                      value={editForm.name}
                      onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">電子郵件</label>
                    <input
                      type="email"
                      value={editForm.email}
                      onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">電話</label>
                    <input
                      type="tel"
                      value={editForm.phone}
                      onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">預設地址</label>
                    <input
                      type="text"
                      value={editForm.address}
                      onChange={(e) => setEditForm({ ...editForm, address: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Addresses */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">送餐地址</h2>
                <button className="text-blue-600 hover:text-blue-700 font-semibold">+ 新增地址</button>
              </div>
              <div className="space-y-3">
                {addresses.map((addr) => (
                  <div key={addr.id} className="border border-gray-200 rounded-lg p-4 flex justify-between items-start">
                    <div>
                      <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-sm font-semibold rounded-full mb-2">
                        {addr.label}
                      </span>
                      <p className="text-gray-700">{addr.address}</p>
                      {addr.isDefault && <p className="text-sm text-gray-500 mt-1">預設地址</p>}
                    </div>
                    <button className="text-gray-400 hover:text-gray-600">⋮</button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Favorite Items */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center gap-2 mb-4">
                <Heart className="text-red-500" size={20} />
                <h3 className="text-lg font-bold text-gray-800">常點商品</h3>
              </div>
              <div className="space-y-2">
                {favoriteItems.map((item) => (
                  <div key={item.id} className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">{item.name}</span>
                    <span className="text-sm text-gray-500">{item.count}次</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="space-y-2">
              <Link
                href="/orders"
                className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-all active:scale-95"
              >
                查看訂單
              </Link>
              <button className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-lg transition-all active:scale-95">
                <LogOut size={18} />
                登出
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
