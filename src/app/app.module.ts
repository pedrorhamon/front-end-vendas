import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { CheckboxModule } from 'primeng/checkbox';
import { ReactiveFormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { CategoriaComponent } from './categoria/categoria.component';
import { HttpClientModule } from '@angular/common/http';
import { TableModule } from 'primeng/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CategoriaEditComponent } from './app/categoria/categoria-edit/categoria-edit.component';






@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CategoriaComponent,
    CategoriaEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CheckboxModule,
    ReactiveFormsModule,
    CardModule,
    ButtonModule,
    InputTextModule,
    FloatLabelModule,
    HttpClientModule,
    TableModule,
    BrowserAnimationsModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
