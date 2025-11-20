'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Simulate form submission
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/" className="text-blue-600 hover:text-blue-700 font-semibold">
            ← 返回首頁
          </Link>
          <h1 className="text-2xl font-bold text-gray-800 mt-2">聯絡我們</h1>
          <p className="text-gray-600 text-sm">我們很樂意聽到您的意見</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Contact Info Cards */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center gap-3 mb-3">
              <Mail className="text-blue-600" size={24} />
              <h3 className="font-bold text-gray-800">電子郵件</h3>
            </div>
            <p className="text-gray-600">support@taiwanbreakfast.com</p>
            <p className="text-sm text-gray-500 mt-2">我們通常在 24 小時內回覆</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center gap-3 mb-3">
              <Phone className="text-green-600" size={24} />
              <h3 className="font-bold text-gray-800">電話</h3>
            </div>
            <p className="text-gray-600">+886 912 345 678</p>
            <p className="text-sm text-gray-500 mt-2">週一至週五 09:00 - 18:00</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center gap-3 mb-3">
              <MapPin className="text-red-600" size={24} />
              <h3 className="font-bold text-gray-800">地址</h3>
            </div>
            <p className="text-gray-600">台北市中山區民權東路</p>
            <p className="text-sm text-gray-500 mt-2">中山門市</p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">發送訊息</h2>

          {submitted && (
            <div className="mb-6 p-4 bg-green-100 text-green-800 rounded-lg">
              ✓ 感謝您的訊息！我們將盡快回覆您。
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  姓名 *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  電子郵件 *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                電話號碼
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                主題 *
              </label>
              <select
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">選擇主題</option>
                <option value="order">訂單相關</option>
                <option value="product">商品相關</option>
                <option value="delivery">配送相關</option>
                <option value="payment">付款相關</option>
                <option value="feedback">意見回饋</option>
                <option value="other">其他</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                訊息 *
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              <Send size={18} />
              發送訊息
            </button>
          </form>
        </div>

        {/* Business Hours */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="text-blue-600" size={24} />
            <h3 className="text-xl font-bold text-gray-800">營業時間</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="font-semibold text-gray-700">週一至週五</p>
              <p className="text-gray-600">06:00 - 10:00 (早餐時間)</p>
              <p className="text-gray-600">17:00 - 21:00 (晚餐時間)</p>
            </div>
            <div>
              <p className="font-semibold text-gray-700">週六至週日</p>
              <p className="text-gray-600">06:00 - 11:00 (早餐時間)</p>
              <p className="text-gray-600">17:00 - 22:00 (晚餐時間)</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
