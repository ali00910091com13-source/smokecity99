import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { reviews } from '../data/products';

export default function ProductDetailPage() {
  const { selectedProduct, addToCart, navigate } = useApp();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedFlavor, setSelectedFlavor] = useState(selectedProduct?.flavors?.[0] || '');
  const [selectedColor, setSelectedColor] = useState(selectedProduct?.colors?.[0] || '');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('specs');

  if (!selectedProduct) {
    return (
      <div className="pt-24 pb-12 px-4 min-h-screen text-center">
        <p className="text-[#6b7280]">محصولی انتخاب نشده است</p>
        <button onClick={() => navigate('shop')} className="mt-4 text-[#00C07F] hover:underline">بازگشت به فروشگاه</button>
      </div>
    );
  }

  const productReviews = reviews.filter(r => r.productId === selectedProduct.id);

  return (
    <section className="pt-24 pb-24 md:pb-12 px-4 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <button onClick={() => navigate('shop')} className="flex items-center gap-2 text-[#6b7280] hover:text-[#00C07F] transition-colors mb-6">
          <i className="fas fa-arrow-right"></i>
          <span className="text-sm">بازگشت به فروشگاه</span>
        </button>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="glass rounded-2xl overflow-hidden aspect-square relative shadow-soft">
              <img src={selectedProduct.images[selectedImage]} alt={selectedProduct.name} className="w-full h-full object-cover product-img-zoom" />
              {selectedProduct.originalPrice && (
                <span className="absolute top-4 right-4 px-3 py-1 bg-[#EC4899] text-white text-sm font-bold rounded-lg">
                  {Math.round(((selectedProduct.originalPrice - selectedProduct.price) / selectedProduct.originalPrice) * 100)}% تخفیف
                </span>
              )}
            </div>
            {selectedProduct.images.length > 1 && (
              <div className="flex gap-3">
                {selectedProduct.images.map((img, i) => (
                  <button key={i} onClick={() => setSelectedImage(i)} className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all shadow-soft ${i === selectedImage ? 'border-[#00C07F]' : 'border-transparent opacity-60 hover:opacity-100'}`}>
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <p className="text-sm text-[#00C07F] mb-1 font-medium">{selectedProduct.brand}</p>
              <h1 className="text-2xl md:text-3xl font-black text-[#1a1a2e] mb-2">{selectedProduct.name}</h1>
              <p className="text-sm text-[#9CA3AF]">{selectedProduct.nameEn}</p>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex gap-0.5">
                {[1,2,3,4,5].map(i => (
                  <i key={i} className={`fas fa-star text-sm ${i <= Math.round(selectedProduct.rating) ? 'text-[#F59E0B]' : 'text-[#E5E7EB]'}`}></i>
                ))}
              </div>
              <span className="text-sm text-[#6b7280]">{selectedProduct.rating} از ۵ ({selectedProduct.reviews} نظر)</span>
            </div>

            <div className="flex items-end gap-3">
              <span className="text-3xl font-black gradient-text">{(selectedProduct.price / 10000).toFixed(0)}</span>
              <span className="text-[#6b7280] text-sm mb-1">هزار تومان</span>
              {selectedProduct.originalPrice && (
                <span className="text-[#9CA3AF] line-through text-sm mb-1">{(selectedProduct.originalPrice / 10000).toFixed(0)} هزار</span>
              )}
            </div>

            {selectedProduct.flavors && selectedProduct.flavors.length > 0 && (
              <div>
                <h3 className="text-sm font-bold text-[#4b5563] mb-3">انتخاب طعم:</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedProduct.flavors.map(f => (
                    <button key={f} onClick={() => setSelectedFlavor(f)} className={`px-4 py-2 rounded-xl text-sm transition-all ${selectedFlavor === f ? 'bg-[#00C07F] text-white font-bold shadow-md' : 'glass text-[#4b5563] hover:text-[#1a1a2e] shadow-soft'}`}>
                      {f}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {selectedProduct.colors && selectedProduct.colors.length > 0 && (
              <div>
                <h3 className="text-sm font-bold text-[#4b5563] mb-3">رنگ بدنه:</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedProduct.colors.map(c => (
                    <button key={c} onClick={() => setSelectedColor(c)} className={`px-4 py-2 rounded-xl text-sm transition-all ${selectedColor === c ? 'bg-[#0891B2] text-white font-bold shadow-md' : 'glass text-[#4b5563] hover:text-[#1a1a2e] shadow-soft'}`}>
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            )}

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

            <div className={`text-sm font-medium ${selectedProduct.stock <= 5 ? 'text-red-500' : 'text-[#00C07F]'}`}>
              {selectedProduct.stock <= 5 ? `⚠️ فقط ${selectedProduct.stock} عدد باقی‌مانده` : `✓ موجود در انبار (${selectedProduct.stock} عدد)`}
            </div>

            <button
              onClick={() => addToCart(selectedProduct, quantity, selectedFlavor, selectedColor)}
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
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex-1 py-3 rounded-xl text-sm font-medium transition-all flex items-center justify-center gap-2 ${activeTab === tab.id ? 'bg-gradient-to-r from-[#00C07F] to-[#0891B2] text-white shadow-md' : 'text-[#6b7280] hover:text-[#1a1a2e]'}`}>
                <i className={`fas ${tab.icon} text-xs`}></i>
                {tab.label}
              </button>
            ))}
          </div>

          <div className="glass rounded-2xl p-6 shadow-soft">
            {activeTab === 'specs' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {selectedProduct.battery && <SpecRow label="باتری" value={selectedProduct.battery} icon="fa-battery-full" />}
                {selectedProduct.wattage && <SpecRow label="توان خروجی" value={selectedProduct.wattage} icon="fa-bolt" />}
                {selectedProduct.port && <SpecRow label="پورت شارژ" value={selectedProduct.port} icon="fa-plug" />}
                {selectedProduct.capacity && <SpecRow label="ظرفیت" value={selectedProduct.capacity} icon="fa-flask" />}
                {selectedProduct.nicotine && <SpecRow label="نیکوتین" value={`${selectedProduct.nicotine} mg`} icon="fa-vial" />}
                <SpecRow label="برند" value={selectedProduct.brand} icon="fa-tag" />
              </div>
            )}
            {activeTab === 'desc' && (
              <p className="text-[#4b5563] leading-8 text-sm">{selectedProduct.description}</p>
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
