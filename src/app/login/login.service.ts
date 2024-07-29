import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Credencias } from './model/credencias';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { Token } from './model/token';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private baseUrl = 'http://localhost:8080/api/usuarios';

  private isLoggedIn: boolean = false;
  private userName: string = 'Pedro Rhamon';


  constructor(private http: HttpClient) { }

  autenticar(credenciais: Credencias): Observable<Token> {
    return this.http.post<Token>(`${this.baseUrl}/autenticar`, credenciais)
      .pipe(
        tap(response => {

          localStorage.setItem('token', response.token);
        }),
        catchError(error => {
          // Trate o erro aqui, se necessário
          return throwError(error);
        })
      );
  }

  logout(): Observable<void> {
    // Obter o token armazenado
    const token = localStorage.getItem('token');
    // Enviar o token no cabeçalho Authorization
    return this.http.post<void>(`${this.baseUrl}/logout`, {}, {
        headers: new HttpHeaders({
            'Authorization': `Bearer ${token}`
        })
    }).pipe(
        tap(() => {
            // Remover o token após o logout
            localStorage.removeItem('token');
        })
    );
}

}
