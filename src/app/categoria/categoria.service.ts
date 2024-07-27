import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categoria } from './model/categoria';
import { Page } from '../../assets/page';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private baseUrl = 'http://localhost:8080/api/categorias';

  constructor(private http: HttpClient) { }


  getCategorias(page: number, size: number): Observable<Page<Categoria>> {
    let params = new HttpParams().set('page', page.toString()).set('size', size.toString());
    return this.http.get<Page<Categoria>>(this.baseUrl, { params });
  }
}
