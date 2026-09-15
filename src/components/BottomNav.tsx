import { motion } from 'framer-motion';
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
          className={`flex flex-col items-center gap-1 py-2 px-2 rounded-xl transition-all ${
            isActive('/') ? 'text-[#00C07F]' : 'text-[#6b7280]'
          }`}
        >
          <motion.i 
            className="fas fa-home text-lg"
            animate={isActive('/') ? { scale: [1, 1.2, 1] } : {}}
            transition={{ duration: 0.5 }}
          />
          <span className="text-[10px]">خانه</span>
        </Link>
        
        <Link
          to="/shop"
          className={`flex flex-col items-center gap-1 py-2 px-2 rounded-xl transition-all ${
            isActive('/shop') ? 'text-[#00C07F]' : 'text-[#6b7280]'
          }`}
        >
          <motion.i 
            className="fas fa-store text-lg"
            animate={isActive('/shop') ? { scale: [1, 1.2, 1] } : {}}
            transition={{ duration: 0.5 }}
          />
          <span className="text-[10px]">فروشگاه</span>
        </Link>
        
        <motion.button
          onClick={() => setCartOpen(true)}
          className="relative flex flex-col items-center gap-1 py-2 px-2 rounded-xl text-[#6b7280]"
          whileTap={{ scale: 0.9 }}
        >
          <motion.i 
            className="fas fa-shopping-bag text-lg"
            animate={{ 
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <span className="text-[10px]">سبد</span>
          {cartCount > 0 && (
            <motion.span 
              className="absolute -top-1 right-0 w-5 h-5 bg-[#00C07F] text-white text-[10px] font-bold rounded-full flex items-center justify-center"
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.3, 1] }}
              transition={{ duration: 0.5 }}
            >
              {cartCount}
            </motion.span>
          )}
        </motion.button>

        <Link
          to="/blog"
          className={`flex flex-col items-center gap-1 py-2 px-2 rounded-xl transition-all ${
            isActive('/blog') ? 'text-[#00C07F]' : 'text-[#6b7280]'
          }`}
        >
          <motion.i 
            className="fas fa-blog text-lg"
            animate={isActive('/blog') ? { scale: [1, 1.2, 1] } : {}}
            transition={{ duration: 0.5 }}
          />
          <span className="text-[10px]">بلاگ</span>
        </Link>

        <Link
          to="/contact"
          className={`flex flex-col items-center gap-1 py-2 px-2 rounded-xl transition-all ${
            isActive('/contact') ? 'text-[#00C07F]' : 'text-[#6b7280]'
          }`}
        >
          <motion.i 
            className="fas fa-phone text-lg"
            animate={isActive('/contact') ? { scale: [1, 1.2, 1] } : {}}
            transition={{ duration: 0.5 }}
          />
          <span className="text-[10px]">تماس</span>
        </Link>
      </div>
    </div>
  );
}
