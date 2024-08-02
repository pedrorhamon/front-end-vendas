import { Component, OnInit } from '@angular/core';
import { Lancamento } from './model/lancamento';
import { LancamentoService } from './lancamento.service';

@Component({
  selector: 'app-lacamento',
  templateUrl: './lacamento.component.html',
  styleUrl: './lacamento.component.css'
})
export class LacamentoComponent  implements OnInit {

  lancamentos: Lancamento[] = [];

  constructor(private lancamentoService: LancamentoService) { }

  ngOnInit(): void {
    this.listarLancamentos();
  }

  listarLancamentos(): void {
    this.lancamentoService.listar().subscribe(lancamentos => {
      this.lancamentos = lancamentos.content;
    });
  }

  // Métodos adicionais para criar, atualizar, deletar, etc.
}
