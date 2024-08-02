export interface Pessoa {
  id: number;
  name: string;
  ativo: boolean;
  createdAt: Date;  // Datas como objetos Date
  updatedAt: Date;  // Datas como objetos Date
  logradouro: string;
  numero: string;
  complemento: string;
  bairro: string;
  cep: string;
  cidade: string;
  estado: string;
}
