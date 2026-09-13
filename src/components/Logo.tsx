export function LogoMain({ className = "w-10 h-10 md:w-12 md:h-12" }: { className?: string }) {
  return (
    <svg 
      className={className}
      viewBox="0 0 200 200" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00C07F" />
          <stop offset="100%" stopColor="#0891B2" />
        </linearGradient>
        <linearGradient id="smokeGradient" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#00C07F" stopOpacity="0.8" />
          <stop offset="50%" stopColor="#0891B2" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#00C07F" stopOpacity="0.3" />
        </linearGradient>
      </defs>
      
      {/* City Skyline */}
      <path 
        d="M30 160 L30 120 L45 120 L45 100 L55 100 L55 120 L70 120 L70 90 L85 90 L85 120 L95 120 L95 80 L110 80 L110 120 L120 120 L120 105 L135 105 L135 120 L150 120 L150 95 L165 95 L165 120 L170 120 L170 160 Z" 
        fill="url(#logoGradient)" 
        opacity="0.9"
      />
      
      {/* Smoke clouds */}
      <path 
        d="M60 100 Q50 80 65 70 Q80 60 75 45 Q90 50 95 40 Q100 55 115 50 Q110 65 120 75 Q105 80 100 90 Q90 85 80 95 Z" 
        fill="url(#smokeGradient)"
      />
      <path 
        d="M110 85 Q105 70 115 60 Q125 50 120 35 Q135 45 140 30 Q145 50 155 45 Q150 60 160 70 Q145 75 140 85 Q130 80 120 88 Z" 
        fill="url(#smokeGradient)"
        opacity="0.7"
      />
      
      {/* Decorative dots */}
      <circle cx="50" cy="55" r="3" fill="#00C07F" opacity="0.6" />
      <circle cx="140" cy="40" r="2" fill="#0891B2" opacity="0.6" />
      <circle cx="170" cy="60" r="2.5" fill="#00C07F" opacity="0.5" />
    </svg>
  );
}

export function LogoSmall({ className = "w-12 h-12" }: { className?: string }) {
  return (
    <svg 
      className={className}
      viewBox="0 0 200 200" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="logoGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00C07F" />
          <stop offset="100%" stopColor="#0891B2" />
        </linearGradient>
      </defs>
      
      {/* Stylized S with smoke */}
      <path 
        d="M130 50 Q150 50 150 70 Q150 90 130 90 L70 90 Q50 90 50 110 Q50 130 70 130 L130 130 Q150 130 150 150" 
        stroke="url(#logoGradient2)" 
        strokeWidth="12" 
        strokeLinecap="round"
        fill="none"
      />
      
      {/* Smoke trail */}
      <path 
        d="M150 150 Q160 160 155 170 Q145 175 150 185" 
        stroke="url(#logoGradient2)" 
        strokeWidth="8" 
        strokeLinecap="round"
        fill="none"
        opacity="0.6"
      />
      
      {/* Decorative elements */}
      <circle cx="60" cy="60" r="4" fill="#00C07F" opacity="0.4" />
      <circle cx="140" cy="40" r="3" fill="#0891B2" opacity="0.4" />
    </svg>
  );
}
