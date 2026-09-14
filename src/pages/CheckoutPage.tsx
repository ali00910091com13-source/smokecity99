import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import GoogleLogin from '../components/GoogleLogin';
import { addOrder } from '../firebase/orders';
import { isFirebaseConfigured } from '../firebase/config';

export default function CheckoutPage() {
  const { cartItems, userInfo, setUserInfo, shippingInfo, setShippingInfo, addOrder } = useApp();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [orderSubmitted, setOrderSubmitted] = useState(false);

  const total = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shippingCost = shippingInfo.city === 'tehran' ? 50000 : shippingInfo.city ? 80000 : 0;

  const cities = [
    { id: 'tehran', name: 'تهران', shipping: 50000 },
    { id: 'isfahan', name: 'اصفهان', shipping: 80000 },
    { id: 'shiraz', name: 'شیراز', shipping: 80000 },
    { id: 'mashhad', name: 'مشهد', shipping: 80000 },
    { id: 'tabriz', name: 'تبریز', shipping: 80000 },
    { id: 'ahvaz', name: 'اهواز', shipping: 80000 },
    { id: 'qom', name: 'قم', shipping: 80000 },
    { id: 'karaj', name: 'کرج', shipping: 80000 },
    { id: 'kermanshah', name: 'کرمانشاه', shipping: 80000 },
    { id: 'rasht', name: 'رشت', shipping: 80000 },
    { id: 'other', name: 'سایر شهرها', shipping: 80000 },
  ];

  const handleGoogleLoginSuccess = () => {
    // After successful Google login, move to next step
    setCurrentStep(2);
  };

  const handleNext = () => {
    if (currentStep < 6) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create order
    const newOrder = {
      id: Math.floor(Math.random() * 1000000).toString(),
      date: new Date().toLocaleDateString('fa-IR'),
      items: [...cartItems],
      total: total + shippingCost,
      status: 'processing' as const,
      shippingInfo: { ...shippingInfo },
    };
    
    // Save to Firebase if configured
    if (isFirebaseConfigured()) {
      try {
        await addOrder(newOrder);
      } catch (error) {
        console.error('Error saving order to Firebase:', error);
      }
    }
    
    // Add order to context
    const { addOrder: addOrderToContext } = useApp();
    addOrderToContext(newOrder);
    
    setOrderSubmitted(true);
  };

  if (cartItems.length === 0 && !orderSubmitted) {
    return (
      <section className="pt-24 pb-12 px-4 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <span className="text-6xl mb-4 block">🛒</span>
          <p className="text-[#6b7280] mb-4">سبد خرید شما خالی است</p>
          <button onClick={() => navigate('/shop')} className="text-[#00C07F] hover:underline font-medium">
            بازگشت به فروشگاه
          </button>
        </div>
      </section>
    );
  }

  if (orderSubmitted) {
    return (
      <section className="pt-24 pb-12 px-4 min-h-screen flex items-center justify-center">
        <div className="glass rounded-3xl p-12 max-w-md text-center shadow-soft animate-scale-in">
          <div className="w-20 h-20 bg-[#00C07F]/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <i className="fas fa-check text-[#00C07F] text-3xl"></i>
          </div>
          <h2 className="text-2xl font-bold text-[#1a1a2e] mb-4">سفارش شما ثبت شد!</h2>
          <p className="text-[#6b7280] mb-6">به زودی برای تأیید سفارش با شما تماس خواهیم گرفت</p>
          <button onClick={() => navigate('/')} className="btn-accent px-8 py-3 rounded-xl">
            بازگشت به صفحه اصلی
          </button>
        </div>
      </section>
    );
  }

  const steps = [
    { num: 1, title: 'ورود با گوگل', icon: 'fab fa-google' },
    { num: 2, title: 'انتخاب شهر', icon: 'fas fa-map-marker-alt' },
    { num: 3, title: 'آدرس', icon: 'fas fa-home' },
    { num: 4, title: 'کد پستی', icon: 'fas fa-mail-bulk' },
    { num: 5, title: 'مشخصات گیرنده', icon: 'fas fa-user' },
    { num: 6, title: 'پرداخت', icon: 'fas fa-credit-card' },
  ];

  return (
    <section className="pt-24 pb-24 px-4 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <button onClick={() => navigate('/shop')} className="flex items-center gap-2 text-[#6b7280] hover:text-[#00C07F] transition-colors mb-6">
          <i className="fas fa-arrow-right"></i>
          <span className="text-sm">بازگشت به فروشگاه</span>
        </button>

        <h1 className="text-2xl md:text-3xl font-black mb-8 text-[#1a1a2e]">
          <span className="gradient-text">تسویه حساب</span>
        </h1>

        {/* Progress Bar */}
        <div className="glass rounded-2xl p-6 mb-8 shadow-soft">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => (
              <div key={step.num} className="flex items-center flex-1">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                  currentStep >= step.num 
                    ? 'bg-gradient-to-r from-[#00C07F] to-[#0891B2] text-white shadow-lg' 
                    : 'bg-gray-200 text-gray-400'
                }`}>
                  <i className={`${step.icon} text-sm`}></i>
                </div>
                {index < steps.length - 1 && (
                  <div className={`flex-1 h-1 mx-2 rounded transition-all ${
                    currentStep > step.num ? 'bg-gradient-to-r from-[#00C07F] to-[#0891B2]' : 'bg-gray-200'
                  }`}></div>
                )}
              </div>
            ))}
          </div>
          <div className="text-center">
            <p className="text-sm text-[#6b7280]">
              مرحله {currentStep} از {steps.length}: <span className="font-bold text-[#1a1a2e]">{steps[currentStep - 1].title}</span>
            </p>
          </div>
        </div>

        {/* Step Content */}
        <div className="glass rounded-2xl p-8 shadow-soft">
          {/* Step 1: Google Login */}
          {currentStep === 1 && (
            <div className="text-center py-8">
              <div className="w-20 h-20 bg-gradient-to-br from-[#00C07F] to-[#0891B2] rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="fab fa-google text-white text-3xl"></i>
              </div>
              <h2 className="text-2xl font-bold text-[#1a1a2e] mb-4">ورود با حساب گوگل</h2>
              <p className="text-[#6b7280] mb-8">برای ادامه خرید، با حساب گوگل خود وارد شوید</p>
              <GoogleLogin onSuccess={handleGoogleLoginSuccess} />
            </div>
          )}

          {/* Step 2: City Selection */}
          {currentStep === 2 && (
            <div>
              <h2 className="text-2xl font-bold text-[#1a1a2e] mb-6">انتخاب شهر</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {cities.map(city => (
                  <button
                    key={city.id}
                    onClick={() => {
                      setShippingInfo({ ...shippingInfo, city: city.id });
                      handleNext();
                    }}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      shippingInfo.city === city.id
                        ? 'border-[#00C07F] bg-[#00C07F]/5'
                        : 'border-gray-200 hover:border-[#00C07F]/50'
                    }`}
                  >
                    <p className="font-bold text-[#1a1a2e]">{city.name}</p>
                    <p className="text-xs text-[#6b7280] mt-1">
                      ارسال: {(city.shipping / 1000).toFixed(0)} هزار تومان
                    </p>
                  </button>
                ))}
              </div>
              <div className="flex justify-between mt-8">
                <button onClick={handleBack} className="px-6 py-3 glass rounded-xl text-[#4b5563] hover:text-[#1a1a2e] transition-colors">
                  <i className="fas fa-arrow-right ml-2"></i>مرحله قبل
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Address */}
          {currentStep === 3 && (
            <div>
              <h2 className="text-2xl font-bold text-[#1a1a2e] mb-6">آدرس کامل</h2>
              <textarea
                value={shippingInfo.address}
                onChange={e => setShippingInfo({ ...shippingInfo, address: e.target.value })}
                placeholder="آدرس کامل خود را وارد کنید (خیابان، کوچه، پلاک، واحد)"
                rows={4}
                className="w-full bg-white text-[#1a1a2e] rounded-xl p-4 border border-[#E5E7EB] outline-none focus:border-[#00C07F] transition-colors text-sm placeholder-[#9CA3AF] resize-none"
              />
              <div className="flex justify-between mt-8">
                <button onClick={handleBack} className="px-6 py-3 glass rounded-xl text-[#4b5563] hover:text-[#1a1a2e] transition-colors">
                  <i className="fas fa-arrow-right ml-2"></i>مرحله قبل
                </button>
                <button
                  onClick={handleNext}
                  disabled={!shippingInfo.address}
                  className="btn-accent px-6 py-3 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  مرحله بعد<i className="fas fa-arrow-left mr-2"></i>
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Postal Code */}
          {currentStep === 4 && (
            <div>
              <h2 className="text-2xl font-bold text-[#1a1a2e] mb-6">کد پستی</h2>
              <input
                type="text"
                value={shippingInfo.postalCode}
                onChange={e => setShippingInfo({ ...shippingInfo, postalCode: e.target.value })}
                placeholder="کد پستی ۱۰ رقمی"
                maxLength={10}
                className="w-full bg-white text-[#1a1a2e] rounded-xl p-4 border border-[#E5E7EB] outline-none focus:border-[#00C07F] transition-colors text-sm placeholder-[#9CA3AF]"
              />
              <p className="text-xs text-[#9CA3AF] mt-2">کد پستی باید ۱۰ رقم باشد</p>
              <div className="flex justify-between mt-8">
                <button onClick={handleBack} className="px-6 py-3 glass rounded-xl text-[#4b5563] hover:text-[#1a1a2e] transition-colors">
                  <i className="fas fa-arrow-right ml-2"></i>مرحله قبل
                </button>
                <button
                  onClick={handleNext}
                  disabled={shippingInfo.postalCode.length !== 10}
                  className="btn-accent px-6 py-3 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  مرحله بعد<i className="fas fa-arrow-left mr-2"></i>
                </button>
              </div>
            </div>
          )}

          {/* Step 5: Receiver Info */}
          {currentStep === 5 && (
            <div>
              <h2 className="text-2xl font-bold text-[#1a1a2e] mb-6">مشخصات گیرنده</h2>
              <div className="space-y-4">
                <input
                  type="text"
                  value={shippingInfo.receiverName}
                  onChange={e => setShippingInfo({ ...shippingInfo, receiverName: e.target.value })}
                  placeholder="نام و نام خانوادگی گیرنده"
                  className="w-full bg-white text-[#1a1a2e] rounded-xl p-4 border border-[#E5E7EB] outline-none focus:border-[#00C07F] transition-colors text-sm placeholder-[#9CA3AF]"
                />
                <input
                  type="tel"
                  value={shippingInfo.phone}
                  onChange={e => setShippingInfo({ ...shippingInfo, phone: e.target.value })}
                  placeholder="شماره تماس گیرنده (مثال: 09121234567)"
                  className="w-full bg-white text-[#1a1a2e] rounded-xl p-4 border border-[#E5E7EB] outline-none focus:border-[#00C07F] transition-colors text-sm placeholder-[#9CA3AF]"
                />
              </div>
              <div className="flex justify-between mt-8">
                <button onClick={handleBack} className="px-6 py-3 glass rounded-xl text-[#4b5563] hover:text-[#1a1a2e] transition-colors">
                  <i className="fas fa-arrow-right ml-2"></i>مرحله قبل
                </button>
                <button
                  onClick={handleNext}
                  disabled={!shippingInfo.receiverName || !shippingInfo.phone}
                  className="btn-accent px-6 py-3 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  مرحله بعد<i className="fas fa-arrow-left mr-2"></i>
                </button>
              </div>
            </div>
          )}

          {/* Step 6: Summary & Payment */}
          {currentStep === 6 && (
            <form onSubmit={handleSubmit}>
              <h2 className="text-2xl font-bold text-[#1a1a2e] mb-6">خلاصه سفارش و پرداخت</h2>
              
              {/* User Info */}
              {userInfo && (
                <div className="glass rounded-xl p-4 mb-4">
                  <div className="flex items-center gap-3">
                    <img src={userInfo.avatar} alt={userInfo.name} className="w-12 h-12 rounded-full" />
                    <div>
                      <p className="font-bold text-[#1a1a2e]">{userInfo.name}</p>
                      <p className="text-xs text-[#6b7280]">{userInfo.email}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Shipping Info */}
              <div className="glass rounded-xl p-4 mb-4">
                <h3 className="font-bold text-[#1a1a2e] mb-3">اطلاعات ارسال</h3>
                <div className="space-y-2 text-sm">
                  <p><span className="text-[#6b7280]">شهر:</span> <span className="text-[#1a1a2e] font-medium">{cities.find(c => c.id === shippingInfo.city)?.name}</span></p>
                  <p><span className="text-[#6b7280]">آدرس:</span> <span className="text-[#1a1a2e] font-medium">{shippingInfo.address}</span></p>
                  <p><span className="text-[#6b7280]">کد پستی:</span> <span className="text-[#1a1a2e] font-medium">{shippingInfo.postalCode}</span></p>
                  <p><span className="text-[#6b7280]">گیرنده:</span> <span className="text-[#1a1a2e] font-medium">{shippingInfo.receiverName}</span></p>
                  <p><span className="text-[#6b7280]">تلفن:</span> <span className="text-[#1a1a2e] font-medium">{shippingInfo.phone}</span></p>
                </div>
              </div>

              {/* Order Summary */}
              <div className="glass rounded-xl p-4 mb-4">
                <h3 className="font-bold text-[#1a1a2e] mb-3">محصولات</h3>
                <div className="space-y-3 mb-4">
                  {cartItems.map(item => (
                    <div key={item.product.id} className="flex justify-between text-sm">
                      <span className="text-[#6b7280]">{item.product.name} × {item.quantity}</span>
                      <span className="text-[#1a1a2e] font-medium">{((item.product.price * item.quantity) / 10000).toFixed(0)} هزار</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-[#E5E7EB] pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#6b7280]">جمع محصولات</span>
                    <span className="text-[#1a1a2e]">{(total / 10000).toFixed(0)} هزار</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#6b7280]">هزینه ارسال</span>
                    <span className="text-[#1a1a2e]">{(shippingCost / 1000).toFixed(0)} هزار</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold pt-2 border-t border-[#E5E7EB]">
                    <span className="gradient-text">مبلغ نهایی</span>
                    <span className="gradient-text">{((total + shippingCost) / 10000).toFixed(0)} هزار تومان</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-between mt-8">
                <button type="button" onClick={handleBack} className="px-6 py-3 glass rounded-xl text-[#4b5563] hover:text-[#1a1a2e] transition-colors">
                  <i className="fas fa-arrow-right ml-2"></i>مرحله قبل
                </button>
                <button type="submit" className="btn-accent px-8 py-3 rounded-xl">
                  <i className="fas fa-credit-card ml-2"></i>پرداخت آنلاین
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
