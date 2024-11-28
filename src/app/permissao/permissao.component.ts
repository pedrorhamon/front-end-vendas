import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';

import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-permissao',
  templateUrl: './permissao.component.html',
  styleUrl: './permissao.component.css'
})
export class PermissaoComponent implements OnInit{


  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: LoginService
  ) {}

   ngOnInit(): void {
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
