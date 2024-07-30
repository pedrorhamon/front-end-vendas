import { Component, OnInit } from '@angular/core';
import { Page } from '../../assets/page';
import { Usuario } from './model/usuario';
import { UsuarioService } from './usuario.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.css'
})
export class UsuarioComponent implements OnInit {
  usuarios!: Page<Usuario>;

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.listarUsuarios();
  }

  listarUsuarios(page: number = 0, size: number = 10): void {
    this.usuarioService.listar(undefined, undefined, page, size).subscribe({
      next: (response) => this.usuarios = response,
      error: (err) => console.error('Erro ao listar usuários', err)
    });
  }

}
