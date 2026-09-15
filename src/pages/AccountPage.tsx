import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { products } from '../data/products';

export default function AccountPage() {
  const { userInfo, setUserInfo, orders, likedProducts, toggleLike, addToCart } = useApp();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'active' | 'history' | 'likes'>('active');

  if (!userInfo) {
    return (
      <section className="pt-24 pb-12 px-4 min-h-screen flex items-center justify-center">
        <div className="glass rounded-3xl p-12 max-w-md text-center shadow-soft">
          <div className="w-20 h-20 bg-gradient-to-br from-[#00C07F] to-[#0891B2] rounded-full flex items-center justify-center mx-auto mb-6">
            <i className="fas fa-user text-white text-3xl"></i>
          </div>
          <h2 className="text-2xl font-bold text-[#1a1a2e] mb-4">لطفاً وارد شوید</h2>
          <p className="text-[#6b7280] mb-6">برای دسترسی به حساب کاربری، ابتدا وارد شوید</p>
          <button onClick={() => navigate('/checkout')} className="btn-accent px-8 py-3 rounded-xl">
            ورود با گوگل
          </button>
        </div>
      </section>
    );
  }

  const activeOrders = orders.filter(o => o.status === 'processing' || o.status === 'shipped');
  const historyOrders = orders.filter(o => o.status === 'delivered');
  const likedProductsList = products.filter(p => likedProducts.includes(p.id));

  const handleLogout = () => {
    setUserInfo(null);
    navigate('/');
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'processing':
        return <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-xs font-bold rounded-full">در حال پردازش</span>;
      case 'shipped':
        return <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full">ارسال شده</span>;
      case 'delivered':
        return <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">تحویل داده شده</span>;
      default:
        return null;
    }
  };

  return (
    <section className="pt-24 pb-12 px-4 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="glass rounded-3xl p-8 mb-8 shadow-soft">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <img 
              src={userInfo.avatar} 
              alt={userInfo.name} 
              className="w-24 h-24 rounded-full border-4 border-[#00C07F]/20"
            />
            <div className="flex-1 text-center md:text-right">
              <h1 className="text-3xl font-black text-[#1a1a2e] mb-2">{userInfo.name}</h1>
              <p className="text-[#6b7280] mb-4">{userInfo.email}</p>
              <div className="flex gap-4 justify-center md:justify-start">
                <div className="text-center">
                  <div className="text-2xl font-black text-[#00C07F]">{orders.length}</div>
                  <div className="text-xs text-[#6b7280]">سفارش</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-black text-[#8B5CF6]">{likedProducts.length}</div>
                  <div className="text-xs text-[#6b7280]">علاقه‌مندی</div>
                </div>
              </div>
            </div>
            <button 
              onClick={handleLogout}
              className="px-6 py-3 glass rounded-xl text-[#EC4899] hover:bg-[#EC4899]/10 transition-colors"
            >
              <i className="fas fa-sign-out-alt ml-2"></i>
              خروج
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('active')}
            className={`px-6 py-3 rounded-xl font-medium transition-all whitespace-nowrap ${
              activeTab === 'active'
                ? 'bg-gradient-to-r from-[#00C07F] to-[#0891B2] text-white shadow-lg'
                : 'glass text-[#4b5563] hover:text-[#1a1a2e]'
            }`}
          >
            <i className="fas fa-box ml-2"></i>
            سفارشات فعال ({activeOrders.length})
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`px-6 py-3 rounded-xl font-medium transition-all whitespace-nowrap ${
              activeTab === 'history'
                ? 'bg-gradient-to-r from-[#00C07F] to-[#0891B2] text-white shadow-lg'
                : 'glass text-[#4b5563] hover:text-[#1a1a2e]'
            }`}
          >
            <i className="fas fa-history ml-2"></i>
            تاریخچه ({historyOrders.length})
          </button>
          <button
            onClick={() => setActiveTab('likes')}
            className={`px-6 py-3 rounded-xl font-medium transition-all whitespace-nowrap ${
              activeTab === 'likes'
                ? 'bg-gradient-to-r from-[#00C07F] to-[#0891B2] text-white shadow-lg'
                : 'glass text-[#4b5563] hover:text-[#1a1a2e]'
            }`}
          >
            <i className="fas fa-heart ml-2"></i>
            علاقه‌مندی‌ها ({likedProducts.length})
          </button>
        </div>

        {/* Content */}
        <div className="glass rounded-2xl p-6 shadow-soft">
          {/* Active Orders */}
          {activeTab === 'active' && (
            <div>
              <h2 className="text-2xl font-bold text-[#1a1a2e] mb-6">سفارشات فعال</h2>
              {activeOrders.length > 0 ? (
                <div className="space-y-4">
                  {activeOrders.map(order => (
                    <div key={order.id} className="glass rounded-xl p-4 border border-[#E5E7EB]">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <p className="text-sm text-[#6b7280]">شماره سفارش: <span className="font-bold text-[#1a1a2e]">#{order.id}</span></p>
                          <p className="text-xs text-[#9CA3AF]">{order.date}</p>
                        </div>
                        {getStatusBadge(order.status)}
                      </div>
                      <div className="space-y-2 mb-4">
                        {order.items.map(item => (
                          <div key={item.product.id} className="flex items-center gap-3">
                            <img src={item.product.image} alt={item.product.name} className="w-12 h-12 rounded-lg object-cover" />
                            <div className="flex-1">
                              <p className="text-sm font-bold text-[#1a1a2e]">{item.product.name}</p>
                              <p className="text-xs text-[#6b7280]">تعداد: {item.quantity}</p>
                            </div>
                            <p className="text-sm font-bold text-[#00C07F]">{(item.product.price / 10000).toFixed(0)} هزار</p>
                          </div>
                        ))}
                      </div>
                      <div className="flex justify-between items-center pt-4 border-t border-[#E5E7EB]">
                        <span className="text-sm text-[#6b7280]">مبلغ کل:</span>
                        <span className="text-lg font-black gradient-text">{(order.total / 10000).toFixed(0)} هزار تومان</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <i className="fas fa-box-open text-6xl text-[#E5E7EB] mb-4"></i>
                  <p className="text-[#6b7280]">سفارش فعالی ندارید</p>
                  <button onClick={() => navigate('/shop')} className="mt-4 text-[#00C07F] hover:underline font-medium">
                    مشاهده محصولات
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Order History */}
          {activeTab === 'history' && (
            <div>
              <h2 className="text-2xl font-bold text-[#1a1a2e] mb-6">تاریخچه سفارشات</h2>
              {historyOrders.length > 0 ? (
                <div className="space-y-4">
                  {historyOrders.map(order => (
                    <div key={order.id} className="glass rounded-xl p-4 border border-[#E5E7EB]">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <p className="text-sm text-[#6b7280]">شماره سفارش: <span className="font-bold text-[#1a1a2e]">#{order.id}</span></p>
                          <p className="text-xs text-[#9CA3AF]">{order.date}</p>
                        </div>
                        {getStatusBadge(order.status)}
                      </div>
                      <div className="flex justify-between items-center pt-4 border-t border-[#E5E7EB]">
                        <span className="text-sm text-[#6b7280]">{order.items.length} محصول</span>
                        <span className="text-lg font-black gradient-text">{(order.total / 10000).toFixed(0)} هزار تومان</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <i className="fas fa-history text-6xl text-[#E5E7EB] mb-4"></i>
                  <p className="text-[#6b7280]">تاریخچه سفارشات خالی است</p>
                </div>
              )}
            </div>
          )}

          {/* Liked Products */}
          {activeTab === 'likes' && (
            <div>
              <h2 className="text-2xl font-bold text-[#1a1a2e] mb-6">محصولات مورد علاقه</h2>
              {likedProductsList.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {likedProductsList.map(product => (
                    <div key={product.id} className="glass rounded-xl overflow-hidden shadow-soft hover:shadow-hover transition-all group">
                      <div className="relative aspect-square overflow-hidden">
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                        <button
                          onClick={() => toggleLike(product.id)}
                          className="absolute top-2 right-2 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors"
                        >
                          <i className="fas fa-heart text-[#EC4899]"></i>
                        </button>
                      </div>
                      <div className="p-3">
                        <p className="text-xs text-[#9CA3AF] mb-1">{product.brand}</p>
                        <h3 className="text-sm font-bold text-[#1a1a2e] mb-2 line-clamp-2">{product.name}</h3>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-black gradient-text">{(product.price / 10000).toFixed(0)} هزار</span>
                          <button 
                            onClick={() => {
                              addToCart(product);
                            }}
                            className="w-8 h-8 bg-[#00C07F] text-white rounded-lg flex items-center justify-center hover:scale-110 transition-transform"
                          >
                            <i className="fas fa-plus text-xs"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <i className="fas fa-heart text-6xl text-[#E5E7EB] mb-4"></i>
                  <p className="text-[#6b7280]">محصول مورد علاقه‌ای ندارید</p>
                  <button onClick={() => navigate('/shop')} className="mt-4 text-[#00C07F] hover:underline font-medium">
                    مشاهده محصولات
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
