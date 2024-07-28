import { Component, OnInit } from '@angular/core';
import { Router } from 'express';
import { CategoriaService } from './categoria.service';
import { Categoria } from './model/categoria';

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

  constructor(private categoriaService: CategoriaService) { }

  ngOnInit(): void {
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
}
