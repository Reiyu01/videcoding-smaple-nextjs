# ⚡ 性能優化指南

## 當前性能基線

### 頁面加載時間
| 頁面 | 估計時間 | 狀態 |
|------|---------|------|
| 首頁 (首次) | 1.5-2.5s | ✅ 良好 |
| 首頁 (後續) | 0.3-0.5s | ✅ 優秀 |
| 購物車 | 0.2-0.3s | ✅ 優秀 |
| 訂單頁面 | 0.5-0.8s | ✅ 良好 |

### Core Web Vitals 目標
- **LCP** (Largest Contentful Paint): < 2.5s
- **FID** (First Input Delay): < 100ms
- **CLS** (Cumulative Layout Shift): < 0.1

---

## 已實施的優化

### ✅ 代碼層面
- [x] Server Components 減少 JavaScript
- [x] 動態導入懶加載模態框
- [x] 圖片 next/image 優化
- [x] CSS Tailwind 自動清理

### ✅ 數據層面
- [x] Prisma 查詢優化 (只選擇需要的字段)
- [x] 單例 Prisma 客戶端 (避免連接泄漏)
- [x] 生產環境降低日誌級別

### ✅ 構建層面
- [x] SWC 編譯器 (快速構建)
- [x] 靜態生成優化
- [x] Tree shaking 移除未使用代碼

---

## 優化建議 (按優先級)

### 🔴 高優先級 (立即實施)

#### 1. 實施動態頁面生成
```typescript
// app/page.tsx
export const revalidate = 60; // 每 60 秒重新生成

export default async function Home() {
  // ISR (增量靜態重新生成)
  // 首次請求時生成，之後從緩存提供
}
```

**預期收益**: 首次加載 -30%

#### 2. 添加圖片預加載
```typescript
// app/layout.tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head>
        <link
          rel="preload"
          as="image"
          href="https://images.unsplash.com/..."
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

**預期收益**: 圖片加載 -20%

#### 3. 啟用 Gzip 壓縮 (Vercel 自動)
```typescript
// next.config.ts
const nextConfig: NextConfig = {
  compress: true,
};
```

**預期收益**: 傳輸大小 -70%

### 🟡 中優先級 (推薦實施)

#### 4. 添加 Redis 緩存層

**用途**: 緩存常訪問的商品列表

```typescript
// lib/cache.ts
import { createClient } from 'redis';

const redis = createClient({
  url: process.env.REDIS_URL,
});

export async function getCachedProducts() {
  const cached = await redis.get('products:all');
  if (cached) return JSON.parse(cached);

  const products = await prisma.product.findMany();
  await redis.set('products:all', JSON.stringify(products), {
    EX: 3600, // 1 小時過期
  });
  return products;
}
```

**成本**: $10-20/月 (Upstash Redis)
**預期收益**: 數據庫查詢 -80%

#### 5. 實施分頁加載

```typescript
// app/page.tsx
export default async function Home({ searchParams }: any) {
  const page = searchParams.page || 1;
  const pageSize = 12;

  const products = await prisma.product.findMany({
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  return (
    <>
      {/* 商品列表 */}
      <Pagination currentPage={page} />
    </>
  );
}
```

**預期收益**: 初始加載 -40%

### 🟢 低優先級 (優化空間)

#### 6. 實施 CDN 加速 (Cloudflare)

```bash
# 1. 訪問 cloudflare.com
# 2. 添加您的域名
# 3. 配置 DNS 指向 Vercel
# 4. 啟用 Rocket Loader 和自動最小化
```

**成本**: $20/月 (Pro 計劃)
**預期收益**: 全球延遲 -50%

#### 7. 添加 Web Font 優化

```typescript
// app/layout.tsx
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap', // 防止 FOUT
  preload: true,
});

export default function RootLayout() {
  return (
    <html className={inter.className}>
      {/* ... */}
    </html>
  );
}
```

**預期收益**: 字體加載 -100ms

---

## 監控工具

### 1. Vercel Analytics (免費)
```bash
# Vercel 儀表板 > Web Analytics
# 查看實時性能指標
```

### 2. Lighthouse (免費)
```bash
# Chrome DevTools > Lighthouse
# 運行本地審計
```

### 3. WebPageTest (免費)
```
https://www.webpagetest.org/
# 獲取詳細的瀑布圖
```

### 4. New Relic (付費)
```typescript
// 集成應用性能監控
// 成本: $100+/月
```

---

## 性能預算

建立性能目標以防止迴歸：

```json
{
  "bundles": [
    {
      "name": "main",
      "maxSize": "150kb"
    },
    {
      "name": "vendor",
      "maxSize": "200kb"
    }
  ],
  "metrics": [
    {
      "name": "LCP",
      "limit": "2500ms"
    },
    {
      "name": "CLS",
      "limit": "0.1"
    }
  ]
}
```

---

## 優化實施時間表

### 第 1 周 (立即)
- [ ] 實施動態頁面生成
- [ ] 啟用圖片預加載
- [ ] 配置 Gzip 壓縮

**預期改進**: 性能 +20-30%

### 第 2 周
- [ ] 添加 Redis 緩存
- [ ] 實施分頁加載

**預期改進**: 性能 +30-40%

### 第 3+ 周
- [ ] 配置 Cloudflare CDN
- [ ] 字體優化
- [ ] 代碼分割優化

**預期改進**: 性能 +40-50%

---

## 成本對比

### 不優化
- 首頁加載: 2-3s
- 用戶流失: ~20% (每增加 1s)
- 成本: 流失用戶收入

### 優化後 (預期)
- 首頁加載: 0.8-1.2s
- 用戶流失: ~5%
- 額外成本: $30-50/月 (Redis + CDN)

**ROI**: 流失用戶減少 = 額外收入 > 優化成本

---

## 檢查清單

部署前性能檢查：

- [ ] Lighthouse 得分 > 80
- [ ] LCP < 2.5s
- [ ] CLS < 0.1
- [ ] 首頁 JavaScript < 150kb
- [ ] 首頁 CSS < 50kb
- [ ] 數據庫查詢 < 100ms
- [ ] 沒有未使用的依賴

---

## 進一步閱讀

- 📖 [Web Vitals 指南](https://web.dev/vitals/)
- 📖 [Next.js 性能優化](https://nextjs.org/docs/app/building-your-application/optimizing)
- 📖 [Prisma 查詢優化](https://www.prisma.io/docs/guides/performance-and-optimization)
- 📖 [Vercel 性能最佳實踐](https://vercel.com/blog/performance)

---

**目標**: 達成 Lighthouse 90+ 得分 🎯
