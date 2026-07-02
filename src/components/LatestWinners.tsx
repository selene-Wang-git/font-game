import { useMemo, useState, type CSSProperties } from 'react';
import type { WinnerCategory } from '../types';
import { winners } from '../data/mockData';
import { useLocalizedData } from '../i18n/useLocalizedData';
import { useT } from '../i18n/LocaleContext';
import './LatestWinners.css';

export default function LatestWinners() {
  const t = useT();
  const { winnerTabs } = useLocalizedData();
  const [activeTab, setActiveTab] = useState<WinnerCategory>('all');

  const filtered =
    activeTab === 'all'
      ? winners
      : winners.filter((w) => w.game === activeTab);

  const loopItems = useMemo(
    () => [...filtered, ...filtered],
    [filtered],
  );

  const marqueeDuration = Math.max(16, filtered.length * 3.5);

  return (
    <section className="latest-winners">
      <div className="section-header">
        <span className="section-icon" />
        <h2 className="section-title">{t('winners.title')}</h2>
      </div>

      <div className="winner-tabs">
        {winnerTabs.map((tab) => (
          <button
            key={tab.key}
            type="button"
            className={`winner-tab ${activeTab === tab.key ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="winner-scroll-viewport">
        <div
          key={activeTab}
          className="winner-scroll-track"
          style={{ '--marquee-duration': `${marqueeDuration}s` } as CSSProperties}
        >
          {loopItems.map((w, index) => (
            <div key={`${w.id}-${index}`} className="winner-card">
              <div className="winner-thumb">{w.thumb}</div>
              <span className="winner-name">{w.username}</span>
              <span className="winner-amount">{w.amount}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
