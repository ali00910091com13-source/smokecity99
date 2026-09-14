import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { products as initialProducts } from '../data/products';
import { blogPosts as initialBlogPosts } from '../data/blog';
import { getProducts, saveProduct, updateProductStock, deleteProduct } from '../firebase/products';
import { getBlogPosts, saveBlogPost, deleteBlogPost } from '../firebase/blog';
import { getOrders, updateOrderStatus } from '../firebase/orders';
import { isFirebaseConfigured } from '../firebase/config';

// Admin Panel - Hidden at /admin-x9k2m7p4-q8w3e5r1
export default function AdminPanel() {
  const navigate = useNavigate();
  const { orders, addOrder } = useApp();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'dashboard' | 'products' | 'blog' | 'orders'>('dashboard');
  const [loading, setLoading] = useState(true);
  
  // Firebase Database
  const [dbProducts, setDbProducts] = useState(initialProducts);
  const [dbBlogPosts, setDbBlogPosts] = useState(initialBlogPosts);
  const [dbOrders, setDbOrders] = useState<any[]>([]);

  // Load data from Firebase
  useEffect(() => {
    const loadData = async () => {
      if (!isFirebaseConfigured()) {
        setLoading(false);
        return;
      }

      try {
        const [products, blogPosts, orders] = await Promise.all([
          getProducts(),
          getBlogPosts(),
          getOrders()
        ]);

        if (products.length > 0) setDbProducts(products);
        if (blogPosts.length > 0) setDbBlogPosts(blogPosts);
        if (orders.length > 0) setDbOrders(orders);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Admin password (change this!)
  const ADMIN_PASSWORD = 'SmokeCity@Admin2024!';

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
    } else {
      alert('رمز عبور اشتباه است!');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-[#00C07F] to-[#0891B2] rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-lock text-white text-3xl"></i>
            </div>
            <h1 className="text-2xl font-bold text-gray-800">پنل مدیریت</h1>
            <p className="text-gray-500 text-sm mt-2">اسموک سیتی - دسترسی محدود</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">رمز عبور</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#00C07F] focus:border-transparent"
                placeholder="رمز عبور را وارد کنید"
              />
            </div>
            <button
              type="submit"
              className="w-full btn-accent py-3 rounded-xl"
            >
              ورود به پنل
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <button
              onClick={() => navigate('/')}
              className="text-sm text-gray-500 hover:text-[#00C07F] transition-colors"
            >
              بازگشت به سایت
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#00C07F] to-[#0891B2] rounded-lg flex items-center justify-center">
              <i className="fas fa-cog text-white"></i>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">پنل مدیریت</h1>
              <p className="text-xs text-gray-500">اسموک سیتی</p>
            </div>
          </div>
          <button
            onClick={() => {
              setIsAuthenticated(false);
              navigate('/');
            }}
            className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <i className="fas fa-sign-out-alt ml-2"></i>
            خروج
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-6 py-3 rounded-xl font-medium transition-all whitespace-nowrap ${
              activeTab === 'dashboard'
                ? 'bg-gradient-to-r from-[#00C07F] to-[#0891B2] text-white shadow-lg'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            <i className="fas fa-chart-line ml-2"></i>
            داشبورد
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`px-6 py-3 rounded-xl font-medium transition-all whitespace-nowrap ${
              activeTab === 'products'
                ? 'bg-gradient-to-r from-[#00C07F] to-[#0891B2] text-white shadow-lg'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            <i className="fas fa-box ml-2"></i>
            محصولات ({dbProducts.length})
          </button>
          <button
            onClick={() => setActiveTab('blog')}
            className={`px-6 py-3 rounded-xl font-medium transition-all whitespace-nowrap ${
              activeTab === 'blog'
                ? 'bg-gradient-to-r from-[#00C07F] to-[#0891B2] text-white shadow-lg'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            <i className="fas fa-blog ml-2"></i>
            بلاگ ({dbBlogPosts.length})
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-6 py-3 rounded-xl font-medium transition-all whitespace-nowrap ${
              activeTab === 'orders'
                ? 'bg-gradient-to-r from-[#00C07F] to-[#0891B2] text-white shadow-lg'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            <i className="fas fa-shopping-cart ml-2"></i>
            سفارشات ({dbOrders.length})
          </button>
        </div>

        {/* Dashboard */}
        {activeTab === 'dashboard' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <i className="fas fa-box text-blue-600 text-xl"></i>
                </div>
                <span className="text-3xl font-bold text-gray-800">{dbProducts.length}</span>
              </div>
              <p className="text-gray-500">کل محصولات</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <i className="fas fa-blog text-green-600 text-xl"></i>
                </div>
                <span className="text-3xl font-bold text-gray-800">{dbBlogPosts.length}</span>
              </div>
              <p className="text-gray-500">مقالات بلاگ</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <i className="fas fa-shopping-cart text-purple-600 text-xl"></i>
                </div>
                <span className="text-3xl font-bold text-gray-800">{dbOrders.length}</span>
              </div>
              <p className="text-gray-500">سفارشات</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                  <i className="fas fa-dollar-sign text-orange-600 text-xl"></i>
                </div>
                <span className="text-3xl font-bold text-gray-800">
                  {dbOrders.reduce((sum: number, order: any) => sum + order.total, 0) > 0 
                    ? `${(dbOrders.reduce((sum: number, order: any) => sum + order.total, 0) / 10000).toFixed(0)}K`
                    : '0'}
                </span>
              </div>
              <p className="text-gray-500">درآمد کل (تومان)</p>
            </div>
          </div>
        )}

        {/* Products Management */}
        {activeTab === 'products' && (
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-800">مدیریت محصولات</h2>
                <button
                  onClick={async () => {
                    const newProduct = {
                      id: Date.now(),
                      name: 'محصول جدید',
                      nameEn: 'New Product',
                      brand: 'Brand',
                      category: 'pod',
                      price: 1000000,
                      originalPrice: 1200000,
                      image: 'https://images.unsplash.com/photo-1560913210-59b747b4a0a0?w=400&h=400&fit=crop',
                      images: ['https://images.unsplash.com/photo-1560913210-59b747b4a0a0?w=600&h=600&fit=crop'],
                      rating: 4.5,
                      reviews: 0,
                      stock: 10,
                      description: 'توضیحات محصول',
                      isNew: true,
                    };
                    
                    if (isFirebaseConfigured()) {
                      await saveProduct(newProduct);
                      setDbProducts([...dbProducts, newProduct]);
                    } else {
                      setDbProducts([...dbProducts, newProduct]);
                    }
                  }}
                  className="btn-accent px-6 py-2 rounded-xl"
                >
                  <i className="fas fa-plus ml-2"></i>
                  افزودن محصول
                </button>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">تصویر</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">نام</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">برند</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">قیمت</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">موجودی</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">عملیات</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {dbProducts.map((product: any) => (
                    <tr key={product.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <img src={product.image} alt={product.name} className="w-12 h-12 rounded-lg object-cover" />
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">{product.name}</div>
                        <div className="text-xs text-gray-500">{product.nameEn}</div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">{product.brand}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{(product.price / 10000).toFixed(0)} هزار</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={async () => {
                              const newStock = Math.max(0, product.stock - 1);
                              if (isFirebaseConfigured()) {
                                await updateProductStock(product.id, newStock);
                              }
                              setDbProducts(dbProducts.map((p: any) => 
                                p.id === product.id ? { ...p, stock: newStock } : p
                              ));
                            }}
                            className="w-8 h-8 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
                          >
                            -
                          </button>
                          <span className="text-sm font-medium w-8 text-center">{product.stock}</span>
                          <button
                            onClick={async () => {
                              const newStock = product.stock + 1;
                              if (isFirebaseConfigured()) {
                                await updateProductStock(product.id, newStock);
                              }
                              setDbProducts(dbProducts.map((p: any) => 
                                p.id === product.id ? { ...p, stock: newStock } : p
                              ));
                            }}
                            className="w-8 h-8 bg-green-100 text-green-600 rounded-lg hover:bg-green-200"
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={async () => {
                            if (confirm('آیا از حذف این محصول مطمئن هستید؟')) {
                              if (isFirebaseConfigured()) {
                                await deleteProduct(product.id);
                              }
                              setDbProducts(dbProducts.filter((p: any) => p.id !== product.id));
                            }
                          }}
                          className="text-red-600 hover:text-red-800"
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Blog Management */}
        {activeTab === 'blog' && (
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-800">مدیریت بلاگ</h2>
                <button
                  onClick={async () => {
                    const newPost = {
                      id: Date.now(),
                      title: 'مقاله جدید',
                      excerpt: 'خلاصه مقاله',
                      content: 'محتوای مقاله...',
                      date: new Date().toLocaleDateString('fa-IR'),
                      category: 'آموزشی',
                      readTime: '۵ دقیقه',
                      image: 'https://images.unsplash.com/photo-1560913210-59b747b4a0a0?w=800&h=500&fit=crop',
                      author: 'مدیر سایت',
                    };
                    
                    if (isFirebaseConfigured()) {
                      await saveBlogPost(newPost);
                      setDbBlogPosts([...dbBlogPosts, newPost]);
                    } else {
                      setDbBlogPosts([...dbBlogPosts, newPost]);
                    }
                  }}
                  className="btn-accent px-6 py-2 rounded-xl"
                >
                  <i className="fas fa-plus ml-2"></i>
                  افزودن مقاله
                </button>
              </div>
            </div>
            
            <div className="divide-y">
              {dbBlogPosts.map((post: any) => (
                <div key={post.id} className="p-6 hover:bg-gray-50">
                  <div className="flex items-start gap-4">
                    <img src={post.image} alt={post.title} className="w-24 h-24 rounded-xl object-cover" />
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 mb-2">{post.title}</h3>
                      <p className="text-sm text-gray-500 mb-2">{post.excerpt}</p>
                      <div className="flex items-center gap-4 text-xs text-gray-400">
                        <span><i className="fas fa-tag ml-1"></i>{post.category}</span>
                        <span><i className="fas fa-clock ml-1"></i>{post.readTime}</span>
                        <span><i className="fas fa-calendar ml-1"></i>{post.date}</span>
                      </div>
                    </div>
                    <button
                      onClick={async () => {
                        if (confirm('آیا از حذف این مقاله مطمئن هستید؟')) {
                          if (isFirebaseConfigured()) {
                            await deleteBlogPost(post.id);
                          }
                          setDbBlogPosts(dbBlogPosts.filter((p: any) => p.id !== post.id));
                        }
                      }}
                      className="text-red-600 hover:text-red-800"
                    >
                      <i className="fas fa-trash text-lg"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Orders Management */}
        {activeTab === 'orders' && (
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="p-6 border-b">
              <h2 className="text-xl font-bold text-gray-800">سفارشات</h2>
            </div>
            
            {dbOrders.length === 0 ? (
              <div className="p-12 text-center">
                <i className="fas fa-shopping-cart text-6xl text-gray-300 mb-4"></i>
                <p className="text-gray-500">هنوز سفارشی ثبت نشده است</p>
              </div>
            ) : (
              <div className="divide-y">
                {dbOrders.map((order: any) => (
                  <div key={order.id} className="p-6 hover:bg-gray-50">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-bold text-gray-900 mb-1">سفارش #{order.id}</h3>
                        <p className="text-sm text-gray-500">{order.date}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        order.status === 'processing' ? 'bg-yellow-100 text-yellow-700' :
                        order.status === 'shipped' ? 'bg-blue-100 text-blue-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {order.status === 'processing' ? 'در حال پردازش' :
                         order.status === 'shipped' ? 'ارسال شده' : 'تحویل داده شده'}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">مشتری</p>
                        <p className="text-sm font-medium text-gray-900">{order.shippingInfo?.receiverName || 'نامشخص'}</p>
                        <p className="text-sm text-gray-500">{order.shippingInfo?.phone || '-'}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">آدرس</p>
                        <p className="text-sm text-gray-900">{order.shippingInfo?.address || '-'}</p>
                      </div>
                    </div>
                    
                    <div className="border-t pt-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">{order.items?.length || 0} محصول</span>
                        <span className="text-lg font-bold text-[#00C07F]">
                          {(order.total / 10000).toFixed(0)} هزار تومان
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
