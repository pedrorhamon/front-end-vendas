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
      message: 'Tem certeza de que deseja deletar esta pessoa?',
      accept: () => {
        this.pessoaService.deletar(id).subscribe({
          next: () => {
            this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Pessoa deletada' });
            this.listarPessoas();
          },
          error: (err) => {
            console.error('Erro ao deletar pessoa', err);
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao deletar pessoa' });
          }
        });
      }
    });
  }

}
