import { Component, OnInit } from '@angular/core';
import { Lancamento } from './model/lancamento';
import { LancamentoService } from './lancamento.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-lacamento',
  templateUrl: './lacamento.component.html',
  styleUrl: './lacamento.component.css'
})
export class LacamentoComponent  implements OnInit {

  lancamentos: Lancamento[] = [];

  constructor(private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router,private lancamentoService: LancamentoService) { }

  ngOnInit(): void {
    this.listarLancamentos();
  }

  listarLancamentos(): void {
    this.lancamentoService.listar().subscribe(lancamentos => {
      this.lancamentos = lancamentos.content.sort((a, b) => {
        if (a && b && a.id !== undefined && b.id !== undefined) {
          return a.id - b.id;
        }
        return 0; // Retorno padrão caso um dos valores seja undefined
      });
    });
  }
  editLancamento(id: number): void {
    this.router.navigate(['/lancamento/edit', id]);
  }

  deletaLancamento(id: number): void {
    this.confirmationService.confirm({
      message: 'Tem certeza que gostaria de excluir o Lançamento?',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      acceptIcon: 'pi pi-check',
      rejectIcon: 'pi pi-times',
      acceptButtonStyleClass: 'p-button-danger', // Classe customizada para o botão de aceitação
      rejectButtonStyleClass: 'p-button-secondary', // Classe customizada para o botão de rejeição
      accept: () => {
        this.lancamentoService.deletar(id).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Lançamento excluída com sucesso.' });
            this.listarLancamentos();
          },
          error => {
            if (error.status === 400 && error.error.message === 'Lançamento possui relacionamentos e não pode ser excluída.') {
              this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Lançamento não pode ser excluída pois possui relacionamentos com Lançamentos.' });
            }
          }
        );
      }
    });
  }

  novaLancamento(): void {
    this.router.navigate(['/lancamento/new']);
  }

}
