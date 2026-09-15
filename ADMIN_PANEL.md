# 🔐 پنل مدیریت اسموک سیتی

## 📍 آدرس مخفی پنل

```
/admin-x9k2m7p4-q8w3e5r1
```

**مثال:**
```
https://yourdomain.com/#/admin-x9k2m7p4-q8w3e5r1
```

## 🔑 اطلاعات ورود

**رمز عبور:**
```
SmokeCity@Admin2024!
```

> ⚠️ **توصیه امنیتی:** رمز عبور را در فایل `src/pages/AdminPanel.tsx` تغییر دهید.

## 🎯 امکانات پنل

### 1️⃣ داشبورد
- آمار کلی سایت
- تعداد محصولات
- تعداد مقالات بلاگ
- تعداد سفارشات
- درآمد کل

### 2️⃣ مدیریت محصولات
- ✅ افزودن محصول جدید
- ✅ ویرایش اطلاعات محصول
- ✅ افزایش/کاهش موجودی
- ✅ حذف محصول
- ✅ مشاهده لیست کامل محصولات

### 3️⃣ مدیریت بلاگ
- ✅ افزودن مقاله جدید
- ✅ ویرایش مقالات
- ✅ حذف مقالات
- ✅ مشاهده لیست کامل مقالات

### 4️⃣ مدیریت سفارشات
- ✅ مشاهده تمام سفارشات
- ✅ اطلاعات مشتری
- ✅ آدرس و شماره تماس
- ✅ لیست محصولات سفارش
- ✅ مبلغ کل سفارش
- ✅ وضعیت سفارش

## 💾 دیتابیس

پنل مدیریت از **localStorage** مرورگر به عنوان دیتابیس استفاده می‌کند.

### کلیدهای ذخیره‌سازی:

```javascript
localStorage.getItem('smokecity_products')  // محصولات
localStorage.getItem('smokecity_blog')      // مقالات بلاگ
localStorage.getItem('smokecity_orders')    // سفارشات
```

### ⚠️ نکات مهم:

1. **داده‌ها در مرورگر ذخیره می‌شوند** - اگر کش مرورگر پاک شود، داده‌ها از بین می‌روند
2. **داده‌ها محلی هستند** - فقط در همان مرورگر و دستگاه قابل دسترسی هستند
3. **برای محیط production** - باید از بک‌اند واقعی (Node.js, PHP, etc.) استفاده کنید

## 🔧 تغییر رمز عبور

فایل `src/pages/AdminPanel.tsx` را باز کنید و خط زیر را پیدا کنید:

```typescript
const ADMIN_PASSWORD = 'SmokeCity@Admin2024!';
```

رمز عبور دلخواه خود را جایگزین کنید:

```typescript
const ADMIN_PASSWORD = 'YourNewPassword123!';
```

سپس پروژه را build کنید:

```bash
npm run build
```

## 🚀 دسترسی به پنل

### روش 1: مستقیم
```
https://yourdomain.com/#/admin-x9k2m7p4-q8w3e5r1
```

### روش 2: از طریق سایت
هیچ لینکی در سایت وجود ندارد. باید آدرس را مستقیماً در مرورگر وارد کنید.

## 📊 ساختار داده‌ها

### محصول:
```typescript
{
  id: number,
  name: string,
  nameEn: string,
  brand: string,
  category: string,
  price: number,
  originalPrice: number,
  image: string,
  images: string[],
  rating: number,
  reviews: number,
  stock: number,
  description: string,
  isNew: boolean,
}
```

### مقاله بلاگ:
```typescript
{
  id: number,
  title: string,
  excerpt: string,
  content: string,
  date: string,
  category: string,
  readTime: string,
  image: string,
  author: string,
}
```

### سفارش:
```typescript
{
  id: string,
  date: string,
  items: CartItem[],
  total: number,
  status: 'processing' | 'shipped' | 'delivered',
  shippingInfo: {
    city: string,
    address: string,
    postalCode: string,
    receiverName: string,
    phone: string,
  }
}
```

## 🛡️ امنیت

### اقدامات امنیتی فعلی:
- ✅ آدرس مخفی و پیچیده
- ✅ رمز عبور قوی
- ✅ عدم نمایش در navigation سایت

### توصیه‌های امنیتی:
- 🔒 رمز عبور را به صورت دوره‌ای تغییر دهید
- 🔒 از HTTPS استفاده کنید
- 🔒 برای محیط production، از بک‌اند واقعی با authentication استفاده کنید
- 🔒 داده‌های مهم را در سرور ذخیره کنید نه localStorage

## 🔄 بک‌آپ گیری

برای بک‌آپ گیری از داده‌ها:

```javascript
// در Console مرورگر اجرا کنید:
const backup = {
  products: localStorage.getItem('smokecity_products'),
  blog: localStorage.getItem('smokecity_blog'),
  orders: localStorage.getItem('smokecity_orders'),
};
console.log(JSON.stringify(backup));
```

خروجی را در یک فایل JSON ذخیره کنید.

## 🔄 بازیابی داده‌ها

```javascript
// در Console مرورگر اجرا کنید:
const backup = {
  products: '...', // داده‌های بک‌آپ
  blog: '...',
  orders: '...',
};
localStorage.setItem('smokecity_products', backup.products);
localStorage.setItem('smokecity_blog', backup.blog);
localStorage.setItem('smokecity_orders', backup.orders);
location.reload();
```

## 📞 پشتیبانی

اگر مشکلی در پنل مدیریت دارید:
1. Console مرورگر را بررسی کنید (F12)
2. مطمئن شوید localStorage فعال است
3. کش مرورگر را پاک کنید
4. رمز عبور را بررسی کنید

---

**نسخه:** 1.0.0  
**آخرین بروزرسانی:** 2024
