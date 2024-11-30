import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';

import { LoginService } from '../login/login.service';
import { Permissao } from './model/permissao';
import { PermissaoService } from './permissao.service';

@Component({
  selector: 'app-permissao',
  templateUrl: './permissao.component.html',
  styleUrl: './permissao.component.css'
})
export class PermissaoComponent implements OnInit{

  filteredPermissao: Permissao[] = [];
  filterName: string = '';
  permissoes: Permissao[] = [];
  loading: boolean = true;
  totalPages: number = 0;
  page: number = 0;
  size: number = 20;


  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: LoginService,
    private permissaoService: PermissaoService
  ) {}

   ngOnInit(): void {
  }

  listarPessoas(id?: number, name?: string): void {
    this.permissaoService.listarPessoa(id, name, this.page, this.size).subscribe(page => {
      this.permissoes = page.content;
      this.totalPages = page.totalPages;
      this.loading = false;

      this.filterPessoas()
    });
  }

  filterPessoas(): void {
    this.filteredPermissao = this.permissoes.filter(permissao =>
      permissao.name?.toLowerCase().includes(this.filterName.toLowerCase())
    );
  }

  editarPermissao(id: number): void {
    // Implementar a lógica para editar o usuário
    // this.router.navigate(['/usuario/']);
    this.router.navigate(['/permissao/edit', id]);
    console.log('Editar Permissão', id);
  }

  deletarPermissao(id: number): void {
    this.confirmationService.confirm({
      message: 'Tem certeza que gostaria de excluir a Permissão?',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      acceptIcon: 'pi pi-check',
      rejectIcon: 'pi pi-times',
      acceptButtonStyleClass: 'p-button-danger', // Classe customizada para o botão de aceitação
      rejectButtonStyleClass: 'p-button-secondary', // Classe customizada para o botão de rejeição
      accept: () => {
        this.permissaoService.deletar(id).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Permissão excluída com sucesso.' });
            this.listarPessoas();
          },
          error => {
            if (error.status === 400 && error.error.message === 'Permissão possui relacionamentos e não pode ser excluída.') {
              this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Permissão não pode ser excluída pois possui relacionamentos com Lançamentos.' });
            } else {
              this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'A Permissão selecionada possui relacionamento com Sub Permissãoa.' });
            }
          }
        );
      }
    });
  }

  canEdit(): boolean {
    return this.authService.hasRole('ADMIN_PRIVILEGE');
  }

  canDelete(): boolean {
    return this.authService.hasRole('ADMIN_PRIVILEGE');
  }

  canCreate(): boolean {
    return this.authService.hasRole('ADMIN_PRIVILEGE');
  }

}
