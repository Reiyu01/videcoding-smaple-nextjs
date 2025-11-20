'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, MessageCircle, Clock, Truck, AlertCircle } from 'lucide-react';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  icon: any;
}

export default function FAQPage() {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const faqItems: FAQItem[] = [
    {
      id: 1,
      question: '訂單通常需要多長時間準備?',
      answer: '我們的訂單通常在 15-20 分鐘內準備完成。您可以在訂單頁面追蹤實時準備進度。',
      icon: Clock,
    },
    {
      id: 2,
      question: '您們提供送餐服務嗎?',
      answer: '是的，我們在台北市中山區、信義區和大安區提供免費送餐服務，訂單金額滿 $50 以上。',
      icon: Truck,
    },
    {
      id: 3,
      question: '如何修改已下的訂單?',
      answer: '訂單確認後無法修改。如果您想修改訂單，請聯絡我們的客服團隊，我們會盡快協助您。',
      icon: AlertCircle,
    },
    {
      id: 4,
      question: '支付方式有哪些?',
      answer: '我們接受信用卡、電子支付 (Line Pay、Apple Pay) 和現金付款。',
      icon: MessageCircle,
    },
    {
      id: 5,
      question: '我可以預訂某個特定時間的訂單嗎?',
      answer: '目前我們不支持預約訂單，但您可以現在下單，我們會在 15-20 分鐘內準備完成。',
      icon: Clock,
    },
    {
      id: 6,
      question: '如何退貨或要求退款?',
      answer: '如果您對商品不滿意，請在收貨後 24 小時內聯絡我們，我們會提供完整退款或更換。',
      icon: AlertCircle,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/" className="text-blue-600 hover:text-blue-700 font-semibold">
            ← 返回首頁
          </Link>
          <h1 className="text-2xl font-bold text-gray-800 mt-2">常見問題</h1>
          <p className="text-gray-600 text-sm">尋找您需要的答案</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Bar */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="搜尋常見問題..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* FAQ Items */}
        <div className="space-y-3">
          {faqItems.map((item) => {
            const Icon = item.icon;
            const isExpanded = expandedId === item.id;

            return (
              <div
                key={item.id}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all"
              >
                <button
                  onClick={() => setExpandedId(isExpanded ? null : item.id)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3 text-left">
                    <Icon className="text-blue-600 flex-shrink-0" size={20} />
                    <span className="font-semibold text-gray-800">{item.question}</span>
                  </div>
                  <ChevronDown
                    className={`text-gray-400 transition-transform flex-shrink-0 ${
                      isExpanded ? 'rotate-180' : ''
                    }`}
                    size={20}
                  />
                </button>

                {isExpanded && (
                  <div className="px-6 py-4 bg-gray-50 border-t">
                    <p className="text-gray-700 leading-relaxed">{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Contact Section */}
        <div className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-8 text-center">
          <MessageCircle className="mx-auto text-blue-600 mb-4" size={40} />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">仍然需要幫助?</h2>
          <p className="text-gray-600 mb-6">我們的客服團隊隨時準備協助您</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:support@taiwanbreakfast.com"
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all active:scale-95"
            >
              📧 發送郵件
            </a>
            <a
              href="tel:+886912345678"
              className="px-6 py-3 bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold rounded-lg transition-all active:scale-95"
            >
              📞 撥打電話
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
