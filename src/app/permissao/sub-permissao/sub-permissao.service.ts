import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SubPermissao } from '../model/subPermissao';
import { Page } from '../../../assets/page';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubPermissaoService {

  private baseUrl = 'http://localhost:8080/api/sub-permissoes';

  constructor(private http: HttpClient) { }


  listarPessoa(id?: number, name?: string, page: number = 0, size: number = 10): Observable<Page<SubPermissao>> {
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
      params = params.set('nome', name);
    }

    // if (id !== undefined) {
    //   params.id = id.toString();
    // }

    // if (name !== undefined) {
    //   params.name = name;
    // }

    return this.http.get<Page<SubPermissao>>(this.baseUrl, { params });
  }

  listarTodas(): Observable<SubPermissao[]> {
    return this.http.get<SubPermissao[]>(`${this.baseUrl}/listar`);
  }
}
