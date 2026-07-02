import { resolveBgColor } from './palettes';

const BG_HISTORY_KEY = 'momo_bg_color_history';
const MAX_HISTORY = 12;

export function loadBgColorHistory(): string[] {
  const raw = localStorage.getItem(BG_HISTORY_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as string[];
    if (!Array.isArray(parsed)) return [];
    return parsed
      .map((c) => resolveBgColor(c))
      .filter((c, i, arr) => arr.indexOf(c) === i)
      .slice(0, MAX_HISTORY);
  } catch {
    return [];
  }
}

function saveBgColorHistory(colors: string[]) {
  localStorage.setItem(BG_HISTORY_KEY, JSON.stringify(colors));
}

export function addBgColorToHistory(colors: string[], color: string): string[] {
  const normalized = resolveBgColor(color);
  const next = [
    normalized,
    ...colors.filter((c) => c !== normalized),
  ].slice(0, MAX_HISTORY);
  saveBgColorHistory(next);
  return next;
}

export function removeBgColorFromHistory(colors: string[], color: string): string[] {
  const normalized = resolveBgColor(color);
  const next = colors.filter((c) => c !== normalized);
  saveBgColorHistory(next);
  return next;
}
