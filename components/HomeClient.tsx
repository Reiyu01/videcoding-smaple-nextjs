'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { DrinkCard } from '@/components/DrinkCard';
import { ProductFilter } from '@/components/ProductFilter';
import { ProductDetailModal } from '@/components/ProductDetailModal';
import { ShoppingCart } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  nameZh?: string;
  description: string;
  price: number;
  image: string;
  category?: string;
}

interface HomeClientProps {
  products: Product[];
}

export function HomeClient({ products }: HomeClientProps) {
  const [cart, setCart] = useState<Array<{ id: string; name: string; price: number; quantity: number; notes?: string }>>([]);
  const [isClient, setIsClient] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  // 標記客戶端已掛載並從 localStorage 載入購物車
  useEffect(() => {
    setIsClient(true);
    try {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    } catch (error) {
      console.error('Error loading cart:', error);
    }
  }, []);

  // 每當購物車改變時，保存到 localStorage
  useEffect(() => {
    if (isClient) {
      try {
        localStorage.setItem('cart', JSON.stringify(cart));
      } catch (error) {
        console.error('Error saving cart:', error);
      }
    }
  }, [cart, isClient]);

  const handleAddToCart = (item: { id: string; name: string; price: number; quantity: number; notes?: string }) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
            : cartItem
        );
      }
      return [...prevCart, item];
    });
  };

  // 篩選商品
  const filteredProducts = products.filter((product) => {
    const matchesSearch = 
      product.nameZh?.includes(searchTerm) || 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'ALL' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setShowDetailModal(true);
  };

  const handleAddFromModal = (item: any) => {
    handleAddToCart(item);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold text-gray-800">台灣早餐</h1>
            <p className="text-sm text-gray-600">Taiwan Breakfast</p>
          </div>
          
          {/* Cart Button */}
          <Link
            href="/cart"
            className="relative p-3 bg-blue-500 hover:bg-blue-600 text-white rounded-full transition-all shadow-md hover:shadow-lg active:scale-95"
            title="查看購物車"
          >
            <ShoppingCart size={24} />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search & Filter */}
        <ProductFilter
          onSearchChange={setSearchTerm}
          onCategoryChange={setSelectedCategory}
        />

        {/* Products Grid */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            {filteredProducts.length === 0 ? '找不到商品' : `已找到 ${filteredProducts.length} 件商品`}
          </h2>
          
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  onClick={() => handleProductClick(product)}
                  className="cursor-pointer"
                >
                  <DrinkCard
                    id={product.id}
                    name={product.nameZh || product.name}
                    description={product.description}
                    price={product.price}
                    calories={0}
                    image={product.image}
                    onAddToCart={undefined}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">沒有符合的商品，請試試其他搜尋條件</p>
            </div>
          )}
        </div>
      </main>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          isOpen={showDetailModal}
          onClose={() => {
            setShowDetailModal(false);
            setSelectedProduct(null);
          }}
          onAddToCart={handleAddFromModal}
        />
      )}
    </div>
  );
}
