import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from './model/usuario';
import { Page } from '../../assets/page';
import { Observable } from 'rxjs';
import { UsuarioRequest } from './model/usuario.request';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private baseUrl = 'http://localhost:8080/api/usuarios';


  constructor(private http: HttpClient) { }

  listar(id?: number, descricao?: string, page: number = 0, size: number = 10): Observable<Page<Usuario>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    if (id) {
      params = params.set('id', id.toString());
    }
    if (descricao) {
      params = params.set('descricao', descricao);
    }

    return this.http.get<Page<Usuario>>(this.baseUrl, { params });
  }

  criar(usuarioRequest: UsuarioRequest): Observable<Usuario> {
    return this.http.post<Usuario>(this.baseUrl, usuarioRequest);
  }

  atualizar(id: number, usuarioRequest: UsuarioRequest): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.baseUrl}/${id}`, usuarioRequest);
  }

  desativar(id: number): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/desativar/${id}`, {});
  }

  deletar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
