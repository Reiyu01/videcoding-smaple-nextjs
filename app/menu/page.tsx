'use client';

import Link from 'next/link';
import { ShoppingCart, User, ClipboardList, Zap, HelpCircle, Mail, BarChart3 } from 'lucide-react';

export default function NavigationPage() {
  const menuItems = [
    {
      icon: ShoppingCart,
      label: '購物車',
      href: '/cart',
      description: '查看購物車、修改訂單',
      color: 'bg-blue-500',
    },
    {
      icon: ClipboardList,
      label: '我的訂單',
      href: '/orders',
      description: '查看訂單歷史和追蹤',
      color: 'bg-purple-500',
    },
    {
      icon: User,
      label: '個人資料',
      href: '/profile',
      description: '編輯個人信息和地址',
      color: 'bg-green-500',
    },
    {
      icon: Zap,
      label: '支付',
      href: '/payment',
      description: '完成訂單支付',
      color: 'bg-orange-500',
    },
    {
      icon: HelpCircle,
      label: '常見問題',
      href: '/faq',
      description: '獲得幫助和支持',
      color: 'bg-indigo-500',
    },
    {
      icon: Mail,
      label: '聯絡我們',
      href: '/contact',
      description: '發送消息給我們',
      color: 'bg-pink-500',
    },
    {
      icon: BarChart3,
      label: '管理面板',
      href: '/admin',
      description: '店家管理系統',
      color: 'bg-red-500',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-4xl font-bold text-gray-800">台灣早餐</h1>
          <p className="text-gray-600 mt-2">一站式訂餐平台</p>
        </div>
      </header>

      {/* Main Navigation Grid */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Quick Links */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">快速導航</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              href="/"
              className="bg-white rounded-lg shadow-md hover:shadow-lg p-6 transition-all active:scale-95"
            >
              <div className="text-3xl mb-3">🏠</div>
              <h3 className="font-bold text-gray-800 mb-1">首頁</h3>
              <p className="text-sm text-gray-600">瀏覽所有商品</p>
            </Link>
          </div>
        </div>

        {/* Full Feature Grid */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">所有功能</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all active:scale-95 overflow-hidden group"
                >
                  <div className={`${item.color} h-12 flex items-center px-6`} />
                  <div className="p-6">
                    <div className={`${item.color} inline-flex p-3 rounded-lg mb-4`}>
                      <Icon className="text-white" size={24} />
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 mb-1 group-hover:text-blue-600 transition-colors">
                      {item.label}
                    </h3>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg shadow-lg p-8 text-white">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <p className="text-4xl font-bold">15-20</p>
              <p className="text-blue-100 mt-2">分鐘快速出餐</p>
            </div>
            <div>
              <p className="text-4xl font-bold">100+</p>
              <p className="text-blue-100 mt-2">種商品選擇</p>
            </div>
            <div>
              <p className="text-4xl font-bold">24/7</p>
              <p className="text-blue-100 mt-2">在線客服支持</p>
            </div>
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-3">🚚 送餐範圍</h3>
            <p className="text-gray-600 text-sm">
              台北市中山區、信義區、大安區，訂單滿 $50 免運費
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-3">💳 支付方式</h3>
            <p className="text-gray-600 text-sm">
              信用卡、電子支付 (Line Pay、Apple Pay) 和現金付款
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-3">⭐ 特色優惠</h3>
            <p className="text-gray-600 text-sm">
              使用優惠碼 SAVE10 享 10% 折扣，SAVE20 享 20% 折扣
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
