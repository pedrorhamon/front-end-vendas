import { Component, OnInit } from '@angular/core';
import { Pessoa } from './model/pessoa';
import { PessoaRequest } from './model/pessoa.request';
import { PessoaService } from './pessoa.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-pessoa',
  templateUrl: './pessoa.component.html',
  styleUrl: './pessoa.component.css'
})
export class PessoaComponent implements OnInit{

  pessoas: Pessoa[] = [];
  pessoa: PessoaRequest = {} as PessoaRequest;
  loading: boolean = true;
  totalPages: number = 0;
  page: number = 0;
  size: number = 10;

  constructor(
    private pessoaService: PessoaService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

   ngOnInit(): void {
    this.listarPessoas();
  }

  listarPessoas(id?: number, name?: string): void {
    this.pessoaService.listarPessoa(id, name, this.page, this.size).subscribe(page => {
      this.pessoas = page.content;
      this.totalPages = page.totalPages;
      this.loading = false;
    });
  }

  editarUsuario(pessoa: Pessoa): void {
    // Implementar a lógica para editar o usuário
    // this.router.navigate(['/usuario/']);
    this.router.navigate(['/pessoa/edit', pessoa.id]);
    console.log('Editar pessoa', pessoa);
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

}
