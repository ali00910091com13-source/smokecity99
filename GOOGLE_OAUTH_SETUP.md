# 🔐 راهنمای تنظیم ورود با گوگل

## مراحل دریافت Google OAuth Client ID

### 1. ایجاد پروژه در Google Cloud Console

1. به [Google Cloud Console](https://console.cloud.google.com/) بروید
2. از منوی بالا، یک پروژه جدید بسازید یا پروژه موجود را انتخاب کنید
3. روی نام پروژه کلیک کنید و "New Project" را بزنید
4. نام پروژه را وارد کنید (مثلاً: Smoke City) و "Create" را بزنید

### 2. فعال‌سازی Google Identity Services API

1. در منوی سمت چپ، به **APIs & Services** → **Library** بروید
2. عبارت "Google Identity Services" را جستجو کنید
3. روی آن کلیک کنید و دکمه **Enable** را بزنید

### 3. ایجاد OAuth 2.0 Client ID

1. به **APIs & Services** → **Credentials** بروید
2. روی **+ CREATE CREDENTIALS** کلیک کنید
3. **OAuth client ID** را انتخاب کنید
4. اگر اولین بار است، باید **Configure consent screen** را تکمیل کنید:
   - **User Type**: External را انتخاب کنید
   - **App name**: نام برنامه (مثلاً: Smoke City)
   - **User support email**: ایمیل پشتیبانی
   - **Developer contact information**: ایمیل شما
   - روی **Save and Continue** کلیک کنید
   - در بخش **Scopes**، روی **Add or Remove Scopes** کلیک کنید
   - عبارت "email" و "profile" را جستجو و انتخاب کنید
   - روی **Update** و سپس **Save and Continue** کلیک کنید
   - در بخش **Test users**، ایمیل تست را اضافه کنید (برای تست)
   - روی **Save and Continue** و سپس **Back to Dashboard** کلیک کنید

5. حالا **OAuth client ID** را ایجاد کنید:
   - **Application type**: Web application
   - **Name**: Smoke City Web Client
   - **Authorized JavaScript origins**: دامنه خود را اضافه کنید
     - برای تست محلی: `http://localhost:5173`
     - برای GitHub Pages: `https://YOUR_USERNAME.github.io`
   - روی **Create** کلیک کنید

6. **Client ID** را کپی کنید

### 4. جایگزینی Client ID در کد

فایل `src/components/GoogleLogin.tsx` را باز کنید و خط زیر را پیدا کنید:

```typescript
const GOOGLE_CLIENT_ID = 'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com';
```

آن را با Client ID واقعی خود جایگزین کنید:

```typescript
const GOOGLE_CLIENT_ID = '1234567890-abcdefghijklmnopqrstuvwxyz.apps.googleusercontent.com';
```

### 5. تست ورود با گوگل

1. پروژه را build کنید:
```bash
npm run build
```

2. سایت را باز کنید و به بخش خرید بروید
3. روی دکمه "ورود با گوگل" کلیک کنید
4. حساب گوگل خود را انتخاب کنید
5. اطلاعات شما (نام، ایمیل، عکس) باید نمایش داده شود

## نکات مهم

### برای GitHub Pages

اگر سایت روی GitHub Pages است، باید دامنه GitHub Pages خود را به Authorized JavaScript origins اضافه کنید:

```
https://YOUR_USERNAME.github.io
```

### برای دامنه سفارشی

اگر از دامنه سفارشی استفاده می‌کنید، دامنه خود را اضافه کنید:

```
https://yourdomain.com
```

### برای تست محلی

برای تست در لوکال هاست:

```
http://localhost:5173
```

## عیب‌یابی

### خطای "ID token not valid"

- مطمئن شوید Client ID درست است
- مطمئن شوید دامنه شما در Authorized JavaScript origins اضافه شده است
- چند دقیقه صبر کنید تا تغییرات اعمال شوند

### دکمه گوگل نمایش داده نمی‌شود

- مطمئن شوید اسکریپت گوگل در `index.html` بارگذاری شده است
- Console مرورگر را بررسی کنید
- مطمئن شوید Client ID معتبر است

### خطای "popup_closed_by_user"

- کاربر پنجره ورود را بسته است
- این خطا طبیعی است و نیازی به نگرانی نیست

## اطلاعات بیشتر

- [Google Identity Services Documentation](https://developers.google.com/identity/gsi/web/guides/overview)
- [Google Cloud Console](https://console.cloud.google.com/)
- [OAuth 2.0 Documentation](https://developers.google.com/identity/protocols/oauth2)
