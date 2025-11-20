import { prisma } from '@/lib/db/prisma';
import { HomeClient } from '@/components/HomeClient';

interface DrinkItem {
  id: string;
  name: string;
  description: string;
  price: number;
  calories: number;
  image: string;
}

const drinks: DrinkItem[] = [
  {
    id: '1',
    name: 'Soy Milk',
    description: 'Freshly made soy milk, served hot or cold.',
    price: 2.50,
    calories: 250,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop',
  },
  {
    id: '2',
    name: '鍋燒意麵',
    description: 'Egg crepe with a variety of fillings.',
    price: 4.00,
    calories: 350,
    image: '/drinks/noodle.jpg',
  },
  {
    id: '3',
    name: 'Fan Tuan',
    description: 'Sticky rice roll with savory fillings.',
    price: 5.50,
    calories: 450,
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop',
  },
  {
    id: '4',
    name: 'Iced Coffee',
    description: 'Cold brew coffee with ice and milk.',
    price: 3.50,
    calories: 180,
    image: '/drinks/noodle.jpg',
  },
  {
    id: '5',
    name: 'Taro Milk Tea',
    description: 'Smooth taro flavor with creamy milk.',
    price: 4.50,
    calories: 320,
    image: '/drinks/noodle.jpg',
  },
  {
    id: '6',
    name: 'Fresh Orange Juice',
    description: 'Freshly squeezed orange juice.',
    price: 3.00,
    calories: 120,
    image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&h=300&fit=crop',
  },
];

export default async function Home() {
  // 從資料庫讀取所有可用的產品
  const products = await prisma.product.findMany({
    where: {
      isAvailable: true,
    },
    select: {
      id: true,
      name: true,
      nameZh: true,
      description: true,
      price: true,
      image: true,
    },
  });

  // 將 Decimal 轉換為普通數字
  const formattedProducts = products.map((product: any) => ({
    ...product,
    price: Number(product.price),
  }));

  return <HomeClient products={formattedProducts} />;
}
