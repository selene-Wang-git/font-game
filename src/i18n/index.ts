import zh from './locales/zh';
import en from './locales/en';
import ja from './locales/ja';
import type { Locale } from './types';
import type { Messages } from './locales/zh';

export const messages: Record<Locale, Messages> = { zh, en, ja };
