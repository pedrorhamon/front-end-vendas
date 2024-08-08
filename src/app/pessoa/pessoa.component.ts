import { Component, OnInit } from '@angular/core';
import { Pessoa } from './model/pessoa';
import { PessoaRequest } from './model/pessoa.request';
import { PessoaService } from './pessoa.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-pessoa',
  templateUrl: './pessoa.component.html',
  styleUrl: './pessoa.component.css'
})
export class PessoaComponent implements OnInit{

  pessoas: Pessoa[] = [];
  pessoa: PessoaRequest = {} as PessoaRequest;
  filteredPessoas: Pessoa[] = [];
  filterName: string = '';
  loading: boolean = true;
  totalPages: number = 0;
  page: number = 0;
  size: number = 20;

  constructor(
    private pessoaService: PessoaService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: LoginService
  ) {}

   ngOnInit(): void {
    this.listarPessoas();
  }

  listarPessoas(id?: number, name?: string): void {
    this.pessoaService.listarPessoa(id, name, this.page, this.size).subscribe(page => {
      this.pessoas = page.content;
      this.totalPages = page.totalPages;
      this.loading = false;

      this.filterPessoas()
    });
  }

  editarPessoa(id: number): void {
    // Implementar a lógica para editar o usuário
    // this.router.navigate(['/usuario/']);
    this.router.navigate(['/pessoa/edit', id]);
    console.log('Editar pessoa', id);
  }

  desativarPessoa(id: number): void {
    this.pessoaService.desativar(id).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Pessoa desativada' });
        this.listarPessoas();
      },
      error: (err) => {
        console.error('Erro ao desativar pessoa', err);
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao desativar pessoa' });
      }
    });
  }

  deletarPessoa(id: number): void {
    this.confirmationService.confirm({
      message: 'Tem certeza que gostaria de excluir a Pessoa?',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      acceptIcon: 'pi pi-check',
      rejectIcon: 'pi pi-times',
      acceptButtonStyleClass: 'p-button-danger', // Classe customizada para o botão de aceitação
      rejectButtonStyleClass: 'p-button-secondary', // Classe customizada para o botão de rejeição
      accept: () => {
        this.pessoaService.deletar(id).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Pessoa excluída com sucesso.' });
            this.listarPessoas();
          },
          error => {
            if (error.status === 400 && error.error.message === 'Pessoa possui relacionamentos e não pode ser excluída.') {
              this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Pessoa não pode ser excluída pois possui relacionamentos com Lançamentos.' });
            } else {
              this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'A pessoa selecionada possui relacionamento com Lançamento.' });
            }
          }
        );
      }
    });
  }

  novaPessoa(): void {
    this.router.navigate(['/pessoa/new']);
  }

  filterPessoas(): void {
    this.filteredPessoas = this.pessoas.filter(pessoa =>
      pessoa.name?.toLowerCase().includes(this.filterName.toLowerCase())
    );
  }


  clearFilter(): void {
    this.filterName = '';
    this.filteredPessoas = this.pessoas;
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
