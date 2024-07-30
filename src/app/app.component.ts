import { Component } from '@angular/core';
import { LoginService } from './login/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'vendas-front';

  constructor(private usuarioService: LoginService, private router: Router) {
    // this.checkAuthentication();
  }

  isAuthenticated(): boolean {
    return this.usuarioService.isAuthenticated();
  }
}
