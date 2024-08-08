import { jwtDecode } from 'jwt-decode';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../login/login.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = async (route, state) => {
  const loginService = inject(LoginService);
  const router = inject(Router);

  const token = localStorage.getItem('token');
  const isAuthenticated = token && !isTokenExpired(token);

  if (isAuthenticated) {
    // Se necessário, você pode adicionar lógica para verificar permissões adicionais aqui
    const requiredRoles = route.data['roles'] as Array<string>;
    const userRoles = loginService.getRoles(); // Certifique-se de ter esse método implementado

    if (requiredRoles && !requiredRoles.some(role => userRoles.includes(role))) {
      router.navigate(['/access-denied']); // Redireciona para uma página de acesso negado se não tiver as permissões necessárias
      return false;
    }

    return true;
  } else {
    router.navigate(['/login']); // Redireciona para a página de login se não estiver autenticado
    return false;
  }
};

function isTokenExpired(token: string): boolean {
  try {
    const decodedToken: any = jwtDecode(token);
    const expTime = decodedToken.exp * 1000; // Convertendo de segundos para milissegundos
    const now = new Date().getTime();
    return now >= expTime;
  } catch (e) {
    console.error('Erro ao decodificar o token', e);
    return true; // Se houver um erro na decodificação, considere o token expirado
  }
}
