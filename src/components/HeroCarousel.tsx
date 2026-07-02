import { useEffect, useState } from 'react';
import type { Banner } from '../types';
import { useT } from '../i18n/LocaleContext';
import { useLocalizedData } from '../i18n/useLocalizedData';
import './HeroCarousel.css';

function getCircularOffset(i: number, active: number, total: number) {
  let diff = i - active;
  const half = Math.floor(total / 2);
  if (diff > half) diff -= total;
  if (diff < -half) diff += total;
  return diff;
}

function slideTransform(offset: number) {
  const abs = Math.abs(offset);
  const translateX = offset * 14;
  const rotateY = offset * -22;
  const translateZ = offset === 0 ? 48 : -abs * 55;
  const scale = offset === 0 ? 1 : Math.max(0.78, 1 - abs * 0.09);

  return `translateX(${translateX}%) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`;
}

function HeroSlide({
  banner,
  offset,
  isActive,
  onSelect,
}: {
  banner: Banner;
  offset: number;
  isActive: boolean;
  onSelect: () => void;
}) {
  const abs = Math.abs(offset);

  return (
    <button
      type="button"
      className={`hero-accordion-slide${isActive ? ' active' : ''}`}
      style={{
        transform: slideTransform(offset),
        zIndex: 10 - abs,
        opacity: abs > 2 ? 0 : 1 - abs * 0.12,
        pointerEvents: abs > 2 ? 'none' : 'auto',
      }}
      onClick={onSelect}
      aria-hidden={!isActive}
      tabIndex={isActive ? 0 : -1}
    >
      <div className="hero-slide-panel" style={{ background: banner.bg }}>
        <div className="hero-content">
          <div className="hero-players" aria-hidden="true">
            <span className="player player-1">{banner.decor[0]}</span>
            <span className="player player-2">{banner.decor[1]}</span>
            <span className="player player-3">{banner.decor[2]}</span>
          </div>
          <div className="hero-text">
            <h2 className="hero-title">{banner.title}</h2>
            <p className="hero-subtitle">{banner.subtitle}</p>
            <div className="hero-contacts">
              <span>📱 WhatsApp</span>
              <span>✈️ Telegram</span>
            </div>
          </div>
          <span className="hero-tag">{banner.tag}</span>
        </div>
      </div>
    </button>
  );
}

export default function HeroCarousel() {
  const t = useT();
  const { banners } = useLocalizedData();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex((i) => (i + 1) % banners.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, [banners.length]);

  return (
    <section className="hero-carousel" aria-roledescription="carousel">
      <div className="hero-accordion-stage">
        {banners.map((banner, i) => (
          <HeroSlide
            key={banner.id}
            banner={banner}
            offset={getCircularOffset(i, index, banners.length)}
            isActive={i === index}
            onSelect={() => setIndex(i)}
          />
        ))}
      </div>

      <div className="hero-dots">
        {banners.map((b, i) => (
          <button
            key={b.id}
            type="button"
            className={`dot ${i === index ? 'active' : ''}`}
            onClick={() => setIndex(i)}
            aria-label={t('carousel.slide', { n: i + 1 })}
            aria-current={i === index ? 'true' : undefined}
          />
        ))}
      </div>
    </section>
  );
}
