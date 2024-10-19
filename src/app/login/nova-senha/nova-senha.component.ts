import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';

import { UsuarioService } from '../../usuario/usuario.service';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nova-senha',
  templateUrl: './nova-senha.component.html',
  styleUrl: './nova-senha.component.css'
})
export class NovaSenhaComponent {

  senhaAtual: string = '';
  novaSenha: string = '';
  confirmarNovaSenha: string = '';

  criterios = {
    minLength: false,
    upperCase: false,
    lowerCase: false,
    digit: false,
    specialChar: false
  };

  constructor(private loginService: LoginService, private messageService: MessageService, private router: Router) {}

  onSubmit() {
    if (this.novaSenha !== this.confirmarNovaSenha) {
      this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'As senhas novas não coincidem' });
      return;
    }

    if (!this.isSenhaValida()) {
      this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'A nova senha não atende aos critérios de segurança.' });
      return;
    }

    this.loginService.alterarSenha(this.senhaAtual, this.novaSenha, this.confirmarNovaSenha)
      .subscribe({
        next: (response) => {
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Senha alterada com sucesso!' });
          this.loginService.logout().subscribe({
            next: () => {
              this.router.navigate(['/login']);
            },
            error: (err) => {
              this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao realizar logout' });
            }
          });
        },
        error: (err) => {
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao alterar senha' });
        }
      });
  }

  validarNovaSenha() {
    const senha = this.novaSenha;

    this.criterios.minLength = senha.length >= 8;
    this.criterios.upperCase = /[A-Z]/.test(senha);
    this.criterios.lowerCase = /[a-z]/.test(senha);
    this.criterios.digit = /\d/.test(senha);
    this.criterios.specialChar = /[@$!%*?&]/.test(senha);
  }

  isSenhaValida() {
    return Object.values(this.criterios).every(criterio => criterio === true);
  }
}
