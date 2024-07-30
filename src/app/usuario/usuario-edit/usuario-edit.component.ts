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
  permissionsOptions: any[] = []; // Array para opções do p-multiselect
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
      senha: ['', Validators.required],
      ativo: [true],
      createdAt: [new Date().toISOString()],
      updatedAt: [new Date().toISOString()],
      permissoes: [[], Validators.required]
    });

    if (this.isEditMode) {
      this.loadUsuario();
    }
    this.listarPermissoes();
  }

  listarPermissoes(): void {
    this.permissaoService.listarPermissoes(this.page, this.size).subscribe(data => {
      this.permissoesList = data.content || []; // Verifica se content não é undefined
      this.totalPages = data.totalPages || 0;
      this.permissionsOptions = this.permissoesList.map(p => ({ label: p.name, value: p.id }));
    });
  }


  loadUsuario(): void {
    this.usuarioService.getUsuariosById(this.usuarioId).subscribe(usuario => {
      if (usuario) {
        this.usuarioForm.patchValue({
          id: usuario.id,
          name: usuario.name,
          email: usuario.email,
          ativo: usuario.ativo,
          createdAt: usuario.createdAt,
          updatedAt: usuario.updatedAt,
          permissoes: usuario.permissoes ? usuario.permissoes.map(p => p.id) : [] // Verifica se permissoes não é undefined
        });
        // Ajuste para formatar datas se necessário
      }
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
