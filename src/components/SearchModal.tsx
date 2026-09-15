import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { products, categories } from '../data/products';

export default function SearchModal() {
  const { searchOpen, setSearchOpen, setSelectedProduct } = useApp();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchOpen && inputRef.current) {
      inputRef.current.focus();
    }
    if (!searchOpen) setQuery('');
  }, [searchOpen]);

  const filteredProducts = query.length > 0
    ? products.filter(p =>
        p.name.includes(query) ||
        p.nameEn.toLowerCase().includes(query.toLowerCase()) ||
        p.brand.toLowerCase().includes(query.toLowerCase()) ||
        p.category.includes(query)
      )
    : [];

  const handleSelect = (product: typeof products[0]) => {
    setSelectedProduct(product);
    navigate('/product');
    setSearchOpen(false);
  };

  if (!searchOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] bg-[#1a1a2e]/50 backdrop-blur-sm" onClick={() => setSearchOpen(false)}>
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
            <button onClick={() => setSearchOpen(false)} className="text-[#9CA3AF] hover:text-[#1a1a2e] transition-colors">
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
                      onClick={() => handleSelect(product)}
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
