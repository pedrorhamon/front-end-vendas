import { Component, OnInit } from '@angular/core';
import { Page } from '../../assets/page';
import { Usuario } from './model/usuario';
import { UsuarioService } from './usuario.service';
import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TableLazyLoadEvent } from 'primeng/table';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.css'
})
export class UsuarioComponent implements OnInit {
  usuarios: Usuario[] = [];
  page: number = 0;
  size: number = 10;
  totalPages: number = 0;
  loading: boolean = true;
  // usuarioForm: FormGroup;


  constructor(
    private route: ActivatedRoute, private confirmationService: ConfirmationService,
    private router: Router, private fb: FormBuilder, private usuarioService: UsuarioService, private messageService: MessageService) {
    // this.usuarioForm = this.fb.group({
    //   id: [''],
    //   descricao: ['']
    // });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.usuarioService.getUsuariosById(+id).subscribe(usuario => {
        // Implementação para carregar uma categoria específica, se necessário
      });
    }
    // this.listarUsuarios();
    this.verificarUsuarios();
  }

  convertStringToDate(dateString: string): Date {
    // Supondo que o formato da data seja 'dd/MM/yyyy HH:mm'
    const [day, month, year, hour, minute] = dateString.split(/[/ :]/);
    return new Date(+year, +month - 1, +day, +hour, +minute);
  }

  verificarUsuarios(): void {
    this.usuarioService.getUsuarios(0, 1).subscribe(data => {
      if (data.totalElements > 0) {
        this.listarUsuarios();
      } else {
        console.log('Nenhum usuário encontrado.');
        // Opcional: Adicione uma mensagem ou ação caso não haja usuários
      }
    });
  }

  listarUsuarios(): void {
    this.usuarioService.getUsuarios(this.page, this.size).subscribe(data => {
      // Ordena os usuários por id em ordem crescente
      this.usuarios = data.content
        .map(usuario => ({
          ...usuario,
          createdAt: usuario.createdAt,
          updatedAt: usuario.updatedAt
        }))
        .sort((a, b) => a.id - b.id);  // Ordena por id em ordem crescente

      this.totalPages = data.totalPages;
    });
  }


  editarUsuario(usuario: Usuario): void {
    // Implementar a lógica para editar o usuário
    // this.router.navigate(['/usuario/']);
    this.router.navigate(['/usuario/edit', usuario.id]);
    console.log('Editar usuário', usuario);
  }

  deletarUsuario(id: number): void {
    this.confirmationService.confirm({
      message: 'Tem certeza que gostaria de excluir o Usuário?',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      acceptIcon: 'pi pi-check',
      rejectIcon: 'pi pi-times',
      acceptButtonStyleClass: 'p-button-danger', // Classe customizada para o botão de aceitação
      rejectButtonStyleClass: 'p-button-secondary',
      accept: () => {
        this.usuarioService.deletar(id).subscribe({
          next: () => {
            this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Usuário deletado' });
            this.listarUsuarios(); // Recarrega a lista de usuários
          },
          error: (err) => {
            console.error('Erro ao deletar usuário', err);
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao deletar usuário' });
          }
        });
      }
    })
  }

  novoUsuario(): void {
    this.router.navigate(['/usuario/new']);
  }

}
