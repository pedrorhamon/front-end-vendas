// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { LoginService } from './login.service';
// import { Router } from '@angular/router';
// import { ConfirmationService, MessageService } from 'primeng/api';
// import { Credencias } from './model/credencias';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrl: './login.component.css'
// })
// export class LoginComponent implements OnInit {
//   loginForm: FormGroup;
//   errorMessage: string = '';
//   recaptchaToken: string | null = null;
//   loading: boolean = false
//   forgotPasswordForm: FormGroup;
//   displayForgotPasswordDialog: boolean = false;

//   constructor(private fb: FormBuilder, private usuarioService: LoginService, private router: Router, private messageService: MessageService
//     ,private confirmationService: ConfirmationService
//   ) {
//     this.loginForm = this.fb.group({
//       email: ['', [Validators.required, Validators.email]],
//       senha: ['', Validators.required]
//     });

//     this.forgotPasswordForm = this.fb.group({
//       email: ['', [Validators.required, Validators.email]]
//     });
//   }

//   ngOnInit(): void {}

//   // onSubmit() {
//   //   if (this.loginForm.valid && this.recaptchaToken) {
//   //     const credenciais: Credencias = {
//   //       email: this.loginForm.get('email')?.value,
//   //       senha: this.loginForm.get('senha')?.value,
//   //       recaptchaResponse: this.recaptchaToken
//   //     };
//   //     this.usuarioService.autenticar(credenciais).subscribe(
//   //       response => {
//   //         localStorage.setItem('token', response.token);
//   //         this.router.navigate(['/home']); // Redirecione para a página inicial ou outra página
//   //         this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Logado com sucesso' });
//   //       },
//   //       error => {
//   //         this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Email ou senha inválidos' });
//   //       }
//   //     );
//   //   } else {
//   //     this.messageService.add({ severity: 'warn', summary: 'Validation Error', detail: 'Por favor complete o reCAPTCHA' });
//   //   }
//   // }

//   onSubmit() {
//     const email = this.loginForm.get('email')?.value;
//     const senha = this.loginForm.get('senha')?.value;

//     if (!email || !senha) {
//       this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Usuário ou Senha incorreto' });
//       return;
//     }

//     if (this.loginForm.valid && this.recaptchaToken) {
//       this.loading = true; // Ativa o carregamento

//       const credenciais: Credencias = {
//         email: email,
//         senha: senha,
//         recaptchaResponse: this.recaptchaToken
//       };

//       this.usuarioService.autenticar(credenciais).subscribe(
//         response => {
//           localStorage.setItem('token', response.token);
//           this.router.navigate(['/home']); // Redirecione para a página inicial ou outra página
//           this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Logado com sucesso' });
//         },
//         error => {
//           this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Email ou senha inválidos' });
//         }
//       ).add(() => {
//         this.loading = false; // Desativa o carregamento após a resposta
//       });
//     } else {
//       this.messageService.add({ severity: 'warn', summary: 'Validation Error', detail: 'Por favor complete o reCAPTCHA' });
//     }
//   }


//   onRecaptchaResolved(token: string | null) {
//     this.recaptchaToken = token;
//   }

//   // onSubmit() {
//   //   if (this.loginForm.valid) {
//   //     const { email, senha } = this.loginForm.value;
//   //     this.usuarioService.autenticar(email, senha).subscribe(
//   //       response => {
//   //         localStorage.setItem('token', response.token);
//   //         this.router.navigate(['/categoria']); // Redirecione para a página inicial ou outra página
//   //         this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Logado com sucesso'});
//   //       },
//   //       error => {
//   //         this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Email ou senha inválidos' });
//   //       }
//   //     );
//   //   } else {
//   //     this.messageService.add({ severity: 'warn', summary: 'Validation Error', detail: 'Please fill in all fields correctly' });
//   //   }
//   // }

//   openForgotPasswordDialog() {
//     this.displayForgotPasswordDialog = true;
//   }

//   sendForgotPasswordRequest() {
//     const email = this.forgotPasswordForm.get('email')?.value;

//     if (this.forgotPasswordForm.valid) {
//       // Aqui você pode chamar um serviço para lidar com a solicitação de recuperação de senha
//       this.usuarioService.recuperarSenha(email).subscribe(
//         () => {
//           this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Instruções enviadas para o e-mail' });
//           this.displayForgotPasswordDialog = false; // Fechar o diálogo após o sucesso
//         },
//         error => {
//           this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Erro ao enviar instruções' });
//         }
//       );
//     }
//   }

//   onDialogHide() {
//     this.displayForgotPasswordDialog = false;
//   }
// }
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Credencias } from './model/credencias';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  recaptchaToken: string | null = null;
  loading: boolean = false;
  forgotPasswordForm: FormGroup;
  displayForgotPasswordDialog: boolean = false;

  constructor(
    private fb: FormBuilder,
    private usuarioService: LoginService,
    private router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', Validators.required]
    });

    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    const email = this.loginForm.get('email')?.value;
    const senha = this.loginForm.get('senha')?.value;

    if (!email || !senha) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Usuário ou Senha incorreto' });
      return;
    }

    if (this.loginForm.valid && this.recaptchaToken) {
      this.loading = true;

      const credenciais: Credencias = {
        email: email,
        senha: senha,
        recaptchaResponse: this.recaptchaToken
      };

      this.usuarioService.autenticar(credenciais).subscribe(
        response => {
          if (typeof window !== 'undefined') {
            // Verifica se o código está sendo executado no navegador
            localStorage.setItem('token', response.token);
            this.router.navigate(['/home']);
          }
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Logado com sucesso' });
        },
        error => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Email ou senha inválidos' });
        }
      ).add(() => {
        this.loading = false;
      });
    } else {
      this.messageService.add({ severity: 'warn', summary: 'Validation Error', detail: 'Por favor complete o reCAPTCHA' });
    }
  }


  // onSubmit() {
  //   const email = this.loginForm.get('email')?.value;
  //   const senha = this.loginForm.get('senha')?.value;

  //   if (!email || !senha) {
  //     this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Usuário ou Senha incorreto' });
  //     return;
  //   }

  //   if (this.loginForm.valid && this.recaptchaToken) {
  //     this.loading = true;

  //     const credenciais: Credencias = {
  //       email: email,
  //       senha: senha,
  //       recaptchaResponse: this.recaptchaToken
  //     };

  //     this.usuarioService.autenticar(credenciais).subscribe(
  //       response => {
  //         localStorage.setItem('token', response.token);
  //         this.router.navigate(['/home']);
  //         this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Logado com sucesso' });
  //       },
  //       error => {
  //         this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Email ou senha inválidos' });
  //       }
  //     ).add(() => {
  //       this.loading = false;
  //     });
  //   } else {
  //     this.messageService.add({ severity: 'warn', summary: 'Validation Error', detail: 'Por favor complete o reCAPTCHA' });
  //   }
  // }

  onRecaptchaResolved(token: string | null) {
    this.recaptchaToken = token;
  }

  openForgotPasswordDialog() {
    this.displayForgotPasswordDialog = true;
  }

  sendForgotPasswordRequest() {
    const email = this.forgotPasswordForm.get('email')?.value;

    if (this.forgotPasswordForm.valid) {
      this.loading = true;
      this.usuarioService.recuperarSenha(email).pipe(
        finalize(() => {
          this.loading = false;
      })
      ).subscribe(
        () => {
          this.loading = true;
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Instruções enviadas para o e-mail' });
          this.displayForgotPasswordDialog = false;
        },
        error => {
          const errorMessage = error?.error?.message || 'Erro ao enviar instruções';
                this.messageService.add({
                    severity: 'error',
                    summary: 'Erro',
                    detail: errorMessage
                });
                this.displayForgotPasswordDialog = false;
        }
      );
    }
  }

  onDialogHide() {
    this.displayForgotPasswordDialog = false;
  }
}
