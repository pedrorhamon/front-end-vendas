import { FormBuilder, FormGroup } from '@angular/forms';
import { PainelControleService } from './painel-controle.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-painel-controle',
  templateUrl: './painel-controle.component.html',
  styleUrl: './painel-controle.component.css'
})
export class PainelControleComponent implements OnInit {

  configForm!: FormGroup;
  mostrarSenha = false;

  constructor(
    private fb: FormBuilder,
    private painelControleService: PainelControleService
  ) { }

  ngOnInit() {
    this.configForm = this.fb.group({
      emailUsuario: [''],
      servidorSMTP: [''],
      portaSMTP: [''],
      senhaEmail: [''],
      autenticacaoSMTP: [true],
      tlsAtivado: [true],
      dominio: [''],
      urlApi: [''],
      nomeSistema: ['']
    });

    this.painelControleService.obterConfiguracoes().subscribe(config => {
      if(config) {
        this.configForm.patchValue(config);
      }
    })

    }

}
