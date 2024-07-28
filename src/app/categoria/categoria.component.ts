import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriaService } from './categoria.service';
import { Categoria } from './model/categoria';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrl: './categoria.component.css'
})
export class CategoriaComponent implements OnInit {
  categorias: Categoria[] = [];
  page: number = 0;
  size: number = 10;
  totalPages: number = 0;

  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router,
    private categoriaService: CategoriaService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.categoriaService.getCategoriaById(+id).subscribe(categoria => {
        // Implementação para carregar uma categoria específica, se necessário
      });
    }
    this.loadCategorias();
  }

  loadCategorias(): void {
    this.categoriaService.getCategorias(this.page, this.size).subscribe(data => {
      this.categorias = data.content;
      this.totalPages = data.totalPages;
    });
  }

  nextPage(): void {
    if (this.page < this.totalPages - 1) {
      this.page++;
      this.loadCategorias();
    }
  }

  previousPage(): void {
    if (this.page > 0) {
      this.page--;
      this.loadCategorias();
    }
  }

  editCategoria(id: number): void {
    this.router.navigate(['/categoria/edit', id]);
  }

  deleteCategoria(id: number): void {
    this.confirmationService.confirm({
      message: 'Tem certeza que gostaria de excluir a categoria?',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      acceptIcon: 'pi pi-check',
      rejectIcon: 'pi pi-times',
      acceptButtonStyleClass: 'p-button-danger', // Classe customizada para o botão de aceitação
      rejectButtonStyleClass: 'p-button-secondary', // Classe customizada para o botão de rejeição
      accept: () => {
        this.categoriaService.deleteCategoria(id).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Categoria excluída com sucesso.' });
            this.loadCategorias();
          },
          error => {
            if (error.status === 400 && error.error.message === 'Categoria possui relacionamentos e não pode ser excluída.') {
              this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Categoria não pode ser excluída pois possui relacionamentos com Lançamentos.' });
            } else {
              this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'A categoria selecionada possui relacionamento com Lançamento.' });
            }
          }
        );
      }
    });
  }

  novaCategoria(): void {
    this.router.navigate(['/categoria/new']);
  }
}
