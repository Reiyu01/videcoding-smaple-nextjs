'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Clock, MapPin, Phone, Home, DollarSign } from 'lucide-react';

interface Order {
  id: string;
  orderNumber: string;
  items: Array<{ id: string; name: string; price: number; quantity: number }>;
  total: number;
  status: 'PENDING' | 'CONFIRMED' | 'PREPARING' | 'READY' | 'DELIVERED';
  createdAt: string;
  estimatedTime?: number;
}

export default function OrdersPage() {
  const [orders] = useState<Order[]>([
    {
      id: '1',
      orderNumber: 'TWB-20241120-001',
      items: [
        { id: '1', name: '豆漿', price: 2, quantity: 2 },
        { id: '2', name: '蛋餅', price: 3.5, quantity: 1 },
      ],
      total: 7.5,
      status: 'READY',
      createdAt: '2024-11-20 08:30',
      estimatedTime: 5,
    },
    {
      id: '2',
      orderNumber: 'TWB-20241119-045',
      items: [
        { id: '3', name: '蘿蔔糕', price: 3, quantity: 3 },
        { id: '5', name: '紅茶', price: 1.5, quantity: 2 },
      ],
      total: 12,
      status: 'DELIVERED',
      createdAt: '2024-11-19 09:15',
    },
  ]);

  const getStatusLabel = (status: string) => {
    const statusMap: Record<string, string> = {
      PENDING: '待確認',
      CONFIRMED: '已確認',
      PREPARING: '準備中',
      READY: '可取餐',
      DELIVERED: '已完成',
    };
    return statusMap[status] || status;
  };

  const getStatusColor = (status: string) => {
    const colorMap: Record<string, string> = {
      PENDING: 'bg-yellow-100 text-yellow-800',
      CONFIRMED: 'bg-blue-100 text-blue-800',
      PREPARING: 'bg-purple-100 text-purple-800',
      READY: 'bg-green-100 text-green-800',
      DELIVERED: 'bg-gray-100 text-gray-800',
    };
    return colorMap[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/" className="text-blue-600 hover:text-blue-700 font-semibold">
            ← 返回首頁
          </Link>
          <h1 className="text-2xl font-bold text-gray-800 mt-2">我的訂單</h1>
          <p className="text-gray-600 text-sm">查看和追蹤您的所有訂單</p>
        </div>
      </header>

      {/* Orders List */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {orders.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <p className="text-gray-600 text-lg mb-4">目前沒有訂單</p>
            <Link
              href="/"
              className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg transition-all active:scale-95"
            >
              開始訂購
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all p-6">
                {/* Order Header */}
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">訂單 #{order.orderNumber}</h3>
                    <p className="text-sm text-gray-600">{order.createdAt}</p>
                  </div>
                  <span className={`px-4 py-1 rounded-full text-sm font-semibold ${getStatusColor(order.status)}`}>
                    {getStatusLabel(order.status)}
                  </span>
                </div>

                {/* Order Items */}
                <div className="border-y border-gray-200 py-4 mb-4">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between text-sm mb-2 last:mb-0">
                      <span className="text-gray-700">
                        {item.name} × {item.quantity}
                      </span>
                      <span className="font-semibold text-gray-800">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                {/* Order Footer */}
                <div className="flex justify-between items-center">
                  <div className="space-y-2">
                    {order.estimatedTime && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock size={16} className="text-blue-500" />
                        <span>約 {order.estimatedTime} 分鐘取餐</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <DollarSign size={16} className="text-blue-500" />
                      <span className="font-semibold text-gray-800">總計: ${order.total.toFixed(2)}</span>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-all active:scale-95">
                    查看詳情
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
