import { Categoria } from './../model/categoria';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriaService } from '../categoria.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-categoria-edit',
  templateUrl: './categoria-edit.component.html',
  styleUrls: ['./categoria-edit.component.css']
})
export class CategoriaEditComponent implements OnInit {
  categoriaForm: FormGroup;
  categoria: Categoria = new Categoria();
  loading: boolean = false;
  selectedFile: File | null = null; // Armazena o arquivo selecionado
  imagePreview: string | null = null;

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
      imageFile: ['']
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.categoriaService.getCategoriaById(+id).subscribe(categoria => {
        this.categoria = categoria;
        this.categoriaForm.patchValue(categoria);

        if (categoria.imageFile) {
          this.imagePreview = `data:image/jpeg;base64,${categoria.imageFile}`;
        }
      });
    }

  }

  onFileSelected(event: any): void {
    this.selectedFile = event.files[0];

    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  onRemoveImage(): void {
    this.selectedFile = null; // Remove o arquivo selecionado
    this.imagePreview = null; // Remove a pré-visualização

    // Reseta o campo de upload no formulário
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = ''; // Limpa o campo de upload manualmente
    }

    // Reseta o controle do form de imagem
    this.categoriaForm.get('imageFile')?.setValue(null);
    this.categoriaForm.get('imageFile')?.updateValueAndValidity(); // Atualiza o valor e o estado do campo
  }


  onSubmit(): void {
    if (this.categoriaForm.valid) {
      const formData = new FormData();
      formData.append('name', this.categoriaForm.get('name')?.value);

      if (this.selectedFile) {
        formData.append('imageFile', this.selectedFile);
      }

      this.loading = true;

      if (this.categoria.id) {
        this.atualizar(formData);
      } else {
        this.salvar(formData);
      }
    }
  }

  salvar(formData: FormData): void {
    this.categoriaService.createCategoria(formData).subscribe(
      () => {
        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Categoria salva com sucesso.' });
        this.router.navigate(['/categoria']);
      },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao salvar a categoria.' });
      }
    ).add(() => {
      this.loading = false;
    });
  }

  atualizar(formData: FormData): void {
    this.categoriaService.updateCategoria(this.categoria.id!, formData).subscribe(
      () => {
        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Categoria atualizada com sucesso.' });
        this.router.navigate(['/categoria']);
      },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao atualizar a categoria.' });
      }
    ).add(() => {
      this.loading = false;
    });
  }

  onCancel(): void {
    this.router.navigate(['/categoria']);
  }
}
