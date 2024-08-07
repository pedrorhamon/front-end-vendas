import { Component, OnInit } from '@angular/core';
import { LoginService } from './login/login.service';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'vendas-front';

  constructor(private usuarioService: LoginService, private router: Router) {
    // this.checkAuthentication();
  }

  ngOnInit(): void {
    this.usuarioService.checkTokenValidity(); // Opcional: verificar validade do token periodicamente
  }

  isAuthenticated(): boolean {
    return this.usuarioService.isAuthenticated();
  }
}
