import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Pessoa } from '../model/pessoa';
import { PessoaService } from '../pessoa.service';
import { ViaCepService } from '../via-cep.service';
import { Endereco } from '../model/endereco';
import Map from 'ol/Map';
import { Overlay, View } from 'ol';
import { fromLonLat } from 'ol/proj';
import { OSM } from 'ol/source';
import TileLayer from 'ol/layer/Tile';
import { defaults as defaultControls, FullScreen, ScaleLine, Zoom } from 'ol/control';


@Component({
  selector: 'app-pessoa-edit',
  templateUrl: './pessoa-edit.component.html',
  styleUrl: './pessoa-edit.component.css'
})
export class PessoaEditComponent implements OnInit {
  pessoaForm: FormGroup;
  editMode: boolean = false;
  pessoaId?: number;
  map!: Map;
  marker!: Overlay;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private pessoaService: PessoaService,
    private messageService: MessageService,
    private cepService: ViaCepService
  ) {
    this.pessoaForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(150)]],
      ativo: [true, Validators.required],
      createdAt: [''],
      updatedAt: [''],
      logradouro: [''],
      numero: [''],
      complemento: [''],
      bairro: [''],
      cep: ['',Validators.required],
      cidade: [''],
      estado: ['']
    });
  }


  ngOnInit(): void {
    this.loadPessoa();

    this.initializeMap();

    this.pessoaForm.valueChanges.subscribe((value) => {
      if (this.isAddressComplete(value)) {
        this.updateMap(value);
      }
    });

    this.pessoaForm.get('cep')?.valueChanges.subscribe((cep) => {
      if (cep.length === 8) { // Após preencher o CEP
        this.cepService.consultarCep(cep).subscribe((endereco: Endereco) => {
          if (endereco) {
            this.pessoaForm.patchValue({
              logradouro: endereco.logradouro,
              numero: endereco.numero ?? '',
              complemento: endereco.complemento ?? '',
              bairro: endereco.bairro,
              cidade: endereco.localidade,
              estado: endereco.uf
            });

            // Atualizar o mapa com o endereço completo
            this.updateMap(this.pessoaForm.value);
          }
        });
      }
    });

    // this.pessoaForm.get('cep')?.valueChanges.subscribe(cep => {
    //   if (cep.length === 8) { // Quando o CEP tiver 8 caracteres
    //     this.cepService.consultarCep(cep).subscribe((endereco: Endereco) => {
    //       if (endereco) {
    //         this.pessoaForm.patchValue({
    //           logradouro: endereco.logradouro,
    //           numero: endereco.numero ?? '',
    //           complemento: endereco.complemento ?? '',
    //           bairro: endereco.bairro,
    //           cidade: endereco.localidade,
    //           estado: endereco.uf
    //         });
    //       }
    //     });
    //   }
    // });
  }

  private loadPessoa(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.pessoaId = +id;  // Converte string para número
      this.editMode = true;
      this.pessoaService.getPessoaById(this.pessoaId).subscribe(pessoa => {
        this.pessoaForm.reset({
          name: pessoa.name ?? '',
          ativo: pessoa.ativo ?? true,
          createdAt: pessoa.createdAt ?? '',
          updatedAt: pessoa.updatedAt ?? '',
          logradouro: pessoa.logradouro ?? '',
          numero: pessoa.numero ?? '',
          complemento: pessoa.complemento ?? '',
          bairro: pessoa.bairro ?? '',
          cep: pessoa.cep ?? '',
          cidade: pessoa.cidade ?? '',
          estado: pessoa.estado ?? ''
        });

      });
    }
  }

  onSubmit(): void {
    if (this.pessoaForm.valid) {
      const pessoa = this.pessoaForm.value;
      if (this.editMode && this.pessoaId !== undefined) {
        this.pessoaService.atualizar(this.pessoaId, pessoa).subscribe(() => {
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Pessoa atualizada com sucesso' });
          this.router.navigate(['/pessoa']);
        });
      } else {
        this.pessoaService.criar(pessoa).subscribe(() => {
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Pessoa criada com sucesso' });
          this.router.navigate(['/pessoa']);
        });
      }
    }
  }

  onCancel(): void {
    this.router.navigate(['/pessoa']); // Redireciona para a lista de usuários
  }

  initializeMap(): void {
    this.map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: fromLonLat([-34.879, -7.115]), // Coordenadas iniciais (genéricas)
        zoom: 2,
      }),
      controls: defaultControls(),
    });
  }

  isAddressComplete(value: any): boolean {
    return (
      value.logradouro &&
      value.numero &&
      value.bairro &&
      value.cidade &&
      value.estado
    );
  }

  updateMap(address: any): void {
    const fullAddress = `${address.logradouro}, ${address.numero}, ${address.bairro}, ${address.cidade}, ${address.estado}`;

    this.pessoaService.geocodeAddress(fullAddress).subscribe((coordinates: [number, number]) => {
      const [latitude, longitude] = coordinates;

      const position = fromLonLat([longitude, latitude]);
      this.map.getView().setCenter(position);
      this.map.getView().setZoom(15);

      if (this.marker) {
        this.map.removeOverlay(this.marker);
      }

      // Criar elemento HTML para o marcador
      const markerElement = document.createElement('div');
      markerElement.style.width = '20px';
      markerElement.style.height = '20px';
      markerElement.style.background = 'red';
      markerElement.style.borderRadius = '50%';
      markerElement.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.2)';
      markerElement.style.position = 'absolute';
      markerElement.style.transform = 'translate(-50%, -50%)';

      // Criar o Overlay para o marcador
      this.marker = new Overlay({
        position: position,
        positioning: 'center-center',
        element: markerElement,
      });

      // Adicionar o Overlay ao mapa
      this.map.addOverlay(this.marker);
    }, error => {
      console.error('Erro ao buscar coordenadas:', error);
    });
  }
}


