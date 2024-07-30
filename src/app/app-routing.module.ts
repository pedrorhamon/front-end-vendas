import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { CategoriaEditComponent } from './categoria/categoria-edit/categoria-edit.component';
import { HomeComponent } from './home/home.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { UsuarioEditComponent } from './usuario/usuario-edit/usuario-edit.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: '', redirectTo: '/categoria', pathMatch: 'full' },
  { path: 'categoria', component: CategoriaComponent },
  { path: 'categoria/edit/:id', component: CategoriaEditComponent },
  { path: 'categoria/delete/:id', component: CategoriaComponent },
  { path: 'categoria/new', component: CategoriaEditComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'usuario', component: UsuarioComponent },
  { path: 'usuario/edit/:id', component: UsuarioEditComponent },
  { path: 'usuario/new', component: UsuarioEditComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
