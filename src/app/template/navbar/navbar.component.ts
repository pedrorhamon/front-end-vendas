import { Component } from '@angular/core';
import { LoginService } from '../../login/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  userName: string = 'Pedro Rhamon'; // Inicialize com o nome do usuário
  isAuthenticated: boolean = false; // Controle se o usuário está autenticado

  constructor(private usuarioService: LoginService, private router: Router) {
    // this.checkAuthentication();
  }

  logout() {
    this.usuarioService.logout().subscribe(
      () => {
        console.log('Logout realizado com sucesso');
        this.router.navigate(['']);
      },
      error => {
        console.error('Erro ao realizar logout', error);
      }
    );
  }

  // checkAuthentication() {
  //   this.isAuthenticated = !!this.usuarioService.getToken(); // Verifique se o token está presente
  //   if (this.isAuthenticated) {
  //     // Se necessário, recupere o nome do usuário do token ou de um serviço
  //     this.userName = this.getUserNameFromToken(); // Método fictício para obter o nome
  //   }
  // }
}
