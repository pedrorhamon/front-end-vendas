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
  uploadedFiles: any[] = [];
  imageFileRemoved: any;

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
    const file = event.files[0];
    if (file) {
      this.selectedFile = file;

      // Carrega a pré-visualização da imagem
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }


  onRemoveImage(): void {
    if (this.categoria.id) {
      // Se está editando e a imagem existe, chama o backend para remover a imagem
      this.categoriaService.removeImage(this.categoria.id).subscribe(
        () => {
          this.selectedFile = null;
          this.imagePreview = null;
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Imagem removida com sucesso.' });
        },
        error => {
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao remover a imagem.' });
        }
      );
    } else {
      // Lógica de remoção local se ainda não está salva no backend
      this.selectedFile = null;
      this.imagePreview = null;
      this.uploadedFiles = [];
    }
  }


  onUpload(event: any): void {
    // Manipule o evento de upload aqui (caso precise)
    console.log('Arquivos carregados com sucesso!');
  }

  onSubmit(): void {
    if (this.categoriaForm.valid) {
      const formData = new FormData();
      formData.append('name', this.categoriaForm.get('name')?.value);

      if (this.selectedFile) {
        formData.append('imageFile', this.selectedFile);
      } else if (this.imageFileRemoved) {
        // Adiciona uma flag para indicar que a imagem foi removida
        formData.append('imageFileRemoved', 'true');
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
