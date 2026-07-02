import { useEffect, useRef, useState } from 'react';
import { ChevronDown, Moon, Palette, Sun, X } from 'lucide-react';
import { useTheme, type ThemeMode } from '../context/ThemeContext';
import { accentPalettes, getAccentById } from '../themes/palettes';
import { useT } from '../i18n/LocaleContext';
import './ThemeSwitcher.css';

const modeOptions: { id: ThemeMode; icon: typeof Moon }[] = [
  { id: 'dark', icon: Moon },
  { id: 'light', icon: Sun },
  { id: 'custom', icon: Palette },
];

export default function ThemeSwitcher() {
  const { mode, accentId, bgColor, bgColorHistory, setTheme, setAccent, setBgColor, removeBgColorFromHistory } =
    useTheme();
  const t = useT();
  const [open, setOpen] = useState(false);
  const [pendingBgColor, setPendingBgColor] = useState(bgColor);
  const colorInputRef = useRef<HTMLInputElement>(null);
  const ref = useRef<HTMLDivElement>(null);
  const CurrentIcon =
    mode === 'light' ? Sun : mode === 'custom' ? Palette : Moon;

  useEffect(() => {
    if (open) {
      setPendingBgColor(bgColor);
    }
  }, [open, bgColor]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleApplyBgColor = () => {
    setBgColor(pendingBgColor);
    setTheme('custom');
  };

  const isPendingBgColor = pendingBgColor.toUpperCase() !== bgColor.toUpperCase();

  return (
    <div className="theme-switcher" ref={ref}>
      <button
        type="button"
        className="theme-select"
        onClick={() => setOpen((v) => !v)}
        aria-label={t('theme.title')}
        aria-expanded={open}
      >
        <CurrentIcon size={16} />
        {mode === 'custom' && (
          <span className="theme-select-preview">
            <span
              className="theme-select-dot accent"
              style={{ background: getAccentById(accentId).accent }}
            />
            <span
              className="theme-select-dot bg"
              style={{ background: bgColor }}
            />
          </span>
        )}
        <ChevronDown size={12} className={open ? 'rotated' : ''} />
      </button>
      {open && (
        <div className="theme-dropdown">
          <ul className="theme-mode-list">
            {modeOptions.map((opt) => {
              const Icon = opt.icon;
              return (
                <li key={opt.id}>
                  <button
                    type="button"
                    className={`theme-option ${mode === opt.id ? 'active' : ''}`}
                    onClick={() => {
                      setTheme(opt.id);
                      if (opt.id !== 'custom') setOpen(false);
                    }}
                  >
                    <Icon size={14} />
                    <span>{t(`theme.${opt.id}`)}</span>
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="theme-palette-section">
            <span className="theme-palette-label">{t('theme.accentPalette')}</span>
            <div className="theme-palette-grid">
              {accentPalettes.map((palette) => (
                <button
                  key={palette.id}
                  type="button"
                  className={`theme-swatch accent-swatch ${
                    mode === 'custom' && accentId === palette.id ? 'active' : ''
                  }`}
                  style={{ background: palette.accent }}
                  aria-label={t(`theme.accentPalettes.${palette.id}`)}
                  title={t(`theme.accentPalettes.${palette.id}`)}
                  onClick={() => setAccent(palette.id)}
                />
              ))}
            </div>
          </div>

          <div className="theme-palette-section">
            <span className="theme-palette-label">{t('theme.bgPalette')}</span>
            <button
              type="button"
              className="theme-color-picker"
              onClick={() => colorInputRef.current?.click()}
              aria-label={t('theme.pickBgColor')}
            >
              <span
                className="theme-color-swatch"
                style={{ background: pendingBgColor }}
              />
              <span className="theme-color-info">
                <span className="theme-color-hint">{t('theme.pickBgColor')}</span>
                <span className="theme-color-value">{pendingBgColor.toUpperCase()}</span>
              </span>
            </button>
            <input
              ref={colorInputRef}
              type="color"
              className="theme-color-input"
              value={pendingBgColor}
              onChange={(e) => setPendingBgColor(e.target.value)}
              aria-hidden
              tabIndex={-1}
            />
            <button
              type="button"
              className="theme-color-apply"
              disabled={!isPendingBgColor}
              onClick={handleApplyBgColor}
            >
              {t('theme.applyBgColor')}
            </button>
            {bgColorHistory.length > 0 && (
              <div className="theme-bg-history">
                <span className="theme-bg-history-label">{t('theme.recentBgColors')}</span>
                <div className="theme-bg-history-grid">
                  {bgColorHistory.map((color) => (
                    <div key={color} className="theme-bg-history-item">
                      <button
                        type="button"
                        className={`theme-bg-history-swatch${
                          pendingBgColor.toUpperCase() === color.toUpperCase() ? ' active' : ''
                        }`}
                        style={{ background: color }}
                        aria-label={color.toUpperCase()}
                        title={color.toUpperCase()}
                        onClick={() => setPendingBgColor(color)}
                      />
                      <button
                        type="button"
                        className="theme-bg-history-remove"
                        aria-label={t('theme.removeBgColor')}
                        onClick={() => removeBgColorFromHistory(color)}
                      >
                        <X size={10} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
