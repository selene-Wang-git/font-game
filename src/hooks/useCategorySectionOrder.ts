import { useCallback, useEffect, useState } from 'react';
import type { CategoryId } from '../types';

const ORDER_KEY = 'momo_category_section_order';

function mergeOrder(stored: CategoryId[], defaults: CategoryId[]): CategoryId[] {
  const valid = stored.filter((id) => defaults.includes(id));
  const missing = defaults.filter((id) => !valid.includes(id));
  return [...valid, ...missing];
}

function loadOrder(defaults: CategoryId[]): CategoryId[] {
  const raw = localStorage.getItem(ORDER_KEY);
  if (!raw) return defaults;
  try {
    const parsed = JSON.parse(raw) as CategoryId[];
    if (Array.isArray(parsed) && parsed.length > 0) {
      return mergeOrder(parsed, defaults);
    }
  } catch {
    /* ignore */
  }
  return defaults;
}

export function useCategorySectionOrder(defaultIds: CategoryId[]) {
  const [order, setOrder] = useState<CategoryId[]>(() => loadOrder(defaultIds));
  const defaultKey = defaultIds.join(',');

  useEffect(() => {
    setOrder((prev) => mergeOrder(prev, defaultIds));
  }, [defaultKey]);

  const saveOrder = useCallback((next: CategoryId[]) => {
    setOrder(next);
    localStorage.setItem(ORDER_KEY, JSON.stringify(next));
  }, []);

  return { order, saveOrder };
}
