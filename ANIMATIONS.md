# 🎨 انیمیشن‌های حرفه‌ای با Framer Motion

## ✅ تغییرات اعمال شده

### 1️⃣ کتابخانه Framer Motion نصب شد
**کتابخانه:** [Framer Motion](https://www.framer.com/motion/)

**مزایا:**
- ✅ انیمیشن‌های روان و حرفه‌ای
- ✅ مخصوص React ساخته شده
- ✅ پرفورمنس عالی
- ✅ استفاده آسان
- ✅ انیمیشن‌های پیچیده با کد ساده

---

### 2️ فایل انیمیشن‌ها ساخته شد
**فایل:** `src/components/animations.ts`

**انیمیشن‌های موجود:**
- `fadeInUp` - ورود از پایین
- `fadeInDown` - ورود از بالا
- `fadeInLeft` - ورود از چپ
- `fadeInRight` - ورود از راست
- `scaleIn` - ورود با scale
- `staggerContainer` - کانتینر پله‌ای
- `staggerItem` - آیتم پله‌ای
- `hoverScale` - hover با scale
- `hoverLift` - hover با lift
- `pulse` - ضربان
- `bounce` - پرش
- `rotate` - چرخش
- `float` - شناور
- `shake` - لرزش
- `slideInRight` - slide از راست
- `slideInLeft` - slide از چپ
- `cardHover` - hover کارت
- `buttonHover` - hover دکمه
- `imageZoom` - zoom تصویر
- `gradientAnimation` - انیمیشن گرادینت
- `typing` - انیمیشن تایپ
- `countUp` - شمارش
- `ripple` - موج
- `confetti` - کاغذ رنگی
- `glow` - درخشش
- `morph` - تغییر شکل
- `wave` - موج
- `swing` - تاب
- `rubberBand` - کشسانی
- `jello` - ژله
- `heartBeat` - ضربان قلب
- `flash` - فلش
- `wobble` - تکان
- `flip` - چرخش
- `slideUp` - slide بالا
- `slideDown` - slide پایین
- `zoomIn` - zoom in
- `zoomOut` - zoom out
- `rotateIn` - چرخش ورود
- `blurIn` - blur ورود
- `colorChange` - تغییر رنگ
- `bgColorChange` - تغییر رنگ پس‌زمینه

---

### 3️⃣ Hero Banner با انیمیشن‌های حرفه‌ای

**انیمیشن‌های Hero:**
```typescript
// پس‌زمینه متحرک
motion.div 
  animate={{ y: [0, -30, 0], scale: [1, 1.1, 1] }}
  transition={{ duration: 5, repeat: Infinity }}

// متن‌ها با ورود پله‌ای
motion.h1
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, delay: 0.3 }}

// دکمه‌ها با hover و tap
motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  animate={{ boxShadow: [...] }}
```

**ویژگی‌ها:**
- ✅ پس‌زمینه متحرک با 3 دایره
- ✅ ورود پله‌ای متن‌ها
- ✅ hover و tap effects
- ✅ انیمیشن shadow برای دکمه‌ها
- ✅ کارت‌های محصول با انیمیشن stagger

---

### 4️⃣ ProductCard با انیمیشن‌های حرفه‌ای

**انیمیشن‌های ProductCard:**
```typescript
// کارت محصول
motion.div
  initial={{ opacity: 0, y: 50 }}
  animate={{ opacity: 1, y: 0 }}
  whileHover={{ y: -10, boxShadow: '...' }}

// تصویر محصول
motion.img
  whileHover={{ scale: 1.1 }}

// دکمه لایک
motion.button
  whileHover={{ scale: 1.2 }}
  whileTap={{ scale: 0.9 }}
  animate={liked ? { scale: [1, 1.3, 1] } : {}}

// دکمه افزودن به سبد
motion.button
  whileHover={{ scale: 1.1, rotate: 90 }}
  whileTap={{ scale: 0.9 }}

// badges با ورود پله‌ای
motion.span
  initial={{ opacity: 0, scale: 0 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ delay: 0.2 }}
```

**ویژگی‌ها:**
- ✅ ورود کارت از پایین
- ✅ hover با lift و shadow
- ✅ zoom تصویر
- ✅ انیمیشن لایک
- ✅ چرخش دکمه افزودن
- ✅ badges با ورود پله‌ای

---

### 5️⃣ NotFoundPage با انیمیشن‌های حرفه‌ای

**انیمیشن‌های 404:**
```typescript
// عدد 404
motion.div
  initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
  animate={{ opacity: 1, scale: 1, rotate: 0 }}
  transition={{ duration: 0.8, type: 'spring' }}

// آیکون هشدار
motion.i
  animate={{ 
    x: [0, -10, 10, -10, 10, 0],
    rotate: [0, -5, 5, -5, 5, 0]
  }}

// پیام‌ها با ورود پله‌ای
motion.h1
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 1 }}

// دکمه‌ها با hover و tap
motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  animate={{ boxShadow: [...] }}

// آیکون جستجو
motion.i
  animate={{ rotate: [0, 360] }}
  transition={{ duration: 2, repeat: Infinity }}
```

**ویژگی‌ها:**
- ✅ عدد 404 با چرخش و scale
- ✅ آیکون هشدار با لرزش
- ✅ پیام‌ها با ورود پله‌ای
- ✅ دکمه‌ها با hover و tap
- ✅ آیکون جستجو با چرخش

---

### 6️⃣ BottomNav با انیمیشن‌های حرفه‌ای

**انیمیشن‌های BottomNav:**
```typescript
// آیکون‌های فعال
motion.i
  animate={isActive ? { scale: [1, 1.2, 1] } : {}}
  transition={{ duration: 0.5 }}

// آیکون سبد خرید
motion.i
  animate={{ scale: [1, 1.1, 1] }}
  transition={{ duration: 1.5, repeat: Infinity }}

// badge تعداد
motion.span
  initial={{ scale: 0 }}
  animate={{ scale: [0, 1.3, 1] }}
  transition={{ duration: 0.5 }}

// دکمه‌ها با tap
motion.button
  whileTap={{ scale: 0.9 }}
```

**ویژگی‌ها:**
- ✅ آیکون‌های فعال با pulse
- ✅ آیکون سبد خرید با انیمیشن دائمی
- ✅ badge با ورود spring
- ✅ tap effects

---

## 📁 فایل‌های تغییر یافته

### جدید:
- `src/components/animations.ts` - کتابخانه انیمیشن‌ها
- `src/components/ProductCard.tsx` - ProductCard با framer-motion
- `src/pages/NotFoundPage.tsx` - 404 با framer-motion
- `src/components/BottomNav.tsx` - BottomNav با framer-motion

### اصلاح شده:
- `src/pages/HomePage.tsx` - Hero Banner با framer-motion

---

## 🎬 نمونه‌های انیمیشن

### Hero Banner:
```tsx
<motion.div
  initial={{ opacity: 0, x: -50 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.8 }}
>
  <motion.h1
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay: 0.3 }}
  >
    عنوان
  </motion.h1>
</motion.div>
```

### ProductCard:
```tsx
<motion.div
  initial={{ opacity: 0, y: 50 }}
  animate={{ opacity: 1, y: 0 }}
  whileHover={{ y: -10 }}
>
  <motion.img
    whileHover={{ scale: 1.1 }}
  />
</motion.div>
```

### NotFoundPage:
```tsx
<motion.div
  initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
  animate={{ opacity: 1, scale: 1, rotate: 0 }}
  transition={{ duration: 0.8, type: 'spring' }}
>
  404
</motion.div>
```

---

## 🎨 انواع انیمیشن‌ها

### 1. ورود عناصر
- `initial` - حالت اولیه
- `animate` - حالت نهایی
- `transition` - تنظیمات انتقال

### 2. Hover Effects
- `whileHover` - هنگام hover
- `whileTap` - هنگام کلیک

### 3. انیمیشن‌های دائمی
- `repeat: Infinity` - تکرار بی‌نهایت
- `duration` - مدت زمان
- `ease` - نوع easing

### 4. Spring Animation
- `type: 'spring'` - انیمیشن فنری
- `stiffness` - سختی فنر
- `damping` - میرایی

### 5. Stagger Animation
- `staggerChildren` - تاخیر بین فرزندان
- ورود پله‌ای عناصر

---

## 📊 خلاصه

| ویژگی | وضعیت |
|-------|--------|
| Framer Motion نصب شده | ✅ |
| فایل انیمیشن‌ها | ✅ |
| Hero Banner متحرک | ✅ |
| ProductCard متحرک | ✅ |
| NotFoundPage متحرک | ✅ |
| BottomNav متحرک | ✅ |
| 40+ انیمیشن آماده | ✅ |

---

**نسخه:** 6.0.0  
**کتابخانه:** Framer Motion  
**انیمیشن‌ها:** حرفه‌ای و روان
