import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Credencias } from './model/credencias';
import { BehaviorSubject, catchError, map, Observable, tap, throwError } from 'rxjs';
import { Token } from './model/token';
import { jwtDecode } from 'jwt-decode';
import { Usuario } from './model/usuario';
import { JwtHelperService } from '@auth0/angular-jwt';



@Injectable({
  providedIn: 'root'
})
export class LoginService {


  private baseUrl = 'http://localhost:8080/api/usuarios';

  private userNameSubject = new BehaviorSubject<string | null>(null);
  userName$ = this.userNameSubject.asObservable();
  // private jwtHelper = new JwtHelperService();
  private roles: string[] = [];

  constructor(private http: HttpClient) { }

  isClient(): boolean {
    return typeof window !== 'undefined';
  }

  autenticar(credenciais: Credencias): Observable<Token> {
    return this.http.post<Token>(`${this.baseUrl}/autenticar`, credenciais).pipe(
      tap(response => {
        console.log(response.nome);
        if (this.isClient()) {
          localStorage.setItem('token', response.token);
          this.setUserName();
        }
      }),
      catchError(error => {
        // Trate o erro aqui, se necessário
        return throwError(error);
      })
    );
  }


  // autenticar(credenciais: Credencias): Observable<Token> {
  //   return this.http.post<Token>(`${this.baseUrl}/autenticar`, credenciais)
  //     .pipe(
  //       tap(response => {
  //         console.log(response.nome);

  //         localStorage.setItem('token', response.token);
  //         this.setUserName();

  //       }),
  //       catchError(error => {
  //         // Trate o erro aqui, se necessário
  //         return throwError(error);
  //       })
  //     );
  // }

  logout(): Observable<void> {
    const token = this.isClient() ? localStorage.getItem('token') : null;
    return this.http.post<void>(`${this.baseUrl}/logout`, {}, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    }).pipe(
      tap(() => {
        if (this.isClient()) {
          localStorage.removeItem('token');
        }
      })
    );
  }

//   logout(): Observable<void> {
//     // Obter o token armazenado
//     const token = localStorage.getItem('token');
//     // Enviar o token no cabeçalho Authorization
//     return this.http.post<void>(`${this.baseUrl}/logout`, {}, {
//         headers: new HttpHeaders({
//             'Authorization': `Bearer ${token}`
//         })
//     }).pipe(
//         tap(() => {
//             // Remover o token após o logout
//             localStorage.removeItem('token');
//         })
//     );
// }
// isAuthenticated(): boolean {
//   // Verifica se o código está sendo executado no contexto do navegador
//   if (typeof window !== 'undefined') {
//     return !!localStorage.getItem('token');
//   }
//   return false;
// }

isAuthenticated(): boolean {
  if (this.isClient()) {
    return !!localStorage.getItem('token');
  }
  return false;
}

// setUserName(): void {
//   const token = localStorage.getItem('token');
//   if (token) {
//     try {
//       const decodedToken: any = jwtDecode(token);
//       // console.log('Decoded Token:', decodedToken); // Para depuração, verifique o conteúdo do payload
//       this.userNameSubject.next(decodedToken.name || null); // Use 'name' em vez de 'nome'
//     } catch (e) {
//       console.error('Erro ao decodificar o token', e);
//       this.userNameSubject.next(null);
//     }
//   }
// }

// getRoles(): string[] {
//   const token = localStorage.getItem('token');
//   if (token) {
//     const decodedToken: any = jwtDecode(token);

//     return decodedToken.roles || [];
//   }
//   return [];
// }

// getUserIdFromToken(): string | null {
//   const token = localStorage.getItem('token');
//   if (token) {
//     try {
//       const decodedToken: any = jwtDecode(token);
//       return decodedToken.sub || null; // 'sub' pode ser o campo do ID do usuário no token
//     } catch (e) {
//       console.error('Erro ao decodificar o token', e);
//       return null;
//     }
//   }
//   return null;
// }

setUserName(): void {
  if (this.isClient()) {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        this.userNameSubject.next(decodedToken.name || null);
      } catch (e) {
        console.error('Erro ao decodificar o token', e);
        this.userNameSubject.next(null);
      }
    }
  }
}

getRoles(): string[] {
  if (this.isClient()) {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken: any = jwtDecode(token);
      return decodedToken.roles || [];
    }
  }
  return [];
}

getUserIdFromToken(): string | null {
  if (this.isClient()) {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        return decodedToken.sub || null;
      } catch (e) {
        console.error('Erro ao decodificar o token', e);
        return null;
      }
    }
  }
  return null;
}


hasRole(role: string): boolean {
  return this.roles.includes(role);
}

// recuperarSenha(email: string): Observable<void> {
//   const params = new HttpParams().set('email', email);

//   return this.http.post<void>(`${this.baseUrl}/esquecer-senha`, null, { params })
//     .pipe(
//       catchError(this.handleError)
//     );
// }


recuperarSenha(email: string): Observable<string> {
  return this.http.post<string>(`${this.baseUrl}/esquecer-senha`, null, {
    params: { email }
  });
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

private handleError(error: HttpErrorResponse) {
  // Log do erro para depuração
  console.error('Ocorreu um erro:', error);

  // Criar uma mensagem de erro amigável para o usuário
  let errorMessage = 'Ocorreu um erro inesperado. Por favor, tente novamente mais tarde.';

  if (error.error instanceof ErrorEvent) {
    // Erro do lado do cliente
    errorMessage = `Erro: ${error.error.message}`;
  } else {
    // Erro do lado do servidor
    errorMessage = `Código do erro: ${error.status}\nMensagem: ${error.message}`;
  }

  return throwError(() => new Error(errorMessage));
}

alterarSenha(senhaAtual: string, novaSenha: string, confirmarNovaSenha: string): Observable<any> {
  const token = this.isClient() ? localStorage.getItem('token') : null;

  if (!token) {
    throw new Error('Token de autenticação não encontrado');
  }

  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

  const payload = {
    senhaAtual: senhaAtual,
    novaSenha: novaSenha,
    confirmarNovaSenha: confirmarNovaSenha
  };

  // Defina responseType como 'text' para evitar que o Angular tente parsear a resposta como JSON
  return this.http.put(`${this.baseUrl}/alterar-senha`, payload, { headers, responseType: 'text' })
    .pipe(
      tap(() => {
        console.log('Senha alterada com sucesso');
      }),
      catchError(this.handleError)
    );
}


}

