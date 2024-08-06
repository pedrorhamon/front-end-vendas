import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../login/login.service';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{
  userName: string | null = null;

  // Inicialize com o nome do usuário

  constructor(private usuarioService: LoginService, private router: Router) {
    // this.checkAuthentication();
  }

  ngOnInit(): void {
    // const token = 'eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE3MjI5ODYyOTYsInN1YiI6InBlZHJvcmhhbW9uMTZAZ21haWwuY29tIiwidXNlcmlkIjoxLCJuYW1lIjoiUGVkcm8gUmhhbW9uIiwicm9sZXMiOlsiQURNSU5fUFJJVklMRUdFIl0sImhvcmFFeHBpcmFjYW8iOiIyMDoxOCJ9.AZNuvD1H8Oq6wxv26qjmv0jSfION0IFZ-bVaUz987Fk';
    // const decodedToken: any = jwtDecode(token);
    // console.log(decodedToken);
    this.usuarioService.userName$.subscribe(name => {
      this.userName = name;
    });
  }

  logout() {
    this.usuarioService.logout().subscribe(
      () => {
        console.log('Logout realizado com sucesso');
        this.router.navigate(['/login']);
        // Redirecionar para a página de login ou qualquer outra lógica
      },
      error => {
        console.error('Erro ao realizar logout', error);
      }
    );
  }

  isAuthenticated(): boolean {
    return this.usuarioService.isAuthenticated();
  }
}
