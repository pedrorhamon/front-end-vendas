import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
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

  getCategoriaById(id: number): Observable<Categoria> {
    return this.http.get<Categoria>(`${this.baseUrl}/${id}`);
  }

  updateCategoria(id: number, categoria: FormData): Observable<Categoria> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}` // Adiciona o token de autenticação, se necessário
    });

    return this.http.put<Categoria>(`${this.baseUrl}/${id}`, categoria, { headers });
  }


  deleteCategoria(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`).pipe(
      catchError(error => {
        if (error.status === 400 && error.error.message.includes('exists')) {
          throw new Error('Categoria possui relacionamentos e não pode ser excluída.');
        }
        throw error;
      })
    );
  }

  createCategoria(categoria: FormData): Observable<Categoria> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}` // Adiciona o token de autenticação, se necessário
    });

    return this.http.post<Categoria>(this.baseUrl, categoria, { headers });
  }

  getCategoriaImage(id: number): Observable<Blob> {
    const url = `${this.baseUrl}/${id}/imagem`;
    return this.http.get(url, { responseType: 'blob' });
  }

  removeImage(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}/imagem`);
  }
}
