import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriaService } from './categoria.service';
import { Categoria } from './model/categoria';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrl: './categoria.component.css'
})
export class CategoriaComponent implements OnInit {
  categorias: Categoria[] = [];
  filteredCategorias: Categoria[] = [];
  filterName: string = '';
  page: number = 0;
  size: number = 10;
  totalPages: number = 0;

  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router,
    private categoriaService: CategoriaService,
    private authService: LoginService
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
      this.categorias = data.content.sort((a, b) => {
        if (a && b && a.id !== undefined && b.id !== undefined) {
          return a.id - b.id;
        }
        return 0; // Retorno padrão caso um dos valores seja undefined
      });
      this.totalPages = data.totalPages;
      this.filterCategorias();
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

  filterCategorias(): void {
    this.filteredCategorias = this.categorias.filter(categoria =>
      categoria.name?.toLowerCase().includes(this.filterName.toLowerCase())
    );
  }

  clearFilter(): void {
    this.filterName = '';
    this.filteredCategorias = this.categorias;
  }

  canEdit(): boolean {
    return this.authService.hasRole('ADMIN_PRIVILEGE');
  }

  canDelete(): boolean {
    return this.authService.hasRole('ADMIN_PRIVILEGE');
  }

  canCreate(): boolean {
    return this.authService.hasRole('ADMIN_PRIVILEGE');
  }

}
