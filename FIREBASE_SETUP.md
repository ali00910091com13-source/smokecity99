# 🔥 راهنمای تنظیم Firebase برای اسموک سیتی

## 📋 چرا Firebase؟

Firebase یک دیتابیس ابری رایگان از گوگل است که:
- ✅ **رایگان** تا حد مشخص (کافی برای شروع)
- ✅ **Real-time** - داده‌ها فوراً sync می‌شوند
- ✅ **بدون نیاز به سرور** - فقط فایل‌های استاتیک
- ✅ **سازگار با GitHub Pages** و هر هاستی
- ✅ **دسترسی از همه جا** - داده‌ها برای همه کاربران

## 🚀 مراحل راه‌اندازی Firebase

### 1️⃣ ایجاد پروژه Firebase

1. به [Firebase Console](https://console.firebase.google.com/) بروید
2. روی **"Add project"** کلیک کنید
3. نام پروژه را وارد کنید (مثلاً: `smoke-city`)
4. Google Analytics را می‌توانید غیرفعال کنید
5. روی **"Create project"** کلیک کنید

### 2️⃣ فعال‌سازی Firestore Database

1. در منوی سمت چپ، روی **"Build"** → **"Firestore Database"** کلیک کنید
2. روی **"Create database"** کلیک کنید
3. **"Start in test mode"** را انتخاب کنید (بعداً می‌توانید rules را تغییر دهید)
4. Location را انتخاب کنید (مثلاً: `asia-southeast1` برای ایران نزدیک‌تر است)
5. روی **"Enable"** کلیک کنید

### 3️⃣ دریافت Firebase Config

1. در صفحه اصلی پروژه، روی آیکون **⚙️ (چرخ‌دنده)** کلیک کنید
2. **"Project settings"** را انتخاب کنید
3. به پایین اسکرول کنید تا **"Your apps"** را ببینید
4. روی آیکون **Web (</>)** کلیک کنید
5. نام app را وارد کنید (مثلاً: `smoke-city-web`)
6. روی **"Register app"** کلیک کنید
7. **Firebase config** را کپی کنید:

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

### 4️⃣ جایگزینی Config در کد

فایل `src/firebase/config.ts` را باز کنید و config را جایگزین کنید:

```typescript
const firebaseConfig = {
  apiKey: "AIzaSy...", // ← جایگزین کنید
  authDomain: "smoke-city.firebaseapp.com",
  projectId: "smoke-city",
  storageBucket: "smoke-city.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123..."
};
```

### 5️⃣ Build و Deploy

```bash
npm run build
```

سپس فایل‌های `dist` را روی هاست خود آپلود کنید.

## 📊 ساختار دیتابیس

Firestore به صورت خودکار این collections را می‌سازد:

### `products`
```javascript
{
  id: 1,
  name: "پاد سیستم اکسوا ایکس پرو",
  price: 1850000,
  stock: 15,
  // ... سایر فیلدها
}
```

### `blog`
```javascript
{
  id: 1,
  title: "راهنمای انتخاب اولین پاد سیستم",
  content: "...",
  // ... سایر فیلدها
}
```

### `orders`
```javascript
{
  id: "123456",
  date: "۱۴۰۳/۰۹/۲۰",
  total: 2500000,
  status: "processing",
  shippingInfo: {
    city: "tehran",
    address: "...",
    // ...
  }
}
```

## 🔐 امنیت Firestore

### Rules پیشنهادی:

در Firebase Console → Firestore Database → Rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Products - Read for all, Write only for admin
    match /products/{productId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Blog - Read for all, Write only for admin
    match /blog/{postId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Orders - Read/Write for authenticated users
    match /orders/{orderId} {
      allow read, write: if request.auth != null;
    }
  }
}
```

## 💰 محدودیت‌های رایگان Firebase

**Spark Plan (رایگان):**
- 50,000 reads/day
- 20,000 writes/day
- 20,000 deletes/day
- 1 GB storage
- 10 GB/month network egress

برای یک فروشگاه کوچک تا متوسط، این محدودیت‌ها کافی هستند.

## 🔄 Sync Real-time

داده‌ها به صورت real-time sync می‌شوند:
- ادمین محصولی اضافه می‌کند → فوراً برای همه کاربران نمایش داده می‌شود
- کاربر سفارش ثبت می‌کند → فوراً در پنل ادمین نمایش داده می‌شود

## 📱 دسترسی از همه جا

چون داده‌ها در cloud هستند:
- ✅ از موبایل
- ✅ از تبلت
- ✅ از کامپیوتر
- ✅ از هر جای دنیا

همه به یک دیتابیس دسترسی دارند.

## 🛠️ مدیریت داده‌ها

### مشاهده داده‌ها در Firebase Console:

1. به Firebase Console بروید
2. Firestore Database را باز کنید
3. Collections را ببینید
4. می‌توانید مستقیماً داده‌ها را ویرایش کنید

### Backup گیری:

Firebase Console → Firestore Database → Export data

## 🐛 عیب‌یابی

### داده‌ها sync نمی‌شوند:
- Console مرورگر را بررسی کنید (F12)
- مطمئن شوید Firebase config درست است
- مطمئن شوید Firestore فعال است

### خطای Permission denied:
- Firestore Rules را بررسی کنید
- در test mode قرار دهید

### خطای Firebase not configured:
- مطمئن شوید `src/firebase/config.ts` را ویرایش کرده‌اید
- `YOUR_API_KEY` را با کلید واقعی جایگزین کنید

## 📞 پشتیبانی Firebase

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firestore Documentation](https://firebase.google.com/docs/firestore)
- [Firebase Console](https://console.firebase.google.com/)

## ✅ چک‌لیست راه‌اندازی

- [ ] پروژه Firebase ساخته شده
- [ ] Firestore Database فعال شده
- [ ] Firebase config در کد جایگزین شده
- [ ] پروژه build شده
- [ ] فایل‌ها روی هاست آپلود شده
- [ ] تست شده و کار می‌کند

---

**نسخه:** 1.0.0  
**آخرین بروزرسانی:** 2024
