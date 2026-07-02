export type WinnerCategory = 'all' | 'sports' | 'live' | 'slots' | 'fish';

export interface Winner {
  id: number;
  username: string;
  amount: string;
  game: Exclude<WinnerCategory, 'all'>;
  thumb: string;
}

export interface Banner {
  id: number;
  title: string;
  subtitle: string;
  tag: string;
  bg: string;
  decor: [string, string, string];
}

export type CategoryId =
  | 'live'
  | 'slots'
  | 'sports'
  | 'esports'
  | 'fish'
  | 'cards'
  | 'lottery';

export interface GameCategory {
  id: CategoryId;
  title: string;
  desc: string;
  icon: string;
  featured?: boolean;
  gradient?: string;
}

export interface SubGame {
  id: number;
  name: string;
  provider: string;
  providerId: string;
  thumb: string;
  hot?: boolean;
}

export interface GameProvider {
  id: string;
  name: string;
  icon: string;
}

export interface LiveGame {
  id: number;
  name: string;
  provider: string;
  thumb: string;
}

export type NavId = 'home' | 'promo' | 'deposit' | 'service' | 'member';

export interface BottomNavItem {
  id: NavId;
  label: string;
  icon: 'Home' | 'Gift' | 'Wallet' | 'Headphones' | 'User';
}

export interface WinnerTab {
  key: WinnerCategory;
  label: string;
}

export type PromoCategory = 'all' | 'newbie' | 'deposit' | 'rebate';

export interface PromoItem {
  id: number;
  title: string;
  subtitle: string;
  tag: string;
  category: Exclude<PromoCategory, 'all'>;
  bg: string;
  endDate: string;
  detail: string;
  rules: string[];
}

export interface PaymentMethod {
  id: string;
  name: string;
  icon: string;
  minAmount: number;
  maxAmount: number;
}

export interface ServiceChannel {
  id: string;
  name: string;
  desc: string;
  icon: string;
  available: boolean;
}

export interface FaqItem {
  id: number;
  question: string;
  answer: string;
}

export interface MemberMenuItem {
  id: string;
  label: string;
  icon: string;
}

export type MemberSectionId =
  | 'wallet'
  | 'records'
  | 'deposit-records'
  | 'vip'
  | 'security'
  | 'settings';

export const memberSectionIds: MemberSectionId[] = [
  'wallet',
  'records',
  'deposit-records',
  'vip',
  'security',
  'settings',
];
