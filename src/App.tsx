import { useState, useEffect, useRef } from 'react';
import { products, categories, brands, flavorProfiles, nicotineLevels, reviews, Product, CartItem } from './data/products';
import { LogoMain, LogoSmall } from './components/Logo';
import { getCategoryIcon } from './components/CategoryIcons';

// Age Verification Gate
function AgeGate({ onVerify }: { onVerify: () => void }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#1a1a2e]/80 backdrop-blur-xl">
      <div className="glass-strong rounded-3xl p-8 md:p-12 max-w-md mx-4 text-center animate-fade-in shadow-soft">
        <div className="mb-6 animate-float">
          <LogoMain className="w-24 h-24 mx-auto" />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold mb-4 gradient-text">اسموک سیتی</h2>
        <p className="text-[#4b5563] mb-2 text-lg">آیا شما بالای ۱۸ سال سن دارید؟</p>
        <p className="text-[#9CA3AF] text-sm mb-8">ورود شما به معنای تأیید سن قانونی شما است</p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={onVerify}
            className="btn-accent px-8 py-3 rounded-xl text-lg"
          >
            بله، بالای ۱۸ سال هستم
          </button>
        </div>
        <button className="mt-4 text-[#9CA3AF] hover:text-[#4b5563] transition-colors text-sm">
          خیر، خارج شوید
        </button>
      </div>
    </div>
  );
}

// Header Component
function Header({ 
  cartCount, 
  onCartOpen, 
  onSearchOpen,
  currentPage,
  onNavigate
}: { 
  cartCount: number; 
  onCartOpen: () => void;
  onSearchOpen: () => void;
  currentPage: string;
  onNavigate: (page: string) => void;
}) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'glass-strong shadow-soft' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <button onClick={() => onNavigate('home')} className="flex items-center gap-3 group">
          <div className="group-hover:scale-110 transition-transform">
            <LogoMain />
          </div>
          <span className="text-xl md:text-2xl font-black gradient-text">
            اسموک سیتی
          </span>
        </button>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          <button 
            onClick={() => onNavigate('home')}
            className={`text-sm font-medium transition-colors hover:text-[#00C07F] ${currentPage === 'home' ? 'text-[#00C07F]' : 'text-[#4b5563]'}`}
          >
            خانه
          </button>
          <button 
            onClick={() => onNavigate('shop')}
            className={`text-sm font-medium transition-colors hover:text-[#00C07F] ${currentPage === 'shop' ? 'text-[#00C07F]' : 'text-[#4b5563]'}`}
          >
            فروشگاه
          </button>
          <button className="text-sm font-medium text-[#4b5563] transition-colors hover:text-[#00C07F]">
            بلاگ
          </button>
          <button 
            onClick={() => {
              const contactSection = document.getElementById('contact');
              if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="text-sm font-medium text-[#4b5563] transition-colors hover:text-[#00C07F]"
          >
            تماس با ما
          </button>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button 
            onClick={onSearchOpen}
            className="w-10 h-10 rounded-xl glass flex items-center justify-center hover:border-[#00C07F]/30 transition-all shadow-soft"
          >
            <i className="fas fa-search text-[#4b5563]"></i>
          </button>
          <button 
            onClick={onCartOpen}
            className="relative w-10 h-10 rounded-xl glass flex items-center justify-center hover:border-[#00C07F]/30 transition-all shadow-soft"
          >
            <i className="fas fa-shopping-bag text-[#4b5563]"></i>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#00C07F] text-white text-xs font-bold rounded-full flex items-center justify-center animate-bounce-badge">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}

// Search Modal
function SearchModal({ isOpen, onClose, onSelectProduct }: { 
  isOpen: boolean; 
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
}) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const filteredProducts = query.length > 0 
    ? products.filter(p => 
        p.name.includes(query) || 
        p.nameEn.toLowerCase().includes(query.toLowerCase()) ||
        p.brand.toLowerCase().includes(query.toLowerCase()) ||
        p.category.includes(query)
      )
    : [];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] bg-[#1a1a2e]/50 backdrop-blur-sm" onClick={onClose}>
      <div className="max-w-2xl mx-auto mt-20 px-4" onClick={e => e.stopPropagation()}>
        <div className="glass-strong rounded-2xl p-4 animate-fade-in shadow-soft">
          <div className="flex items-center gap-3 mb-4">
            <i className="fas fa-search text-[#00C07F] text-lg"></i>
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="جستجوی محصول، برند، دسته‌بندی..."
              className="flex-1 bg-transparent text-[#1a1a2e] placeholder-[#9CA3AF] outline-none text-lg"
            />
            <button onClick={onClose} className="text-[#9CA3AF] hover:text-[#1a1a2e] transition-colors">
              <i className="fas fa-times text-xl"></i>
            </button>
          </div>
          
          {query.length > 0 && (
            <div className="max-h-80 overflow-y-auto no-scrollbar">
              {filteredProducts.length > 0 ? (
                <div className="space-y-2">
                  {filteredProducts.map(product => (
                    <button
                      key={product.id}
                      onClick={() => { onSelectProduct(product); onClose(); }}
                      className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-[#F5F5F7] transition-colors text-right"
                    >
                      <img src={product.image} alt={product.name} className="w-12 h-12 rounded-lg object-cover" />
                      <div className="flex-1">
                        <p className="text-[#1a1a2e] text-sm font-medium">{product.name}</p>
                        <p className="text-[#9CA3AF] text-xs">{product.brand} • {categories.find(c => c.id === product.category)?.name}</p>
                      </div>
                      <span className="text-[#00C07F] text-sm font-bold">
                        {(product.price / 10000).toFixed(0)} هزار
                      </span>
                    </button>
                  ))}
                </div>
              ) : (
                <p className="text-center text-[#9CA3AF] py-8">محصولی یافت نشد</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Hero Section
function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    { title: 'تجربه‌ای متفاوت از ویپینگ', subtitle: 'بهترین برندهای جهانی با گارانتی اصالت', cta: 'مشاهده محصولات' },
    { title: 'پاد سیستم‌های نسل جدید', subtitle: 'فناوری پیشرفته، طراحی بی‌نظیر', cta: 'خرید پاد' },
    { title: 'سالت نیکوتین اورجینال', subtitle: 'طعم‌های متنوع با ارسال فوری', cta: 'سفارش دهید' },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-[80vh] md:h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#F5F5F7] via-[#ecfdf5] to-[#F5F5F7]"></div>
        <div className="absolute inset-0">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#00C07F]/15 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-[#0891B2]/15 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#00C07F]/5 rounded-full blur-3xl"></div>
        </div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div key={currentSlide} className="animate-fade-in">
          <span className="inline-block px-4 py-1.5 rounded-full glass text-[#00C07F] text-sm font-medium mb-6 shadow-soft">
            ✨ فروشگاه معتبر ویپ و پاد
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight text-[#1a1a2e]">
            {slides[currentSlide].title}
          </h1>
          <p className="text-lg md:text-xl text-[#4b5563] mb-8">
            {slides[currentSlide].subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-accent px-8 py-4 rounded-2xl text-lg">
              {slides[currentSlide].cta}
            </button>
            <button className="px-8 py-4 rounded-2xl glass text-[#1a1a2e] font-medium hover:shadow-soft transition-all">
              مشاوره رایگان
            </button>
          </div>
        </div>

        {/* Slide indicators */}
        <div className="flex gap-2 justify-center mt-12">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === currentSlide ? 'w-8 bg-[#00C07F]' : 'w-2 bg-[#d1d5db]'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// Category Bubbles
function CategoryBubbles({ onCategoryClick }: { onCategoryClick: (cat: string) => void }) {
  return (
    <section className="py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-[#1a1a2e]">
          دسته‌بندی <span className="gradient-text">محصولات</span>
        </h2>
        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
          {categories.map((cat, i) => (
            <button
              key={cat.id}
              onClick={() => onCategoryClick(cat.id)}
              className={`category-bubble glass rounded-2xl p-4 md:p-6 flex flex-col items-center gap-3 min-w-[120px] shadow-soft opacity-0 animate-slide-up stagger-${i + 1} hover:border-[#00C07F]/30`}
              style={{ animationFillMode: 'forwards' }}
            >
              <div className="text-[#00C07F]">
                {getCategoryIcon(cat.id, "w-10 h-10 md:w-12 md:h-12")}
              </div>
              <span className="text-xs md:text-sm font-medium text-[#4b5563]">{cat.name}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

// Product Card
function ProductCard({ product, onAddToCart, onViewProduct }: { 
  product: Product; 
  onAddToCart: (product: Product) => void;
  onViewProduct: (product: Product) => void;
}) {
  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
    : 0;

  return (
    <div className="card-3d glass rounded-2xl overflow-hidden group">
      {/* Image */}
      <div className="relative overflow-hidden aspect-square bg-gradient-to-br from-[#f8fafc] to-[#f1f5f9]">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover product-img-zoom"
        />
        
        {/* Badges */}
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          {product.isNew && (
            <span className="px-2 py-1 bg-[#00C07F] text-white text-xs font-bold rounded-lg">جدید</span>
          )}
          {product.isBestseller && (
            <span className="px-2 py-1 bg-[#F59E0B] text-white text-xs font-bold rounded-lg">پرفروش</span>
          )}
          {discount > 0 && (
            <span className="px-2 py-1 bg-[#EC4899] text-white text-xs font-bold rounded-lg">{discount}% تخفیف</span>
          )}
        </div>

        {product.stock <= 5 && product.stock > 0 && (
          <div className="absolute bottom-3 left-3 right-3">
            <span className="px-2 py-1 bg-red-500/90 text-white text-xs rounded-lg backdrop-blur-sm">
              🔥 فقط {product.stock} عدد باقی‌مانده!
            </span>
          </div>
        )}

        {/* Quick add button */}
        <button
          onClick={(e) => { e.stopPropagation(); onAddToCart(product); }}
          className="absolute bottom-3 right-3 w-10 h-10 bg-[#00C07F] text-white rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 shadow-lg shadow-[#00C07F]/20"
        >
          <i className="fas fa-plus"></i>
        </button>
      </div>

      {/* Info */}
      <div className="p-4 cursor-pointer" onClick={() => onViewProduct(product)}>
        <p className="text-xs text-[#9CA3AF] mb-1">{product.brand}</p>
        <h3 className="text-sm font-bold text-[#1a1a2e] mb-2 line-clamp-2">{product.name}</h3>
        
        <div className="flex items-center gap-1 mb-3">
          <i className="fas fa-star text-[#F59E0B] text-xs"></i>
          <span className="text-xs text-[#9CA3AF]">{product.rating} ({product.reviews})</span>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-lg font-black gradient-text">
              {(product.price / 10000).toFixed(0)}
            </span>
            <span className="text-xs text-[#9CA3AF] mr-1">هزار تومان</span>
          </div>
          {product.originalPrice && (
            <span className="text-xs text-[#9CA3AF] line-through">
              {(product.originalPrice / 10000).toFixed(0)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

// Featured Products
function FeaturedProducts({ onAddToCart, onViewProduct }: { 
  onAddToCart: (product: Product) => void;
  onViewProduct: (product: Product) => void;
}) {
  const featured = products.filter(p => p.isBestseller || p.isNew).slice(0, 8);

  return (
    <section className="py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-[#1a1a2e]">
            محصولات <span className="gradient-text">ویژه</span> ✨
          </h2>
          <button className="text-sm text-[#00C07F] hover:underline font-medium">مشاهده همه</button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {featured.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onAddToCart={onAddToCart}
              onViewProduct={onViewProduct}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// Blog Section
function BlogSection() {
  const blogPosts = [
    {
      id: 1,
      title: 'راهنمای انتخاب اولین پاد سیستم',
      excerpt: 'اگر تازه می‌خواهید ویپینگ را شروع کنید، این راهنما به شما کمک می‌کند بهترین انتخاب را داشته باشید...',
      date: '۱۴۰۳/۰۹/۲۰',
      category: 'راهنمای خرید',
      readTime: '۵ دقیقه',
    },
    {
      id: 2,
      title: 'مقایسه سالت نیکوتین و جویس معمولی',
      excerpt: 'تفاوت‌های کلیدی بین سالت نیکوتین و جویس معمولی چیست؟ کدام یک برای شما مناسب‌تر است؟',
      date: '۱۴۰۳/۰۹/۱۵',
      category: 'آموزشی',
      readTime: '۷ دقیقه',
    },
    {
      id: 3,
      title: 'معرفی بهترین برندهای ویپ ۲۰۲۴',
      excerpt: 'بررسی کامل برندهای معتبر جهانی ویپ و پاد سیستم که در سال ۲۰۲۴ عملکرد درخشانی داشتند...',
      date: '۱۴۰۳/۰۹/۱۰',
      category: 'معرفی محصول',
      readTime: '۱۰ دقیقه',
    },
  ];

  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-[#1a1a2e]">
            <span className="gradient-text">بلاگ</span> اسموک سیتی
          </h2>
          <button className="text-sm text-[#00C07F] hover:underline font-medium">مشاهده همه</button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
            <article key={post.id} className="glass rounded-2xl overflow-hidden shadow-soft hover:shadow-hover transition-all cursor-pointer group">
              <div className="h-48 bg-gradient-to-br from-[#00C07F]/10 to-[#0891B2]/10 flex items-center justify-center">
                <span className="text-6xl opacity-50 group-hover:opacity-70 transition-opacity">📖</span>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-medium text-[#00C07F] bg-[#00C07F]/10 px-2 py-1 rounded-full">
                    {post.category}
                  </span>
                  <span className="text-xs text-[#9CA3AF]">{post.readTime}</span>
                </div>
                <h3 className="font-bold text-[#1a1a2e] mb-2 group-hover:text-[#00C07F] transition-colors">
                  {post.title}
                </h3>
                <p className="text-sm text-[#6b7280] mb-3 line-clamp-2">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#9CA3AF]">{post.date}</span>
                  <span className="text-[#00C07F] text-sm font-medium group-hover:translate-x-[-4px] transition-transform">
                    ادامه مطلب ←
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// Contact Section
function ContactSection() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="glass rounded-3xl p-8 md:p-12 shadow-soft">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-3 text-[#1a1a2e]">
            <span className="gradient-text">تماس</span> با ما
          </h2>
          <p className="text-[#6b7280] text-center mb-10">ما اینجاییم تا به شما کمک کنیم</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Contact Info */}
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#00C07F]/10 flex items-center justify-center flex-shrink-0">
                  <i className="fas fa-phone text-[#00C07F]"></i>
                </div>
                <div>
                  <h3 className="font-bold text-[#1a1a2e] mb-1">تلفن تماس</h3>
                  <p className="text-[#6b7280] text-sm">۰۲۱-۱۲۳۴۵۶۷۸</p>
                  <p className="text-[#6b7280] text-sm">۰۹۱۲-۱۲۳۴۵۶۷</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#00C07F]/10 flex items-center justify-center flex-shrink-0">
                  <i className="fas fa-envelope text-[#00C07F]"></i>
                </div>
                <div>
                  <h3 className="font-bold text-[#1a1a2e] mb-1">ایمیل</h3>
                  <p className="text-[#6b7280] text-sm">info@smokecity.ir</p>
                  <p className="text-[#6b7280] text-sm">support@smokecity.ir</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#00C07F]/10 flex items-center justify-center flex-shrink-0">
                  <i className="fas fa-map-marker-alt text-[#00C07F]"></i>
                </div>
                <div>
                  <h3 className="font-bold text-[#1a1a2e] mb-1">آدرس</h3>
                  <p className="text-[#6b7280] text-sm">تهران، خیابان ولیعصر، پلاک ۱۲۳</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#00C07F]/10 flex items-center justify-center flex-shrink-0">
                  <i className="fas fa-clock text-[#00C07F]"></i>
                </div>
                <div>
                  <h3 className="font-bold text-[#1a1a2e] mb-1">ساعات کاری</h3>
                  <p className="text-[#6b7280] text-sm">شنبه تا پنجشنبه: ۹ صبح تا ۹ شب</p>
                  <p className="text-[#6b7280] text-sm">جمعه: ۱۰ صبح تا ۶ عصر</p>
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="space-y-4">
              <input 
                type="text" 
                placeholder="نام و نام خانوادگی" 
                className="w-full bg-white text-[#1a1a2e] rounded-xl p-3 border border-[#E5E7EB] outline-none focus:border-[#00C07F] transition-colors text-sm placeholder-[#9CA3AF]"
              />
              <input 
                type="tel" 
                placeholder="شماره تماس" 
                className="w-full bg-white text-[#1a1a2e] rounded-xl p-3 border border-[#E5E7EB] outline-none focus:border-[#00C07F] transition-colors text-sm placeholder-[#9CA3AF]"
              />
              <input 
                type="email" 
                placeholder="ایمیل" 
                className="w-full bg-white text-[#1a1a2e] rounded-xl p-3 border border-[#E5E7EB] outline-none focus:border-[#00C07F] transition-colors text-sm placeholder-[#9CA3AF]"
              />
              <textarea 
                placeholder="پیام شما..." 
                rows={4}
                className="w-full bg-white text-[#1a1a2e] rounded-xl p-3 border border-[#E5E7EB] outline-none focus:border-[#00C07F] transition-colors text-sm placeholder-[#9CA3AF] resize-none"
              />
              <button className="w-full btn-accent py-3 rounded-xl">
                ارسال پیام
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Shop Page with Filters & Tabs
function ShopPage({ 
  initialCategory,
  onAddToCart, 
  onViewProduct 
}: { 
  initialCategory?: string;
  onAddToCart: (product: Product) => void;
  onViewProduct: (product: Product) => void;
}) {
  const [selectedCategory, setSelectedCategory] = useState(initialCategory || 'all');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedFlavor, setSelectedFlavor] = useState('');
  const [selectedNicotine, setSelectedNicotine] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000000]);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('popular');
  const [activeTab, setActiveTab] = useState('all');

  // Sync initial category with tab
  useEffect(() => {
    if (initialCategory) {
      setActiveTab(initialCategory);
      setSelectedCategory(initialCategory);
    }
  }, [initialCategory]);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    setSelectedCategory(tabId === 'all' ? '' : tabId);
  };

  const filteredProducts = products.filter(p => {
    if (selectedCategory && p.category !== selectedCategory) return false;
    if (selectedBrand && p.brand !== selectedBrand) return false;
    if (selectedFlavor && !p.flavorProfile?.includes(selectedFlavor)) return false;
    if (selectedNicotine && p.nicotine !== selectedNicotine) return false;
    if (p.price < priceRange[0] || p.price > priceRange[1]) return false;
    return true;
  }).sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return b.reviews - a.reviews;
  });

  // Count products per category
  const getCategoryCount = (catId: string) => {
    if (catId === 'all') return products.length;
    return products.filter(p => p.category === catId).length;
  };

  return (
    <section className="pt-24 pb-24 md:pb-12 px-4 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-3xl md:text-4xl font-black mb-2 text-[#1a1a2e]">
            <span className="gradient-text">فروشگاه</span> اسموک سیتی
          </h1>
          <p className="text-[#6b7280]">{filteredProducts.length} محصول</p>
        </div>

        {/* Category Tabs */}
        <div className="mb-6 overflow-x-auto no-scrollbar">
          <div className="flex gap-2 min-w-max pb-2">
            <button
              onClick={() => handleTabChange('all')}
              className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                activeTab === 'all' 
                  ? 'bg-gradient-to-r from-[#00C07F] to-[#0891B2] text-white shadow-lg shadow-[#00C07F]/20' 
                  : 'glass text-[#4b5563] hover:text-[#1a1a2e] shadow-soft'
              }`}
            >
              همه ({getCategoryCount('all')})
            </button>
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => handleTabChange(cat.id)}
                className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all whitespace-nowrap flex items-center gap-2 ${
                  activeTab === cat.id 
                    ? 'bg-gradient-to-r from-[#00C07F] to-[#0891B2] text-white shadow-lg shadow-[#00C07F]/20' 
                    : 'glass text-[#4b5563] hover:text-[#1a1a2e] shadow-soft'
                }`}
              >
                <span className={activeTab === cat.id ? 'text-white' : 'text-[#00C07F]'}>
                  {getCategoryIcon(cat.id, "w-5 h-5")}
                </span>
                {cat.name} ({getCategoryCount(cat.id)})
              </button>
            ))}
          </div>
        </div>

        {/* Filter Toggle (Mobile) */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="md:hidden w-full glass rounded-xl p-3 mb-4 flex items-center justify-center gap-2 text-sm text-[#4b5563] shadow-soft"
        >
          <i className="fas fa-sliders-h"></i>
          فیلترها و مرتب‌سازی
        </button>

        <div className="flex gap-6">
          {/* Sidebar Filters */}
          <aside className={`${showFilters ? 'fixed inset-0 z-50 bg-[#F5F5F7] p-4 overflow-y-auto' : 'hidden'} md:block md:relative md:w-64 flex-shrink-0`}>
            {showFilters && (
              <button onClick={() => setShowFilters(false)} className="md:hidden mb-4 text-[#4b5563] flex items-center gap-2">
                <i className="fas fa-times text-xl"></i> بستن فیلترها
              </button>
            )}
            
            <div className="space-y-4">
              {/* Sort */}
              <div className="glass rounded-2xl p-4 shadow-soft">
                <h3 className="font-bold text-sm mb-3 text-[#4b5563]">مرتب‌سازی</h3>
                <select 
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value)}
                  className="w-full bg-white text-[#1a1a2e] text-sm rounded-lg p-2.5 border border-[#E5E7EB] outline-none focus:border-[#00C07F] transition-colors"
                >
                  <option value="popular">محبوب‌ترین</option>
                  <option value="price-low">ارزان‌ترین</option>
                  <option value="price-high">گران‌ترین</option>
                  <option value="rating">بالاترین امتیاز</option>
                </select>
              </div>

              {/* Brand Filter */}
              <div className="glass rounded-2xl p-4 shadow-soft">
                <h3 className="font-bold text-sm mb-3 text-[#4b5563]">برند</h3>
                <div className="space-y-1 max-h-48 overflow-y-auto no-scrollbar">
                  <button
                    onClick={() => setSelectedBrand('')}
                    className={`w-full text-right text-sm p-2 rounded-lg transition-colors ${!selectedBrand ? 'bg-[#00C07F]/10 text-[#00C07F] font-medium' : 'text-[#6b7280] hover:text-[#1a1a2e] hover:bg-[#F5F5F7]'}`}
                  >
                    همه برندها
                  </button>
                  {brands.map(brand => (
                    <button
                      key={brand}
                      onClick={() => setSelectedBrand(brand === selectedBrand ? '' : brand)}
                      className={`w-full text-right text-sm p-2 rounded-lg transition-colors ${selectedBrand === brand ? 'bg-[#00C07F]/10 text-[#00C07F] font-medium' : 'text-[#6b7280] hover:text-[#1a1a2e] hover:bg-[#F5F5F7]'}`}
                    >
                      {brand}
                    </button>
                  ))}
                </div>
              </div>

              {/* Flavor Profile */}
              <div className="glass rounded-2xl p-4 shadow-soft">
                <h3 className="font-bold text-sm mb-3 text-[#4b5563]">طعم‌سنج</h3>
                <div className="flex flex-wrap gap-2">
                  {flavorProfiles.map(fp => (
                    <button
                      key={fp.id}
                      onClick={() => setSelectedFlavor(fp.id === selectedFlavor ? '' : fp.id)}
                      className={`px-3 py-1.5 rounded-full text-xs transition-all ${selectedFlavor === fp.id ? 'bg-[#00C07F] text-white font-bold shadow-md' : 'bg-white border border-[#E5E7EB] text-[#6b7280] hover:border-[#00C07F] hover:text-[#00C07F]'}`}
                    >
                      {fp.icon} {fp.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Nicotine Level */}
              <div className="glass rounded-2xl p-4 shadow-soft">
                <h3 className="font-bold text-sm mb-3 text-[#4b5563]">سطح نیکوتین (mg)</h3>
                <div className="flex flex-wrap gap-2">
                  {nicotineLevels.map(n => (
                    <button
                      key={n}
                      onClick={() => setSelectedNicotine(n === selectedNicotine ? '' : n)}
                      className={`w-10 h-10 rounded-xl text-xs font-bold transition-all ${selectedNicotine === n ? 'bg-[#00C07F] text-white shadow-md' : 'bg-white border border-[#E5E7EB] text-[#6b7280] hover:border-[#00C07F] hover:text-[#00C07F]'}`}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="glass rounded-2xl p-4 shadow-soft">
                <h3 className="font-bold text-sm mb-3 text-[#4b5563]">محدوده قیمت</h3>
                <input
                  type="range"
                  min="0"
                  max="5000000"
                  step="100000"
                  value={priceRange[1]}
                  onChange={e => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full accent-[#00C07F]"
                />
                <div className="flex justify-between text-xs text-[#9CA3AF] mt-1">
                  <span>رایگان</span>
                  <span>{(priceRange[1] / 10000).toFixed(0)} هزار تومان</span>
                </div>
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {filteredProducts.map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={onAddToCart}
                    onViewProduct={onViewProduct}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <span className="text-6xl mb-4 block">🔍</span>
                <p className="text-[#6b7280] text-lg">محصولی با این فیلترها یافت نشد</p>
                <button 
                  onClick={() => { setSelectedCategory(''); setSelectedBrand(''); setSelectedFlavor(''); setSelectedNicotine(''); setActiveTab('all'); }}
                  className="mt-4 text-[#00C07F] hover:underline text-sm font-medium"
                >
                  حذف فیلترها
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// Product Detail Page
function ProductDetail({ product, onAddToCart, onBack }: { 
  product: Product; 
  onAddToCart: (product: Product, qty: number, flavor?: string, color?: string) => void;
  onBack: () => void;
}) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedFlavor, setSelectedFlavor] = useState(product.flavors?.[0] || '');
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || '');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('specs');

  const productReviews = reviews.filter(r => r.productId === product.id);

  return (
    <section className="pt-24 pb-24 md:pb-12 px-4 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Back button */}
        <button onClick={onBack} className="flex items-center gap-2 text-[#6b7280] hover:text-[#00C07F] transition-colors mb-6">
          <i className="fas fa-arrow-right"></i>
          <span className="text-sm">بازگشت به فروشگاه</span>
        </button>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="glass rounded-2xl overflow-hidden aspect-square relative shadow-soft">
              <img 
                src={product.images[selectedImage]} 
                alt={product.name}
                className="w-full h-full object-cover product-img-zoom"
              />
              {product.originalPrice && (
                <span className="absolute top-4 right-4 px-3 py-1 bg-[#EC4899] text-white text-sm font-bold rounded-lg">
                  {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% تخفیف
                </span>
              )}
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all shadow-soft ${
                      i === selectedImage ? 'border-[#00C07F]' : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <p className="text-sm text-[#00C07F] mb-1 font-medium">{product.brand}</p>
              <h1 className="text-2xl md:text-3xl font-black text-[#1a1a2e] mb-2">{product.name}</h1>
              <p className="text-sm text-[#9CA3AF]">{product.nameEn}</p>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-3">
              <div className="flex gap-0.5">
                {[1,2,3,4,5].map(i => (
                  <i key={i} className={`fas fa-star text-sm ${i <= Math.round(product.rating) ? 'text-[#F59E0B]' : 'text-[#E5E7EB]'}`}></i>
                ))}
              </div>
              <span className="text-sm text-[#6b7280]">{product.rating} از ۵ ({product.reviews} نظر)</span>
            </div>

            {/* Price */}
            <div className="flex items-end gap-3">
              <span className="text-3xl font-black gradient-text">{(product.price / 10000).toFixed(0)}</span>
              <span className="text-[#6b7280] text-sm mb-1">هزار تومان</span>
              {product.originalPrice && (
                <span className="text-[#9CA3AF] line-through text-sm mb-1">{(product.originalPrice / 10000).toFixed(0)} هزار</span>
              )}
            </div>

            {/* Flavor Selection */}
            {product.flavors && product.flavors.length > 0 && (
              <div>
                <h3 className="text-sm font-bold text-[#4b5563] mb-3">انتخاب طعم:</h3>
                <div className="flex flex-wrap gap-2">
                  {product.flavors.map(f => (
                    <button
                      key={f}
                      onClick={() => setSelectedFlavor(f)}
                      className={`px-4 py-2 rounded-xl text-sm transition-all ${
                        selectedFlavor === f ? 'bg-[#00C07F] text-white font-bold shadow-md' : 'glass text-[#4b5563] hover:text-[#1a1a2e] shadow-soft'
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Color Selection */}
            {product.colors && product.colors.length > 0 && (
              <div>
                <h3 className="text-sm font-bold text-[#4b5563] mb-3">رنگ بدنه:</h3>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map(c => (
                    <button
                      key={c}
                      onClick={() => setSelectedColor(c)}
                      className={`px-4 py-2 rounded-xl text-sm transition-all ${
                        selectedColor === c ? 'bg-[#0891B2] text-white font-bold shadow-md' : 'glass text-[#4b5563] hover:text-[#1a1a2e] shadow-soft'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div>
              <h3 className="text-sm font-bold text-[#4b5563] mb-3">تعداد:</h3>
              <div className="flex items-center gap-3">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-10 glass rounded-xl flex items-center justify-center hover:text-[#00C07F] transition-colors shadow-soft">
                  <i className="fas fa-minus text-sm"></i>
                </button>
                <span className="text-xl font-bold w-8 text-center text-[#1a1a2e]">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="w-10 h-10 glass rounded-xl flex items-center justify-center hover:text-[#00C07F] transition-colors shadow-soft">
                  <i className="fas fa-plus text-sm"></i>
                </button>
              </div>
            </div>

            {/* Stock Status */}
            <div className={`text-sm font-medium ${product.stock <= 5 ? 'text-red-500' : 'text-[#00C07F]'}`}>
              {product.stock <= 5 ? `⚠️ فقط ${product.stock} عدد باقی‌مانده` : `✓ موجود در انبار (${product.stock} عدد)`}
            </div>

            {/* Add to Cart */}
            <button
              onClick={() => onAddToCart(product, quantity, selectedFlavor, selectedColor)}
              className="w-full btn-accent py-4 rounded-2xl text-lg flex items-center justify-center gap-3"
            >
              <i className="fas fa-shopping-bag"></i>
              افزودن به سبد خرید
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-12">
          <div className="flex gap-1 glass rounded-2xl p-1.5 mb-6 shadow-soft">
            {[
              { id: 'specs', label: 'مشخصات فنی', icon: 'fa-microchip' },
              { id: 'desc', label: 'توضیحات', icon: 'fa-file-alt' },
              { id: 'reviews', label: `نظرات (${productReviews.length})`, icon: 'fa-comments' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-3 rounded-xl text-sm font-medium transition-all flex items-center justify-center gap-2 ${
                  activeTab === tab.id ? 'bg-gradient-to-r from-[#00C07F] to-[#0891B2] text-white shadow-md' : 'text-[#6b7280] hover:text-[#1a1a2e]'
                }`}
              >
                <i className={`fas ${tab.icon} text-xs`}></i>
                {tab.label}
              </button>
            ))}
          </div>

          <div className="glass rounded-2xl p-6 shadow-soft">
            {activeTab === 'specs' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {product.battery && <SpecRow label="باتری" value={product.battery} icon="fa-battery-full" />}
                {product.wattage && <SpecRow label="توان خروجی" value={product.wattage} icon="fa-bolt" />}
                {product.port && <SpecRow label="پورت شارژ" value={product.port} icon="fa-plug" />}
                {product.capacity && <SpecRow label="ظرفیت" value={product.capacity} icon="fa-flask" />}
                {product.nicotine && <SpecRow label="نیکوتین" value={`${product.nicotine} mg`} icon="fa-vial" />}
                <SpecRow label="برند" value={product.brand} icon="fa-tag" />
              </div>
            )}
            {activeTab === 'desc' && (
              <p className="text-[#4b5563] leading-8 text-sm">{product.description}</p>
            )}
            {activeTab === 'reviews' && (
              <div className="space-y-4">
                {productReviews.length > 0 ? productReviews.map(review => (
                  <div key={review.id} className="border-b border-[#E5E7EB] pb-4 last:border-0">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-sm text-[#1a1a2e]">{review.user}</span>
                      <span className="text-xs text-[#9CA3AF]">{review.date}</span>
                    </div>
                    <div className="flex gap-0.5 mb-2">
                      {[1,2,3,4,5].map(i => (
                        <i key={i} className={`fas fa-star text-xs ${i <= review.rating ? 'text-[#F59E0B]' : 'text-[#E5E7EB]'}`}></i>
                      ))}
                    </div>
                    <p className="text-sm text-[#4b5563]">{review.text}</p>
                  </div>
                )) : (
                  <p className="text-center text-[#9CA3AF] py-8">هنوز نظری ثبت نشده است</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function SpecRow({ label, value, icon }: { label: string; value: string; icon?: string }) {
  return (
    <div className="flex items-center justify-between p-3 rounded-xl bg-[#F5F5F7]">
      <span className="text-sm text-[#6b7280] flex items-center gap-2">
        {icon && <i className={`fas ${icon} text-[#00C07F] text-xs`}></i>}
        {label}
      </span>
      <span className="text-sm font-bold text-[#1a1a2e]">{value}</span>
    </div>
  );
}

// Cart Slide-out
function CartSlideOut({ 
  isOpen, 
  onClose, 
  items, 
  onUpdateQuantity, 
  onRemove,
  onCheckout
}: { 
  isOpen: boolean; 
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: number, qty: number) => void;
  onRemove: (id: number) => void;
  onCheckout: () => void;
}) {
  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[70]">
      <div className="absolute inset-0 bg-[#1a1a2e]/40 backdrop-blur-sm" onClick={onClose}></div>
      <div className="absolute top-0 right-0 bottom-0 w-full max-w-md glass-strong animate-slide-in-right overflow-y-auto shadow-soft">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-[#1a1a2e]">
              <i className="fas fa-shopping-bag text-[#00C07F] ml-2"></i>
              سبد خرید
            </h2>
            <button onClick={onClose} className="w-10 h-10 glass rounded-xl flex items-center justify-center hover:text-[#EC4899] transition-colors shadow-soft">
              <i className="fas fa-times"></i>
            </button>
          </div>

          {/* Items */}
          {items.length > 0 ? (
            <>
              <div className="space-y-4 mb-6">
                {items.map(item => (
                  <div key={item.product.id} className="glass rounded-xl p-4 flex gap-3 shadow-soft">
                    <img src={item.product.image} alt={item.product.name} className="w-16 h-16 rounded-lg object-cover" />
                    <div className="flex-1">
                      <h4 className="text-sm font-bold text-[#1a1a2e] mb-1 line-clamp-1">{item.product.name}</h4>
                      {item.selectedFlavor && (
                        <p className="text-xs text-[#9CA3AF] mb-1">طعم: {item.selectedFlavor}</p>
                      )}
                      <p className="text-sm text-[#00C07F] font-bold">{(item.product.price / 10000).toFixed(0)} هزار تومان</p>
                    </div>
                    <div className="flex flex-col items-end justify-between">
                      <button onClick={() => onRemove(item.product.id)} className="text-[#9CA3AF] hover:text-[#EC4899] transition-colors">
                        <i className="fas fa-trash text-xs"></i>
                      </button>
                      <div className="flex items-center gap-2">
                        <button onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)} className="w-6 h-6 glass rounded flex items-center justify-center text-xs hover:text-[#00C07F] shadow-soft">
                          -
                        </button>
                        <span className="text-sm font-bold w-4 text-center text-[#1a1a2e]">{item.quantity}</span>
                        <button onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)} className="w-6 h-6 glass rounded flex items-center justify-center text-xs hover:text-[#00C07F] shadow-soft">
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Total */}
              <div className="glass rounded-xl p-4 mb-4 shadow-soft">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[#6b7280] text-sm">جمع کل:</span>
                  <span className="text-xl font-black gradient-text">{(total / 10000).toFixed(0)} هزار تومان</span>
                </div>
                <p className="text-xs text-[#9CA3AF]">هزینه ارسال در مرحله بعد محاسبه می‌شود</p>
              </div>

              <button 
                onClick={onCheckout}
                className="w-full btn-accent py-4 rounded-2xl text-lg"
              >
                ادامه فرآیند خرید
              </button>
            </>
          ) : (
            <div className="text-center py-16">
              <span className="text-6xl mb-4 block">🛒</span>
              <p className="text-[#6b7280] mb-4">سبد خرید شما خالی است</p>
              <button onClick={onClose} className="text-[#00C07F] hover:underline text-sm font-medium">
                بازگشت به فروشگاه
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Checkout Page
function CheckoutPage({ items, onBack }: { items: CartItem[]; onBack: () => void }) {
  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const [city, setCity] = useState('');
  const shippingCost = city === 'tehran' ? 50000 : city ? 80000 : 0;

  return (
    <section className="pt-24 pb-24 px-4 min-h-screen">
      <div className="max-w-3xl mx-auto">
        <button onClick={onBack} className="flex items-center gap-2 text-[#6b7280] hover:text-[#00C07F] transition-colors mb-6">
          <i className="fas fa-arrow-right"></i>
          <span className="text-sm">بازگشت</span>
        </button>

        <h1 className="text-2xl md:text-3xl font-black mb-8 text-[#1a1a2e]">
          <span className="gradient-text">تسویه حساب</span>
        </h1>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Form */}
          <div className="space-y-4">
            <div className="glass rounded-2xl p-6 space-y-4 shadow-soft">
              <h3 className="font-bold text-lg mb-2 text-[#1a1a2e]">اطلاعات ارسال</h3>
              <input type="text" placeholder="نام و نام خانوادگی" className="w-full bg-white text-[#1a1a2e] rounded-xl p-3 border border-[#E5E7EB] outline-none focus:border-[#00C07F] transition-colors text-sm placeholder-[#9CA3AF]" />
              <input type="tel" placeholder="شماره موبایل" className="w-full bg-white text-[#1a1a2e] rounded-xl p-3 border border-[#E5E7EB] outline-none focus:border-[#00C07F] transition-colors text-sm placeholder-[#9CA3AF]" />
              <input type="text" placeholder="آدرس کامل" className="w-full bg-white text-[#1a1a2e] rounded-xl p-3 border border-[#E5E7EB] outline-none focus:border-[#00C07F] transition-colors text-sm placeholder-[#9CA3AF]" />
              <input type="text" placeholder="کد پستی" className="w-full bg-white text-[#1a1a2e] rounded-xl p-3 border border-[#E5E7EB] outline-none focus:border-[#00C07F] transition-colors text-sm placeholder-[#9CA3AF]" />
              <select 
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

          {/* Summary */}
          <div className="space-y-4">
            <div className="glass rounded-2xl p-6 shadow-soft">
              <h3 className="font-bold text-lg mb-4 text-[#1a1a2e]">خلاصه سفارش</h3>
              <div className="space-y-3 mb-4">
                {items.map(item => (
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
            <button className="w-full btn-accent py-4 rounded-2xl text-lg">
              پرداخت آنلاین
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

// Footer
function Footer() {
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
              <li><a href="#" className="hover:text-[#00C07F] transition-colors">فروشگاه</a></li>
              <li><a href="#" className="hover:text-[#00C07F] transition-colors">تخفیف‌ها</a></li>
              <li><a href="#" className="hover:text-[#00C07F] transition-colors">بلاگ</a></li>
              <li><a href="#contact" className="hover:text-[#00C07F] transition-colors">تماس با ما</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-[#1a1a2e]">خدمات مشتریان</h4>
            <ul className="space-y-2 text-sm text-[#6b7280]">
              <li><a href="#" className="hover:text-[#00C07F] transition-colors">راهنمای خرید</a></li>
              <li><a href="#" className="hover:text-[#00C07F] transition-colors">شرایط بازگشت</a></li>
              <li><a href="#" className="hover:text-[#00C07F] transition-colors">حریم خصوصی</a></li>
              <li><a href="#" className="hover:text-[#00C07F] transition-colors">تماس با ما</a></li>
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

// Mobile Bottom Nav
function BottomNav({ 
  cartCount, 
  onCartOpen, 
  currentPage,
  onNavigate 
}: { 
  cartCount: number;
  onCartOpen: () => void;
  currentPage: string;
  onNavigate: (page: string) => void;
}) {
  return (
    <div className="bottom-nav md:hidden">
      <div className="glass-strong border-t border-[#E5E7EB] px-4 py-2 flex items-center justify-around shadow-soft">
        <button 
          onClick={() => onNavigate('home')}
          className={`flex flex-col items-center gap-1 py-2 px-3 rounded-xl transition-all ${currentPage === 'home' ? 'text-[#00C07F]' : 'text-[#6b7280]'}`}
        >
          <i className="fas fa-home text-lg"></i>
          <span className="text-[10px]">خانه</span>
        </button>
        <button 
          onClick={() => onNavigate('shop')}
          className={`flex flex-col items-center gap-1 py-2 px-3 rounded-xl transition-all ${currentPage === 'shop' ? 'text-[#00C07F]' : 'text-[#6b7280]'}`}
        >
          <i className="fas fa-store text-lg"></i>
          <span className="text-[10px]">فروشگاه</span>
        </button>
        <button 
          onClick={onCartOpen}
          className="relative flex flex-col items-center gap-1 py-2 px-3 rounded-xl text-[#6b7280]"
        >
          <i className="fas fa-shopping-bag text-lg"></i>
          <span className="text-[10px]">سبد خرید</span>
          {cartCount > 0 && (
            <span className="absolute top-0 right-1 w-5 h-5 bg-[#00C07F] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </button>
        <button className="flex flex-col items-center gap-1 py-2 px-3 rounded-xl text-[#6b7280]">
          <i className="fas fa-user text-lg"></i>
          <span className="text-[10px]">حساب من</span>
        </button>
      </div>
    </div>
  );
}

// Main App
export default function App() {
  const [ageVerified, setAgeVerified] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    setSelectedProduct(null);
    window.scrollTo(0, 0);
  };

  const handleCategoryClick = (cat: string) => {
    setSelectedCategory(cat);
    setCurrentPage('shop');
    window.scrollTo(0, 0);
  };

  const handleAddToCart = (product: Product, qty: number = 1, flavor?: string, color?: string) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + qty }
            : item
        );
      }
      return [...prev, { product, quantity: qty, selectedFlavor: flavor, selectedColor: color }];
    });
    setCartOpen(true);
  };

  const handleUpdateQuantity = (id: number, qty: number) => {
    if (qty <= 0) {
      setCartItems(prev => prev.filter(item => item.product.id !== id));
    } else {
      setCartItems(prev => prev.map(item => 
        item.product.id === id ? { ...item, quantity: qty } : item
      ));
    }
  };

  const handleRemoveFromCart = (id: number) => {
    setCartItems(prev => prev.filter(item => item.product.id !== id));
  };

  const handleViewProduct = (product: Product) => {
    setSelectedProduct(product);
    setCurrentPage('product');
    window.scrollTo(0, 0);
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  if (!ageVerified) {
    return <AgeGate onVerify={() => setAgeVerified(true)} />;
  }

  return (
    <div className="min-h-screen bg-[#F5F5F7] text-[#1a1a2e]" dir="rtl">
      <Header 
        cartCount={cartCount}
        onCartOpen={() => setCartOpen(true)}
        onSearchOpen={() => setSearchOpen(true)}
        currentPage={currentPage}
        onNavigate={handleNavigate}
      />

      <SearchModal 
        isOpen={searchOpen} 
        onClose={() => setSearchOpen(false)}
        onSelectProduct={handleViewProduct}
      />

      <CartSlideOut
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemove={handleRemoveFromCart}
        onCheckout={() => { setCartOpen(false); setCurrentPage('checkout'); window.scrollTo(0,0); }}
      />

      {/* Pages */}
      {currentPage === 'home' && (
        <main>
          <HeroSection />
          <CategoryBubbles onCategoryClick={handleCategoryClick} />
          <FeaturedProducts onAddToCart={handleAddToCart} onViewProduct={handleViewProduct} />
          <BlogSection />
          <div id="contact">
            <ContactSection />
          </div>
        </main>
      )}

      {currentPage === 'shop' && (
        <ShopPage 
          initialCategory={selectedCategory}
          onAddToCart={handleAddToCart}
          onViewProduct={handleViewProduct}
        />
      )}

      {currentPage === 'product' && selectedProduct && (
        <ProductDetail 
          product={selectedProduct}
          onAddToCart={handleAddToCart}
          onBack={() => { setCurrentPage('shop'); window.scrollTo(0,0); }}
        />
      )}

      {currentPage === 'checkout' && (
        <CheckoutPage 
          items={cartItems}
          onBack={() => { setCurrentPage('home'); window.scrollTo(0,0); }}
        />
      )}

      <Footer />

      <BottomNav 
        cartCount={cartCount}
        onCartOpen={() => setCartOpen(true)}
        currentPage={currentPage}
        onNavigate={handleNavigate}
      />
    </div>
  );
}
