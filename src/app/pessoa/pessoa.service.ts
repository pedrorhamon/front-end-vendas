import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pessoa } from './model/pessoa';
import { Observable } from 'rxjs';
import { Page } from '../../assets/page';

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  private baseUrl = 'http://localhost:8080/api/pessoas';


  constructor(private http: HttpClient) {}

  listarPessoa(id?: number, name?: string, page: number = 0, size: number = 10): Observable<Page<Pessoa>> {
    let params: any = {
      page: page.toString(),
      size: size.toString()
    };

    if (id !== undefined) {
      params.id = id.toString();
    }

    if (name !== undefined) {
      params.name = name;
    }

    return this.http.get<Page<Pessoa>>(this.baseUrl, { params });
  }

  desativar(id: number): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/desativar/${id}`, {});
  }

  deletar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

}
