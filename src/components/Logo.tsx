export function LogoMain({ className = "w-10 h-10 md:w-12 md:h-12" }: { className?: string }) {
  return (
    <img 
      src="https://uploadkon.ir/uploads/648c14_26Gemini-Generated-Image-.png" 
      alt="Smoke City Logo" 
      className={`${className} object-contain`}
    />
  );
}

export function LogoSmall({ className = "w-12 h-12" }: { className?: string }) {
  return (
    <img 
      src="https://uploadkon.ir/uploads/648c14_26Gemini-Generated-Image-.png" 
      alt="Smoke City Logo" 
      className={`${className} object-contain`}
    />
  );
}
