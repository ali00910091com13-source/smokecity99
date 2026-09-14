import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { categories } from '../data/products';
import { LogoLarge } from '../components/Logo';
import ProductCard from '../components/ProductCard';
import { useProducts } from '../hooks/useDatabase';

// Hero Banner
function HeroBanner() {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-[70vh] md:min-h-[80vh] flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 via-purple-500/15 to-orange-500/20"></div>
        <div className="absolute inset-0">
          <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-[#00C07F]/20 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-[#8B5CF6]/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-[#F59E0B]/15 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        </div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="text-center md:text-right space-y-6">
            <div className="inline-block px-4 py-1.5 rounded-full bg-gradient-to-r from-[#00C07F]/20 to-[#8B5CF6]/20 border border-[#00C07F]/30 text-[#00C07F] text-sm font-bold animate-scale-in">
              🔥 پیشنهاد ویژه این هفته
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight text-[#1a1a2e]">
              <span className="bg-gradient-to-r from-[#00C07F] via-[#8B5CF6] to-[#F59E0B] bg-clip-text text-transparent">
                تخفیف‌های باورنکردنی
              </span>
              <br />
              <span className="text-[#1a1a2e]">تا ۵۰٪ تخفیف</span>
            </h1>
            
            <p className="text-lg md:text-xl text-[#4b5563] leading-8">
              بهترین برندهای جهانی ویپ و پاد با گارانتی اصالت و ارسال سریع به سراسر ایران
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <button 
                onClick={() => navigate('/shop')}
                className="btn-accent px-8 py-4 rounded-2xl text-lg animate-pulse-soft"
              >
                مشاهده محصولات
              </button>
              <button 
                onClick={() => navigate('/contact')}
                className="px-8 py-4 rounded-2xl glass text-[#1a1a2e] font-medium hover:shadow-soft transition-all border border-[#8B5CF6]/30"
              >
                مشاوره رایگان
              </button>
            </div>

            <div className="flex gap-6 justify-center md:justify-start pt-4">
              <div className="text-center">
                <div className="text-2xl font-black text-[#00C07F]">+۱۰۰۰</div>
                <div className="text-xs text-[#6b7280]">مشتری راضی</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-black text-[#8B5CF6]">+۵۰</div>
                <div className="text-xs text-[#6b7280]">برند معتبر</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-black text-[#F59E0B]">۲۴/۷</div>
                <div className="text-xs text-[#6b7280]">پشتیبانی</div>
              </div>
            </div>
          </div>

          <div className="relative hidden md:block">
            <div className="relative w-full aspect-square max-w-lg mx-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-[#00C07F]/30 to-[#8B5CF6]/30 rounded-full blur-2xl animate-float"></div>
              
              <div className="relative z-10 grid grid-cols-2 gap-4 p-8">
                <div className="glass rounded-3xl p-6 shadow-soft hover:scale-105 transition-transform duration-300 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                  <img src="https://images.unsplash.com/photo-1560913210-59b747b4a0a0?w=300&h=300&fit=crop" alt="Pod" className="w-full h-32 object-cover rounded-2xl mb-3" />
                  <p className="text-sm font-bold text-[#1a1a2e]">پاد سیستم</p>
                  <p className="text-xs text-[#00C07F] font-bold">۳۰٪ تخفیف</p>
                </div>
                <div className="glass rounded-3xl p-6 shadow-soft hover:scale-105 transition-transform duration-300 animate-fade-in-up mt-8" style={{ animationDelay: '0.4s' }}>
                  <img src="https://images.unsplash.com/photo-1560253023-3ec5d502959f?w=300&h=300&fit=crop" alt="Vape" className="w-full h-32 object-cover rounded-2xl mb-3" />
                  <p className="text-sm font-bold text-[#1a1a2e]">ویپ حرفه‌ای</p>
                  <p className="text-xs text-[#8B5CF6] font-bold">۲۵٪ تخفیف</p>
                </div>
                <div className="glass rounded-3xl p-6 shadow-soft hover:scale-105 transition-transform duration-300 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                  <img src="https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=300&h=300&fit=crop" alt="Salt" className="w-full h-32 object-cover rounded-2xl mb-3" />
                  <p className="text-sm font-bold text-[#1a1a2e]">سالت نیکوتین</p>
                  <p className="text-xs text-[#F59E0B] font-bold">۴۰٪ تخفیف</p>
                </div>
                <div className="glass rounded-3xl p-6 shadow-soft hover:scale-105 transition-transform duration-300 animate-fade-in-up mt-8" style={{ animationDelay: '0.8s' }}>
                  <img src="https://images.unsplash.com/photo-1555255707-c07966088b7b?w=300&h=300&fit=crop" alt="Juice" className="w-full h-32 object-cover rounded-2xl mb-3" />
                  <p className="text-sm font-bold text-[#1a1a2e]">جویس اورجینال</p>
                  <p className="text-xs text-[#EC4899] font-bold">۳۵٪ تخفیف</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Flash Sale
function FlashSale() {
  const { addToCart } = useApp();
  const { products } = useProducts();
  const [timeLeft, setTimeLeft] = useState({ hours: 12, minutes: 45, seconds: 30 });

  const flashProducts = products.slice(0, 4).map((p: any) => ({
    ...p,
    flashPrice: Math.round(p.price * 0.6),
    discount: 40
  }));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { hours, minutes, seconds } = prev;
        seconds--;
        if (seconds < 0) { seconds = 59; minutes--; }
        if (minutes < 0) { minutes = 59; hours--; }
        if (hours < 0) { hours = 23; }
        return { hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const pad = (n: number) => n.toString().padStart(2, '0');

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold mb-4 animate-pulse-soft">
            <i className="fas fa-bolt"></i>
            <span>قیمت شگفت‌انگیز</span>
            <i className="fas fa-bolt"></i>
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-[#1a1a2e] mb-4">
            <span className="text-red-500">فروش</span> ویژه امروز
          </h2>
          
          <div className="flex items-center justify-center gap-3 mb-6" dir="ltr">
            <div className="text-center">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-red-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-2xl md:text-3xl font-black text-white">{pad(timeLeft.hours)}</span>
              </div>
              <span className="text-xs text-[#6b7280] mt-1 block">ساعت</span>
            </div>
            <span className="text-3xl font-black text-red-500">:</span>
            <div className="text-center">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-2xl md:text-3xl font-black text-white">{pad(timeLeft.minutes)}</span>
              </div>
              <span className="text-xs text-[#6b7280] mt-1 block">دقیقه</span>
            </div>
            <span className="text-3xl font-black text-orange-500">:</span>
            <div className="text-center">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-amber-500 to-yellow-500 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-2xl md:text-3xl font-black text-white">{pad(timeLeft.seconds)}</span>
              </div>
              <span className="text-xs text-[#6b7280] mt-1 block">ثانیه</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {flashProducts.map((product, index) => (
            <div
              key={product.id}
              className="glass rounded-2xl overflow-hidden shadow-soft hover:shadow-hover transition-all duration-300 hover:scale-105 group relative"
              style={{ animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both` }}
            >
              <div className="absolute top-3 right-3 z-10">
                <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg animate-bounce-badge">
                  <span className="text-white font-black text-sm">{product.discount}%</span>
                </div>
              </div>

              <div className="relative overflow-hidden aspect-square bg-gradient-to-br from-[#f8fafc] to-[#f1f5f9]">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover product-img-zoom" />
              </div>

              <div className="p-4">
                <p className="text-xs text-[#9CA3AF] mb-1">{product.brand}</p>
                <h3 className="text-sm font-bold text-[#1a1a2e] mb-2 line-clamp-2">{product.name}</h3>
                
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-lg font-black text-red-500">{(product.flashPrice / 10000).toFixed(0)}</span>
                  <span className="text-xs text-[#9CA3AF]">هزار</span>
                  <span className="text-xs text-[#9CA3AF] line-through">{(product.price / 10000).toFixed(0)}</span>
                </div>

                <div className="mb-3">
                  <div className="flex justify-between text-xs text-[#6b7280] mb-1">
                    <span>فروش رفته</span>
                    <span>{70 + index * 5}%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-red-500 to-orange-500 rounded-full transition-all duration-1000" style={{ width: `${70 + index * 5}%` }}></div>
                  </div>
                </div>

                <button
                  onClick={() => addToCart(product)}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold text-sm hover:shadow-lg hover:scale-105 transition-all duration-300"
                >
                  <i className="fas fa-shopping-bag ml-2"></i>
                  افزودن به سبد
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Category Section
function CategorySection() {
  const { setSelectedCategory } = useApp();
  const navigate = useNavigate();

  const handleCategoryClick = (catId: string) => {
    setSelectedCategory(catId);
    navigate('/shop');
  };

  const categoryColors = [
    'from-emerald-500 to-teal-600',
    'from-blue-500 to-cyan-600',
    'from-purple-500 to-violet-600',
    'from-orange-500 to-amber-600',
    'from-pink-500 to-rose-600',
    'from-indigo-500 to-blue-600',
  ];

  return (
    <section className="py-12 px-4 bg-gradient-to-b from-white to-purple-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-[#1a1a2e]">
          دسته‌بندی <span className="gradient-text">محصولات</span>
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat, i) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryClick(cat.id)}
              className="group relative overflow-hidden rounded-2xl aspect-square shadow-soft hover:shadow-hover transition-all duration-300 hover:scale-105"
              style={{ animation: `fadeInUp 0.6s ease-out ${i * 0.1}s both` }}
            >
              <img src={cat.image} alt={cat.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className={`absolute inset-0 bg-gradient-to-t ${categoryColors[i]} opacity-60 group-hover:opacity-70 transition-opacity`}></div>
              <div className="absolute inset-0 flex flex-col items-center justify-end p-4">
                <h3 className="text-white font-bold text-sm md:text-base text-center drop-shadow-lg">{cat.name}</h3>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

// ProductCard imported from components

// Featured Products
function FeaturedProducts() {
  const navigate = useNavigate();
  const { products } = useProducts();
  const featured = products.filter((p: any) => p.isBestseller || p.isNew).slice(0, 4);

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-white to-purple-50">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-black text-[#1a1a2e] mb-2">
              محصولات <span className="gradient-text">ویژه</span> ✨
            </h2>
            <p className="text-[#6b7280]">پرفروش‌ترین محصولات ما</p>
          </div>
          <button onClick={() => navigate('/shop')} className="px-6 py-3 rounded-xl glass text-[#8B5CF6] hover:text-[#6d28d9] font-medium transition-colors shadow-soft">
            مشاهده همه
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {featured.map((product: any, index: number) => (
            <div key={product.id} style={{ animation: `fadeInUp 0.6s ease-out ${index * 0.15}s both` }}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// FAQ Section
function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    { 
      question: 'تفاوت جویس و سالت نیکوتین چیست؟', 
      answer: 'جویس معمولی (Freebase) نیکوتین پایین‌تری دارد (۳-۱۲mg) و برای دستگاه‌های ساب‌اهم مناسب است. سالت نیکوتین غلظت بالاتری دارد (۲۵-۵۰mg)، جذب سریع‌تری دارد و برای پاد سیستم‌ها طراحی شده. سالت طعم ملایم‌تری دارد حتی در غلظت‌های بالا.'
    },
    { 
      question: 'پاد سیستم با ویپ چه فرقی دارد؟', 
      answer: 'پاد سیستم کوچک‌تر، ساده‌تر و کم‌توان‌تر است (۱۰-۲۵ وات) و برای مبتدیان مناسب است. ویپ بزرگ‌تر، قدرتمندتر (۵۰-۱۰۰ وات) و با قابلیت تنظیمات بیشتر است. پاد بخار کمتری تولید می‌کند اما استفاده آسان‌تری دارد.'
    },
    { 
      question: 'کدام دستگاه برای مبتدیان مناسب‌تر است؟', 
      answer: 'پاد سیستم برای مبتدیان مناسب‌تر است. استفاده آسان، نگهداری ساده، قیمت مناسب‌تر و نیاز کمتر به تنظیمات از مزایای آن است. اگر تازه می‌خواهید شروع کنید، پاد سیستم انتخاب بهتری است.'
    },
    { 
      question: 'عمر کویل چقدر است و کی باید تعویض شود؟', 
      answer: 'عمر کویل معمولاً ۱ تا ۲ هفته است. نشانه‌های تعویض: کاهش طعم، طعم سوختگی، کاهش تولید بخار. اگر از سالت نیکوتین استفاده می‌کنید، کویل زودتر نیاز به تعویض دارد. همیشه کویل نو را ۵ دقیقه قبل از استفاده صبر کنید.'
    },
    { 
      question: 'چطور از دستگاه ویپ نگهداری کنم؟', 
      answer: '۱) باتری را کامل خالی نکنید (۲۰-۸۰٪ نگه دارید) ۲) کارتریج را هر ۳-۵ روز بشویید ۳) دستگاه را در دمای مناسب نگه دارید ۴) از شارژر اصلی استفاده کنید ۵) پورت شارژ را تمیز نگه دارید ۶) مایع را در جای خنک و تاریک نگهداری کنید.'
    },
    { 
      question: 'یکبار مصرف بهتر است یا شارژی؟', 
      answer: 'یکبار مصرف برای استفاده موقت، مسافرت یا تست طعم مناسب است. شارژی برای استفاده روزانه بهتر است چون اقتصادی‌تر، سازگارتر با محیط زیست و با کیفیت بالاتر است. اگر ویپر منظم هستید، شارژی انتخاب بهتری است.'
    }
  ];

  const faqColors = ['#00C07F', '#8B5CF6', '#F59E0B', '#EC4899', '#0891B2', '#F97316'];

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-violet-50 via-white to-amber-50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-[#1a1a2e] mb-4">
            سوالات <span className="gradient-text">متداول</span>
          </h2>
          <p className="text-[#6b7280] text-lg">پاسخ سوالات رایج مشتریان</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="glass rounded-2xl shadow-soft overflow-hidden transition-all duration-300 border-r-4"
              style={{ animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`, borderRightColor: faqColors[index] }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full p-6 flex items-center justify-between text-right hover:bg-[#F5F5F7]/50 transition-colors"
              >
                <span className="font-bold text-[#1a1a2e] text-lg">{faq.question}</span>
                <i className={`fas fa-chevron-down transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`} style={{ color: faqColors[index] }}></i>
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${openIndex === index ? 'max-h-96' : 'max-h-0'}`}>
                <div className="p-6 pt-0 text-[#6b7280] leading-8">{faq.answer}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Why Smoke City Section
function WhySmokeCity() {
  const features = [
    { icon: 'fas fa-headset', title: 'پشتیبانی ۲۴ ساعته', description: 'تیم پشتیبانی ما در تمام ساعات شبانه‌روز آماده پاسخگویی و راهنمایی شماست', color: '#00C07F', bgGradient: 'from-emerald-100 to-teal-100' },
    { icon: 'fas fa-shield-alt', title: 'گارانتی اصالت کالا', description: 'تمامی محصولات ۱۰۰٪ اصل و اورجینال با گارانتی معتبر', color: '#8B5CF6', bgGradient: 'from-violet-100 to-purple-100' },
    { icon: 'fas fa-truck', title: 'ارسال سریع', description: 'ارسال ۲۴ ساعته به تهران و ۲ تا ۳ روز به شهرستان‌ها', color: '#F59E0B', bgGradient: 'from-amber-100 to-orange-100' },
    { icon: 'fas fa-undo', title: 'ضمانت بازگشت', description: 'امکان بازگشت کالا تا ۷ روز در صورت عدم رضایت', color: '#EC4899', bgGradient: 'from-pink-100 to-rose-100' },
    { icon: 'fas fa-tags', title: 'بهترین قیمت', description: 'تضمین بهترین قیمت بازار با تخفیف‌های ویژه', color: '#0891B2', bgGradient: 'from-cyan-100 to-blue-100' },
    { icon: 'fas fa-gift', title: 'هدایای ویژه', description: 'هدایای ویژه برای مشتریان دائمی و خریدهای بالا', color: '#F97316', bgGradient: 'from-orange-100 to-red-100' }
  ];

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-block mb-4 animate-float">
            <LogoLarge className="w-28 h-28 md:w-36 md:h-36" />
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-[#1a1a2e] mb-4">
            چرا <span className="gradient-text">اسموک سیتی</span>؟
          </h2>
          <p className="text-[#6b7280] text-lg">دلایلی که ما را متمایز می‌کند</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="glass rounded-2xl p-6 shadow-soft hover:shadow-hover transition-all duration-300 hover:scale-105 group"
              style={{ animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both` }}
            >
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.bgGradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <i className={`${feature.icon} text-2xl`} style={{ color: feature.color }}></i>
              </div>
              <h3 className="font-bold text-[#1a1a2e] text-xl mb-2">{feature.title}</h3>
              <p className="text-[#6b7280] leading-7">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <main>
      <HeroBanner />
      <CategorySection />
      <FeaturedProducts />
      <FlashSale />
      <FAQSection />
      <WhySmokeCity />
    </main>
  );
}
