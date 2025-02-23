import { FormBuilder, FormGroup } from '@angular/forms';
import { PainelControleService } from './painel-controle.service';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';

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
    private painelControleService: PainelControleService,
    private messageService: MessageService
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

  salvarConfiguracoes() {
    this.painelControleService.salvarConfiguracoes(this.configForm.value).subscribe(() => {
      this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Configurações salvas com sucesso!' });
    });
  }

  alternarVisibilidadeSenha() {
    this.mostrarSenha = !this.mostrarSenha;
  }

}
