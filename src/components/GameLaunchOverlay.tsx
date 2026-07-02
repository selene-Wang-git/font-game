import { useEffect, type CSSProperties } from 'react';
import { X, Zap } from 'lucide-react';
import { useGameLaunch } from '../context/GameLaunchContext';
import { useT } from '../i18n/LocaleContext';
import './GameLaunchOverlay.css';

const MESSAGE_KEYS = [
  'gameLaunch.connecting',
  'gameLaunch.loading',
  'gameLaunch.preparing',
] as const;

export default function GameLaunchOverlay() {
  const { launching, phase, progress, messageIndex, closeGame } = useGameLaunch();
  const t = useT();

  useEffect(() => {
    if (!launching) return;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [launching]);

  if (!launching) return null;

  const messageKey = MESSAGE_KEYS[messageIndex] ?? MESSAGE_KEYS[0];

  return (
    <div
      className={`game-launch-overlay phase-${phase}`}
      role="dialog"
      aria-modal="true"
      aria-label={launching.name}
    >
      <div className="game-launch-bg">
        <div className="game-launch-grid" />
        <div className="game-launch-particles" aria-hidden="true">
          {Array.from({ length: 24 }).map((_, i) => (
            <span key={i} className="game-launch-particle" style={{ '--i': i } as CSSProperties} />
          ))}
        </div>
        <div className="game-launch-glow" />
      </div>

      {phase === 'loading' && (
        <div className="game-launch-loading">
          <div className="game-launch-hero">
            <div className="game-launch-ring ring-outer" />
            <div className="game-launch-ring ring-inner" />
            <div className="game-launch-thumb-wrap">
              <span className="game-launch-thumb">{launching.thumb}</span>
            </div>
          </div>

          <p className="game-launch-game-name">{launching.name}</p>
          <p className="game-launch-provider">
            {t('gameLaunch.poweredBy', { provider: launching.provider })}
          </p>

          <div className="game-launch-status">
            <Zap size={14} className="game-launch-status-icon" />
            <span className="game-launch-status-text">{t(messageKey)}</span>
          </div>

          <div className="game-launch-progress-track">
            <div
              className="game-launch-progress-fill"
              style={{ width: `${progress}%` }}
            />
            <span className="game-launch-progress-glow" style={{ left: `${progress}%` }} />
          </div>
          <span className="game-launch-progress-pct">{progress}%</span>

          <button type="button" className="game-launch-cancel" onClick={closeGame}>
            {t('gameLaunch.cancel')}
          </button>
        </div>
      )}

      {phase === 'playing' && (
        <div className="game-launch-playing">
          <div
            className="game-launch-play-bg"
            style={{ '--thumb': `"${launching.thumb}"` } as CSSProperties}
          >
            <span className="game-launch-play-bg-emoji" aria-hidden="true">
              {launching.thumb}
            </span>
          </div>

          <div className="game-launch-play-frame">
            <header className="game-launch-play-header">
              <span className="game-launch-play-title">{launching.name}</span>
              <button
                type="button"
                className="game-launch-exit"
                onClick={closeGame}
                aria-label={t('gameLaunch.exit')}
              >
                <X size={18} />
              </button>
            </header>

            <div className="game-launch-play-body">
              <div className="game-launch-play-scanline" />
              <span className="game-launch-play-emoji">{launching.thumb}</span>
              <p className="game-launch-play-hint">{t('gameLaunch.playing')}</p>
              <div className="game-launch-play-pulse" />
            </div>

            <footer className="game-launch-play-footer">
              <span>{launching.provider}</span>
              <span className="game-launch-live-dot" />
              <span>{t('gameLaunch.live')}</span>
            </footer>
          </div>

          <button type="button" className="game-launch-exit-btn" onClick={closeGame}>
            {t('gameLaunch.exit')}
          </button>
        </div>
      )}
    </div>
  );
}
