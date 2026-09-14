import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { LogoMain } from './Logo';

export default function Header() {
  const { cartItems, setCartOpen, setSearchOpen } = useApp();
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'glass-strong shadow-soft border-b border-[#00C07F]/10' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="group-hover:scale-110 transition-transform duration-300">
            <LogoMain className="w-14 h-14 md:w-16 md:h-16" />
          </div>
          <span className="text-xl md:text-2xl font-black bg-gradient-to-r from-[#00C07F] via-[#8B5CF6] to-[#F59E0B] bg-clip-text text-transparent">
            اسموک سیتی
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            to="/"
            className={`text-sm font-medium transition-colors hover:text-[#00C07F] ${isActive('/') ? 'text-[#00C07F]' : 'text-[#4b5563]'}`}
          >
            خانه
          </Link>
          <Link
            to="/shop"
            className={`text-sm font-medium transition-colors hover:text-[#00C07F] ${isActive('/shop') ? 'text-[#00C07F]' : 'text-[#4b5563]'}`}
          >
            فروشگاه
          </Link>
          <Link
            to="/blog"
            className={`text-sm font-medium transition-colors hover:text-[#00C07F] ${isActive('/blog') ? 'text-[#00C07F]' : 'text-[#4b5563]'}`}
          >
            بلاگ
          </Link>
          <Link
            to="/contact"
            className={`text-sm font-medium transition-colors hover:text-[#00C07F] ${isActive('/contact') ? 'text-[#00C07F]' : 'text-[#4b5563]'}`}
          >
            تماس با ما
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSearchOpen(true)}
            className="w-10 h-10 rounded-xl glass flex items-center justify-center hover:border-[#00C07F]/30 transition-all shadow-soft"
          >
            <i className="fas fa-search text-[#4b5563]"></i>
          </button>
          <button
            onClick={() => setCartOpen(true)}
            className="relative w-10 h-10 rounded-xl glass flex items-center justify-center hover:border-[#00C07F]/30 transition-all shadow-soft"
          >
            <i className="fas fa-shopping-bag text-[#4b5563]"></i>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#00C07F] text-white text-xs font-bold rounded-full flex items-center justify-center animate-bounce-badge">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
