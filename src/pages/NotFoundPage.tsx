import { useNavigate } from 'react-router-dom';

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center animate__animated animate__fadeIn">
        {/* 404 Animation */}
        <div className="relative mb-8">
          <div className="text-[150px] md:text-[200px] font-black gradient-text animate__animated animate__bounceIn">
            404
          </div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <i className="fas fa-exclamation-triangle text-[80px] text-red-500 animate__animated animate__shakeX animate__delay-1s"></i>
          </div>
        </div>

        {/* Message */}
        <div className="glass rounded-3xl p-8 shadow-soft animate__animated animate__fadeInUp animate__delay-1s">
          <h1 className="text-3xl md:text-4xl font-black text-[#1a1a2e] mb-4">
            صفحه مورد نظر یافت نشد!
          </h1>
          <p className="text-[#6b7280] text-lg mb-8 leading-8">
            متأسفانه صفحه‌ای که به دنبال آن هستید وجود ندارد یا آدرس آن اشتباه وارد شده است.
          </p>

          {/* Error Details */}
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-8 text-right">
            <div className="flex items-start gap-3">
              <i className="fas fa-exclamation-circle text-red-500 text-xl mt-1"></i>
              <div>
                <p className="font-bold text-red-700 mb-2">دلایل احتمالی:</p>
                <ul className="text-sm text-red-600 space-y-1">
                  <li>• آدرس صفحه را اشتباه وارد کرده‌اید</li>
                  <li>• صفحه مورد نظر حذف شده است</li>
                  <li>• صفحه هنوز ایجاد نشده است</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/')}
              className="btn-accent px-8 py-4 rounded-xl text-lg animate__animated animate__pulse animate__infinite"
            >
              <i className="fas fa-home ml-2"></i>
              بازگشت به صفحه اصلی
            </button>
            <button
              onClick={() => navigate('/shop')}
              className="px-8 py-4 rounded-xl glass text-[#1a1a2e] font-medium hover:shadow-soft transition-all"
            >
              <i className="fas fa-store ml-2"></i>
              مشاهده فروشگاه
            </button>
          </div>

          {/* Help Section */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-sm text-[#6b7280] mb-4">
              آیا به کمک نیاز دارید؟
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="tel:02112345678" className="flex items-center gap-2 px-4 py-2 glass rounded-lg hover:bg-[#00C07F]/10 transition-colors">
                <i className="fas fa-phone text-[#00C07F]"></i>
                <span className="text-sm text-[#4b5563]">تماس با پشتیبانی</span>
              </a>
              <button
                onClick={() => navigate('/contact')}
                className="flex items-center gap-2 px-4 py-2 glass rounded-lg hover:bg-[#00C07F]/10 transition-colors"
              >
                <i className="fas fa-envelope text-[#00C07F]"></i>
                <span className="text-sm text-[#4b5563]">ارسال پیام</span>
              </button>
            </div>
          </div>
        </div>

        {/* Fun Animation */}
        <div className="mt-8 text-[#9CA3AF] text-sm animate__animated animate__fadeIn animate__delay-2s">
          <i className="fas fa-search animate__animated animate__rubberBand animate__infinite"></i>
          <span className="mr-2">در حال جستجوی صفحه مورد نظر...</span>
        </div>
      </div>
    </div>
  );
}
