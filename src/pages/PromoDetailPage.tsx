import { Navigate, useNavigate, useParams } from 'react-router-dom';
import type { CSSProperties } from 'react';
import { useT } from '../i18n/LocaleContext';
import { useLocalizedData } from '../i18n/useLocalizedData';
import { getPromoThemeFromBg } from '../utils/promoTheme';
import './PromoDetailPage.css';

const validIds = [1, 2, 3, 4, 5, 6];

export default function PromoDetailPage() {
  const t = useT();
  const navigate = useNavigate();
  const { promoId } = useParams();
  const { getPromoById } = useLocalizedData();
  const promo = getPromoById(promoId ?? '');

  if (!promoId || !validIds.includes(Number(promoId)) || !promo) {
    return <Navigate to="/promo" replace />;
  }

  const theme = getPromoThemeFromBg(promo.bg);
  const pageStyle = {
    '--promo-accent-rgb': theme.accentRgb,
  } as CSSProperties;

  return (
    <div className="promo-detail-page" style={pageStyle}>
      <div className="promo-detail-banner-flow">
        <div className="promo-detail-banner" style={{ background: promo.bg }}>
          <span className="promo-detail-tag">{promo.tag}</span>
          <h1 className="promo-detail-title">{promo.title}</h1>
          <p className="promo-detail-subtitle">{promo.subtitle}</p>
        </div>
      </div>

      <div className="promo-detail-body-flow">
        <div className="promo-detail-body">
        <section className="promo-detail-section">
          <h2 className="promo-detail-heading">{t('promo.detail.activityTime')}</h2>
          <p className="promo-detail-text">
            {t('common.deadline', { date: promo.endDate })}
          </p>
        </section>

        <section className="promo-detail-section">
          <h2 className="promo-detail-heading">{t('promo.detail.rules')}</h2>
          <p className="promo-detail-text">{promo.detail}</p>
          <ul className="promo-detail-rules">
            {promo.rules.map((rule) => (
              <li key={rule}>{rule}</li>
            ))}
          </ul>
        </section>

        <button
          type="button"
          className="promo-detail-submit"
          onClick={() => navigate('/deposit')}
        >
          {t('common.participate')}
        </button>
        </div>
      </div>
    </div>
  );
}
