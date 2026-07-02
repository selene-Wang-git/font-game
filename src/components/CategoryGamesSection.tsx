import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { DraggableAttributes } from '@dnd-kit/core';
import type { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities';
import { ChevronLeft, ChevronRight, GripVertical } from 'lucide-react';
import type { CategoryId, SubGame } from '../types';
import { useGameLaunch } from '../context/GameLaunchContext';
import { useT } from '../i18n/LocaleContext';
import './CategoryGamesSection.css';

const SCROLL_STEP = 220;

interface CategoryGamesSectionProps {
  categoryId: CategoryId;
  title: string;
  games: SubGame[];
}

function CategoryGamesSection({
  categoryId,
  title,
  games,
  dragHandleProps,
  isDragging,
}: CategoryGamesSectionProps & {
  dragHandleProps?: {
    attributes: DraggableAttributes;
    listeners: SyntheticListenerMap | undefined;
  };
  isDragging?: boolean;
}) {
  const t = useT();
  const navigate = useNavigate();
  const { launchGame } = useGameLaunch();
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    scrollRef.current?.scrollBy({
      left: direction === 'left' ? -SCROLL_STEP : SCROLL_STEP,
      behavior: 'smooth',
    });
  };

  return (
    <section
      className={`category-games-section${isDragging ? ' is-dragging' : ''}`}
    >
      <div className="category-games-header">
        <div className="section-header">
          {dragHandleProps && (
            <button
              type="button"
              className="category-games-drag-handle"
              aria-label={t('home.dragReorder')}
              {...dragHandleProps.attributes}
              {...dragHandleProps.listeners}
            >
              <GripVertical size={16} />
            </button>
          )}
          <span className="section-icon" />
          <h2 className="section-title">{title}</h2>
        </div>
        <div className="category-games-nav">
          <button
            type="button"
            className="btn-all"
            onClick={() => navigate(`/games/${categoryId}`)}
          >
            {t('common.all')}
          </button>
          <button
            type="button"
            className="nav-arrow"
            aria-label={t('liveGames.prev')}
            onClick={() => scroll('left')}
          >
            <ChevronLeft size={16} />
          </button>
          <button
            type="button"
            className="nav-arrow"
            aria-label={t('liveGames.next')}
            onClick={() => scroll('right')}
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      <div className="category-games-scroll" ref={scrollRef}>
        {games.map((game) => (
          <button
            key={game.id}
            type="button"
            className="category-game-card"
            onClick={() => launchGame(game)}
          >
            <div className="category-game-thumb game-thumb-luxe">{game.thumb}</div>
            <span className="category-game-name">{game.name}</span>
            <span className="category-game-provider">{game.provider}</span>
          </button>
        ))}
      </div>
    </section>
  );
}

export function SortableCategoryGamesSection(
  props: CategoryGamesSectionProps & { id: CategoryId },
) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`category-games-section-wrapper${isDragging ? ' is-dragging' : ''}`}
    >
      <CategoryGamesSection
        {...props}
        isDragging={isDragging}
        dragHandleProps={{ attributes, listeners }}
      />
    </div>
  );
}

export default CategoryGamesSection;
