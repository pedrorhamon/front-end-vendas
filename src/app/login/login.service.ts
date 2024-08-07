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

setUserName(): void {
  const token = localStorage.getItem('token');
  if (token) {
    try {
      const decodedToken: any = jwtDecode(token);
      // console.log('Decoded Token:', decodedToken); // Para depuração, verifique o conteúdo do payload
      this.userNameSubject.next(decodedToken.name || null); // Use 'name' em vez de 'nome'
    } catch (e) {
      console.error('Erro ao decodificar o token', e);
      this.userNameSubject.next(null);
    }
  }
}

// setupAutoLogout(token: string): void {
//   const decodedToken: any = jwtDecode(token);
//   const expTime = decodedToken.exp * 1000; // Convertendo de segundos para milissegundos
//   const now = new Date().getTime();
//   const timeout = expTime - now;

//   if (timeout > 0) {
//     setTimeout(() => {
//       this.logout();
//     }, timeout);
//   }
// }

// checkTokenValidity(): void {
//   setInterval(() => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       const decodedToken: any = jwtDecode(token);
//       const now = new Date().getTime();
//       const expTime = decodedToken.exp * 1000;

//       if (now >= expTime) {
//         this.logout();
//       }
//     }
//   }, 60000); // Checa a cada 60 segundos
}

