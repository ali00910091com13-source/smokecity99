export function LogoMain({ className = "w-12 h-12 md:w-14 md:h-14" }: { className?: string }) {
  return (
    <img 
      src="https://uploadkon.ir/uploads/648c14_26Gemini-Generated-Image-.png" 
      alt="Smoke City Logo" 
      className={`${className} object-contain drop-shadow-md`}
    />
  );
}

export function LogoSmall({ className = "w-14 h-14" }: { className?: string }) {
  return (
    <img 
      src="https://uploadkon.ir/uploads/648c14_26Gemini-Generated-Image-.png" 
      alt="Smoke City Logo" 
      className={`${className} object-contain drop-shadow-md`}
    />
  );
}

export function LogoLarge({ className = "w-24 h-24 md:w-32 md:h-32" }: { className?: string }) {
  return (
    <img 
      src="https://uploadkon.ir/uploads/648c14_26Gemini-Generated-Image-.png" 
      alt="Smoke City Logo" 
      className={`${className} object-contain drop-shadow-xl`}
    />
  );
}
