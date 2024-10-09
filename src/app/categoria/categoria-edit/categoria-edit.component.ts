import { Categoria } from './../model/categoria';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriaService } from '../categoria.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-categoria-edit',
  templateUrl: './categoria-edit.component.html',
  styleUrl: './categoria-edit.component.css'
})
export class CategoriaEditComponent implements OnInit {
  categoriaForm: FormGroup;
  categoria: Categoria = new Categoria();
  loading: boolean = false
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private categoriaService: CategoriaService,
    private messageService: MessageService
  ) {
    this.categoriaForm = this.fb.group({
      id: [null],
      name: ['', [Validators.required, Validators.minLength(3)]],
      imageFile: [null]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.categoriaService.getCategoriaById(+id).subscribe(categoria => {
        this.categoria = categoria;
        this.categoriaForm.patchValue(categoria);
      });
    }
  }

  onSubmit(): void {
    if (this.categoriaForm.valid) {
      this.loading = true;
      if (this.categoria.id) {
        this.atualizar();
      } else {
        this.salvar();
      }
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  salvar(): void {
    const formData = new FormData();
  formData.append('name', this.categoriaForm.get('name')?.value);

    if (this.selectedFile) {
      formData.append('imageFile', this.selectedFile); // Certifique-se de que o arquivo de imagem está sendo enviado
    }

    this.categoriaService.createCategoria(this.categoriaForm.value).subscribe(
      () => {
        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Categoria salva com sucesso.' });
        this.router.navigate(['/categoria']);
      },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao salvar a categoria.' });
      }
    ).add(() => {
      this.loading = false; // Desativa o carregamento após a resposta
    });
  }

  atualizar(): void {
    this.categoriaService.updateCategoria(this.categoria.id!, this.categoriaForm.value).subscribe(
      () => {
        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Categoria atualizada com sucesso.' });
        this.router.navigate(['/categoria']);
      },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao atualizar a categoria.' });
      }
    ).add(() => {
      this.loading = false; // Desativa o carregamento após a resposta
    });
  }

  onCancel(): void {
    this.router.navigate(['/categoria']);
  }
}
