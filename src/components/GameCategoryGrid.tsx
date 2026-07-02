import { Link } from 'react-router-dom';
import type { GameCategory } from '../types';
import { useLocalizedData } from '../i18n/useLocalizedData';
import './GameCategoryGrid.css';

function CategoryCard({ category }: { category: GameCategory }) {
  const featured = category.featured;

  return (
    <div className={`category-card-flow${featured ? ' featured' : ''}`}>
      <Link
        to={`/games/${category.id}`}
        className="category-card"
        style={category.gradient ? { background: category.gradient } : undefined}
      >
        <div className="card-info">
          <div className="card-title-row">
            <span className="card-icon-sm">{category.icon}</span>
            <h3 className="card-title">{category.title}</h3>
          </div>
          <p className="card-desc">{category.desc}</p>
        </div>
        <span className="card-graphic" aria-hidden="true">
          {category.icon}
        </span>
      </Link>
    </div>
  );
}

export default function GameCategoryGrid() {
  const { categories } = useLocalizedData();

  return (
    <section className="category-section">
      <div className="category-grid">
        {categories.map((c) => (
          <CategoryCard key={c.id} category={c} />
        ))}
      </div>
    </section>
  );
}
