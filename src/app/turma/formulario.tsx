import { router, Stack, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';

import { Button } from '@/components/button';
import { FormLayout } from '@/components/form-layout';
import { Input } from '@/components/input';
import { useDados } from '@/context/dados-context';
import { confirmarExclusao } from '@/utils/confirmar';

export default function TurmaFormularioScreen() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const { turmas, alunos, atividades, adicionarTurma, atualizarTurma, removerTurma } = useDados();
  const existente = turmas.find((turma) => turma.id === id);

  const [nome, setNome] = useState(existente?.nome ?? '');
  const [erro, setErro] = useState('');

  function salvar() {
    const nomeLimpo = nome.trim();

    if (nomeLimpo === '') {
      setErro('Informe o nome da turma');
      return;
    }
    const repetida = turmas.some(
      (turma) => turma.nome.toLowerCase() === nomeLimpo.toLowerCase() && turma.id !== existente?.id
    );
    if (repetida) {
      setErro('Já existe uma turma com esse nome');
      return;
    }

    if (existente) {
      atualizarTurma(existente.id, nomeLimpo);
    } else {
      adicionarTurma(nomeLimpo);
    }
    router.back();
  }

  function excluir() {
    if (!existente) return;

    const totalAlunos = alunos.filter((aluno) => aluno.turmaId === existente.id).length;
    const totalAtividades = atividades.filter((atividade) => atividade.turmaId === existente.id).length;

    confirmarExclusao(
      'Excluir turma',
      `Deseja excluir a turma "${existente.nome}"? Os ${totalAlunos} aluno(s) e as ${totalAtividades} atividade(s) dela também serão apagados.`,
      () => {
        removerTurma(existente.id);
        router.back();
      }
    );
  }

  return (
    <FormLayout
      onSubmit={salvar}
      footer={existente ? <Button title="Excluir turma" variant="danger" onPress={excluir} /> : null}>
      <Stack.Screen options={{ title: existente ? 'Editar turma' : 'Nova turma' }} />

      <Input
        label="Nome da turma"
        value={nome}
        onChangeText={setNome}
        error={erro}
        placeholder="Ex.: 3º ano A"
        autoFocus={!existente}
      />
    </FormLayout>
  );
}
