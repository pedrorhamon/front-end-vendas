import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pessoa } from './model/pessoa';
import { map, Observable } from 'rxjs';
import { Page } from '../../assets/page';
import { PessoaRequest } from './model/pessoa.request';

@Injectable({
  providedIn: 'root'
})
export class PessoaService {


  private baseUrl = 'http://localhost:8080/api/pessoas';


  constructor(private http: HttpClient) {}

  listarPessoa(id?: number, name?: string, page: number = 0, size: number = 10): Observable<Page<Pessoa>> {

    let params = new HttpParams()
    .set('page', page.toString())
    .set('size', size.toString());

    if (id !== undefined) {
      params = params.set('id', id.toString());
    }

    if (name !== undefined) {
      params = params.set('name', name);
    }

    return this.http.get<Page<Pessoa>>(this.baseUrl, { params });
  }

  criar(pessoaRequest: PessoaRequest): Observable<Pessoa> {
    return this.http.post<Pessoa>(this.baseUrl, pessoaRequest);
  }

  atualizar(id: number, pessoaRequest: PessoaRequest): Observable<Pessoa> {
    return this.http.put<Pessoa>(`${this.baseUrl}/${id}`, pessoaRequest);
  }

  desativar(id: number): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/desativar/${id}`, {});
  }

  deletar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  getPessoaById(id: number): Observable<Pessoa> {
    return this.http.get<Pessoa>(`${this.baseUrl}/${id}`);
  }

  geocodeAddress(address: string): Observable<[number, number]> {
    const params = new HttpParams().set('address', address);
    return this.http.get<any>(`${this.baseUrl}/coordenadas`, { params }).pipe(
      map((response) => [response.latitude, response.longitude] as [number, number])
    );
  }
}
