import { NavItem, ShortDrama, CategoryItem, BaseItem, ActivityItem } from './types';

// High quality placeholder for logo
export const APP_LOGO = "/src/assets/images/regenerated_image_1777879122111.png"; 

export const TAB_BAR: NavItem[] = [
  { label: '首页', id: 'home', icon: 'Home', path: '/' },
  { label: '基地', id: 'base', icon: 'Warehouse', path: '/base' },
  { label: '发现', id: 'discover', icon: 'Compass', path: '/discover' },
  { label: '商城', id: 'mall', icon: 'ShoppingCart', path: '/mall' },
  { label: '我的', id: 'mine', icon: 'User', path: '/mine' },
];

export const HOME_CATEGORIES: CategoryItem[] = [
  { id: 'copyright', label: '版权销售', iconUrl: 'https://images.unsplash.com/photo-1454165833767-027508496b60?w=128&h=128&fit=crop', path: '/copyright' },
  { id: 'production', label: '拍摄制作', iconUrl: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=128&h=128&fit=crop', path: '/production' },
  { id: 'actors', label: '演员孵化', iconUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=128&h=128&fit=crop', path: '/actors' },
  { id: 'filming', label: '影视基地', iconUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=128&h=128&fit=crop', path: '/filming' },
  { id: 'tourism', label: '文化旅游', iconUrl: 'https://images.unsplash.com/photo-1527685238219-c848674c3766?w=128&h=128&fit=crop', path: '/tourism' },
];

export const HOT_DRAMAS: ShortDrama[] = [
  { id: '1', title: '《逆袭之星途璀璨》', imageUrl: 'https://images.unsplash.com/photo-1594909122845-11baa439b7bf?q=80&w=400&h=600&fit=crop' },
  { id: '2', title: '《总裁的替身娇妻》', imageUrl: 'https://images.unsplash.com/photo-1544208453-ca422f28b7e2?q=80&w=400&h=600&fit=crop' },
  { id: '3', title: '《重生之我在娱乐圈》', imageUrl: 'https://images.unsplash.com/photo-1496337583146-856e6115ddba?q=80&w=400&h=600&fit=crop' },
  { id: '4', title: '《绝世战神》', imageUrl: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=400&h=600&fit=crop' },
  { id: '5', title: '《落魄千金逆袭记》', imageUrl: 'https://images.unsplash.com/photo-1540575861501-7c91bc177d4c?q=80&w=400&h=600&fit=crop' },
  { id: '6', title: '《我的室友是大佬》', imageUrl: 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?q=80&w=400&h=600&fit=crop' },
];

export const BASES: BaseItem[] = [
  { id: '1', title: '中国盐田山海都市片场', location: '深圳 · 盐田', imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&h=450&fit=crop', tags: ['海景基地', '现代都市'], region: '华南' },
  { id: '2', title: '横店影视城拍摄基地', location: '浙江 · 横店', imageUrl: 'https://images.unsplash.com/photo-1505761671935-60b3a7427bad?q=80&w=800&h=450&fit=crop', tags: ['古装基地', '影视城'], region: '华东' },
  { id: '4', title: '中星短剧（恩施）影视基地', location: '恩施 · 地心谷', imageUrl: 'https://images.unsplash.com/photo-1510711789248-087061cda288?q=80&w=800&h=450&fit=crop', tags: ['峡谷奇观', '实景拍摄'], region: '华中' },
  { id: '5', title: '中星短剧（宜昌）影视基地', location: '宜昌 · 王昭君故里', imageUrl: 'https://images.unsplash.com/photo-1515286558661-39726207049c?q=80&w=800&h=450&fit=crop', tags: ['古风建筑', '文化胜地'], region: '华中' },
  { id: '6', title: '中星短剧（成都）影视基地', location: '成都 · 太古里', imageUrl: 'https://images.unsplash.com/photo-1565507425126-70e0600a946b?q=80&w=800&h=450&fit=crop', tags: ['繁华都市', '潮流地标'], region: '西南' },
  { id: '7', title: '中星短剧（云南）影视基地', location: '云南 · 大理', imageUrl: 'https://images.unsplash.com/photo-1527685238219-c848674c3766?q=80&w=800&h=450&fit=crop', tags: ['苍山洱海', '古城风韵'], region: '西南' },
];

export const DISCOVER_NEWS = [
  { id: '1', title: '短剧行业发展趋势分析', date: '2024-06-10', imageUrl: 'https://images.unsplash.com/photo-1454165833767-027508496b60?q=80&w=400&h=300&fit=crop' },
  { id: '2', title: '如何打造爆款短剧', date: '2024-06-08', imageUrl: 'https://images.unsplash.com/photo-1492724441997-5dc865305da7?q=80&w=400&h=300&fit=crop' },
  { id: '3', title: '中星影视生态链战略发布会', date: '2024-06-05', imageUrl: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=400&h=300&fit=crop' },
];

export const MALL_PRODUCTS = [
  { id: '1', title: '中星短剧纪念册', price: 99, imageUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=400&h=400&fit=crop' },
  { id: '2', title: '明星签名照', price: 199, imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&h=400&fit=crop' },
  { id: '3', title: '中星文创T恤', price: 129, imageUrl: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=400&h=400&fit=crop' },
  { id: '4', title: '短剧同款挂饰', price: 49, imageUrl: 'https://images.unsplash.com/photo-1511162845337-057f6d13731f?q=80&w=400&h=400&fit=crop' },
  { id: '5', title: '剧组帆布袋', price: 39, imageUrl: 'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=400&h=400&fit=crop' },
  { id: '6', title: '定制充电宝', price: 159, imageUrl: 'https://images.unsplash.com/photo-1628527304948-06157ee3c8a6?q=80&w=400&h=400&fit=crop' },
];
