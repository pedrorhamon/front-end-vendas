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

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [authGuard] },
  // { path: '', redirectTo: '/categoria', pathMatch: 'full' },
  { path: 'categoria', component: CategoriaComponent, canActivate: [authGuard] },
  { path: 'categoria/edit/:id', component: CategoriaEditComponent, canActivate: [authGuard] },
  { path: 'categoria/delete/:id', component: CategoriaComponent, canActivate: [authGuard] },
  { path: 'categoria/new', component: CategoriaEditComponent, canActivate: [authGuard] },
  { path: 'usuario', component: UsuarioComponent, canActivate: [authGuard]},
  { path: 'usuario/edit/:id', component: UsuarioEditComponent, canActivate: [authGuard] },
  { path: 'usuario/new', component: UsuarioEditComponent, canActivate: [authGuard] },
  { path: 'pessoa', component: PessoaComponent, canActivate: [authGuard] },
  { path: 'pessoa/edit/:id', component: PessoaEditComponent, canActivate: [authGuard]},
  { path: 'pessoa/new', component: PessoaEditComponent, canActivate: [authGuard] },
  { path: 'lancamento', component: LacamentoComponent, canActivate: [authGuard] },
  { path: 'lancamento/edit/:id', component: LancamentoEditComponent, canActivate: [authGuard] },
  { path: 'lancamento/new', component: LancamentoEditComponent, canActivate: [authGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
