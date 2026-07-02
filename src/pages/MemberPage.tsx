import { useRef, useState, type ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera } from 'lucide-react';
import { MAX_AVATAR_SIZE, useAuth } from '../context/AuthContext';
import { useT } from '../i18n/LocaleContext';
import { useLocalizedData } from '../i18n/useLocalizedData';
import { formatBalance } from '../utils/formatBalance';
import type { MemberMenuItem } from '../types';
import './MemberPage.css';

const LOGIN_REQUIRED_MENU_IDS: MemberMenuItem['id'][] = [
  'wallet',
  'records',
  'deposit-records',
  'security',
  'settings',
];

function maskUserId(username: string) {
  return username.slice(0, 2) + '****' + username.slice(-2);
}

export default function MemberPage() {
  const navigate = useNavigate();
  const t = useT();
  const { user, balance, avatar, uploadAvatar, openAuthModal, requestLogout } = useAuth();
  const { memberMenuItems } = useLocalizedData();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [avatarError, setAvatarError] = useState('');
  const isLoggedIn = Boolean(user);

  const handleAvatarClick = () => {
    if (!isLoggedIn) {
      openAuthModal('login');
      return;
    }
    setAvatarError('');
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setAvatarError(t('member.avatarInvalid'));
      return;
    }
    if (file.size > MAX_AVATAR_SIZE) {
      setAvatarError(t('member.avatarTooLarge'));
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        uploadAvatar(reader.result);
        setAvatarError('');
      }
    };
    reader.readAsDataURL(file);
  };

  const handleMenuClick = (id: MemberMenuItem['id']) => {
    if (LOGIN_REQUIRED_MENU_IDS.includes(id) && !isLoggedIn) {
      openAuthModal('login');
      return;
    }
    if (id === 'promo') {
      navigate('/promo');
      return;
    }
    if (id === 'help') {
      navigate('/service');
      return;
    }
    navigate(`/member/${id}`);
  };

  const handleWalletAction = (needsLogin: boolean) => {
    if (needsLogin && !isLoggedIn) {
      openAuthModal('login');
      return;
    }
    navigate('/member/wallet');
  };

  return (
    <div className="member-page">
      <div className="member-profile">
        <button
          type="button"
          className="member-avatar"
          onClick={handleAvatarClick}
          aria-label={t('member.uploadAvatar')}
        >
          {avatar ? (
            <img src={avatar} alt="" className="member-avatar-img" />
          ) : (
            <span className="member-avatar-fallback">
              {isLoggedIn ? '😊' : '👤'}
            </span>
          )}
          {isLoggedIn && (
            <span className="member-avatar-badge">
              <Camera size={12} />
            </span>
          )}
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="member-avatar-input"
          onChange={handleFileChange}
        />
        <div className="member-info">
          <span className="member-name">
            {isLoggedIn ? user!.username : t('common.guest')}
          </span>
          <span className="member-id">
            {t('common.id', {
              id: isLoggedIn ? maskUserId(user!.username) : '--',
            })}
          </span>
          {avatarError && (
            <span className="member-avatar-error">{avatarError}</span>
          )}
        </div>
        {isLoggedIn ? (
          <button type="button" className="member-logout-btn" onClick={requestLogout}>
            {t('auth.logoutFull')}
          </button>
        ) : (
          <button
            type="button"
            className="member-login-btn"
            onClick={() => openAuthModal('login')}
          >
            {t('auth.loginRegister')}
          </button>
        )}
      </div>

      <div className="member-wallet">
        <div className="wallet-item">
          <span className="wallet-label">{t('member.centerWallet')}</span>
          <span className="wallet-value">RM {formatBalance(balance)}</span>
        </div>
        <div className="wallet-divider" />
        <div className="wallet-item">
          <span className="wallet-label">{t('member.promoWallet')}</span>
          <span className="wallet-value">RM 0.00</span>
        </div>
      </div>

      <div className="member-actions">
        <button
          type="button"
          className="member-action-btn primary"
          onClick={() => navigate('/deposit')}
        >
          {t('nav.deposit')}
        </button>
        <button type="button" className="member-action-btn" onClick={() => handleWalletAction(true)}>
          {t('member.withdraw')}
        </button>
        <button type="button" className="member-action-btn" onClick={() => handleWalletAction(true)}>
          {t('member.transfer')}
        </button>
      </div>

      <div className="member-menu">
        {memberMenuItems.map((item) => (
          <button
            key={item.id}
            type="button"
            className="member-menu-item"
            onClick={() => handleMenuClick(item.id)}
          >
            <span className="menu-item-icon">{item.icon}</span>
            <span className="menu-item-label">{item.label}</span>
            <span className="menu-item-arrow">›</span>
          </button>
        ))}
      </div>
    </div>
  );
}
