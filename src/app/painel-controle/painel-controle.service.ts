import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PainelControleService {

  private baseUrl = 'http://localhost:8080/api/configuracoes';

  constructor(
    private http: HttpClient
  ) { }

  obterConfiguracoes(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  salvarConfiguracoes(configuracoes: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, configuracoes);
  }
}
