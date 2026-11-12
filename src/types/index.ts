export type Turma = {
  id: string;
  nome: string;
};

export type Aluno = {
  id: string;
  nome: string;
  matricula: string;
  turmaId: string;
};

export type Atividade = {
  id: string;
  titulo: string;
  data: string;
  notaMaxima: number;
  notas: Record<string, number>;
  turmaId: string;
};

export type Dados = {
  turmas: Turma[];
  alunos: Aluno[];
  atividades: Atividade[];
  turmaSelecionadaId: string | null;
};
