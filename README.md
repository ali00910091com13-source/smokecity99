# 🌃 اسموک سیتی | Smoke City

پلتفرم فروشگاهی مدرن ویپ و پاد با طراحی روشن و رابط کاربری حرفه‌ای

## 🚀 نحوه Deploy روی GitHub Pages

### روش ۱: استفاده از GitHub Actions (توصیه شده)

1. فایل `.github/workflows/deploy.yml` را بسازید:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm install
        
      - name: Build
        run: npm run build
        
      - name: Setup Pages
        uses: actions/configure-pages@v3
        
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v2
        with:
          path: './dist'
          
      - name: Deploy to GitHub Pages
        uses: actions/deploy-pages@v2
```

2. به Settings > Pages بروید
3. Source را روی "GitHub Actions" تنظیم کنید
4. تغییرات را commit و push کنید

### روش ۲: Deploy دستی

1. پروژه را build کنید:
```bash
npm run build
```

2. محتویات پوشه `dist` را به branch `gh-pages` منتقل کنید:
```bash
git subtree push --prefix dist origin gh-pages
```

3. در Settings > Pages، Source را روی `gh-pages` branch تنظیم کنید

## ⚙️ تنظیمات مهم

اگر سایت در subdirectory قرار می‌گیرد (مثلاً `username.github.io/repo-name/`)، باید `base` را در `vite.config.js` تغییر دهید:

```javascript
export default defineConfig({
  base: '/repo-name/', // نام repository خود را جایگزین کنید
  // ... بقیه تنظیمات
});
```

## 🛠️ توسعه محلی

```bash
# نصب وابستگی‌ها
npm install

# اجرای سرور توسعه
npm run dev

# Build برای production
npm run build
```

## 📝 ویژگی‌ها

- ✅ تم روشن و مدرن
- ✅ تب‌های دسته‌بندی محصولات
- ✅ فیلترهای پیشرفته
- ✅ سبد خرید پویا
- ✅ طراحی کاملاً واکنش‌گرا
- ✅ بهینه‌سازی شده برای GitHub Pages

## 📄 مجوز

تمامی حقوق محفوظ است © ۱۴۰۳ اسموک سیتی
