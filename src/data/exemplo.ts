import type { Dados } from '@/types';

export const dadosExemplo: Dados = {
  turmaSelecionadaId: 'turma-a',

  turmas: [
    { id: 'turma-a', nome: '3º ano A' },
    { id: 'turma-b', nome: '3º ano B' },
  ],

  alunos: [
    { id: 'aluno-a1', nome: 'Ana Beatriz Souza', matricula: '2026001', turmaId: 'turma-a' },
    { id: 'aluno-a2', nome: 'Bruno Carvalho', matricula: '2026002', turmaId: 'turma-a' },
    { id: 'aluno-a3', nome: 'Carla Mendes', matricula: '2026003', turmaId: 'turma-a' },
    { id: 'aluno-a4', nome: 'Diego Ferreira', matricula: '2026004', turmaId: 'turma-a' },
    { id: 'aluno-a5', nome: 'Eduarda Lima', matricula: '2026005', turmaId: 'turma-a' },
    { id: 'aluno-a6', nome: 'Felipe Rocha', matricula: '2026006', turmaId: 'turma-a' },

    { id: 'aluno-b1', nome: 'Gabriel Alves', matricula: '2026101', turmaId: 'turma-b' },
    { id: 'aluno-b2', nome: 'Helena Costa', matricula: '2026102', turmaId: 'turma-b' },
    { id: 'aluno-b3', nome: 'Igor Martins', matricula: '2026103', turmaId: 'turma-b' },
    { id: 'aluno-b4', nome: 'Júlia Ribeiro', matricula: '2026104', turmaId: 'turma-b' },
    { id: 'aluno-b5', nome: 'Lucas Pereira', matricula: '2026105', turmaId: 'turma-b' },
  ],

  atividades: [
    {
      id: 'atividade-a1',
      titulo: 'Prova 1',
      data: '2026-09-15',
      notaMaxima: 10,
      turmaId: 'turma-a',
      notas: {
        'aluno-a1': 9.5,
        'aluno-a2': 6,
        'aluno-a3': 8,
        'aluno-a4': 4.5,
        'aluno-a5': 7,
        'aluno-a6': 10,
      },
    },
    {
      id: 'atividade-a2',
      titulo: 'Trabalho em grupo',
      data: '2026-10-06',
      notaMaxima: 20,
      turmaId: 'turma-a',
      notas: {
        'aluno-a1': 18,
        'aluno-a2': 15,
        'aluno-a3': 18,
        'aluno-a4': 12,
        'aluno-a5': 15,
        'aluno-a6': 20,
      },
    },
    {
      id: 'atividade-a3',
      titulo: 'Prova 2',
      data: '2026-11-03',
      notaMaxima: 10,
      turmaId: 'turma-a',
      notas: {
        'aluno-a1': 8.5,
        'aluno-a2': 7,
        'aluno-a3': 9,
        'aluno-a4': 6,
      },
    },

    {
      id: 'atividade-b1',
      titulo: 'Prova 1',
      data: '2026-09-16',
      notaMaxima: 10,
      turmaId: 'turma-b',
      notas: {
        'aluno-b1': 7.5,
        'aluno-b2': 9,
        'aluno-b3': 5,
        'aluno-b4': 8,
        'aluno-b5': 6.5,
      },
    },
    {
      id: 'atividade-b2',
      titulo: 'Seminário',
      data: '2026-10-20',
      notaMaxima: 5,
      turmaId: 'turma-b',
      notas: {
        'aluno-b1': 4,
        'aluno-b2': 5,
        'aluno-b4': 4.5,
      },
    },
    {
      id: 'atividade-b3',
      titulo: 'Prova 2',
      data: '2026-11-10',
      notaMaxima: 10,
      turmaId: 'turma-b',
      notas: {},
    },
  ],
};
