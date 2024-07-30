import { Component, OnInit } from '@angular/core';
import { Page } from '../../assets/page';
import { Usuario } from './model/usuario';
import { UsuarioService } from './usuario.service';
import { LazyLoadEvent, MessageService } from 'primeng/api';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TableLazyLoadEvent } from 'primeng/table';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.css'
})
export class UsuarioComponent implements OnInit {
  usuarios: Usuario[] = [];
  totalRecords: number = 0;
  loading: boolean = true;
  usuarioForm: FormGroup;

  constructor(private fb: FormBuilder, private usuarioService: UsuarioService, private messageService: MessageService) {
    this.usuarioForm = this.fb.group({
      id: [''],
      descricao: ['']
    });
  }

  ngOnInit(): void {
    this.listarUsuarios({ first: 0, rows: 10 });
  }


  listarUsuarios(event?: TableLazyLoadEvent): void {
    this.loading = true;
    const page = (event?.first ?? 0) / (event?.rows ?? 10);
    const size = event?.rows ?? 10;
    const id = this.usuarioForm.get('id')?.value || null;
    const descricao = this.usuarioForm.get('descricao')?.value || null;

    this.usuarioService.listar(id, descricao, page, size).subscribe({
      next: (response) => {
        this.usuarios = response.content || [];
        this.totalRecords = response.totalElements || 0;
        this.loading = false;
      },
      error: (err) => {
        console.error('Erro ao listar usuários', err);
        this.loading = false;
      }
    });
  }

  editarUsuario(usuario: Usuario): void {
    // Implementar a lógica para editar o usuário
    console.log('Editar usuário', usuario);
  }

  deletarUsuario(id: number): void {
    this.usuarioService.deletar(id).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Usuário deletado' });
        this.listarUsuarios({ first: 0, rows: 10 }); // Recarrega a lista de usuários
      },
      error: (err) => {
        console.error('Erro ao deletar usuário', err);
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao deletar usuário' });
      }
    });
  }

}
