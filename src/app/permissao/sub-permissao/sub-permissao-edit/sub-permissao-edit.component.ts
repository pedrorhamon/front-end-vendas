import { SubPermissao } from './../../model/subPermissao';
import { Component, OnInit } from '@angular/core';
import { SubPermissaoService } from '../sub-permissao.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-sub-permissao-edit',
  templateUrl: './sub-permissao-edit.component.html',
  styleUrl: './sub-permissao-edit.component.css'
})
export class SubPermissaoEditComponent implements OnInit {

  subPermissaoForm: FormGroup;
    editMode: boolean = false;
    subPermissaoId?: number;

  constructor(
     private fb: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private subPermissaoService: SubPermissaoService,
        private messageService: MessageService,
  ) {
    this.subPermissaoForm = this.fb.group({
          id: [null],
          nome: ['', [Validators.required, Validators.minLength(3)]],
        });
  }

  ngOnInit(): void {
    this.loadPessoa()
   }

   private loadPessoa(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.subPermissaoId = +id;  // Converte string para número
      this.editMode = true;
      this.subPermissaoService.obterId(this.subPermissaoId).subscribe(subPermissao => {
        this.subPermissaoForm.reset({
          nome: subPermissao.nome
        });

      });
    }
  }

   onSubmit(): void {
    if (this.subPermissaoForm.valid) {
      const subPermissao = this.subPermissaoForm.value;
      if (this.editMode && this.subPermissaoId !== undefined) {
        this.subPermissaoService.atualizar(this.subPermissaoId, subPermissao).subscribe(() => {
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Sub Permissao atualizada com sucesso' });
          this.router.navigate(['/sub-permissao']);
        });
      } else {
        this.subPermissaoService.criar(subPermissao).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Sub Permissao criada com sucesso' });
            this.router.navigate(['/sub-permissao']);
          },
          (error) => {
            console.error('Erro ao criar SubPermissao:', error);
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao criar Sub Permissão: ' + error.message });
          }
        );

      }
    }
  }

   onCancel(): void {
    this.router.navigate(['/sub-permissao']); // Redireciona para a lista de usuários
  }

}
