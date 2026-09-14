import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function CheckoutPage() {
  const { cartItems } = useApp();
  const navigate = useNavigate();
  const [city, setCity] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    postalCode: '',
  });
  const [orderSubmitted, setOrderSubmitted] = useState(false);

  const total = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shippingCost = city === 'tehran' ? 50000 : city ? 80000 : 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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

  return (
    <section className="pt-24 pb-24 px-4 min-h-screen">
      <div className="max-w-3xl mx-auto">
        <button onClick={() => navigate('/shop')} className="flex items-center gap-2 text-[#6b7280] hover:text-[#00C07F] transition-colors mb-6">
          <i className="fas fa-arrow-right"></i>
          <span className="text-sm">بازگشت</span>
        </button>

        <h1 className="text-2xl md:text-3xl font-black mb-8 text-[#1a1a2e]">
          <span className="gradient-text">تسویه حساب</span>
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="glass rounded-2xl p-6 space-y-4 shadow-soft">
                <h3 className="font-bold text-lg mb-2 text-[#1a1a2e]">اطلاعات ارسال</h3>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  placeholder="نام و نام خانوادگی"
                  className="w-full bg-white text-[#1a1a2e] rounded-xl p-3 border border-[#E5E7EB] outline-none focus:border-[#00C07F] transition-colors text-sm placeholder-[#9CA3AF]"
                />
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="شماره موبایل"
                  className="w-full bg-white text-[#1a1a2e] rounded-xl p-3 border border-[#E5E7EB] outline-none focus:border-[#00C07F] transition-colors text-sm placeholder-[#9CA3AF]"
                />
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={e => setFormData({ ...formData, address: e.target.value })}
                  placeholder="آدرس کامل"
                  className="w-full bg-white text-[#1a1a2e] rounded-xl p-3 border border-[#E5E7EB] outline-none focus:border-[#00C07F] transition-colors text-sm placeholder-[#9CA3AF]"
                />
                <input
                  type="text"
                  required
                  value={formData.postalCode}
                  onChange={e => setFormData({ ...formData, postalCode: e.target.value })}
                  placeholder="کد پستی"
                  className="w-full bg-white text-[#1a1a2e] rounded-xl p-3 border border-[#E5E7EB] outline-none focus:border-[#00C07F] transition-colors text-sm placeholder-[#9CA3AF]"
                />
                <select
                  required
                  value={city}
                  onChange={e => setCity(e.target.value)}
                  className="w-full bg-white text-[#1a1a2e] rounded-xl p-3 border border-[#E5E7EB] outline-none focus:border-[#00C07F] transition-colors text-sm"
                >
                  <option value="">انتخاب شهر</option>
                  <option value="tehran">تهران (ارسال اکسپرس)</option>
                  <option value="isfahan">اصفهان</option>
                  <option value="shiraz">شیراز</option>
                  <option value="mashhad">مشهد</option>
                  <option value="tabriz">تبریز</option>
                  <option value="other">سایر شهرها</option>
                </select>
              </div>
            </div>

            <div className="space-y-4">
              <div className="glass rounded-2xl p-6 shadow-soft">
                <h3 className="font-bold text-lg mb-4 text-[#1a1a2e]">خلاصه سفارش</h3>
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
                    <span className="text-[#1a1a2e]">{shippingCost ? `${(shippingCost / 1000).toFixed(0)} هزار` : 'انتخاب نشده'}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold pt-2 border-t border-[#E5E7EB]">
                    <span className="gradient-text">مبلغ نهایی</span>
                    <span className="gradient-text">{((total + shippingCost) / 10000).toFixed(0)} هزار تومان</span>
                  </div>
                </div>
              </div>
              <button type="submit" className="w-full btn-accent py-4 rounded-2xl text-lg">
                پرداخت آنلاین
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
