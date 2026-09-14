import { useApp } from '../context/AppContext';
import { LogoSmall } from './Logo';

export default function Footer() {
  const { navigate } = useApp();

  return (
    <footer className="glass border-t border-[#E5E7EB] py-12 px-4 mb-16 md:mb-0 shadow-soft">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <LogoSmall />
              <span className="text-xl font-black gradient-text">اسموک سیتی</span>
            </div>
            <p className="text-sm text-[#6b7280] leading-7">فروشگاه معتبر ویپ، پاد و لوازم جانبی با گارانتی اصالت کالا و ارسال سریع به سراسر ایران.</p>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-[#1a1a2e]">دسترسی سریع</h4>
            <ul className="space-y-2 text-sm text-[#6b7280]">
              <li><button onClick={() => navigate('shop')} className="hover:text-[#00C07F] transition-colors">فروشگاه</button></li>
              <li><button onClick={() => navigate('blog')} className="hover:text-[#00C07F] transition-colors">بلاگ</button></li>
              <li><button onClick={() => navigate('contact')} className="hover:text-[#00C07F] transition-colors">تماس با ما</button></li>
              <li><a href="#" className="hover:text-[#00C07F] transition-colors">تخفیف‌ها</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-[#1a1a2e]">خدمات مشتریان</h4>
            <ul className="space-y-2 text-sm text-[#6b7280]">
              <li><a href="#" className="hover:text-[#00C07F] transition-colors">راهنمای خرید</a></li>
              <li><a href="#" className="hover:text-[#00C07F] transition-colors">شرایط بازگشت</a></li>
              <li><a href="#" className="hover:text-[#00C07F] transition-colors">حریم خصوصی</a></li>
              <li><button onClick={() => navigate('contact')} className="hover:text-[#00C07F] transition-colors">تماس با ما</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-[#1a1a2e]">ارتباط با ما</h4>
            <ul className="space-y-2 text-sm text-[#6b7280]">
              <li><i className="fas fa-phone ml-2 text-[#00C07F]"></i>۰۲۱-۱۲۳۴۵۶۷۸</li>
              <li><i className="fas fa-envelope ml-2 text-[#00C07F]"></i>info@smokecity.ir</li>
              <li><i className="fas fa-map-marker-alt ml-2 text-[#00C07F]"></i>تهران، خیابان ولیعصر</li>
            </ul>
            <div className="flex gap-3 mt-4">
              <a href="#" className="w-9 h-9 glass rounded-lg flex items-center justify-center hover:text-[#00C07F] transition-colors shadow-soft">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="w-9 h-9 glass rounded-lg flex items-center justify-center hover:text-[#00C07F] transition-colors shadow-soft">
                <i className="fab fa-telegram"></i>
              </a>
              <a href="#" className="w-9 h-9 glass rounded-lg flex items-center justify-center hover:text-[#00C07F] transition-colors shadow-soft">
                <i className="fab fa-whatsapp"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-[#E5E7EB] mt-8 pt-6 text-center">
          <p className="text-xs text-[#9CA3AF]">© ۱۴۰۳ اسموک سیتی. تمامی حقوق محفوظ است. | فروش به افراد زیر ۱۸ سال ممنوع است.</p>
        </div>
      </div>
    </footer>
  );
}
