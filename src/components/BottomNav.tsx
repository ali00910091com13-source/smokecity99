import { Link, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function BottomNav() {
  const { cartItems, setCartOpen } = useApp();
  const location = useLocation();
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="bottom-nav md:hidden">
      <div className="glass-strong border-t border-[#E5E7EB] px-4 py-2 flex items-center justify-around shadow-soft">
        <Link
          to="/"
          className={`flex flex-col items-center gap-1 py-2 px-3 rounded-xl transition-all ${isActive('/') ? 'text-[#00C07F]' : 'text-[#6b7280]'}`}
        >
          <i className="fas fa-home text-lg"></i>
          <span className="text-[10px]">خانه</span>
        </Link>
        <Link
          to="/shop"
          className={`flex flex-col items-center gap-1 py-2 px-3 rounded-xl transition-all ${isActive('/shop') ? 'text-[#00C07F]' : 'text-[#6b7280]'}`}
        >
          <i className="fas fa-store text-lg"></i>
          <span className="text-[10px]">فروشگاه</span>
        </Link>
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
        <Link
          to="/account"
          className={`flex flex-col items-center gap-1 py-2 px-3 rounded-xl transition-all ${isActive('/account') ? 'text-[#00C07F]' : 'text-[#6b7280]'}`}
        >
          <i className="fas fa-user text-lg"></i>
          <span className="text-[10px]">حساب من</span>
        </Link>
      </div>
    </div>
  );
}
