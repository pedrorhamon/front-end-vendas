import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Endereco } from './model/endereco';

@Injectable({
  providedIn: 'root'
})
export class ViaCepService {

  private viacepUrl = 'https://viacep.com.br/ws';

  constructor(private http: HttpClient) {}

  consultarCep(cep: string): Observable<Endereco> {
    return this.http.get<Endereco>(`${this.viacepUrl}/${cep}/json/`);
  }
}
