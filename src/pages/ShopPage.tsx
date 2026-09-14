import { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { products, categories, brands, flavorProfiles, nicotineLevels, Product } from '../data/products';

export default function ShopPage() {
  const { selectedCategory, setSelectedCategory, addToCart, setSelectedProduct, navigate } = useApp();
  const [activeTab, setActiveTab] = useState(selectedCategory || 'all');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedFlavor, setSelectedFlavor] = useState('');
  const [selectedNicotine, setSelectedNicotine] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000000]);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('popular');

  useEffect(() => {
    if (selectedCategory) {
      setActiveTab(selectedCategory);
    }
  }, [selectedCategory]);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    setSelectedCategory(tabId === 'all' ? '' : tabId);
  };

  const filteredProducts = products.filter(p => {
    if (activeTab !== 'all' && p.category !== activeTab) return false;
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

  const getCategoryCount = (catId: string) => {
    if (catId === 'all') return products.length;
    return products.filter(p => p.category === catId).length;
  };

  const ProductCard = ({ product }: { product: Product }) => {
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
  };

  return (
    <section className="pt-24 pb-24 md:pb-12 px-4 min-h-screen">
      <div className="max-w-7xl mx-auto">
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
                activeTab === 'all' ? 'bg-gradient-to-r from-[#00C07F] to-[#0891B2] text-white shadow-lg shadow-[#00C07F]/20' : 'glass text-[#4b5563] hover:text-[#1a1a2e] shadow-soft'
              }`}
            >
              همه ({getCategoryCount('all')})
            </button>
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => handleTabChange(cat.id)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap flex items-center gap-2 overflow-hidden ${
                  activeTab === cat.id ? 'bg-gradient-to-r from-[#00C07F] to-[#0891B2] text-white shadow-lg shadow-[#00C07F]/20' : 'glass text-[#4b5563] hover:text-[#1a1a2e] shadow-soft'
                }`}
              >
                <div className="relative w-8 h-8 rounded-lg overflow-hidden flex-shrink-0">
                  <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" />
                </div>
                <span className="hidden sm:inline">{cat.name}</span>
                <span className="text-xs opacity-70">({getCategoryCount(cat.id)})</span>
              </button>
            ))}
          </div>
        </div>

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
              <div className="glass rounded-2xl p-4 shadow-soft">
                <h3 className="font-bold text-sm mb-3 text-[#4b5563]">مرتب‌سازی</h3>
                <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="w-full bg-white text-[#1a1a2e] text-sm rounded-lg p-2.5 border border-[#E5E7EB] outline-none focus:border-[#00C07F] transition-colors">
                  <option value="popular">محبوب‌ترین</option>
                  <option value="price-low">ارزان‌ترین</option>
                  <option value="price-high">گران‌ترین</option>
                  <option value="rating">بالاترین امتیاز</option>
                </select>
              </div>

              <div className="glass rounded-2xl p-4 shadow-soft">
                <h3 className="font-bold text-sm mb-3 text-[#4b5563]">برند</h3>
                <div className="space-y-1 max-h-48 overflow-y-auto no-scrollbar">
                  <button onClick={() => setSelectedBrand('')} className={`w-full text-right text-sm p-2 rounded-lg transition-colors ${!selectedBrand ? 'bg-[#00C07F]/10 text-[#00C07F] font-medium' : 'text-[#6b7280] hover:text-[#1a1a2e] hover:bg-[#F5F5F7]'}`}>
                    همه برندها
                  </button>
                  {brands.map(brand => (
                    <button key={brand} onClick={() => setSelectedBrand(brand === selectedBrand ? '' : brand)} className={`w-full text-right text-sm p-2 rounded-lg transition-colors ${selectedBrand === brand ? 'bg-[#00C07F]/10 text-[#00C07F] font-medium' : 'text-[#6b7280] hover:text-[#1a1a2e] hover:bg-[#F5F5F7]'}`}>
                      {brand}
                    </button>
                  ))}
                </div>
              </div>

              <div className="glass rounded-2xl p-4 shadow-soft">
                <h3 className="font-bold text-sm mb-3 text-[#4b5563]">طعم‌سنج</h3>
                <div className="flex flex-wrap gap-2">
                  {flavorProfiles.map(fp => (
                    <button key={fp.id} onClick={() => setSelectedFlavor(fp.id === selectedFlavor ? '' : fp.id)} className={`px-3 py-1.5 rounded-full text-xs transition-all ${selectedFlavor === fp.id ? 'bg-[#00C07F] text-white font-bold shadow-md' : 'bg-white border border-[#E5E7EB] text-[#6b7280] hover:border-[#00C07F] hover:text-[#00C07F]'}`}>
                      {fp.icon} {fp.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="glass rounded-2xl p-4 shadow-soft">
                <h3 className="font-bold text-sm mb-3 text-[#4b5563]">سطح نیکوتین (mg)</h3>
                <div className="flex flex-wrap gap-2">
                  {nicotineLevels.map(n => (
                    <button key={n} onClick={() => setSelectedNicotine(n === selectedNicotine ? '' : n)} className={`w-10 h-10 rounded-xl text-xs font-bold transition-all ${selectedNicotine === n ? 'bg-[#00C07F] text-white shadow-md' : 'bg-white border border-[#E5E7EB] text-[#6b7280] hover:border-[#00C07F] hover:text-[#00C07F]'}`}>
                      {n}
                    </button>
                  ))}
                </div>
              </div>

              <div className="glass rounded-2xl p-4 shadow-soft">
                <h3 className="font-bold text-sm mb-3 text-[#4b5563]">محدوده قیمت</h3>
                <input type="range" min="0" max="5000000" step="100000" value={priceRange[1]} onChange={e => setPriceRange([priceRange[0], parseInt(e.target.value)])} className="w-full accent-[#00C07F]" />
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
                {filteredProducts.map((product, index) => (
                  <div key={product.id} style={{ animation: `fadeInUp 0.6s ease-out ${index * 0.05}s both` }}>
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <span className="text-6xl mb-4 block">🔍</span>
                <p className="text-[#6b7280] text-lg">محصولی با این فیلترها یافت نشد</p>
                <button onClick={() => { setActiveTab('all'); setSelectedCategory(''); setSelectedBrand(''); setSelectedFlavor(''); setSelectedNicotine(''); }} className="mt-4 text-[#00C07F] hover:underline text-sm font-medium">
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
