import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RecaptchaFormsModule, RecaptchaModule } from 'ng-recaptcha';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { SidebarModule } from 'primeng/sidebar';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategoriaEditComponent } from './categoria/categoria-edit/categoria-edit.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { LoginComponent } from './login/login.component';
import { FooterComponent } from './template/footer/footer.component';
import { NavbarComponent } from './template/navbar/navbar.component';
import { SidebarComponent } from './template/sidebar/sidebar.component';
import { MenubarModule } from 'primeng/menubar';
import { HomeComponent } from './home/home.component';
import { ChartModule } from 'primeng/chart';
import { UsuarioComponent } from './usuario/usuario.component';
import { UsuarioEditComponent } from './usuario/usuario-edit/usuario-edit.component';

import { MultiSelectModule } from 'primeng/multiselect';







@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CategoriaComponent,
    CategoriaEditComponent,
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
    HomeComponent,
    UsuarioComponent,
    UsuarioEditComponent
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
    BrowserAnimationsModule,
    ConfirmDialogModule,
    MessagesModule,
    MessageModule,
    ToastModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    SidebarModule,
    MenubarModule,
    ChartModule,
    MultiSelectModule

  ],
  providers: [
    ConfirmationService,
    MessageService,
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
