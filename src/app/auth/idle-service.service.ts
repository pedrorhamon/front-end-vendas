import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { LoginService } from '../login/login.service';

@Injectable({
  providedIn: 'root'
})
export class IdleService {
  private idleTimeout: number = 60000; // 1 minuto (em milissegundos)
  private timeoutId: any;

  constructor(
    private loginService: LoginService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.startMonitoring();
  }

  private startMonitoring(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Somente no navegador
      this.resetTimer();

      // Escuta eventos de atividade do usuário
      document.addEventListener('mousemove', () => this.resetTimer());
      document.addEventListener('keypress', () => this.resetTimer());
      document.addEventListener('click', () => this.resetTimer());
      document.addEventListener('scroll', () => this.resetTimer());
    }
  }

  private resetTimer(): void {
    clearTimeout(this.timeoutId);
    this.timeoutId = setTimeout(() => this.logout(), this.idleTimeout);
  }

  private logout(): void {
    this.loginService.logout().subscribe(() => {
      this.router.navigate(['/login']);
    });
  }
}
