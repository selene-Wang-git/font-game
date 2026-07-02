import { X, Star } from 'lucide-react';
import { useT } from '../i18n/LocaleContext';
import './AppPromoBar.css';

interface AppPromoBarProps {
  onClose: () => void;
  onDownload: () => void;
}

export default function AppPromoBar({ onClose, onDownload }: AppPromoBarProps) {
  const t = useT();

  return (
    <div className="app-promo-bar">
      <div className="promo-left">
        <span className="promo-logo">momo</span>
      </div>
      <div className="promo-center">
        <span className="promo-name">Momo</span>
        <div className="promo-stars">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} size={10} fill="#ffc107" color="#ffc107" />
          ))}
        </div>
        <span className="promo-rating">5.0</span>
      </div>
      <div className="promo-right">
        <button type="button" className="btn-download" onClick={onDownload}>
          {t('common.downloadApp')}
        </button>
        <button type="button" className="btn-close" onClick={onClose} aria-label={t('common.close')}>
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
