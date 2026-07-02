import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { useAuth, type AuthModalMode } from '../context/AuthContext';
import { useT } from '../i18n/LocaleContext';
import './AuthModal.css';

interface AuthModalProps {
  mode: AuthModalMode;
  onClose: () => void;
}

export default function AuthModal({ mode, onClose }: AuthModalProps) {
  const { login, register } = useAuth();
  const t = useT();
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    setUsername('');
    setError('');
  }, [mode]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const action =
    mode === 'login' ? t('common.login') : t('common.register');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ok = mode === 'login' ? login(username) : register(username);
    if (!ok) {
      setError(t('auth.usernameError'));
      return;
    }
    onClose();
  };

  return (
    <div className="auth-overlay" onClick={onClose}>
      <div
        className="auth-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="auth-close"
          onClick={onClose}
          aria-label={t('common.close')}
        >
          <X size={20} />
        </button>

        <h2 id="auth-modal-title" className="auth-title">
          {mode === 'login' ? t('auth.loginTitle') : t('auth.registerTitle')}
        </h2>
        <p className="auth-subtitle">
          {t('auth.subtitle', { action })}
        </p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label className="auth-label" htmlFor="auth-username">
            {t('auth.username')}
          </label>
          <input
            id="auth-username"
            type="text"
            className="auth-input"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setError('');
            }}
            placeholder={t('auth.usernamePlaceholder')}
            maxLength={6}
            autoComplete="username"
            autoFocus
          />
          <p className="auth-hint">{t('auth.hint')}</p>

          {error && <p className="auth-error">{error}</p>}

          <button type="submit" className="auth-submit">
            {mode === 'login' ? t('auth.submitLogin') : t('auth.submitRegister')}
          </button>
        </form>
      </div>
    </div>
  );
}
