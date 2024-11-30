import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-permissao-edit',
  templateUrl: './permissao-edit.component.html',
  styleUrl: './permissao-edit.component.css'
})
export class PermissaoEditComponent implements OnInit {
  disponiveis: any[] = []; // Lista de permissões disponíveis
  selecionadas: any[] = []; // Lista de permissões selecionadas

  constructor() {}

  ngOnInit() {
    // Simulação de permissões disponíveis (substitua pelo endpoint real)
    this.disponiveis = [
      { id: 1, name: 'Criar Usuário' },
      { id: 2, name: 'Editar Usuário' },
      { id: 3, name: 'Deletar Usuário' },
      { id: 4, name: 'Visualizar Relatórios' },
    ];

    // Inicialize as permissões selecionadas caso necessário
    this.selecionadas = [];
  }

  onAdicionarPermissao(event: any) {
    console.log('Permissões adicionadas:', event.items);
  }

  onRemoverPermissao(event: any) {
    console.log('Permissões removidas:', event.items);
  }
}
