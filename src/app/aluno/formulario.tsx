import { router, Stack, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';

import { EmptyState } from '@/components/empty-state';
import { FormLayout } from '@/components/form-layout';
import { Input } from '@/components/input';
import { Screen } from '@/components/screen';
import { useDados } from '@/context/dados-context';

type Erros = {
  nome?: string;
  matricula?: string;
};

export default function AlunoFormularioScreen() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const { turmas, turmaSelecionada, alunos, adicionarAluno, atualizarAluno } = useDados();
  const existente = alunos.find((aluno) => aluno.id === id);
  const turma = existente ? turmas.find((item) => item.id === existente.turmaId) : turmaSelecionada;

  const [nome, setNome] = useState(existente?.nome ?? '');
  const [matricula, setMatricula] = useState(existente?.matricula ?? '');
  const [erros, setErros] = useState<Erros>({});

  if (!turma) {
    return (
      <Screen>
        <EmptyState title="Selecione uma turma antes de cadastrar alunos" />
      </Screen>
    );
  }
  const turmaId = turma.id;

  function salvar() {
    const novosErros: Erros = {};
    const matriculaLimpa = matricula.trim();
    const matriculaRepetida = alunos.some(
      (aluno) =>
        aluno.turmaId === turmaId && aluno.matricula === matriculaLimpa && aluno.id !== existente?.id
    );

    if (nome.trim() === '') {
      novosErros.nome = 'Informe o nome do aluno';
    }
    if (matriculaLimpa === '') {
      novosErros.matricula = 'Informe a matrícula';
    } else if (matriculaRepetida) {
      novosErros.matricula = 'Já existe um aluno com essa matrícula nesta turma';
    }

    setErros(novosErros);
    if (Object.keys(novosErros).length > 0) return;

    const valores = { nome: nome.trim(), matricula: matriculaLimpa };
    if (existente) {
      atualizarAluno(existente.id, valores);
    } else {
      adicionarAluno({ ...valores, turmaId });
    }
    router.back();
  }

  return (
    <FormLayout onSubmit={salvar}>
      <Stack.Screen options={{ title: existente ? 'Editar aluno' : 'Novo aluno' }} />

      <Input label="Turma" value={turma.nome} editable={false} />

      <Input
        label="Nome"
        value={nome}
        onChangeText={setNome}
        error={erros.nome}
        placeholder="Ex.: Maria Silva"
        autoCapitalize="words"
        autoFocus={!existente}
      />
      <Input
        label="Matrícula"
        value={matricula}
        onChangeText={setMatricula}
        error={erros.matricula}
        placeholder="Ex.: 2026001"
        autoCapitalize="characters"
      />
    </FormLayout>
  );
}
