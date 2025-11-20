'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Minus, Plus, Trash2, ArrowLeft, Gift, Truck } from 'lucide-react';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  notes?: string;
}

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // 標記客戶端已掛載
    setIsClient(true);
    
    // 從 localStorage 讀取購物車數據
    try {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        setCart(parsedCart);
      }
    } catch (error) {
      console.error('Error reading cart from localStorage:', error);
    }
  }, []);

  useEffect(() => {
    // 每當購物車改變時，保存到 localStorage
    if (isClient) {
      try {
        localStorage.setItem('cart', JSON.stringify(cart));
      } catch (error) {
        console.error('Error saving cart to localStorage:', error);
      }
    }
  }, [cart, isClient]);

  const handleQuantityChange = (id: string, change: number) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.id === id) {
            const newQuantity = Math.max(1, item.quantity + change);
            return { ...item, quantity: newQuantity };
          }
          return item;
        })
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveItem = (id: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    if (confirm('確定要清空購物車嗎？')) {
      setCart([]);
    }
  };

  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [selectedAddress, setSelectedAddress] = useState('default');

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.1; // 10% 稅金
  const deliveryFee = 2;
  const discountAmount = subtotal * (discount / 100);
  const total = subtotal + tax + deliveryFee - discountAmount;

  const applyCoupon = () => {
    if (couponCode === 'SAVE10') {
      setDiscount(10);
      setCouponCode('');
    } else if (couponCode === 'SAVE20') {
      setDiscount(20);
      setCouponCode('');
    } else {
      alert('優惠券無效');
    }
  };

  if (!isClient) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white border-b">
        <div className="max-w-md mx-auto px-4 py-4 flex items-center gap-4">
          <Link
            href="/"
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="返回首頁"
          >
            <ArrowLeft size={24} className="text-gray-700" />
          </Link>
          <h1 className="text-xl font-bold text-gray-800">我的訂單</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-md mx-auto px-4 py-8">
        {cart.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-gray-600 mb-6">購物車為空</p>
            <Link
              href="/"
              className="inline-block px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-colors"
            >
              繼續購物
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Cart Items */}
            <div className="space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="border-b pb-4 last:border-b-0">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-medium text-gray-800">{item.name}</h3>
                      <p className="text-sm text-gray-500">x {item.quantity}</p>
                      {item.notes && <p className="text-xs text-gray-400 mt-1">備註: {item.notes}</p>}
                    </div>
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="p-1 text-gray-400 hover:text-red-500 transition-all active:scale-75"
                      aria-label="移除商品"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>

                  {/* Quantity and Price Controls */}
                  <div className="flex items-center justify-between">
                    {/* Quantity Control */}
                    <div className="flex items-center gap-2 bg-gray-100 rounded-full px-3 py-2">
                      <button
                        onClick={() => handleQuantityChange(item.id, -1)}
                        className="p-1 hover:bg-gray-200 rounded-full transition-all active:scale-90 active:bg-gray-300"
                        aria-label="減少數量"
                      >
                        <Minus size={16} className="text-gray-600" />
                      </button>
                      <span className="font-semibold text-gray-700 min-w-[1.5rem] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => handleQuantityChange(item.id, 1)}
                        className="p-1 hover:bg-gray-200 rounded-full transition-all active:scale-90 active:bg-gray-300"
                        aria-label="增加數量"
                      >
                        <Plus size={16} className="text-gray-600" />
                      </button>
                    </div>

                    {/* Subtotal */}
                    <p className="text-lg font-bold text-gray-800">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Coupon Section */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Gift size={18} className="text-blue-600" />
                <h3 className="font-semibold text-blue-900">優惠碼</h3>
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="輸入優惠碼..."
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={applyCoupon}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all active:scale-95"
                >
                  套用
                </button>
              </div>
              <p className="text-xs text-gray-600 mt-2">試試: SAVE10 或 SAVE20</p>
              {discount > 0 && (
                <p className="text-sm text-green-600 font-semibold mt-2">✓ 已套用 {discount}% 折扣</p>
              )}
            </div>

            {/* Delivery Address */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <Truck size={18} className="text-gray-600" />
                <h3 className="font-semibold text-gray-800">送餐地址</h3>
              </div>
              <select
                value={selectedAddress}
                onChange={(e) => setSelectedAddress(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="default">🏠 家 - 台北市中山區民權東路</option>
                <option value="work">🏢 公司 - 台北市信義區信義路</option>
                <option value="other">其他地址</option>
              </select>
            </div>

            {/* Order Summary */}
            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              <div className="flex justify-between text-sm text-gray-700">
                <span>小計</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between text-sm text-gray-700">
                <span>稅金 (10%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>

              <div className="flex justify-between text-sm text-gray-700">
                <span>配送費</span>
                <span>${deliveryFee.toFixed(2)}</span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between text-sm text-green-600 font-semibold">
                  <span>折扣 ({discount}%)</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}

              <div className="border-t pt-3 flex justify-between font-bold text-lg">
                <span className="text-gray-800">總計</span>
                <span className="text-blue-600">${total.toFixed(2)}</span>
              </div>

              <div className="text-xs text-gray-600 text-center pt-2">
                預計準備時間: 15-20 分鐘
              </div>
            </div>

            {/* Checkout Section */}
            <div className="space-y-3 pt-4">
              <Link
                href="/payment"
                className="w-full block text-center bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-bold py-4 rounded-full transition-all shadow-lg hover:shadow-xl text-lg active:scale-95 active:shadow-md"
              >
                前往支付
              </Link>

              <div className="flex gap-2">
                <button
                  onClick={handleClearCart}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 rounded-lg transition-all active:scale-95"
                >
                  清空
                </button>

                <Link
                  href="/"
                  className="flex-1 text-center bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-2 rounded-lg transition-all active:scale-95"
                >
                  繼續購物
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
