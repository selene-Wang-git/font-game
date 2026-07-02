import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

export type AuthModalMode = 'login' | 'register';

interface User {
  username: string;
}

interface AuthContextValue {
  user: User | null;
  balance: number;
  avatar: string | null;
  login: (username: string) => boolean;
  register: (username: string) => boolean;
  logout: () => void;
  requestLogout: () => void;
  cancelLogout: () => void;
  confirmLogout: () => void;
  logoutConfirmOpen: boolean;
  deposit: (amount: number) => void;
  uploadAvatar: (dataUrl: string) => boolean;
  authModal: AuthModalMode | null;
  openAuthModal: (mode: AuthModalMode) => void;
  closeAuthModal: () => void;
}

const STORAGE_KEY = 'momo_user';
const BALANCE_KEY = 'momo_balances';
const AVATAR_KEY = 'momo_avatars';
const MAX_AVATAR_SIZE = 2 * 1024 * 1024;

const AuthContext = createContext<AuthContextValue | null>(null);

function loadBalances(): Record<string, number> {
  const stored = localStorage.getItem(BALANCE_KEY);
  if (!stored) return {};
  try {
    return JSON.parse(stored) as Record<string, number>;
  } catch {
    return {};
  }
}

function balanceKey(username: string | null) {
  return username ?? '__guest__';
}

function readBalance(username: string | null) {
  return loadBalances()[balanceKey(username)] ?? 0;
}

function saveBalance(username: string | null, balance: number) {
  const balances = loadBalances();
  balances[balanceKey(username)] = balance;
  localStorage.setItem(BALANCE_KEY, JSON.stringify(balances));
}

function loadAvatars(): Record<string, string> {
  const stored = localStorage.getItem(AVATAR_KEY);
  if (!stored) return {};
  try {
    return JSON.parse(stored) as Record<string, string>;
  } catch {
    return {};
  }
}

function readAvatar(username: string | null) {
  if (!username) return null;
  return loadAvatars()[username] ?? null;
}

function saveAvatar(username: string, dataUrl: string) {
  const avatars = loadAvatars();
  avatars[username] = dataUrl;
  localStorage.setItem(AVATAR_KEY, JSON.stringify(avatars));
}

function loadUser(): User | null {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return null;
  try {
    const parsed = JSON.parse(stored) as User;
    return parsed.username?.length === 6 ? parsed : null;
  } catch {
    return null;
  }
}

export function validateUsername(username: string): boolean {
  return username.trim().length === 6;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => loadUser());
  const [balance, setBalance] = useState(() => readBalance(loadUser()?.username ?? null));
  const [avatar, setAvatar] = useState<string | null>(() =>
    readAvatar(loadUser()?.username ?? null),
  );
  const [authModal, setAuthModal] = useState<AuthModalMode | null>(null);
  const [logoutConfirmOpen, setLogoutConfirmOpen] = useState(false);

  const persistUser = useCallback((nextUser: User) => {
    setUser(nextUser);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextUser));
    setBalance(readBalance(nextUser.username));
    setAvatar(readAvatar(nextUser.username));
  }, []);

  const login = useCallback((username: string) => {
    if (!validateUsername(username)) return false;
    const trimmed = username.trim();
    persistUser({ username: trimmed });
    return true;
  }, [persistUser]);

  const register = useCallback((username: string) => {
    if (!validateUsername(username)) return false;
    const trimmed = username.trim();
    persistUser({ username: trimmed });
    return true;
  }, [persistUser]);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
    setBalance(readBalance(null));
    setAvatar(null);
  }, []);

  const requestLogout = useCallback(() => {
    setLogoutConfirmOpen(true);
  }, []);

  const cancelLogout = useCallback(() => {
    setLogoutConfirmOpen(false);
  }, []);

  const confirmLogout = useCallback(() => {
    logout();
    setLogoutConfirmOpen(false);
  }, [logout]);

  const deposit = useCallback((amount: number) => {
    if (amount <= 0) return;
    setBalance((prev) => {
      const next = prev + amount;
      saveBalance(user?.username ?? null, next);
      return next;
    });
  }, [user]);

  const uploadAvatar = useCallback((dataUrl: string) => {
    if (!user) return false;
    saveAvatar(user.username, dataUrl);
    setAvatar(dataUrl);
    return true;
  }, [user]);

  const openAuthModal = useCallback((mode: AuthModalMode) => {
    setAuthModal(mode);
  }, []);

  const closeAuthModal = useCallback(() => {
    setAuthModal(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      balance,
      avatar,
      login,
      register,
      logout,
      requestLogout,
      cancelLogout,
      confirmLogout,
      logoutConfirmOpen,
      deposit,
      uploadAvatar,
      authModal,
      openAuthModal,
      closeAuthModal,
    }),
    [user, balance, avatar, login, register, logout, requestLogout, cancelLogout, confirmLogout, logoutConfirmOpen, deposit, uploadAvatar, authModal, openAuthModal, closeAuthModal],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export { MAX_AVATAR_SIZE };

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return ctx;
}
