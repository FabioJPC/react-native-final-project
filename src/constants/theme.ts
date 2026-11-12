const light = {
  primary: '#2563EB',
  primarySoft: '#EFF6FF',
  primarySoftText: '#1D4ED8',
  background: '#FFFFFF',
  surface: '#F8FAFC',
  border: '#E2E8F0',
  text: '#0F172A',
  textSecondary: '#64748B',
  textOnPrimary: '#FFFFFF',
  danger: '#DC2626',
  overlay: 'rgba(15, 23, 42, 0.5)',
};

export type ThemeColors = typeof light;
export type ColorName = keyof ThemeColors;

const dark: ThemeColors = {
  primary: '#3B82F6',
  primarySoft: '#172554',
  primarySoftText: '#BFDBFE',
  background: '#0F172A',
  surface: '#1E293B',
  border: '#334155',
  text: '#F1F5F9',
  textSecondary: '#94A3B8',
  textOnPrimary: '#FFFFFF',
  danger: '#F87171',
  overlay: 'rgba(0, 0, 0, 0.6)',
};

export const colors = { light, dark };

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
} as const;

export const radius = {
  sm: 6,
  md: 10,
  lg: 16,
} as const;

export const fontSize = {
  caption: 13,
  body: 16,
  subtitle: 18,
  title: 24,
} as const;
