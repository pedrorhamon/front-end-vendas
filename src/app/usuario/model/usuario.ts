import { Permissao } from "./permission";

export interface Usuario {
  id: number;
  name: string;
  email?: string;
  ativo: boolean;
  createdAt: Date;  // Mantém como string
  updatedAt: Date;  // Mantém como string
  permissoes: Permissao[];
}
