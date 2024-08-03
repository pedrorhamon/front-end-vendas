import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Lancamento } from './model/lancamento';
import { Page } from '../../assets/page';
import { LancamentoRequest } from './model/lancamento.request';

@Injectable({
  providedIn: 'root'
})
export class LancamentoService {

  private baseUrl = 'http://localhost:8080/api/lancamentos';

  constructor(private http: HttpClient) { }

  listar(id?: number, descricao?: string, page: number = 0, size: number = 10): Observable<Page<Lancamento>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    if (id) {
      params = params.set('id', id.toString());
    }

    if (descricao) {
      params = params.set('descricao', descricao);
    }

    return this.http.get<Page<Lancamento>>(this.baseUrl, { params });
  }

  getLancamentoById(id: number): Observable<Lancamento> {
    return this.http.get<Lancamento>(`${this.baseUrl}/${id}`);
  }

  listarPorDatas(dataVencimentoDe?: string, dataVencimentoAte?: string, page: number = 0, size: number = 10): Observable<Page<Lancamento>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    if (dataVencimentoDe) {
      params = params.set('dataVencimentoDe', dataVencimentoDe);
    }

    if (dataVencimentoAte) {
      params = params.set('dataVencimentoAte', dataVencimentoAte);
    }

    return this.http.get<Page<Lancamento>>(`${this.baseUrl}/datas`, { params });
  }

  criar(lancamento: LancamentoRequest): Observable<Lancamento> {
    return this.http.post<Lancamento>(this.baseUrl, lancamento);
  }

  atualizar(id: number, lancamento: LancamentoRequest): Observable<Lancamento> {
    return this.http.put<Lancamento>(`${this.baseUrl}/${id}`, lancamento);
  }

  deletar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  exportarParaExcel(page: number = 0, size: number = 10): Observable<Blob> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get(`${this.baseUrl}/exportar`, {
      params,
      responseType: 'blob',
      headers: new HttpHeaders().set('Accept', 'application/octet-stream')
    });
  }
}
