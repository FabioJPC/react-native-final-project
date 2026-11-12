import { router, Stack, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';

import { EmptyState } from '@/components/empty-state';
import { FormLayout } from '@/components/form-layout';
import { Input } from '@/components/input';
import { Screen } from '@/components/screen';
import { useDados } from '@/context/dados-context';
import { formatarData, hojeFormatado, mascaraData, parseData } from '@/utils/datas';
import { formatarNota, parseNota } from '@/utils/notas';

type Erros = {
  titulo?: string;
  data?: string;
  notaMaxima?: string;
};

export default function AtividadeFormularioScreen() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const { turmas, turmaSelecionada, atividades, adicionarAtividade, atualizarAtividade } = useDados();
  const existente = atividades.find((atividade) => atividade.id === id);
  const turma = existente ? turmas.find((item) => item.id === existente.turmaId) : turmaSelecionada;

  const [titulo, setTitulo] = useState(existente?.titulo ?? '');
  const [data, setData] = useState(existente ? formatarData(existente.data) : hojeFormatado());
  const [notaMaxima, setNotaMaxima] = useState(
    existente ? formatarNota(existente.notaMaxima) : '10'
  );
  const [erros, setErros] = useState<Erros>({});

  if (!turma) {
    return (
      <Screen>
        <EmptyState title="Selecione uma turma antes de cadastrar atividades" />
      </Screen>
    );
  }
  const turmaId = turma.id;

  function salvar() {
    const dataIso = parseData(data);
    const maxima = parseNota(notaMaxima);
    const novosErros: Erros = {};

    if (titulo.trim() === '') {
      novosErros.titulo = 'Informe o título da atividade';
    }
    if (dataIso === null) {
      novosErros.data = 'Data inválida. Use o formato DD/MM/AAAA';
    }
    if (maxima === null || maxima <= 0) {
      novosErros.notaMaxima = 'A nota máxima deve ser um número maior que zero';
    } else if (existente) {
      const maiorLancada = Math.max(0, ...Object.values(existente.notas));
      if (maxima < maiorLancada) {
        novosErros.notaMaxima = `Já existe uma nota ${formatarNota(maiorLancada)} lançada nesta atividade`;
      }
    }

    setErros(novosErros);
    if (dataIso === null || maxima === null || Object.keys(novosErros).length > 0) return;

    const valores = { titulo: titulo.trim(), data: dataIso, notaMaxima: maxima };
    if (existente) {
      atualizarAtividade(existente.id, valores);
    } else {
      adicionarAtividade({ ...valores, turmaId });
    }
    router.back();
  }

  return (
    <FormLayout onSubmit={salvar}>
      <Stack.Screen options={{ title: existente ? 'Editar atividade' : 'Nova atividade' }} />

      <Input label="Turma" value={turma.nome} editable={false} />

      <Input
        label="Título"
        value={titulo}
        onChangeText={setTitulo}
        error={erros.titulo}
        placeholder="Ex.: Prova 1"
        autoFocus={!existente}
      />
      <Input
        label="Data"
        value={data}
        onChangeText={(texto) => setData(mascaraData(texto))}
        error={erros.data}
        placeholder="DD/MM/AAAA"
        keyboardType="number-pad"
        maxLength={10}
      />
      <Input
        label="Nota máxima"
        value={notaMaxima}
        onChangeText={setNotaMaxima}
        error={erros.notaMaxima}
        placeholder="Ex.: 10"
        keyboardType="decimal-pad"
      />
    </FormLayout>
  );
}
