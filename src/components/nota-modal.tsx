import { useState } from 'react';
import { KeyboardAvoidingView, Modal, Platform, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/app-text';
import { Button } from '@/components/button';
import { Input } from '@/components/input';
import { radius, spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { formatarNota, parseNota } from '@/utils/notas';

type NotaModalProps = {
  alunoNome: string;
  notaMaxima: number;
  notaAtual?: number;
  onSalvar: (nota: number) => void;
  onRemover: () => void;
  onFechar: () => void;
};

export function NotaModal({
  alunoNome,
  notaMaxima,
  notaAtual,
  onSalvar,
  onRemover,
  onFechar,
}: NotaModalProps) {
  const theme = useTheme();
  const [texto, setTexto] = useState(notaAtual !== undefined ? formatarNota(notaAtual) : '');
  const [erro, setErro] = useState('');

  function salvar() {
    const nota = parseNota(texto);

    if (nota === null) {
      setErro('Digite uma nota válida');
      return;
    }
    if (nota < 0 || nota > notaMaxima) {
      setErro(`A nota deve estar entre 0 e ${formatarNota(notaMaxima)}`);
      return;
    }

    onSalvar(nota);
  }

  return (
    <Modal transparent animationType="fade" onRequestClose={onFechar}>
      <KeyboardAvoidingView
        style={[styles.overlay, { backgroundColor: theme.overlay }]}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={[styles.content, { backgroundColor: theme.background }]}>
          <AppText variant="subtitle">Nota de {alunoNome}</AppText>

          <Input
            label={`Nota (0 a ${formatarNota(notaMaxima)})`}
            value={texto}
            onChangeText={setTexto}
            error={erro}
            keyboardType="decimal-pad"
            placeholder="Ex.: 7,5"
            autoFocus
          />

          <View style={styles.actions}>
            <Button title="Cancelar" variant="secondary" onPress={onFechar} style={styles.flex} />
            <Button title="Salvar" onPress={salvar} style={styles.flex} />
          </View>

          {notaAtual !== undefined ? (
            <Button title="Remover nota" variant="danger" onPress={onRemover} />
          ) : null}
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    padding: spacing.lg,
  },
  content: {
    borderRadius: radius.lg,
    padding: spacing.lg,
    gap: spacing.md,
  },
  actions: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  flex: {
    flex: 1,
  },
});
