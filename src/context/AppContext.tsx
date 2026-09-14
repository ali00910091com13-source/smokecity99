import { createContext, useContext, useState, ReactNode } from 'react';
import { Product, CartItem } from '../data/products';

type Page = 'home' | 'shop' | 'product' | 'blog' | 'blogPost' | 'contact' | 'checkout';

interface AppContextType {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
  selectedBlogId: number | null;
  setSelectedBlogId: (id: number | null) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  cartItems: CartItem[];
  addToCart: (product: Product, qty?: number, flavor?: string, color?: string) => void;
  updateQuantity: (id: number, qty: number) => void;
  removeFromCart: (id: number) => void;
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  searchOpen: boolean;
  setSearchOpen: (open: boolean) => void;
  navigate: (page: Page) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedBlogId, setSelectedBlogId] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const navigate = (page: Page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addToCart = (product: Product, qty: number = 1, flavor?: string, color?: string) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + qty }
            : item
        );
      }
      return [...prev, { product, quantity: qty, selectedFlavor: flavor, selectedColor: color }];
    });
    setCartOpen(true);
  };

  const updateQuantity = (id: number, qty: number) => {
    if (qty <= 0) {
      setCartItems(prev => prev.filter(item => item.product.id !== id));
    } else {
      setCartItems(prev => prev.map(item =>
        item.product.id === id ? { ...item, quantity: qty } : item
      ));
    }
  };

  const removeFromCart = (id: number) => {
    setCartItems(prev => prev.filter(item => item.product.id !== id));
  };

  return (
    <AppContext.Provider value={{
      currentPage, setCurrentPage,
      selectedProduct, setSelectedProduct,
      selectedBlogId, setSelectedBlogId,
      selectedCategory, setSelectedCategory,
      cartItems, addToCart, updateQuantity, removeFromCart,
      cartOpen, setCartOpen,
      searchOpen, setSearchOpen,
      navigate,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
}
