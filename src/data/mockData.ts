import type {
  Winner,
  Banner,
  GameCategory,
  BottomNavItem,
  WinnerTab,
  CategoryId,
  GameProvider,
  PromoItem,
  PaymentMethod,
  NavId,
} from '../types';

interface SubGameMeta {
  id: number;
  providerId: string;
  thumb: string;
  hot?: boolean;
  name?: string;
}

export const winnerTabKeys: { key: WinnerTab['key'] }[] = [
  { key: 'all' },
  { key: 'sports' },
  { key: 'live' },
  { key: 'slots' },
];

export const winners: Winner[] = [
  { id: 1, username: '*****isy', amount: 'RM 351', game: 'slots', thumb: '🎰' },
  { id: 2, username: '*****k88', amount: 'RM 128', game: 'sports', thumb: '⚽' },
  { id: 3, username: '*****pro', amount: 'RM 520', game: 'live', thumb: '🃏' },
  { id: 4, username: '*****win', amount: 'RM 88', game: 'fish', thumb: '🐟' },
  { id: 5, username: '*****ace', amount: 'RM 999', game: 'slots', thumb: '🎰' },
  { id: 6, username: '*****top', amount: 'RM 256', game: 'live', thumb: '🃏' },
];

export const banners: Banner[] = [
  {
    id: 1,
    title: 'FIFA WORLD CUP 2026™',
    subtitle: 'WIN = 100% | LOSE ONLY 90%',
    tag: '10% Cashback on Your Loss',
    bg: 'linear-gradient(135deg, #0d1b2a 0%, #1b2838 40%, #2d4a22 100%)',
    decor: ['⚽', '🏆', '⚽'],
  },
  {
    id: 2,
    title: '新用户首充优惠',
    subtitle: '最高赠送 200%',
    tag: '限时活动',
    bg: 'linear-gradient(135deg, #2d1b00 0%, #4a3000 50%, #1a1a1a 100%)',
    decor: ['🎁', '💰', '🎉'],
  },
  {
    id: 3,
    title: '每日签到领红包',
    subtitle: '连续签到 7 天赢大奖',
    tag: '每日福利',
    bg: 'linear-gradient(135deg, #1a0a2e 0%, #3d1a6e 50%, #1a1a1a 100%)',
    decor: ['🧧', '✨', '🎊'],
  },
  {
    id: 4,
    title: 'VIP 尊享礼遇',
    subtitle: '专属客服 · 更高返水 · 生日礼金',
    tag: 'VIP 专享',
    bg: 'linear-gradient(135deg, #1a1208 0%, #4a3a10 45%, #2a1f08 100%)',
    decor: ['👑', '💎', '⭐'],
  },
  {
    id: 5,
    title: '真人娱乐返水',
    subtitle: '每日 0.8% 无限返水',
    tag: '无限返水',
    bg: 'linear-gradient(135deg, #0a1a14 0%, #1a3d2e 50%, #0d1a12 100%)',
    decor: ['🃏', '🎡', '🎲'],
  },
  {
    id: 6,
    title: '电子老虎机狂欢',
    subtitle: '周亏损救援金 RM 50 起',
    tag: '周活动',
    bg: 'linear-gradient(135deg, #2a0a1a 0%, #5a1840 50%, #1a0a14 100%)',
    decor: ['🎰', '💎', '🍒'],
  },
  {
    id: 7,
    title: '体育滚球加奖',
    subtitle: '滚球盘口额外 5% 加奖',
    tag: '体育特惠',
    bg: 'linear-gradient(135deg, #0a1628 0%, #1e3a5f 50%, #0d1a2d 100%)',
    decor: ['⚽', '🏀', '🎾'],
  },
];

export const categories: GameCategory[] = [
  {
    id: 'live',
    title: '真人',
    desc: '真人娱乐，精彩不停',
    icon: '🎡',
    featured: true,
    gradient: 'linear-gradient(90deg, #1e1e1e 0%, #3d3500 60%, #5c4d00 100%)',
  },
  { id: 'slots', title: '电子', desc: '电子老虎机，赢大奖', icon: '🎰' },
  { id: 'sports', title: '体育', desc: '感受真人体育赛事', icon: '⚽' },
  { id: 'esports', title: '电子竞技', desc: '电竞热血对决，全天候开战', icon: '🎮' },
  { id: 'fish', title: '捕鱼', desc: '捕鱼出击，满载而归', icon: '🐟' },
  { id: 'cards', title: '棋牌游戏', desc: '快节奏对局，即刻开玩', icon: '✈️' },
  { id: 'lottery', title: '彩票', desc: '一张彩票，梦想起航', icon: '🎱' },
];

export const categoryProviders: Record<CategoryId, GameProvider[]> = {
  live: [
    { id: 'evolution', name: 'Evolution', icon: '✨' },
    { id: 'sa-gaming', name: 'SA Gaming', icon: '🎴' },
    { id: 'pragmatic', name: 'Pragmatic Play', icon: '🎡' },
    { id: 'asia-gaming', name: 'Asia Gaming', icon: '🌏' },
    { id: 'wm-casino', name: 'WM Casino', icon: '♠️' },
    { id: 'dream-gaming', name: 'Dream Gaming', icon: '💎' },
  ],
  slots: [
    { id: 'pragmatic', name: 'Pragmatic Play', icon: '🎰' },
    { id: 'pg-soft', name: 'PG Soft', icon: '🐯' },
    { id: 'jili', name: 'JILI', icon: '🍒' },
    { id: 'netent', name: 'NetEnt', icon: '🏺' },
    { id: 'microgaming', name: 'Microgaming', icon: '🍬' },
    { id: 'spadegaming', name: 'Spadegaming', icon: '🐲' },
  ],
  sports: [
    { id: 'sbobet', name: 'SBOBET', icon: '⚽' },
    { id: 'im-sports', name: 'IM Sports', icon: '🏀' },
    { id: 'bti', name: 'BTi', icon: '🎾' },
    { id: 'saba', name: 'SABA', icon: '🏆' },
    { id: 'cmd368', name: 'CMD368', icon: '⚾' },
    { id: 'ug-sports', name: 'UG Sports', icon: '🏐' },
  ],
  esports: [
    { id: 'im-esports', name: 'IM Esports', icon: '🎮' },
    { id: 'tf-gaming', name: 'TF Gaming', icon: '⚔️' },
    { id: 'pinnacle', name: 'Pinnacle', icon: '🎯' },
    { id: 'saba', name: 'SABA', icon: '👑' },
  ],
  fish: [
    { id: 'jili', name: 'JILI', icon: '🐟' },
    { id: 'cq9', name: 'CQ9', icon: '🦈' },
    { id: 'ka-gaming', name: 'KA Gaming', icon: '🐸' },
    { id: 'spadegaming', name: 'Spadegaming', icon: '🐉' },
    { id: 'pg-soft', name: 'PG Soft', icon: '🐠' },
    { id: 'jdb', name: 'JDB', icon: '👑' },
  ],
  cards: [
    { id: 'ky', name: 'KY', icon: '🃏' },
    { id: 'v8', name: 'V8', icon: '♠️' },
    { id: 'w88', name: 'W88', icon: '♦️' },
    { id: 'leg', name: 'LEG', icon: '🏃' },
  ],
  lottery: [
    { id: 'ig-lottery', name: 'IG Lottery', icon: '🎱' },
    { id: 'tcg', name: 'TCG', icon: '🎲' },
    { id: 'vr-lottery', name: 'VR Lottery', icon: '🍀' },
  ],
};

export const categoryGames: Record<CategoryId, SubGameMeta[]> = {
  live: [
    { id: 1, providerId: 'evolution', thumb: '🃏', hot: true },
    { id: 7, providerId: 'evolution', thumb: '🂡', name: '21点' },
    { id: 8, providerId: 'evolution', thumb: '⚡', name: '闪电百家乐' },
    { id: 2, providerId: 'sa-gaming', thumb: '🐉' },
    { id: 9, providerId: 'sa-gaming', thumb: '🎲', name: '骰宝' },
    { id: 3, providerId: 'pragmatic', thumb: '🎡', hot: true },
    { id: 10, providerId: 'pragmatic', thumb: '🎪', name: '游戏秀' },
    { id: 4, providerId: 'asia-gaming', thumb: '🎲' },
    { id: 5, providerId: 'wm-casino', thumb: '♠️' },
    { id: 6, providerId: 'dream-gaming', thumb: '🐂' },
  ],
  slots: [
    { id: 1, providerId: 'pragmatic', thumb: '🎰', hot: true },
    { id: 7, providerId: 'pragmatic', thumb: '🔥', name: '奥林匹斯之门' },
    { id: 2, providerId: 'pg-soft', thumb: '⛏️' },
    { id: 8, providerId: 'pg-soft', thumb: '🐯', name: '麻将胡了' },
    { id: 3, providerId: 'jili', thumb: '🍒' },
    { id: 9, providerId: 'jili', thumb: '💎', name: '宝石派对' },
    { id: 4, providerId: 'netent', thumb: '🏺', hot: true },
    { id: 5, providerId: 'microgaming', thumb: '🍬' },
    { id: 6, providerId: 'spadegaming', thumb: '🐲' },
  ],
  sports: [
    { id: 1, providerId: 'sbobet', thumb: '⚽', hot: true },
    { id: 7, providerId: 'sbobet', thumb: '🏈', name: '美式足球' },
    { id: 2, providerId: 'im-sports', thumb: '🏀' },
    { id: 8, providerId: 'im-sports', thumb: '🏓', name: '乒乓球' },
    { id: 3, providerId: 'bti', thumb: '🎾' },
    { id: 4, providerId: 'saba', thumb: '🎮' },
    { id: 5, providerId: 'cmd368', thumb: '⚾' },
    { id: 6, providerId: 'ug-sports', thumb: '🏐' },
  ],
  esports: [
    { id: 1, providerId: 'im-esports', thumb: '🎮', hot: true },
    { id: 7, providerId: 'im-esports', thumb: '🪖', name: '绝地求生' },
    { id: 2, providerId: 'tf-gaming', thumb: '⚔️' },
    { id: 8, providerId: 'tf-gaming', thumb: '💥', name: 'Valorant' },
    { id: 3, providerId: 'pinnacle', thumb: '🔫' },
    { id: 4, providerId: 'saba', thumb: '👑', hot: true },
  ],
  fish: [
    { id: 1, providerId: 'jili', thumb: '🐟', hot: true },
    { id: 7, providerId: 'jili', thumb: '🦑', name: '千炮捕鱼' },
    { id: 2, providerId: 'cq9', thumb: '🦈' },
    { id: 3, providerId: 'ka-gaming', thumb: '🐸' },
    { id: 8, providerId: 'ka-gaming', thumb: '🐢', name: '金龟捕鱼' },
    { id: 4, providerId: 'spadegaming', thumb: '🐉' },
    { id: 5, providerId: 'pg-soft', thumb: '🐠' },
    { id: 6, providerId: 'jdb', thumb: '👑', hot: true },
  ],
  cards: [
    { id: 1, providerId: 'ky', thumb: '🃏', hot: true },
    { id: 7, providerId: 'ky', thumb: '🀄', name: '麻将' },
    { id: 2, providerId: 'v8', thumb: '♠️' },
    { id: 8, providerId: 'v8', thumb: '💧', name: '十三水' },
    { id: 3, providerId: 'w88', thumb: '♦️' },
    { id: 9, providerId: 'ky', thumb: '🃏', name: '跑得快' },
    { id: 6, providerId: 'leg', thumb: '🏃' },
  ],
  lottery: [
    { id: 1, providerId: 'ig-lottery', thumb: '🎱', hot: true },
    { id: 7, providerId: 'ig-lottery', thumb: '🏎️', name: 'PK10' },
    { id: 2, providerId: 'tcg', thumb: '🎲' },
    { id: 8, providerId: 'tcg', thumb: '🎰', name: '六合彩', hot: true },
    { id: 3, providerId: 'vr-lottery', thumb: '5️⃣' },
    { id: 6, providerId: 'vr-lottery', thumb: '🍀' },
  ],
};

export function getCategoryById(id: string) {
  return categories.find((c) => c.id === id);
}

export const navRoutes: Record<NavId, string> = {
  home: '/',
  promo: '/promo',
  deposit: '/deposit',
  service: '/service',
  member: '/member',
};

export const promoItemsMeta: Omit<
  PromoItem,
  'title' | 'subtitle' | 'tag' | 'endDate' | 'detail' | 'rules'
>[] = [
  {
    id: 1,
    category: 'newbie',
    bg: 'linear-gradient(135deg, #2d1b00 0%, #4a3000 50%, #1a1a1a 100%)',
  },
  {
    id: 2,
    category: 'newbie',
    bg: 'linear-gradient(135deg, #1a0a2e 0%, #3d1a6e 50%, #1a1a1a 100%)',
  },
  {
    id: 3,
    category: 'rebate',
    bg: 'linear-gradient(135deg, #0d1b2a 0%, #1b2838 40%, #2d4a22 100%)',
  },
  {
    id: 4,
    category: 'deposit',
    bg: 'linear-gradient(135deg, #1a2e0a 0%, #2d4a22 50%, #1a1a1a 100%)',
  },
  {
    id: 5,
    category: 'rebate',
    bg: 'linear-gradient(135deg, #1e1e1e 0%, #3d3500 60%, #5c4d00 100%)',
  },
  {
    id: 6,
    category: 'rebate',
    bg: 'linear-gradient(135deg, #2a0a1a 0%, #4a1030 50%, #1a1a1a 100%)',
  },
];

export const paymentMethodsMeta: Omit<PaymentMethod, 'name'>[] = [
  { id: 'bank', icon: '🏦', minAmount: 50, maxAmount: 50000 },
  { id: 'tng', icon: '💳', minAmount: 30, maxAmount: 5000 },
  { id: 'grab', icon: '🟢', minAmount: 30, maxAmount: 3000 },
  { id: 'usdt', icon: '₮', minAmount: 100, maxAmount: 100000 },
  { id: 'fpx', icon: '🌐', minAmount: 50, maxAmount: 30000 },
  { id: 'duit', icon: '📱', minAmount: 30, maxAmount: 10000 },
];

export const quickAmounts = [50, 100, 200, 500, 1000, 2000];

export const DISCLAIMER_ACCEPTED_KEY = 'momo_disclaimer_accepted';

export const bottomNavStructure: { id: NavId; icon: BottomNavItem['icon'] }[] = [
  { id: 'home', icon: 'Home' },
  { id: 'promo', icon: 'Gift' },
  { id: 'deposit', icon: 'Wallet' },
  { id: 'service', icon: 'Headphones' },
  { id: 'member', icon: 'User' },
];

export const appDownloadLinks = {
  ios: 'https://apps.apple.com/app/momo',
  android: 'https://play.google.com/store/apps/details?id=com.momo.app',
};

export const footerSocialLinks = [
  { id: 'telegram', icon: '✈️', url: 'https://t.me/momo_support' },
  { id: 'whatsapp', icon: '📞', url: 'https://wa.me/60123456789' },
  { id: 'facebook', icon: '📘', url: 'https://facebook.com/momo' },
  { id: 'instagram', icon: '📷', url: 'https://instagram.com/momo' },
  { id: 'youtube', icon: '▶️', url: 'https://youtube.com/@momo' },
] as const;
