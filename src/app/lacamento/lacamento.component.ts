import { saveAs } from 'file-saver';
import { Component, OnInit } from '@angular/core';
import { Lancamento } from './model/lancamento';
import { LancamentoService } from './lancamento.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-lacamento',
  templateUrl: './lacamento.component.html',
  styleUrls: ['./lacamento.component.css']
})
export class LacamentoComponent implements OnInit {

  lancamentos: Lancamento[] = [];
  filteredLancamentos: Lancamento[] = [];
  filtrosForm: FormGroup;

  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private router: Router,
    private lancamentoService: LancamentoService,
    private fb: FormBuilder
  ) {
    // Inicializa o FormGroup com os controles necessários
    this.filtrosForm = this.fb.group({
      dataVencimentoDe: [null],
      dataVencimentoAte: [null]
    });
  }

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
      this.aplicarFiltros(); // Aplicar filtros após a listagem inicial
    });
  }

  aplicarFiltros(): void {
    const formValues = this.filtrosForm.value;
    const dataVencimentoDe = formValues.dataVencimentoDe ? new Date(formValues.dataVencimentoDe) : null;
    const dataVencimentoAte = formValues.dataVencimentoAte ? new Date(formValues.dataVencimentoAte) : null;

    this.filteredLancamentos = this.lancamentos.filter(lancamento => {
      const dataVencimento = new Date(lancamento.dataVencimento);

      return (
        (dataVencimentoDe === null || dataVencimento >= dataVencimentoDe) &&
        (dataVencimentoAte === null || dataVencimento <= dataVencimentoAte)
      );
    });
  }

  exportarLancamentos(): void {
    // Aqui você pode definir as páginas e o tamanho que deseja exportar.
    const page = 0; // Página inicial
    const size = 10; // Tamanho por página

    this.lancamentoService.exportarParaExcel(page, size).subscribe((response: Blob) => {
      const blob = new Blob([response], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      saveAs(blob, 'lancamentos.xlsx');
    });
  }


  limparFiltros(): void {
    this.filtrosForm.reset(); // Reseta os valores do formulário
    this.aplicarFiltros(); // Reaplica os filtros para exibir todos os lançamentos
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
