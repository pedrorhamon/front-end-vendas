import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Credencias } from './model/credencias';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage: string = '';
  recaptchaToken: string | null = null;

  constructor(private fb: FormBuilder, private usuarioService: LoginService, private router: Router, private messageService: MessageService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.loginForm.valid && this.recaptchaToken) {
      const credenciais: Credencias = {
        email: this.loginForm.get('email')?.value,
        senha: this.loginForm.get('senha')?.value,
        recaptchaResponse: this.recaptchaToken
      };
      this.usuarioService.autenticar(credenciais).subscribe(
        response => {
          localStorage.setItem('token', response.token);
          this.router.navigate(['/home']); // Redirecione para a página inicial ou outra página
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Logado com sucesso' });
        },
        error => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Email ou senha inválidos' });
        }
      );
    } else {
      this.messageService.add({ severity: 'warn', summary: 'Validation Error', detail: 'Por favor complete o reCAPTCHA' });
    }
  }

  onRecaptchaResolved(token: string | null) {
    this.recaptchaToken = token;
  }

  // onSubmit() {
  //   if (this.loginForm.valid) {
  //     const { email, senha } = this.loginForm.value;
  //     this.usuarioService.autenticar(email, senha).subscribe(
  //       response => {
  //         localStorage.setItem('token', response.token);
  //         this.router.navigate(['/categoria']); // Redirecione para a página inicial ou outra página
  //         this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Logado com sucesso'});
  //       },
  //       error => {
  //         this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Email ou senha inválidos' });
  //       }
  //     );
  //   } else {
  //     this.messageService.add({ severity: 'warn', summary: 'Validation Error', detail: 'Please fill in all fields correctly' });
  //   }
  // }
}
