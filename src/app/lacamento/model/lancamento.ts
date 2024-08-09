import { TipoLancamento } from "./tipolancamento";

export interface Lancamento {
  id?: number;
  descricao: string;
  dataVencimento: string; // Formato esperado: "dd/MM/yyyy"
  dataPagamento: string; // Formato esperado: "dd/MM/yyyy"
  valor?: number;
  observacao?: string;
  tipoLancamento: TipoLancamento;
  categoriaNomes: string[]; // Lista de nomes de categorias
  pessoaNomes: string[]; // Lista de nomes de pessoas
}
