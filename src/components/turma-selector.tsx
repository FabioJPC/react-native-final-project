import { Pressable, ScrollView, StyleSheet } from 'react-native';

import { AppText } from '@/components/app-text';
import { spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import type { Turma } from '@/types';

type TurmaSelectorProps = {
  turmas: Turma[];
  selecionadaId: string | null;
  onSelecionar: (id: string) => void;
};

export function TurmaSelector({ turmas, selecionadaId, onSelecionar }: TurmaSelectorProps) {
  const theme = useTheme();
  const ordenadas = [...turmas].sort((a, b) => a.nome.localeCompare(b.nome));

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.scroll}
      contentContainerStyle={styles.content}>
      {ordenadas.map((turma) => {
        const selecionada = turma.id === selecionadaId;

        return (
          <Pressable
            key={turma.id}
            onPress={() => onSelecionar(turma.id)}
            accessibilityRole="button"
            accessibilityState={{ selected: selecionada }}
            style={[
              styles.chip,
              selecionada
                ? { backgroundColor: theme.primary, borderColor: theme.primary }
                : { backgroundColor: theme.surface, borderColor: theme.border },
            ]}>
            <AppText
              variant="caption"
              color={selecionada ? 'textOnPrimary' : 'text'}
              style={styles.text}>
              {turma.nome}
            </AppText>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flexGrow: 0,
    flexShrink: 0,
  },
  content: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    gap: spacing.sm,
  },
  chip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 999,
    borderWidth: 1,
  },
  text: {
    fontWeight: '600',
  },
});
