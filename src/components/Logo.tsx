export function LogoMain({ className = "w-12 h-12 md:w-14 md:h-14" }: { className?: string }) {
  return (
    <div className={`relative ${className} flex items-center justify-center`}>
      {/* Background circle with gradient */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#00C07F] via-[#8B5CF6] to-[#F59E0B] opacity-20 blur-sm"></div>
      <div className="absolute inset-1 rounded-full bg-white/80 backdrop-blur-sm"></div>
      {/* Logo image */}
      <img 
        src="https://uploadkon.ir/uploads/648c14_26Gemini-Generated-Image-.png" 
        alt="Smoke City Logo" 
        className="relative z-10 w-[85%] h-[85%] object-contain drop-shadow-lg"
      />
    </div>
  );
}

export function LogoSmall({ className = "w-14 h-14" }: { className?: string }) {
  return (
    <div className={`relative ${className} flex items-center justify-center`}>
      {/* Background circle with gradient */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#00C07F] via-[#8B5CF6] to-[#F59E0B] opacity-20 blur-sm"></div>
      <div className="absolute inset-1 rounded-full bg-white/10 backdrop-blur-sm"></div>
      {/* Logo image */}
      <img 
        src="https://uploadkon.ir/uploads/648c14_26Gemini-Generated-Image-.png" 
        alt="Smoke City Logo" 
        className="relative z-10 w-[85%] h-[85%] object-contain drop-shadow-lg"
      />
    </div>
  );
}

export function LogoLarge({ className = "w-24 h-24 md:w-32 md:h-32" }: { className?: string }) {
  return (
    <div className={`relative ${className} flex items-center justify-center`}>
      {/* Outer glow */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#00C07F] via-[#8B5CF6] to-[#F59E0B] opacity-30 blur-md animate-pulse-soft"></div>
      {/* Background circle */}
      <div className="absolute inset-2 rounded-full bg-gradient-to-br from-white to-gray-50 shadow-inner"></div>
      {/* Logo image */}
      <img 
        src="https://uploadkon.ir/uploads/648c14_26Gemini-Generated-Image-.png" 
        alt="Smoke City Logo" 
        className="relative z-10 w-[80%] h-[80%] object-contain drop-shadow-xl"
      />
    </div>
  );
}
