import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../login/login.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const loginService = inject(LoginService);
  const router = inject(Router);

  if (loginService.isAuthenticated()) {
    return true;
  } else {
    router.navigate(['/login']); // Redireciona para a página de login se não estiver autenticado
    return false;
  }
};
