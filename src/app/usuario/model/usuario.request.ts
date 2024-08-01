import { Permissao } from "./permission";

export interface UsuarioRequest {
  id?: number;
  name: string;
  email: string;
  senha?: string;
  ativo: boolean;
  createdAt?: string;
  updatedAt?: string;
  permissoes: Permissao[];
}
