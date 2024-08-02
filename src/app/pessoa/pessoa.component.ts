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

}
