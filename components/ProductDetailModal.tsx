'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Heart, ShoppingCart, X } from 'lucide-react';
import Image from 'next/image';

interface ProductDetailModalProps {
  product: {
    id: string;
    name: string;
    nameZh?: string;
    description: string;
    price: number;
    image: string;
    category?: string;
  };
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (item: any) => void;
}

export function ProductDetailModal({
  product,
  isOpen,
  onClose,
  onAddToCart,
}: ProductDetailModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [isFavorited, setIsFavorited] = useState(false);
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const handleAddToCart = () => {
    onAddToCart({
      id: product.id,
      name: product.nameZh || product.name,
      price: product.price,
      quantity,
      notes,
    });
    // 重置數量但保持詳情打開，讓用戶可以繼續添加
    setQuantity(1);
    setNotes('');
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
          {/* Close Button */}
          <div className="sticky top-0 bg-white border-b flex justify-between items-center p-4">
            <h2 className="text-xl font-bold text-gray-800">商品詳情</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-all active:scale-75"
            >
              <X size={24} className="text-gray-600" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-4">
            {/* Image */}
            <div className="relative w-full h-48 bg-gray-100 rounded-xl overflow-hidden">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>

            {/* Product Info */}
            <div>
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">
                    {product.nameZh || product.name}
                  </h3>
                  <p className="text-sm text-gray-500">{product.name}</p>
                </div>
                <button
                  onClick={() => setIsFavorited(!isFavorited)}
                  className="p-2 hover:bg-red-50 rounded-lg transition-all"
                >
                  <Heart
                    size={24}
                    className={isFavorited ? 'fill-red-500 text-red-500' : 'text-gray-400'}
                  />
                </button>
              </div>

              <p className="text-gray-600 text-sm mb-4">{product.description}</p>

              {/* Price */}
              <p className="text-3xl font-bold text-blue-600 mb-4">
                ${product.price.toFixed(2)}
              </p>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                特殊備註 (選擇性)
              </label>
              <textarea
                placeholder="例如：不要辣、少糖、不要冰..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                rows={3}
              />
            </div>

            {/* Quantity Control */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                數量
              </label>
              <div className="flex items-center gap-3 bg-gray-100 rounded-lg w-fit">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 hover:bg-gray-200 rounded transition-all active:scale-90"
                >
                  −
                </button>
                <span className="font-semibold text-gray-700 min-w-[2rem] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2 hover:bg-gray-200 rounded transition-all active:scale-90"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-3 rounded-lg transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              <ShoppingCart size={20} />
              加入購物車
            </button>

            {/* Continue Shopping */}
            <button
              onClick={onClose}
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-2 rounded-lg transition-all active:scale-95"
            >
              繼續購物
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
