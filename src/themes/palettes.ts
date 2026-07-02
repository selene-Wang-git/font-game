export interface AccentPalette {
  id: string;
  accent: string;
  accentDark: string;
}

export interface BgColors {
  bgPrimary: string;
  bgCard: string;
  bgCardDark: string;
  bgSurface: string;
}

export const accentPalettes: AccentPalette[] = [
  { id: 'gold', accent: '#ffc107', accentDark: '#e6ac00' },
  { id: 'ocean', accent: '#26c6da', accentDark: '#00acc1' },
  { id: 'rose', accent: '#f48fb1', accentDark: '#ec407a' },
  { id: 'emerald', accent: '#66bb6a', accentDark: '#43a047' },
  { id: 'violet', accent: '#b388ff', accentDark: '#7c4dff' },
  { id: 'amber', accent: '#ffb74d', accentDark: '#ff9800' },
];

/** @deprecated used only for migrating stored bgId */
const legacyBgPalettes: Record<string, string> = {
  charcoal: '#121212',
  midnight: '#0a1628',
  wine: '#1a0f14',
  forest: '#0a140e',
  purple: '#120a1e',
  cream: '#f5f0e8',
};

export const defaultAccentId = 'gold';
export const defaultBgColor = '#121212';

const BG_VAR_MAP: [keyof BgColors, string][] = [
  ['bgPrimary', '--bg-primary'],
  ['bgCard', '--bg-card'],
  ['bgCardDark', '--bg-card-dark'],
  ['bgSurface', '--bg-surface'],
];

interface TextColors {
  textPrimary: string;
  textSecondary: string;
  borderSubtle: string;
}

const ACCENT_VAR_KEYS = ['--accent-gold', '--accent-gold-dark'] as const;

const TEXT_VAR_KEYS = [
  '--text-primary',
  '--text-secondary',
  '--border-subtle',
] as const;

const CUSTOM_VAR_KEYS = [
  ...ACCENT_VAR_KEYS,
  ...BG_VAR_MAP.map(([, v]) => v),
  ...TEXT_VAR_KEYS,
];

function parseHex(hex: string): [number, number, number] | null {
  const normalized = hex.replace('#', '');
  if (!/^[0-9a-f]{6}$/i.test(normalized)) return null;
  return [
    parseInt(normalized.slice(0, 2), 16),
    parseInt(normalized.slice(2, 4), 16),
    parseInt(normalized.slice(4, 6), 16),
  ];
}

function toHex(r: number, g: number, b: number): string {
  return (
    '#' +
    [r, g, b]
      .map((c) => Math.max(0, Math.min(255, Math.round(c))).toString(16).padStart(2, '0'))
      .join('')
  );
}

function mixHex(hex: string, target: string, weight: number): string {
  const a = parseHex(hex);
  const b = parseHex(target);
  if (!a || !b) return hex;
  return toHex(
    a[0] + (b[0] - a[0]) * weight,
    a[1] + (b[1] - a[1]) * weight,
    a[2] + (b[2] - a[2]) * weight,
  );
}

function getLuminance(hex: string): number {
  const rgb = parseHex(hex);
  if (!rgb) return 0;
  return (0.299 * rgb[0] + 0.587 * rgb[1] + 0.114 * rgb[2]) / 255;
}

export function normalizeHexColor(color: string): string {
  const rgb = parseHex(color);
  return rgb ? toHex(rgb[0], rgb[1], rgb[2]) : defaultBgColor;
}

export function resolveBgColor(
  bgColor?: string,
  bgId?: string,
): string {
  if (bgColor) return normalizeHexColor(bgColor);
  if (bgId && legacyBgPalettes[bgId]) return legacyBgPalettes[bgId];
  return defaultBgColor;
}

export function deriveBgColors(bgPrimary: string): BgColors {
  const primary = normalizeHexColor(bgPrimary);
  const isLight = getLuminance(primary) > 0.55;

  if (isLight) {
    return {
      bgPrimary: primary,
      bgCard: mixHex(primary, '#ffffff', 0.75),
      bgCardDark: mixHex(primary, '#000000', 0.06),
      bgSurface: mixHex(primary, '#ffffff', 0.45),
    };
  }

  return {
    bgPrimary: primary,
    bgCard: mixHex(primary, '#ffffff', 0.14),
    bgCardDark: mixHex(primary, '#000000', 0.18),
    bgSurface: mixHex(primary, '#000000', 0.1),
  };
}

export function deriveTextColors(bgPrimary: string): TextColors {
  const primary = normalizeHexColor(bgPrimary);
  const isLight = getLuminance(primary) > 0.55;

  if (isLight) {
    return {
      textPrimary: '#1a1a1a',
      textSecondary: '#666666',
      borderSubtle: mixHex(primary, '#000000', 0.12),
    };
  }

  return {
    textPrimary: '#ffffff',
    textSecondary: '#9e9e9e',
    borderSubtle: mixHex(primary, '#ffffff', 0.15),
  };
}

export function getAccentById(id: string) {
  return accentPalettes.find((p) => p.id === id) ?? accentPalettes[0];
}

export function applyAccentVars(palette: AccentPalette) {
  const root = document.documentElement;
  root.style.setProperty('--accent-gold', palette.accent);
  root.style.setProperty('--accent-gold-dark', palette.accentDark);
}

export function applyTextVars(colors: TextColors) {
  const root = document.documentElement;
  root.style.setProperty('--text-primary', colors.textPrimary);
  root.style.setProperty('--text-secondary', colors.textSecondary);
  root.style.setProperty('--border-subtle', colors.borderSubtle);
}

export function applyBgVars(colors: BgColors) {
  const root = document.documentElement;
  BG_VAR_MAP.forEach(([key, cssVar]) => {
    root.style.setProperty(cssVar, colors[key]);
  });
}

export function applyCustomTheme(accentId: string, bgColor: string) {
  const normalizedBg = normalizeHexColor(bgColor);
  applyAccentVars(getAccentById(accentId));
  applyBgVars(deriveBgColors(normalizedBg));
  applyTextVars(deriveTextColors(normalizedBg));
}

export function clearCustomVars() {
  const root = document.documentElement;
  CUSTOM_VAR_KEYS.forEach((cssVar) => {
    root.style.removeProperty(cssVar);
  });
}
