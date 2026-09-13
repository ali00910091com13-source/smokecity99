# 🚀 راهنمای کامل Deploy روی GitHub Pages

## ✅ سایت آماده است!

تمام تنظیمات لازم برای GitHub Pages انجام شده است.

---

## 📋 مراحل Deploy

### روش ۱: استفاده از GitHub Actions (توصیه شده) ⭐

1. **Repository را در GitHub بسازید**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git push -u origin main
   ```

2. **GitHub Pages را فعال کنید**
   - به Repository بروید
   - **Settings** → **Pages**
   - در بخش **Source** گزینه **GitHub Actions** را انتخاب کنید
   - فایل `.github/workflows/deploy.yml` خودکار deploy را انجام می‌دهد

3. **صبر کنید**
   - بعد از ۲-۳ دقیقه سایت شما در آدرس زیر در دسترس خواهد بود:
   ```
   https://YOUR_USERNAME.github.io/YOUR_REPO/
   ```

---

### روش ۲: Deploy دستی با branch `gh-pages`

```bash
# Build کنید
npm run build

# پوشه dist را به branch gh-pages منتقل کنید
git subtree push --prefix dist origin gh-pages
```

سپس در Settings → Pages:
- Source را روی `gh-pages` branch تنظیم کنید
- پوشه را روی `/(root)` بگذارید

---

## 🔧 تنظیمات مهم

### اگر سایت در subdirectory قرار می‌گیرد

اگر URL سایت شما چیزی مثل `username.github.io/repo-name/` است:

1. فایل `vite.config.js` را باز کنید
2. `base` را تغییر دهید:

```javascript
export default defineConfig({
  base: '/repo-name/', // نام repository خود را جایگزین کنید
  // ... بقیه تنظیمات
});
```

3. دوباره build کنید:
```bash
npm run build
```

### اگر از دامنه سفارشی استفاده می‌کنید

```javascript
export default defineConfig({
  base: '/',
  // ... بقیه تنظیمات
});
```

---

## 🐛 عیب‌یابی

### صفحه سفید است؟

1. **Console را باز کنید** (F12)
2. **خطاها را بررسی کنید**
3. **Error Boundary** خطا را نمایش می‌دهد

### Assets لود نمی‌شوند؟

- مطمئن شوید `base: './'` در `vite.config.js` تنظیم شده
- دوباره build کنید: `npm run build`

### 404 Error؟

- فایل `404.html` در پوشه `dist` وجود دارد
- مطمئن شوید GitHub Pages فعال است

---

## 📁 ساختار فایل‌ها

```
dist/
├── index.html          ← صفحه اصلی
├── 404.html           ← برای SPA routing
└── assets/
    ├── index-*.js     ← JavaScript bundle
    └── index-*.css    ← CSS bundle
```

---

## ✨ ویژگی‌های سایت

- ✅ تم روشن و مدرن
- ✅ لوگوی SVG درون‌خطی (بدون نیاز به فایل خارجی)
- ✅ تب‌های دسته‌بندی محصولات
- ✅ فیلترهای پیشرفته
- ✅ سبد خرید پویا
- ✅ طراحی کاملاً واکنش‌گرا
- ✅ بهینه‌سازی شده برای GitHub Pages

---

## 📞 پشتیبانی

اگر مشکلی داشتید:
1. Console را بررسی کنید
2. Error Boundary پیام خطا را نشان می‌دهد
3. مطمئن شوید تمام فایل‌ها commit و push شده‌اند

---

**موفق باشید! 🎉**
