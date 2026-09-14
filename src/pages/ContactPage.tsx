import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', phone: '', email: '', message: '' });
    }, 3000);
  };

  return (
    <section className="pt-24 pb-12 px-4 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-black mb-4 text-[#1a1a2e]">
            <span className="gradient-text">تماس</span> با ما
          </h1>
          <p className="text-[#6b7280] text-lg">ما اینجاییم تا به شما کمک کنیم</p>
        </div>

        <div className="glass rounded-3xl p-8 md:p-12 shadow-soft">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Contact Info */}
            <div className="space-y-6">
              <div className="flex items-start gap-4 group hover:translate-x-[-4px] transition-transform">
                <div className="w-12 h-12 rounded-xl bg-[#00C07F]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#00C07F]/20 transition-colors">
                  <i className="fas fa-phone text-[#00C07F]"></i>
                </div>
                <div>
                  <h3 className="font-bold text-[#1a1a2e] mb-1">تلفن تماس</h3>
                  <p className="text-[#6b7280] text-sm">۰۲۱-۱۲۳۴۵۶۷۸</p>
                  <p className="text-[#6b7280] text-sm">۰۹۱۲-۱۲۳۴۵۶۷</p>
                </div>
              </div>

              <div className="flex items-start gap-4 group hover:translate-x-[-4px] transition-transform">
                <div className="w-12 h-12 rounded-xl bg-[#00C07F]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#00C07F]/20 transition-colors">
                  <i className="fas fa-envelope text-[#00C07F]"></i>
                </div>
                <div>
                  <h3 className="font-bold text-[#1a1a2e] mb-1">ایمیل</h3>
                  <p className="text-[#6b7280] text-sm">info@smokecity.ir</p>
                  <p className="text-[#6b7280] text-sm">support@smokecity.ir</p>
                </div>
              </div>

              <div className="flex items-start gap-4 group hover:translate-x-[-4px] transition-transform">
                <div className="w-12 h-12 rounded-xl bg-[#00C07F]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#00C07F]/20 transition-colors">
                  <i className="fas fa-map-marker-alt text-[#00C07F]"></i>
                </div>
                <div>
                  <h3 className="font-bold text-[#1a1a2e] mb-1">آدرس</h3>
                  <p className="text-[#6b7280] text-sm">تهران، خیابان ولیعصر، پلاک ۱۲۳</p>
                </div>
              </div>

              <div className="flex items-start gap-4 group hover:translate-x-[-4px] transition-transform">
                <div className="w-12 h-12 rounded-xl bg-[#00C07F]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#00C07F]/20 transition-colors">
                  <i className="fas fa-clock text-[#00C07F]"></i>
                </div>
                <div>
                  <h3 className="font-bold text-[#1a1a2e] mb-1">ساعات کاری</h3>
                  <p className="text-[#6b7280] text-sm">شنبه تا پنجشنبه: ۹ صبح تا ۹ شب</p>
                  <p className="text-[#6b7280] text-sm">جمعه: ۱۰ صبح تا ۶ عصر</p>
                </div>
              </div>

              {/* Social Media */}
              <div className="pt-6 border-t border-[#E5E7EB]">
                <h3 className="font-bold text-[#1a1a2e] mb-4">ما را در شبکه‌های اجتماعی دنبال کنید</h3>
                <div className="flex gap-3">
                  <a href="#" className="w-10 h-10 rounded-xl bg-[#00C07F]/10 flex items-center justify-center hover:bg-[#00C07F]/20 transition-colors group">
                    <i className="fab fa-instagram text-[#00C07F] group-hover:scale-110 transition-transform"></i>
                  </a>
                  <a href="#" className="w-10 h-10 rounded-xl bg-[#00C07F]/10 flex items-center justify-center hover:bg-[#00C07F]/20 transition-colors group">
                    <i className="fab fa-telegram text-[#00C07F] group-hover:scale-110 transition-transform"></i>
                  </a>
                  <a href="#" className="w-10 h-10 rounded-xl bg-[#00C07F]/10 flex items-center justify-center hover:bg-[#00C07F]/20 transition-colors group">
                    <i className="fab fa-whatsapp text-[#00C07F] group-hover:scale-110 transition-transform"></i>
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              {submitted ? (
                <div className="h-full flex items-center justify-center">
                  <div className="text-center animate-scale-in">
                    <div className="w-16 h-16 bg-[#00C07F]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <i className="fas fa-check text-[#00C07F] text-2xl"></i>
                    </div>
                    <h3 className="text-xl font-bold text-[#1a1a2e] mb-2">پیام شما ارسال شد!</h3>
                    <p className="text-[#6b7280]">به زودی با شما تماس خواهیم گرفت</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    placeholder="نام و نام خانوادگی"
                    className="w-full bg-white text-[#1a1a2e] rounded-xl p-3 border border-[#E5E7EB] outline-none focus:border-[#00C07F] transition-colors text-sm placeholder-[#9CA3AF]"
                  />
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="شماره تماس"
                    className="w-full bg-white text-[#1a1a2e] rounded-xl p-3 border border-[#E5E7EB] outline-none focus:border-[#00C07F] transition-colors text-sm placeholder-[#9CA3AF]"
                  />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    placeholder="ایمیل"
                    className="w-full bg-white text-[#1a1a2e] rounded-xl p-3 border border-[#E5E7EB] outline-none focus:border-[#00C07F] transition-colors text-sm placeholder-[#9CA3AF]"
                  />
                  <textarea
                    required
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    placeholder="پیام شما..."
                    rows={4}
                    className="w-full bg-white text-[#1a1a2e] rounded-xl p-3 border border-[#E5E7EB] outline-none focus:border-[#00C07F] transition-colors text-sm placeholder-[#9CA3AF] resize-none"
                  />
                  <button type="submit" className="w-full btn-accent py-3 rounded-xl">
                    ارسال پیام
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
