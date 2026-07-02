import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useT } from '../i18n/LocaleContext';
import './LogoutConfirmModal.css';

export default function LogoutConfirmModal() {
  const { confirmLogout, cancelLogout } = useAuth();
  const t = useT();

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div className="logout-confirm-overlay" onClick={cancelLogout}>
      <div
        className="logout-confirm-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="logout-confirm-title"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="logout-confirm-title" className="logout-confirm-title">
          {t('auth.logoutConfirmTitle')}
        </h2>
        <p className="logout-confirm-message">{t('auth.logoutConfirmMessage')}</p>
        <div className="logout-confirm-actions">
          <button
            type="button"
            className="logout-confirm-cancel"
            onClick={cancelLogout}
          >
            {t('auth.logoutCancel')}
          </button>
          <button
            type="button"
            className="logout-confirm-submit"
            onClick={confirmLogout}
          >
            {t('auth.logoutConfirm')}
          </button>
        </div>
      </div>
    </div>
  );
}
