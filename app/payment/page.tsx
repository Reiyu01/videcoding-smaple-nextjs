'use client';

import { useState } from 'react';
import Link from 'next/link';
import { CreditCard, DollarSign, Lock, CheckCircle } from 'lucide-react';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  notes?: string;
}

export default function PaymentPage() {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const cartItems: CartItem[] = [
    { id: '1', name: '豆漿', price: 2, quantity: 2 },
    { id: '2', name: '蛋餅', price: 3.5, quantity: 1 },
  ];

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.1;
  const deliveryFee = 2;
  const total = subtotal + tax + deliveryFee;

  const handlePayment = async () => {
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);
    }, 2000);
  };

  if (paymentSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
          <CheckCircle className="mx-auto text-green-500 mb-4" size={64} />
          <h1 className="text-3xl font-bold text-gray-800 mb-2">支付成功!</h1>
          <p className="text-gray-600 mb-6">您的訂單已確認，將在 15-20 分鐘內送達</p>
          <div className="bg-blue-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-600 mb-1">訂單號碼</p>
            <p className="text-2xl font-bold text-blue-600">TWB-20241120-001</p>
          </div>
          <Link
            href="/orders"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-lg transition-all active:scale-95 block mb-3"
          >
            查看訂單
          </Link>
          <Link
            href="/"
            className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 rounded-lg transition-all active:scale-95"
          >
            返回首頁
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/cart" className="text-blue-600 hover:text-blue-700 font-semibold">
            ← 返回購物車
          </Link>
          <h1 className="text-2xl font-bold text-gray-800 mt-2">付款</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Column - Payment Info */}
          <div className="md:col-span-2 space-y-6">
            {/* Order Summary */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-bold text-gray-800 mb-4">訂單摘要</h2>
              <div className="space-y-3">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-gray-700">
                      {item.name} × {item.quantity}
                    </span>
                    <span className="font-semibold text-gray-800">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-200 mt-4 pt-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">小計</span>
                  <span className="text-gray-800">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">稅金 (10%)</span>
                  <span className="text-gray-800">${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm mb-4">
                  <span className="text-gray-600">配送費</span>
                  <span className="text-gray-800">${deliveryFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-lg border-t pt-4">
                  <span>總計</span>
                  <span className="text-blue-600">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-bold text-gray-800 mb-4">選擇付款方式</h2>
              <div className="space-y-3">
                {/* Credit Card */}
                <label className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  paymentMethod === 'card' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                }`}>
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    checked={paymentMethod === 'card'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-4 h-4 mr-3"
                  />
                  <CreditCard className="text-blue-500 mr-3" size={20} />
                  <span className="font-semibold text-gray-800">信用卡</span>
                </label>

                {/* Cash on Delivery */}
                <label className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  paymentMethod === 'cash' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                }`}>
                  <input
                    type="radio"
                    name="payment"
                    value="cash"
                    checked={paymentMethod === 'cash'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-4 h-4 mr-3"
                  />
                  <DollarSign className="text-green-500 mr-3" size={20} />
                  <span className="font-semibold text-gray-800">現金付款</span>
                </label>

                {/* Digital Payment */}
                <label className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  paymentMethod === 'digital' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                }`}>
                  <input
                    type="radio"
                    name="payment"
                    value="digital"
                    checked={paymentMethod === 'digital'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-4 h-4 mr-3"
                  />
                  <Lock className="text-purple-500 mr-3" size={20} />
                  <span className="font-semibold text-gray-800">電子支付 (Line Pay / Apple Pay)</span>
                </label>
              </div>
            </div>

            {/* Delivery Address */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-bold text-gray-800 mb-4">送餐地址</h2>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-gray-700 font-semibold">台北市中山區民權東路 123 號</p>
                <p className="text-sm text-gray-600 mt-1">電話: +886 912 345 678</p>
              </div>
            </div>
          </div>

          {/* Right Column - Summary */}
          <div>
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-20">
              <h3 className="text-lg font-bold text-gray-800 mb-4">支付詳情</h3>
              <div className="space-y-2 mb-6 pb-6 border-b">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">小計</span>
                  <span className="text-gray-800">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">稅金</span>
                  <span className="text-gray-800">${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">配送</span>
                  <span className="text-gray-800">${deliveryFee.toFixed(2)}</span>
                </div>
              </div>
              <div className="flex justify-between font-bold text-lg mb-6">
                <span>應付金額</span>
                <span className="text-blue-600">${total.toFixed(2)}</span>
              </div>
              <button
                onClick={handlePayment}
                disabled={isProcessing}
                className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white font-bold py-3 rounded-lg transition-all active:scale-95"
              >
                {isProcessing ? '處理中...' : '確認支付'}
              </button>
              <p className="text-xs text-gray-500 text-center mt-4">
                點擊確認支付即表示同意我們的條款和條件
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
