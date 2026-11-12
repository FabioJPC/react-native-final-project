import { StyleSheet, Text, type TextProps } from 'react-native';

import { fontSize, type ColorName } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type AppTextProps = TextProps & {
  variant?: 'title' | 'subtitle' | 'body' | 'caption';
  color?: ColorName;
};

export function AppText({ variant = 'body', color = 'text', style, ...rest }: AppTextProps) {
  const theme = useTheme();
  return <Text style={[styles[variant], { color: theme[color] }, style]} {...rest} />;
}

const styles = StyleSheet.create({
  title: {
    fontSize: fontSize.title,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: fontSize.subtitle,
    fontWeight: '600',
  },
  body: {
    fontSize: fontSize.body,
  },
  caption: {
    fontSize: fontSize.caption,
  },
});
