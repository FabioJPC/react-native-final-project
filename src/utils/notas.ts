import type { Atividade } from '@/types';

export function parseNota(texto: string): number | null {
  const limpo = texto.trim().replace(',', '.');
  if (limpo === '') return null;

  const nota = Number(limpo);
  return Number.isNaN(nota) ? null : nota;
}

export function formatarNota(nota: number): string {
  return String(Math.round(nota * 100) / 100).replace('.', ',');
}

export function calcularMedia(valores: number[]): number | null {
  if (valores.length === 0) return null;

  const soma = valores.reduce((total, valor) => total + valor, 0);
  return soma / valores.length;
}

export function mediaDoAluno(alunoId: string, atividades: Atividade[]): number | null {
  const notas = atividades
    .filter((atividade) => atividade.notas[alunoId] !== undefined)
    .map((atividade) => (atividade.notas[alunoId] / atividade.notaMaxima) * 10);

  return calcularMedia(notas);
}
