import { useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useLocale } from '../i18n/LocaleContext';
import { locales } from '../i18n/types';
import './LangSwitcher.css';

export default function LangSwitcher() {
  const { locale, setLocale, t } = useLocale();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const current = locales.find((l) => l.code === locale)!;

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div className="lang-switcher" ref={ref}>
      <button
        type="button"
        className="lang-select"
        onClick={() => setOpen((v) => !v)}
        aria-label={t('lang.title')}
        aria-expanded={open}
      >
        <span className="flag">{current.flag}</span>
        <ChevronDown size={12} className={open ? 'rotated' : ''} />
      </button>
      {open && (
        <ul className="lang-dropdown">
          {locales.map((l) => (
            <li key={l.code}>
              <button
                type="button"
                className={`lang-option ${locale === l.code ? 'active' : ''}`}
                onClick={() => {
                  setLocale(l.code);
                  setOpen(false);
                }}
              >
                <span className="flag">{l.flag}</span>
                <span>{l.label}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
