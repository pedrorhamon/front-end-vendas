import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { SubPermissao } from '../model/subPermissao';
import { PermissaoService } from '../permissao.service';
import { SubPermissaoService } from '../sub-permissao/sub-permissao.service';

@Component({
  selector: 'app-permissao-edit',
  templateUrl: './permissao-edit.component.html',
  styleUrls: ['./permissao-edit.component.css']
})
export class PermissaoEditComponent implements OnInit {
  permissaoForm: FormGroup;
  disponiveis: SubPermissao[] = [];
  selecionadas: SubPermissao[] = [];
  editMode: boolean = false;
  permissaoId?: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private permissaoService: PermissaoService,
    private subPermissaoService: SubPermissaoService,
    private messageService: MessageService
  ) {
    // Define o FormGroup
    this.permissaoForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      subPermissoes: [[]] // Controla as sub-permissões selecionadas
    });
  }

  ngOnInit(): void {
    this.carregarSubPermissoes();
    this.loadPermissao();
  }

  carregarSubPermissoes(): void {
    this.subPermissaoService.listarTodas().subscribe({
      next: (data) => {
        this.disponiveis = data; // Carrega as sub-permissões disponíveis
      },
      error: (err) => {
        console.error('Erro ao carregar sub-permissões:', err);
      }
    });
  }

  private loadPermissao(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.permissaoId = +id; // Converte string para número
      this.editMode = true;

      this.permissaoService.obterId(this.permissaoId).subscribe(permissao => {
        // Atualiza o formulário com os dados da permissão
        this.permissaoForm.patchValue({
          name: permissao.name,
          subPermissoes: permissao.subPermissoes.map((sp: any) => sp.id) // IDs das sub-permissões
        });

        // Move as sub-permissões associadas para "Selecionadas"
        this.selecionadas = permissao.subPermissoes;

        // Remove os itens selecionados da lista "Disponíveis"
        this.disponiveis = this.disponiveis.filter(
          (item) => !this.selecionadas.find((sp) => sp.id === item.id)
        );
      });
    }
  }


  onAdicionarPermissao(event: any): void {
    const novosItens = event.items.filter(
      (item: any) => !this.selecionadas.some((selecionada) => selecionada.id === item.id)
    );
    this.selecionadas.push(...novosItens); // Adiciona apenas os itens que não estão duplicados
    this.disponiveis = this.disponiveis.filter(
      (item) => !event.items.find((added: any) => added.id === item.id)
    );
    this.updateFormSubPermissoes();
  }


  onRemoverPermissao(event: any): void {
    this.disponiveis.push(...event.items); // Remove itens da seleção
    this.selecionadas = this.selecionadas.filter(
      (item) => !event.items.find((removed: any) => removed.id === item.id)
    );
    this.updateFormSubPermissoes();
  }

  private updateFormSubPermissoes(): void {
    this.permissaoForm.patchValue({
      subPermissoes: this.selecionadas.map((sp) => sp.id) // Atualiza o campo do formulário
    });
  }

  onSubmit(): void {
    if (this.permissaoForm.valid) {
      const permissao = this.permissaoForm.value;
      if (this.editMode && this.permissaoId !== undefined) {
        this.permissaoService.atualizar(this.permissaoId, permissao).subscribe(() => {
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Permissão atualizada com sucesso' });
          this.router.navigate(['/permissao']);
        });
      } else {
        this.permissaoService.criar(permissao).subscribe(() => {
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Permissão criada com sucesso' });
          this.router.navigate(['/permissao']);
        });
      }
    }
  }

  onCancel(): void {
    this.router.navigate(['/permissao']); // Redireciona para a lista de permissões
  }
}
