import { useApp } from '../context/AppContext';
import { blogPosts } from '../data/blog';

export default function BlogPostPage() {
  const { selectedBlogId, setSelectedBlogId, navigate } = useApp();
  const post = blogPosts.find(p => p.id === selectedBlogId);

  if (!post) {
    return (
      <div className="pt-24 pb-12 px-4 min-h-screen text-center">
        <p className="text-[#6b7280]">مقاله‌ای یافت نشد</p>
        <button onClick={() => navigate('blog')} className="mt-4 text-[#00C07F] hover:underline">بازگشت به بلاگ</button>
      </div>
    );
  }

  const relatedPosts = blogPosts.filter(p => p.id !== post.id).slice(0, 3);

  return (
    <section className="pt-24 pb-12 px-4 min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Back button */}
        <button onClick={() => navigate('blog')} className="flex items-center gap-2 text-[#6b7280] hover:text-[#00C07F] transition-colors mb-6">
          <i className="fas fa-arrow-right"></i>
          <span className="text-sm">بازگشت به بلاگ</span>
        </button>

        {/* Article Header */}
        <div className="animate-fade-in-up">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-medium text-[#00C07F] bg-[#00C07F]/10 px-3 py-1 rounded-full">
              {post.category}
            </span>
            <span className="text-xs text-[#9CA3AF]">{post.readTime} مطالعه</span>
            <span className="text-xs text-[#9CA3AF]">{post.date}</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-black text-[#1a1a2e] mb-4 leading-tight">
            {post.title}
          </h1>

          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00C07F] to-[#0891B2] flex items-center justify-center text-white font-bold">
              {post.author.charAt(0)}
            </div>
            <div>
              <p className="text-sm font-bold text-[#1a1a2e]">{post.author}</p>
              <p className="text-xs text-[#9CA3AF]">نویسنده</p>
            </div>
          </div>
        </div>

        {/* Featured Image */}
        <div className="rounded-2xl overflow-hidden mb-8 shadow-soft" style={{ animation: 'fadeInUp 0.6s ease-out 0.2s both' }}>
          <img src={post.image} alt={post.title} className="w-full h-64 md:h-96 object-cover" />
        </div>

        {/* Article Content */}
        <article className="glass rounded-2xl p-6 md:p-10 shadow-soft mb-8" style={{ animation: 'fadeInUp 0.6s ease-out 0.4s both' }}>
          <div className="prose prose-lg max-w-none text-[#4b5563] leading-8">
            {post.content.split('\n').map((line, index) => {
              if (line.startsWith('## ')) {
                return <h2 key={index} className="text-2xl font-bold text-[#1a1a2e] mt-8 mb-4">{line.replace('## ', '')}</h2>;
              }
              if (line.startsWith('### ')) {
                return <h3 key={index} className="text-xl font-bold text-[#1a1a2e] mt-6 mb-3">{line.replace('### ', '')}</h3>;
              }
              if (line.startsWith('- **')) {
                const parts = line.replace('- **', '').split('**');
                return (
                  <div key={index} className="flex items-start gap-2 my-2 mr-4">
                    <span className="text-[#00C07F] mt-1">•</span>
                    <p>
                      <strong className="text-[#1a1a2e]">{parts[0]}</strong>
                      {parts[1]}
                    </p>
                  </div>
                );
              }
              if (line.startsWith('- ')) {
                return (
                  <div key={index} className="flex items-start gap-2 my-2 mr-4">
                    <span className="text-[#00C07F] mt-1">•</span>
                    <p>{line.replace('- ', '')}</p>
                  </div>
                );
              }
              if (line.match(/^\d+\. /)) {
                const num = line.match(/^(\d+)\./)?.[1];
                const text = line.replace(/^\d+\. /, '');
                return (
                  <div key={index} className="flex items-start gap-3 my-2 mr-4">
                    <span className="w-6 h-6 rounded-full bg-[#00C07F]/10 text-[#00C07F] text-xs font-bold flex items-center justify-center flex-shrink-0">{num}</span>
                    <p>{text}</p>
                  </div>
                );
              }
              if (line.trim() === '') return <br key={index} />;
              return <p key={index} className="mb-3">{line}</p>;
            })}
          </div>
        </article>

        {/* Share buttons */}
        <div className="glass rounded-2xl p-6 shadow-soft mb-8" style={{ animation: 'fadeInUp 0.6s ease-out 0.6s both' }}>
          <h3 className="font-bold text-[#1a1a2e] mb-4">اشتراک‌گذاری مقاله</h3>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 glass rounded-xl hover:bg-[#00C07F]/10 transition-colors">
              <i className="fab fa-telegram text-[#00C07F]"></i>
              <span className="text-sm text-[#4b5563]">تلگرام</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 glass rounded-xl hover:bg-[#00C07F]/10 transition-colors">
              <i className="fab fa-whatsapp text-[#00C07F]"></i>
              <span className="text-sm text-[#4b5563]">واتساپ</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 glass rounded-xl hover:bg-[#00C07F]/10 transition-colors">
              <i className="fas fa-link text-[#00C07F]"></i>
              <span className="text-sm text-[#4b5563]">کپی لینک</span>
            </button>
          </div>
        </div>

        {/* Related Posts */}
        <div style={{ animation: 'fadeInUp 0.6s ease-out 0.8s both' }}>
          <h2 className="text-2xl font-bold text-[#1a1a2e] mb-6">مقالات مرتبط</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {relatedPosts.map((related, index) => (
              <article
                key={related.id}
                className="glass rounded-2xl overflow-hidden shadow-soft hover:shadow-hover transition-all duration-300 cursor-pointer group"
                style={{ animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both` }}
                onClick={() => {
                  setSelectedBlogId(related.id);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                <div className="h-32 overflow-hidden">
                  <img src={related.image} alt={related.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="p-4">
                  <span className="text-xs font-medium text-[#00C07F]">{related.category}</span>
                  <h3 className="font-bold text-[#1a1a2e] text-sm mt-1 group-hover:text-[#00C07F] transition-colors line-clamp-2">
                    {related.title}
                  </h3>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
