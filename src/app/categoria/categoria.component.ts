import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriaService } from './categoria.service';
import { Categoria } from './model/categoria';
import { ActivatedRoute } from '@angular/router';

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
  categoria?: Categoria;

  constructor(private route: ActivatedRoute,private router: Router, private categoriaService: CategoriaService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.categoriaService.getCategoriaById(+id).subscribe(categoria => {
        this.categoria = categoria;
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
    this.categoriaService.deleteCategoria(id).subscribe(() => {
      this.loadCategorias();
    });
  }
}
