# 🗄️ سیستم دیتابیس کامل - IndexedDB

## ✅ ویژگی‌ها

### 🎯 دیتابیس واقعی در مرورگر
- **IndexedDB** - دیتابیس قدرتمند مرورگر (مثل SQL)
- **Persistent** - داده‌ها حتی بعد از بستن مرورگر باقی می‌مانند
- **Fast** - سریع‌تر از localStorage
- **Structured** - ساختار جدولی با index

### 🔄 Sync خودکار با سایت
- تغییرات پنل ادمین **فوراً** در سایت اعمال می‌شوند
- هر 2 ثانیه داده‌ها آپدیت می‌شوند
- بدون نیاز به refresh صفحه

### 📝 فرم‌های کامل
- **محصولات**: نام، برند، دسته‌بندی، عکس، قیمت، موجودی، توضیحات
- **بلاگ**: تیتر، خلاصه، محتوا، عکس، دسته‌بندی، نویسنده
- **سفارشات**: مشاهده تمام سفارشات با جزئیات

---

## 🎨 فرم افزودن محصول

### فیلدها:
- ✅ **نام فارسی** (اجباری)
- ✅ **نام انگلیسی** (اجباری)
- ✅ **برند** (اجباری)
- ✅ **دسته‌بندی** (dropdown: پاد، ویپ، سالت، جویس، کویل، لوازم)
- ✅ **قیمت** (اجباری)
- ✅ **قیمت اصلی** (اختیاری - برای نمایش تخفیف)
- ✅ **URL تصویر** (اجباری - با preview)
- ✅ **موجودی** (اجباری)
- ✅ **توضیحات** (textarea)
- ✅ **محصول جدید** (checkbox)
- ✅ **پرفروش** (checkbox)

### عملیات:
- ➕ افزودن محصول جدید
- ✏️ ویرایش محصول موجود
- 🗑️ حذف محصول
- 🔼🔽 افزایش/کاهش موجودی

---

## 📝 فرم افزودن مقاله بلاگ

### فیلدها:
- ✅ **تیتر مقاله** (اجباری)
- ✅ **خلاصه** (textarea)
- ✅ **URL تصویر** (اجباری - با preview)
- ✅ **دسته‌بندی** (dropdown: آموزشی، راهنمای خرید، معرفی محصول، ترندها، اخبار)
- ✅ **زمان مطالعه** (مثال: ۵ دقیقه)
- ✅ **نویسنده** (نام نویسنده)
- ✅ **محتوای کامل** (textarea بزرگ - پشتیبانی از Markdown ساده)

### Markdown ساده:
```markdown
## تیتر اصلی
### زیرتیتر
- آیتم لیست
- آیتم لیست

1. شماره‌دار
2. شماره‌دار

**bold** و *italic*
```

### عملیات:
- ➕ افزودن مقاله جدید
- ✏️ ویرایش مقاله موجود
- 🗑️ حذف مقاله

---

## 🔄 نحوه Sync با سایت

### سیستم Event-Driven:
```typescript
// هر 2 ثانیه داده‌ها از IndexedDB خوانده می‌شوند
const interval = setInterval(loadProducts, 2000);
```

### صفحات متصل به دیتابیس:
- ✅ **HomePage** - محصولات ویژه و Flash Sale
- ✅ **ShopPage** - لیست تمام محصولات
- ✅ **BlogPage** - لیست مقالات
- ✅ **BlogPostPage** - نمایش مقاله کامل
- ✅ **CheckoutPage** - ذخیره سفارشات

### Flow:
```
Admin Panel (تغییرات)
    ↓
IndexedDB (ذخیره)
    ↓
Hook (خواندن هر 2 ثانیه)
    ↓
Site Pages (نمایش)
```

---

## 📍 آدرس پنل ادمین

```
/admin-x9k2m7p4-q8w3e5r1
```

**رمز عبور:**
```
SmokeCity@Admin2024!
```

---

## 🗄️ ساختار دیتابیس

### Products Table
```javascript
{
  id: 1234567890,
  name: "پاد سیستم اکسوا",
  nameEn: "OXVA Xlim Pro",
  brand: "OXVA",
  category: "pod",
  price: 1850000,
  originalPrice: 2100000,
  image: "https://...",
  images: ["https://..."],
  stock: 15,
  rating: 4.5,
  reviews: 234,
  description: "توضیحات...",
  isNew: true,
  isBestseller: true
}
```

### Blog Table
```javascript
{
  id: 1234567890,
  title: "راهنمای انتخاب پاد",
  excerpt: "خلاصه مقاله...",
  content: "محتوای کامل...",
  image: "https://...",
  category: "آموزشی",
  readTime: "۵ دقیقه",
  author: "علی محمدی",
  date: "۱۴۰۳/۰۹/۲۰"
}
```

### Orders Table
```javascript
{
  id: "123456",
  date: "۱۴۰۳/۰۹/۲۰",
  items: [...],
  total: 2500000,
  status: "processing",
  shippingInfo: {
    city: "tehran",
    address: "...",
    postalCode: "...",
    receiverName: "علی محمدی",
    phone: "09121234567"
  }
}
```

---

## 🎯 مزایای IndexedDB

### نسبت به localStorage:
- ✅ **حجم بیشتر** - تا صدها مگابایت
- ✅ **ساختار جدولی** - مثل SQL
- ✅ **Index** - جستجوی سریع
- ✅ **Transaction** - عملیات اتمیک
- ✅ **Async** - غیربلاک‌کننده

### نسبت به Firebase:
- ✅ **بدون نیاز به اینترنت** - آفلاین کار می‌کند
- ✅ **بدون نیاز به تنظیمات** - آماده استفاده
- ✅ **رایگان** - بدون محدودیت
- ✅ **سریع** - دسترسی مستقیم

---

## 🔧 فایل‌های مهم

```
src/
├── services/
│   └── database.ts          ← سرویس IndexedDB
├── hooks/
│   └── useDatabase.ts       ← Hook برای خواندن داده‌ها
├── pages/
│   ├── AdminPanel.tsx       ← پنل ادمین با فرم‌های کامل
│   ├── HomePage.tsx         ← متصل به دیتابیس
│   ├── ShopPage.tsx         ← متصل به دیتابیس
│   ├── BlogPage.tsx         ← متصل به دیتابیس
│   ├── BlogPostPage.tsx     ← متصل به دیتابیس
│   └── CheckoutPage.tsx     ← ذخیره در دیتابیس
└── ...
```

---

## 🚀 نحوه استفاده

### 1️⃣ ورود به پنل ادمین
```
https://yourdomain.com/#/admin-x9k2m7p4-q8w3e5r1
```

### 2️⃣ افزودن محصول
1. تب "محصولات" را انتخاب کنید
2. دکمه "افزودن محصول" را بزنید
3. فرم را پر کنید
4. دکمه "افزودن" را بزنید
5. ✅ محصول فوراً در سایت نمایش داده می‌شود!

### 3️⃣ افزودن مقاله
1. تب "بلاگ" را انتخاب کنید
2. دکمه "افزودن مقاله" را بزنید
3. فرم را پر کنید (تیتر، عکس، محتوا)
4. دکمه "انتشار" را بزنید
5. ✅ مقاله فوراً در بلاگ نمایش داده می‌شود!

### 4️⃣ مشاهده سفارشات
1. تب "سفارشات" را انتخاب کنید
2. تمام سفارشات ثبت شده را ببینید
3. اطلاعات مشتری، آدرس، محصولات، مبلغ کل

---

## 💾 Backup و Restore

### Backup از IndexedDB:
در Console مرورگر (F12):
```javascript
const request = indexedDB.open('SmokeCityDB', 1);
request.onsuccess = (event) => {
  const db = event.target.result;
  const tx = db.transaction(['products', 'blog', 'orders'], 'readonly');
  
  const products = tx.objectStore('products').getAll();
  const blog = tx.objectStore('blog').getAll();
  const orders = tx.objectStore('orders').getAll();
  
  products.onsuccess = () => console.log('Products:', products.result);
  blog.onsuccess = () => console.log('Blog:', blog.result);
  orders.onsuccess = () => console.log('Orders:', orders.result);
};
```

---

## 🎨 نمایش فرم‌ها

### فرم محصول:
- Modal زیبا با grid 2 ستونه
- Preview تصویر قبل از ذخیره
- Validation فیلدهای اجباری
- Dropdown برای دسته‌بندی
- Checkbox برای وضعیت محصول

### فرم بلاگ:
- Modal با textarea بزرگ برای محتوا
- Preview تصویر
- Dropdown برای دسته‌بندی
- راهنمای Markdown ساده

---

## ✅ خلاصه

| ویژگی | وضعیت |
|-------|--------|
| دیتابیس واقعی (IndexedDB) | ✅ |
| فرم کامل محصول | ✅ |
| فرم کامل بلاگ | ✅ |
| Sync خودکار با سایت | ✅ |
| ویرایش محصولات | ✅ |
| ویرایش مقالات | ✅ |
| حذف محصولات/مقالات | ✅ |
| مدیریت موجودی | ✅ |
| مشاهده سفارشات | ✅ |
| Preview تصویر | ✅ |
| بدون نیاز به Backend | ✅ |
| بدون نیاز به تنظیمات | ✅ |

---

**نسخه:** 4.0.0  
**دیتابیس:** IndexedDB  
**Sync:** Real-time (هر 2 ثانیه)
