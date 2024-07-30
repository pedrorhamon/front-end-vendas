import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Permissao } from './model/permission';
import { Page } from '../../assets/page';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  private baseUrl = 'http://localhost:8080/api/permissoes';


  constructor(private http: HttpClient) { }

  listarPermissoes(page: number, size: number): Observable<Page<Permissao>> {
    let params = new HttpParams().set('page', page.toString()).set('size', size.toString());
    return this.http.get<Page<Permissao>>(this.baseUrl, { params });
  }
}
