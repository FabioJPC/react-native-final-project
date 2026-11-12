import { router } from 'expo-router';
import { FlatList, StyleSheet } from 'react-native';

import { EmptyState } from '@/components/empty-state';
import { Fab } from '@/components/fab';
import { ListRow } from '@/components/list-row';
import { Screen } from '@/components/screen';
import { spacing } from '@/constants/theme';
import { useDados } from '@/context/dados-context';

function plural(quantidade: number, singular: string, plural: string) {
  return `${quantidade} ${quantidade === 1 ? singular : plural}`;
}

export default function TurmasScreen() {
  const { turmas, alunos, atividades, turmaSelecionadaId, carregarExemplo } = useDados();

  const ordenadas = [...turmas].sort((a, b) => a.nome.localeCompare(b.nome));

  return (
    <Screen>
      <FlatList
        data={ordenadas}
        keyExtractor={(turma) => turma.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => {
          const totalAlunos = alunos.filter((aluno) => aluno.turmaId === item.id).length;
          const totalAtividades = atividades.filter((atividade) => atividade.turmaId === item.id).length;

          return (
            <ListRow
              title={item.nome}
              subtitle={`${plural(totalAlunos, 'aluno', 'alunos')} · ${plural(totalAtividades, 'atividade', 'atividades')}`}
              value={item.id === turmaSelecionadaId ? 'Selecionada' : undefined}
              valueMuted
              onPress={() => router.push({ pathname: '/turma/formulario', params: { id: item.id } })}
            />
          );
        }}
        ListEmptyComponent={
          <EmptyState
            title="Nenhuma turma cadastrada"
            message="Toque no botão + para cadastrar a primeira turma, ou carregue alguns dados de exemplo para conhecer o app."
            actionLabel="Carregar dados de exemplo"
            onAction={carregarExemplo}
          />
        }
      />
      <Fab accessibilityLabel="Nova turma" onPress={() => router.push('/turma/formulario')} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  list: {
    flexGrow: 1,
    padding: spacing.md,
    paddingBottom: 96,
    gap: spacing.sm,
  },
});
