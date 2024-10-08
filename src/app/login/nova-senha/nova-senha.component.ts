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

  constructor(private loginService: LoginService,  private messageService: MessageService,  private router: Router) {}

  onSubmit() {
    if (this.novaSenha !== this.confirmarNovaSenha) {
      this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'As senhas novas não coincidem' });
      return;
    }

    this.loginService.alterarSenha(this.senhaAtual, this.novaSenha, this.confirmarNovaSenha)
      .subscribe({
        next: (response) => {
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Senha alterada com sucesso!' });

          // Chama o logout e redireciona para a página de login após o logout ser bem-sucedido
          this.loginService.logout().subscribe({
            next: () => {
              // Redireciona o usuário para a página de login
              this.router.navigate(['/login']);
            },
            error: (err) => {
              console.error('Erro ao realizar logout', err);
              this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao realizar logout' });
            }
          });
        },
        error: (err) => {
          console.error('Erro ao alterar senha', err);
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao alterar senha' });
        }
      });
  }
}
