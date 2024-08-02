import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Pessoa } from '../model/pessoa';
import { PessoaService } from '../pessoa.service';
import { ViaCepService } from '../via-cep.service';
import { Endereco } from '../model/endereco';

@Component({
  selector: 'app-pessoa-edit',
  templateUrl: './pessoa-edit.component.html',
  styleUrl: './pessoa-edit.component.css'
})
export class PessoaEditComponent implements OnInit {
  pessoaForm: FormGroup;
  editMode: boolean = false;
  pessoaId?: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private pessoaService: PessoaService,
    private messageService: MessageService,
    private cepService: ViaCepService
  ) {
    this.pessoaForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(150)]],
      ativo: [true, Validators.required],
      createdAt: [''],
      updatedAt: [''],
      logradouro: [''],
      numero: [''],
      complemento: [''],
      bairro: [''],
      cep: ['',Validators.required],
      cidade: [''],
      estado: ['']
    });
  }


  ngOnInit(): void {
    this.loadPessoa();

    this.pessoaForm.get('cep')?.valueChanges.subscribe(cep => {
      if (cep.length === 8) { // Quando o CEP tiver 8 caracteres
        this.cepService.consultarCep(cep).subscribe((endereco: Endereco) => {
          if (endereco) {
            this.pessoaForm.patchValue({
              logradouro: endereco.logradouro,
              numero: endereco.numero ?? '',
              complemento: endereco.complemento ?? '',
              bairro: endereco.bairro,
              cidade: endereco.localidade,
              estado: endereco.uf
            });
          }
        });
      }
    });
  }

  private loadPessoa(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.pessoaId = +id;  // Converte string para número
      this.editMode = true;
      this.pessoaService.getPessoaById(this.pessoaId).subscribe(pessoa => {
        this.pessoaForm.reset({
          name: pessoa.name ?? '',
          ativo: pessoa.ativo ?? true,
          createdAt: pessoa.createdAt ?? '',
          updatedAt: pessoa.updatedAt ?? '',
          logradouro: pessoa.logradouro ?? '',
          numero: pessoa.numero ?? '',
          complemento: pessoa.complemento ?? '',
          bairro: pessoa.bairro ?? '',
          cep: pessoa.cep ?? '',
          cidade: pessoa.cidade ?? '',
          estado: pessoa.estado ?? ''
        });

      });
    }
  }

  onSubmit(): void {
    if (this.pessoaForm.valid) {
      const pessoa = this.pessoaForm.value;
      if (this.editMode && this.pessoaId !== undefined) {
        this.pessoaService.atualizar(this.pessoaId, pessoa).subscribe(() => {
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Pessoa atualizada com sucesso' });
          this.router.navigate(['/pessoa']);
        });
      } else {
        this.pessoaService.criar(pessoa).subscribe(() => {
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Pessoa criada com sucesso' });
          this.router.navigate(['/pessoa']);
        });
      }
    }
  }

  onCancel(): void {
    this.router.navigate(['/pessoa']); // Redireciona para a lista de usuários
  }
}
