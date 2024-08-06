import { Component, OnInit } from '@angular/core';
import { LancamentoService } from '../lacamento/lancamento.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  data: any;
  options: any;

  constructor(private lancamentoService: LancamentoService) {
    this.data = {
      labels: [], // Serão preenchidas dinamicamente
      datasets: [
        {
          label: 'Lançamentos',
          data: [],
          fill: false,
          borderColor: '#42A5F5'
        }
      ]
    };

    this.options = {
      responsive: true,
      scales: {
        x: {
          beginAtZero: true
        },
        y: {
          beginAtZero: true
        }
      }
    };
  }

  ngOnInit(): void {
    this.loadLancamentos();
  }

  private loadLancamentos(): void {
    this.lancamentoService.listar().subscribe(response => {
      const lancamentos = response.content;
      const labels = lancamentos.map((lancamento: any) => lancamento.dataVencimento); // Ajuste conforme a sua estrutura de dados
      const data = lancamentos.map((lancamento: any) => lancamento.valor); // Ajuste conforme a sua estrutura de dados

      this.data = {
        labels,
        datasets: [
          {
            label: 'Lançamentos',
            data,
            fill: false,
            borderColor: '#42A5F5'
          }
        ]
      };
    });
  }
}
