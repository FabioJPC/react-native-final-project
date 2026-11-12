import { router, Stack, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/app-text';
import { Button } from '@/components/button';
import { Card } from '@/components/card';
import { EmptyState } from '@/components/empty-state';
import { ListRow } from '@/components/list-row';
import { NotaModal } from '@/components/nota-modal';
import { Screen } from '@/components/screen';
import { StatBox } from '@/components/stat-box';
import { spacing } from '@/constants/theme';
import { useDados } from '@/context/dados-context';
import type { Aluno } from '@/types';
import { confirmarExclusao } from '@/utils/confirmar';
import { formatarData } from '@/utils/datas';
import { calcularMedia, formatarNota } from '@/utils/notas';

export default function AtividadeDetalhesScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { turmas, atividades, alunos, lancarNota, removerAtividade } = useDados();
  const [alunoSelecionado, setAlunoSelecionado] = useState<Aluno | null>(null);

  const atividade = atividades.find((item) => item.id === id);
  if (!atividade) {
    return (
      <Screen>
        <EmptyState title="Atividade não encontrada" />
      </Screen>
    );
  }

  const turma = turmas.find((item) => item.id === atividade.turmaId);
  const notas = Object.values(atividade.notas);
  const media = calcularMedia(notas);
  const alunosDaTurma = alunos
    .filter((aluno) => aluno.turmaId === atividade.turmaId)
    .sort((a, b) => a.nome.localeCompare(b.nome));

  return (
    <Screen>
      <Stack.Screen options={{ title: atividade.titulo }} />

      <FlatList
        data={alunosDaTurma}
        keyExtractor={(aluno) => aluno.id}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <View style={styles.header}>
            <Card>
              <AppText color="textSecondary">Turma {turma?.nome}</AppText>
              <AppText color="textSecondary">
                {formatarData(atividade.data)} · Nota máxima {formatarNota(atividade.notaMaxima)}
              </AppText>
              <AppText color="textSecondary">
                {notas.length} de {alunosDaTurma.length} notas lançadas
              </AppText>
              <View style={styles.stats}>
                <StatBox label="Média" value={media === null ? '-' : formatarNota(media)} />
                <StatBox label="Maior" value={notas.length ? formatarNota(Math.max(...notas)) : '-'} />
                <StatBox label="Menor" value={notas.length ? formatarNota(Math.min(...notas)) : '-'} />
              </View>
            </Card>

            <View style={styles.actions}>
              <Button
                title="Editar"
                variant="secondary"
                style={styles.flex}
                onPress={() =>
                  router.push({ pathname: '/atividade/formulario', params: { id: atividade.id } })
                }
              />
              <Button
                title="Excluir"
                variant="danger"
                style={styles.flex}
                onPress={() =>
                  confirmarExclusao(
                    'Excluir atividade',
                    `Deseja excluir "${atividade.titulo}"? As notas lançadas nela também serão apagadas.`,
                    () => {
                      removerAtividade(atividade.id);
                      router.back();
                    }
                  )
                }
              />
            </View>

            {alunosDaTurma.length > 0 ? (
              <AppText variant="subtitle">Notas dos alunos</AppText>
            ) : null}
          </View>
        }
        renderItem={({ item }) => {
          const nota = atividade.notas[item.id];

          return (
            <ListRow
              title={item.nome}
              subtitle={`Matrícula ${item.matricula}`}
              value={nota === undefined ? 'Lançar nota' : formatarNota(nota)}
              valueMuted={nota === undefined}
              onPress={() => setAlunoSelecionado(item)}
            />
          );
        }}
        ListEmptyComponent={
          <EmptyState
            title="Nenhum aluno nesta turma"
            message="Cadastre os alunos da turma para lançar as notas desta atividade."
            actionLabel="Cadastrar aluno"
            onAction={() => router.push('/aluno/formulario')}
          />
        }
      />

      {alunoSelecionado ? (
        <NotaModal
          alunoNome={alunoSelecionado.nome}
          notaMaxima={atividade.notaMaxima}
          notaAtual={atividade.notas[alunoSelecionado.id]}
          onSalvar={(nota) => {
            lancarNota(atividade.id, alunoSelecionado.id, nota);
            setAlunoSelecionado(null);
          }}
          onRemover={() => {
            lancarNota(atividade.id, alunoSelecionado.id, null);
            setAlunoSelecionado(null);
          }}
          onFechar={() => setAlunoSelecionado(null)}
        />
      ) : null}
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
