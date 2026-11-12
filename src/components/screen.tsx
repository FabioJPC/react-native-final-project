import type { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

import { useTheme } from '@/hooks/use-theme';

export function Screen({ children }: { children?: ReactNode }) {
  const theme = useTheme();
  return <View style={[styles.container, { backgroundColor: theme.background }]}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
