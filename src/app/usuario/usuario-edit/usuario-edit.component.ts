import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../usuario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioRequest } from '../model/usuario.request';
import { Permissao } from '../model/permission';
import { PermissionService } from '../permission.service';
import { MessageService } from 'primeng/api';

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
  selectedPermissions: Permissao[] = []; // Armazena as permissões selecionadas


  constructor(
    private permissaoService: PermissionService,
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService
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
      this.permissionsOptions = this.permissoesList.map(p => ({
        label: p.name,
        value: p.id
      }));
      console.log('Permissions Options:', this.permissionsOptions); // Verifique os dados aqui
    });
  }


  get name() { return this.usuarioForm.get('name')!; }
  get email() { return this.usuarioForm.get('email')!; }
  get senha() { return this.usuarioForm.get('senha')!; }
  get permissoes() { return this.usuarioForm.get('permissoes')!; }

  // loadUsuario(): void {
  //   this.usuarioService.getUsuariosById(this.usuarioId).subscribe(usuario => {
  //     this.usuarioForm.patchValue({
  //       id: usuario.id,
  //       name: usuario.name,
  //       email: usuario.email,
  //       senha: '', // Se necessário, ajuste conforme sua lógica de senha
  //       ativo: usuario.ativo,
  //       createdAt: usuario.createdAt,
  //       updatedAt: usuario.updatedAt
  //     });

  //     // Ajusta o campo de permissões com base nos IDs das permissões
  //     if (usuario.permissoes) {
  //       // Mapeia os IDs das permissões para os objetos de permissões
  //       const selectedPermissions = usuario.permissoes.map(p => this.permissionsOptions.find(opt => opt.value.id === p.id));
  //       this.usuarioForm.patchValue({
  //         permissoes: selectedPermissions
  //       });
  //     }
  //   });
  // }

  loadUsuario(): void {
    this.usuarioService.getUsuariosById(this.usuarioId).subscribe(usuario => {
      console.log('Usuario:', usuario); // Verifique os dados aqui

      this.usuarioForm.patchValue({
        id: usuario.id,
        name: usuario.name,
        email: usuario.email,
        senha: '', // Se necessário, ajuste conforme sua lógica de senha
        ativo: usuario.ativo,
        createdAt: usuario.createdAt,
        updatedAt: usuario.updatedAt
      });

      if (usuario.permissoes) {
        this.selectedPermissions = usuario.permissoes.map(p => {
          return this.permissionsOptions.find(opt => opt.value.name === p.name)?.value || null;
        }).filter(permission => permission !== null);
      }
    });
  }


  onSubmit(): void {
    if (this.usuarioForm.valid) {
      const usuarioRequest: UsuarioRequest = this.usuarioForm.value;

      if (this.isEditMode) {
        this.usuarioService.atualizar(this.usuarioId, usuarioRequest).subscribe(() => {
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Usuário atualizado com sucesso.' });
          this.router.navigate(['/usuario']); // Redireciona após a atualização
        },
        error => {
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao atualizar o usuário.' });
        });
      } else {
        this.usuarioService.criar(usuarioRequest).subscribe(() => {
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Usuário atualizado com sucesso.' });
          this.router.navigate(['/usuario']); // Redireciona após a criação
        },
        error => {
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao cadastrar o usuário.' });
        });
      }
    }
  }

  onCancel(): void {
    this.router.navigate(['/usuario']); // Redireciona para a lista de usuários
  }
}
