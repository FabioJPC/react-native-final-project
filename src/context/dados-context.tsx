import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

import { dadosExemplo } from '@/data/exemplo';
import type { Aluno, Atividade, Dados, Turma } from '@/types';
import { gerarId } from '@/utils/id';

const STORAGE_KEY = '@caderneta/dados-v2';

type NovoAluno = Omit<Aluno, 'id'>;
type NovaAtividade = Omit<Atividade, 'id' | 'notas'>;
type AlteracoesAluno = Partial<Omit<NovoAluno, 'turmaId'>>;
type AlteracoesAtividade = Partial<Omit<NovaAtividade, 'turmaId'>>;

type DadosContextValue = Dados & {
  carregando: boolean;
  turmaSelecionada: Turma | undefined;
  carregarExemplo: () => void;
  selecionarTurma: (id: string) => void;
  adicionarTurma: (nome: string) => void;
  atualizarTurma: (id: string, nome: string) => void;
  removerTurma: (id: string) => void;
  adicionarAluno: (aluno: NovoAluno) => void;
  atualizarAluno: (id: string, alteracoes: AlteracoesAluno) => void;
  removerAluno: (id: string) => void;
  adicionarAtividade: (atividade: NovaAtividade) => void;
  atualizarAtividade: (id: string, alteracoes: AlteracoesAtividade) => void;
  removerAtividade: (id: string) => void;
  lancarNota: (atividadeId: string, alunoId: string, nota: number | null) => void;
};

const DadosContext = createContext<DadosContextValue | null>(null);

export function DadosProvider({ children }: { children: ReactNode }) {
  const [dados, setDados] = useState<Dados>({
    turmas: [],
    alunos: [],
    atividades: [],
    turmaSelecionadaId: null,
  });
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((json) => {
        if (json) setDados(JSON.parse(json));
      })
      .catch((erro) => console.warn('Erro ao carregar dados', erro))
      .finally(() => setCarregando(false));
  }, []);

  useEffect(() => {
    if (carregando) return;
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(dados)).catch((erro) =>
      console.warn('Erro ao salvar dados', erro)
    );
  }, [dados, carregando]);

  const turmaSelecionada = dados.turmas.find((turma) => turma.id === dados.turmaSelecionadaId);

  function carregarExemplo() {
    setDados(dadosExemplo);
  }

  function selecionarTurma(id: string) {
    setDados((atual) => ({ ...atual, turmaSelecionadaId: id }));
  }

  function adicionarTurma(nome: string) {
    const id = gerarId();
    setDados((atual) => ({
      ...atual,
      turmas: [...atual.turmas, { id, nome }],
      turmaSelecionadaId: id,
    }));
  }

  function atualizarTurma(id: string, nome: string) {
    setDados((atual) => ({
      ...atual,
      turmas: atual.turmas.map((turma) => (turma.id === id ? { ...turma, nome } : turma)),
    }));
  }

  function removerTurma(id: string) {
    setDados((atual) => {
      const turmas = atual.turmas.filter((turma) => turma.id !== id);
      const turmaSelecionadaId =
        atual.turmaSelecionadaId === id ? (turmas[0]?.id ?? null) : atual.turmaSelecionadaId;

      return {
        turmas,
        alunos: atual.alunos.filter((aluno) => aluno.turmaId !== id),
        atividades: atual.atividades.filter((atividade) => atividade.turmaId !== id),
        turmaSelecionadaId,
      };
    });
  }

  function adicionarAluno(aluno: NovoAluno) {
    setDados((atual) => ({
      ...atual,
      alunos: [...atual.alunos, { ...aluno, id: gerarId() }],
    }));
  }

  function atualizarAluno(id: string, alteracoes: AlteracoesAluno) {
    setDados((atual) => ({
      ...atual,
      alunos: atual.alunos.map((aluno) => (aluno.id === id ? { ...aluno, ...alteracoes } : aluno)),
    }));
  }

  function removerAluno(id: string) {
    setDados((atual) => ({
      ...atual,
      alunos: atual.alunos.filter((aluno) => aluno.id !== id),
      atividades: atual.atividades.map((atividade) => {
        const notas = { ...atividade.notas };
        delete notas[id];
        return { ...atividade, notas };
      }),
    }));
  }

  function adicionarAtividade(atividade: NovaAtividade) {
    setDados((atual) => ({
      ...atual,
      atividades: [...atual.atividades, { ...atividade, id: gerarId(), notas: {} }],
    }));
  }

  function atualizarAtividade(id: string, alteracoes: AlteracoesAtividade) {
    setDados((atual) => ({
      ...atual,
      atividades: atual.atividades.map((atividade) =>
        atividade.id === id ? { ...atividade, ...alteracoes } : atividade
      ),
    }));
  }

  function removerAtividade(id: string) {
    setDados((atual) => ({
      ...atual,
      atividades: atual.atividades.filter((atividade) => atividade.id !== id),
    }));
  }

  function lancarNota(atividadeId: string, alunoId: string, nota: number | null) {
    setDados((atual) => ({
      ...atual,
      atividades: atual.atividades.map((atividade) => {
        if (atividade.id !== atividadeId) return atividade;

        const notas = { ...atividade.notas };
        if (nota === null) {
          delete notas[alunoId];
        } else {
          notas[alunoId] = nota;
        }
        return { ...atividade, notas };
      }),
    }));
  }

  return (
    <DadosContext
      value={{
        ...dados,
        carregando,
        turmaSelecionada,
        carregarExemplo,
        selecionarTurma,
        adicionarTurma,
        atualizarTurma,
        removerTurma,
        adicionarAluno,
        atualizarAluno,
        removerAluno,
        adicionarAtividade,
        atualizarAtividade,
        removerAtividade,
        lancarNota,
      }}>
      {children}
    </DadosContext>
  );
}

export function useDados() {
  const contexto = useContext(DadosContext);
  if (!contexto) {
    throw new Error('useDados precisa ser usado dentro de <DadosProvider>');
  }
  return contexto;
}
