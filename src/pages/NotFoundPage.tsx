import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center">
        {/* 404 Animation */}
        <div className="relative mb-8">
          <motion.div 
            className="text-[150px] md:text-[200px] font-black gradient-text"
            initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, type: 'spring', stiffness: 100 }}
          >
            404
          </motion.div>
          <motion.div 
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <motion.i 
              className="fas fa-exclamation-triangle text-[80px] text-red-500"
              animate={{ 
                x: [0, -10, 10, -10, 10, 0],
                rotate: [0, -5, 5, -5, 5, 0]
              }}
              transition={{ duration: 0.5, delay: 1, repeat: 2 }}
            />
          </motion.div>
        </div>

        {/* Message */}
        <motion.div 
          className="glass rounded-3xl p-8 shadow-soft"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <motion.h1 
            className="text-3xl md:text-4xl font-black text-[#1a1a2e] mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            صفحه مورد نظر یافت نشد!
          </motion.h1>
          <motion.p 
            className="text-[#6b7280] text-lg mb-8 leading-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
          >
            متأسفانه صفحه‌ای که به دنبال آن هستید وجود ندارد یا آدرس آن اشتباه وارد شده است.
          </motion.p>

          {/* Error Details */}
          <motion.div 
            className="bg-red-50 border border-red-200 rounded-xl p-4 mb-8 text-right"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.4, duration: 0.5 }}
          >
            <div className="flex items-start gap-3">
              <motion.i 
                className="fas fa-exclamation-circle text-red-500 text-xl mt-1"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <div>
                <p className="font-bold text-red-700 mb-2">دلایل احتمالی:</p>
                <ul className="text-sm text-red-600 space-y-1">
                  <li>• آدرس صفحه را اشتباه وارد کرده‌اید</li>
                  <li>• صفحه مورد نظر حذف شده است</li>
                  <li>• صفحه هنوز ایجاد نشده است</li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.5 }}
          >
            <motion.button
              onClick={() => navigate('/')}
              className="btn-accent px-8 py-4 rounded-xl text-lg"
              whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(0, 192, 127, 0.4)' }}
              whileTap={{ scale: 0.95 }}
              animate={{ 
                boxShadow: [
                  '0 5px 15px rgba(0, 192, 127, 0.3)',
                  '0 10px 30px rgba(0, 192, 127, 0.5)',
                  '0 5px 15px rgba(0, 192, 127, 0.3)'
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <i className="fas fa-home ml-2"></i>
              بازگشت به صفحه اصلی
            </motion.button>
            <motion.button
              onClick={() => navigate('/shop')}
              className="px-8 py-4 rounded-xl glass text-[#1a1a2e] font-medium"
              whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
              whileTap={{ scale: 0.95 }}
            >
              <i className="fas fa-store ml-2"></i>
              مشاهده فروشگاه
            </motion.button>
          </motion.div>

          {/* Help Section */}
          <motion.div 
            className="mt-8 pt-8 border-t border-gray-200"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8, duration: 0.5 }}
          >
            <p className="text-sm text-[#6b7280] mb-4">
              آیا به کمک نیاز دارید؟
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <motion.a 
                href="tel:02112345678" 
                className="flex items-center gap-2 px-4 py-2 glass rounded-lg"
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(0, 192, 127, 0.1)' }}
                whileTap={{ scale: 0.95 }}
              >
                <i className="fas fa-phone text-[#00C07F]"></i>
                <span className="text-sm text-[#4b5563]">تماس با پشتیبانی</span>
              </motion.a>
              <motion.button
                onClick={() => navigate('/contact')}
                className="flex items-center gap-2 px-4 py-2 glass rounded-lg"
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(0, 192, 127, 0.1)' }}
                whileTap={{ scale: 0.95 }}
              >
                <i className="fas fa-envelope text-[#00C07F]"></i>
                <span className="text-sm text-[#4b5563]">ارسال پیام</span>
              </motion.button>
            </div>
          </motion.div>
        </motion.div>

        {/* Fun Animation */}
        <motion.div 
          className="mt-8 text-[#9CA3AF] text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.5 }}
        >
          <motion.i 
            className="fas fa-search"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          />
          <span className="mr-2">در حال جستجوی صفحه مورد نظر...</span>
        </motion.div>
      </div>
    </div>
  );
}
