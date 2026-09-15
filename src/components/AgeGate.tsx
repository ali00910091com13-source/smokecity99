import { LogoMain } from './Logo';

export default function AgeGate({ onVerify }: { onVerify: () => void }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#1a1a2e]/80 backdrop-blur-xl">
      <div className="glass-strong rounded-3xl p-8 md:p-12 max-w-md mx-4 text-center animate-fade-in shadow-soft">
        <div className="mb-6 animate-float">
          <LogoMain className="w-24 h-24 mx-auto" />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold mb-4 gradient-text">اسموک سیتی</h2>
        <p className="text-[#4b5563] mb-2 text-lg">آیا شما بالای ۱۸ سال سن دارید؟</p>
        <p className="text-[#9CA3AF] text-sm mb-8">ورود شما به معنای تأیید سن قانونی شما است</p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={onVerify}
            className="btn-accent px-8 py-3 rounded-xl text-lg"
          >
            بله، بالای ۱۸ سال هستم
          </button>
        </div>
        <button className="mt-4 text-[#9CA3AF] hover:text-[#4b5563] transition-colors text-sm">
          خیر، خارج شوید
        </button>
      </div>
    </div>
  );
}
