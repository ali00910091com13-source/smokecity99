import { Link, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function BottomNav() {
  const { cartItems, setCartOpen } = useApp();
  const location = useLocation();
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="bottom-nav md:hidden">
      <div className="glass-strong border-t border-[#E5E7EB] px-2 py-2 flex items-center justify-around shadow-soft">
        <Link
          to="/"
          className={`flex flex-col items-center gap-1 py-2 px-2 rounded-xl transition-all animate__animated ${
            isActive('/') ? 'text-[#00C07F] animate__pulse' : 'text-[#6b7280]'
          }`}
        >
          <i className="fas fa-home text-lg"></i>
          <span className="text-[10px]">خانه</span>
        </Link>
        
        <Link
          to="/shop"
          className={`flex flex-col items-center gap-1 py-2 px-2 rounded-xl transition-all animate__animated ${
            isActive('/shop') ? 'text-[#00C07F] animate__pulse' : 'text-[#6b7280]'
          }`}
        >
          <i className="fas fa-store text-lg"></i>
          <span className="text-[10px]">فروشگاه</span>
        </Link>
        
        <button
          onClick={() => setCartOpen(true)}
          className="relative flex flex-col items-center gap-1 py-2 px-2 rounded-xl text-[#6b7280] animate__animated animate__heartBeat animate__slow animate__infinite"
        >
          <i className="fas fa-shopping-bag text-lg"></i>
          <span className="text-[10px]">سبد</span>
          {cartCount > 0 && (
            <span className="absolute -top-1 right-0 w-5 h-5 bg-[#00C07F] text-white text-[10px] font-bold rounded-full flex items-center justify-center animate__animated animate__bounce">
              {cartCount}
            </span>
          )}
        </button>

        <Link
          to="/blog"
          className={`flex flex-col items-center gap-1 py-2 px-2 rounded-xl transition-all animate__animated ${
            isActive('/blog') ? 'text-[#00C07F] animate__pulse' : 'text-[#6b7280]'
          }`}
        >
          <i className="fas fa-blog text-lg"></i>
          <span className="text-[10px]">بلاگ</span>
        </Link>

        <Link
          to="/contact"
          className={`flex flex-col items-center gap-1 py-2 px-2 rounded-xl transition-all animate__animated ${
            isActive('/contact') ? 'text-[#00C07F] animate__pulse' : 'text-[#6b7280]'
          }`}
        >
          <i className="fas fa-phone text-lg"></i>
          <span className="text-[10px]">تماس</span>
        </Link>
      </div>
    </div>
  );
}
