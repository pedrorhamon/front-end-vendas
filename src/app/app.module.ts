import { DecimalPipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RecaptchaFormsModule, RecaptchaModule } from 'ng-recaptcha';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';
import { CheckboxModule } from 'primeng/checkbox';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MenubarModule } from 'primeng/menubar';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { MultiSelectModule } from 'primeng/multiselect';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { SidebarModule } from 'primeng/sidebar';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { PickListModule } from 'primeng/picklist';


import { AcessDeniedComponent } from './acess-denied/acess-denied.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategoriaEditComponent } from './categoria/categoria-edit/categoria-edit.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { HomeComponent } from './home/home.component';
import { LacamentoComponent } from './lacamento/lacamento.component';
import { LancamentoEditComponent } from './lacamento/lancamento-edit/lancamento-edit.component';
import { LoginComponent } from './login/login.component';
import { NovaSenhaComponent } from './login/nova-senha/nova-senha.component';
import { PermissaoEditComponent } from './permissao/permissao-edit/permissao-edit.component';
import { PermissaoComponent } from './permissao/permissao.component';
import { SubPermissaoEditComponent } from './permissao/sub-permissao/sub-permissao-edit/sub-permissao-edit.component';
import { SubPermissaoComponent } from './permissao/sub-permissao/sub-permissao.component';
import { PessoaEditComponent } from './pessoa/pessoa-edit/pessoa-edit.component';
import { PessoaComponent } from './pessoa/pessoa.component';
import { FooterComponent } from './template/footer/footer.component';
import { NavbarComponent } from './template/navbar/navbar.component';
import { SidebarComponent } from './template/sidebar/sidebar.component';
import { UsuarioEditComponent } from './usuario/usuario-edit/usuario-edit.component';
import { UsuarioComponent } from './usuario/usuario.component';







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
    UsuarioEditComponent,
    PessoaComponent,
    PessoaEditComponent,
    LacamentoComponent,
    LancamentoEditComponent,
    AcessDeniedComponent,
    NovaSenhaComponent,
    PermissaoComponent,
    PermissaoEditComponent,
    SubPermissaoComponent,
    SubPermissaoEditComponent
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
    MultiSelectModule,
    CalendarModule,
    DropdownModule,
    ProgressSpinnerModule,
    DialogModule,
    FormsModule,
    InputTextareaModule,
    InputNumberModule,
    FileUploadModule,
    PickListModule

  ],
  providers: [
    ConfirmationService,
    MessageService,
    provideClientHydration(),
    DecimalPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
