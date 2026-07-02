import { useEffect, useState } from 'react';
import { Check } from 'lucide-react';
import { useT } from '../i18n/LocaleContext';
import { formatBalance } from '../utils/formatBalance';
import './DepositSuccessModal.css';

const DISPLAY_MS = 2000;
const FADE_MS = 400;

interface DepositSuccessModalProps {
  amount: number;
  onClose: () => void;
}

export default function DepositSuccessModal({ amount, onClose }: DepositSuccessModalProps) {
  const t = useT();
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  useEffect(() => {
    const fadeTimer = window.setTimeout(() => setClosing(true), DISPLAY_MS);
    return () => window.clearTimeout(fadeTimer);
  }, []);

  useEffect(() => {
    if (!closing) return;
    const closeTimer = window.setTimeout(onClose, FADE_MS);
    return () => window.clearTimeout(closeTimer);
  }, [closing, onClose]);

  return (
    <div
      className={`deposit-success-overlay${closing ? ' closing' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="deposit-success-title"
      aria-live="polite"
    >
      <div className="deposit-success-modal">
        <div className="deposit-success-glow-ring" aria-hidden="true" />
        <div className="deposit-success-icon-wrap">
          <Check size={32} strokeWidth={3} />
        </div>
        <h2 id="deposit-success-title" className="deposit-success-title">
          {t('deposit.successTitle')}
        </h2>
        <p className="deposit-success-message">
          {t('deposit.success', { amount: formatBalance(amount) })}
        </p>
        <span className="deposit-success-amount">RM {formatBalance(amount)}</span>
      </div>
    </div>
  );
}
