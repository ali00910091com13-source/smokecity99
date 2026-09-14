import { useApp } from '../context/AppContext';

export default function CartSlideOut() {
  const { cartOpen, setCartOpen, cartItems, updateQuantity, removeFromCart, navigate } = useApp();
  const total = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  if (!cartOpen) return null;

  return (
    <div className="fixed inset-0 z-[70]">
      <div className="absolute inset-0 bg-[#1a1a2e]/40 backdrop-blur-sm" onClick={() => setCartOpen(false)}></div>
      <div className="absolute top-0 right-0 bottom-0 w-full max-w-md glass-strong animate-slide-in-right overflow-y-auto shadow-soft">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-[#1a1a2e]">
              <i className="fas fa-shopping-bag text-[#00C07F] ml-2"></i>
              سبد خرید
            </h2>
            <button onClick={() => setCartOpen(false)} className="w-10 h-10 glass rounded-xl flex items-center justify-center hover:text-[#EC4899] transition-colors shadow-soft">
              <i className="fas fa-times"></i>
            </button>
          </div>

          {/* Items */}
          {cartItems.length > 0 ? (
            <>
              <div className="space-y-4 mb-6">
                {cartItems.map(item => (
                  <div key={item.product.id} className="glass rounded-xl p-4 flex gap-3 shadow-soft">
                    <img src={item.product.image} alt={item.product.name} className="w-16 h-16 rounded-lg object-cover" />
                    <div className="flex-1">
                      <h4 className="text-sm font-bold text-[#1a1a2e] mb-1 line-clamp-1">{item.product.name}</h4>
                      {item.selectedFlavor && (
                        <p className="text-xs text-[#9CA3AF] mb-1">طعم: {item.selectedFlavor}</p>
                      )}
                      <p className="text-sm text-[#00C07F] font-bold">{(item.product.price / 10000).toFixed(0)} هزار تومان</p>
                    </div>
                    <div className="flex flex-col items-end justify-between">
                      <button onClick={() => removeFromCart(item.product.id)} className="text-[#9CA3AF] hover:text-[#EC4899] transition-colors">
                        <i className="fas fa-trash text-xs"></i>
                      </button>
                      <div className="flex items-center gap-2">
                        <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="w-6 h-6 glass rounded flex items-center justify-center text-xs hover:text-[#00C07F] shadow-soft">
                          -
                        </button>
                        <span className="text-sm font-bold w-4 text-center text-[#1a1a2e]">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="w-6 h-6 glass rounded flex items-center justify-center text-xs hover:text-[#00C07F] shadow-soft">
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Total */}
              <div className="glass rounded-xl p-4 mb-4 shadow-soft">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[#6b7280] text-sm">جمع کل:</span>
                  <span className="text-xl font-black gradient-text">{(total / 10000).toFixed(0)} هزار تومان</span>
                </div>
                <p className="text-xs text-[#9CA3AF]">هزینه ارسال در مرحله بعد محاسبه می‌شود</p>
              </div>

              <button
                onClick={() => { setCartOpen(false); navigate('checkout'); }}
                className="w-full btn-accent py-4 rounded-2xl text-lg"
              >
                ادامه فرآیند خرید
              </button>
            </>
          ) : (
            <div className="text-center py-16">
              <span className="text-6xl mb-4 block">🛒</span>
              <p className="text-[#6b7280] mb-4">سبد خرید شما خالی است</p>
              <button onClick={() => { setCartOpen(false); navigate('shop'); }} className="text-[#00C07F] hover:underline text-sm font-medium">
                بازگشت به فروشگاه
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
