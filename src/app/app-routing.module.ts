import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { CategoriaEditComponent } from './categoria/categoria-edit/categoria-edit.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: '', redirectTo: '/categoria', pathMatch: 'full' },
  { path: 'categoria', component: CategoriaComponent },
  { path: 'categoria/edit/:id', component: CategoriaEditComponent },
  { path: 'categoria/delete/:id', component: CategoriaComponent },
  { path: 'categoria/new', component: CategoriaEditComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
