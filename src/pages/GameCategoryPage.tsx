import { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import type { CategoryId } from '../types';
import { useGameLaunch } from '../context/GameLaunchContext';
import { useT } from '../i18n/LocaleContext';
import { useLocalizedData } from '../i18n/useLocalizedData';
import './GameCategoryPage.css';

const categoryIds: CategoryId[] = [
  'live',
  'slots',
  'sports',
  'esports',
  'fish',
  'cards',
  'lottery',
];

function isCategoryId(id: string | undefined): id is CategoryId {
  return categoryIds.includes(id as CategoryId);
}

export default function GameCategoryPage() {
  const t = useT();
  const { launchGame } = useGameLaunch();
  const { getCategoryById, categoryGames, categoryProviders } = useLocalizedData();
  const { categoryId } = useParams();
  const [activeProvider, setActiveProvider] = useState('all');

  useEffect(() => {
    setActiveProvider('all');
  }, [categoryId]);

  const category = getCategoryById(categoryId ?? '');
  const isValid = isCategoryId(categoryId) && category;

  const providers = isValid ? categoryProviders[categoryId] : [];
  const games = isValid ? categoryGames[categoryId] : [];
  const filteredGames =
    !isValid || activeProvider === 'all'
      ? games
      : games.filter((g) => g.providerId === activeProvider);

  const activeProviderName =
    activeProvider === 'all'
      ? t('gameLobby.allProviders')
      : providers.find((p) => p.id === activeProvider)?.name;

  if (!isValid) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="game-category-page">
      <div
        className="category-banner"
        style={category.gradient ? { background: category.gradient } : undefined}
      >
        <span className="category-banner-icon">{category.icon}</span>
        <div className="category-banner-text">
          <h1 className="category-banner-title">{category.title}</h1>
          <p className="category-banner-desc">{category.desc}</p>
        </div>
      </div>

      <div className="provider-filter-section">
        <span className="provider-filter-label">{t('gameLobby.providers')}</span>
        <div className="provider-filter-scroll">
          <button
            type="button"
            className={`provider-chip ${activeProvider === 'all' ? 'active' : ''}`}
            onClick={() => setActiveProvider('all')}
          >
            {t('gameLobby.allProviders')}
          </button>
          {providers.map((provider) => (
            <button
              key={provider.id}
              type="button"
              className={`provider-chip ${activeProvider === provider.id ? 'active' : ''}`}
              onClick={() => setActiveProvider(provider.id)}
            >
              <span className="provider-chip-icon" aria-hidden="true">
                {provider.icon}
              </span>
              {provider.name}
            </button>
          ))}
        </div>
      </div>

      <div className="provider-games-header">
        <h2 className="provider-games-title">{activeProviderName}</h2>
        <span className="provider-games-count">
          {t('gameLobby.gameCount', { count: filteredGames.length })}
        </span>
      </div>

      <div className="game-list-grid">
        {filteredGames.map((game) => (
          <button
            key={`${game.providerId}-${game.id}`}
            type="button"
            className="game-list-card"
            onClick={() => launchGame(game)}
          >
            <div className="game-list-thumb game-thumb-luxe">
              {game.hot && <span className="game-hot-badge">{t('common.hot')}</span>}
              <span className="game-list-emoji">{game.thumb}</span>
            </div>
            <span className="game-list-name">{game.name}</span>
            <span className="game-list-provider">{game.provider}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
