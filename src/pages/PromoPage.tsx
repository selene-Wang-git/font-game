import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { PromoCategory } from '../types';
import { useT } from '../i18n/LocaleContext';
import { useLocalizedData } from '../i18n/useLocalizedData';
import './PromoPage.css';

export default function PromoPage() {
  const t = useT();
  const navigate = useNavigate();
  const { promoItems, promoTabs } = useLocalizedData();
  const [activeTab, setActiveTab] = useState<PromoCategory>('all');

  const filtered =
    activeTab === 'all'
      ? promoItems
      : promoItems.filter((p) => p.category === activeTab);

  return (
    <div className="promo-page">
      <div className="promo-tabs">
        {promoTabs.map((tab) => (
          <button
            key={tab.key}
            type="button"
            className={`promo-tab ${activeTab === tab.key ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="promo-list">
        {filtered.map((promo) => (
          <article
            key={promo.id}
            className="promo-card"
            style={{ background: promo.bg }}
            role="button"
            tabIndex={0}
            onClick={() => navigate(`/promo/${promo.id}`)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                navigate(`/promo/${promo.id}`);
              }
            }}
          >
            <span className="promo-tag">{promo.tag}</span>
            <h3 className="promo-title">{promo.title}</h3>
            <p className="promo-subtitle">{promo.subtitle}</p>
            <div className="promo-footer">
              <span className="promo-date">
                {t('common.deadline', { date: promo.endDate })}
              </span>
              <button
                type="button"
                className="promo-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/promo/${promo.id}`);
                }}
              >
                {t('common.participate')}
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
