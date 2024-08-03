import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LancamentoService } from '../lancamento.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-lancamento-edit',
  templateUrl: './lancamento-edit.component.html',
  styleUrls: ['./lancamento-edit.component.css']
})
export class LancamentoEditComponent implements OnInit {
  lancamentoForm: FormGroup;
  editMode: boolean = false;
  lancamentoId?: number;
  tiposLancamento = [
    { label: 'Despesa', value: 'DESPESA' },
    { label: 'Receita', value: 'RECEITA' }
  ];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private lancamentoService: LancamentoService,
    private messageService: MessageService
  ) {
    this.lancamentoForm = this.fb.group({
      descricao: ['', [Validators.required]],
      dataVencimento: ['', [Validators.required]],
      dataPagamento: [''],
      valor: ['', [Validators.required]],
      observacao: [''],
      tipoLancamento: ['', [Validators.required]],
      categoriaId: ['', [Validators.required]],
      pessoaId: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.loadLancamento();
  }

  private loadLancamento(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.lancamentoId = +id; // Convert string to number
      this.editMode = true;
      this.lancamentoService.getLancamentoById(this.lancamentoId).subscribe(lancamento => {
        this.lancamentoForm.patchValue(lancamento);
      });
    }
  }

  onSubmit(): void {
    if (this.lancamentoForm.valid) {
      const lancamento = this.lancamentoForm.value;
      if (this.editMode && this.lancamentoId !== undefined) {
        this.lancamentoService.atualizar(this.lancamentoId, lancamento).subscribe(() => {
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Lançamento atualizado com sucesso' });
          this.router.navigate(['/lancamento']);
        });
      } else {
        this.lancamentoService.criar(lancamento).subscribe(() => {
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Lançamento criado com sucesso' });
          this.router.navigate(['/lancamento']);
        });
      }
    }
  }

  onCancel(): void {
    this.router.navigate(['/lancamentos']);
  }
}
