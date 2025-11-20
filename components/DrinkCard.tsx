'use client';

import Image from 'next/image';
import { Minus, Plus, ShoppingCart } from 'lucide-react';
import { useState } from 'react';

interface DrinkCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  calories: number;
  image: string;
  onAddToCart?: (item: any) => void;
}

export function DrinkCard({
  id,
  name,
  description,
  price,
  calories,
  image,
  onAddToCart,
}: DrinkCardProps) {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (change: number) => {
    const newQuantity = Math.max(1, quantity + change);
    setQuantity(newQuantity);
  };

  const handleAddToCart = () => {
    onAddToCart?.({
      id,
      name,
      price,
      quantity,
    });
    setQuantity(1);
  };

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:scale-105 overflow-hidden cursor-pointer">
      {/* Image Container */}
      <div className="relative w-full h-48 bg-gray-100 rounded-t-2xl overflow-hidden group">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-300"
        />
      </div>

      {/* Content Container */}
      <div className="p-4 space-y-3">
        {/* Header */}
        <div className="space-y-1">
          <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
          <p className="text-sm text-gray-600">{description}</p>
        </div>

        {/* Calories */}
        <p className="text-xs text-gray-500">{calories} cal</p>

        {/* Price */}
        <p className="text-xl font-bold text-blue-600">${price.toFixed(2)}</p>

        {/* Quantity Control */}
        <div className="flex items-center justify-between bg-gray-100 rounded-lg p-2">
          <button
            onClick={() => handleQuantityChange(-1)}
            className="p-1 hover:bg-gray-200 rounded transition-all active:scale-75"
            aria-label="減少數量"
          >
            <Minus size={16} className="text-gray-600" />
          </button>
          <span className="font-semibold text-gray-700 min-w-[2rem] text-center">
            {quantity}
          </span>
          <button
            onClick={() => handleQuantityChange(1)}
            className="p-1 hover:bg-gray-200 rounded transition-all active:scale-75"
            aria-label="增加數量"
          >
            <Plus size={16} className="text-gray-600" />
          </button>
        </div>

        {/* Add to Cart Button */}
        {onAddToCart && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleAddToCart();
            }}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold py-2 transition-all flex items-center justify-center gap-2 active:scale-95 active:bg-blue-700"
          >
            <ShoppingCart size={18} />
            加入購物車
          </button>
        )}
        {!onAddToCart && (
          <div className="w-full bg-gray-100 text-gray-700 rounded-lg font-semibold py-2 text-center">
            點擊查看詳情
          </div>
        )}
      </div>
    </div>
  );
}
