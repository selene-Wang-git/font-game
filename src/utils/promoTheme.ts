function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const normalized = hex.replace('#', '');
  const full =
    normalized.length === 3
      ? normalized
          .split('')
          .map((c) => c + c)
          .join('')
      : normalized.slice(0, 6);
  if (full.length !== 6 || !/^[0-9a-f]{6}$/i.test(full)) return null;
  return {
    r: parseInt(full.slice(0, 2), 16),
    g: parseInt(full.slice(2, 4), 16),
    b: parseInt(full.slice(4, 6), 16),
  };
}

function luminance(r: number, g: number, b: number) {
  return 0.299 * r + 0.587 * g + 0.114 * b;
}

function saturation(r: number, g: number, b: number) {
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  if (max === 0) return 0;
  return (max - min) / max;
}

/** Pick a vivid stop from a promo banner gradient for page theming. */
export function getPromoThemeFromBg(bg: string) {
  const colors = bg.match(/#[0-9a-fA-F]{3,6}/gi) ?? ['#1a1a1a'];
  const expanded = colors.map((c) => {
    if (c.length === 4) {
      return `#${c[1]}${c[1]}${c[2]}${c[2]}${c[3]}${c[3]}`;
    }
    return c.toLowerCase();
  });

  let accent = expanded[1] ?? expanded[0];
  let bestScore = -1;

  for (const color of expanded) {
    const rgb = hexToRgb(color);
    if (!rgb) continue;
    const lum = luminance(rgb.r, rgb.g, rgb.b);
    const sat = saturation(rgb.r, rgb.g, rgb.b);
    const score = sat * 100 + (lum > 25 && lum < 200 ? 30 : 0);
    if (score > bestScore) {
      bestScore = score;
      accent = color;
    }
  }

  const rgb = hexToRgb(accent) ?? { r: 74, g: 48, b: 0 };

  return {
    accent,
    accentRgb: `${rgb.r}, ${rgb.g}, ${rgb.b}`,
  };
}
