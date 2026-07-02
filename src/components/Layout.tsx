import { useEffect, useState } from 'react';
import { Outlet, useLocation, useMatch, useNavigate } from 'react-router-dom';
import type { MemberSectionId, NavId } from '../types';
import { memberSectionIds } from '../types';
import { DISCLAIMER_ACCEPTED_KEY, navRoutes } from '../data/mockData';
import { useAuth } from '../context/AuthContext';
import { useLocalizedData } from '../i18n/useLocalizedData';
import AppPromoBar from './AppPromoBar';
import Header from './Header';
import SideBar from './SideBar';
import FloatingChat from './FloatingChat';
import BottomNav from './BottomNav';
import AuthModal from './AuthModal';
import LogoutConfirmModal from './LogoutConfirmModal';
import DisclaimerModal from './DisclaimerModal';
import DownloadAppModal from './DownloadAppModal';

function getActiveNav(pathname: string): NavId | null {
  if (pathname.startsWith('/promo')) return 'promo';
  if (pathname.startsWith('/member')) return 'member';
  const entry = Object.entries(navRoutes).find(([, path]) => path === pathname);
  return entry ? (entry[0] as NavId) : null;
}

export default function Layout() {
  const [showPromo, setShowPromo] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [disclaimerOpen, setDisclaimerOpen] = useState(
    () => sessionStorage.getItem(DISCLAIMER_ACCEPTED_KEY) !== '1',
  );
  const [downloadOpen, setDownloadOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, authModal, logoutConfirmOpen, openAuthModal, closeAuthModal, requestLogout } = useAuth();
  const { getCategoryById, getPromoById, getMemberSectionTitle, pageTitles } = useLocalizedData();
  const categoryMatch = useMatch('/games/:categoryId');
  const promoMatch = useMatch('/promo/:promoId');
  const memberSectionMatch = useMatch('/member/:sectionId');
  const category = categoryMatch
    ? getCategoryById(categoryMatch.params.categoryId ?? '')
    : undefined;
  const promo = promoMatch
    ? getPromoById(promoMatch.params.promoId ?? '')
    : undefined;
  const memberSectionId = memberSectionMatch?.params.sectionId;
  const memberSection =
    memberSectionId && memberSectionIds.includes(memberSectionId as MemberSectionId)
      ? (memberSectionId as MemberSectionId)
      : undefined;

  const activeNav = getActiveNav(location.pathname);
  const headerTitle =
    category?.title ??
    promo?.title ??
    (memberSection ? getMemberSectionTitle(memberSection) : undefined) ??
    pageTitles[location.pathname];
  const showBack = Boolean(category || promo || memberSection);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    if (authModal || logoutConfirmOpen || disclaimerOpen || downloadOpen) return;
    document.body.style.overflow = sidebarOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [sidebarOpen, authModal, logoutConfirmOpen, disclaimerOpen, downloadOpen]);

  const handleAcceptDisclaimer = () => {
    sessionStorage.setItem(DISCLAIMER_ACCEPTED_KEY, '1');
    setDisclaimerOpen(false);
  };

  const handleHomeClick = () => {
    navigate('/');
  };

  const handleNavChange = (id: NavId) => {
    navigate(navRoutes[id]);
  };

  return (
    <div className="app">
      {showPromo && (
        <AppPromoBar
          onClose={() => setShowPromo(false)}
          onDownload={() => setDownloadOpen(true)}
        />
      )}
      <SideBar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <Header
        menuOpen={sidebarOpen}
        onMenuClick={() => setSidebarOpen((prev) => !prev)}
        showBack={showBack}
        onBack={() => navigate(-1)}
        title={headerTitle}
        onHomeClick={handleHomeClick}
        username={user?.username}
        onLoginClick={() => openAuthModal('login')}
        onRegisterClick={() => openAuthModal('register')}
        onLogoutClick={requestLogout}
      />
      <main className="main-content">
        <Outlet />
      </main>
      {location.pathname !== '/service' && (
        <FloatingChat
          badgeCount={1}
          onClick={() => navigate('/service')}
        />
      )}
      <BottomNav active={activeNav} onChange={handleNavChange} />
      {downloadOpen && <DownloadAppModal onClose={() => setDownloadOpen(false)} />}
      {disclaimerOpen && <DisclaimerModal onAccept={handleAcceptDisclaimer} />}
      {authModal && <AuthModal mode={authModal} onClose={closeAuthModal} />}
      {logoutConfirmOpen && <LogoutConfirmModal />}
    </div>
  );
}
