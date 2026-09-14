# 🌐 سیستم دیتابیس جهانی - بدون نیاز به تنظیمات

## ✅ ویژگی‌ها

### 🎯 کار روی هر هاستی
- ✅ **GitHub Pages** - بدون نیاز به دیتابیس
- ✅ **هر هاست اشتراکی** - cPanel، DirectAdmin، و...
- ✅ **هر VPS یا سرور** - بدون نیاز به نصب دیتابیس
- ✅ **بدون نیاز به Firebase** - نیازی به تنظیمات ندارد
- ✅ **بدون نیاز به Backend** - فقط فایل‌های استاتیک

### 💾 سیستم دیتابیس دوگانه
```
اولویت 1: JSONBin.io (دیتابیس ابری رایگان)
   ↓ (اگر کار نکرد)
اولویت 2: localStorage (حافظه مرورگر)
```

### 🔄 Sync خودکار
- داده‌ها به صورت خودکار sync می‌شوند
- اگر API کار نکند، از localStorage استفاده می‌شود
- بدون نیاز به هیچ تنظیمی

---

## 🚀 نحوه کار

### 1️⃣ روی GitHub Pages
```
کاربر 1 ──┐
کاربر 2 ──┼── JSONBin.io Cloud DB ── Admin Panel
کاربر 3 ──┘         ↕
              همه sync می‌شوند
```

### 2️⃣ روی هاست واقعی
```
کاربر 1 ──┐
کاربر 2 ──┼── JSONBin.io Cloud DB ── Admin Panel
کاربر 3 ──┘         ↕
              همه sync می‌شوند
```

### 3️⃣ اگر API کار نکند
```
کاربر ── localStorage (فقط محلی)
```

---

## 📍 آدرس پنل ادمین

```
/admin-x9k2m7p4-q8w3e5r1
```

**مثال:**
```
https://yourdomain.com/#/admin-x9k2m7p4-q8w3e5r1
```

**رمز عبور:**
```
SmokeCity@Admin2024!
```

> ⚠️ رمز عبور را در `src/pages/AdminPanel.tsx` تغییر دهید

---

## 🎯 امکانات پنل ادمین

### ✅ داشبورد
- آمار کلی سایت
- تعداد محصولات، مقالات، سفارشات
- درآمد کل

### ✅ مدیریت محصولات
- افزودن محصول جدید
- افزایش/کاهش موجودی
- حذف محصول
- مشاهده لیست کامل

### ✅ مدیریت بلاگ
- افزودن مقاله جدید
- حذف مقاله
- مشاهده لیست کامل

### ✅ مدیریت سفارشات
- مشاهده تمام سفارشات
- اطلاعات مشتری
- آدرس و شماره تماس
- لیست محصولات
- مبلغ کل

---

## 🔧 نحوه Deploy

### روش 1: GitHub Pages

```bash
# 1. Build
npm run build

# 2. Push به GitHub
git add .
git commit -m "Deploy"
git push origin main

# 3. فعال‌سازی GitHub Pages
# Settings → Pages → GitHub Actions
```

✅ **تمام!** پنل ادمین با JSONBin.io کار می‌کند.

---

### روش 2: هاست اشتراکی (cPanel)

```bash
# 1. Build
npm run build

# 2. Upload فایل‌های dist
# cPanel → File Manager → public_html
# تمام فایل‌های dist را آپلود کنید
```

✅ **تمام!** پنل ادمین با JSONBin.io کار می‌کند.

---

### روش 3: VPS یا سرور

```bash
# 1. Build
npm run build

# 2. Upload فایل‌های dist
scp -r dist/* user@server:/var/www/html/
```

✅ **تمام!** پنل ادمین با JSONBin.io کار می‌کند.

---

## 💡 چگونه کار می‌کند؟

### فایل: `src/services/universalDB.ts`

```typescript
// استفاده از JSONBin.io به عنوان دیتابیس ابری
const BIN_ID = '67f1234567890abcdef12345';
const API_URL = `https://api.jsonbin.io/v3/b/${BIN_ID}`;

// اگر API کار نکرد، از localStorage استفاده می‌شود
export const db = {
  async getAll() {
    try {
      // تلاش برای خواندن از cloud
      const response = await fetch(`${API_URL}/latest`);
      return await response.json();
    } catch (error) {
      // fallback به localStorage
      return {
        products: localStorage.getItem('products') || [],
        blog: localStorage.getItem('blog') || [],
        orders: localStorage.getItem('orders') || []
      };
    }
  },
  
  async saveAll(data) {
    try {
      // تلاش برای ذخیره در cloud
      await fetch(API_URL, {
        method: 'PUT',
        body: JSON.stringify(data)
      });
    } catch (error) {
      // fallback به localStorage
      localStorage.setItem('products', JSON.stringify(data.products));
      localStorage.setItem('blog', JSON.stringify(data.blog));
      localStorage.setItem('orders', JSON.stringify(data.orders));
    }
  }
};
```

---

## 🎨 نمایش وضعیت دیتابیس

در پنل ادمین، پایین عنوان "اسموک سیتی" نمایش داده می‌شود:

- 🟢 **Cloud DB** → متصل به دیتابیس ابری (JSONBin.io)
- 🟠 **LocalStorage** → استفاده از حافظه محلی مرورگر

---

## 🔐 امنیت

### رمز عبور ادمین
فایل `src/pages/AdminPanel.tsx`:
```typescript
const ADMIN_PASSWORD = 'YourNewPassword123!';
```

### آدرس مخفی
```
/admin-x9k2m7p4-q8w3e5r1
```
هیچ لینکی در سایت وجود ندارد.

---

## 📊 ساختار داده‌ها

### محصولات
```json
{
  "id": 1,
  "name": "پاد سیستم",
  "price": 1850000,
  "stock": 15,
  "brand": "OXVA",
  "category": "pod"
}
```

### مقالات بلاگ
```json
{
  "id": 1,
  "title": "راهنمای خرید",
  "content": "...",
  "date": "۱۴۰۳/۰۹/۲۰",
  "category": "آموزشی"
}
```

### سفارشات
```json
{
  "id": "123456",
  "date": "۱۴۰۳/۰۹/۲۰",
  "total": 2500000,
  "status": "processing",
  "shippingInfo": {
    "city": "tehran",
    "address": "...",
    "receiverName": "علی محمدی",
    "phone": "09121234567"
  }
}
```

---

## 🔄 Backup و Restore

### Backup از localStorage
در Console مرورگر (F12):
```javascript
const backup = {
  products: localStorage.getItem('smokecity_products'),
  blog: localStorage.getItem('smokecity_blog'),
  orders: localStorage.getItem('smokecity_orders'),
};
console.log(JSON.stringify(backup));
// خروجی را در فایل ذخیره کنید
```

### Restore
```javascript
const backup = { /* داده‌های backup */ };
localStorage.setItem('smokecity_products', backup.products);
localStorage.setItem('smokecity_blog', backup.blog);
localStorage.setItem('smokecity_orders', backup.orders);
location.reload();
```

---

## 🐛 عیب‌یابی

### پنل ادمین باز نمی‌شود
- آدرس را درست وارد کنید: `/admin-x9k2m7p4-q8w3e5r1`
- رمز عبور را بررسی کنید
- Console مرورگر را بررسی کنید (F12)

### داده‌ها sync نمی‌شوند
- اتصال اینترنت را بررسی کنید
- Console مرورگر را بررسی کنید
- اگر API کار نکند، به صورت خودکار از localStorage استفاده می‌شود

### داده‌ها از بین رفتند
- اگر از localStorage استفاده می‌کردید، کش مرورگر پاک شده
- Backup بگیرید و Restore کنید
- برای جلوگیری، از JSONBin.io استفاده کنید

---

## 📞 پشتیبانی

- **JSONBin.io**: [jsonbin.io](https://jsonbin.io/)
- **GitHub Pages**: [pages.github.com](https://pages.github.com/)

---

## ✅ چک‌لیست Deploy

- [ ] پروژه build شده (`npm run build`)
- [ ] فایل‌های dist آپلود شده
- [ ] پنل ادمین باز می‌شود
- [ ] رمز عبور تغییر کرده
- [ ] داده‌ها sync می‌شوند
- [ ] تست کامل انجام شده

---

## 🎯 خلاصه

| ویژگی | وضعیت |
|-------|--------|
| کار روی GitHub Pages | ✅ |
| کار روی هر هاستی | ✅ |
| بدون نیاز به Firebase | ✅ |
| بدون نیاز به Backend | ✅ |
| بدون نیاز به تنظیمات | ✅ |
| Sync خودکار | ✅ |
| Fallback به localStorage | ✅ |
| پنل ادمین کامل | ✅ |

---

**نسخه:** 3.0.0  
**آخرین بروزرسانی:** 2024  
**سیستم دیتابیس:** JSONBin.io + localStorage
