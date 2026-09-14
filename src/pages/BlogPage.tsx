import { useApp } from '../context/AppContext';
import { blogPosts } from '../data/blog';

export default function BlogPage() {
  const { setSelectedBlogId, navigate } = useApp();

  const handleReadMore = (postId: number) => {
    setSelectedBlogId(postId);
    navigate('blogPost');
  };

  return (
    <section className="pt-24 pb-12 px-4 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-black mb-4 text-[#1a1a2e]">
            <span className="gradient-text">بلاگ</span> اسموک سیتی
          </h1>
          <p className="text-[#6b7280] text-lg">آخرین مطالب، آموزش‌ها و اخبار دنیای ویپینگ</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post, index) => (
            <article
              key={post.id}
              className="glass rounded-2xl overflow-hidden shadow-soft hover:shadow-hover transition-all duration-300 cursor-pointer group"
              style={{ animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both` }}
            >
              <div className="h-48 overflow-hidden">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-medium text-[#00C07F] bg-[#00C07F]/10 px-2 py-1 rounded-full">
                    {post.category}
                  </span>
                  <span className="text-xs text-[#9CA3AF]">{post.readTime}</span>
                </div>
                <h3 className="font-bold text-[#1a1a2e] mb-2 group-hover:text-[#00C07F] transition-colors">
                  {post.title}
                </h3>
                <p className="text-sm text-[#6b7280] mb-3 line-clamp-2">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#9CA3AF]">{post.date}</span>
                  <button
                    onClick={() => handleReadMore(post.id)}
                    className="text-[#00C07F] text-sm font-medium hover:translate-x-[-4px] transition-transform"
                  >
                    ادامه مطلب ←
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
