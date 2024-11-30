import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Permissao } from './model/permissao';
import { Observable } from 'rxjs';
import { Page } from '../../assets/page';

@Injectable({
  providedIn: 'root'
})
export class PermissaoService {

  private baseUrl = 'http://localhost:8080/api/permissoes';

  constructor(private http: HttpClient) { }


  listarPessoa(id?: number, name?: string, page: number = 0, size: number = 10): Observable<Page<Permissao>> {
    // let params: any = {
    //   page: page.toString(),
    //   size: size.toString()
    // };
    let params = new HttpParams()
    .set('page', page.toString())
    .set('size', size.toString());

    if (id !== undefined) {
      params = params.set('id', id.toString());
    }

    if (name !== undefined) {
      params = params.set('name', name);
    }

    // if (id !== undefined) {
    //   params.id = id.toString();
    // }

    // if (name !== undefined) {
    //   params.name = name;
    // }

    return this.http.get<Page<Permissao>>(this.baseUrl, { params });
  }

  criar(permissao: Permissao): Observable<Permissao> {
    return this.http.post<Permissao>(this.baseUrl, permissao);
  }
}
