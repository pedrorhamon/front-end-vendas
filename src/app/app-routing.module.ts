import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { CategoriaEditComponent } from './categoria/categoria-edit/categoria-edit.component';
import { HomeComponent } from './home/home.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { UsuarioEditComponent } from './usuario/usuario-edit/usuario-edit.component';
import { PessoaComponent } from './pessoa/pessoa.component';
import { PessoaEditComponent } from './pessoa/pessoa-edit/pessoa-edit.component';
import { LacamentoComponent } from './lacamento/lacamento.component';
import { LancamentoEditComponent } from './lacamento/lancamento-edit/lancamento-edit.component';
import { authGuard } from './auth/auth.guard';
import { AcessDeniedComponent } from './acess-denied/acess-denied.component';
import { NovaSenhaComponent } from './login/nova-senha/nova-senha.component';
import { PermissaoComponent } from './permissao/permissao.component';
import { PermissaoEditComponent } from './permissao/permissao-edit/permissao-edit.component';
import { SubPermissaoComponent } from './permissao/sub-permissao/sub-permissao.component';
import { SubPermissaoEditComponent } from './permissao/sub-permissao/sub-permissao-edit/sub-permissao-edit.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [authGuard] },
  // { path: 'categoria', component: CategoriaComponent, canActivate: [authGuard], data: { roles: ['ADMIN_PRIVILEGE'] } },
  { path: 'categoria', component: CategoriaComponent, canActivate: [authGuard], data: { roles: ['ADMIN_PRIVILEGE'] } },
  { path: 'categoria/edit/:id', component: CategoriaEditComponent, canActivate: [authGuard], data: { roles: ['ADMIN_PRIVILEGE'] }  },
  { path: 'categoria/delete/:id', component: CategoriaComponent, canActivate: [authGuard], data: { roles: ['ADMIN_PRIVILEGE'] }  },
  { path: 'categoria/new', component: CategoriaEditComponent, canActivate: [authGuard], data: { roles: ['ADMIN_PRIVILEGE'] }  },
  { path: 'usuario', component: UsuarioComponent, canActivate: [authGuard], data: { roles: ['ADMIN_PRIVILEGE'] }},
  { path: 'usuario/edit/:id', component: UsuarioEditComponent, canActivate: [authGuard], data: { roles: ['ADMIN_PRIVILEGE'] }},
  { path: 'usuario/new', component: UsuarioEditComponent, canActivate: [authGuard], data: { roles: ['ADMIN_PRIVILEGE'] }},
  { path: 'pessoa', component: PessoaComponent, canActivate: [authGuard], data: { roles: ['ADMIN_PRIVILEGE'] }},
  { path: 'pessoa/edit/:id', component: PessoaEditComponent, canActivate: [authGuard], data: { roles: ['ADMIN_PRIVILEGE'] }},
  { path: 'pessoa/new', component: PessoaEditComponent, canActivate: [authGuard], data: { roles: ['ADMIN_PRIVILEGE'] }},
  { path: 'lancamento', component: LacamentoComponent, canActivate: [authGuard], data: { roles: ['ADMIN_PRIVILEGE'] } },
  { path: 'lancamento/edit/:id', component: LancamentoEditComponent, canActivate: [authGuard], data: { roles: ['ADMIN_PRIVILEGE'] }},
  { path: 'lancamento/new', component: LancamentoEditComponent, canActivate: [authGuard], data: { roles: ['ADMIN_PRIVILEGE'] }},
  { path: 'esqueci-senha', component: NovaSenhaComponent},
  { path: 'alterar-senha', component: NovaSenhaComponent, canActivate: [authGuard], data: { roles: ['ADMIN_PRIVILEGE'] }},
  { path: 'permissao', component: PermissaoComponent, canActivate: [authGuard], data: { roles: ['ADMIN_PRIVILEGE'] } },
  { path: 'permissao/new', component: PermissaoEditComponent, canActivate: [authGuard], data: { roles: ['ADMIN_PRIVILEGE'] } },
  { path: 'permissao/edit/:id', component: PermissaoEditComponent, canActivate: [authGuard], data: { roles: ['ADMIN_PRIVILEGE'] } },
  { path: 'sub-permissao', component: SubPermissaoComponent, canActivate: [authGuard], data: { roles: ['ADMIN_PRIVILEGE'] } },
  { path: 'sub-permissao/new', component: SubPermissaoEditComponent, canActivate: [authGuard], data: { roles: ['ADMIN_PRIVILEGE'] } },
  { path: 'sub-permissao/edit/:id', component: SubPermissaoEditComponent, canActivate: [authGuard], data: { roles: ['ADMIN_PRIVILEGE'] } },
  { path: 'access-denied', component: AcessDeniedComponent }, // Corrigido: sem a barra inicial
  { path: '**', redirectTo: 'login' }, // Rota de fallback para qualquer caminho desconhecido
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
