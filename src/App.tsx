import { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Header from './components/Header';
import Footer from './components/Footer';
import BottomNav from './components/BottomNav';
import SearchModal from './components/SearchModal';
import CartSlideOut from './components/CartSlideOut';
import AgeGate from './components/AgeGate';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import ProductDetailPage from './pages/ProductDetailPage';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import ContactPage from './pages/ContactPage';
import CheckoutPage from './pages/CheckoutPage';

function AppContent() {
  const { currentPage } = useApp();
  const [ageVerified, setAgeVerified] = useState(false);

  if (!ageVerified) {
    return <AgeGate onVerify={() => setAgeVerified(true)} />;
  }

  return (
    <div className="min-h-screen bg-[#F5F5F7] text-[#1a1a2e]" dir="rtl">
      <Header />
      <SearchModal />
      <CartSlideOut />

      {currentPage === 'home' && <HomePage />}
      {currentPage === 'shop' && <ShopPage />}
      {currentPage === 'product' && <ProductDetailPage />}
      {currentPage === 'blog' && <BlogPage />}
      {currentPage === 'blogPost' && <BlogPostPage />}
      {currentPage === 'contact' && <ContactPage />}
      {currentPage === 'checkout' && <CheckoutPage />}

      <Footer />
      <BottomNav />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
