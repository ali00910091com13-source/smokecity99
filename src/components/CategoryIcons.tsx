// Category Icons as SVG components
export function PodIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C10.5 2 9.5 3 9.5 4.5V8H8C6.5 8 5.5 9 5.5 10.5V19C5.5 20.5 6.5 21.5 8 21.5H16C17.5 21.5 18.5 20.5 18.5 19V10.5C18.5 9 17.5 8 16 8H14.5V4.5C14.5 3 13.5 2 12 2Z" 
        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M10 12H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="12" cy="16" r="1.5" fill="currentColor"/>
    </svg>
  );
}

export function VapeIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 3H16V6H8V3Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M9 6V21H15V6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M11 10C11 10 10 11 10 12C10 13 11 14 11 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M13 10C13 10 14 11 14 12C14 13 13 14 13 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

export function SaltIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 3H15L16 7H8L9 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8 7V19C8 20.1046 8.89543 21 10 21H14C15.1046 21 16 20.1046 16 19V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M10 11H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M10 14H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="12" cy="17" r="1" fill="currentColor"/>
    </svg>
  );
}

export function JuiceIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 2H16V5H8V2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M7 5H17L16 22H8L7 5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M10 9C10 9 9 11 9 12C9 13 10 14 10 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M14 9C14 9 15 11 15 12C15 13 14 14 14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M10 17H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

export function CoilIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M13 2L4 14H12L11 22L20 10H12L13 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export function AccessoryIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14.7 6.3C14.3 5.9 13.7 5.9 13.3 6.3L6.3 13.3C5.9 13.7 5.9 14.3 6.3 14.7L9.3 17.7C9.7 18.1 10.3 18.1 10.7 17.7L17.7 10.7C18.1 10.3 18.1 9.7 17.7 9.3L14.7 6.3Z" 
        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M11 9L15 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M3 21L8 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M16 3L21 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

// Get category icon by ID
export function getCategoryIcon(categoryId: string, className: string = "w-8 h-8") {
  switch (categoryId) {
    case 'pod': return <PodIcon className={className} />;
    case 'vape': return <VapeIcon className={className} />;
    case 'salt': return <SaltIcon className={className} />;
    case 'juice': return <JuiceIcon className={className} />;
    case 'coil': return <CoilIcon className={className} />;
    case 'accessory': return <AccessoryIcon className={className} />;
    default: return <PodIcon className={className} />;
  }
}
