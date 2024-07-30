export class Usuario {
  id!: number;
  name!: string;
  email?: string;
  ativo: boolean = true;
  createdAt?: string;
  updatedAt?: string;
  permissoes!: string[];
}
