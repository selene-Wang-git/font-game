import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import {
  addBgColorToHistory,
  loadBgColorHistory,
  removeBgColorFromHistory,
} from '../themes/bgColorHistory';
import {
  applyCustomTheme,
  clearCustomVars,
  defaultAccentId,
  defaultBgColor,
  resolveBgColor,
} from '../themes/palettes';

export type ThemeMode = 'dark' | 'light' | 'custom';

interface ThemeState {
  mode: ThemeMode;
  accentId: string;
  bgColor: string;
}

interface ThemeContextValue extends ThemeState {
  bgColorHistory: string[];
  setTheme: (mode: ThemeMode) => void;
  setAccent: (accentId: string) => void;
  setBgColor: (bgColor: string) => void;
  removeBgColorFromHistory: (bgColor: string) => void;
}

const THEME_KEY = '8win_theme';

const ThemeContext = createContext<ThemeContextValue | null>(null);

function loadThemeState(): ThemeState {
  const stored = localStorage.getItem(THEME_KEY);
  if (!stored) {
    return { mode: 'dark', accentId: defaultAccentId, bgColor: defaultBgColor };
  }
  try {
    const parsed = JSON.parse(stored) as ThemeState & {
      paletteId?: string;
      bgId?: string;
    };
    if (parsed.mode) {
      return {
        mode: parsed.mode,
        accentId: parsed.accentId ?? parsed.paletteId ?? defaultAccentId,
        bgColor: resolveBgColor(parsed.bgColor, parsed.bgId),
      };
    }
  } catch {
    if (stored === 'light') {
      return { mode: 'light', accentId: defaultAccentId, bgColor: defaultBgColor };
    }
    if (stored === 'dark') {
      return { mode: 'dark', accentId: defaultAccentId, bgColor: defaultBgColor };
    }
  }
  return { mode: 'dark', accentId: defaultAccentId, bgColor: defaultBgColor };
}

export function applyThemeState({ mode, accentId, bgColor }: ThemeState) {
  const root = document.documentElement;
  root.setAttribute('data-theme', mode === 'custom' ? 'custom' : mode);

  if (mode === 'custom') {
    applyCustomTheme(accentId, bgColor);
  } else {
    clearCustomVars();
  }
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const initialTheme = loadThemeState();
  const [state, setState] = useState<ThemeState>(initialTheme);
  const [bgColorHistory, setBgColorHistory] = useState<string[]>(() => {
    const history = loadBgColorHistory();
    if (history.length > 0) return history;
    if (initialTheme.mode === 'custom') {
      return addBgColorToHistory([], initialTheme.bgColor);
    }
    return history;
  });

  const setTheme = useCallback((mode: ThemeMode) => {
    setState((prev) => ({ ...prev, mode }));
  }, []);

  const setAccent = useCallback((accentId: string) => {
    setState((prev) => ({ ...prev, mode: 'custom', accentId }));
  }, []);

  const setBgColor = useCallback((bgColor: string) => {
    const normalized = resolveBgColor(bgColor);
    setState((prev) => ({ ...prev, mode: 'custom', bgColor: normalized }));
    setBgColorHistory((prev) => addBgColorToHistory(prev, normalized));
  }, []);

  const removeBgColorFromHistoryHandler = useCallback((bgColor: string) => {
    setBgColorHistory((prev) => removeBgColorFromHistory(prev, bgColor));
  }, []);

  useEffect(() => {
    applyThemeState(state);
    localStorage.setItem(THEME_KEY, JSON.stringify(state));
  }, [state]);

  const value = useMemo(
    () => ({
      ...state,
      bgColorHistory,
      setTheme,
      setAccent,
      setBgColor,
      removeBgColorFromHistory: removeBgColorFromHistoryHandler,
    }),
    [state, bgColorHistory, setTheme, setAccent, setBgColor, removeBgColorFromHistoryHandler],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function initTheme() {
  applyThemeState(loadThemeState());
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return ctx;
}
