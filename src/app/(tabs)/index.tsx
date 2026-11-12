import { router } from 'expo-router';
import { FlatList, StyleSheet } from 'react-native';

import { EmptyState } from '@/components/empty-state';
import { Fab } from '@/components/fab';
import { ListRow } from '@/components/list-row';
import { Screen } from '@/components/screen';
import { TurmaSelector } from '@/components/turma-selector';
import { spacing } from '@/constants/theme';
import { useDados } from '@/context/dados-context';
import { formatarData } from '@/utils/datas';
import { calcularMedia, formatarNota } from '@/utils/notas';

export default function AtividadesScreen() {
  const { turmas, turmaSelecionada, selecionarTurma, atividades, alunos } = useDados();

  if (!turmaSelecionada) {
    return (
      <Screen>
        <EmptyState
          title="Nenhuma turma cadastrada"
          message="Crie uma turma para começar a cadastrar atividades."
          actionLabel="Criar turma"
          onAction={() => router.push('/turma/formulario')}
        />
      </Screen>
    );
  }

  const totalAlunos = alunos.filter((aluno) => aluno.turmaId === turmaSelecionada.id).length;
  const atividadesDaTurma = atividades
    .filter((atividade) => atividade.turmaId === turmaSelecionada.id)
    .sort((a, b) => b.data.localeCompare(a.data));

  return (
    <Screen>
      <TurmaSelector
        turmas={turmas}
        selecionadaId={turmaSelecionada.id}
        onSelecionar={selecionarTurma}
      />
      <FlatList
        data={atividadesDaTurma}
        keyExtractor={(atividade) => atividade.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => {
          const notas = Object.values(item.notas);
          const media = calcularMedia(notas);

          return (
            <ListRow
              title={item.titulo}
              subtitle={`${formatarData(item.data)} · ${notas.length} de ${totalAlunos} notas lançadas`}
              value={media === null ? 'Sem notas' : formatarNota(media)}
              valueMuted={media === null}
              onPress={() => router.push({ pathname: '/atividade/[id]', params: { id: item.id } })}
            />
          );
        }}
        ListEmptyComponent={
          <EmptyState
            title="Nenhuma atividade nesta turma"
            message="Toque no botão + para cadastrar a primeira atividade."
          />
        }
      />
      <Fab
        accessibilityLabel="Nova atividade"
        onPress={() => router.push('/atividade/formulario')}
      />
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
