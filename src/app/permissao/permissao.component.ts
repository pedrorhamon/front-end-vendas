import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';

import { LoginService } from '../login/login.service';
import { Permissao } from './model/permissao';
import { PermissaoService } from './permissao.service';

@Component({
  selector: 'app-permissao',
  templateUrl: './permissao.component.html',
  styleUrl: './permissao.component.css'
})
export class PermissaoComponent implements OnInit{

  filteredPermissao: Permissao[] = [];
  filterName: string = '';
  permissoes: Permissao[] = [];
  loading: boolean = true;
  totalPages: number = 0;
  page: number = 0;
  size: number = 20;


  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: LoginService,
    private permissaoService: PermissaoService
  ) {}

   ngOnInit(): void {
  }

  listarPessoas(id?: number, name?: string): void {
    this.permissaoService.listarPessoa(id, name, this.page, this.size).subscribe(page => {
      this.permissoes = page.content;
      this.totalPages = page.totalPages;
      this.loading = false;

      this.filterPessoas()
    });
  }

  filterPessoas(): void {
    this.filteredPermissao = this.permissoes.filter(permissao =>
      permissao.name?.toLowerCase().includes(this.filterName.toLowerCase())
    );
  }

  canEdit(): boolean {
    return this.authService.hasRole('ADMIN_PRIVILEGE');
  }

  canDelete(): boolean {
    return this.authService.hasRole('ADMIN_PRIVILEGE');
  }

  canCreate(): boolean {
    return this.authService.hasRole('ADMIN_PRIVILEGE');
  }

}
