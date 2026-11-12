import type { ReactNode } from 'react';
import { ScrollView, StyleSheet } from 'react-native';

import { Button } from '@/components/button';
import { spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type FormLayoutProps = {
  children: ReactNode;
  onSubmit: () => void;
  submitLabel?: string;
  footer?: ReactNode;
};

export function FormLayout({ children, onSubmit, submitLabel = 'Salvar', footer }: FormLayoutProps) {
  const theme = useTheme();

  return (
    <ScrollView
      style={{ backgroundColor: theme.background }}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
      automaticallyAdjustKeyboardInsets>
      {children}
      <Button title={submitLabel} onPress={onSubmit} style={styles.button} />
      {footer}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: spacing.lg,
    gap: spacing.md,
  },
  button: {
    marginTop: spacing.sm,
  },
});
