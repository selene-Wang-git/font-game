import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { memberSectionIds, type MemberSectionId } from '../types';
import { useAuth } from '../context/AuthContext';
import { useT } from '../i18n/LocaleContext';
import { useLocalizedData } from '../i18n/useLocalizedData';
import { formatBalance } from '../utils/formatBalance';
import './MemberSectionPage.css';

function isMemberSectionId(id: string | undefined): id is MemberSectionId {
  return memberSectionIds.includes(id as MemberSectionId);
}

export default function MemberSectionPage() {
  const { sectionId } = useParams();
  const navigate = useNavigate();
  const t = useT();
  const { balance } = useAuth();
  const { getMemberSectionTitle, memberSectionData } = useLocalizedData();

  if (!isMemberSectionId(sectionId)) {
    return <Navigate to="/member" replace />;
  }

  const title = getMemberSectionTitle(sectionId);
  const sections = memberSectionData;

  return (
    <div className="member-section-page">
      <h1 className="member-section-title">{title}</h1>

      {sectionId === 'wallet' && (
        <div className="member-section-block">
          <div className="member-section-wallet-grid">
            <div className="member-section-wallet-card">
              <span className="member-section-label">{t('member.centerWallet')}</span>
              <span className="member-section-value gold">RM {formatBalance(balance)}</span>
            </div>
            <div className="member-section-wallet-card">
              <span className="member-section-label">{t('member.promoWallet')}</span>
              <span className="member-section-value">RM 0.00</span>
            </div>
          </div>
          <p className="member-section-desc">{sections.wallet.desc}</p>
          <div className="member-section-actions">
            <button
              type="button"
              className="member-section-btn primary"
              onClick={() => navigate('/deposit')}
            >
              {sections.wallet.depositBtn}
            </button>
            <button type="button" className="member-section-btn">
              {t('member.withdraw')}
            </button>
          </div>
        </div>
      )}

      {sectionId === 'records' && (
        <div className="member-section-list">
          {sections.records.items.length === 0 ? (
            <p className="member-section-empty">{sections.records.empty}</p>
          ) : (
            sections.records.items.map((item) => (
              <div key={item.id} className="member-section-row">
                <div className="member-section-row-main">
                  <span className="member-section-row-title">{item.game}</span>
                  <span className="member-section-row-time">{item.time}</span>
                </div>
                <div className="member-section-row-side">
                  <span
                    className={`member-section-status ${item.status}`}
                  >
                    {sections.records.status[item.status]}
                  </span>
                  <span className="member-section-amount">{item.amount}</span>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {sectionId === 'deposit-records' && (
        <div className="member-section-list">
          {sections['deposit-records'].items.map((item) => (
            <div key={item.id} className="member-section-row">
              <div className="member-section-row-main">
                <span className="member-section-row-title">{item.type}</span>
                <span className="member-section-row-time">{item.time}</span>
              </div>
              <div className="member-section-row-side">
                <span className={`member-section-status ${item.status}`}>
                  {sections['deposit-records'].status[item.status]}
                </span>
                <span className="member-section-amount">{item.amount}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {sectionId === 'vip' && (
        <div className="member-section-block vip-card">
          <div className="vip-level-badge">{sections.vip.level}</div>
          <p className="member-section-desc">{sections.vip.desc}</p>
          <div className="vip-progress-wrap">
            <div className="vip-progress-bar">
              <div
                className="vip-progress-fill"
                style={{ width: `${sections.vip.progress}%` }}
              />
            </div>
            <span className="vip-progress-text">{sections.vip.progressLabel}</span>
          </div>
          <ul className="member-section-benefits">
            {sections.vip.benefits.map((benefit) => (
              <li key={benefit}>{benefit}</li>
            ))}
          </ul>
        </div>
      )}

      {sectionId === 'security' && (
        <div className="member-section-list">
          {sections.security.items.map((item) => (
            <div key={item.id} className="member-section-setting-row">
              <div>
                <span className="member-section-row-title">{item.label}</span>
                <span className="member-section-row-time">{item.desc}</span>
              </div>
              <button type="button" className="member-section-link-btn">
                {item.action}
              </button>
            </div>
          ))}
        </div>
      )}

      {sectionId === 'settings' && (
        <div className="member-section-list">
          {sections.settings.items.map((item) => (
            <div key={item.id} className="member-section-setting-row">
              <span className="member-section-row-title">{item.label}</span>
              <span className="member-section-setting-value">{item.value}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
