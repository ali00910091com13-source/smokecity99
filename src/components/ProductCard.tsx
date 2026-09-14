import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Product } from '../data/products';

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart, setSelectedProduct, toggleLike, isLiked } = useApp();
  const navigate = useNavigate();
  const discount = product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;
  const liked = isLiked(product.id);

  return (
    <div className="card-3d glass rounded-2xl overflow-hidden group">
      <div className="relative overflow-hidden aspect-square bg-gradient-to-br from-[#f8fafc] to-[#f1f5f9]">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover product-img-zoom" />
        
        {/* Badges */}
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          {product.isNew && <span className="px-2 py-1 bg-[#00C07F] text-white text-xs font-bold rounded-lg">جدید</span>}
          {product.isBestseller && <span className="px-2 py-1 bg-[#F59E0B] text-white text-xs font-bold rounded-lg">پرفروش</span>}
          {discount > 0 && <span className="px-2 py-1 bg-[#EC4899] text-white text-xs font-bold rounded-lg">{discount}% تخفیف</span>}
        </div>

        {/* Like Button */}
        <button
          onClick={(e) => { e.stopPropagation(); toggleLike(product.id); }}
          className={`absolute top-3 left-3 w-9 h-9 rounded-full flex items-center justify-center transition-all ${
            liked 
              ? 'bg-[#EC4899] text-white shadow-lg scale-110' 
              : 'bg-white/80 text-[#6b7280] hover:bg-white hover:text-[#EC4899]'
          }`}
        >
          <i className={`${liked ? 'fas' : 'far'} fa-heart text-sm`}></i>
        </button>

        {/* Quick Add Button */}
        <button
          onClick={(e) => { e.stopPropagation(); addToCart(product); }}
          className="absolute bottom-3 right-3 w-10 h-10 bg-[#00C07F] text-white rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 shadow-lg shadow-[#00C07F]/20"
        >
          <i className="fas fa-plus"></i>
        </button>
      </div>

      <div className="p-4 cursor-pointer" onClick={() => { setSelectedProduct(product); navigate('/product'); }}>
        <p className="text-xs text-[#9CA3AF] mb-1">{product.brand}</p>
        <h3 className="text-sm font-bold text-[#1a1a2e] mb-2 line-clamp-2">{product.name}</h3>
        <div className="flex items-center gap-1 mb-3">
          <i className="fas fa-star text-[#F59E0B] text-xs"></i>
          <span className="text-xs text-[#9CA3AF]">{product.rating} ({product.reviews})</span>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-lg font-black gradient-text">{(product.price / 10000).toFixed(0)}</span>
            <span className="text-xs text-[#9CA3AF] mr-1">هزار تومان</span>
          </div>
          {product.originalPrice && (
            <span className="text-xs text-[#9CA3AF] line-through">{(product.originalPrice / 10000).toFixed(0)}</span>
          )}
        </div>
      </div>
    </div>
  );
}
