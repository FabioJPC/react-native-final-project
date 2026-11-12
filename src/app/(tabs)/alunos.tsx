import { router } from 'expo-router';
import { FlatList, StyleSheet } from 'react-native';

import { EmptyState } from '@/components/empty-state';
import { Fab } from '@/components/fab';
import { ListRow } from '@/components/list-row';
import { Screen } from '@/components/screen';
import { TurmaSelector } from '@/components/turma-selector';
import { spacing } from '@/constants/theme';
import { useDados } from '@/context/dados-context';
import { formatarNota, mediaDoAluno } from '@/utils/notas';

export default function AlunosScreen() {
  const { turmas, turmaSelecionada, selecionarTurma, alunos, atividades } = useDados();

  if (!turmaSelecionada) {
    return (
      <Screen>
        <EmptyState
          title="Nenhuma turma cadastrada"
          message="Crie uma turma para começar a cadastrar alunos."
          actionLabel="Criar turma"
          onAction={() => router.push('/turma/formulario')}
        />
      </Screen>
    );
  }

  const alunosDaTurma = alunos
    .filter((aluno) => aluno.turmaId === turmaSelecionada.id)
    .sort((a, b) => a.nome.localeCompare(b.nome));

  return (
    <Screen>
      <TurmaSelector
        turmas={turmas}
        selecionadaId={turmaSelecionada.id}
        onSelecionar={selecionarTurma}
      />
      <FlatList
        data={alunosDaTurma}
        keyExtractor={(aluno) => aluno.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => {
          const media = mediaDoAluno(item.id, atividades);

          return (
            <ListRow
              title={item.nome}
              subtitle={`Matrícula ${item.matricula}`}
              value={media === null ? 'Sem notas' : formatarNota(media)}
              valueMuted={media === null}
              onPress={() => router.push({ pathname: '/aluno/[id]', params: { id: item.id } })}
            />
          );
        }}
        ListEmptyComponent={
          <EmptyState
            title="Nenhum aluno nesta turma"
            message="Toque no botão + para cadastrar os alunos da turma."
          />
        }
      />
      <Fab accessibilityLabel="Novo aluno" onPress={() => router.push('/aluno/formulario')} />
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
