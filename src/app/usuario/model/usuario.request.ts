export class UsuarioRequest {
  id!: number;
  name!: string;
  email!: string;
  password!: string;
  ativo: boolean = true;
  createdAt!: string; // Representação da data em string
  updatedAt!: string; // Representação da data em string
  permissoes!: string[];
}
