import { SubPermissao } from "./subPermissao";

export interface Permissao {
  id: number;
  name: string;
  subPermissoes: SubPermissao[];

}
