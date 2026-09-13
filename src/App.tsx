import { useState, useEffect, useRef } from 'react';
import { products, categories, brands, flavorProfiles, nicotineLevels, reviews, Product, CartItem } from './data/products';

// Age Verification Gate
function AgeGate({ onVerify }: { onVerify: () => void }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-xl">
      <div className="glass-strong rounded-3xl p-8 md:p-12 max-w-md mx-4 text-center animate-fade-in">
        <div className="text-6xl mb-6 animate-float">🔞</div>
        <h2 className="text-2xl md:text-3xl font-bold mb-4 gradient-text">اسموک سیتی</h2>
        <p className="text-gray-300 mb-2 text-lg">آیا شما بالای ۱۸ سال سن دارید؟</p>
        <p className="text-gray-500 text-sm mb-8">ورود شما به معنای تأیید سن قانونی شما است</p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={onVerify}
            className="btn-neon px-8 py-3 rounded-xl text-lg font-bold"
          >
            بله، بالای ۱۸ سال هستم
          </button>
        </div>
        <button className="mt-4 text-gray-500 hover:text-gray-300 transition-colors text-sm">
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
      scrolled ? 'glass-strong shadow-lg shadow-black/20' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <button onClick={() => onNavigate('home')} className="flex items-center gap-2 group">
          <span className="text-2xl">💨</span>
          <span className="text-xl md:text-2xl font-black gradient-text group-hover:neon-text transition-all">
            اسموک سیتی
          </span>
        </button>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          <button 
            onClick={() => onNavigate('home')}
            className={`text-sm font-medium transition-colors hover:text-[#00F5A0] ${currentPage === 'home' ? 'text-[#00F5A0]' : 'text-gray-300'}`}
          >
            خانه
          </button>
          <button 
            onClick={() => onNavigate('shop')}
            className={`text-sm font-medium transition-colors hover:text-[#00F5A0] ${currentPage === 'shop' ? 'text-[#00F5A0]' : 'text-gray-300'}`}
          >
            فروشگاه
          </button>
          <button className="text-sm font-medium text-gray-300 transition-colors hover:text-[#00F5A0]">
            باشگاه مشتریان
          </button>
          <button className="text-sm font-medium text-gray-300 transition-colors hover:text-[#00F5A0]">
            تماس با ما
          </button>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button 
            onClick={onSearchOpen}
            className="w-10 h-10 rounded-xl glass flex items-center justify-center hover:border-[#00F5A0]/30 transition-all"
          >
            <i className="fas fa-search text-gray-300"></i>
          </button>
          <button 
            onClick={onCartOpen}
            className="relative w-10 h-10 rounded-xl glass flex items-center justify-center hover:border-[#00F5A0]/30 transition-all"
          >
            <i className="fas fa-shopping-bag text-gray-300"></i>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#00F5A0] text-black text-xs font-bold rounded-full flex items-center justify-center animate-bounce-badge">
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
    <div className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm" onClick={onClose}>
      <div className="max-w-2xl mx-auto mt-20 px-4" onClick={e => e.stopPropagation()}>
        <div className="glass-strong rounded-2xl p-4 animate-fade-in">
          <div className="flex items-center gap-3 mb-4">
            <i className="fas fa-search text-[#00F5A0] text-lg"></i>
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="جستجوی محصول، برند، دسته‌بندی..."
              className="flex-1 bg-transparent text-white placeholder-gray-500 outline-none text-lg"
            />
            <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
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
                      className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors text-right"
                    >
                      <img src={product.image} alt={product.name} className="w-12 h-12 rounded-lg object-cover" />
                      <div className="flex-1">
                        <p className="text-white text-sm font-medium">{product.name}</p>
                        <p className="text-gray-500 text-xs">{product.brand} • {categories.find(c => c.id === product.category)?.name}</p>
                      </div>
                      <span className="text-[#00F5A0] text-sm font-bold">
                        {(product.price / 10000).toFixed(0)} هزار
                      </span>
                    </button>
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-500 py-8">محصولی یافت نشد</p>
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
        <img 
          src="https://image.qwenlm.ai/generated-images/f955ab2d-7212-4e91-8d74-754eda2d121d/_result.png" 
          alt="" 
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0C]/60 via-[#0A0A0C]/40 to-[#0A0A0C]"></div>
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#00F5A0]/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-[#00D9F5]/10 rounded-full blur-3xl"></div>
        </div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div key={currentSlide} className="animate-fade-in">
          <span className="inline-block px-4 py-1 rounded-full glass text-[#00F5A0] text-sm font-medium mb-6">
            ✨ فروشگاه معتبر ویپ و پاد
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight">
            {slides[currentSlide].title}
          </h1>
          <p className="text-lg md:text-xl text-gray-400 mb-8">
            {slides[currentSlide].subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-neon px-8 py-4 rounded-2xl text-lg font-bold">
              {slides[currentSlide].cta}
            </button>
            <button className="px-8 py-4 rounded-2xl glass text-white font-medium hover:border-[#00F5A0]/30 transition-all">
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
                i === currentSlide ? 'w-8 bg-[#00F5A0]' : 'w-2 bg-gray-600'
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
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
          دسته‌بندی <span className="gradient-text">محصولات</span>
        </h2>
        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
          {categories.map((cat, i) => (
            <button
              key={cat.id}
              onClick={() => onCategoryClick(cat.id)}
              className={`category-bubble glass rounded-2xl p-4 md:p-6 flex flex-col items-center gap-3 min-w-[100px] opacity-0 animate-slide-up stagger-${i + 1}`}
              style={{ animationFillMode: 'forwards' }}
            >
              <span className="text-3xl md:text-4xl">{cat.icon}</span>
              <span className="text-xs md:text-sm font-medium text-gray-300">{cat.name}</span>
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
      <div className="relative overflow-hidden aspect-square bg-gradient-to-br from-[#1A1A22] to-[#0A0A0C]">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover product-img-zoom opacity-90 group-hover:opacity-100 transition-opacity"
        />
        
        {/* Badges */}
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          {product.isNew && (
            <span className="px-2 py-1 bg-[#00F5A0] text-black text-xs font-bold rounded-lg">جدید</span>
          )}
          {product.isBestseller && (
            <span className="px-2 py-1 bg-[#FFB800] text-black text-xs font-bold rounded-lg">پرفروش</span>
          )}
          {discount > 0 && (
            <span className="px-2 py-1 bg-[#FF2D78] text-white text-xs font-bold rounded-lg">{discount}% تخفیف</span>
          )}
        </div>

        {product.stock <= 5 && product.stock > 0 && (
          <div className="absolute bottom-3 left-3 right-3">
            <span className="px-2 py-1 bg-red-500/80 text-white text-xs rounded-lg backdrop-blur-sm">
              🔥 فقط {product.stock} عدد باقی‌مانده!
            </span>
          </div>
        )}

        {/* Quick add button */}
        <button
          onClick={(e) => { e.stopPropagation(); onAddToCart(product); }}
          className="absolute bottom-3 right-3 w-10 h-10 bg-[#00F5A0] text-black rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 shadow-lg shadow-[#00F5A0]/20"
        >
          <i className="fas fa-plus"></i>
        </button>
      </div>

      {/* Info */}
      <div className="p-4 cursor-pointer" onClick={() => onViewProduct(product)}>
        <p className="text-xs text-gray-500 mb-1">{product.brand}</p>
        <h3 className="text-sm font-bold text-white mb-2 line-clamp-2">{product.name}</h3>
        
        <div className="flex items-center gap-1 mb-3">
          <i className="fas fa-star text-[#FFB800] text-xs"></i>
          <span className="text-xs text-gray-400">{product.rating} ({product.reviews})</span>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-lg font-black gradient-text">
              {(product.price / 10000).toFixed(0)}
            </span>
            <span className="text-xs text-gray-400 mr-1">هزار تومان</span>
          </div>
          {product.originalPrice && (
            <span className="text-xs text-gray-600 line-through">
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
          <h2 className="text-2xl md:text-3xl font-bold">
            محصولات <span className="gradient-text">ویژه</span> ✨
          </h2>
          <button className="text-sm text-[#00F5A0] hover:underline">مشاهده همه</button>
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

// Club Section
function ClubSection() {
  const benefits = [
    { icon: '🛡️', title: 'گارانتی اصالت', desc: 'تمامی محصولات دارای ضمانت اصالت و سلامت' },
    { icon: '🚀', title: 'ارسال اکسپرس', desc: 'ارسال فوری در تهران و شهرستان‌ها' },
    { icon: '💎', title: 'باشگاه مشتریان', desc: 'تخفیف‌های ویژه و امتیاز خرید' },
    { icon: '🎧', title: 'پشتیبانی ۲۴/۷', desc: 'مشاوره تخصصی و پاسخگویی سریع' },
  ];

  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="glass rounded-3xl p-8 md:p-12 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-[#00F5A0]/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#00D9F5]/5 rounded-full blur-3xl"></div>
          
          <div className="relative z-10">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-3">
              باشگاه مشتریان <span className="gradient-text">اسموک سیتی</span>
            </h2>
            <p className="text-gray-400 text-center mb-10">مزایای عضویت در خانواده اسموک سیتی</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((b, i) => (
                <div key={i} className="text-center p-4 rounded-2xl hover:bg-white/5 transition-colors">
                  <span className="text-4xl mb-4 block">{b.icon}</span>
                  <h3 className="font-bold text-white mb-2">{b.title}</h3>
                  <p className="text-sm text-gray-400">{b.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Shop Page with Filters
function ShopPage({ 
  initialCategory,
  onAddToCart, 
  onViewProduct 
}: { 
  initialCategory?: string;
  onAddToCart: (product: Product) => void;
  onViewProduct: (product: Product) => void;
}) {
  const [selectedCategory, setSelectedCategory] = useState(initialCategory || '');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedFlavor, setSelectedFlavor] = useState('');
  const [selectedNicotine, setSelectedNicotine] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000000]);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('popular');

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

  return (
    <section className="pt-24 pb-24 md:pb-12 px-4 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-black mb-2">
            <span className="gradient-text">فروشگاه</span> اسموک سیتی
          </h1>
          <p className="text-gray-400">{filteredProducts.length} محصول</p>
        </div>

        {/* Filter Toggle (Mobile) */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="md:hidden w-full glass rounded-xl p-3 mb-4 flex items-center justify-center gap-2 text-sm"
        >
          <i className="fas fa-sliders-h"></i>
          فیلترها و مرتب‌سازی
        </button>

        <div className="flex gap-6">
          {/* Sidebar Filters */}
          <aside className={`${showFilters ? 'fixed inset-0 z-50 bg-[#0A0A0C] p-4 overflow-y-auto' : 'hidden'} md:block md:relative md:w-64 flex-shrink-0`}>
            {showFilters && (
              <button onClick={() => setShowFilters(false)} className="md:hidden mb-4 text-gray-400">
                <i className="fas fa-times text-xl"></i> بستن فیلترها
              </button>
            )}
            
            <div className="space-y-6">
              {/* Sort */}
              <div className="glass rounded-2xl p-4">
                <h3 className="font-bold text-sm mb-3 text-gray-300">مرتب‌سازی</h3>
                <select 
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value)}
                  className="w-full bg-[#0A0A0C] text-white text-sm rounded-lg p-2 border border-[#2A2A35] outline-none"
                >
                  <option value="popular">محبوب‌ترین</option>
                  <option value="price-low">ارزان‌ترین</option>
                  <option value="price-high">گران‌ترین</option>
                  <option value="rating">بالاترین امتیاز</option>
                </select>
              </div>

              {/* Category Filter */}
              <div className="glass rounded-2xl p-4">
                <h3 className="font-bold text-sm mb-3 text-gray-300">دسته‌بندی</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedCategory('')}
                    className={`w-full text-right text-sm p-2 rounded-lg transition-colors ${!selectedCategory ? 'bg-[#00F5A0]/10 text-[#00F5A0]' : 'text-gray-400 hover:text-white'}`}
                  >
                    همه
                  </button>
                  {categories.map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id === selectedCategory ? '' : cat.id)}
                      className={`w-full text-right text-sm p-2 rounded-lg transition-colors flex items-center gap-2 ${selectedCategory === cat.id ? 'bg-[#00F5A0]/10 text-[#00F5A0]' : 'text-gray-400 hover:text-white'}`}
                    >
                      <span>{cat.icon}</span> {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Brand Filter */}
              <div className="glass rounded-2xl p-4">
                <h3 className="font-bold text-sm mb-3 text-gray-300">برند</h3>
                <div className="space-y-2 max-h-48 overflow-y-auto no-scrollbar">
                  <button
                    onClick={() => setSelectedBrand('')}
                    className={`w-full text-right text-sm p-2 rounded-lg transition-colors ${!selectedBrand ? 'bg-[#00F5A0]/10 text-[#00F5A0]' : 'text-gray-400 hover:text-white'}`}
                  >
                    همه برندها
                  </button>
                  {brands.map(brand => (
                    <button
                      key={brand}
                      onClick={() => setSelectedBrand(brand === selectedBrand ? '' : brand)}
                      className={`w-full text-right text-sm p-2 rounded-lg transition-colors ${selectedBrand === brand ? 'bg-[#00F5A0]/10 text-[#00F5A0]' : 'text-gray-400 hover:text-white'}`}
                    >
                      {brand}
                    </button>
                  ))}
                </div>
              </div>

              {/* Flavor Profile */}
              <div className="glass rounded-2xl p-4">
                <h3 className="font-bold text-sm mb-3 text-gray-300">طعم‌سنج</h3>
                <div className="flex flex-wrap gap-2">
                  {flavorProfiles.map(fp => (
                    <button
                      key={fp.id}
                      onClick={() => setSelectedFlavor(fp.id === selectedFlavor ? '' : fp.id)}
                      className={`px-3 py-1.5 rounded-full text-xs transition-all ${selectedFlavor === fp.id ? 'bg-[#00F5A0] text-black font-bold' : 'glass text-gray-400 hover:text-white'}`}
                    >
                      {fp.icon} {fp.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Nicotine Level */}
              <div className="glass rounded-2xl p-4">
                <h3 className="font-bold text-sm mb-3 text-gray-300">سطح نیکوتین (mg)</h3>
                <div className="flex flex-wrap gap-2">
                  {nicotineLevels.map(n => (
                    <button
                      key={n}
                      onClick={() => setSelectedNicotine(n === selectedNicotine ? '' : n)}
                      className={`w-10 h-10 rounded-xl text-xs font-bold transition-all ${selectedNicotine === n ? 'bg-[#00F5A0] text-black' : 'glass text-gray-400 hover:text-white'}`}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="glass rounded-2xl p-4">
                <h3 className="font-bold text-sm mb-3 text-gray-300">محدوده قیمت</h3>
                <input
                  type="range"
                  min="0"
                  max="5000000"
                  step="100000"
                  value={priceRange[1]}
                  onChange={e => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full accent-[#00F5A0]"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
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
                <p className="text-gray-400 text-lg">محصولی با این فیلترها یافت نشد</p>
                <button 
                  onClick={() => { setSelectedCategory(''); setSelectedBrand(''); setSelectedFlavor(''); setSelectedNicotine(''); }}
                  className="mt-4 text-[#00F5A0] hover:underline text-sm"
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
        <button onClick={onBack} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6">
          <i className="fas fa-arrow-right"></i>
          <span className="text-sm">بازگشت به فروشگاه</span>
        </button>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="glass rounded-2xl overflow-hidden aspect-square relative group">
              <img 
                src={product.images[selectedImage]} 
                alt={product.name}
                className="w-full h-full object-cover product-img-zoom"
              />
              {product.originalPrice && (
                <span className="absolute top-4 right-4 px-3 py-1 bg-[#FF2D78] text-white text-sm font-bold rounded-lg">
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
                    className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                      i === selectedImage ? 'border-[#00F5A0]' : 'border-transparent opacity-60 hover:opacity-100'
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
              <p className="text-sm text-[#00F5A0] mb-1">{product.brand}</p>
              <h1 className="text-2xl md:text-3xl font-black text-white mb-2">{product.name}</h1>
              <p className="text-sm text-gray-500">{product.nameEn}</p>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-3">
              <div className="flex gap-0.5">
                {[1,2,3,4,5].map(i => (
                  <i key={i} className={`fas fa-star text-sm ${i <= Math.round(product.rating) ? 'text-[#FFB800]' : 'text-gray-700'}`}></i>
                ))}
              </div>
              <span className="text-sm text-gray-400">{product.rating} از ۵ ({product.reviews} نظر)</span>
            </div>

            {/* Price */}
            <div className="flex items-end gap-3">
              <span className="text-3xl font-black gradient-text">{(product.price / 10000).toFixed(0)}</span>
              <span className="text-gray-400 text-sm mb-1">هزار تومان</span>
              {product.originalPrice && (
                <span className="text-gray-600 line-through text-sm mb-1">{(product.originalPrice / 10000).toFixed(0)} هزار</span>
              )}
            </div>

            {/* Flavor Selection */}
            {product.flavors && product.flavors.length > 0 && (
              <div>
                <h3 className="text-sm font-bold text-gray-300 mb-3">انتخاب طعم:</h3>
                <div className="flex flex-wrap gap-2">
                  {product.flavors.map(f => (
                    <button
                      key={f}
                      onClick={() => setSelectedFlavor(f)}
                      className={`px-4 py-2 rounded-xl text-sm transition-all ${
                        selectedFlavor === f ? 'bg-[#00F5A0] text-black font-bold' : 'glass text-gray-300 hover:text-white'
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
                <h3 className="text-sm font-bold text-gray-300 mb-3">رنگ بدنه:</h3>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map(c => (
                    <button
                      key={c}
                      onClick={() => setSelectedColor(c)}
                      className={`px-4 py-2 rounded-xl text-sm transition-all ${
                        selectedColor === c ? 'bg-[#00D9F5] text-black font-bold' : 'glass text-gray-300 hover:text-white'
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
              <h3 className="text-sm font-bold text-gray-300 mb-3">تعداد:</h3>
              <div className="flex items-center gap-3">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-10 glass rounded-xl flex items-center justify-center hover:text-[#00F5A0] transition-colors">
                  <i className="fas fa-minus text-sm"></i>
                </button>
                <span className="text-xl font-bold w-8 text-center">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="w-10 h-10 glass rounded-xl flex items-center justify-center hover:text-[#00F5A0] transition-colors">
                  <i className="fas fa-plus text-sm"></i>
                </button>
              </div>
            </div>

            {/* Stock Status */}
            <div className={`text-sm ${product.stock <= 5 ? 'text-red-400' : 'text-green-400'}`}>
              {product.stock <= 5 ? `⚠️ فقط ${product.stock} عدد باقی‌مانده` : `✓ موجود در انبار (${product.stock} عدد)`}
            </div>

            {/* Add to Cart */}
            <button
              onClick={() => onAddToCart(product, quantity, selectedFlavor, selectedColor)}
              className="w-full btn-neon py-4 rounded-2xl text-lg font-bold flex items-center justify-center gap-3"
            >
              <i className="fas fa-shopping-bag"></i>
              افزودن به سبد خرید
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-12">
          <div className="flex gap-1 glass rounded-2xl p-1 mb-6">
            {[
              { id: 'specs', label: 'مشخصات فنی' },
              { id: 'desc', label: 'توضیحات' },
              { id: 'reviews', label: `نظرات (${productReviews.length})` },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-3 rounded-xl text-sm font-medium transition-all ${
                  activeTab === tab.id ? 'bg-[#00F5A0] text-black' : 'text-gray-400 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="glass rounded-2xl p-6">
            {activeTab === 'specs' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {product.battery && <SpecRow label="باتری" value={product.battery} />}
                {product.wattage && <SpecRow label="توان خروجی" value={product.wattage} />}
                {product.port && <SpecRow label="پورت شارژ" value={product.port} />}
                {product.capacity && <SpecRow label="ظرفیت" value={product.capacity} />}
                {product.nicotine && <SpecRow label="نیکوتین" value={`${product.nicotine} mg`} />}
                <SpecRow label="برند" value={product.brand} />
              </div>
            )}
            {activeTab === 'desc' && (
              <p className="text-gray-300 leading-8">{product.description}</p>
            )}
            {activeTab === 'reviews' && (
              <div className="space-y-4">
                {productReviews.length > 0 ? productReviews.map(review => (
                  <div key={review.id} className="border-b border-[#2A2A35] pb-4 last:border-0">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-sm text-white">{review.user}</span>
                      <span className="text-xs text-gray-500">{review.date}</span>
                    </div>
                    <div className="flex gap-0.5 mb-2">
                      {[1,2,3,4,5].map(i => (
                        <i key={i} className={`fas fa-star text-xs ${i <= review.rating ? 'text-[#FFB800]' : 'text-gray-700'}`}></i>
                      ))}
                    </div>
                    <p className="text-sm text-gray-300">{review.text}</p>
                  </div>
                )) : (
                  <p className="text-center text-gray-500 py-8">هنوز نظری ثبت نشده است</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function SpecRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between p-3 rounded-xl bg-[#0A0A0C]/50">
      <span className="text-sm text-gray-400">{label}</span>
      <span className="text-sm font-bold text-white">{value}</span>
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
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
      <div className="absolute top-0 right-0 bottom-0 w-full max-w-md glass-strong animate-slide-in-right overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">
              <i className="fas fa-shopping-bag text-[#00F5A0] ml-2"></i>
              سبد خرید
            </h2>
            <button onClick={onClose} className="w-10 h-10 glass rounded-xl flex items-center justify-center hover:text-[#FF2D78] transition-colors">
              <i className="fas fa-times"></i>
            </button>
          </div>

          {/* Items */}
          {items.length > 0 ? (
            <>
              <div className="space-y-4 mb-6">
                {items.map(item => (
                  <div key={item.product.id} className="glass rounded-xl p-4 flex gap-3">
                    <img src={item.product.image} alt={item.product.name} className="w-16 h-16 rounded-lg object-cover" />
                    <div className="flex-1">
                      <h4 className="text-sm font-bold text-white mb-1 line-clamp-1">{item.product.name}</h4>
                      {item.selectedFlavor && (
                        <p className="text-xs text-gray-500 mb-1">طعم: {item.selectedFlavor}</p>
                      )}
                      <p className="text-sm text-[#00F5A0] font-bold">{(item.product.price / 10000).toFixed(0)} هزار تومان</p>
                    </div>
                    <div className="flex flex-col items-end justify-between">
                      <button onClick={() => onRemove(item.product.id)} className="text-gray-500 hover:text-[#FF2D78] transition-colors">
                        <i className="fas fa-trash text-xs"></i>
                      </button>
                      <div className="flex items-center gap-2">
                        <button onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)} className="w-6 h-6 glass rounded flex items-center justify-center text-xs hover:text-[#00F5A0]">
                          -
                        </button>
                        <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                        <button onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)} className="w-6 h-6 glass rounded flex items-center justify-center text-xs hover:text-[#00F5A0]">
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Total */}
              <div className="glass rounded-xl p-4 mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-400 text-sm">جمع کل:</span>
                  <span className="text-xl font-black gradient-text">{(total / 10000).toFixed(0)} هزار تومان</span>
                </div>
                <p className="text-xs text-gray-500">هزینه ارسال در مرحله بعد محاسبه می‌شود</p>
              </div>

              <button 
                onClick={onCheckout}
                className="w-full btn-neon py-4 rounded-2xl font-bold text-lg"
              >
                ادامه فرآیند خرید
              </button>
            </>
          ) : (
            <div className="text-center py-16">
              <span className="text-6xl mb-4 block">🛒</span>
              <p className="text-gray-400 mb-4">سبد خرید شما خالی است</p>
              <button onClick={onClose} className="text-[#00F5A0] hover:underline text-sm">
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
        <button onClick={onBack} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6">
          <i className="fas fa-arrow-right"></i>
          <span className="text-sm">بازگشت</span>
        </button>

        <h1 className="text-2xl md:text-3xl font-black mb-8">
          <span className="gradient-text">تسویه حساب</span>
        </h1>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Form */}
          <div className="space-y-4">
            <div className="glass rounded-2xl p-6 space-y-4">
              <h3 className="font-bold text-lg mb-2">اطلاعات ارسال</h3>
              <input type="text" placeholder="نام و نام خانوادگی" className="w-full bg-[#0A0A0C] text-white rounded-xl p-3 border border-[#2A2A35] outline-none focus:border-[#00F5A0] transition-colors text-sm" />
              <input type="tel" placeholder="شماره موبایل" className="w-full bg-[#0A0A0C] text-white rounded-xl p-3 border border-[#2A2A35] outline-none focus:border-[#00F5A0] transition-colors text-sm" />
              <input type="text" placeholder="آدرس کامل" className="w-full bg-[#0A0A0C] text-white rounded-xl p-3 border border-[#2A2A35] outline-none focus:border-[#00F5A0] transition-colors text-sm" />
              <input type="text" placeholder="کد پستی" className="w-full bg-[#0A0A0C] text-white rounded-xl p-3 border border-[#2A2A35] outline-none focus:border-[#00F5A0] transition-colors text-sm" />
              <select 
                value={city}
                onChange={e => setCity(e.target.value)}
                className="w-full bg-[#0A0A0C] text-white rounded-xl p-3 border border-[#2A2A35] outline-none focus:border-[#00F5A0] transition-colors text-sm"
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
            <div className="glass rounded-2xl p-6">
              <h3 className="font-bold text-lg mb-4">خلاصه سفارش</h3>
              <div className="space-y-3 mb-4">
                {items.map(item => (
                  <div key={item.product.id} className="flex justify-between text-sm">
                    <span className="text-gray-400">{item.product.name} × {item.quantity}</span>
                    <span className="text-white">{((item.product.price * item.quantity) / 10000).toFixed(0)} هزار</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-[#2A2A35] pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">جمع محصولات</span>
                  <span className="text-white">{(total / 10000).toFixed(0)} هزار</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">هزینه ارسال</span>
                  <span className="text-white">{shippingCost ? `${(shippingCost / 1000).toFixed(0)} هزار` : 'انتخاب نشده'}</span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-2 border-t border-[#2A2A35]">
                  <span className="gradient-text">مبلغ نهایی</span>
                  <span className="gradient-text">{((total + shippingCost) / 10000).toFixed(0)} هزار تومان</span>
                </div>
              </div>
            </div>
            <button className="w-full btn-neon py-4 rounded-2xl font-bold text-lg">
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
    <footer className="glass border-t border-[#2A2A35] py-12 px-4 mb-16 md:mb-0">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">💨</span>
              <span className="text-xl font-black gradient-text">اسموک سیتی</span>
            </div>
            <p className="text-sm text-gray-400 leading-7">فروشگاه معتبر ویپ، پاد و لوازم جانبی با گارانتی اصالت کالا و ارسال سریع به سراسر ایران.</p>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-white">دسترسی سریع</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-[#00F5A0] transition-colors">فروشگاه</a></li>
              <li><a href="#" className="hover:text-[#00F5A0] transition-colors">تخفیف‌ها</a></li>
              <li><a href="#" className="hover:text-[#00F5A0] transition-colors">باشگاه مشتریان</a></li>
              <li><a href="#" className="hover:text-[#00F5A0] transition-colors">بلاگ</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-white">خدمات مشتریان</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-[#00F5A0] transition-colors">راهنمای خرید</a></li>
              <li><a href="#" className="hover:text-[#00F5A0] transition-colors">شرایط بازگشت</a></li>
              <li><a href="#" className="hover:text-[#00F5A0] transition-colors">حریم خصوصی</a></li>
              <li><a href="#" className="hover:text-[#00F5A0] transition-colors">تماس با ما</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-white">ارتباط با ما</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><i className="fas fa-phone ml-2 text-[#00F5A0]"></i>۰۲۱-۱۲۳۴۵۶۷۸</li>
              <li><i className="fas fa-envelope ml-2 text-[#00F5A0]"></i>info@smokecity.ir</li>
              <li><i className="fas fa-map-marker-alt ml-2 text-[#00F5A0]"></i>تهران، خیابان ولیعصر</li>
            </ul>
            <div className="flex gap-3 mt-4">
              <a href="#" className="w-9 h-9 glass rounded-lg flex items-center justify-center hover:text-[#00F5A0] transition-colors">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="w-9 h-9 glass rounded-lg flex items-center justify-center hover:text-[#00F5A0] transition-colors">
                <i className="fab fa-telegram"></i>
              </a>
              <a href="#" className="w-9 h-9 glass rounded-lg flex items-center justify-center hover:text-[#00F5A0] transition-colors">
                <i className="fab fa-whatsapp"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-[#2A2A35] mt-8 pt-6 text-center">
          <p className="text-xs text-gray-500">© ۱۴۰۳ اسموک سیتی. تمامی حقوق محفوظ است. | فروش به افراد زیر ۱۸ سال ممنوع است.</p>
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
      <div className="glass-strong border-t border-[#2A2A35] px-4 py-2 flex items-center justify-around">
        <button 
          onClick={() => onNavigate('home')}
          className={`flex flex-col items-center gap-1 py-2 px-3 rounded-xl transition-all ${currentPage === 'home' ? 'text-[#00F5A0]' : 'text-gray-400'}`}
        >
          <i className="fas fa-home text-lg"></i>
          <span className="text-[10px]">خانه</span>
        </button>
        <button 
          onClick={() => onNavigate('shop')}
          className={`flex flex-col items-center gap-1 py-2 px-3 rounded-xl transition-all ${currentPage === 'shop' ? 'text-[#00F5A0]' : 'text-gray-400'}`}
        >
          <i className="fas fa-store text-lg"></i>
          <span className="text-[10px]">فروشگاه</span>
        </button>
        <button 
          onClick={onCartOpen}
          className="relative flex flex-col items-center gap-1 py-2 px-3 rounded-xl text-gray-400"
        >
          <i className="fas fa-shopping-bag text-lg"></i>
          <span className="text-[10px]">سبد خرید</span>
          {cartCount > 0 && (
            <span className="absolute top-0 right-1 w-5 h-5 bg-[#00F5A0] text-black text-[10px] font-bold rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </button>
        <button className="flex flex-col items-center gap-1 py-2 px-3 rounded-xl text-gray-400">
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
    <div className="min-h-screen bg-[#0A0A0C] text-white" dir="rtl">
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
          <ClubSection />
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
