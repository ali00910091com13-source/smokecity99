# 🚀 راهنمای Deploy و راه‌اندازی

## 📍 دو حالت عملکرد

### 1️⃣ روی GitHub Pages (بدون Firebase)
- ✅ داده‌ها در **localStorage** مرورگر ذخیره می‌شوند
- ✅ پنل ادمین کار می‌کند
- ⚠️ داده‌ها فقط در همان مرورگر هستند
- ⚠️ برای تست و دمو مناسب است

### 2️⃣ روی هاست واقعی (با Firebase)
- ✅ داده‌ها در **Firebase Cloud Database** ذخیره می‌شوند
- ✅ برای همه کاربران sync می‌شوند
- ✅ پنل ادمین کامل کار می‌کند
- ✅ مناسب برای production

---

## 🔐 دسترسی به پنل ادمین

**آدرس مخفی:**
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

> ⚠️ رمز عبور را در فایل `src/pages/AdminPanel.tsx` تغییر دهید

---

## 🌐 Deploy روی GitHub Pages

### مرحله 1: Build
```bash
npm run build
```

### مرحله 2: Push به GitHub
```bash
git add .
git commit -m "Deploy to GitHub Pages"
git push origin main
```

### مرحله 3: فعال‌سازی GitHub Pages
1. به Repository بروید
2. **Settings** → **Pages**
3. **Source**: انتخاب **GitHub Actions**
4. صبر کنید تا deploy شود

### ✅ تمام!
سایت روی GitHub Pages آماده است. پنل ادمین با localStorage کار می‌کند.

---

## 🔥 Deploy روی هاست واقعی با Firebase

### مرحله 1: ساخت پروژه Firebase

1. به [Firebase Console](https://console.firebase.google.com/) بروید
2. **Add project** → نام: `smoke-city`
3. **Build** → **Firestore Database** → **Create database**
4. **Start in test mode** → **Enable**

### مرحله 2: دریافت Config

1. **Project settings** (آیکون ⚙️)
2. **Your apps** → **Web (</>)**
3. نام app: `smoke-city-web`
4. **Register app**
5. Config را کپی کنید:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "smoke-city.firebaseapp.com",
  projectId: "smoke-city",
  storageBucket: "smoke-city.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123..."
};
```

### مرحله 3: جایگزینی Config

فایل `src/firebase/config.ts` را باز کنید:

```typescript
const firebaseConfig = {
  apiKey: "AIzaSy...", // ← کلید واقعی
  authDomain: "smoke-city.firebaseapp.com",
  projectId: "smoke-city",
  // ... بقیه config
};
```

### مرحله 4: Build و Upload

```bash
npm run build
```

فایل‌های `dist` را روی هاست آپلود کنید:
- cPanel → File Manager → public_html
- یا FTP → Upload فایل‌ها

### ✅ تمام!
حالا سایت با Firebase کار می‌کند و داده‌ها برای همه sync می‌شوند.

---

## 📊 تشخیص حالت عملکرد

در پنل ادمین، پایین عنوان "اسموک سیتی" نمایش داده می‌شود:

- 🟢 **Firebase** → متصل به دیتابیس ابری
- 🟠 **LocalStorage** → استفاده از حافظه محلی مرورگر

---

## 🔄 تغییر رمز عبور ادمین

فایل `src/pages/AdminPanel.tsx`:

```typescript
const ADMIN_PASSWORD = 'YourNewPassword123!';
```

سپس build کنید:
```bash
npm run build
```

---

## 💾 Backup و Restore (localStorage)

### Backup:
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

### Restore:
```javascript
const backup = { /* داده‌های backup */ };
localStorage.setItem('smokecity_products', backup.products);
localStorage.setItem('smokecity_blog', backup.blog);
localStorage.setItem('smokecity_orders', backup.orders);
location.reload();
```

---

## 🎯 خلاصه

| حالت | دیتابیس | مناسب برای | Sync |
|------|---------|-----------|------|
| GitHub Pages | localStorage | تست، دمو | ❌ محلی |
| هاست واقعی | Firebase | Production | ✅ Real-time |

---

## 📞 پشتیبانی

- **Firebase**: [console.firebase.google.com](https://console.firebase.google.com/)
- **GitHub Pages**: [pages.github.com](https://pages.github.com/)

---

**نسخه:** 2.0.0  
**آخرین بروزرسانی:** 2024
