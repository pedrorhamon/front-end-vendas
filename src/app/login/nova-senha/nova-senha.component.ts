import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-nova-senha',
  templateUrl: './nova-senha.component.html',
  styleUrl: './nova-senha.component.css'
})
export class NovaSenhaComponent {

  senhaAtual!: string;
  novaSenha!: string;
  confirmarNovaSenha!: string;

  constructor(private http: HttpClient) {}

  // onSubmit(form) {
  //   if (form.valid) {
  //     const payload = {
  //       senhaAtual: this.senhaAtual,
  //       novaSenha: this.novaSenha,
  //       confirmarNovaSenha: this.confirmarNovaSenha
  //     };

  //     this.http.post('/api/alterar-senha', payload)
  //       .subscribe(
  //         response => console.log('Senha alterada com sucesso'),
  //         error => console.error('Erro ao alterar senha', error)
  //       );
  //   }
  // }

}
