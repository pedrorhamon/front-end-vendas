import { TipoLancamento } from "./tipolancamento";

export interface LancamentoRequest {
  descricao: string;
  dataVencimento: string; // Formato esperado: "dd/MM/yyyy"
  dataPagamento?: string; // Formato esperado: "dd/MM/yyyy"
  valor?: number;
  observacao?: string;
  tipoLancamento: TipoLancamento;
  categoriaId: number;
  pessoaId: number;
}
