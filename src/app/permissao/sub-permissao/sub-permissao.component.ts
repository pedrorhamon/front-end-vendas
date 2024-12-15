import { Component, OnInit } from '@angular/core';
import { SubPermissao } from '../model/subPermissao';
import { SubPermissaoService } from './sub-permissao.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../../login/login.service';

@Component({
  selector: 'app-sub-permissao',
  templateUrl: './sub-permissao.component.html',
  styleUrl: './sub-permissao.component.css'
})
export class SubPermissaoComponent implements OnInit{

  filteredSubPermissao: SubPermissao[] = [];
  filterName: string = '';
  subpermissoes: SubPermissao[] = [];
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
    private subpermissaoService: SubPermissaoService
  ) {}

   ngOnInit(): void {
    this.listarSubPermissao();
  }

  listarSubPermissao(id?: number, name?: string): void {
    this.subpermissaoService.listarPessoa(id, name, this.page, this.size).subscribe(page => {
      this.subpermissoes = page.content;
      this.totalPages = page.totalPages;
      this.loading = false;

      this.filterSubPermissao()
    });
  }

  filterSubPermissao(): void {
    this.filteredSubPermissao = this.subpermissoes.filter(subpermissao =>
      subpermissao.nome?.toLowerCase().includes(this.filterName.toLowerCase())
    );
  }

  clearFilter(): void {
    this.filterName = '';
    this.filteredSubPermissao = this.subpermissoes;
  }

  editarSubPermissao(id: number): void {
    // Implementar a lógica para editar o usuário
    // this.router.navigate(['/usuario/']);
    this.router.navigate(['/permissao/edit', id]);
    console.log('Editar Permissão', id);
  }

  deletarSubPermissao(id: number): void {
    this.confirmationService.confirm({
      message: 'Tem certeza que gostaria de excluir a Permissão?',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      acceptIcon: 'pi pi-check',
      rejectIcon: 'pi pi-times',
      acceptButtonStyleClass: 'p-button-danger', // Classe customizada para o botão de aceitação
      rejectButtonStyleClass: 'p-button-secondary', // Classe customizada para o botão de rejeição
      accept: () => {
        this.subpermissaoService.deletar(id).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Sub Permissão excluída com sucesso.' });
            this.listarSubPermissao();
          },
          error => {
            if (error.status === 400 && error.error.message === 'Sub-Permissão possui relacionamentos e não pode ser excluída.') {
              this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Permissão não pode ser excluída pois possui relacionamentos com Permissões.' });
            } else {
              this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'A Permissão selecionada possui relacionamento com Sub Permissão e o Usuário.' });
            }
          }
        );
      }
    });
  }

  novaSubPermissao(): void {
    this.router.navigate(['/sub-permissao/new']);
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

