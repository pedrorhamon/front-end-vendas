// import { map } from 'rxjs';
// import { PessoaService } from './../../pessoa/pessoa.service';
// import { Component, OnInit } from '@angular/core';
// import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
// import { ActivatedRoute, Router } from '@angular/router';
// import { LancamentoService } from '../lancamento.service';
// import { MessageService } from 'primeng/api';
// import { TipoLancamento } from '../model/tipolancamento';
// import { CategoriaService } from '../../categoria/categoria.service';
// import { formatDate } from '@angular/common';

// @Component({
//   selector: 'app-lancamento-edit',
//   templateUrl: './lancamento-edit.component.html',
//   styleUrls: ['./lancamento-edit.component.css']
// })
// export class LancamentoEditComponent implements OnInit {
//   lancamentoForm: FormGroup;
//   editMode: boolean = false;
//   lancamentoId?: number;
//   tiposLancamento: { label: string, value: TipoLancamento }[];
//   pessoas: { label: string, value: any }[] = [];
//   categorias: { label: string, value: any }[] = [];

//   constructor(
//     private fb: FormBuilder,
//     private route: ActivatedRoute,
//     private router: Router,
//     private lancamentoService: LancamentoService,
//     private messageService: MessageService,
//     private categoriaService: CategoriaService,
//     private pessoaService: PessoaService
//   ) {
//     this.lancamentoForm = this.fb.group({
//       descricao: ['', [Validators.required]],
//       dataVencimento: ['', [Validators.required]],
//       dataPagamento: ['', [Validators.required]],
//       valor: ['', [Validators.required]],
//       tipoLancamento: ['', [Validators.required]],
//       categoriaId: [null, [Validators.required]],
//       pessoaId: [null, [Validators.required]],
//       observacao: ['']
//     }, { validator: this.dataPagamentoMaiorOuIgualValidator });

//     this.tiposLancamento = Object.keys(TipoLancamento).map(key => ({
//       label: this.capitalize(TipoLancamento[key as keyof typeof TipoLancamento].toLowerCase()),
//       value: TipoLancamento[key as keyof typeof TipoLancamento]
//     }));
//   }


//   capitalize(str: string): string {
//     return str.charAt(0).toUpperCase() + str.slice(1);
//   }

//   ngOnInit(): void {
//     this.loadLancamento();
//     // this.categoriaService.getCategorias(0, 10).subscribe(categorias => {

//   }


//   private loadLancamento(): void {
//     const id = this.route.snapshot.paramMap.get('id');
//     if (id !== null) {
//       this.lancamentoId = +id; // Convert string to number
//       this.editMode = true;
//       this.lancamentoService.getLancamentoById(this.lancamentoId).subscribe(lancamento => {
//         this.lancamentoForm.patchValue(lancamento);
//         console.log('Lançamento carregado:', lancamento);
//         // Populando selects

//       });
//     }
// }

//   onSubmit(): void {
//     if (this.lancamentoForm.valid) {
//       const lancamento = this.lancamentoForm.value;
//       lancamento.dataVencimento = this.formatDate(lancamento.dataVencimento);
//       lancamento.dataPagamento = this.formatDate(lancamento.dataPagamento);
//       if (this.editMode && this.lancamentoId !== undefined) {
//         this.lancamentoService.atualizar(this.lancamentoId, lancamento).subscribe(() => {
//           this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Lançamento atualizado com sucesso' });
//           this.router.navigate(['/lancamento']);
//         });
//       } else {
//         this.lancamentoService.criar(lancamento).subscribe(() => {
//           this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Lançamento criado com sucesso' });
//           this.router.navigate(['/lancamento']);
//         });
//       }
//     } else {
//       this.showValidationErrors();
//     }
//   }

//   private showValidationErrors(): void {
//     if (this.lancamentoForm.hasError('dataPagamentoInvalida')) {
//       this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Data de pagamento deve ser maior ou igual à data de vencimento' });
//     } else {
//       this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Formulário contém erros. Por favor, corrija-os antes de enviar.' });
//     }
//   }

//   private formatDate(date: string): string {
//     return formatDate(date, 'dd/MM/yyyy', 'en-US');
//   }

//   onCancel(): void {
//     this.router.navigate(['/lancamento']);
//   }

//   private dataPagamentoMaiorOuIgualValidator: ValidatorFn = (control: AbstractControl): { [key: string]: any } | null => {
//     const dataVencimento = control.get('dataVencimento')?.value;
//     const dataPagamento = control.get('dataPagamento')?.value;

//     if (dataVencimento && dataPagamento) {
//       const dataVencimentoDate = new Date(dataVencimento);
//       const dataPagamentoDate = new Date(dataPagamento);

//       if (dataPagamentoDate < dataVencimentoDate) {
//         return { 'dataPagamentoInvalida': true };
//       }
//     }

//     return null;
//   };
// }
import { map } from 'rxjs';
import { PessoaService } from './../../pessoa/pessoa.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LancamentoService } from '../lancamento.service';
import { MessageService } from 'primeng/api';
import { TipoLancamento } from '../model/tipolancamento';
import { CategoriaService } from '../../categoria/categoria.service';
import { DecimalPipe, formatDate } from '@angular/common';

@Component({
  selector: 'app-lancamento-edit',
  templateUrl: './lancamento-edit.component.html',
  styleUrls: ['./lancamento-edit.component.css'],
  providers: [DecimalPipe],
})
export class LancamentoEditComponent implements OnInit {
  lancamentoForm: FormGroup;
  editMode: boolean = false;
  lancamentoId?: number;
  tiposLancamento: { label: string, value: TipoLancamento }[];
  pessoas: { label: string, value: any }[] = [];
  categorias: { label: string, value: any }[] = [];
  loading: boolean = false



  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private lancamentoService: LancamentoService,
    private messageService: MessageService,
    private categoriaService: CategoriaService,
    private pessoaService: PessoaService,
    private decimalPipe: DecimalPipe
  ) {
    this.lancamentoForm = this.fb.group({
      descricao: ['', [Validators.required]],
      dataVencimento: ['', [Validators.required]],
      dataPagamento: ['', [Validators.required]],
      valor: ['', [Validators.required]],
      tipoLancamento: ['', [Validators.required]],
      categoriaNomes: [[], [Validators.required]],
      pessoaNomes: [[], [Validators.required]],
      observacao: ['']
    }, { validator: this.dataPagamentoMaiorOuIgualValidator });

    this.tiposLancamento = Object.keys(TipoLancamento).map(key => ({
      label: this.capitalize(TipoLancamento[key as keyof typeof TipoLancamento].toLowerCase()),
      value: TipoLancamento[key as keyof typeof TipoLancamento]
    }));
  }

  ngOnInit(): void {
    this.loadLancamento();
    this.loadCategorias();
    this.loadPessoas();
  }

  private loadLancamento(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.lancamentoId = +id; // Convert string to number
      this.editMode = true;
      this.lancamentoService.getLancamentoById(this.lancamentoId).subscribe(lancamento => {
        this.lancamentoForm.patchValue({
          descricao: lancamento.descricao,
          dataVencimento: lancamento.dataVencimento,
          dataPagamento: lancamento.dataPagamento ? lancamento.dataPagamento : '',
          valor: lancamento.valor,
          tipoLancamento: lancamento.tipoLancamento,
          categoriaNomes: lancamento.categoriaNomes,
          pessoaNomes: lancamento.pessoaNomes,
          observacao: lancamento.observacao
        });
        console.log('Lançamento carregado:', lancamento);
      });
    }
  }

  loadCategorias(): void {
    this.categoriaService.getCategorias(0, 10).subscribe(page => {
      this.categorias = page.content.map(categoria => ({
        label: categoria.name,
        value: categoria.name
      }));
    });
  }

  loadPessoas(): void {
    this.pessoaService.listarPessoa().subscribe(pessoas => {
      this.pessoas = pessoas.content.map(pessoa => ({
        label: pessoa.name,
        value: pessoa.name
      }));
    });
  }

  onSubmit(): void {
    if (this.lancamentoForm.valid) {
      this.loading = true;
      const lancamento = this.lancamentoForm.value;
      lancamento.valor = this.decimalPipe.transform(lancamento.valor, '1.2-2')?.replace(/,/g, '') || '0';
      lancamento.dataVencimento = this.formatDate(lancamento.dataVencimento);
      lancamento.dataPagamento = this.formatDate(lancamento.dataPagamento);
      // lancamento.dataVencimento = this.formatDate(lancamento.dataVencimento);
      // lancamento.dataPagamento = this.formatDate(lancamento.dataPagamento);
      if (this.editMode && this.lancamentoId !== undefined) {
        this.lancamentoService.atualizar(this.lancamentoId, lancamento).subscribe(() => {
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Lançamento atualizado com sucesso' });
          this.router.navigate(['/lancamento']);
        });
      } else {
        this.lancamentoService.criar(lancamento).subscribe(() => {
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Lançamento criado com sucesso' });
          this.router.navigate(['/lancamento']);
        }).add(() => {
          this.loading = false; // Desativa o carregamento após a resposta
        });
      }
    } else {
      this.showValidationErrors();
    }
  }

  private showValidationErrors(): void {
    if (this.lancamentoForm.hasError('dataPagamentoInvalida')) {
      this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Data de pagamento deve ser maior ou igual à data de vencimento' });
    } else {
      this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Formulário contém erros. Por favor, corrija-os antes de enviar.' });
    }
  }

  private formatDate(dateString: string): string {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-based in JavaScript.
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  onCancel(): void {
    this.router.navigate(['/lancamento']);
  }

  private capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  private dataPagamentoMaiorOuIgualValidator: ValidatorFn = (control: AbstractControl): { [key: string]: any } | null => {
    const dataVencimento = control.get('dataVencimento')?.value;
    const dataPagamento = control.get('dataPagamento')?.value;

    if (dataVencimento && dataPagamento) {
      const dataVencimentoDate = new Date(dataVencimento);
      const dataPagamentoDate = new Date(dataPagamento);

      if (dataPagamentoDate < dataVencimentoDate) {
        return { 'dataPagamentoInvalida': true };
      }
    }

    return null;
  };

  private convertDateToApiFormat(date: string): string {
    const [day, month, year] = date.split('/');
    return `${year}-${month}-${day}`; // Convert 'dd/MM/yyyy' to 'yyyy-MM-dd'
  }
}

