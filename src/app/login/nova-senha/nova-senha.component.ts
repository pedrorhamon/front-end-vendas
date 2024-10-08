import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioService } from '../../usuario/usuario.service';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-nova-senha',
  templateUrl: './nova-senha.component.html',
  styleUrl: './nova-senha.component.css'
})
export class NovaSenhaComponent {

  senhaAtual: string = '';
  novaSenha: string = '';
  confirmarNovaSenha: string = '';

  constructor(private usuarioService: UsuarioService, private loginService: LoginService) {}

  onSubmit() {
    if (this.novaSenha !== this.confirmarNovaSenha) {
      alert('As senhas novas não coincidem');
      return;
    }

    this.usuarioService.alterarSenha(this.senhaAtual, this.novaSenha, this.confirmarNovaSenha)
      .subscribe({
        next: (response) => {
          alert('Senha alterada com sucesso!');
          // Aqui você pode redirecionar o usuário ou limpar o formulário, por exemplo
          this.loginService.logout();
        },
        error: (err) => {
          console.error('Erro ao alterar senha', err);
          alert('Erro ao alterar senha');
        }
      });
  }

}
