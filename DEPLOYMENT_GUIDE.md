# 🚀 部署優化指南

## 快速部署到 Vercel (推薦)

### 第 1 步：準備代碼
```bash
# 確保代碼已推送到 GitHub
git add .
git commit -m "Ready for deployment to Vercel"
git push origin main
```

### 第 2 步：連接 Vercel
1. 訪問 [vercel.com](https://vercel.com)
2. 使用 GitHub 登錄
3. 選擇 "Import Project"
4. 選擇此倉庫

### 第 3 步：配置環境變數
在 Vercel 部署設置中，添加以下環境變數：

```
DATABASE_URL = postgresql://user:password@host/database?sslmode=require
NODE_ENV = production
```

### 第 4 步：部署
點擊 "Deploy" 按鈕。Vercel 會自動執行：
- 安裝依賴
- 執行 `npm run build`
- 部署應用

**預期時間**: 3-5 分鐘

---

## 部署前最後檢查

### ✅ 代碼檢查
```bash
# 運行本地構建驗證
npm run build

# 檢查代碼質量
npm run lint

# 運行應用確保無運行時錯誤
npm run dev
```

### ✅ 環境配置驗證
```bash
# 確認 .env.local 未被跟蹤
git check-ignore .env.local  # 應返回 .env.local

# 確認 .env.example 已提交
git ls-files | grep .env.example
```

### ✅ 資料庫驗證
```bash
# 測試資料庫連接
npm run db:test

# 驗證 Prisma 客戶端已生成
ls -la node_modules/.prisma/client/
```

---

## 部署後驗證

### ✅ 功能測試
- [ ] 首頁加載並顯示商品
- [ ] 搜尋和篩選功能正常
- [ ] 購物車持久化
- [ ] 支付流程完整
- [ ] 訂單頁面可訪問

### ✅ 性能檢查
- [ ] 首次內容繪製 < 2 秒
- [ ] 交互時間 < 100ms
- [ ] 累積佈局偏移 < 0.1

### ✅ 安全檢查
- [ ] 敏感數據未暴露在客戶端
- [ ] 所有 API 調用使用 HTTPS
- [ ] 沒有 console.log() 調試信息

---

## 常見部署問題解決

### 問題 1: DATABASE_URL 未定義
**症狀**: 應用啟動時崩潰，錯誤：`DATABASE_URL is not defined`

**解決方案**:
```bash
# 1. 檢查 Vercel 環境變數設置
# 2. 確認變數名稱完全匹配 "DATABASE_URL"
# 3. 重新部署
```

### 問題 2: Prisma 遷移失敗
**症狀**: 部署失敗，提示遷移錯誤

**解決方案**:
```bash
# 本地運行遷移
npm run prisma:migrate:deploy

# 推送更新
git push origin main

# 重新部署到 Vercel
```

### 問題 3: 圖片無法加載
**症狀**: 所有 Unsplash 圖片都顯示失敗

**解決方案**:
```typescript
// 檢查 next.config.ts 中的 remotePatterns
// 確保包含正確的主機名
images: {
  remotePatterns: [
    {
      protocol: "https",
      hostname: "images.unsplash.com",
    },
  ],
}
```

### 問題 4: 冷啟動時間過長
**症狀**: 第一次加載頁面需要 > 10 秒

**解決方案**:
1. 啟用 Prisma 查詢緩存
2. 添加 Redis 用於會話存儲
3. 實施更積極的代碼分割

---

## 成本估算 (月度)

### Vercel (推薦)
| 方面 | 成本 |
|------|------|
| 服務器 | $0-20 (按需計費) |
| 帶寬 | 100GB 免費 + 超出 $0.15/GB |
| 函數調用 | 免費 |
| **總計** | **$0-20/月** |

### Neon PostgreSQL
| 方面 | 成本 |
|------|------|
| 計算 | $0-15 (免費層足以應付小規模) |
| 存儲 | $0-10 (3GB 免費) |
| **總計** | **$0-25/月** |

**總預期成本**: $0-45/月 (適合小規模)

---

## 監控和維護

### 設置 Vercel 監控
1. 在 Vercel 儀表板啟用 Web Analytics
2. 監控性能指標
3. 設置告警通知

### 定期任務
- [ ] 每週檢查日誌中的錯誤
- [ ] 每月審計資料庫連接
- [ ] 每月備份生產數據
- [ ] 定期更新依賴

```bash
# 檢查過期依賴
npm outdated

# 更新依賴
npm update
```

---

## 擴展建議

### 第 1 階段 (當前)
- 單個 Vercel 部署
- Neon PostgreSQL
- 基本監控

### 第 2 階段 (1000+ 用戶)
- 添加 Redis 緩存層
- 實施 CDN (Cloudflare)
- 資料庫查詢優化

### 第 3 階段 (10000+ 用戶)
- 多區域部署
- 資料庫只讀副本
- 消息隊列 (Bull/RabbitMQ)

---

## 滾回計劃

如果部署出現問題:

```bash
# 1. 在 Vercel 儀表板查看部署歷史
# 2. 點擊之前的穩定部署並選擇 "Redeploy"
# 或
# 3. 在本地 revert 代碼
git revert HEAD
git push origin main
```

---

## 部署檢查清單

完成以下所有項目後再進行部署：

- [ ] npm run build 成功
- [ ] npm run lint 無錯誤
- [ ] 本地測試所有功能
- [ ] .env.local 已添加到 .gitignore
- [ ] .env.example 已提交
- [ ] 代碼推送到 GitHub
- [ ] Vercel 環境變數已設置
- [ ] 資料庫連接已驗證
- [ ] Vercel 部署已完成
- [ ] 生產環境功能已驗證

---

## 支持資源

- 📖 [Vercel 文檔](https://vercel.com/docs)
- 📖 [Prisma 部署指南](https://www.prisma.io/docs/guides/deployment)
- 📖 [Next.js 生產清單](https://nextjs.org/docs/going-to-production)
- 💬 [Vercel 社區](https://github.com/vercel/next.js/discussions)

---

**祝部署成功！🎉**
