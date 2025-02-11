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
  mensagemErro: any[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private permissaoService: PermissaoService,
    private subPermissaoService: SubPermissaoService,
    private messageService: MessageService
  ) {
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
      this.permissaoId = +id;
      this.editMode = true;

      this.permissaoService.obterId(this.permissaoId).subscribe(permissao => {
        // Atualiza o formulário com os dados da permissão
        this.permissaoForm.patchValue({
          name: permissao.name,
          subPermissoes: permissao.subPermissoes.map((sp: any) => sp.id)
        });

        // Move as sub-permissões associadas para "Selecionadas"
        this.selecionadas = permissao.subPermissoes;

        // Remove os itens já selecionados da lista de disponíveis
        this.disponiveis = this.disponiveis.filter(
          (item) => !this.selecionadas.find((sp) => sp.id === item.id)
        );
      });
    }
  }

  onAdicionarPermissao(event: any): void {
    // Adiciona apenas itens que ainda não estão em "selecionadas"
    const novosItens = event.items.filter(
      (item: any) => !this.selecionadas.some((selecionada) => selecionada.id === item.id)
    );
    this.selecionadas.push(...novosItens);

    // Remove os itens adicionados da lista "disponíveis"
    this.disponiveis = this.disponiveis.filter(
      (item) => !event.items.find((added: any) => added.id === item.id)
    );

    this.updateFormSubPermissoes();
  }



  onRemoverPermissao(event: any): void {
    // Adiciona os itens removidos apenas se ainda não estiverem em disponíveis
    const itensUnicos = event.items.filter(
      (item: any) => !this.disponiveis.some((disponivel) => disponivel.id === item.id)
    );
    this.disponiveis.push(...itensUnicos);

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
    if (this.permissaoForm.invalid) {
      this.mensagemErro = [
        {
          severity: 'error',
          summary: 'Erro',
          detail: 'Nome é obrigatório e deve ter entre 5 e 150 caracteres.',
        },
      ];
    } else {
      this.mensagemErro = []; // Limpa a mensagem em caso de sucesso
      // Processa o envio do formulário
      console.log(this.permissaoForm.value);
    }
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
