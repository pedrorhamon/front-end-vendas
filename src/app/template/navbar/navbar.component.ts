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

  isAuthenticated(): boolean {
    return this.usuarioService.isAuthenticated();
  }
}
