import { useApp } from '../context/AppContext';

export default function BottomNav() {
  const { cartItems, setCartOpen, currentPage, navigate } = useApp();
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="bottom-nav md:hidden">
      <div className="glass-strong border-t border-[#E5E7EB] px-4 py-2 flex items-center justify-around shadow-soft">
        <button
          onClick={() => navigate('home')}
          className={`flex flex-col items-center gap-1 py-2 px-3 rounded-xl transition-all ${currentPage === 'home' ? 'text-[#00C07F]' : 'text-[#6b7280]'}`}
        >
          <i className="fas fa-home text-lg"></i>
          <span className="text-[10px]">خانه</span>
        </button>
        <button
          onClick={() => navigate('shop')}
          className={`flex flex-col items-center gap-1 py-2 px-3 rounded-xl transition-all ${currentPage === 'shop' ? 'text-[#00C07F]' : 'text-[#6b7280]'}`}
        >
          <i className="fas fa-store text-lg"></i>
          <span className="text-[10px]">فروشگاه</span>
        </button>
        <button
          onClick={() => setCartOpen(true)}
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
        <button
          onClick={() => navigate('blog')}
          className={`flex flex-col items-center gap-1 py-2 px-3 rounded-xl transition-all ${currentPage === 'blog' || currentPage === 'blogPost' ? 'text-[#00C07F]' : 'text-[#6b7280]'}`}
        >
          <i className="fas fa-blog text-lg"></i>
          <span className="text-[10px]">بلاگ</span>
        </button>
        <button
          onClick={() => navigate('contact')}
          className={`flex flex-col items-center gap-1 py-2 px-3 rounded-xl transition-all ${currentPage === 'contact' ? 'text-[#00C07F]' : 'text-[#6b7280]'}`}
        >
          <i className="fas fa-phone text-lg"></i>
          <span className="text-[10px]">تماس</span>
        </button>
      </div>
    </div>
  );
}
