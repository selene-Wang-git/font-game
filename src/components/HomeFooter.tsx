import { Apple, Smartphone } from 'lucide-react';
import { appDownloadLinks, footerSocialLinks } from '../data/mockData';
import { useT } from '../i18n/LocaleContext';
import './HomeFooter.css';

export default function HomeFooter() {
  const t = useT();
  const year = new Date().getFullYear();

  return (
    <footer className="home-footer">
      <div className="home-footer-brand">
        <span className="home-footer-logo">Momo</span>
        <p className="home-footer-slogan">{t('footer.slogan')}</p>
        <p className="home-footer-desc">{t('footer.desc')}</p>
        <span className="home-footer-badge">{t('footer.licensed')}</span>
      </div>

      <section className="home-footer-section">
        <h2 className="home-footer-heading">{t('footer.downloadTitle')}</h2>
        <p className="home-footer-sub">{t('footer.downloadDesc')}</p>
        <div className="home-footer-downloads">
          <a
            className="home-footer-download-btn"
            href={appDownloadLinks.ios}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Apple size={18} />
            <span>{t('footer.downloadIos')}</span>
          </a>
          <a
            className="home-footer-download-btn"
            href={appDownloadLinks.android}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Smartphone size={18} />
            <span>{t('footer.downloadAndroid')}</span>
          </a>
        </div>
      </section>

      <section className="home-footer-section">
        <h2 className="home-footer-heading">{t('footer.followUs')}</h2>
        <div className="home-footer-social">
          {footerSocialLinks.map((link) => (
            <a
              key={link.id}
              className="home-footer-social-link"
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t(`footer.social.${link.id}`)}
            >
              <span className="home-footer-social-icon">{link.icon}</span>
              <span className="home-footer-social-label">
                {t(`footer.social.${link.id}`)}
              </span>
            </a>
          ))}
        </div>
      </section>

      <div className="home-footer-bottom">
        <p className="home-footer-copyright">{t('footer.copyright', { year })}</p>
        <p className="home-footer-legal">{t('footer.legal')}</p>
      </div>
    </footer>
  );
}
