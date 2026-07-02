import { useEffect, type CSSProperties } from 'react';
import { Apple, Smartphone, X, Zap, Shield, Gift } from 'lucide-react';
import { appDownloadLinks } from '../data/mockData';
import { useLocale } from '../i18n/LocaleContext';
import './DownloadAppModal.css';

const FEATURE_ICONS = [Zap, Shield, Gift] as const;

interface DownloadAppModalProps {
  onClose: () => void;
}

export default function DownloadAppModal({ onClose }: DownloadAppModalProps) {
  const { t, m } = useLocale();

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div className="download-modal-overlay" onClick={onClose}>
      <div
        className="download-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="download-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="download-modal-bg-fx" aria-hidden="true">
          <div className="download-modal-grid" />
          {Array.from({ length: 16 }).map((_, i) => (
            <span
              key={i}
              className="download-modal-particle"
              style={{ '--i': i } as CSSProperties}
            />
          ))}
        </div>

        <div className="download-modal-glow-ring" aria-hidden="true" />
        <button
          type="button"
          className="download-modal-close"
          onClick={onClose}
          aria-label={t('common.close')}
        >
          <X size={18} />
        </button>

        <div className="download-modal-phone">
          <div className="download-modal-phone-screen">
            <span className="download-modal-phone-logo">Momo</span>
            <span className="download-modal-phone-emoji">🎰</span>
          </div>
        </div>

        <span className="download-modal-bonus">{t('downloadModal.bonus')}</span>
        <h2 id="download-modal-title" className="download-modal-title">
          {t('downloadModal.title')}
        </h2>
        <p className="download-modal-subtitle">{t('downloadModal.subtitle')}</p>

        <ul className="download-modal-features">
          {m.downloadModal.features.map((label, index) => {
            const Icon = FEATURE_ICONS[index] ?? Zap;
            return (
              <li key={label}>
                <Icon size={14} />
                <span>{label}</span>
              </li>
            );
          })}
        </ul>

        <div className="download-modal-actions">
          <a
            className="download-modal-btn ios"
            href={appDownloadLinks.ios}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Apple size={20} />
            <span>{t('downloadModal.ios')}</span>
          </a>
          <a
            className="download-modal-btn android"
            href={appDownloadLinks.android}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Smartphone size={20} />
            <span>{t('downloadModal.android')}</span>
          </a>
        </div>

        <div className="download-modal-qr">
          <div className="download-modal-qr-code" aria-hidden="true">
            {Array.from({ length: 49 }).map((_, i) => (
              <span
                key={i}
                className={`download-modal-qr-cell${(i * 7 + 3) % 5 < 2 ? ' filled' : ''}`}
              />
            ))}
          </div>
          <span className="download-modal-qr-hint">{t('downloadModal.qrHint')}</span>
        </div>
      </div>
    </div>
  );
}
