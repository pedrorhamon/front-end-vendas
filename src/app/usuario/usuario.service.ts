import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from './model/usuario';
import { Page } from '../../assets/page';
import { map, Observable } from 'rxjs';
import { UsuarioRequest } from './model/usuario.request';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private baseUrl = 'http://localhost:8080/api/usuarios';


  constructor(private http: HttpClient) { }

  getUsuarios(page: number, size: number): Observable<Page<Usuario>> {
    let params = new HttpParams().set('page', page.toString()).set('size', size.toString());
    return this.http.get<Page<Usuario>>(this.baseUrl, { params });
  }

  getUsuariosById(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.baseUrl}/${id}`);
  }

  // listar(id?: number, descricao?: string, page: number = 0, size: number = 10): Observable<Page<Usuario>> {
  //   let params = new HttpParams();
  //   if (id) params = params.set('id', id.toString());
  //   if (descricao) params = params.set('descricao', descricao);
  //   if (page !== undefined) params = params.set('page', page.toString());
  //   if (size !== undefined) params = params.set('size', size.toString());

  //   return this.http.get<Page<Usuario>>(this.baseUrl, { params }).pipe(
  //     map((response: Page<Usuario>) => {
  //       response.content.forEach(usuario => {
  //         if (usuario.createdAt) {
  //           usuario.createdAt = this.parseDate(usuario.createdAt);
  //         }
  //         if (usuario.updatedAt) {
  //           usuario.updatedAt = this.parseDate(usuario.updatedAt);
  //         }
  //       });
  //       return response;
  //     })
  //   );
  // }

  private parseDate(dateString: string): string {
    const parts = dateString.split(/[\s/:]/);
    const day = +parts[0];
    const month = +parts[1] - 1; // Months are zero-indexed in JS Date
    const year = +parts[2];
    const hour = +parts[3];
    const minute = +parts[4];
    return new Date(year, month, day, hour, minute).toISOString();
  }

  criar(usuarioRequest: UsuarioRequest): Observable<Usuario> {
    return this.http.post<Usuario>(this.baseUrl, usuarioRequest);
  }

  atualizar(id: number, usuarioRequest: UsuarioRequest): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.baseUrl}/${id}`, usuarioRequest);
  }

  desativar(gestorId: number, usuarioId: number): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.baseUrl}/${gestorId}/inativar/${usuarioId}`, {});
  }

  deletar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
