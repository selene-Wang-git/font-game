import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useT } from '../i18n/LocaleContext';
import { useLocalizedData } from '../i18n/useLocalizedData';
import './ServicePage.css';

export default function ServicePage() {
  const t = useT();
  const { serviceChannels, faqItems } = useLocalizedData();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="service-page">
      <div className="service-banner">
        <span className="service-banner-icon">🎧</span>
        <div>
          <h1 className="service-banner-title">{t('service.bannerTitle')}</h1>
          <p className="service-banner-desc">{t('service.bannerDesc')}</p>
        </div>
      </div>

      <section className="service-section">
        <h2 className="service-section-title">{t('service.contact')}</h2>
        <div className="channel-list">
          {serviceChannels.map((ch) => (
            <button
              key={ch.id}
              type="button"
              className="channel-card"
              disabled={!ch.available}
            >
              <span className="channel-icon">{ch.icon}</span>
              <div className="channel-info">
                <span className="channel-name">{ch.name}</span>
                <span className="channel-desc">{ch.desc}</span>
              </div>
              <span className="channel-status">
                {ch.available ? t('common.online') : t('common.offline')}
              </span>
            </button>
          ))}
        </div>
      </section>

      <section className="service-section">
        <h2 className="service-section-title">{t('service.faq')}</h2>
        <div className="faq-list">
          {faqItems.map((faq) => {
            const isOpen = openFaq === faq.id;
            return (
              <div key={faq.id} className={`faq-item ${isOpen ? 'open' : ''}`}>
                <button
                  type="button"
                  className="faq-question"
                  onClick={() => setOpenFaq(isOpen ? null : faq.id)}
                >
                  <span>{faq.question}</span>
                  <ChevronDown size={16} className="faq-chevron" />
                </button>
                {isOpen && <p className="faq-answer">{faq.answer}</p>}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
