import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { products as defaultProducts } from '../data/products';
import { blogPosts as defaultBlogPosts } from '../data/blog';
import { productsDB, blogDB, ordersDB, database } from '../services/database';

export default function AdminPanel() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'dashboard' | 'products' | 'blog' | 'orders'>('dashboard');
  const [showProductForm, setShowProductForm] = useState(false);
  const [showBlogForm, setShowBlogForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [editingBlog, setEditingBlog] = useState<any>(null);
  
  const [dbProducts, setDbProducts] = useState<any[]>([]);
  const [dbBlogPosts, setDbBlogPosts] = useState<any[]>([]);
  const [dbOrders, setDbOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Product Form State
  const [productForm, setProductForm] = useState({
    name: '', nameEn: '', brand: '', category: 'pod',
    price: 0, originalPrice: 0, image: '', stock: 10,
    description: '', isNew: false, isBestseller: false,
  });

  // Blog Form State
  const [blogForm, setBlogForm] = useState({
    title: '', excerpt: '', content: '', image: '',
    category: 'آموزشی', readTime: '۵ دقیقه', author: 'مدیر سایت',
  });

  const ADMIN_PASSWORD = 'SmokeCity@Admin2024!';

  // Initialize database and load data
  useEffect(() => {
    const initialize = async () => {
      try {
        await database.init();
        
        let products = await productsDB.getAll();
        let blogPosts = await blogDB.getAll();
        let orders = await ordersDB.getAll();

        // If database is empty, seed with default data
        if (products.length === 0) {
          for (const product of defaultProducts) {
            await productsDB.add(product);
          }
          products = defaultProducts;
        }

        if (blogPosts.length === 0) {
          for (const post of defaultBlogPosts) {
            await blogDB.add(post);
          }
          blogPosts = defaultBlogPosts;
        }

        setDbProducts(products);
        setDbBlogPosts(blogPosts);
        setDbOrders(orders);
      } catch (error) {
        console.error('Database error:', error);
      } finally {
        setLoading(false);
      }
    };

    initialize();
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
    } else {
      alert('رمز عبور اشتباه است!');
    }
  };

  // Product handlers
  const handleAddProduct = async () => {
    const newProduct = {
      ...productForm,
      id: Date.now(),
      images: [productForm.image],
      rating: 4.5,
      reviews: 0,
    };

    await productsDB.add(newProduct);
    setDbProducts([...dbProducts, newProduct]);
    setProductForm({
      name: '', nameEn: '', brand: '', category: 'pod',
      price: 0, originalPrice: 0, image: '', stock: 10,
      description: '', isNew: false, isBestseller: false,
    });
    setShowProductForm(false);
  };

  const handleUpdateProduct = async () => {
    if (!editingProduct) return;
    
    const updatedProduct = {
      ...editingProduct,
      ...productForm,
      images: [productForm.image],
    };

    await productsDB.update(updatedProduct);
    setDbProducts(dbProducts.map(p => p.id === updatedProduct.id ? updatedProduct : p));
    setEditingProduct(null);
    setProductForm({
      name: '', nameEn: '', brand: '', category: 'pod',
      price: 0, originalPrice: 0, image: '', stock: 10,
      description: '', isNew: false, isBestseller: false,
    });
    setShowProductForm(false);
  };

  const handleEditProduct = (product: any) => {
    setEditingProduct(product);
    setProductForm({
      name: product.name || '',
      nameEn: product.nameEn || '',
      brand: product.brand || '',
      category: product.category || 'pod',
      price: product.price || 0,
      originalPrice: product.originalPrice || 0,
      image: product.image || '',
      stock: product.stock || 0,
      description: product.description || '',
      isNew: product.isNew || false,
      isBestseller: product.isBestseller || false,
    });
    setShowProductForm(true);
  };

  const handleDeleteProduct = async (id: number) => {
    if (!confirm('آیا از حذف این محصول مطمئن هستید؟')) return;
    await productsDB.delete(id);
    setDbProducts(dbProducts.filter(p => p.id !== id));
  };

  const handleUpdateStock = async (product: any, newStock: number) => {
    const updated = { ...product, stock: newStock };
    await productsDB.update(updated);
    setDbProducts(dbProducts.map(p => p.id === product.id ? updated : p));
  };

  // Blog handlers
  const handleAddBlogPost = async () => {
    const newPost = {
      ...blogForm,
      id: Date.now(),
      date: new Date().toLocaleDateString('fa-IR'),
    };

    await blogDB.add(newPost);
    setDbBlogPosts([...dbBlogPosts, newPost]);
    setBlogForm({
      title: '', excerpt: '', content: '', image: '',
      category: 'آموزشی', readTime: '۵ دقیقه', author: 'مدیر سایت',
    });
    setShowBlogForm(false);
  };

  const handleUpdateBlogPost = async () => {
    if (!editingBlog) return;
    
    const updatedPost = {
      ...editingBlog,
      ...blogForm,
    };

    await blogDB.update(updatedPost);
    setDbBlogPosts(dbBlogPosts.map(p => p.id === updatedPost.id ? updatedPost : p));
    setEditingBlog(null);
    setBlogForm({
      title: '', excerpt: '', content: '', image: '',
      category: 'آموزشی', readTime: '۵ دقیقه', author: 'مدیر سایت',
    });
    setShowBlogForm(false);
  };

  const handleEditBlog = (post: any) => {
    setEditingBlog(post);
    setBlogForm({
      title: post.title || '',
      excerpt: post.excerpt || '',
      content: post.content || '',
      image: post.image || '',
      category: post.category || 'آموزشی',
      readTime: post.readTime || '۵ دقیقه',
      author: post.author || 'مدیر سایت',
    });
    setShowBlogForm(true);
  };

  const handleDeleteBlogPost = async (id: number) => {
    if (!confirm('آیا از حذف این مقاله مطمئن هستید؟')) return;
    await blogDB.delete(id);
    setDbBlogPosts(dbBlogPosts.filter(p => p.id !== id));
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
            <p className="text-gray-500 text-sm mt-2">اسموک سیتی</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#00C07F]"
              placeholder="رمز عبور"
            />
            <button type="submit" className="w-full btn-accent py-3 rounded-xl">ورود</button>
          </form>
          <button onClick={() => navigate('/')} className="mt-4 text-sm text-gray-500 hover:text-[#00C07F] w-full text-center">
            بازگشت به سایت
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <i className="fas fa-spinner fa-spin text-4xl text-[#00C07F] mb-4"></i>
          <p className="text-gray-600">در حال بارگذاری دیتابیس...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#00C07F] to-[#0891B2] rounded-lg flex items-center justify-center">
              <i className="fas fa-cog text-white"></i>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">پنل مدیریت</h1>
              <p className="text-xs text-gray-500">اسموک سیتی • IndexedDB</p>
            </div>
          </div>
          <button onClick={() => { setIsAuthenticated(false); navigate('/'); }} className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg">
            <i className="fas fa-sign-out-alt ml-2"></i>خروج
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {[
            { id: 'dashboard', label: 'داشبورد', icon: 'chart-line' },
            { id: 'products', label: `محصولات (${dbProducts.length})`, icon: 'box' },
            { id: 'blog', label: `بلاگ (${dbBlogPosts.length})`, icon: 'blog' },
            { id: 'orders', label: `سفارشات (${dbOrders.length})`, icon: 'shopping-cart' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-6 py-3 rounded-xl font-medium transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-[#00C07F] to-[#0891B2] text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              <i className={`fas fa-${tab.icon} ml-2`}></i>{tab.label}
            </button>
          ))}
        </div>

        {/* Dashboard */}
        {activeTab === 'dashboard' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: 'کل محصولات', value: dbProducts.length, icon: 'box', color: 'blue' },
              { label: 'مقالات بلاگ', value: dbBlogPosts.length, icon: 'blog', color: 'green' },
              { label: 'سفارشات', value: dbOrders.length, icon: 'shopping-cart', color: 'purple' },
              { label: 'درآمد کل', value: `${(dbOrders.reduce((sum, o) => sum + (o.total || 0), 0) / 10000).toFixed(0)}K`, icon: 'dollar-sign', color: 'orange' },
            ].map((stat, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 bg-${stat.color}-100 rounded-xl flex items-center justify-center`}>
                    <i className={`fas fa-${stat.icon} text-${stat.color}-600 text-xl`}></i>
                  </div>
                  <span className="text-3xl font-bold text-gray-800">{stat.value}</span>
                </div>
                <p className="text-gray-500">{stat.label}</p>
              </div>
            ))}
          </div>
        )}

        {/* Products */}
        {activeTab === 'products' && (
          <div>
            {/* Product Form Modal */}
            {showProductForm && (
              <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
                <div className="bg-white rounded-2xl p-6 max-w-2xl w-full my-8">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">
                      {editingProduct ? 'ویرایش محصول' : 'افزودن محصول جدید'}
                    </h2>
                    <button onClick={() => { setShowProductForm(false); setEditingProduct(null); }} className="text-gray-500 hover:text-gray-700">
                      <i className="fas fa-times text-xl"></i>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">نام فارسی *</label>
                      <input
                        type="text"
                        value={productForm.name}
                        onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00C07F]"
                        placeholder="مثال: پاد سیستم اکسوا"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">نام انگلیسی *</label>
                      <input
                        type="text"
                        value={productForm.nameEn}
                        onChange={(e) => setProductForm({ ...productForm, nameEn: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00C07F]"
                        placeholder="OXVA Xlim Pro"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">برند *</label>
                      <input
                        type="text"
                        value={productForm.brand}
                        onChange={(e) => setProductForm({ ...productForm, brand: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00C07F]"
                        placeholder="OXVA"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">دسته‌بندی *</label>
                      <select
                        value={productForm.category}
                        onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00C07F]"
                      >
                        <option value="pod">پاد سیستم</option>
                        <option value="vape">ویپ</option>
                        <option value="salt">سالت نیکوتین</option>
                        <option value="juice">جویس</option>
                        <option value="coil">کویل</option>
                        <option value="accessory">لوازم جانبی</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">قیمت (تومان) *</label>
                      <input
                        type="number"
                        value={productForm.price}
                        onChange={(e) => setProductForm({ ...productForm, price: parseInt(e.target.value) || 0 })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00C07F]"
                        placeholder="1850000"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">قیمت اصلی (با تخفیف)</label>
                      <input
                        type="number"
                        value={productForm.originalPrice}
                        onChange={(e) => setProductForm({ ...productForm, originalPrice: parseInt(e.target.value) || 0 })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00C07F]"
                        placeholder="2100000"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">URL تصویر *</label>
                      <input
                        type="url"
                        value={productForm.image}
                        onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00C07F]"
                        placeholder="https://example.com/image.jpg"
                      />
                      {productForm.image && (
                        <img src={productForm.image} alt="preview" className="mt-2 w-32 h-32 object-cover rounded-lg" />
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">موجودی *</label>
                      <input
                        type="number"
                        value={productForm.stock}
                        onChange={(e) => setProductForm({ ...productForm, stock: parseInt(e.target.value) || 0 })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00C07F]"
                      />
                    </div>

                    <div className="flex items-center gap-4">
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={productForm.isNew}
                          onChange={(e) => setProductForm({ ...productForm, isNew: e.target.checked })}
                          className="w-4 h-4"
                        />
                        <span className="text-sm">محصول جدید</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={productForm.isBestseller}
                          onChange={(e) => setProductForm({ ...productForm, isBestseller: e.target.checked })}
                          className="w-4 h-4"
                        />
                        <span className="text-sm">پرفروش</span>
                      </label>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">توضیحات</label>
                      <textarea
                        value={productForm.description}
                        onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                        rows={4}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00C07F]"
                        placeholder="توضیحات محصول..."
                      />
                    </div>
                  </div>

                  <div className="flex gap-3 mt-6">
                    <button
                      onClick={editingProduct ? handleUpdateProduct : handleAddProduct}
                      disabled={!productForm.name || !productForm.price || !productForm.image}
                      className="flex-1 btn-accent py-3 rounded-xl disabled:opacity-50"
                    >
                      {editingProduct ? 'بروزرسانی' : 'افزودن'}
                    </button>
                    <button
                      onClick={() => { setShowProductForm(false); setEditingProduct(null); }}
                      className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300"
                    >
                      انصراف
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Products List */}
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="p-6 border-b flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-800">مدیریت محصولات</h2>
                <button
                  onClick={() => { setEditingProduct(null); setProductForm({ name: '', nameEn: '', brand: '', category: 'pod', price: 0, originalPrice: 0, image: '', stock: 10, description: '', isNew: false, isBestseller: false }); setShowProductForm(true); }}
                  className="btn-accent px-6 py-2 rounded-xl"
                >
                  <i className="fas fa-plus ml-2"></i>افزودن محصول
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">تصویر</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">نام</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">دسته‌بندی</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">قیمت</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">موجودی</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">عملیات</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {dbProducts.map((product) => (
                      <tr key={product.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <img src={product.image} alt={product.name} className="w-12 h-12 rounded-lg object-cover" />
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-gray-900">{product.name}</div>
                          <div className="text-xs text-gray-500">{product.brand}</div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {product.category === 'pod' ? 'پاد' : product.category === 'vape' ? 'ویپ' : product.category === 'salt' ? 'سالت' : product.category === 'juice' ? 'جویس' : product.category === 'coil' ? 'کویل' : 'لوازم'}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">{(product.price / 10000).toFixed(0)} هزار</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <button onClick={() => handleUpdateStock(product, Math.max(0, product.stock - 1))} className="w-7 h-7 bg-red-100 text-red-600 rounded hover:bg-red-200 text-sm">-</button>
                            <span className="text-sm font-medium w-8 text-center">{product.stock}</span>
                            <button onClick={() => handleUpdateStock(product, product.stock + 1)} className="w-7 h-7 bg-green-100 text-green-600 rounded hover:bg-green-200 text-sm">+</button>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <button onClick={() => handleEditProduct(product)} className="text-blue-600 hover:text-blue-800">
                              <i className="fas fa-edit"></i>
                            </button>
                            <button onClick={() => handleDeleteProduct(product.id)} className="text-red-600 hover:text-red-800">
                              <i className="fas fa-trash"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Blog */}
        {activeTab === 'blog' && (
          <div>
            {/* Blog Form Modal */}
            {showBlogForm && (
              <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
                <div className="bg-white rounded-2xl p-6 max-w-2xl w-full my-8">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">
                      {editingBlog ? 'ویرایش مقاله' : 'افزودن مقاله جدید'}
                    </h2>
                    <button onClick={() => { setShowBlogForm(false); setEditingBlog(null); }} className="text-gray-500 hover:text-gray-700">
                      <i className="fas fa-times text-xl"></i>
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">تیتر مقاله *</label>
                      <input
                        type="text"
                        value={blogForm.title}
                        onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00C07F]"
                        placeholder="تیتر جذاب برای مقاله"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">خلاصه مقاله *</label>
                      <textarea
                        value={blogForm.excerpt}
                        onChange={(e) => setBlogForm({ ...blogForm, excerpt: e.target.value })}
                        rows={2}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00C07F]"
                        placeholder="خلاصه کوتاه مقاله..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">URL تصویر *</label>
                      <input
                        type="url"
                        value={blogForm.image}
                        onChange={(e) => setBlogForm({ ...blogForm, image: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00C07F]"
                        placeholder="https://example.com/image.jpg"
                      />
                      {blogForm.image && (
                        <img src={blogForm.image} alt="preview" className="mt-2 w-64 h-40 object-cover rounded-lg" />
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">دسته‌بندی</label>
                        <select
                          value={blogForm.category}
                          onChange={(e) => setBlogForm({ ...blogForm, category: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00C07F]"
                        >
                          <option>آموزشی</option>
                          <option>راهنمای خرید</option>
                          <option>معرفی محصول</option>
                          <option>ترندها</option>
                          <option>اخبار</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">زمان مطالعه</label>
                        <input
                          type="text"
                          value={blogForm.readTime}
                          onChange={(e) => setBlogForm({ ...blogForm, readTime: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00C07F]"
                          placeholder="۵ دقیقه"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">نویسنده</label>
                        <input
                          type="text"
                          value={blogForm.author}
                          onChange={(e) => setBlogForm({ ...blogForm, author: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00C07F]"
                          placeholder="نام نویسنده"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">محتوای مقاله *</label>
                      <textarea
                        value={blogForm.content}
                        onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
                        rows={12}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00C07F] font-mono text-sm"
                        placeholder="محتوای کامل مقاله..."
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        از ## برای تیتر، ### برای زیرتیتر، - برای لیست استفاده کنید
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3 mt-6">
                    <button
                      onClick={editingBlog ? handleUpdateBlogPost : handleAddBlogPost}
                      disabled={!blogForm.title || !blogForm.image || !blogForm.content}
                      className="flex-1 btn-accent py-3 rounded-xl disabled:opacity-50"
                    >
                      {editingBlog ? 'بروزرسانی' : 'انتشار مقاله'}
                    </button>
                    <button
                      onClick={() => { setShowBlogForm(false); setEditingBlog(null); }}
                      className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300"
                    >
                      انصراف
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Blog List */}
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="p-6 border-b flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-800">مدیریت بلاگ</h2>
                <button
                  onClick={() => { setEditingBlog(null); setBlogForm({ title: '', excerpt: '', content: '', image: '', category: 'آموزشی', readTime: '۵ دقیقه', author: 'مدیر سایت' }); setShowBlogForm(true); }}
                  className="btn-accent px-6 py-2 rounded-xl"
                >
                  <i className="fas fa-plus ml-2"></i>افزودن مقاله
                </button>
              </div>
              <div className="divide-y">
                {dbBlogPosts.map((post) => (
                  <div key={post.id} className="p-6 hover:bg-gray-50">
                    <div className="flex items-start gap-4">
                      <img src={post.image} alt={post.title} className="w-32 h-24 rounded-xl object-cover" />
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 mb-2">{post.title}</h3>
                        <p className="text-sm text-gray-500 mb-2 line-clamp-2">{post.excerpt}</p>
                        <div className="flex items-center gap-4 text-xs text-gray-400">
                          <span><i className="fas fa-tag ml-1"></i>{post.category}</span>
                          <span><i className="fas fa-clock ml-1"></i>{post.readTime}</span>
                          <span><i className="fas fa-calendar ml-1"></i>{post.date}</span>
                          <span><i className="fas fa-user ml-1"></i>{post.author}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => handleEditBlog(post)} className="text-blue-600 hover:text-blue-800">
                          <i className="fas fa-edit text-lg"></i>
                        </button>
                        <button onClick={() => handleDeleteBlogPost(post.id)} className="text-red-600 hover:text-red-800">
                          <i className="fas fa-trash text-lg"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Orders */}
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
                {dbOrders.map((order) => (
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
