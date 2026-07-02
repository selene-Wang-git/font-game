import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import HeroCarousel from '../components/HeroCarousel';
import LatestWinners from '../components/LatestWinners';
import GameCategoryGrid from '../components/GameCategoryGrid';
import { SortableCategoryGamesSection } from '../components/CategoryGamesSection';
import HomeFooter from '../components/HomeFooter';
import { useCategorySectionOrder } from '../hooks/useCategorySectionOrder';
import { useLocalizedData } from '../i18n/useLocalizedData';
import type { CategoryId } from '../types';

export default function HomePage() {
  const { categories, categoryGames } = useLocalizedData();
  const defaultIds = categories.map((c) => c.id);
  const { order, saveOrder } = useCategorySectionOrder(defaultIds);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 10 },
    }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 250, tolerance: 6 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = order.indexOf(active.id as CategoryId);
    const newIndex = order.indexOf(over.id as CategoryId);
    if (oldIndex === -1 || newIndex === -1) return;

    saveOrder(arrayMove(order, oldIndex, newIndex));
  };

  const categoryMap = Object.fromEntries(categories.map((c) => [c.id, c]));

  return (
    <>
      <HeroCarousel />
      <LatestWinners />
      <GameCategoryGrid />
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={order} strategy={verticalListSortingStrategy}>
          {order.map((catId) => {
            const cat = categoryMap[catId];
            if (!cat) return null;
            return (
              <SortableCategoryGamesSection
                key={catId}
                id={catId}
                categoryId={catId}
                title={cat.title}
                games={categoryGames[catId]}
              />
            );
          })}
        </SortableContext>
      </DndContext>
      <HomeFooter />
    </>
  );
}
