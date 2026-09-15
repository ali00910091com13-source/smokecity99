import { motion } from 'framer-motion';

// Page Transition Variants
export const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  in: {
    opacity: 1,
    y: 0,
  },
  out: {
    opacity: 0,
    y: -20,
  },
};

export const pageTransition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.5,
};

// Fade In Up Animation
export const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: 'easeOut' }
};

// Fade In Down Animation
export const fadeInDown = {
  initial: { opacity: 0, y: -60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: 'easeOut' }
};

// Fade In Left Animation
export const fadeInLeft = {
  initial: { opacity: 0, x: -60 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6, ease: 'easeOut' }
};

// Fade In Right Animation
export const fadeInRight = {
  initial: { opacity: 0, x: 60 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6, ease: 'easeOut' }
};

// Scale In Animation
export const scaleIn = {
  initial: { opacity: 0, scale: 0.5 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.5, ease: 'easeOut' }
};

// Stagger Container
export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// Stagger Item
export const staggerItem = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

// Hover Scale Animation
export const hoverScale = {
  scale: 1.05,
  transition: { duration: 0.3 }
};

// Hover Lift Animation
export const hoverLift = {
  y: -10,
  transition: { duration: 0.3 }
};

// Pulse Animation
export const pulse = {
  scale: [1, 1.05, 1],
  transition: { duration: 2, repeat: Infinity }
};

// Bounce Animation
export const bounce = {
  y: [0, -20, 0],
  transition: { duration: 1, repeat: Infinity }
};

// Rotate Animation
export const rotate = {
  rotate: [0, 360],
  transition: { duration: 2, repeat: Infinity, ease: 'linear' }
};

// Shimmer Animation
export const shimmer = {
  backgroundPosition: ['-200% 0', '200% 0'],
  transition: { duration: 2, repeat: Infinity, ease: 'linear' }
};

// Floating Animation
export const float = {
  y: [0, -10, 0],
  transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' }
};

// Shake Animation
export const shake = {
  x: [0, -10, 10, -10, 10, 0],
  transition: { duration: 0.5 }
};

// Slide In From Right
export const slideInRight = {
  initial: { x: '100%' },
  animate: { x: 0 },
  exit: { x: '100%' },
  transition: { type: 'spring', damping: 20 }
};

// Slide In From Left
export const slideInLeft = {
  initial: { x: '-100%' },
  animate: { x: 0 },
  exit: { x: '-100%' },
  transition: { type: 'spring', damping: 20 }
};

// Card Hover Effect
export const cardHover = {
  scale: 1.03,
  boxShadow: '0px 10px 30px rgba(0, 192, 127, 0.2)',
  transition: { duration: 0.3 }
};

// Button Hover Effect
export const buttonHover = {
  scale: 1.05,
  boxShadow: '0px 5px 15px rgba(0, 192, 127, 0.3)',
  transition: { duration: 0.2 }
};

// Image Zoom Effect
export const imageZoom = {
  scale: 1.1,
  transition: { duration: 0.4 }
};

// Gradient Animation
export const gradientAnimation = {
  background: [
    'linear-gradient(45deg, #00C07F, #0891B2)',
    'linear-gradient(45deg, #0891B2, #8B5CF6)',
    'linear-gradient(45deg, #8B5CF6, #F59E0B)',
    'linear-gradient(45deg, #F59E0B, #00C07F)',
  ],
  transition: { duration: 5, repeat: Infinity }
};

// Typing Animation
export const typing = {
  width: ['0%', '100%'],
  transition: { duration: 2, ease: 'easeOut' }
};

// Counter Animation
export const countUp = {
  initial: { opacity: 0, scale: 0.5 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.5, type: 'spring', stiffness: 100 }
};

// Ripple Effect
export const ripple = {
  scale: [0, 2],
  opacity: [0.5, 0],
  transition: { duration: 0.8 }
};

// Confetti Animation
export const confetti = {
  y: [0, 100],
  x: [0, Math.random() * 200 - 100],
  rotate: [0, 360],
  opacity: [1, 0],
  transition: { duration: 2, ease: 'easeOut' }
};

// Glow Effect
export const glow = {
  boxShadow: [
    '0 0 5px rgba(0, 192, 127, 0.5)',
    '0 0 20px rgba(0, 192, 127, 0.8)',
    '0 0 5px rgba(0, 192, 127, 0.5)',
  ],
  transition: { duration: 2, repeat: Infinity }
};

// Morph Animation
export const morph = {
  borderRadius: ['0%', '50%', '0%'],
  transition: { duration: 2, repeat: Infinity }
};

// Wave Animation
export const wave = {
  y: [0, -15, 0],
  transition: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' }
};

// Swing Animation
export const swing = {
  rotate: [0, 15, -15, 15, 0],
  transition: { duration: 1, repeat: Infinity }
};

// Rubber Band Animation
export const rubberBand = {
  scaleX: [1, 1.25, 0.75, 1.15, 0.95, 1],
  scaleY: [1, 0.75, 1.25, 0.85, 1.05, 1],
  transition: { duration: 1 }
};

// Jello Animation
export const jello = {
  skewX: [0, -12.5, 6.25, -3.125, 1.5625, -0.78125, 0],
  skewY: [0, -12.5, 6.25, -3.125, 1.5625, -0.78125, 0],
  transition: { duration: 1 }
};

// Heart Beat Animation
export const heartBeat = {
  scale: [1, 1.3, 1, 1.3, 1],
  transition: { duration: 1.3, repeat: Infinity }
};

// Flash Animation
export const flash = {
  opacity: [1, 0, 1, 0, 1],
  transition: { duration: 1, repeat: Infinity }
};

// Wobble Animation
export const wobble = {
  x: [0, -25, 20, -15, 10, -5, 0],
  rotate: [0, -5, 3, -3, 2, -1, 0],
  transition: { duration: 1 }
};

// Flip Animation
export const flip = {
  rotateY: [0, 180, 360],
  transition: { duration: 1 }
};

// Slide Up Animation
export const slideUp = {
  y: [100, 0],
  opacity: [0, 1],
  transition: { duration: 0.6, ease: 'easeOut' }
};

// Slide Down Animation
export const slideDown = {
  y: [-100, 0],
  opacity: [0, 1],
  transition: { duration: 0.6, ease: 'easeOut' }
};

// Zoom In Animation
export const zoomIn = {
  scale: [0, 1],
  opacity: [0, 1],
  transition: { duration: 0.5, ease: 'easeOut' }
};

// Zoom Out Animation
export const zoomOut = {
  scale: [1, 0],
  opacity: [1, 0],
  transition: { duration: 0.5, ease: 'easeIn' }
};

// Rotate In Animation
export const rotateIn = {
  rotate: [-360, 0],
  opacity: [0, 1],
  transition: { duration: 0.8, ease: 'easeOut' }
};

// Blur In Animation
export const blurIn = {
  filter: ['blur(10px)', 'blur(0px)'],
  opacity: [0, 1],
  transition: { duration: 0.6 }
};

// Color Change Animation
export const colorChange = {
  color: ['#00C07F', '#0891B2', '#8B5CF6', '#F59E0B', '#00C07F'],
  transition: { duration: 5, repeat: Infinity }
};

// Background Color Change
export const bgColorChange = {
  backgroundColor: ['#00C07F', '#0891B2', '#8B5CF6', '#F59E0B', '#00C07F'],
  transition: { duration: 5, repeat: Infinity }
};
