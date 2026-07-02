import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import type { SubGame } from '../types';
import GameLaunchOverlay from '../components/GameLaunchOverlay';

export type GameLaunchPhase = 'idle' | 'loading' | 'playing';

export interface LaunchingGame {
  name: string;
  thumb: string;
  provider: string;
}

interface GameLaunchContextValue {
  launching: LaunchingGame | null;
  phase: GameLaunchPhase;
  progress: number;
  messageIndex: number;
  launchGame: (game: SubGame | LaunchingGame) => void;
  closeGame: () => void;
}

const GameLaunchContext = createContext<GameLaunchContextValue | null>(null);

const LAUNCH_DURATION_MS = 3400;
const MESSAGE_COUNT = 3;

export function GameLaunchProvider({ children }: { children: ReactNode }) {
  const [launching, setLaunching] = useState<LaunchingGame | null>(null);
  const [phase, setPhase] = useState<GameLaunchPhase>('idle');
  const [progress, setProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);
  const rafRef = useRef<number>(0);
  const startRef = useRef(0);

  const closeGame = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    setLaunching(null);
    setPhase('idle');
    setProgress(0);
    setMessageIndex(0);
  }, []);

  const launchGame = useCallback((game: SubGame | LaunchingGame) => {
    cancelAnimationFrame(rafRef.current);
    setLaunching({
      name: game.name,
      thumb: game.thumb,
      provider: game.provider,
    });
    setPhase('loading');
    setProgress(0);
    setMessageIndex(0);
    startRef.current = performance.now();
  }, []);

  useEffect(() => {
    if (phase !== 'loading' || !launching) return;

    const tick = (now: number) => {
      const elapsed = now - startRef.current;
      const ratio = Math.min(1, elapsed / LAUNCH_DURATION_MS);
      const eased = 1 - (1 - ratio) ** 2.2;
      const nextProgress = Math.round(eased * 100);

      setProgress(nextProgress);
      setMessageIndex(
        Math.min(MESSAGE_COUNT - 1, Math.floor(ratio * MESSAGE_COUNT)),
      );

      if (ratio < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setPhase('playing');
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [phase, launching]);

  const value = useMemo(
    () => ({
      launching,
      phase,
      progress,
      messageIndex,
      launchGame,
      closeGame,
    }),
    [launching, phase, progress, messageIndex, launchGame, closeGame],
  );

  return (
    <GameLaunchContext.Provider value={value}>
      {children}
      <GameLaunchOverlay />
    </GameLaunchContext.Provider>
  );
}

export function useGameLaunch() {
  const ctx = useContext(GameLaunchContext);
  if (!ctx) {
    throw new Error('useGameLaunch must be used within GameLaunchProvider');
  }
  return ctx;
}
