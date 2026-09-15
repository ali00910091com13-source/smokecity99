export interface Product {
  id: number;
  name: string;
  nameEn: string;
  brand: string;
  category: string;
  price: number;
  originalPrice?: number;
  image: string;
  images: string[];
  rating: number;
  reviews: number;
  stock: number;
  nicotine?: string;
  flavor?: string;
  flavorProfile?: string[];
  battery?: string;
  wattage?: string;
  port?: string;
  capacity?: string;
  description: string;
  colors?: string[];
  flavors?: string[];
  isNew?: boolean;
  isBestseller?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedFlavor?: string;
  selectedColor?: string;
}

export const categories = [
  { 
    id: 'pod', 
    name: 'پاد سیستم', 
    image: 'https://images.unsplash.com/photo-1560913210-59b747b4a0a0?w=300&h=300&fit=crop',
    color: '#00C07F' 
  },
  { 
    id: 'vape', 
    name: 'ویپ', 
    image: 'https://images.unsplash.com/photo-1560253023-3ec5d502959f?w=300&h=300&fit=crop',
    color: '#0891B2' 
  },
  { 
    id: 'salt', 
    name: 'سالت نیکوتین', 
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=300&h=300&fit=crop',
    color: '#8B5CF6' 
  },
  { 
    id: 'juice', 
    name: 'جویس', 
    image: 'https://images.unsplash.com/photo-1555255707-c07966088b7b?w=300&h=300&fit=crop',
    color: '#F59E0B' 
  },
  { 
    id: 'coil', 
    name: 'کویل', 
    image: 'https://images.unsplash.com/photo-1585076641399-5c06d1b3365f?w=300&h=300&fit=crop',
    color: '#EC4899' 
  },
  { 
    id: 'accessory', 
    name: 'لوازم جانبی', 
    image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=300&h=300&fit=crop',
    color: '#00C07F' 
  },
];

export const brands = [
  'Vaporesso', 'Geekvape', 'Elfbar', 'Oxva', 'Nasty', 'Lost Mary',
  'SMOK', 'Voopoo', 'Uwell', 'Aspire', 'Innokin', 'Joyetech'
];

export const flavorProfiles = [
  { id: 'fruity', name: 'میوه‌ای', icon: '🍓' },
  { id: 'tobacco', name: 'تنباکویی', icon: '🍂' },
  { id: 'icy', name: 'خنک و یخ', icon: '❄️' },
  { id: 'dessert', name: 'دسر و کاستارد', icon: '🍰' },
  { id: 'mint', name: 'نعنایی', icon: '🌿' },
  { id: 'drink', name: 'نوشیدنی', icon: '🥤' },
];

export const nicotineLevels = ['0', '3', '5', '25', '50'];

export const products: Product[] = [
  {
    id: 1,
    name: 'پاد سیستم اکسوا ایکس پرو',
    nameEn: 'OXVA Xlim Pro',
    brand: 'Oxva',
    category: 'pod',
    price: 1850000,
    originalPrice: 2100000,
    image: 'https://images.unsplash.com/photo-1560913210-59b747b4a0a0?w=400&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1560913210-59b747b4a0a0?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1567922045116-2a00fae2ed03?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1571266028243-3716f02d2d2e?w=600&h=600&fit=crop',
    ],
    rating: 4.8,
    reviews: 234,
    stock: 15,
    nicotine: '25',
    flavorProfile: ['fruity', 'icy'],
    battery: '1000mAh',
    wattage: '25W',
    port: 'Type-C',
    capacity: '2ml',
    description: 'پاد سیستم حرفه‌ای OXVA Xlim Pro با طراحی ارگونومیک، قابلیت تنظیم توان و سیستم جریان هوای قابل تنظیم. مناسب برای استفاده روزانه.',
    colors: ['مشکی مات', 'نقره‌ای', 'سبز نئونی', 'بنفش'],
    flavors: ['انبه یخی', 'توت‌فرنگی', 'انگور یخ', 'هندوانه'],
    isNew: true,
    isBestseller: true,
  },
  {
    id: 2,
    name: 'ویپ گیک‌ویپ اسپیریت',
    nameEn: 'Geekvape Spirit',
    brand: 'Geekvape',
    category: 'vape',
    price: 3200000,
    originalPrice: 3800000,
    image: 'https://images.unsplash.com/photo-1560253023-3ec5d502959f?w=400&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1560253023-3ec5d502959f?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&h=600&fit=crop',
    ],
    rating: 4.9,
    reviews: 189,
    stock: 8,
    nicotine: '3',
    flavorProfile: ['tobacco', 'dessert'],
    battery: '21700',
    wattage: '100W',
    port: 'Type-C',
    capacity: '5ml',
    description: 'ویپ حرفه‌ای گیک‌ویپ با چیپست GEEK 2.0، صفحه نمایش OLED و سیستم خنک‌کننده پیشرفته. تجربه‌ای بی‌نظیر از ویپینگ.',
    colors: ['مشکی کروم', 'طلایی', 'آبی متالیک'],
    flavors: ['تنباکوی کلاسیک', 'وانیل کاستارد', 'کارامل'],
    isBestseller: true,
  },
  {
    id: 3,
    name: 'سالت نیکوتین نستی منگو',
    nameEn: 'Nasty Juice Mango',
    brand: 'Nasty',
    category: 'salt',
    price: 450000,
    originalPrice: 520000,
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w600&h=600&fit=crop',
    ],
    rating: 4.7,
    reviews: 567,
    stock: 42,
    nicotine: '50',
    flavorProfile: ['fruity'],
    description: 'سالت نیکوتین پریمیوم نستی با طعم انبه رسیده استوایی. فرمولاسیون نرم و صاف با رضایت نیکوتین بالا.',
    flavors: ['انبه', 'انبه یخی', 'انبه لیمو'],
    isBestseller: true,
  },
  {
    id: 4,
    name: 'الف‌بار ۱۰۰۰۰ پاف',
    nameEn: 'Elfbar 10000',
    brand: 'Elfbar',
    category: 'pod',
    price: 980000,
    originalPrice: 1200000,
    image: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?w=400&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1576086213369-97a306d36557?w=600&h=600&fit=crop',
    ],
    rating: 4.6,
    reviews: 890,
    stock: 3,
    nicotine: '50',
    flavorProfile: ['fruity', 'drink'],
    battery: '650mAh',
    capacity: '18ml',
    description: 'ویپ یکبار مصرف الف‌بار با ۱۰۰۰۰ پاف، باتری قابل شارژ و طعم‌های متنوع. طراحی جمع‌وجور و قابل حمل.',
    colors: ['صورتی', 'آبی', 'بنفش', 'سبز'],
    flavors: ['بلوبری یخ', 'هلو', 'لیموناد', 'کولا یخ'],
    isNew: true,
  },
  {
    id: 5,
    name: 'جویس ووپو مکس',
    nameEn: 'Voopoo MAX Juice',
    brand: 'Voopoo',
    category: 'juice',
    price: 380000,
    image: 'https://images.unsplash.com/photo-1555255707-c07966088b7b?w=400&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1555255707-c07966088b7b?w=600&h=600&fit=crop',
    ],
    rating: 4.5,
    reviews: 345,
    stock: 28,
    nicotine: '3',
    flavorProfile: ['dessert', 'fruity'],
    description: 'جویس پریمیوم ووپو با ترکیب منحصربفرد میوه‌های استوایی و کرم وانیلی. مناسب برای دستگاه‌های ساب‌اهم.',
    flavors: ['توت‌فرنگی کرم', 'بلوبری موز', 'انار گلابی'],
  },
  {
    id: 6,
    name: 'کویل Vaporesso GTi',
    nameEn: 'Vaporesso GTi Coil',
    brand: 'Vaporesso',
    category: 'coil',
    price: 280000,
    image: 'https://images.unsplash.com/photo-1585076641399-5c06d1b3365f?w=400&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1585076641399-5c06d1b3365f?w=600&h=600&fit=crop',
    ],
    rating: 4.4,
    reviews: 156,
    stock: 50,
    description: 'کویل یدکی Vaporesso GTi با مقاومت ۰.۱۵ اهم، مناسب برای ویپینگ DL. بسته ۵ عددی.',
    isNew: true,
  },
  {
    id: 7,
    name: 'لاست مری BM600',
    nameEn: 'Lost Mary BM600',
    brand: 'Lost Mary',
    category: 'pod',
    price: 750000,
    originalPrice: 890000,
    image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=400&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=600&h=600&fit=crop',
    ],
    rating: 4.7,
    reviews: 445,
    stock: 22,
    nicotine: '50',
    flavorProfile: ['fruity', 'icy'],
    battery: '550mAh',
    capacity: '10ml',
    description: 'ویپ یکبار مصرف لاست مری با طراحی زیبا و طعم‌های جذاب. ۶۰۰ پاف با نیکوتین سالت.',
    colors: ['صورتی گرادیان', 'آبی اقیانوسی', 'بنفش'],
    flavors: ['بلو رز', 'دابل اپل', 'چری آیس'],
    isBestseller: true,
  },
  {
    id: 8,
    name: 'اسمک نورد ۲',
    nameEn: 'SMOK Nord 2',
    brand: 'SMOK',
    category: 'vape',
    price: 2100000,
    image: 'https://images.unsplash.com/photo-1563252722-643a6a621b00?w=400&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1563252722-643a6a621b00?w=600&h=600&fit=crop',
    ],
    rating: 4.6,
    reviews: 278,
    stock: 12,
    nicotine: '3',
    flavorProfile: ['tobacco', 'mint'],
    battery: '1500mAh',
    wattage: '40W',
    port: 'Type-C',
    capacity: '4.5ml',
    description: 'ویپ پاد-ماد SMOK Nord 2 با باتری قدرتمند ۱۵۰۰ میلی‌آمپر و صفحه نمایش OLED. قابل استفاده با کویل‌های RPM و Nord.',
    colors: ['مشکی/قرمز', 'آبی/نقره‌ای', 'تیتانیوم'],
    flavors: ['تنباکوی گرم', 'نعنا یخی', 'لیموناد نعنایی'],
  },
  {
    id: 9,
    name: 'سالت یوول هلا',
    nameEn: 'Uwell SALIFLAVA',
    brand: 'Uwell',
    category: 'salt',
    price: 520000,
    image: 'https://images.unsplash.com/photo-1563789031959-4c02bcb41319?w=400&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-15637890319cb41319?w=600&h=600&fit=crop',
    ],
    rating: 4.8,
    reviews: 312,
    stock: 35,
    nicotine: '25',
    flavorProfile: ['dessert', 'fruity'],
    description: 'سالت نیکوتین یوول با تکنولوژی Pro-FOCS برای طعم‌دهی فوق‌العاده. ترکیب میوه‌های جنگلی با کرم.',
    flavors: ['میوه‌های جنگلی', 'وانیل کاستارد', 'سیب دارچین'],
  },
  {
    id: 10,
    name: 'شارژر فست‌شارج ویپ',
    nameEn: 'Vape Fast Charger',
    brand: 'Vaporesso',
    category: 'accessory',
    price: 180000,
    image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=400&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=600&h=600&fit=crop',
    ],
    rating: 4.3,
    reviews: 89,
    stock: 60,
    description: 'شارژر فست‌شارج USB-C مخصوص دستگاه‌های ویپ. خروجی ۲ آمپر با محافظت در برابر شارژ بیش از حد.',
  },
  {
    id: 11,
    name: 'پاد اینوکین لیجر',
    nameEn: 'Innokin Ligero',
    brand: 'Innokin',
    category: 'pod',
    price: 1450000,
    originalPrice: 1650000,
    image: 'https://images.unsplash.com/photo-1586015555751-82b4a2f7b896?w=400&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1586015555751-82b4a2f7b896?w=600&h=600&fit=crop',
    ],
    rating: 4.5,
    reviews: 167,
    stock: 18,
    nicotine: '25',
    flavorProfile: ['mint', 'tobacco'],
    battery: '800mAh',
    wattage: '15W',
    port: 'Type-C',
    capacity: '2ml',
    description: 'پاد سیستم سبک‌وزن اینوکین با طراحی مینیمال و عملکرد عالی. مناسب برای مبتدیان و حرفه‌ای‌ها.',
    colors: ['مشکی', 'سفید', 'سبز زیتونی'],
    flavors: ['نعنا خالص', 'تنباکوی ملایم', 'لیمو نعنا'],
    isNew: true,
  },
  {
    id: 12,
    name: 'جویس اسپایرت بری',
    nameEn: 'Aspire Berry Blast',
    brand: 'Aspire',
    category: 'juice',
    price: 420000,
    image: 'https://images.unsplash.com/photo-1567696911980-2eed69a46042?w=400&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1567696911980-2eed69a46042?w=600&h=600&fit=crop',
    ],
    rating: 4.6,
    reviews: 203,
    stock: 25,
    nicotine: '3',
    flavorProfile: ['fruity', 'icy'],
    description: 'جویس پریمیوم اسپایرت با ترکیب توت‌فرنگی، بلوبری و تمشک. خنک و تازه با پس‌زمینه شیرین.',
    flavors: ['میکس بری', 'توت‌فرنگی کیوی', 'انگور یخی'],
  },
];

export const reviews = [
  { id: 1, productId: 1, user: 'علی م.', rating: 5, text: 'بهترین پادی که تا حالا استفاده کردم. باتری عالی و طعم‌دهی فوق‌العاده.', date: '۱۴۰۳/۰۹/۱۵' },
  { id: 2, productId: 1, user: 'سارا ک.', rating: 4, text: 'کیفیت ساخت خیلی خوبه. فقط کاش کارتریج بیشتری داشت.', date: '۱۴۰۳/۰۹/۱۰' },
  { id: 3, productId: 2, user: 'محمد ر.', rating: 5, text: 'ویپ حرفه‌ای با قدرت بالا. بخار فوق‌العاده‌ای تولید می‌کنه.', date: '۱۴۰۳/۰۸/۲۸' },
  { id: 4, productId: 3, user: 'نیلوفر ح.', rating: 5, text: 'طعم انبه‌اش واقعاً طبیعیه. خیلی راضیم.', date: '۱۴۰۳/۰۹/۰۱' },
  { id: 5, productId: 4, user: 'رضا ع.', rating: 4, text: 'نسبت به قیمتش عالیه. طعم‌هاش هم خوبن.', date: '۱۴۰۳/۰۸/۲۰' },
];
