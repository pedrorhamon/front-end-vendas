import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Credencias } from './model/credencias';
import { BehaviorSubject, catchError, map, Observable, tap, throwError } from 'rxjs';
import { Token } from './model/token';
import { jwtDecode } from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private baseUrl = 'http://localhost:8080/api/usuarios';

  private userNameSubject = new BehaviorSubject<string | null>(null);
  userName$ = this.userNameSubject.asObservable();


  constructor(private http: HttpClient) { }

  autenticar(credenciais: Credencias): Observable<Token> {
    return this.http.post<Token>(`${this.baseUrl}/autenticar`, credenciais)
      .pipe(
        tap(response => {
          console.log(response.nome);

          localStorage.setItem('token', response.token);
          this.setUserName();

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
isAuthenticated(): boolean {
  // Verifica se o código está sendo executado no contexto do navegador
  if (typeof window !== 'undefined') {
    return !!localStorage.getItem('token');
  }
  return false;
}

private setUserName(): void {
  const token = localStorage.getItem('token');
  if (token) {
    try {
      const decodedToken: any = jwtDecode(token);
      console.log('Decoded Token:', decodedToken); // Para depuração, verifique o conteúdo do payload
      this.userNameSubject.next(decodedToken.name || null); // Use 'name' em vez de 'nome'
    } catch (e) {
      console.error('Erro ao decodificar o token', e);
      this.userNameSubject.next(null);
    }
  }
}



}
