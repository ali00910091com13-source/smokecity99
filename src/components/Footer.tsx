import { useApp } from '../context/AppContext';
import { LogoSmall } from './Logo';

export default function Footer() {
  const { navigate } = useApp();

  return (
    <footer className="bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] text-white py-12 px-4 mb-16 md:mb-0 shadow-soft">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <LogoSmall />
              <span className="text-xl font-black bg-gradient-to-r from-[#00C07F] via-[#8B5CF6] to-[#F59E0B] bg-clip-text text-transparent">اسموک سیتی</span>
            </div>
            <p className="text-sm text-gray-300 leading-7">فروشگاه معتبر ویپ، پاد و لوازم جانبی با گارانتی اصالت کالا و ارسال سریع به سراسر ایران.</p>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-white">دسترسی سریع</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><button onClick={() => navigate('shop')} className="hover:text-[#00C07F] transition-colors">فروشگاه</button></li>
              <li><button onClick={() => navigate('blog')} className="hover:text-[#8B5CF6] transition-colors">بلاگ</button></li>
              <li><button onClick={() => navigate('contact')} className="hover:text-[#F59E0B] transition-colors">تماس با ما</button></li>
              <li><a href="#" className="hover:text-[#EC4899] transition-colors">تخفیف‌ها</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-white">خدمات مشتریان</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><a href="#" className="hover:text-[#00C07F] transition-colors">راهنمای خرید</a></li>
              <li><a href="#" className="hover:text-[#8B5CF6] transition-colors">شرایط بازگشت</a></li>
              <li><a href="#" className="hover:text-[#F59E0B] transition-colors">حریم خصوصی</a></li>
              <li><button onClick={() => navigate('contact')} className="hover:text-[#EC4899] transition-colors">تماس با ما</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-white">ارتباط با ما</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><i className="fas fa-phone ml-2 text-[#00C07F]"></i>۰۲۱-۱۲۳۴۵۶۷۸</li>
              <li><i className="fas fa-envelope ml-2 text-[#8B5CF6]"></i>info@smokecity.ir</li>
              <li><i className="fas fa-map-marker-alt ml-2 text-[#F59E0B]"></i>تهران، خیابان ولیعصر</li>
            </ul>
            <div className="flex gap-3 mt-4">
              <a href="#" className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center hover:bg-[#EC4899]/20 hover:text-[#EC4899] transition-all">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center hover:bg-[#0891B2]/20 hover:text-[#0891B2] transition-all">
                <i className="fab fa-telegram"></i>
              </a>
              <a href="#" className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center hover:bg-[#00C07F]/20 hover:text-[#00C07F] transition-all">
                <i className="fab fa-whatsapp"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 mt-8 pt-6 text-center">
          <p className="text-xs text-gray-400">© ۱۴۰۳ اسموک سیتی. تمامی حقوق محفوظ است.</p>
        </div>
      </div>
    </footer>
  );
}
