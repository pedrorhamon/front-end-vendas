import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Credencias } from './model/credencias';
import { catchError, map, Observable } from 'rxjs';
import { Token } from './model/token';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private baseUrl = 'http://localhost:8080/api/usuarios';

  constructor(private http: HttpClient) { }

  autenticar(credencias: Credencias): Observable<any> {
    return this.http.post(`${this.baseUrl}/autenticar`, credencias);
  }
}
