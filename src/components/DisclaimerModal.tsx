import { useEffect } from 'react';
import { ShieldAlert } from 'lucide-react';
import { useLocale } from '../i18n/LocaleContext';
import './DisclaimerModal.css';

interface DisclaimerModalProps {
  onAccept: () => void;
}

export default function DisclaimerModal({ onAccept }: DisclaimerModalProps) {
  const { t, m } = useLocale();

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div className="disclaimer-overlay">
      <div
        className="disclaimer-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="disclaimer-title"
      >
        <div className="disclaimer-glow-ring" aria-hidden="true" />
        <span className="disclaimer-age-badge">{t('disclaimer.ageBadge')}</span>
        <div className="disclaimer-icon-wrap">
          <ShieldAlert size={28} strokeWidth={2} />
        </div>
        <h2 id="disclaimer-title" className="disclaimer-title">
          {t('disclaimer.title')}
        </h2>
        <p className="disclaimer-intro">{t('disclaimer.intro')}</p>
        <ul className="disclaimer-list">
          {m.disclaimer.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p className="disclaimer-footer">{t('disclaimer.footer')}</p>
        <button type="button" className="disclaimer-accept" onClick={onAccept}>
          {t('disclaimer.accept')}
        </button>
      </div>
    </div>
  );
}
