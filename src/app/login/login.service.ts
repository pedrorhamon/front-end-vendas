import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Credencias } from './model/credencias';
import { catchError, map, Observable } from 'rxjs';
import { Token } from './model/token';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private baseUrl = 'http://localhost:8080/api/usuarios/autenticar';

  constructor(private http: HttpClient) { }

  autenticar(email: string, senha: string): Observable<any> {
    const credentials = { email, senha };
    return this.http.post(this.baseUrl, credentials);
  }
}
