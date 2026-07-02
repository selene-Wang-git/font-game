import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { messages } from './index';
import type { Locale } from './types';
import { LOCALE_STORAGE_KEY } from './types';
import type { Messages } from './locales/zh';

type Path = string;

function getNestedValue(obj: unknown, path: string): string | undefined {
  const value = path.split('.').reduce<unknown>((acc, key) => {
    if (acc && typeof acc === 'object' && key in acc) {
      return (acc as Record<string, unknown>)[key];
    }
    return undefined;
  }, obj);
  return typeof value === 'string' ? value : undefined;
}

function interpolate(template: string, params?: Record<string, string | number>) {
  if (!params) return template;
  return Object.entries(params).reduce(
    (str, [key, val]) => str.replaceAll(`{{${key}}}`, String(val)),
    template,
  );
}

interface LocaleContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: Path, params?: Record<string, string | number>) => string;
  m: Messages;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

function loadLocale(): Locale {
  const stored = localStorage.getItem(LOCALE_STORAGE_KEY);
  if (stored === 'zh' || stored === 'en' || stored === 'ja') return stored;
  return 'zh';
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(loadLocale);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    localStorage.setItem(LOCALE_STORAGE_KEY, next);
  }, []);

  const m = messages[locale];

  const t = useCallback(
    (key: Path, params?: Record<string, string | number>) => {
      const value = getNestedValue(m, key) ?? getNestedValue(messages.zh, key) ?? key;
      return interpolate(value, params);
    },
    [m],
  );

  const value = useMemo(
    () => ({ locale, setLocale, t, m }),
    [locale, setLocale, t, m],
  );

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    throw new Error('useLocale must be used within LocaleProvider');
  }
  return ctx;
}

export function useT() {
  return useLocale().t;
}
