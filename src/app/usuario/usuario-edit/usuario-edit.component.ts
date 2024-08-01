import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../usuario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioRequest } from '../model/usuario.request';
import { Permissao } from '../model/permission';
import { PermissionService } from '../permission.service';

@Component({
  selector: 'app-usuario-edit',
  templateUrl: './usuario-edit.component.html',
  styleUrls: ['./usuario-edit.component.css']
})
export class UsuarioEditComponent implements OnInit {
  permissoesList: Permissao[] = [];
  permissionsOptions: any[] = []; // Inicialize o array de opções
  usuarioForm!: FormGroup;
  page: number = 0;
  size: number = 10;
  totalPages: number = 0;
  isEditMode = false;
  usuarioId!: number;

  constructor(
    private permissaoService: PermissionService,
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.usuarioId = this.route.snapshot.params['id']; // Obtém o ID da URL
    this.isEditMode = !!this.usuarioId; // Define se está em modo de edição

    this.usuarioForm = this.fb.group({
      id: [null],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      senha: [''], // Campo de senha
      ativo: [true],
      createdAt: [new Date().toISOString()],
      updatedAt: [new Date().toISOString()],
      permissoes: [[]] // Campo de permissões
    });

    if (this.isEditMode) {
      this.loadUsuario();
    }
    this.listarPermissoes();
  }

  listarPermissoes(): void {
    this.permissaoService.listarPermissoes(this.page, this.size).subscribe(data => {
      this.permissoesList = data.content;
      // Mapeia permissões para as opções do multiselect
      this.permissionsOptions = this.permissoesList.map(p => ({ label: p.name, value: p.id }));
    });
  }

  get name() { return this.usuarioForm.get('name')!; }
  get email() { return this.usuarioForm.get('email')!; }
  get senha() { return this.usuarioForm.get('senha')!; }
  get permissoes() { return this.usuarioForm.get('permissoes')!; }

  loadUsuario(): void {
    this.usuarioService.getUsuariosById(this.usuarioId).subscribe(usuario => {
      this.usuarioForm.patchValue(usuario);
      // Ajuste para formatar datas se necessário
    });
  }

  onSubmit(): void {
    if (this.usuarioForm.valid) {
      const usuarioRequest: UsuarioRequest = this.usuarioForm.value;

      if (this.isEditMode) {
        this.usuarioService.atualizar(this.usuarioId, usuarioRequest).subscribe(() => {
          this.router.navigate(['/usuario']); // Redireciona após a atualização
        });
      } else {
        this.usuarioService.criar(usuarioRequest).subscribe(() => {
          this.router.navigate(['/usuario']); // Redireciona após a criação
        });
      }
    }
  }

  onCancel(): void {
    this.router.navigate(['/usuario']); // Redireciona para a lista de usuários
  }
}
