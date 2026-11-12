import { router, Stack, useLocalSearchParams } from 'expo-router';
import { FlatList, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/app-text';
import { Button } from '@/components/button';
import { Card } from '@/components/card';
import { EmptyState } from '@/components/empty-state';
import { ListRow } from '@/components/list-row';
import { Screen } from '@/components/screen';
import { StatBox } from '@/components/stat-box';
import { spacing } from '@/constants/theme';
import { useDados } from '@/context/dados-context';
import { confirmarExclusao } from '@/utils/confirmar';
import { formatarData } from '@/utils/datas';
import { formatarNota, mediaDoAluno } from '@/utils/notas';

export default function BoletimScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { turmas, alunos, atividades, removerAluno } = useDados();

  const aluno = alunos.find((item) => item.id === id);
  if (!aluno) {
    return (
      <Screen>
        <EmptyState title="Aluno não encontrado" />
      </Screen>
    );
  }

  const turma = turmas.find((item) => item.id === aluno.turmaId);
  const atividadesDaTurma = atividades
    .filter((atividade) => atividade.turmaId === aluno.turmaId)
    .sort((a, b) => b.data.localeCompare(a.data));
  const media = mediaDoAluno(aluno.id, atividadesDaTurma);
  const avaliadas = atividadesDaTurma.filter((atividade) => atividade.notas[aluno.id] !== undefined).length;

  return (
    <Screen>
      <Stack.Screen options={{ title: aluno.nome }} />

      <FlatList
        data={atividadesDaTurma}
        keyExtractor={(atividade) => atividade.id}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <View style={styles.header}>
            <Card>
              <AppText color="textSecondary">
                Turma {turma?.nome} · Matrícula {aluno.matricula}
              </AppText>
              <View style={styles.stats}>
                <StatBox label="Média (0 a 10)" value={media === null ? '-' : formatarNota(media)} />
                <StatBox label="Atividades com nota" value={`${avaliadas}/${atividadesDaTurma.length}`} />
              </View>
            </Card>

            <View style={styles.actions}>
              <Button
                title="Editar"
                variant="secondary"
                style={styles.flex}
                onPress={() => router.push({ pathname: '/aluno/formulario', params: { id: aluno.id } })}
              />
              <Button
                title="Excluir"
                variant="danger"
                style={styles.flex}
                onPress={() =>
                  confirmarExclusao(
                    'Excluir aluno',
                    `Deseja excluir ${aluno.nome}? As notas dele em todas as atividades também serão apagadas.`,
                    () => {
                      removerAluno(aluno.id);
                      router.back();
                    }
                  )
                }
              />
            </View>

            {atividadesDaTurma.length > 0 ? <AppText variant="subtitle">Notas</AppText> : null}
          </View>
        }
        renderItem={({ item }) => {
          const nota = item.notas[aluno.id];

          return (
            <ListRow
              title={item.titulo}
              subtitle={formatarData(item.data)}
              value={
                nota === undefined
                  ? 'Sem nota'
                  : `${formatarNota(nota)} / ${formatarNota(item.notaMaxima)}`
              }
              valueMuted={nota === undefined}
              onPress={() => router.push({ pathname: '/atividade/[id]', params: { id: item.id } })}
            />
          );
        }}
        ListEmptyComponent={
          <EmptyState
            title="Nenhuma atividade nesta turma"
            message="As notas do aluno aparecerão aqui quando a turma tiver atividades."
          />
        }
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  list: {
    flexGrow: 1,
    padding: spacing.md,
    gap: spacing.sm,
  },
  header: {
    gap: spacing.md,
    marginBottom: spacing.xs,
  },
  stats: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.sm,
  },
  actions: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  flex: {
    flex: 1,
  },
});
