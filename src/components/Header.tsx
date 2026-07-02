import { Menu, Home, ChevronLeft } from 'lucide-react';
import { useT } from '../i18n/LocaleContext';
import LangSwitcher from './LangSwitcher';
import ThemeSwitcher from './ThemeSwitcher';
import './Header.css';

interface HeaderProps {
  onMenuClick: () => void;
  menuOpen?: boolean;
  showBack?: boolean;
  onBack?: () => void;
  title?: string;
  onHomeClick?: () => void;
  username?: string | null;
  onLoginClick?: () => void;
  onRegisterClick?: () => void;
  onLogoutClick?: () => void;
}

export default function Header({
  onMenuClick,
  menuOpen = false,
  showBack = false,
  onBack,
  title,
  onHomeClick,
  username,
  onLoginClick,
  onRegisterClick,
  onLogoutClick,
}: HeaderProps) {
  const t = useT();
  const isLoggedIn = Boolean(username);

  return (
    <header className="header">
      {showBack ? (
        <button
          type="button"
          className="header-menu"
          aria-label={t('common.back')}
          onClick={onBack}
        >
          <ChevronLeft size={22} color="currentColor" />
        </button>
      ) : (
        <button
          type="button"
          className="header-menu"
          aria-label={t('common.menu')}
          aria-expanded={menuOpen}
          onClick={onMenuClick}
        >
          <Menu size={22} color="currentColor" />
        </button>
      )}

      <span className="header-logo">{title ?? 'momo'}</span>

      <button
        type="button"
        className="header-home-btn"
        aria-label={t('common.home')}
        onClick={onHomeClick}
      >
        <Home size={16} color="currentColor" />
      </button>

      <div className="header-actions">
        {isLoggedIn ? (
          <>
            <span className="header-username">{username}</span>
            <button type="button" className="btn-logout" onClick={onLogoutClick}>
              {t('common.logout')}
            </button>
          </>
        ) : (
          <>
            <button type="button" className="btn-login" onClick={onLoginClick}>
              {t('common.login')}
            </button>
            <button type="button" className="btn-register" onClick={onRegisterClick}>
              {t('common.register')}
            </button>
          </>
        )}
        <ThemeSwitcher />
        <LangSwitcher />
      </div>
    </header>
  );
}
