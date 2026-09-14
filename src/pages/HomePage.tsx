import { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { products, categories, Product } from '../data/products';

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
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#F5F5F7] via-[#ecfdf5] to-[#F5F5F7]"></div>
        <div className="absolute inset-0">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#00C07F]/15 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-[#0891B2]/15 rounded-full blur-3xl"></div>
        </div>
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div key={currentSlide} className="animate-fade-in-up">
          <span className="inline-block px-4 py-1.5 rounded-full glass text-[#00C07F] text-sm font-medium mb-6 shadow-soft animate-scale-in">
            ✨ فروشگاه معتبر ویپ و پاد
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight text-[#1a1a2e]" style={{ animation: 'fadeInUp 0.8s ease-out 0.2s both' }}>
            {slides[currentSlide].title}
          </h1>
          <p className="text-lg md:text-xl text-[#4b5563] mb-8" style={{ animation: 'fadeInUp 0.8s ease-out 0.4s both' }}>
            {slides[currentSlide].subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center" style={{ animation: 'fadeInUp 0.8s ease-out 0.6s both' }}>
            <button className="btn-accent px-8 py-4 rounded-2xl text-lg animate-pulse-soft">
              {slides[currentSlide].cta}
            </button>
            <button className="px-8 py-4 rounded-2xl glass text-[#1a1a2e] font-medium hover:shadow-soft transition-all">
              مشاوره رایگان
            </button>
          </div>
        </div>

        <div className="flex gap-2 justify-center mt-12">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`h-2 rounded-full transition-all duration-300 ${i === currentSlide ? 'w-8 bg-[#00C07F]' : 'w-2 bg-[#d1d5db]'}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// Category Section
function CategorySection() {
  const { setSelectedCategory, navigate } = useApp();

  const handleCategoryClick = (catId: string) => {
    setSelectedCategory(catId);
    navigate('shop');
  };

  return (
    <section className="py-12 px-4">
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
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
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

// Product Card
function ProductCard({ product }: { product: Product }) {
  const { addToCart, setSelectedProduct, navigate } = useApp();
  const discount = product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;

  return (
    <div className="card-3d glass rounded-2xl overflow-hidden group">
      <div className="relative overflow-hidden aspect-square bg-gradient-to-br from-[#f8fafc] to-[#f1f5f9]">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover product-img-zoom" />
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          {product.isNew && <span className="px-2 py-1 bg-[#00C07F] text-white text-xs font-bold rounded-lg">جدید</span>}
          {product.isBestseller && <span className="px-2 py-1 bg-[#F59E0B] text-white text-xs font-bold rounded-lg">پرفروش</span>}
          {discount > 0 && <span className="px-2 py-1 bg-[#EC4899] text-white text-xs font-bold rounded-lg">{discount}% تخفیف</span>}
        </div>
        {product.stock <= 5 && product.stock > 0 && (
          <div className="absolute bottom-3 left-3 right-3">
            <span className="px-2 py-1 bg-red-500/90 text-white text-xs rounded-lg backdrop-blur-sm">
              🔥 فقط {product.stock} عدد باقی‌مانده!
            </span>
          </div>
        )}
        <button
          onClick={(e) => { e.stopPropagation(); addToCart(product); }}
          className="absolute bottom-3 right-3 w-10 h-10 bg-[#00C07F] text-white rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 shadow-lg shadow-[#00C07F]/20"
        >
          <i className="fas fa-plus"></i>
        </button>
      </div>
      <div className="p-4 cursor-pointer" onClick={() => { setSelectedProduct(product); navigate('product'); }}>
        <p className="text-xs text-[#9CA3AF] mb-1">{product.brand}</p>
        <h3 className="text-sm font-bold text-[#1a1a2e] mb-2 line-clamp-2">{product.name}</h3>
        <div className="flex items-center gap-1 mb-3">
          <i className="fas fa-star text-[#F59E0B] text-xs"></i>
          <span className="text-xs text-[#9CA3AF]">{product.rating} ({product.reviews})</span>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-lg font-black gradient-text">{(product.price / 10000).toFixed(0)}</span>
            <span className="text-xs text-[#9CA3AF] mr-1">هزار تومان</span>
          </div>
          {product.originalPrice && (
            <span className="text-xs text-[#9CA3AF] line-through">{(product.originalPrice / 10000).toFixed(0)}</span>
          )}
        </div>
      </div>
    </div>
  );
}

// Featured Products
function FeaturedProducts() {
  const { navigate } = useApp();
  const featured = products.filter(p => p.isBestseller || p.isNew).slice(0, 8);

  return (
    <section className="py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-[#1a1a2e]">
            محصولات <span className="gradient-text">ویژه</span> ✨
          </h2>
          <button onClick={() => navigate('shop')} className="text-sm text-[#00C07F] hover:underline font-medium">مشاهده همه</button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {featured.map((product, index) => (
            <div key={product.id} style={{ animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both` }}>
              <ProductCard product={product} />
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
      <HeroSection />
      <CategorySection />
      <FeaturedProducts />
    </main>
  );
}
